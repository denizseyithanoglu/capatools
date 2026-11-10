/* Clinical screening score computations.
   Inputs are locally computed, never sent to a backend.
   This is a clinical decision SUPPORT prototype, not a diagnostic service.
   See the source URLs on each corresponding calculator for validation guidance. */
(function(root) {
"use strict";
function check(condition,msg){if(!condition)throw new Error(msg||"Invalid score input");}
function number(v,k,min,max) {
  var n=v[k];
  check(typeof n==="number"&&Number.isFinite(n)&&n>=min&&n<=max,"Invalid "+k);
  return n;
}
function oneOf(v,k,values){var x=v[k];check(values.includes(x),"Invalid "+k);return x;}
function yn(v,k){return oneOf(v,k,[0,1]);}
var ids=["sarcf","mnasf","gds15","minicog","mascc","saag","gbs","aims65","prerockall","ecog","karnofsky"];
function compute(id,v) {
  check(ids.includes(id),"Unknown score");
  check(v&&typeof v==="object","Missing inputs");
  var score=0,interpretation="",extra=[];
  switch(id) {
    case "ecog": {
      score=oneOf(v,"performance",[0,1,2,3,4,5]);
      interpretation="ecogGrade"+score;
      break;
    }
    case "karnofsky": {
      score=oneOf(v,"performance",[0,10,20,30,40,50,60,70,80,90,100]);
      interpretation="kpsGrade"+score;
      break;
    }
    case "sarcf": {
      ["sfStrength","sfWalking","sfChair","sfStairs","sfFalls"].forEach(function(k){score+=oneOf(v,k,[0,1,2]);});
      interpretation=score>=4?"sarcPositive":"sarcNegative";
      break;
    }
    case "mnasf": {
      score=oneOf(v,"mnaA",[0,1,2])+oneOf(v,"mnaB",[0,1,2,3])+
        oneOf(v,"mnaC",[0,1,2])+oneOf(v,"mnaD",[0,2])+
        oneOf(v,"mnaE",[0,1,2]);
      var anthrop=oneOf(v,"mnaF",["bmi0","bmi1","bmi2","bmi3","cc0","cc3"]);
      score+=Number(anthrop.slice(-1));
      interpretation=score>=12?"mnaNormal":score>=8?"mnaRisk":"mnaMalnourished";
      break;
    }
    case "gds15": {
      var reverse=new Set([1,5,7,11,13]);
      for(var i=1;i<=15;i++){
        var answer=yn(v,"gds"+i);
        score+=reverse.has(i)?1-answer:answer;
      }
      interpretation=score<=4?"gdsNegative":score<=8?"gdsPositive":"gdsHigh";
      break;
    }
    case "minicog": {
      score=oneOf(v,"recall",[0,1,2,3])+oneOf(v,"clock",[0,2]);
      interpretation=score<3?"miniHigh":"miniLow";
      break;
    }
    case "mascc": {
      var burden=oneOf(v,"burden",[0,3,5]);
      var sbp=number(v,"sbp",40,300),age=number(v,"age",18,120);
      score=burden+(sbp>90?5:0)+4*yn(v,"noCopd")+
        4*yn(v,"tumorFungus")+3*yn(v,"noDehydration")+
        3*yn(v,"outpatient")+(age<60?2:0);
      interpretation=score>=21?"masccLow":"masccHigh";
      break;
    }
    case "saag": {
      var serum=number(v,"serumAlbumin",0,8),fluid=number(v,"ascitesAlbumin",0,8);
      score=serum-fluid;
      interpretation=score>=1.1-1e-9?"saagPortal":"saagOther";
      break;
    }
    case "gbs": {
      var urea=number(v,"urea",0,100);
      var hb=number(v,"hb",0,25);
      var sbpG=number(v,"sbp",40,300);
      var hr=number(v,"hr",20,250);
      var sex=oneOf(v,"sex",["m","f"]);
      score+=(urea>=25?6:urea>=10?4:urea>=8?3:urea>=6.5?2:0);
      if(sex==="m")score+=(hb<10?6:hb<12?3:hb<13?1:0);
      else score+=(hb<10?6:hb<12?1:0);
      score+=(sbpG<90?3:sbpG<100?2:sbpG<110?1:0);
      score+=(hr>=100?1:0);
      score+=yn(v,"melena")+2*yn(v,"syncope")+
        2*yn(v,"liverDisease")+2*yn(v,"heartFailure");
      interpretation=score<=1?"gbsVeryLow":"gbsElevated";
      break;
    }
    case "aims65": {
      var albumin=number(v,"albumin",0,8);
      var inr=number(v,"inr",0.5,15);
      var sbpA=number(v,"sbp",40,300);
      var ageA=number(v,"age",18,120);
      score=(albumin<3?1:0)+(inr>1.5?1:0)+yn(v,"altered")+
        (sbpA<=90?1:0)+(ageA>65?1:0);
      interpretation=score>=2?"aimsHigher":"aimsLower";
      break;
    }
    case "prerockall": {
      var a=number(v,"age",18,120),p=number(v,"hr",20,250),s=number(v,"sbp",40,300);
      var comorbidity=oneOf(v,"comorbidity",[0,2,3]);
      score=(a>=80?2:a>=60?1:0)+(s<100?2:p>=100?1:0)+comorbidity;
      interpretation=score>=3?"rockallHigher":"rockallCaution";
      break;
    }
  }
  check(Number.isFinite(score),"Non-finite result");
  return {value:score,interpretation:interpretation,extra:extra};
}
root.CAPAScores=Object.freeze({supports:function(id){return ids.includes(id);},compute:compute});
if(typeof module!=="undefined"&&module.exports)module.exports=root.CAPAScores;
})(typeof globalThis!=="undefined"?globalThis:this);
