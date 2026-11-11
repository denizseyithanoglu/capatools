/* CAPA Tools — macrophage activation syndrome classification and steroid guidance.
   MAS 2016 EULAR/ACR/PRINTO applies to febrile suspected/known sJIA, not all adults.
   Steroid conversion is ANTI-INFLAMMATORY equivalence, NOT a prescription.
   Stress coverage is qualitative clinical decision support, not dosing orders. */
(function(root) {
"use strict";
function num(v,k,lo,hi){let x=v[k];if(typeof x!=="number"||!Number.isFinite(x)||x<lo||x>hi)throw Error("Invalid "+k);return x;}
function bit(v,k){let x=v[k];if(x!==0&&x!==1)throw Error("Invalid "+k);return x;}
function choice(v,k,opts){let x=v[k];if(!opts.includes(x))throw Error("Invalid "+k);return x;}
const POTENCY={prednisolone:5,prednisone:5,methylprednisolone:4,hydrocortisone:20,dexamethasone:0.75,triamcinolone:4,betamethasone:0.6};
function steroidToPred(dose,agent){choice({agent},"agent",Object.keys(POTENCY));return dose/POTENCY[agent]*5;}
function compute(id,v){
 let value=0,interpretation="",extra=[],notes=[],displayKey=null;
 if(id==="mas2016"){
   const fever=bit(v,"fever"),sjia=bit(v,"sjia");
   const ferritin=num(v,"ferritin",0,1000000);
   const platelets=num(v,"platelets",0,2000);
   const ast=num(v,"ast",0,50000);
   const tg=num(v,"triglycerides",0,10000);
   const fib=num(v,"fibrinogen",0,1500);
   value=Number(platelets<=181)+Number(ast>48)+Number(tg>156)+Number(fib<=360);
   interpretation=fever===0||sjia===0?"masScope":ferritin>684&&value>=2?"masCriteriaMet":"masCriteriaNotMet";
   extra.push({key:"masFerritinGate",value:Number(ferritin>684),unit:" / 1"});
   if(interpretation==="masCriteriaMet")notes.push("masUrgent");
   else notes.push("masNotExcluded");
   notes.push("masNotAdultValidated");
 }
 else if(id==="steroidEquivalent"){
   const from=choice(v,"fromAgent",Object.keys(POTENCY));
   const to=choice(v,"toAgent",Object.keys(POTENCY));
   const dose=num(v,"dose",0,1000);
   value=dose/POTENCY[from]*POTENCY[to];
   extra.push({key:"prednisoloneEquivalent",value:steroidToPred(dose,from),unit:"mg"});
   notes.push("steroidAntiInflammatoryOnly");
 }
 else if(id==="stressSteroid"){
   const agent=choice(v,"agent",Object.keys(POTENCY));
   const dose=num(v,"dose",0,1000);
   const weeks=num(v,"durationWeeks",0,520);
   const recent=bit(v,"recentStopped");
   const provenAI=bit(v,"knownAI");
   const canOral=bit(v,"oralPossible");
   const unstable=bit(v,"unstable");
   const stress=choice(v,"stress",["minor","moderateMajor","suspectedCrisis"]);
   const predEq=steroidToPred(dose,agent);
   extra.push({key:"prednisoloneEquivalent",value:predEq,unit:"mg/day"});
   value=0;
   // No HPA test and current/recent systemic steroid exposure is not proof of recovery.
   const possibleSuppression=provenAI===1||recent===1||weeks>=3&&predEq>=4||
     (dose>0&&weeks>=1);
   if(stress==="suspectedCrisis"||unstable===1){
     interpretation="stressUrgent";displayKey="stressParenteralLabel";
     notes.push("adrenalCrisisWarning");
   }else if(!possibleSuppression){
     interpretation="stressReview";displayKey="stressReviewLabel";
     notes.push("noAutomaticClearance");
   }else if(stress==="moderateMajor"||canOral===0){
     interpretation="stressParenteral";displayKey="stressParenteralLabel";
     notes.push("stressProcedureTeam");
   }else if(predEq>=10&&dose>0&&canOral===1&&recent===0&&provenAI===0){
     interpretation="stressAlreadyCovered";displayKey="stressOralLabel";
     notes.push("usualDoseMayCoverMinor");
   }else{
     interpretation="stressOral";displayKey="stressOralLabel";
     notes.push("minorStressOral");
   }
   notes.push("stressNoUniversalDose");
 }
 else throw Error("Unknown rheumatology tool");
 if(!Number.isFinite(value))throw Error("Bad result");
 return {value,interpretation,extra,notes,displayKey};
}
const ids=["mas2016","steroidEquivalent","stressSteroid"];
root.CAPARheum=Object.freeze({supports:id=>ids.includes(id),compute});
if(typeof module!=="undefined"&&module.exports)module.exports=root.CAPARheum;
})(typeof globalThis!=="undefined"?globalThis:this);
