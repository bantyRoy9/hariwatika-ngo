/** Bilingual text for server-action validation error codes (see actions/submissions.ts). */
export const ERROR_MESSAGES: Record<string, { en: string; hi: string }> = {
  name_required: { en: "Name is required", hi: "नाम आवश्यक है" },
  mobile_invalid: { en: "Valid mobile is required", hi: "मान्य मोबाइल नंबर आवश्यक है" },
  email_invalid: { en: "Valid email is required", hi: "मान्य ईमेल आवश्यक है" },
  address_required: { en: "Address is required", hi: "पता आवश्यक है" },
  amount_invalid: { en: "Amount must be positive", hi: "राशि सकारात्मक होनी चाहिए" },
  purpose_required: { en: "Purpose is required", hi: "उद्देश्य आवश्यक है" },
};

/** Resolve a validation error code to the current language, falling back to the raw string. */
export function translateError(code: string, t: (en: string, hi: string) => string): string {
  const entry = ERROR_MESSAGES[code];
  return entry ? t(entry.en, entry.hi) : code;
}
