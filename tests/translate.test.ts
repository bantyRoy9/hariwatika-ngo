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
}) as unknown as typeof fetch;

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
  })) as unknown as typeof fetch;
  await withMockFetch(ok, async () => {
    const result = await translateToHindi(exactText);
    assert.equal(result, "एक");
  });
});

test("translateToHindi returns the translated text on success", async () => {
  const ok = (async () => ({
    ok: true,
    json: async () => ({ responseStatus: 200, responseData: { translatedText: "नमस्ते" } }),
  })) as unknown as typeof fetch;
  await withMockFetch(ok, async () => {
    const result = await translateToHindi("hello");
    assert.equal(result, "नमस्ते");
  });
});

test("translateToHindi throws when the HTTP response is not ok", async () => {
  const bad = (async () => ({ ok: false, json: async () => ({}) })) as unknown as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});

test("translateToHindi throws when fetch itself rejects (network error)", async () => {
  const bad = (async () => {
    throw new Error("network down");
  }) as unknown as typeof fetch;
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
  })) as unknown as typeof fetch;
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
  })) as unknown as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});

test("translateToHindi throws when translatedText is missing", async () => {
  const bad = (async () => ({
    ok: true,
    json: async () => ({ responseStatus: 200, responseData: {} }),
  })) as unknown as typeof fetch;
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
  })) as unknown as typeof fetch;
  await withMockFetch(bad, async () => {
    await assert.rejects(() => translateToHindi("hello"), /Couldn't reach/);
  });
});
