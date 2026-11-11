"use strict";
const assert = require("node:assert/strict");
const {compute} = require("../engine.js");
const base={serumPhosphate:2,urinePhosphate:40,serumCreatinine:1,urineCreatinine:100,phosphateUnit:"mg/dL",creatinineUnit:"mg/dL"};
function calc(v={}){return compute("tmpgfr",{...base,...v});}
function near(a,b){assert.ok(Math.abs(a-b)<1e-9, a+" != "+b);}
near(calc().value,1.6);
near(calc().extra[1].value,80);
near(calc().extra[2].value,20);
near(calc({urinePhosphate:28}).value,1.72);
near(calc({urinePhosphate:20}).value,1.928571428571429);
near(calc({urinePhosphate:0}).value,3);
near(calc({urinePhosphate:200}).value,0);
near(calc({serumPhosphate:2/3.0974,urinePhosphate:40/3.0974,phosphateUnit:"mmol/L"}).value,1.6);
near(calc({serumCreatinine:88.4,urineCreatinine:8840,creatinineUnit:"umol/L"}).value,1.6);
near(calc({serumCreatinine:0.0884,urineCreatinine:8.84,creatinineUnit:"mmol/L"}).value,1.6);
for(const v of [{serumPhosphate:0},{urineCreatinine:0},{serumCreatinine:-1},{urinePhosphate:-1},{urinePhosphate:201},{serumPhosphate:NaN},{serumCreatinine:Infinity},{phosphateUnit:"mg/L"},{creatinineUnit:"bad"},{serumPhosphate:undefined}])assert.throws(()=>calc(v));
near(compute("urinecalcium24h",{urineCalcium:10,urineVolume:2000}).value,200);
near(compute("caxp",{calcium:10,phosphate:4}).value,40);
console.log("TmP/GFR: formula branches, units, invalid inputs and calcium regression checks passed.");
