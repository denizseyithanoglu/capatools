/* Pure, dependency-free arithmetic. No input values are stored or transmitted.
 * Inputs use the units documented in data.js. Clinical review required before deployment.
 */
(function (root) {
  "use strict";
  function assert(ok, message) { if (!ok) throw new Error(message); }
  function finite(v) { return typeof v === "number" && Number.isFinite(v); }
  function requireNumbers(v, keys) {
    keys.forEach(function (key) { assert(finite(v[key]), "Invalid or missing value: " + key); });
  }
  function compute(id, v) {
    var value, label = "";
    switch (id) {
      case "bmi":
        requireNumbers(v, ["weight", "height"]);
        assert(v.height > 0, "Height must be positive");
        value = v.weight / Math.pow(v.height / 100, 2);
        break;
      case "map":
        requireNumbers(v, ["sbp", "dbp"]);
        assert(v.sbp >= v.dbp, "Systolic blood pressure must be >= diastolic");
        value = (v.sbp + 2 * v.dbp) / 3;
        break;
      case "aniongap":
        requireNumbers(v, ["na", "cl", "hco3"]);
        value = v.na - v.cl - v.hco3;
        break;
      case "shock":
        requireNumbers(v, ["hr", "sbp"]);
        assert(v.sbp > 0, "Systolic blood pressure must be positive");
        value = v.hr / v.sbp;
        break;
      case "qtc":
        requireNumbers(v, ["qt", "rr"]);
        assert(v.rr > 0, "RR interval must be positive");
        value = v.qt / Math.cbrt(v.rr / 1000);
        break;
      case "curb65":
        requireNumbers(v, ["urea", "rr", "sbp", "dbp", "age", "confusion"]);
        assert(v.sbp >= v.dbp, "Systolic blood pressure must be >= diastolic");
        value = Number(v.confusion === 1) + Number(v.urea > 7) +
          Number(v.rr >= 30) + Number(v.sbp < 90 || v.dbp <= 60) + Number(v.age >= 65);
        label = value < 2 ? "curbLow" : value === 2 ? "curbMedium" : "curbHigh";
        break;
      case "pf":
        requireNumbers(v, ["pao2", "fio2"]);
        assert(v.fio2 >= 21 && v.fio2 <= 100, "FiO2 must be 21-100%");
        value = v.pao2 / (v.fio2 / 100);
        break;
      case "cg":
        requireNumbers(v, ["age", "weight", "creatinine"]);
        assert(v.creatinine > 0 && v.age < 140, "Invalid renal function inputs");
        assert(v.sex === "f" || v.sex === "m", "Sex coefficient missing");
        value = (140 - v.age) * v.weight / (72 * v.creatinine) * (v.sex === "f" ? 0.85 : 1);
        break;
      case "fena":
        requireNumbers(v, ["una", "sna", "scr", "ucr"]);
        assert(v.sna > 0 && v.ucr > 0, "Denominator must be positive");
        value = v.una * v.scr / (v.sna * v.ucr) * 100;
        break;
      case "fib4":
        requireNumbers(v, ["age", "ast", "alt", "platelets"]);
        assert(v.alt > 0 && v.platelets > 0, "ALT and platelets must be positive");
        value = v.age * v.ast / (v.platelets * Math.sqrt(v.alt));
        break;
      case "anc":
        requireNumbers(v, ["wbc", "neut", "bands"]);
        assert(v.neut + v.bands <= 100, "Differential percentages exceed 100");
        value = v.wbc * 1000 * (v.neut + v.bands) / 100;
        break;
      case "bsa":
        requireNumbers(v, ["height", "weight"]);
        value = Math.sqrt(v.height * v.weight / 3600);
        break;
      case "qsofa":
        requireNumbers(v, ["rr", "sbp", "altered"]);
        value = Number(v.rr >= 22) + Number(v.sbp <= 100) + Number(v.altered === 1);
        label = value >= 2 ? "qsofaAlert" : "qsofaCaution";
        break;
      case "eos":
        requireNumbers(v, ["wbc", "eos"]);
        value = v.wbc * 1000 * v.eos / 100;
        break;
      case "das28":
        requireNumbers(v, ["tjc", "sjc", "crp", "pga"]);
        value = 0.56 * Math.sqrt(v.tjc) + 0.28 * Math.sqrt(v.sjc) +
          0.36 * Math.log(v.crp + 1) + 0.014 * v.pga + 0.96;
        break;
      case "correctedna":
        requireNumbers(v, ["na", "glucose", "factor"]);
        assert(v.factor === 1.6 || v.factor === 2.4, "Invalid correction factor");
        value = v.na + v.factor * Math.max(0, v.glucose - 100) / 100;
        break;
      case "frail":
        requireNumbers(v, ["fatigue", "resistance", "walking", "illnesses", "loss"]);
        value = v.fatigue + v.resistance + v.walking + v.illnesses + v.loss;
        label = value === 0 ? "frailRobust" : value < 3 ? "frailPrefrail" : "frailFrail";
        break;
      default:
        throw new Error("Unknown calculator: " + id);
    }
    assert(Number.isFinite(value), "Non-finite calculated result");
    return { value: value, interpretation: label };
  }
  root.CAPACalc = Object.freeze({ compute: compute });
  if (typeof module !== "undefined" && module.exports) module.exports = root.CAPACalc;
})(typeof globalThis !== "undefined" ? globalThis : this);
