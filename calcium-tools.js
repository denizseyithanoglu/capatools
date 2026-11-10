/* Calcium metabolism calculations; input units fixed explicitly.
 * Clinical utility is limited, especially in critical illness and CKD.
 * Reference: Endotext; KDIGO CKD-MBD 2017 guideline. */
(function(root) {
"use strict";
var D=root.CAPAData;if(!D||!Array.isArray(D.tools))return;
var T=function(tr,az,ar,en){return {tr:tr,az:az,ar:ar,en:en};};
var n=function(key,label,unit,min,max) {
 return {key:key,label:label,unit:unit,kind:"number",min:min,max:max};
};
var ca=T("Total serum kalsiyum","Total serum kalsium","الكالسيوم الكلي في المصل","Total serum calcium");
var alb=T("Serum albümin","Serum albumin","ألبومين المصل","Serum albumin");
D.tools.push({
 id:"correctedcalcium",group:"endocrinology",icon:"🦴",
 title:T("Albümin Düzeltilmiş Kalsiyum","Albuminə görə düzəldilmiş kalsium","الكالسيوم المصحح للألبومين","Albumin-Adjusted Calcium"),
 summary:T("Total kalsiyumu albümine göre klasik formülle düzeltir.","Total kalsiumu albuminə görə klassik düsturla hesablayır.","تصحيح الكالسيوم الكلي بناءً على ألبومين المصل.","Estimate albumin-adjusted total calcium."),
 fields:[n("calcium",ca,"mg/dL",0,25),n("albumin",alb,"g/dL",0,8)],
 unit:"mg/dL",decimals:2,
 warning:T("ÖNEMLİ: Albümin düzeltmesi iyonize kalsiyumun güvenilir bir karşılığı değildir. Özellikle kritik hastalık, asit-baz bozuklukları ve ileri KBH'de yanlış sınıflandırma olabilir. Tedavi kararını etkiliyorsa doğrudan iyonize kalsiyum ölçün.","VACİB: Albumin korreksiyası ionlaşmış kalsiumun etibarlı əvəzi deyil. Kritik xəstəlik, turşu-qələvi pozğunluğu və ağır XBX-də ionlaşmış kalsiumu ölçün.","مهم: تصحيح الكالسيوم بالألبومين لا يعوّض قياس الكالسيوم المتأين بدقة، لا سيما في المرض الحرج واضطرابات الحمض والقاعدة والقصور الكلوي المتقدم.","IMPORTANT: Albumin adjustment is not a reliable surrogate for ionized calcium, particularly in critical illness, acid–base disorders and advanced CKD. Measure ionized calcium when management depends on accurate calcium status."),
 formula:"Corrected Ca (mg/dL) = total Ca (mg/dL) + 0.8 × [4 − albumin (g/dL)].",
 source:"Endotext — Approach to Hypercalcemia",
 sourceUrl:"https://www.ncbi.nlm.nih.gov/books/NBK279129/"
});
D.tools.push({
 id:"caxp",group:"nephrology",icon:"⚛️",
 title:T("Kalsiyum × Fosfor (Ca×P)","Kalsium × Fosfor (Ca×P)","حاصل ضرب الكالسيوم × الفوسفور","Calcium × Phosphorus (Ca×P)"),
 summary:T("Total kalsiyum ve serum fosforunun aritmetik çarpımı.","Total kalsium və serum fosforunun riyazi hasili.","حاصل ضرب الكالسيوم الكلي والفوسفور في المصل.","Arithmetic product of total serum calcium and phosphorus."),
 fields:[
 n("calcium",ca,"mg/dL",0,25),
 n("phosphate",T("Serum fosfor (fosfat olarak raporlanan)","Serum fosfor (fosfat nəticəsi)","فوسفور المصل (الفوسفات المُبلغ عنه)","Serum phosphorus (reported as phosphate)"),"mg/dL",0,30)
 ],
 unit:"mg²/dL²",decimals:2,
 warning:T("KDIGO CKD-MBD, tedaviyi Ca×P çarpımına göre değil, kalsiyum ve fosfat değerlerinin birlikte ve zaman içindeki seyriyle yönlendirmeyi önerir. Bu araç yalnızca aritmetik çarpımı sunar; tek başına risk/tedavi eşiği kullanmayın. Ca ve fosforun her ikisi de mg/dL olmalıdır.","KDIGO CKD-MBD qərarları Ca×P hasilinə deyil, ayrı-ayrı kalsium və fosfat göstəricilərinə və dəyişməsinə əsaslandırır. Bu yalnız riyazi hesablamadır; hər iki dəyər mg/dL olmalıdır.","توصي KDIGO بتقييم الكالسيوم والفوسفات كلًّا على حدة وبحسب الاتجاه الزمني بدل الاعتماد على حاصل الضرب وحده. هذه عملية حسابية فقط؛ يجب إدخال القيمتين بوحدة mg/dL.","KDIGO CKD-MBD recommends using individual calcium and phosphate values together and their trends, rather than Ca×P alone, to guide care. This is arithmetic only, not a treatment threshold. Both inputs must be in mg/dL."),
 formula:"Ca×P (mg²/dL²) = total Ca (mg/dL) × serum phosphorus (mg/dL).",
 source:"KDIGO 2017 CKD-MBD — Recommendation 3.1.5",
 sourceUrl:"https://pmc.ncbi.nlm.nih.gov/articles/PMC6340919/"
});
})(typeof globalThis!=="undefined"?globalThis:this);
