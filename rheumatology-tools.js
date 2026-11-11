/* CAPA Tools four-language rheumatology calculators. */
(function(root){
"use strict";
var D=root.CAPAData;if(!D)return;
var T=(tr,az,ar,en)=>({tr,az,ar,en});
var n=(key,label,unit,min,max,help)=>({key,label,unit,min,max,kind:"number",help:help||null});
var b=(key,label)=>({key,label,kind:"binary"});
var s=(key,label,items,help)=>({key,label,kind:"select",numeric:items.every(x=>typeof x[0]==="number"),
 options:items.map(x=>({value:String(x[0]),label:x[1]})),help:help||null});
var agents=[
["prednisolone",T("Prednizolon · Deltacortril","Prednizolon · Deltacortril","بريدنيزولون · Deltacortril","Prednisolone · Deltacortril")],
["methylprednisolone",T("Metilprednizolon · Prednol","Metilprednizolon · Prednol","ميثيل بريدنيزولون · Prednol","Methylprednisolone · Prednol")],
["prednisone",T("Prednizon","Prednizon","بريدنيزون","Prednisone")],
["hydrocortisone",T("Hidrokortizon","Hidrokortizon","هيدروكورتيزون","Hydrocortisone")],
["dexamethasone",T("Deksametazon","Deksametazon","ديكساميثازون","Dexamethasone")],
["triamcinolone",T("Triamsinolon","Triamsinolon","تريامسينولون","Triamcinolone")],
["betamethasone",T("Betametazon","Betametazon","بيتاميثازون","Betamethasone")]
];
Object.assign(D.UI,{
 masCriteriaMet:T("2016 sJIA-MAS sınıflama kriterleri karşılanıyor; acil değerlendirme gerekir.","2016 sJIA-MAS meyarları ödənir; təcili qiymətləndirmə lazımdır.","معايير تصنيف MAS في sJIA مستوفاة؛ يلزم تقييم عاجل.","2016 sJIA-MAS classification criteria met; urgent evaluation needed."),
 masCriteriaNotMet:T("Sınıflama kriterleri karşılanmıyor; MAS dışlanmaz.","Meyarlar ödənmir; MAS istisna edilmir.","المعايير غير مستوفاة؛ لا يستبعد MAS.","Classification criteria not met; MAS is NOT excluded."),
 masScope:T("Kriterler yalnız ateşli, bilinen/şüpheli sJIA için geliştirilmiştir; burada sınıflama uygulanamaz.","Meyarlar yalnız qızdırmalı sJIA üçün hazırlanıb; burada tətbiq edilmir.","هذه المعايير خاصة بحالات sJIA مع الحمى؛ لا تُطبق هنا.","Criteria are intended for febrile suspected/known sJIA; not applicable here."),
 masFerritinGate:T("Ferritin >684 ng/mL","Ferritin >684 ng/mL","فيريتين >684 نانوغرام/مل","Ferritin >684 ng/mL"),
 masUrgent:T("MAS yaşamı tehdit edebilir; klinik şüphede gecikmeden uzman değerlendirmesi gerektirir.","MAS həyati təhlükəlidir; təcili mütəxəssis qiymətləndirməsi lazımdır.","MAS قد يكون مهددًا للحياة؛ يلزم تقييم متخصص عاجل.","MAS may be life-threatening; obtain urgent expert assessment."),
 masNotExcluded:T("Laboratuvar değerleri zamanla değişebilir; erken MAS'de kriterlerin tamamı karşılanmayabilir.","Laborator göstəriciləri dəyişə bilər; erkən MAS meyarlara uyğun olmaya bilər.","قد تتغير النتائج بمرور الوقت؛ غياب المعايير لا ينفي MAS المبكر.","Values evolve over time; early MAS may not meet classification criteria."),
 masNotAdultValidated:T("2016 kriterleri sistemik juvenil idiyopatik artrit için sınıflamadır; yetişkin Still hastalığında, diğer romatolojik hastalıklarda veya HLH'de otomatik tanı olarak kullanmayın.","2016 meyarları sJIA üçündür; böyüklərdə Still, başqa xəstəlik və HLH üçün avtomatik diaqnoz deyil.","معايير 2016 خاصة بـ sJIA، وليست تشخيصًا تلقائيًا لدى البالغين أو في HLH.","2016 criteria classify sJIA-associated MAS; not a stand-alone diagnostic rule for adult Still disease, other conditions or HLH."),
 prednisoloneEquivalent:T("Prednizolon eşdeğeri","Prednizolon ekvivalenti","مكافئ البريدنيزولون","Prednisolone equivalent"),
 steroidAntiInflammatoryOnly:T("Eşdeğerlik yalnız yaklaşık antiinflamatuvar etkinlik içindir; mineralokortikoid etki, biyolojik süre, uygulama yolu, adrenal replasman ve doz azaltımı için doğrudan kullanılmaz.","Ekvivalentlik təxmini iltihabəleyhinə təsir üçündür; əvəzetmə və doz azaltmaya birbaşa tətbiq edilmir.","التكافؤ تقريبي للتأثير المضاد للالتهاب فقط، وليس وصفة تعويض هرموني أو خفض جرعة.","Approximate anti-inflammatory equivalence only; not interchangeable for mineralocorticoid activity, duration, adrenal replacement, route or taper."),
 stressParenteralLabel:T("Parenteral yaklaşım","Parenteral yanaşma","نهج حقني","Parenteral pathway"),
 stressOralLabel:T("Oral yaklaşım","Oral yanaşma","نهج فموي","Oral pathway"),
 stressReviewLabel:T("Klinik değerlendirme","Klinik qiymətləndirmə","تقييم سريري","Clinical review"),
 stressUrgent:T("Adrenal kriz olasılığını acilen değerlendir; parenteral steroid ve sıvı resüsitasyonu gerektirebilir.","Adrenal kriz ehtimalını təcili qiymətləndir; parenteral steroid və maye lazım ola bilər.","قيّم أزمة الكظر فورًا؛ قد تستلزم الستيرويد الحقني والإنعاش بالسوائل.","Urgently assess suspected adrenal crisis; parenteral glucocorticoid and fluid resuscitation may be needed."),
 stressParenteral:T("Orta/ağır stres, genel-bölgesel anestezi veya oral alım sorunu varsa, riskli hastada parenteral stres kapsamı değerlendirilir.","Orta/ağır stres və ya oral qəbul mümkün deyilsə, parenteral örtük nəzərdən keçirilir.","قد يلزم تغطية حقنية أثناء الشدة المتوسطة/الكبيرة أو تعذر تناول الدواء بالفم.","Moderate/major stress, anesthesia or inability to take oral medication may require parenteral coverage."),
 stressOral:T("Hafif stres ve stabil, oral alabilen riskli hastada oral stres kapsamı gündeme gelir.","Yüngül stresdə və oral qəbul mümkün olduqda oral örtük nəzərdən keçirilir.","في الشدة الخفيفة مع استقرار الحالة قد تكفي تغطية فموية.","For minor stress, stable at-risk patients who can take oral medications may need oral coverage."),
 stressAlreadyCovered:T("Hafif stres ve stabil durumda mevcut günlük steroid dozu yeterli olabilir; klinik doğrulama gerekir.","Yüngül stresdə hazırkı gündəlik doza kifayət edə bilər; yoxlama lazımdır.","في الشدة الخفيفة قد تكفي الجرعة اليومية الحالية مع المراجعة السريرية.","During minor stress, the existing daily dose may already be sufficient; verify clinically."),
 stressReview:T("Baskılanma riski bu bilgilerle güvenle dışlanamaz. Önceki kürler ve HPA ekseni durumu dahil klinik değerlendirme yapın.","HPA riski bu məlumatlarla istisna edilmir; əvvəlki kursları qiymətləndirin.","لا يمكن نفي خطر تثبيط محور HPA اعتمادًا على هذه المدخلات؛ راجع التاريخ العلاجي.","HPA suppression cannot be reliably excluded by these inputs; review prior courses and axis testing."),
 adrenalCrisisWarning:T("Şok, belirgin hipotansiyon veya kusma/ishal ile adrenal kriz şüphesinde hesaplayıcı tedaviyi geciktirmemelidir; acil protokol uygulanmalıdır.","Şok və adrenal kriz şübhəsində təcili protokol gecikməməlidir.","عند الشك بأزمة كظرية لا تؤخر العلاج من أجل الحاسبة.","Suspected adrenal crisis is an emergency; do not delay institutional emergency treatment."),
 stressProcedureTeam:T("Operasyon/anestezi türü ve oral alım kapasitesi dozu değiştirir; ameliyat ekibi ve Endokrinoloji protokolünü izleyin.","Əməliyyat növü dozanı dəyişir; yerli protokolu izləyin.","نوع التخدير والجراحة يحدد النظام؛ اتبع بروتوكول المؤسسة.","Procedure type, anesthesia and oral tolerance alter coverage; use perioperative/endocrine protocol."),
 usualDoseMayCoverMinor:T("ESE/Endocrine Society 2024: Hafif stres altında zaten ≥10 mg/gün prednizon eşdeğeri alan stabil hastalarda çoğunlukla ek artırma gerekmez.","2024 təlimat: stabil, ≥10 mq prednizon ekvivalenti alanlarda yüngül stresdə artım çox vaxt lazım deyil.","توجيهات 2024: غالبًا لا يلزم الرفع إذا كانت الجرعة ≥10 ملغ مكافئ بريدنيزون يوميًا والحالة مستقرة.","2024 guideline: during minor stress, stable patients already taking ≥10 mg/day prednisone-equivalent typically need no increase."),
 minorStressOral:T("2024 kılavuzunun örnek hafif stres şeması: toplam hidrokortizon 40 mg/gün veya prednizon 10 mg/gün eşdeğeri; hasta özelinde reçete değildir.","2024 nümunə: hidrokortizon 40 mq/gün və ya prednizon 10 mq/gün; fərdi təyinat deyil.","مثال 2024 للشدة الخفيفة: هيدروكورتيزون 40 ملغ/يوم أو بريدنيزون 10 ملغ/يوم؛ ليست وصفة شخصية.","2024 guideline minor-stress example: hydrocortisone 40 mg/day or prednisone 10 mg/day equivalent; not an individualized order."),
 stressNoUniversalDose:T("Bu araç otomatik stres dozu reçetesi üretmez; kullanım süresi, önceki steroidler, adrenal testler, hemodinami ve stres derecesi birlikte değerlendirilmelidir.","Avtomatik doza təyinatı vermir; bütün klinik göstəriciləri nəzərə alın.","لا تولد الحاسبة وصفة تلقائية؛ يجب تقييم مدة التعرض والاستقرار والفحوص.","No automatic stress-dose prescription; review steroid history, HPA testing, hemodynamics and degree of stress."),
 noAutomaticClearance:T("Kısa kullanım veya düşük doz, özellikle önceki steroid maruziyeti varsa adrenal yetmezliği kesin dışlamaz.","Qısa və ya az doz adrenal çatışmazlığı tam istisna etmir.","حتى العلاج القصير أو الجرعة المنخفضة لا يستبعدان كبت الكظر دائمًا.","Short exposure or low dose does not prove preserved adrenal function, especially with prior courses.")
});
D.tools.push({
 id:"mas2016",group:"rheumatology",icon:"🌡️",
 title:T("MAS 2016 Sınıflama Kriterleri","MAS 2016 Təsnifat Meyarları","معايير تصنيف MAS 2016","MAS 2016 Classification Criteria"),
 summary:T("Sistemik JİA ile ilişkili MAS: ferritin ve dört laboratuvar kriteri.","sJIA ilə əlaqəli MAS: ferritin və dörd laborator meyar.","MAS المرتبط بالتهاب المفاصل اليفعي الجهازي: الفيريتين وأربعة معايير.","sJIA-associated MAS: ferritin and four laboratory criteria."),
 fields:[
 b("fever",T("Ateş var","Qızdırma var","وجود حمى","Fever present")),
 b("sjia",T("Bilinen veya şüpheli sistemik JİA","Məlum və ya şübhəli sJIA","وجود sJIA مؤكد أو مشتبه","Known or suspected systemic JIA")),
 n("ferritin",T("Ferritin","Ferritin","فيريتين","Ferritin"),"ng/mL",0,1000000),
 n("platelets",T("Trombosit","Trombosit","الصفائح","Platelets"),"10⁹/L",0,2000),
 n("ast",T("AST","AST","AST","AST"),"U/L",0,50000),
 n("triglycerides",T("Trigliserit","Triqliserid","ثلاثي الغليسريد","Triglycerides"),"mg/dL",0,10000),
 n("fibrinogen",T("Fibrinojen","Fibrinogen","الفيبرينوجين","Fibrinogen"),"mg/dL",0,1500)
 ],unit:" / 4",decimals:0,singleColumn:true,
 warning:T("Yalnız ateşli, bilinen/şüpheli sistemik JİA hastaları için sınıflama kriteridir; yetişkin Still hastalığında/diğer durumlarda tanı testi değildir. MAS hızlı ilerleyebilir: negatif kriterler klinik şüpheyi dışlamaz.","Bu sJIA təsnifat meyarıdır; diaqnoz testi deyil. MAS sürətli inkişaf edə bilər.","تُستخدم للتصنيف في sJIA مع الحمى فقط، ولا تستبعد MAS المبكر.","Classification for febrile suspected/known sJIA, not a general diagnostic test for adult Still disease or HLH. Early MAS can occur without meeting criteria."),
 formula:"Fever + sJIA + ferritin >684 ng/mL + ≥2/4: platelets ≤181 ×10⁹/L, AST >48 U/L, TG >156 mg/dL, fibrinogen ≤360 mg/dL.",
 source:"EULAR/ACR/PRINTO 2016",sourceUrl:"https://acrjournals.onlinelibrary.wiley.com/doi/10.1002/art.39332"
});
D.tools.push({
 id:"steroidEquivalent",group:"rheumatology",icon:"💊",
 title:T("Steroid Eşdeğerlik Hesabı","Steroid Ekvivalentliyi","معادلة تكافؤ الستيرويدات","Steroid Equivalence Converter"),
 summary:T("Deltacortril 5 mg ≈ Prednol 4 mg ve diğer antiinflamatuvar eşdeğerler.","Deltacortril 5 mq ≈ Prednol 4 mq və digər ekvivalentlər.","Deltacortril 5 ملغ ≈ Prednol 4 ملغ وغيره من المكافئات.","Deltacortril 5 mg ≈ Prednol 4 mg and other approximate equivalents."),
 fields:[
 s("fromAgent",T("Kullanılan steroid","İstifadə edilən steroid","الستيرويد الأصلي","Current steroid"),agents),
 n("dose",T("Doz","Doza","الجرعة","Dose"),"mg",0,1000),
 s("toAgent",T("Dönüştürülecek steroid","Çevriləcək steroid","الستيرويد المطلوب","Convert to"),agents)
 ],unit:"mg",decimals:2,
 warning:T("Yaklaşık antiinflamatuvar doz eşdeğerliği hesaplar; tedavi değişikliği, adrenal replasman veya şemsiye/stres dozu için doğrudan kullanılamaz. Deksametazon ve betametazon eşdeğerleri kaynaklara göre değişebilir.","Təxmini iltihabəleyhinə ekvivalentlikdir; müalicə və adrenal əvəzetmə göstərişi deyil.","تكافؤ تقريبي مضاد للالتهاب؛ ليس وصفة لتغيير العلاج أو التعويض الكظري.","Approximate ANTI-INFLAMMATORY equivalent only; not a direct prescription for switching, stress coverage or adrenal replacement. Long-acting steroid comparisons vary by source."),
 formula:"Prednisolone 5 mg = methylprednisolone 4 mg = hydrocortisone 20 mg = prednisone 5 mg ≈ dexamethasone 0.75 mg (conventional).",
 source:"Vanderbilt Steroid Conversion",sourceUrl:"https://vimbook.vumc.org/endocrinology/steroid-conversion"
});
D.tools.push({
 id:"stressSteroid",group:"rheumatology",icon:"🛡️",
 title:T("Steroid Şemsiyesi · Stres Kapsamı","Steroid Örtüyü · Stres","ستيرويد التغطية أثناء الإجهاد","Steroid Stress Coverage Guide"),
 summary:T("Uzun süreli steroid kullanımında stres yanıtını değerlendiren karar desteği.","Uzunmüddətli steroiddə stres dövrü qərar dəstəyi.","إرشاد لتغطية الكورتيزون أثناء المرض أو الجراحة.","Qualitative guide for glucocorticoid stress coverage during illness or surgery."),
 fields:[
 s("agent",T("Kullanılan steroid","İstifadə edilən steroid","الستيرويد المستخدم","Glucocorticoid"),agents),
 n("dose",T("Günlük doz (artık kullanmıyorsa 0)","Gündəlik doza (dayandırılıbsa 0)","الجرعة اليومية (0 إذا توقف)","Daily dose (0 if stopped)"),"mg/day",0,1000),
 n("durationWeeks",T("Kullanım süresi","İstifadə müddəti","مدة الاستخدام","Duration of exposure"),"hafta",0,520),
 b("recentStopped",T("Yakın dönemde steroid bırakıldı / önceki kür var","Yaxınlarda steroid kəsilib / keçmiş kurs","أوقف الستيرويد مؤخرًا أو توجد دورات سابقة","Recently stopped steroids or prior courses")),
 b("knownAI",T("Adrenal yetmezlik biliniyor veya şüpheli","Adrenal çatışmazlıq məlum və ya şübhəli","قصور كظري معروف أو مشتبه","Known or suspected adrenal insufficiency")),
 s("stress",T("Klinik stres durumu","Klinik stres vəziyyəti","نوع الشدة","Clinical stress setting"),[
 ["minor",T("Hafif hastalık/ateş; stabil","Yüngül xəstəlik/qızdırma; stabil","مرض خفيف/حمى، مستقر","Minor illness/fever; stable")],
 ["moderateMajor",T("Orta/ağır hastalık veya anestezi/ameliyat","Orta/ağır xəstəlik və ya əməliyyat","مرض متوسط/شديد أو تخدير/جراحة","Moderate/major illness or anesthesia/surgery")],
 ["suspectedCrisis",T("Adrenal kriz şüphesi","Adrenal kriz şübhəsi","اشتباه أزمة كظرية","Suspected adrenal crisis")]
 ]),
 b("oralPossible",T("Oral ilaç alınabiliyor, kusma/ishal engellemiyor","Oral dərman mümkündür, qusma/ishal yoxdur","يمكن تناول الدواء بالفم دون قيء/إسهال يمنع الامتصاص","Able to take and absorb oral medication")),
 b("unstable",T("Hemodinamik instabilite var","Hemodinamik qeyri-stabillik var","يوجد عدم استقرار ديناميكي دموي","Hemodynamic instability"))
 ],unit:"",decimals:0,singleColumn:true,
 warning:T("Bu bir reçete veya otomatik doz hesaplayıcı değildir. Endocrine Society/ESE 2024 temelinde yalnızca olası oral/parenteral yaklaşımı gösterir. Adrenal kriz şüphesinde acil tedavi hesaplamayı beklememelidir.","Reçetə deyil. 2024 tövsiyələrinə əsaslanan oral/parenteral yanaşma seçir; adrenal kriz təcilidir.","ليست وصفة جرعات. دليل نوع التغطية حسب توصيات 2024؛ الأزمة الكظرية حالة طارئة.","Decision support ONLY, not an automatic prescription or dosage calculator. Based on ESE/Endocrine Society 2024; treat suspected adrenal crisis immediately."),
 formula:"ESE/Endocrine Society 2024: minor stress stable and tolerating PO → oral coverage; moderate/major stress, anesthesia, unstable or cannot take PO → parenteral coverage as clinically indicated.",
 source:"Endocrine Society / ESE 2024",sourceUrl:"https://www.endocrine.org/clinical-practice-guidelines/glucocorticoid-induced-adrenal-insufficiency"
});
})(typeof globalThis!=="undefined"?globalThis:this);
