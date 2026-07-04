import test from "node:test";
import assert from "node:assert/strict";

import {
  computeSelectAllState,
  normalizeIndianMobile,
  validateTemplateVariables,
} from "../src/features/notifications/utils";

test("normalizeIndianMobile returns E.164 for plain 10-digit Indian numbers", () => {
  assert.equal(normalizeIndianMobile("9473331919"), "+919473331919");
});

test("normalizeIndianMobile strips formatting and preserves existing country code", () => {
  assert.equal(normalizeIndianMobile("+91 94733 31919"), "+919473331919");
});

test("normalizeIndianMobile rejects unsupported input", () => {
  assert.equal(normalizeIndianMobile("12345"), null);
  assert.equal(normalizeIndianMobile("abcdefghij"), null);
});

test("validateTemplateVariables trims values and preserves declared order", () => {
  const result = validateTemplateVariables(
    ["programName", "eventDate"],
    { programName: " Tree Plantation ", eventDate: " 12 July " },
  );

  assert.deepEqual(result, {
    ok: true,
    data: {
      orderedValues: ["Tree Plantation", "12 July"],
      values: { programName: "Tree Plantation", eventDate: "12 July" },
    },
  });
});

test("validateTemplateVariables rejects missing and blank required variables", () => {
  const missing = validateTemplateVariables(["programName"], {});
  assert.equal(missing.ok, false);
  assert.match(missing.error, /programName/i);

  const blank = validateTemplateVariables(["programName"], { programName: "   " });
  assert.equal(blank.ok, false);
  assert.match(blank.error, /programName/i);
});

test("computeSelectAllState reports checked, unchecked, and indeterminate states", () => {
  assert.deepEqual(computeSelectAllState([], []), {
    checked: false,
    indeterminate: false,
    selectedVisibleCount: 0,
    visibleCount: 0,
  });

  assert.deepEqual(computeSelectAllState([1, 2], [1, 2]), {
    checked: true,
    indeterminate: false,
    selectedVisibleCount: 2,
    visibleCount: 2,
  });

  assert.deepEqual(computeSelectAllState([1], [1, 2]), {
    checked: false,
    indeterminate: true,
    selectedVisibleCount: 1,
    visibleCount: 2,
  });
});
