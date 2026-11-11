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

D.tools.push({
 id:"urinecalcium24h",group:"endocrinology",icon:"🧪",
 title:T("24 Saatlik İdrar Kalsiyum Atılımı","24 saatlıq sidik kalsium ifrazı","طرح الكالسيوم في البول خلال 24 ساعة","24-Hour Urinary Calcium Excretion"),
 summary:T("İdrar kalsiyum konsantrasyonu ve 24 saatlik toplam hacimden günlük atılımı hesaplar.","Sidik kalsium konsentrasiyası və 24 saatlıq ümumi həcmdən gündəlik ifrazı hesablayır.","حساب الطرح اليومي من تركيز الكالسيوم وحجم البول المجمع خلال 24 ساعة.","Calculate daily excretion from urine calcium concentration and total 24-hour urine volume."),
 fields:[
 n("urineCalcium",T("İdrar kalsiyum konsantrasyonu","Sidik kalsium konsentrasiyası","تركيز الكالسيوم في البول","Urine calcium concentration"),"mg/dL",0,1000),
 n("urineVolume",T("24 saatlik toplam idrar hacmi","24 saatlıq ümumi sidik həcmi","حجم البول الكلي خلال 24 ساعة","Total 24-hour urine volume"),"mL",1,30000)
 ],
 unit:"mg/24 h",decimals:1,
 warning:T("Tam 24 saatlik koleksiyon kullanın. Serum kalsiyumunu veya zaten mg/24 saat olarak raporlanmış sonucu girmeyin. Eksik toplama sonucu etkiler; laboratuvar referans aralığı ve klinik bağlamla değerlendirin.","Tam 24 saatlıq sidik kolleksiyasından istifadə edin. Serum kalsiumunu və ya artıq mg/24 saat kimi verilmiş nəticəni daxil etməyin. Natamam toplama nəticəyə təsir edir; laboratoriya referensləri və klinik vəziyyətlə qiymətləndirin.","استخدم تجميع البول الكامل لمدة 24 ساعة. لا تدخل كالسيوم المصل أو نتيجة محسوبة مسبقاً بوحدة mg/24 h. يؤثر نقص التجميع على النتيجة؛ فسّرها وفق المجال المرجعي للمختبر والسياق السريري.","Use a complete 24-hour collection. Do not enter serum calcium or a result already reported in mg/24 h. Incomplete collection affects the result; interpret using the laboratory reference interval and clinical context."),
 formula:"Urine Ca (mg/24 h) = urine Ca (mg/dL) × 24-hour urine volume (mL) / 100.",
 source:"Mayo Clinic Laboratories — CALU: Calcium, 24 Hour, Urine",
 sourceUrl:"https://www.mayocliniclabs.com/test-catalog/overview/610595"
});


Object.assign(D.UI,{
 tmpSI:T("TmP/GFR (SI)","TmP/GFR (SI)","TmP/GFR (SI)","TmP/GFR (SI)"),
 phosphateTRP:T("Tübüler fosfat geri emilimi (TRP)","Fosfatın tubulyar reabsorbsiyası (TRP)","إعادة امتصاص الفوسفات الأنبوبي (TRP)","Tubular phosphate reabsorption (TRP)"),
 phosphateFE:T("Fraksiyonel fosfat atılımı (FEPO₄)","Fosfatın fraksional ifrazı (FEPO₄)","الإطراح الجزئي للفوسفات (FEPO₄)","Fractional phosphate excretion (FEPO₄)")
});
D.tools.push({
 id:"tmpgfr",group:"endocrinology",icon:"🧪",
 title:T("Renal Fosfat — TmP/GFR, TRP ve FEPO₄","Renal fosfat — TmP/GFR, TRP və FEPO₄","الفوسفات الكلوي — TmP/GFR وTRP وFEPO₄","Renal Phosphate — TmP/GFR, TRP and FEPO₄"),
 summary:T("Erişkinlerde eş zamanlı serum ve idrar fosfat/kreatinin değerlerinden renal fosfat geri emilimini hesaplar.","Böyüklərdə eyni vaxtda alınmış serum və sidik fosfat/kreatinin nəticələrindən fosfat reabsorbsiyasını hesablayır.","حساب إعادة امتصاص الفوسفات لدى البالغين من عينات مصل وبول متزامنة للفوسفات والكرياتينين.","Calculate adult renal phosphate handling from paired serum and urine phosphate/creatinine concentrations."),
 fields:[
 {key:"phosphateUnit",kind:"select",label:T("Fosfat birimi (serum ve idrar)","Fosfat vahidi (serum və sidik)","وحدة الفوسفات (المصل والبول)","Phosphate unit (serum and urine)"),options:[{value:"mg/dL",label:"mg/dL"},{value:"mmol/L",label:"mmol/L"}]},
 {key:"creatinineUnit",kind:"select",label:T("Kreatinin birimi (serum ve idrar)","Kreatinin vahidi (serum və sidik)","وحدة الكرياتينين (المصل والبول)","Creatinine unit (serum and urine)"),options:[{value:"mg/dL",label:"mg/dL"},{value:"umol/L",label:"µmol/L"},{value:"mmol/L",label:"mmol/L"}]},
 n("serumPhosphate",T("Serum fosfatı — seçilen birim","Serum fosfatı — seçilmiş vahid","فوسفات المصل — الوحدة المختارة","Serum phosphate — selected unit"),"",0.000001),
 n("urinePhosphate",T("İdrar fosfatı — seçilen birim","Sidik fosfatı — seçilmiş vahid","فوسفات البول — الوحدة المختارة","Urine phosphate — selected unit"),"",0),
 n("serumCreatinine",T("Serum kreatinini — seçilen birim","Serum kreatinini — seçilmiş vahid","كرياتينين المصل — الوحدة المختارة","Serum creatinine — selected unit"),"",0.000001),
 n("urineCreatinine",T("İdrar kreatinini — seçilen birim","Sidik kreatinini — seçilmiş vahid","كرياتينين البول — الوحدة المختارة","Urine creatinine — selected unit"),"",0.000001)
 ],
 unit:"mg/dL",decimals:2,
 warning:T(
 "Erişkin formülü. Tercihen açlıkta, eş zamanlı kan ve ikinci sabah idrarı kullanın; 24 saatlik idrar gerekmez. Serum ve idrar fosfatı aynı birimde, serum ve idrar kreatinini de aynı birimde olmalıdır. Günlük atılım miktarı değil konsantrasyon girin. Hipofosfatemi ile birlikte düşük TmP/GFR renal fosfat kaybını destekler. Yaşa ve yönteme uygun laboratuvar referanslarıyla yorumlayın; KBH ve fosfat tedavisi yorumu etkileyebilir. TRP negatifse birimleri ve örnekleri kontrol edin; araç sonuç vermez.",
 "Böyüklər üçün düstur. Acqarına eyni vaxtda qan və ikinci səhər sidiyindən istifadə edin; 24 saatlıq sidik tələb olunmur. Serum və sidik fosfatının vahidləri eyni, kreatinin vahidləri də eyni olmalıdır. Gündəlik miqdarı deyil, konsentrasiyanı daxil edin. Hipofosfatemiya ilə aşağı TmP/GFR renal fosfat itkisini dəstəkləyir. Yaşa və metoda uyğun referenslərdən istifadə edin; XBX və fosfat müalicəsi şərhə təsir edə bilər. Mənfi TRP olduqda vahidləri və nümunələri yoxlayın; nəticə verilmir.",
 "معادلة للبالغين. يفضل أخذ عينات دم وبول متزامنة أثناء الصيام من التبول الصباحي الثاني؛ لا يلزم جمع بول 24 ساعة. يجب توحيد وحدات الفوسفات بين المصل والبول ووحدات الكرياتينين بينهما. أدخل التركيز لا الكمية اليومية. يدعم انخفاض TmP/GFR مع نقص فوسفات الدم فقد الفوسفات الكلوي. استخدم مراجع مناسبة للعمر والطريقة؛ قد يؤثر مرض الكلى المزمن وعلاج الفوسفات على التفسير. إذا كان TRP سالباً راجع الوحدات والعينات؛ لن تظهر نتيجة.",
 "Adult equation. Prefer fasting paired blood and second morning urine samples; no 24-hour collection is needed. Serum and urine phosphate must share a unit, as must serum and urine creatinine. Enter concentrations, not daily excretion amounts. Low TmP/GFR with hypophosphatemia supports renal phosphate wasting. Use age- and method-appropriate laboratory references; CKD and phosphate treatment can affect interpretation. Negative TRP requires checking units and samples; no result is returned."),
 formula:"TRP = 1 − (UP × SCr)/(SP × UCr); FEPO₄ = (1 − TRP) × 100%. TRP ≤ 0.86: TmP/GFR = TRP × SP; TRP > 0.86: TmP/GFR = [0.3 × TRP / (1 − 0.8 × TRP)] × SP. Phosphate: 1 mmol/L = 3.0974 mg/dL.",
 source:"Trombetti et al. — International XLH consensus (2022), adult TmPi/GFR",
 sourceUrl:"https://www.nature.com/articles/s41574-022-00662-x"
});

})(typeof globalThis!=="undefined"?globalThis:this);
