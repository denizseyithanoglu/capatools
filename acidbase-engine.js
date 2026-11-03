/* CAPA Tools – adult acid-base interpretation (educational decision support).
   Source concepts: UpToDate, Simple and mixed acid-base disorders;
   ATS Interpretation of ABGs; MSD Manual professional acid-base tables.
   This module contains pure calculations, without persistence or network calls. */
(function (root) {
  "use strict";
  function validNumber(x, lo, hi) { return typeof x === "number" && Number.isFinite(x) && x >= lo && x <= hi; }
  function assert(ok, message) { if (!ok) throw new Error(message); }
  function classify(v) {
    assert(v && validNumber(v.ph, 6.6, 7.9), "Invalid pH");
    assert(validNumber(v.pco2, 5, 180), "Invalid PaCO2");
    assert(validNumber(v.hco3, 1, 70), "Invalid bicarbonate");
    var hasNa = v.na !== null && typeof v.na !== "undefined";
    var hasCl = v.cl !== null && typeof v.cl !== "undefined";
    assert(hasNa === hasCl, "Na and Cl must be supplied together");
    if (hasNa) {
      assert(validNumber(v.na, 70, 220) && validNumber(v.cl, 30, 180), "Invalid electrolytes");
    }
    var hasAlb = v.albumin !== null && typeof v.albumin !== "undefined";
    assert(!hasAlb || hasNa, "Albumin correction requires sodium and chloride");
    if (hasAlb) assert(validNumber(v.albumin, 0.5, 6.5), "Invalid albumin");
    var acidMet = v.hco3 < 21, alkMet = v.hco3 > 27;
    var acidResp = v.pco2 > 45, alkResp = v.pco2 < 35;
    var phStatus = v.ph < 7.35 ? "acidemia" : v.ph > 7.45 ? "alkalemia" : "normalPH";
    var primary = "undetermined";
    if (phStatus === "acidemia") {
      if (acidMet && acidResp) primary = "mixedAcidosis";
      else if (acidMet) primary = "metabolicAcidosis";
      else if (acidResp) primary = "respiratoryAcidosis";
    } else if (phStatus === "alkalemia") {
      if (alkMet && alkResp) primary = "mixedAlkalosis";
      else if (alkMet) primary = "metabolicAlkalosis";
      else if (alkResp) primary = "respiratoryAlkalosis";
    } else if (!acidMet && !alkMet && !acidResp && !alkResp) {
      primary = "normalPattern";
    } else {
      primary = "normalPHAbnormalValues";
    }
    var warnings = [], compensations = [];
    var predictedPH = 6.1 + Math.log10(v.hco3 / (0.03 * v.pco2));
    if (Math.abs(predictedPH - v.ph) > 0.10) warnings.push("hhMismatch");
    if (primary === "undetermined") warnings.push("atypicalPattern");
    if (primary === "normalPHAbnormalValues") warnings.push("normalPhCaution");
    if (v.ph < 7.1 || v.ph > 7.60) warnings.push("extremePH");
    function response(metric, method, low, high, measured, direction) {
      var compare = measured < low ? "belowExpected" : measured > high ? "aboveExpected" : "inExpected";
      compensations.push({metric:metric,method:method,low:low,high:high,measured:measured,compare:compare,direction:direction});
    }
    function doMetAcid() {
      var low,high,method;
      if (v.hco3 <= 5) {
        low=8; high=12;method="severeLimit";
      } else {
        var center=1.5*v.hco3+8;
        low=Math.max(8,center-2);high=center+2;method="winter";
      }
      response("pco2",method,low,high,v.pco2,"metAcid");
      if (v.pco2 > high) warnings.push("possibleRespAcid");
      else if (v.pco2 < low) warnings.push("possibleRespAlk");
    }
    function doMetAlk() {
      var target=v.hco3+10;
      response("pco2","metAlk",Math.max(5,target-5),target+5,v.pco2,"metAlk");
      if (v.pco2 > target+5) warnings.push("possibleRespAcid");
      else if (v.pco2 < target-5) warnings.push("possibleRespAlk");
    }
    function doRespAcid() {
      var d=(v.pco2-40)/10;
      if(d<=0)return;
      response("hco3","respAcidAcute",24+d-3,24+d+3,v.hco3,"acute");
      response("hco3","respAcidChronic",24+3.5*d-3,24+4*d+3,v.hco3,"chronic");
    }
    function doRespAlk() {
      var d=(40-v.pco2)/10;
      if(d<=0)return;
      response("hco3","respAlkAcute",24-2*d-3,24-2*d+3,v.hco3,"acute");
      response("hco3","respAlkChronic",24-5*d-3,24-4*d+3,v.hco3,"chronic");
    }
    if (primary === "metabolicAcidosis" || primary === "mixedAcidosis") doMetAcid();
    if (primary === "metabolicAlkalosis" || primary === "mixedAlkalosis") doMetAlk();
    if (primary === "respiratoryAcidosis" || primary === "mixedAcidosis") doRespAcid();
    if (primary === "respiratoryAlkalosis" || primary === "mixedAlkalosis") doRespAlk();
    if (primary === "normalPHAbnormalValues") {
      if (acidMet) doMetAcid();
      else if (alkMet) doMetAlk();
      if (acidResp) doRespAcid();
      else if (alkResp) doRespAlk();
    }
    if (compensations.some(function(x){return x.direction==="acute" || x.direction==="chronic";})) warnings.push("timingMatters");
    var ag = null;
    if (hasNa) {
      var raw=v.na-v.cl-v.hco3;
      var corrected=hasAlb ? raw+2.5*(4-v.albumin) : null;
      var working=hasAlb ? corrected : raw;
      var category=working > 12 ? "highAG" : working < 4 ? "lowAG" : "normalAG";
      ag={raw:raw, corrected:corrected, used:working, category:category,delta:null,deltaStatus:null};
      if (working>12 && v.hco3<24) {
        var delta=(working-12)/(24-v.hco3);
        ag.delta=delta;
        ag.deltaStatus=delta < 1 ? "deltaUnderOne" : delta > 2 ? "deltaAboveTwo" : "deltaOneToTwo";
      }
      if (!hasAlb) warnings.push("checkAlbumin");
      warnings.push("agLabRange");
    }
    return {phStatus:phStatus,primary:primary,compensations:compensations,warnings:Array.from(new Set(warnings)),ag:ag,predictedPH:predictedPH};
  }
  root.CAPAAcidBase = Object.freeze({classify:classify});
  if (typeof module !== "undefined" && module.exports) module.exports=root.CAPAAcidBase;
})(typeof globalThis !== "undefined" ? globalThis : this);
