# Admin Auto-Translate (English → Hindi) — Design

## Context

Every bilingual field across the admin panel (Home, About, Projects, Blog,
Volunteer, Transparency, Internships, Page Headers, Text Labels, Site
Settings) requires the non-technical admin to type both English and Hindi
by hand. They asked whether English → Hindi could be filled in
automatically so they don't have to write the Hindi themselves.

Investigation found a single leverage point: both `CrudManager.tsx` and
`SettingsEditor.tsx` — which together back every admin content screen —
render bilingual inputs through one shared component, `BilingualField` in
`src/app/admin/_components/ui.tsx`. Adding auto-translate there covers the
entire admin panel with one change; `CrudManager` and `SettingsEditor`
need no changes at all.

## Decisions made with the client

- **Provider: MyMemory** (`api.mymemory.translated.net`) — free, keyless,
  no signup. Verified working with a live test call during this session
  (returned a correct Hindi translation for a test string). Accepted risk:
  it's a free community-run service, so uptime/rate-limits aren't
  guaranteed — acceptable for this app's low edit volume, and the
  implementation is a single function so swapping providers later is easy.
- **Direction: English → Hindi only.** No Hindi → English button.
- **Trigger: automatic on blur** of the English input — no button click
  required.
- **Overwrite behavior: always overwrite Hindi on blur**, even if Hindi
  already has text. The client explicitly chose this after being told the
  tradeoff (a bad machine translation can silently replace a good manual
  Hindi edit, with no undo) — this is accepted risk, not an oversight.

## Constraints found during investigation

- **500-character limit per request.** Tested directly: MyMemory returns
  `"QUERY LENGTH LIMIT EXCEEDED. MAX ALLOWED QUERY : 500 CHARS"` for
  anything longer. Several `bilingual-area` (textarea) fields in this app
  — e.g. the Mission/Vision paragraphs — regularly exceed 500 characters.
  For these, the length is checked before calling the API, and the admin
  sees "Text is too long to auto-translate — please write the Hindi
  manually" instead of a failed/garbled API call.
- **MyMemory's own error responses are inconsistent in shape** — success
  responses have `responseStatus: 200` (number); the length-limit error
  observed during testing had `responseStatus: "403"` (string). The
  translate action must not assume either type and must also
  substring-check `translatedText` for known warning text (e.g.
  `"MYMEMORY WARNING"`, `"QUERY LENGTH LIMIT EXCEEDED"`), since a quota
  or warning message could otherwise be inserted into the Hindi field as
  if it were a real translation.

## Design

### Architecture

One new file, one component change:

1. **`src/app/actions/translate.ts`** (new) — a `"use server"` action:
   ```ts
   export async function translateToHindi(text: string): Promise<string>
   ```
   - Trims `text`; if empty, throws (caller is expected to guard against
     calling with empty text, but the action itself must not silently
     return an empty string as if it were a valid translation).
   - If `text.length > 500`, throws `Error("Text is too long to auto-translate (500 character limit) — please write the Hindi manually.")` without making a network call.
   - Otherwise calls `https://api.mymemory.translated.net/get?q=<encoded text>&langpair=en|hi`, parses the JSON body, and:
     - If the fetch itself fails (network error, non-2xx HTTP status), throws `Error("Couldn't reach the translation service — please write the Hindi manually.")`.
     - If `responseData.translatedText` is missing, or contains `"MYMEMORY WARNING"` or `"QUERY LENGTH LIMIT EXCEEDED"` (case-insensitive substring check), throws the same "couldn't reach" error — these indicate a quota/limit condition dressed up as a 200 response, not a real translation.
     - Otherwise returns `responseData.translatedText`.

2. **`src/app/admin/_components/ui.tsx` — `BilingualField`** (modified):
   - Add local state: `translating: boolean`, `translateError: string | null`.
   - The English `TextInput`/`TextArea` gets an `onBlur` handler:
     - Skip (no-op) if `en.trim()` is empty.
     - Set `translating = true`, clear `translateError`.
     - Call `translateToHindi(en)`.
     - On success: call `onHi(result)` (identical effect to the admin typing it themselves — the parent's existing state update path is unchanged), clear `translating`.
     - On failure: set `translateError` to the thrown error's message, clear `translating`. The message renders as small text under the field pair and clears the next time the English field is blurred (whether that attempt succeeds or fails again).
   - The Hindi `TextInput`/`TextArea` gets `disabled={translating}` — prevents a race where the admin is typing into Hindi manually at the exact moment a translation result arrives and overwrites it.
   - No prop changes to `BilingualField`'s public interface (`label, en, hi, onEn, onHi, textarea`) — `CrudManager` and `SettingsEditor` call sites are unaffected.

### Data flow

Admin types English → blurs the field → (guard: empty or >500 chars stops here) → server action call → MyMemory API → parsed response → success path calls `onHi(...)`, which is the exact same function the Hindi input's own `onChange` already calls — so from the parent component's perspective, an auto-translated fill is indistinguishable from a manual edit. Nothing downstream (save, CrudManager, SettingsEditor) needs to know translation happened.

### Error handling

Three failure modes, all surfaced as a small inline message under the field pair, never a thrown/uncaught error and never a broken save:
1. Text over 500 chars → caught before any network call.
2. Network/API failure → generic "couldn't reach" message.
3. Quota/warning text disguised as a successful response → treated as a failure, not inserted into the Hindi field.

### Testing / verification

No test framework covers this UI layer (consistent with the rest of the admin panel). Manual verification:
1. Type English into a short field (e.g. a Home page stat label) on a `CrudManager` screen (e.g. `/admin/content/home`) and a `SettingsEditor` screen (e.g. `/admin/settings`), blur, confirm Hindi fills in on both.
2. Type a paragraph over 500 characters into a `bilingual-area` field (e.g. Mission text if it's wired to a setting, or any long description field) and confirm the length-limit message appears instead of a failed network call.
3. Temporarily block network access to `api.mymemory.translated.net` (or disconnect network) and confirm the "couldn't reach" message appears and the form remains usable (admin can still type Hindi manually).
4. Confirm existing Hindi text does get overwritten on a subsequent English edit + blur (expected per the accepted "always overwrite" decision).

### Out of scope

- Hindi → English translation (no button, no auto-trigger).
- Chunking/splitting text over 500 characters to work around MyMemory's limit.
- A settings toggle to disable auto-translate per field or globally.
- Swapping to a paid/signup-based provider (Google Cloud Translation, Microsoft Translator) — the action is written as a single function so this is a future, separate change if ever needed.
