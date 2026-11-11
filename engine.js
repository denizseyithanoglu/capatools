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
    var value, label = "", extra = [];
    switch (id) {
      case "tmpgfr":
        requireNumbers(v, ["serumPhosphate", "urinePhosphate", "serumCreatinine", "urineCreatinine"]);
        assert(v.serumPhosphate > 0 && v.urinePhosphate >= 0 &&
          v.serumCreatinine > 0 && v.urineCreatinine > 0, "Invalid phosphate or creatinine concentration");
        assert(v.phosphateUnit === "mg/dL" || v.phosphateUnit === "mmol/L", "Invalid phosphate unit");
        assert(["mg/dL", "umol/L", "mmol/L"].indexOf(v.creatinineUnit) !== -1, "Invalid creatinine unit");
        var feP = (v.urinePhosphate / v.serumPhosphate) * (v.serumCreatinine / v.urineCreatinine);
        assert(Number.isFinite(feP) && feP >= 0 && feP <= 1, "TRP outside 0–1: check units and paired samples");
        var trp = 1 - feP;
        var serumPmg = v.serumPhosphate * (v.phosphateUnit === "mmol/L" ? 3.0974 : 1);
        value = (trp <= 0.86 ? trp : 0.3 * trp / (1 - 0.8 * trp)) * serumPmg;
        extra.push({key:"tmpSI", value:value / 3.0974, unit:"mmol/L"});
        extra.push({key:"phosphateTRP", value:trp * 100, unit:"%"});
        extra.push({key:"phosphateFE", value:feP * 100, unit:"%"});
        break;
      case "urinecalcium24h":
        requireNumbers(v, ["urineCalcium", "urineVolume"]);
        assert(v.urineCalcium >= 0 && v.urineCalcium <= 1000 &&
          v.urineVolume >= 1 && v.urineVolume <= 30000, "Invalid urine calcium or 24-hour volume");
        value = v.urineCalcium * v.urineVolume / 100;
        break;
      case "correctedcalcium":
        requireNumbers(v, ["calcium", "albumin"]);
        assert(v.calcium >= 0 && v.calcium <= 25 &&
          v.albumin >= 0 && v.albumin <= 8, "Invalid calcium or albumin");
        value = v.calcium + 0.8 * (4 - v.albumin);
        break;
      case "caxp":
        requireNumbers(v, ["calcium", "phosphate"]);
        assert(v.calcium >= 0 && v.calcium <= 25 &&
          v.phosphate >= 0 && v.phosphate <= 30, "Invalid calcium or phosphorus");
        value = v.calcium * v.phosphate;
        break;
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
      case "osmolality":
        requireNumbers(v, ["na", "glucose", "nitrogen"]);
        assert(v.na >= 80 && v.na <= 200 &&
          v.glucose >= 0 && v.glucose <= 2500 &&
          v.nitrogen >= 0 && v.nitrogen <= 500, "Out of range osmolality inputs");
        assert(v.nitrogenType === "urea" || v.nitrogenType === "bun", "Select urea or BUN");
        var ureaContribution = v.nitrogenType === "urea" ?
          v.nitrogen / 6 : v.nitrogen / 2.8;
        var effective = 2 * v.na + v.glucose / 18;
        value = effective + ureaContribution;
        extra.push({key:"effectiveOsm", value:effective, unit:"mOsm/kg"});
        if (typeof v.measured !== "undefined") {
          requireNumbers(v, ["measured"]);
          assert(v.measured >= 150 && v.measured <= 500, "Invalid measured osmolality");
          extra.push({key:"osmolGap", value:v.measured - value, unit:"mOsm/kg"});
        }
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
    return { value: value, interpretation: label, extra: extra };
  }
  root.CAPACalc = Object.freeze({ compute: compute });
  if (typeof module !== "undefined" && module.exports) module.exports = root.CAPACalc;
})(typeof globalThis !== "undefined" ? globalThis : this);
