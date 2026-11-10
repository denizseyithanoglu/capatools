/* Run: node --test tests/clinical-scores.test.js
   Regression checks for clinical arithmetic and thresholds.
   Does NOT replace clinician validation of actual instrument administration. */
const test=require("node:test");
const assert=require("node:assert/strict");
const scores=require("../clinical-scores.js");
const calc=require("../engine.js");
const get=(id,inputs)=>scores.compute(id,inputs);
const gds=(depressed)=>Object.fromEntries(Array.from({length:15},(_,i)=>{
  const k=i+1,reverse=[1,5,7,11,13].includes(k);
  return ["gds"+k,depressed?(reverse?0:1):(reverse?1:0)];
}));

test("SARC-F maximum and positive screening threshold",()=>{
  const inputs={sfStrength:1,sfWalking:1,sfChair:1,sfStairs:1,sfFalls:0};
  assert.equal(get("sarcf",inputs).value,4);
  assert.equal(get("sarcf",inputs).interpretation,"sarcPositive");
  assert.equal(get("sarcf",{...inputs,sfStairs:0}).interpretation,"sarcNegative");
  assert.equal(get("sarcf",{sfStrength:2,sfWalking:2,sfChair:2,sfStairs:2,sfFalls:2}).value,10);
});
test("MNA-SF yields 14 for maximum and accepts calf alternative",()=>{
  const inputs={mnaA:2,mnaB:3,mnaC:2,mnaD:2,mnaE:2};
  assert.equal(get("mnasf",{...inputs,mnaF:"bmi3"}).value,14);
  assert.equal(get("mnasf",{...inputs,mnaF:"cc0"}).value,11);
  assert.throws(()=>get("mnasf",{...inputs,mnaF:"cc2"}));
});
test("GDS-15 scoring direction and boundaries",()=>{
  assert.equal(get("gds15",gds(false)).value,0);
  assert.equal(get("gds15",gds(true)).value,15);
  assert.equal(get("gds15",{...gds(false),gds2:1,gds3:1,gds4:1,gds6:1,gds8:1}).interpretation,"gdsPositive");
});
test("Mini-Cog 0–5, positive under 3",()=>{
  assert.equal(get("minicog",{recall:0,clock:0}).interpretation,"miniHigh");
  assert.equal(get("minicog",{recall:3,clock:2}).value,5);
  assert.equal(get("minicog",{recall:1,clock:2}).interpretation,"miniLow");
});
test("MASCC maximum and low-risk 21 threshold",()=>{
  const base={burden:5,sbp:100,age:50,noCopd:1,tumorFungus:1,noDehydration:1,outpatient:1};
  assert.equal(get("mascc",base).value,26);
  assert.equal(get("mascc",base).interpretation,"masccLow");
  const boundary={...base,sbp:90,age:60};
  assert.equal(get("mascc",boundary).value,19);
  assert.equal(get("mascc",boundary).interpretation,"masccHigh");
});
test("SAAG is robust at floating-point 1.1 boundary",()=>{
  assert.equal(get("saag",{serumAlbumin:2.1,ascitesAlbumin:1}).interpretation,"saagPortal");
  assert.equal(get("saag",{serumAlbumin:2,ascitesAlbumin:1}).interpretation,"saagOther");
});
test("GBS minimum and upper limit",()=>{
  const base={urea:5,hb:14,sbp:120,hr:85,sex:"m",melena:0,syncope:0,liverDisease:0,heartFailure:0};
  assert.equal(get("gbs",base).value,0);
  assert.equal(get("gbs",{...base,melena:1}).interpretation,"gbsVeryLow");
  assert.equal(get("gbs",{...base,urea:25,hb:7,sbp:80,hr:120,melena:1,syncope:1,liverDisease:1,heartFailure:1}).value,23);
});
test("AIMS65 and pre-endoscopy Rockall upper limits",()=>{
  assert.equal(get("aims65",{albumin:2.2,inr:2,altered:1,sbp:90,age:66}).value,5);
  assert.equal(get("prerockall",{age:85,hr:120,sbp:90,comorbidity:3}).value,7);
});
test("ECOG is an enumerated scale from 0 to 5",()=>{
  for(let i=0;i<=5;i++)assert.equal(get("ecog",{performance:i}).value,i);
  assert.throws(()=>get("ecog",{performance:6}));
});
test("Karnofsky increments of 10 from 0 to 100",()=>{
  for(let i=0;i<=100;i+=10)assert.equal(get("karnofsky",{performance:i}).value,i);
  assert.throws(()=>get("karnofsky",{performance:35}));
});
test("Albumin-adjusted calcium classic formula with mg/dL and g/dL",()=>{
  assert.ok(Math.abs(calc.compute("correctedcalcium",{calcium:8,albumin:2}).value-9.6)<1e-10);
  assert.ok(Math.abs(calc.compute("correctedcalcium",{calcium:10,albumin:4.5}).value-9.6)<1e-10);
});
test("Ca × P arithmetic uses both concentrations in mg/dL",()=>{
  assert.equal(calc.compute("caxp",{calcium:9.5,phosphate:4.5}).value,42.75);
  assert.throws(()=>calc.compute("caxp",{calcium:9.5,phosphate:-1}));
});
