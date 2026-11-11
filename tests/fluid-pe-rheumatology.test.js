/* Run: node --test tests/fluid-pe-rheumatology.test.js
   Regression checks for thresholds, units, missing fields and scope restrictions. */
const test=require("node:test");
const assert=require("node:assert/strict");
const fluid=require("../fluid-pe-engine.js");
const rheum=require("../rheum-engine.js");
test("ascites PMN exactly 250 is flagged",()=>{
 assert.equal(fluid.compute("ascitesfluid",{pmn:250}).interpretation,"ascitesPmnHigh");
 assert.equal(fluid.compute("ascitesfluid",{pmn:249}).interpretation,"ascitesPmnLow");
});
test("bloody ascites subtracts 1 PMN per 250 RBC",()=>{
 const out=fluid.compute("ascitesfluid",{pmn:300,rbc:25000});
 assert.equal(out.value,200);
 assert.equal(out.interpretation,"ascitesPmnLow");
 assert.ok(out.notes.includes("hemorrhagicAscites"));
 assert.ok(out.notes.includes("rbcCorrectionCaution"));
});
test("secondary peritonitis biochemistry flags 2/3 criteria",()=>{
 const out=fluid.compute("ascitesfluid",{pmn:400,fluidProtein:1.5,fluidGlucose:30,fluidLdh:300,serumLdhUln:200});
 assert.ok(out.notes.includes("possibleSecondaryPeritonitis"));
 assert.equal(out.extra.find(e=>e.key==="secondaryCriteria").value,3);
});
test("incomplete peritonitis panel never claims rule out",()=>{
 const out=fluid.compute("ascitesfluid",{pmn:25,fluidGlucose:90});
 assert.ok(out.notes.includes("incompleteSecondaryWorkup"));
});
test("fluid LDH and serum ULN are a mandatory pair",()=>{
 assert.throws(()=>fluid.compute("ascitesfluid",{pmn:280,fluidLdh:300}));
});
const lightBase={fluidProtein:3.5,serumProtein:7,fluidLdh:100,serumLdh:200,serumLdhUln:250};
test("Light borderline ratio 0.5 does not exceed cutoff",()=>{
 assert.equal(fluid.compute("light",lightBase).value,0);
 assert.equal(fluid.compute("light",{...lightBase,fluidProtein:3.51}).value,1);
});
test("Light detects elevated pleural LDH and pseudoexudate clue",()=>{
 const out=fluid.compute("light",{...lightBase,fluidLdh:200,serumAlbumin:3,fluidAlbumin:1});
 assert.ok(out.value>=1);
 assert.ok(out.notes.includes("pseudoexudatePossible"));
});
test("Light paired albumin fields required if used",()=>{
 assert.throws(()=>fluid.compute("light",{...lightBase,serumAlbumin:3}));
});
const wellsBase={dvtSigns:0,peMostLikely:0,hr:70,immobileSurgery:0,priorVte:0,hemoptysis:0,activeCancer:0};
test("Wells PE threshold is strictly greater than 4 for PE likely",()=>{
 assert.equal(fluid.compute("wellspe",{...wellsBase,dvtSigns:1,hemoptysis:1}).interpretation,"wellsUnlikely");
 assert.equal(fluid.compute("wellspe",{...wellsBase,dvtSigns:1,peMostLikely:1}).interpretation,"wellsLikely");
});
const percBase={lowPretest:1,age:40,hr:80,spo2:98,unilateralSwelling:0,hemoptysis:0,recentTraumaSurgery:0,priorVte:0,hormones:0};
test("PERC requires low gestalt and all eight negative",()=>{
 assert.equal(fluid.compute("perc",percBase).interpretation,"percNegative");
 assert.equal(fluid.compute("perc",{...percBase,lowPretest:0}).interpretation,"percInapplicable");
 assert.equal(fluid.compute("perc",{...percBase,age:50}).interpretation,"percPositive");
 assert.equal(fluid.compute("perc",{...percBase,spo2:94}).interpretation,"percPositive");
});
const masBase={fever:1,sjia:1,ferritin:685,platelets:180,ast:49,triglycerides:100,fibrinogen:400};
test("MAS 2016 needs fever, sJIA, ferritin above 684 and two other findings",()=>{
 assert.equal(rheum.compute("mas2016",masBase).interpretation,"masCriteriaMet");
 assert.equal(rheum.compute("mas2016",{...masBase,ferritin:684}).interpretation,"masCriteriaNotMet");
 assert.equal(rheum.compute("mas2016",{...masBase,sjia:0}).interpretation,"masScope");
 assert.equal(rheum.compute("mas2016",{...masBase,fever:0}).interpretation,"masScope");
});
test("steroid equivalence Deltacortril 5mg ~ Prednol 4mg",()=>{
 assert.equal(rheum.compute("steroidEquivalent",{fromAgent:"prednisolone",dose:5,toAgent:"methylprednisolone"}).value,4);
 assert.equal(rheum.compute("steroidEquivalent",{fromAgent:"methylprednisolone",dose:4,toAgent:"prednisolone"}).value,5);
 assert.equal(rheum.compute("steroidEquivalent",{fromAgent:"hydrocortisone",dose:20,toAgent:"prednisolone"}).value,5);
});
const coverBase={agent:"prednisolone",dose:5,durationWeeks:8,recentStopped:0,knownAI:0,oralPossible:1,unstable:0,stress:"minor"};
test("stress coverage differentiates stable minor and possible crisis",()=>{
 assert.equal(rheum.compute("stressSteroid",coverBase).interpretation,"stressOral");
 assert.equal(rheum.compute("stressSteroid",{...coverBase,oralPossible:0}).interpretation,"stressParenteral");
 assert.equal(rheum.compute("stressSteroid",{...coverBase,unstable:1}).interpretation,"stressUrgent");
 assert.equal(rheum.compute("stressSteroid",{...coverBase,dose:12}).interpretation,"stressAlreadyCovered");
});
