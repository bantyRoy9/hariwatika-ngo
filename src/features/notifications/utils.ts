export type TemplateValidationResult =
  | {
      ok: true;
      data: {
        values: Record<string, string>;
        orderedValues: string[];
      };
    }
  | {
      ok: false;
      error: string;
    };

export function normalizeIndianMobile(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10 && /^[6-9]/.test(digits)) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91") && /^[6-9]/.test(digits.slice(2))) {
    return `+${digits}`;
  }
  return null;
}

export function validateTemplateVariables(
  variableKeys: string[],
  rawValues: Record<string, unknown>,
): TemplateValidationResult {
  const values: Record<string, string> = {};
  const orderedValues: string[] = [];

  for (const key of variableKeys) {
    const value = String(rawValues[key] ?? "").trim();
    if (!value) return { ok: false, error: `Missing value for ${key}` };
    values[key] = value;
    orderedValues.push(value);
  }

  return { ok: true, data: { values, orderedValues } };
}

export function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
  } catch {
    return [];
  }
}

export function parseJsonRecord(value: string | null | undefined): Record<string, string> {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(parsed).map(([key, entry]) => [key, String(entry ?? "")]));
  } catch {
    return {};
  }
}

export function computeSelectAllState(selectedIds: number[], visibleIds: number[]) {
  const visible = new Set(visibleIds);
  const selectedVisibleCount = selectedIds.filter((id) => visible.has(id)).length;
  const visibleCount = visibleIds.length;

  return {
    checked: visibleCount > 0 && selectedVisibleCount === visibleCount,
    indeterminate: selectedVisibleCount > 0 && selectedVisibleCount < visibleCount,
    selectedVisibleCount,
    visibleCount,
  };
}
