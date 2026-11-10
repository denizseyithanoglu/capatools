/* Run with: node --test tests/osmolality.test.js
 * Calculation-level regression tests. Clinical review still required. */
const test = require("node:test");
const assert = require("node:assert/strict");
const { compute } = require("../engine.js");

const standard = { na: 140, glucose: 90, nitrogen: 30, nitrogenType: "urea" };

test("total osmolality using serum urea in mg/dL", () => {
  const result = compute("osmolality", standard);
  assert.equal(result.value, 290);
  assert.equal(result.extra[0].key, "effectiveOsm");
  assert.equal(result.extra[0].value, 285);
  assert.equal(result.extra.length, 1);
});

test("BUN is correctly converted rather than divided by the urea factor", () => {
  const result = compute("osmolality", { ...standard, nitrogenType: "bun", nitrogen: 14 });
  assert.equal(result.value, 290);
});

test("measured osmolality produces optional osmolal gap", () => {
  const result = compute("osmolality", { ...standard, measured: 300 });
  assert.equal(result.extra[1].key, "osmolGap");
  assert.equal(result.extra[1].value, 10);
});

test("hyperglycemia contributes to both total and effective osmolality", () => {
  const result = compute("osmolality", { na: 140, glucose: 540, nitrogenType: "bun", nitrogen: 14 });
  assert.equal(result.value, 315);
  assert.equal(result.extra[0].value, 310);
});

test("unsupported units and invalid measured values are rejected", () => {
  assert.throws(() => compute("osmolality", { ...standard, nitrogenType: "unknown" }));
  assert.throws(() => compute("osmolality", { ...standard, measured: 40 }));
  assert.throws(() => compute("osmolality", { ...standard, na: -140 }));
});
