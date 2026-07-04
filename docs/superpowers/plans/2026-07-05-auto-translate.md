# Admin Auto-Translate (EN→HI) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auto-fill the Hindi half of every bilingual admin field from the English text, on blur, via a free translation API — no manual Hindi typing required for the common case.

**Architecture:** A single server action (`translateToHindi`) wraps MyMemory's translation API with the exact error/length handling the spec requires. `BilingualField` — the one shared component every admin content screen already renders bilingual inputs through — calls it on the English input's blur and feeds the result into the existing `onHi` callback, so no other file changes.

**Tech Stack:** Next.js Server Actions, native `fetch`, React `useState`. Tests via the repo's existing `node --test` + `tsx` setup (`npm test`), matching `tests/notification-utils.test.ts`.

## Global Constraints

- Provider: MyMemory (`api.mymemory.translated.net`), no API key.
- Direction: English → Hindi only.
- Trigger: automatic on English-field blur, no button.
- Overwrite: always overwrite Hindi on blur, even if Hindi already has text (accepted risk per spec).
- 500-character limit: checked before any network call.
- No `assertAdmin()` gate on `translateToHindi` — deliberate deviation from the CRUD actions in `src/app/actions/content.ts`. Reasoning: this action performs no mutation and touches no secret (MyMemory needs no key), so the only abuse risk is someone spending the app's shared free MyMemory quota — the same "unreliable free service" risk the spec already accepts. Adding `assertAdmin()` would require `next/headers`, which cannot run outside an active Next.js request and would make this function untestable under the repo's plain `node --test` setup. If this trade-off is wrong, it's a one-line addition later — flagging it here rather than silently deciding.

---

## Task 1: `translateToHindi` server action with full test coverage

**Files:**
- Create: `src/app/actions/translate.ts`
- Test: `tests/translate.test.ts`

**Interfaces:**
- Produces: `export async function translateToHindi(text: string): Promise<string>` — resolves with the Hindi translation, or rejects with an `Error` whose `.message` is one of exactly two user-facing strings (see Step 3). Task 2 imports this function and its two exported message constants by name.

- [ ] **Step 1: Write the failing tests**

Create `tests/translate.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";

import { translateToHindi } from "../src/app/actions/translate";

function withMockFetch<T>(impl: typeof fetch, run: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = impl;
  return run().finally(() => {
    globalThis.fetch = original;
  });
}

const fetchShouldNotBeCalled = (async () => {
  throw new Error("fetch should not have been called");
}) as typeof fetch;

test("translateToHindi rejects empty/whitespace-only text without calling fetch", async () => {
  await withMockFetch(fetchShouldNotBeCalled, async () => {
    await assert.rejects(() => translateToHindi("   "), /Nothing to translate/);
  });
});

test("translateToHindi rejects text over 500 characters without calling fetch", async () => {
  const longText = "a".repeat(501);
  await withMockFetch(fetchShouldNotBeCalled, async () => {
    await assert.rejects(() => translateToHindi(longText), /too long/i);
  });
});

test("translateToHindi accepts text at exactly 500 characters", async () => {
  const exactText = "a".repeat(500);
  const ok = (async () => ({
    ok: true,
    json: async () => ({ responseStatus: 200, responseData: { translatedText: "एक" } }),
  })) as typeof fetch;
  await withMockFetch(ok, async () => {
    const result = await translateToHindi(exactText);
    assert.equal(result, "एक");
  });
});

test("translateToHindi returns the translated text on success", async () => {
  const ok = (async () => ({
    ok: true,
    json: async () => ({ responseStatus: 200, responseData: { translatedText: "नमस्ते" } }),
  })) as typeof fetch;
  await withMockFetch(ok, async () => {
    const result = await translateToHindi("hello");
    assert.equal(result, "नमस्ते");
  });
});

test("translateToHindi throws when the HTTP response is not ok", async () => {
  const bad = (async () => ({ ok: false, json: async () => ({}) })) as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});

test("translateToHindi throws when fetch itself rejects (network error)", async () => {
  const bad = (async () => {
    throw new Error("network down");
  }) as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});

test("translateToHindi throws when responseStatus is a non-200 string (MyMemory's actual error shape)", async () => {
  const bad = (async () => ({
    ok: true,
    json: async () => ({
      responseStatus: "403",
      responseData: { translatedText: "QUERY LENGTH LIMIT EXCEEDED. MAX ALLOWED QUERY : 500 CHARS" },
    }),
  })) as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});

test("translateToHindi throws when translatedText contains a MyMemory warning despite responseStatus 200", async () => {
  const bad = (async () => ({
    ok: true,
    json: async () => ({
      responseStatus: 200,
      responseData: { translatedText: "MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY" },
    }),
  })) as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});

test("translateToHindi throws when translatedText is missing", async () => {
  const bad = (async () => ({
    ok: true,
    json: async () => ({ responseStatus: 200, responseData: {} }),
  })) as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});

test("translateToHindi throws when the response body isn't valid JSON", async () => {
  const bad = (async () => ({
    ok: true,
    json: async () => {
      throw new Error("invalid json");
    },
  })) as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `tests/translate.test.ts` errors with "Cannot find module '../src/app/actions/translate'" (the file doesn't exist yet).

- [ ] **Step 3: Write `src/app/actions/translate.ts`**

```ts
"use server";

const MYMEMORY_ENDPOINT = "https://api.mymemory.translated.net/get";
const MAX_CHARS = 500;
const FETCH_TIMEOUT_MS = 8000;

export const TOO_LONG_MESSAGE =
  "Text is too long to auto-translate (500 character limit) — please write the Hindi manually.";
export const UNREACHABLE_MESSAGE =
  "Couldn't reach the translation service — please write the Hindi manually.";

const WARNING_SUBSTRINGS = ["MYMEMORY WARNING", "QUERY LENGTH LIMIT EXCEEDED"];

type MyMemoryResponse = {
  responseStatus?: number | string;
  responseData?: { translatedText?: string };
};

export async function translateToHindi(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Nothing to translate.");
  }
  if (trimmed.length > MAX_CHARS) {
    throw new Error(TOO_LONG_MESSAGE);
  }

  const url = `${MYMEMORY_ENDPOINT}?q=${encodeURIComponent(trimmed)}&langpair=en|hi`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, { signal: controller.signal });
  } catch {
    throw new Error(UNREACHABLE_MESSAGE);
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    throw new Error(UNREACHABLE_MESSAGE);
  }

  let body: MyMemoryResponse;
  try {
    body = (await res.json()) as MyMemoryResponse;
  } catch {
    throw new Error(UNREACHABLE_MESSAGE);
  }

  const status = String(body.responseStatus ?? "");
  const translated = body.responseData?.translatedText;

  if (status !== "200" || !translated) {
    throw new Error(UNREACHABLE_MESSAGE);
  }

  const upper = translated.toUpperCase();
  if (WARNING_SUBSTRINGS.some((warning) => upper.includes(warning))) {
    throw new Error(UNREACHABLE_MESSAGE);
  }

  return translated;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 9 tests in `tests/translate.test.ts` pass, plus the pre-existing `tests/notification-utils.test.ts` tests still pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/actions/translate.ts tests/translate.test.ts
git commit -m "feat: add translateToHindi server action wrapping MyMemory API

Handles the 500-char limit, network/HTTP failures, and MyMemory's
inconsistent error response shape (string vs number responseStatus,
quota warnings returned as 200 OK) — all collapsed to one of two
user-facing messages so the caller never has to parse MyMemory's
response shape itself."
```

---

## Task 2: Wire auto-translate into `BilingualField`

**Files:**
- Modify: `src/app/admin/_components/ui.tsx`

**Interfaces:**
- Consumes: `translateToHindi(text: string): Promise<string>` from Task 1 (`src/app/actions/translate.ts`).
- Produces: no change to `BilingualField`'s public props (`label, en, hi, onEn, onHi, textarea`) — every existing call site in `CrudManager.tsx` and `SettingsEditor.tsx` is unaffected.

- [ ] **Step 1: Add the `useState` import and `translateToHindi` import**

In `src/app/admin/_components/ui.tsx`, replace:

```tsx
"use client";

import { LENITY, SERIF } from "@/theme/lenity";
```

with:

```tsx
"use client";

import { useState } from "react";
import { LENITY, SERIF } from "@/theme/lenity";
import { translateToHindi, UNREACHABLE_MESSAGE } from "@/app/actions/translate";
```

- [ ] **Step 2: Replace `BilingualField` with the auto-translating version**

Replace:

```tsx
/** Bilingual EN + HI side-by-side input pair. */
export function BilingualField({
  label,
  en,
  hi,
  onEn,
  onHi,
  textarea,
}: {
  label: string;
  en: string;
  hi: string;
  onEn: (v: string) => void;
  onHi: (v: string) => void;
  textarea?: boolean;
}) {
  const C = textarea ? TextArea : TextInput;
  return (
    <div>
      <Label>{label}</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <C value={en} placeholder="English" onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onEn(e.target.value)} />
        <C value={hi} placeholder="हिन्दी" onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onHi(e.target.value)} />
      </div>
    </div>
  );
}
```

with:

```tsx
/** Bilingual EN + HI side-by-side input pair. Auto-translates EN -> HI on blur. */
export function BilingualField({
  label,
  en,
  hi,
  onEn,
  onHi,
  textarea,
}: {
  label: string;
  en: string;
  hi: string;
  onEn: (v: string) => void;
  onHi: (v: string) => void;
  textarea?: boolean;
}) {
  const C = textarea ? TextArea : TextInput;
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);

  const handleEnBlur = async () => {
    if (!en.trim()) return;
    setTranslating(true);
    setTranslateError(null);
    try {
      const hiText = await translateToHindi(en);
      onHi(hiText);
    } catch (e) {
      setTranslateError(e instanceof Error ? e.message : UNREACHABLE_MESSAGE);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <C
          value={en}
          placeholder="English"
          onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onEn(e.target.value)}
          onBlur={handleEnBlur}
        />
        <C
          value={hi}
          placeholder="हिन्दी"
          disabled={translating}
          onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onHi(e.target.value)}
        />
      </div>
      {translating && (
        <p className="text-xs mt-1" style={{ color: LENITY.adminMuted }}>Translating…</p>
      )}
      {translateError && (
        <p className="text-xs mt-1" style={{ color: LENITY.red }}>{translateError}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Manual verification in the browser**

1. Start the dev server if not already running: `npm run dev -- -p 3002`.
2. Log into `/admin/login`.
3. Go to `/admin/content/home` (a `CrudManager` screen) — click "+ Add Stat", type English text into a bilingual field's English side, click/tab away from it, confirm the Hindi side fills in within a couple seconds and shows "Translating…" briefly while waiting.
4. Go to `/admin/settings` (a `SettingsEditor` screen) — repeat the same check on any bilingual row there.
5. Find a `bilingual-area` field with existing long text over 500 characters (or paste one in) — blur it and confirm the message "Text is too long to auto-translate (500 character limit) — please write the Hindi manually." appears instead of a stuck spinner or crash.
6. Turn off your network connection (or use browser dev tools' offline mode), blur an English field with text in it, confirm "Couldn't reach the translation service — please write the Hindi manually." appears and the form is still usable (you can still type Hindi manually). Turn network back on afterward.
7. Type new English text into a field that already has Hindi text, blur it, confirm the existing Hindi text gets overwritten with the fresh translation (expected — accepted behavior per the spec).

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/_components/ui.tsx
git commit -m "feat: auto-translate BilingualField's Hindi side from English on blur

Wires the new translateToHindi server action into the one shared
component every admin content screen renders bilingual fields
through (CrudManager and SettingsEditor both go through this), so no
other file needs to change. Hindi field disables while a translation
is in flight to avoid a race with manual typing."
```
