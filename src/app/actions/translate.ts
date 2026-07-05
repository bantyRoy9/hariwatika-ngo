"use server";

import { TOO_LONG_MESSAGE, UNREACHABLE_MESSAGE } from "@/lib/translateMessages";

const MYMEMORY_ENDPOINT = "https://api.mymemory.translated.net/get";
const MAX_CHARS = 500;
const FETCH_TIMEOUT_MS = 8000;

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
