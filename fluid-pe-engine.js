/* CAPA Tools: ascites interpretation and pulmonary risk tools.
   Browser-side calculations only. These are flags, NOT clinical diagnoses.
   Units are explicitly defined in the four-language form metadata. */
(function(root){
"use strict";
function finite(v,key,min,max){
 const x=v[key];
 if(typeof x!=="number" || !Number.isFinite(x) || x<min || x>max)throw Error("Invalid "+key);
 return x;
}
function binary(v,key){
 const x=v[key];if(x!==0&&x!==1)throw Error("Invalid "+key);return x;
}
function optional(v,key,min,max){
 if(!Object.prototype.hasOwnProperty.call(v,key))return null;
 return finite(v,key,min,max);
}
const valid=["ascitesfluid","light","wellspe","perc"];
function compute(id,v){
 if(!valid.includes(id))throw Error("Unknown tool");
 let value=0,interpretation="",extra=[],notes=[];
 if(id==="ascitesfluid"){
   const pmn=finite(v,"pmn",0,1000000);
   const rbc=optional(v,"rbc",0,10000000);
   // Subtract 1 PMN for each 250 RBC in bloody ascites if RBC supplied.
   const corrected=rbc!==null?Math.max(0,pmn-rbc/250):pmn;
   value=corrected;
   interpretation=corrected>=250?"ascitesPmnHigh":"ascitesPmnLow";
   if(rbc!==null){
     extra.push({key:"fluidRbc",value:rbc,unit:"cells/µL"});
     if(rbc>=10000)notes.push("hemorrhagicAscites");
     if(rbc>=10000)notes.push("rbcCorrectionCaution");
   }
   const protein=optional(v,"fluidProtein",0,15);
   const glucose=optional(v,"fluidGlucose",0,600);
   const ldh=optional(v,"fluidLdh",0,20000);
   const serumLdhULN=optional(v,"serumLdhUln",50,3000);
   if((ldh===null)!==(serumLdhULN===null))
     throw Error("Provide fluid LDH and serum LDH ULN together");
   const params=[protein!==null,glucose!==null,ldh!==null].filter(Boolean).length;
   const positive=(protein!==null&&protein>1?1:0)+
     (glucose!==null&&glucose<50?1:0)+
     (ldh!==null&&ldh>serumLdhULN?1:0);
   if(params>=2 && positive>=2)notes.push("possibleSecondaryPeritonitis");
   if(params<3)notes.push("incompleteSecondaryWorkup");
   if(corrected>=250)notes.push("urgentAscitesAssessment");
   else notes.push("ascitesDoesNotExcludeInfection");
   if(rbc===null)notes.push("rbcNotProvided");
   extra.push({key:"secondaryCriteria",value:positive,unit:" / "+params});
 }
 if(id==="light"){
   const fp=finite(v,"fluidProtein",0,15);
   const sp=finite(v,"serumProtein",0.1,15);
   const fl=finite(v,"fluidLdh",0,20000);
   const sl=finite(v,"serumLdh",1,20000);
   const uln=finite(v,"serumLdhUln",50,3000);
   const pr=fp/sp,lr=fl/sl,lim=(2/3)*uln;
   const first=pr>0.5,second=lr>0.6,third=fl>lim;
   value=Number(first)+Number(second)+Number(third);
   interpretation=value>0?"lightExudate":"lightTransudate";
   extra.push({key:"lightProteinRatio",value:pr,unit:""});
   extra.push({key:"lightLdhRatio",value:lr,unit:""});
   extra.push({key:"lightLdhThreshold",value:lim,unit:"U/L"});
   const sa=optional(v,"serumAlbumin",0,8);
   const fa=optional(v,"fluidAlbumin",0,8);
   if((sa===null)!==(fa===null))throw Error("Paired albumin values required");
   if(sa!==null){
     const gradient=sa-fa;
     extra.push({key:"serumPleuralAlbuminGradient",value:gradient,unit:"g/dL"});
     if(value>=1 && gradient>1.2)notes.push("pseudoexudatePossible");
   }
   if(value===0)notes.push("lightContext");
 }
 if(id==="wellspe"){
   const hr=finite(v,"hr",20,250);
   value=3*binary(v,"dvtSigns")+3*binary(v,"peMostLikely")+
       (hr>100?1.5:0)+1.5*binary(v,"immobileSurgery")+
       1.5*binary(v,"priorVte")+binary(v,"hemoptysis")+binary(v,"activeCancer");
   interpretation=value>4?"wellsLikely":"wellsUnlikely";
   extra.push({key:"wellsThreeTier",value:value<2?1:value<=6?2:3,unit:""});
   notes.push("wellsNoDiagnosis");
 }
 if(id==="perc"){
   const low=binary(v,"lowPretest");
   const age=finite(v,"age",18,120),hr=finite(v,"hr",20,250),spo2=finite(v,"spo2",50,100);
   const positive=Number(age>=50)+Number(hr>=100)+Number(spo2<95)+
     binary(v,"unilateralSwelling")+binary(v,"hemoptysis")+
     binary(v,"recentTraumaSurgery")+binary(v,"priorVte")+binary(v,"hormones");
   value=positive;
   interpretation=low===0?"percInapplicable":positive===0?"percNegative":"percPositive";
   notes.push("percOnlyLowProbability");
   if(positive>0)notes.push("percPositiveNotDiagnosis");
 }
 if(!Number.isFinite(value))throw Error("Nonfinite score");
 return {value,interpretation,extra,notes};
}
root.CAPAFluidPE=Object.freeze({supports:id=>valid.includes(id),compute});
if(typeof module!=="undefined"&&module.exports)module.exports=root.CAPAFluidPE;
})(typeof globalThis!=="undefined"?globalThis:this);
