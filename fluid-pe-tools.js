/* Four-language ascites, Light, PE Wells, PERC plus official PREVENT link.
   Clinical notes are decision-support flags, never definitive diagnoses. */
(function(root){
"use strict";
var D=root.CAPAData;if(!D)return;
var T=(tr,az,ar,en)=>({tr,az,ar,en});
var n=(key,label,unit,min,max,optional,help)=>({key,label,unit,min,max,kind:"number",optional:!!optional,help:help||null});
var b=(key,label)=>({key,label,kind:"binary"});
var opts=function(id,group,icon,title,summary,fields,unit,decimals,warning,formula,source,url,extra){
 D.tools.push(Object.assign({id,group,icon,title,summary,fields,unit,decimals,warning,formula,source,sourceUrl:url},extra||{}));
};
Object.assign(D.UI,{
 ascitesPmnHigh:T("Düzeltilmiş PMN ≥250/µL: bakteriyel peritonit açısından acil değerlendirme.","Düzəldilmiş PMN ≥250/µL: peritonit üçün təcili qiymətləndirmə.","PMN المصححة ≥250/ميكرولتر: تقييم عاجل لالتهاب الصفاق.","Corrected PMN ≥250/µL: urgent evaluation for bacterial peritonitis."),
 ascitesPmnLow:T("PMN <250/µL: kriter sağlanmıyor; enfeksiyon dışlanmaz.","PMN <250/µL: meyar ödənmir, infeksiya istisna edilmir.","PMN <250/ميكرولتر: لا يستبعد العدوى.","PMN <250/µL: threshold not met, but infection is not excluded."),
 fluidRbc:T("Asit sıvısı eritrosit","Assit eritrositi","كريات الدم الحمراء في الاستسقاء","Ascitic fluid RBC count"),
 secondaryCriteria:T("Sekonder peritonit biyokimyasal bulgusu","İkincili peritonit biokimyəvi meyarı","مؤشرات الالتهاب الثانوي","Secondary peritonitis biochemical criteria"),
 hemorrhagicAscites:T("RBC ≥10.000/µL: hemorajik asit. Malignite, travmatik ponksiyon, hepatosellüler karsinom ve diğer nedenler araştırılmalı; tek başına malignite tanısı değildir.","RBC ≥10.000/µL: hemorragik assit; malignite diaqnozu deyil.","RBC ≥10000/ميكرولتر: استسقاء نزفي وليس تشخيصًا للسرطان.","RBC ≥10,000/µL: hemorrhagic ascites; evaluate malignancy, traumatic tap and other causes—NOT diagnostic of cancer."),
 rbcCorrectionCaution:T("Kanlı örnekte yaklaşık PMN düzeltmesi: her 250 eritrosit için 1 PMN çıkarılır; klinik karar doğrulama gerektirir.","Qanlı nümunədə hər 250 RBC üçün 1 PMN çıxılır; klinik yoxlama lazımdır.","في العينة الدموية يُطرح PMN واحد لكل 250 RBC تقريبًا؛ يلزم التقييم السريري.","In bloody samples, subtract approximately 1 PMN per 250 RBC; correction must be interpreted clinically."),
 possibleSecondaryPeritonitis:T("Protein >1 g/dL, glukoz <50 mg/dL, sıvı LDH >serum LDH üst sınırı kriterlerinden ≥2 pozitif: sekonder bakteriyel peritonit açısından cerrahi/intraabdominal kaynak araştırın.","≥2 meyar müsbətdir: ikincili peritonit və cərrahi mənbə araşdırın.","وجود ≥2 مؤشر يثير الشك بالتهاب صفاق ثانوي؛ يلزم البحث عن مصدر جراحي.","≥2 of high protein, low glucose, high LDH: consider secondary peritonitis and urgent evaluation for a surgical/intra-abdominal source."),
 incompleteSecondaryWorkup:T("Sekonder peritonit paneli eksik; negatif bir sınıflandırma yapılamaz.","İkincili peritonit paneli tam deyil; mənfi nəticə çıxarmaq olmaz.","الفحوص غير مكتملة؛ لا يمكن الاستبعاد.","Secondary-peritonitis panel incomplete; absence of flags cannot exclude it."),
 urgentAscitesAssessment:T("Kültür ve klinik değerlendirme gereklidir; bu skor SBP ile sekonder peritoniti ayırmaz.","Kultura və klinik qiymətləndirmə lazımdır; SBP ilə ikincili peritoniti ayırmır.","يلزم الزرع والتقييم؛ لا يميز بين التهاب الصفاق العفوي والثانوي.","Cultures and clinical evaluation are needed; this flag does not distinguish SBP from secondary peritonitis."),
 ascitesDoesNotExcludeInfection:T("Şüpheli klinikte PMN düşük olsa bile enfeksiyon veya erken peritonit dışlanmaz.","Aşağı PMN erkən peritoniti istisna etmir.","انخفاض PMN لا ينفي العدوى المبكرة.","A low PMN does not exclude early infection in a suspicious clinical setting."),
 rbcNotProvided:T("Eritrosit sayısı girilmediğinden PMN kanlı örneğe göre düzeltilmedi.","RBC verilmədiyi üçün PMN korreksiya edilmədi.","لم يُدخل RBC لذا لم يُصحح PMN للدم.","RBC count not entered; PMN has not been corrected for bloody fluid."),
 lightExudate:T("Light: eksüda kriterlerinden en az biri pozitif.","Light: eksudat meyarlarından ən azı biri müsbətdir.","تحقق معيار واحد على الأقل للنضحة.","At least one Light criterion met: exudative pattern."),
 lightTransudate:T("Light: eksüda kriteri pozitif değil; transüda paterni.","Light: eksudat kriteri yoxdur; transudat ehtimalı.","لا توجد معايير نضحة؛ نمط رشحي.","No Light criterion met: transudative pattern."),
 lightProteinRatio:T("Plevra/serum protein oranı","Plevra/serum zülal nisbəti","نسبة بروتين الجنب/المصل","Pleural/serum protein ratio"),
 lightLdhRatio:T("Plevra/serum LDH oranı","Plevra/serum LDH nisbəti","نسبة LDH الجنب/المصل","Pleural/serum LDH ratio"),
 lightLdhThreshold:T("Plevra LDH eşik değeri (2/3 serum ULN)","Plevra LDH həddi (2/3 serum ULN)","حد LDH الجنبي (ثلثا الحد الأعلى)","Pleural LDH threshold (2/3 serum ULN)"),
 serumPleuralAlbuminGradient:T("Serum−plevra albümin gradiyenti","Serum−plevra albumin fərqi","فرق ألبومين المصل والجنب","Serum–pleural albumin gradient"),
 pseudoexudatePossible:T("Serum−plevra albümin gradiyenti >1,2 g/dL: özellikle diüretik sonrası yalancı eksüda düşünülebilir.","Albumin fərqi >1,2: diuretikdən sonra psevdoeksudat mümkündür.","فرق الألبومين >1.2 غ/دل قد يشير إلى نضحة كاذبة بعد المدرات.","Albumin gradient >1.2 g/dL may suggest a pseudoexudate, especially after diuretics."),
 lightContext:T("Klinik olasılık yüksekse Light kriterleri tek başına neden saptamaz; kalp yetmezliği, enfeksiyon ve maligniteyi bağlamla değerlendirin.","Light meyarları səbəbi təkbaşına göstərmir.","معايير لايت لا تحدد السبب وحدها.","Light criteria alone do not identify an etiology; interpret with the clinical context."),
 wellsLikely:T("İki düzeyli Wells >4: PE olası; uygun tanısal algoritma gerekir.","Wells >4: PE ehtimalı yüksək; diaqnostik alqoritm lazımdır.","Wells >4: الصمة الرئوية مرجحة وتتطلب مسارًا تشخيصيًا.","Two-level Wells >4: PE likely; follow validated diagnostic pathway."),
 wellsUnlikely:T("İki düzeyli Wells ≤4: PE daha az olası; uygun hastada D-dimer ve klinik algoritma uygulanır.","Wells ≤4: PE az ehtimallı; D-dimer alqoritmini izləyin.","Wells ≤4: الصمة أقل احتمالًا؛ اتبع خوارزمية D-dimer.","Two-level Wells ≤4: PE unlikely; appropriate D-dimer/clinical pathway is still needed."),
 wellsThreeTier:T("Üç düzeyli Wells sınıfı (1 düşük, 2 orta, 3 yüksek)","Wells üç pilləli (1 aşağı, 2 orta, 3 yüksək)","تصنيف ويلز الثلاثي (1 منخفض، 2 متوسط، 3 عالٍ)","Three-level Wells class (1 low, 2 intermediate, 3 high)"),
 wellsNoDiagnosis:T("Wells skoru PE tanısı koymaz veya tek başına dışlamaz. İnstabil hastada gecikmeden acil yaklaşım; gebelikte gebeliğe uyarlanmış algoritma gerekir.","Wells diaqnoz deyil; qeyri-stabil xəstədə təcili yanaşma, hamiləlikdə xüsusi alqoritm.","ويلز ليس تشخيصًا؛ عدم الاستقرار والحمل يتطلبان مسارات خاصة.","Wells is not diagnostic. Unstable patients require emergency evaluation; pregnancy needs a pregnancy-adapted pathway."),
 percNegative:T("PERC 0 ve klinisyen ön olasılığı düşük: uygun hasta grubunda ek PE testi gerekmeyebilir.","PERC 0 və ilkin ehtimal aşağı: uyğun xəstədə əlavə test lazım olmaya bilər.","PERC صفر واحتمال قبلي منخفض: قد لا يلزم اختبار إضافي.","PERC zero AND genuinely low clinician pretest probability: further PE testing may be unnecessary in appropriate patients."),
 percPositive:T("≥1 PERC kriteri pozitif: PERC ile PE dışlanamaz; klinik algoritmaya devam edin.","≥1 PERC meyarı müsbətdir; PE istisna olunmur.","معيار PERC واحد على الأقل إيجابي؛ لا يستبعد الانصمام.","At least one PERC positive: cannot rule out PE with PERC; continue diagnostic algorithm."),
 percInapplicable:T("PERC uygulanamaz: klinisyen ön olasılığı düşük değil.","PERC tətbiq edilmir: ilkin ehtimal aşağı deyil.","لا ينطبق PERC: الاحتمال السريري القبلي غير منخفض.","PERC inapplicable: clinician pretest probability is not low."),
 percOnlyLowProbability:T("PERC yalnız klinisyenin PE ön test olasılığını düşük (<%15) bulduğu hastada kullanılır; Wells düşük olması PERC uygunluğunu tek başına kanıtlamaz.","PERC yalnız klinik ilkin ehtimal aşağı olduqda istifadə edilir.","يستخدم PERC فقط إذا كان الاحتمال السريري القبلي منخفضًا (<15٪).","Only use PERC when clinician gestalt PE pretest probability is genuinely low (<15%)."),
 percPositiveNotDiagnosis:T("Pozitif PERC testi PE tanısı değildir; ek değerlendirme gereksinimini gösterir.","Pozitiv PERC diaqnoz deyil.","PERC الإيجابي ليس تشخيصًا.","Positive PERC does not diagnose PE."),
});
opts("ascitesfluid","gastroenterology","🧫",
 T("Asit Sıvısı Analizi","Assit Mayesi Təhlili","تحليل سائل الاستسقاء","Ascitic Fluid Analysis"),
 T("PMN, eritrosit ve biyokimyayla peritonit/kanlı asit uyarıları.","PMN, RBC və biokimya ilə peritonit/hemorragik assit bayraqları.","تحليل PMN والدم والكيمياء مع تنبيهات.","PMN, RBC and biochemical clues to peritonitis and hemorrhagic ascites."),
 [
 n("pmn",T("Asit sıvısı nötrofil (PMN) mutlak sayı","Assit PMN mütləq sayı","عدد العدلات PMN في الاستسقاء","Ascitic neutrophils (PMN), absolute"),"cells/µL",0,1000000,false,
  T("WBC × nötrofil yüzdesi / 100; mutlak PMN girin.","WBC × neytrofil % /100.","أدخل العدد المطلق للعدلات.","Enter absolute PMN = fluid WBC × neutrophil fraction.")),
 n("rbc",T("Asit sıvısı eritrosit (isteğe bağlı)","Assit eritrositi (istəyə bağlı)","RBC في السائل (اختياري)","Ascitic RBC (optional)"),"cells/µL",0,10000000,true),
 n("fluidProtein",T("Asit toplam protein (isteğe bağlı)","Assit ümumi zülalı","البروتين الكلي للسائل (اختياري)","Ascitic total protein (optional)"),"g/dL",0,15,true),
 n("fluidGlucose",T("Asit glukoz (isteğe bağlı)","Assit qlükozası","غلوكوز السائل (اختياري)","Ascitic glucose (optional)"),"mg/dL",0,600,true),
 n("fluidLdh",T("Asit LDH (isteğe bağlı)","Assit LDH","LDH السائل (اختياري)","Ascitic LDH (optional)"),"U/L",0,20000,true),
 n("serumLdhUln",T("Serum LDH normal üst sınırı (LDH girildiyse)","Serum LDH yuxarı normal həddi","الحد الأعلى الطبيعي لـ LDH المصل","Serum LDH upper limit of normal"),"U/L",50,3000,true)
 ],"cells/µL",0,
 T("Asit PMN ≥250/µL bakteriyel peritonit kuşkusu doğurur; SBP/sekonder peritonit ayrımı klinik ve kültür gerektirir. Kanlı sıvı maligniteyi tek başına göstermez. Glukoz, protein ve LDH kıstasları destekleyicidir, tanı koydurmaz.","PMN ≥250/µL təcili qiymətləndirmə tələb edir; qanlı maye xərçəng diaqnozu deyil.","PMN ≥250/ميكرولتر يستلزم تقييم التهاب الصفاق؛ السائل الدموي لا يشخّص السرطان.","PMN ≥250/µL warrants urgent assessment. Cannot distinguish spontaneous from secondary peritonitis on this result alone; bloody fluid is not diagnostic of malignancy."),
 "Corrected PMN = max(0, PMN−RBC/250). ≥250: peritonitis concern. Secondary concern: ≥2/3 of protein >1 g/dL, glucose <50 mg/dL, fluid LDH > serum ULN.",
 "KASL Ascites Guideline 2026","https://pmc.ncbi.nlm.nih.gov/articles/PMC13430399/",{singleColumn:true});
opts("light","pulmonology","🫁",
 T("Light Kriterleri (Plevral Sıvı)","Light Meyarları (Plevral Maye)","معايير لايت (السائل الجنبي)","Light's Criteria (Pleural Fluid)"),
 T("Plevral sıvıyı eksüda/transüda paternine göre sınıflandırır.","Plevral mayeni eksudat/transudat üzrə təsnif edir.","تصنيف السائل الجنبي كنضحة أو رشح.","Classifies pleural fluid as exudative/transudative pattern."),
 [
 n("fluidProtein",T("Plevra toplam protein","Plevra ümumi zülalı","بروتين السائل الجنبي","Pleural total protein"),"g/dL",0,15),
 n("serumProtein",T("Serum toplam protein","Serum ümumi zülalı","بروتين المصل الكلي","Serum total protein"),"g/dL",0.1,15),
 n("fluidLdh",T("Plevra LDH","Plevra LDH","LDH السائل الجنبي","Pleural LDH"),"U/L",0,20000),
 n("serumLdh",T("Serum LDH","Serum LDH","LDH المصل","Serum LDH"),"U/L",1,20000),
 n("serumLdhUln",T("Serum LDH referans üst sınırı","Serum LDH yuxarı norma","الحد الأعلى الطبيعي لـ LDH المصل","Serum LDH upper normal limit"),"U/L",50,3000),
 n("serumAlbumin",T("Serum albümin (isteğe bağlı)","Serum albumin (ixtiyari)","ألبومين المصل (اختياري)","Serum albumin (optional)"),"g/dL",0,8,true),
 n("fluidAlbumin",T("Plevra albümin (isteğe bağlı)","Plevra albumin (ixtiyari)","ألبومين السائل الجنبي (اختياري)","Pleural albumin (optional)"),"g/dL",0,8,true)
 ]," / 3",0,
 T("Light kriterleri nedenin tanısını koymaz. Diüretik kullanan kalp yetmezlikli hastalarda yalancı eksüda olabilir; serum−plevra albümin farkı >1,2 g/dL destekleyicidir. Önce klinik ve görüntülemeyi değerlendirin.","Diuretik istifadəsində psevdoeksudat mümkündür; klinik qiymətləndirmə vacibdir.","قد يحدث تصنيف كاذب للنضحة بعد المدرات؛ تُفسر النتائج سريريًا.","Exudative criteria do not identify etiology. Diuretics may yield pseudoexudates; albumin gradient >1.2 g/dL can help. Interpret clinically."),
 "Exudate if ANY: pleural/serum protein >0.5; pleural/serum LDH >0.6; pleural LDH > (2/3) × serum LDH ULN.",
 "Merck Manual — Light Criteria","https://www.merckmanuals.com/professional/multimedia/table/criteria-for-identifying-exudative-pleural-effusions",{singleColumn:true});
opts("wellspe","pulmonology","🩺",
 T("Wells Skoru – Pulmoner Emboli","Wells Balı – Ağciyər Emboliyası","معيار ويلز للصمة الرئوية","Wells Score – Pulmonary Embolism"),
 T("Pulmoner emboli için klinik ön test olasılığı (iki ve üç düzeyli).","Ağciyər emboliyası üçün ilkin ehtimal.","تقدير الاحتمال القبلي للصمة الرئوية.","Clinical pretest probability for pulmonary embolism."),
 [
 b("dvtSigns",T("DVT klinik belirti/bulguları","DVT klinik əlamətləri","علامات سريرية لـ DVT","Clinical signs of DVT")),
 b("peMostLikely",T("PE alternatif tanıdan daha olası","PE digər diaqnozdan daha ehtimallı","الصمة أرجح من التشخيصات البديلة","PE is more likely than alternative diagnosis")),
 n("hr",T("Nabız","Nəbz","النبض","Heart rate"),"/min",20,250),
 b("immobileSurgery",T("≥3 gün immobilizasyon veya son 4 haftada cerrahi","≥3 gün hərəkətsizlik və ya 4 həftə cərrahiyyə","ملازمة الفراش ≥3 أيام أو جراحة خلال 4 أسابيع","Bed rest ≥3 days or surgery in past 4 weeks")),
 b("priorVte",T("Önceden DVT/PE","Əvvəlki DVT/PE","جلطة سابقة DVT/PE","Prior DVT or PE")),
 b("hemoptysis",T("Hemoptizi","Hemoptizi","نفث دم","Hemoptysis")),
 b("activeCancer",T("Aktif malignite (tedavi/son 6 ay/palyatif)","Aktiv xərçəng","سرطان نشط","Active cancer (treated/recent/palliative)"))
 ],"",1,
 T("Wells klinik olasılık içindir; PE tanısı değildir. İnstabil hasta ve gebelikte özel algoritma gerekir. D-dimer yalnız uygun ön olasılık grubunda kullanılmalıdır.","Wells diaqnoz deyil; uyğun diaqnostik alqoritm vacibdir.","ويلز ليس تشخيصًا؛ يلزم اتباع مسار الفحص المناسب.","Pretest probability only, not diagnosis. Use appropriate D-dimer/imaging algorithm; special pathways in pregnancy and unstable patients."),
 "Wells: DVT signs +3, PE most likely +3, HR>100 +1.5, immobilization/surgery +1.5, prior VTE +1.5, hemoptysis +1, active cancer +1. ≤4 PE-unlikely; >4 PE-likely.",
 "AHA/ACC Acute Pulmonary Embolism Guideline 2026","https://www.jacc.org/doi/10.1016/j.jacc.2025.11.005",{singleColumn:true});
opts("perc","pulmonology","🧬",
 T("PERC – PE Dışlama Kriterleri","PERC – PE İstisna Meyarları","معايير PERC لاستبعاد الصمة","PERC Rule-Out Criteria"),
 T("Yalnız düşük klinik PE ön olasılığında sekiz kriter.","Yalnız aşağı PE ehtimalında səkkiz meyar.","ثمانية معايير فقط عندما يكون احتمال الصمة منخفضًا.","Eight criteria only for patients with low clinician pretest probability."),
 [
 b("lowPretest",T("Klinisyen ön olasılığı düşük (<%15)","Klinik ehtimal aşağıdır (<15%)","الاحتمال القبلي منخفض (<15٪)","Clinician gestalt pretest probability low (<15%)")),
 n("age",T("Yaş","Yaş","العمر","Age"),"years",18,120),
 n("hr",T("Nabız","Nəbz","النبض","Heart rate"),"/min",20,250),
 n("spo2",T("Oksijen satürasyonu","Oksigen saturasiyası","إشباع الأكسجين","Oxygen saturation"),"%",50,100),
 b("unilateralSwelling",T("Tek taraflı bacak şişliği","Birtərəfli ayaq şişi","تورم ساق من جهة واحدة","Unilateral leg swelling")),
 b("hemoptysis",T("Hemoptizi","Hemoptizi","نفث دم","Hemoptysis")),
 b("recentTraumaSurgery",T("Son 4 haftada hastane gerektiren cerrahi/travma","4 həftə ərzində xəstəxana gərəkən əməliyyat/travma","جراحة/رضّ استدعى دخول المستشفى خلال 4 أسابيع","Surgery/trauma requiring hospitalization within 4 weeks")),
 b("priorVte",T("Önceden VTE","Əvvəlki VTE","خثار وريدي سابق","Prior venous thromboembolism")),
 b("hormones",T("Ekzojen östrojen kullanımı","Estrogen istifadəsi","استخدام الإستروجين","Exogenous estrogen use"))
 ]," / 8",0,
 T("PERC, yalnız klinisyen ön test olasılığı gerçekten düşükse uygulanabilir. PERC negatifliği hemodinamik instabil, gebelik veya yüksek riskli hastada tek başına güvenli dışlama değildir.","PERC yalnız həqiqətən aşağı ön ehtimalda tətbiq olunur.","يستخدم PERC فقط مع احتمال قبلي منخفض حقًا.","Use only with genuinely low clinician pretest probability. A negative PERC is not an all-purpose exclusion test, especially in unstable or special populations."),
 "PERC negative only if low pretest probability and ALL: age<50, HR<100, SpO₂≥95%, no unilateral swelling, hemoptysis, recent surgery/trauma, prior VTE or estrogen use.",
 "AHA/ACC Acute Pulmonary Embolism Guideline 2026","https://www.jacc.org/doi/10.1016/j.jacc.2025.11.005",{singleColumn:true});
D.tools.push({
 id:"preventascvd",group:"cardiology",icon:"🫀",
 title:T("PREVENT-ASCVD · Resmî Hesaplayıcı","PREVENT-ASCVD · Rəsmi Kalkulyator","PREVENT-ASCVD · الحاسبة الرسمية","PREVENT-ASCVD · Official Calculator"),
 summary:T("2026 AHA/ACC: 10 yıllık ASCVD riski, resmî AHA sitesinde hesaplanır.","2026 AHA/ACC: 10 illik ASCVD riski rəsmi AHA saytında.","تقدير خطر ASCVD لعشر سنوات على موقع AHA الرسمي.","2026 AHA/ACC 10-year ASCVD risk via the official AHA website."),
 externalUrl:"https://professional.heart.org/en/guidelines-and-statements/prevent-calculator",
 warning:T("AHA PREVENT formülleri lisans koşullarına tabidir; bu kart doğrulanmamış yerel sonuç üretmez.","AHA PREVENT lisenziya şərtlərinə tabedir; bu kart yerli hesablama etmir.","تخضع معادلات PREVENT لشروط ترخيص؛ هذا رابط رسمي وليس حسابًا محليًا.","AHA PREVENT source is licensed; this card links to the official calculator rather than generating an unvalidated local estimate.")
});
})(typeof globalThis!=="undefined"?globalThis:this);
