(function (root) {
"use strict";
var T = function(tr,az,ar,en){return {tr:tr,az:az,ar:ar,en:en};};
var n = function(key,label,unit,min,max,help){return {key:key,label:label,unit:unit,min:min,max:max,kind:"number",help:help||null};};
var y = function(key,label,help){return {key:key,label:label,kind:"binary",help:help||null};};
var s = function(key,label,options,help){return {key:key,label:label,kind:"select",options:options,help:help||null};};
var m = function(id,group,icon,title,summary,fields,unit,decimals,warning,formula,source,sourceUrl){
return {id:id,group:group,icon:icon,title:title,summary:summary,fields:fields,unit:unit,decimals:decimals,warning:warning,formula:formula,source:source,sourceUrl:sourceUrl};
};
var UI = {
brandSubtitle:T("Klinik hesaplayıcılar","Klinik kalkulyatorlar","حاسبات سريرية","Clinical calculators"),
specialties:T("UZMANLIK ALANLARI","İXTİSAS SAHƏLƏRİ","التخصصات","SPECIALTIES"),
offline:T("Tarayıcıda çalışır · hasta verisi gönderilmez","Brauzerdə işləyir · xəstə məlumatı göndərilmir","يعمل في المتصفح · لا تُرسل بيانات المرضى","Runs in browser · no patient data sent"),
heroEyebrow:T("KLİNİK PRATİK İÇİN","KLİNİK TƏCRÜBƏ ÜÇÜN","للممارسة السريرية","FOR CLINICAL PRACTICE"),
heroTitle:T("Doğru hesaplama. Hızlı erişim.","Dəqiq hesablamalar. Sürətli giriş.","حسابات واضحة. وصول سريع.","Clear calculations. Fast access."),
heroDescription:T("Acil servis ve dahiliye ekipleri için sade, mobil uyumlu hesaplayıcılar.","Təcili yardım və daxili xəstəliklər komandaları üçün sadə, mobil kalkulyatorlar.","حاسبات عملية ملائمة للهاتف لأطباء الطوارئ والطب الباطني.","Practical, mobile-friendly calculators for emergency and internal medicine teams."),
metricTools:T("hesaplayıcı","kalkulyator","حاسبة","calculators"),
metricSpecialties:T("uzmanlık alanı","ixtisas sahəsi","تخصصًا","specialties"),
metricLanguages:T("dil","dil","لغات","languages"),
sectionEyebrow:T("HESAPLAYICI KÜTÜPHANESİ","KALKULYATOR KİTABXANASI","مكتبة الحاسبات","CALCULATOR LIBRARY"),
all:T("Tüm hesaplayıcılar","Bütün kalkulyatorlar","جميع الحاسبات","All calculators"),
favorites:T("Favorilerim","Seçilmişlərim","المفضلة","Favorites"),
allDescription:T("İhtiyac duyduğunuz aracı uzmanlık alanına veya adına göre bulun.","Lazım olan aləti ixtisas sahəsinə və ya adına görə tapın.","اعثر على الأداة حسب التخصص أو الاسم.","Find a tool by specialty or by name."),
favDescription:T("Sık kullandığınız hesaplayıcılara hızlı erişim.","Tez istifadə etdiyiniz kalkulyatorlara sürətli giriş.","وصول سريع إلى حاسباتك المفضلة.","Quick access to the calculators you use most."),
search:T("Hesaplayıcı ara...","Kalkulyator axtar...","ابحث عن حاسبة...","Search calculators..."),
results:T("{n} hesaplayıcı","{n} kalkulyator","{n} حاسبة","{n} calculators"),
noResults:T("Hesaplayıcı bulunamadı","Kalkulyator tapılmadı","لم يتم العثور على حاسبات","No calculators found"),
noResultsDesc:T("Arama terimini veya uzmanlık alanını değiştirin.","Axtarışı və ya ixtisas sahəsini dəyişin.","غيّر البحث أو التخصص.","Try another search or specialty."),
noFavorites:T("Henüz favori yok","Hələ seçilmiş yoxdur","لا توجد مفضلة بعد","No favorites yet"),
noFavoritesDesc:T("Kartlardaki yıldız simgesini seçin.","Kartlardakı ulduz işarəsini seçin.","اضغط على النجمة في بطاقة الحاسبة.","Select the star on a calculator card."),
safetyTitle:T("Klinik kullanım uyarısı","Klinik istifadə xəbərdarlığı","تنبيه للاستخدام السريري","Clinical use notice"),
safetyText:T("Bu ilk sürüm eğitim ve karar desteği içindir; klinik kullanımdan önce bağımsız doğrulama ve uzman incelemesi gerektirir. Tek başına tanı, tedavi, triyaj veya ilaç dozu kararı için kullanılmamalıdır. Birimleri, hasta özelliklerini ve güncel rehberleri kontrol edin. Kimlik bilgisi girmeyin.","Bu ilkin versiya təhsil və qərar dəstəyi üçündür; klinik istifadədən əvvəl müstəqil yoxlama və mütəxəssis baxışı tələb edir. Təkbaşına diaqnoz, müalicə, triaj və ya doza təyini üçün istifadə edilməməlidir. Vahidləri və qaydaları yoxlayın. Şəxsi məlumat daxil etməyin.","هذه نسخة أولية للتعليم ودعم القرار، وتتطلب تحققًا مستقلًا ومراجعة مختص قبل الاستخدام السريري. لا تستخدمها وحدها للتشخيص أو العلاج أو الفرز أو تحديد الجرعات. تحقق من الوحدات والإرشادات، ولا تدخل معلومات تعريفية عن المرضى.","This beta is for education and decision support; independent verification and expert review are required before clinical use. Do not use it alone for diagnosis, treatment, triage or dosing. Check units, patient factors and current guidance. Do not enter patient identifiers."),
footer:T("مراجعة سريرية مطلوبة قبل الاستخدام","Klinik istifadədən əvvəl yoxlama lazımdır","تستلزم مراجعة سريرية قبل الاستخدام","Clinical review required before use"),
calculate:T("Hesapla","Hesabla","احسب","Calculate"),
reset:T("Temizle","Təmizlə","مسح","Clear"),
result:T("Sonuç","Nəticə","النتيجة","Result"),
source:T("Kaynak","Mənbə","المصدر","Source"),
yes:T("Evet","Bəli","نعم","Yes"),
no:T("Hayır","Xeyr","لا","No"),
select:T("Seçin...","Seçin...","اختر...","Select..."),
required:T("Tüm gerekli alanları geçerli değerlerle doldurun.","Bütün tələb olunan sahələrə düzgün qiymətlər daxil edin.","أدخل قيمًا صحيحة في جميع الحقول المطلوبة.","Enter valid values in all required fields."),
invalidBP:T("Sistolik basınç diyastolik basınçtan küçük olamaz.","Sistolik təzyiq diastolik təzyiqdən aşağı ola bilməz.","لا يمكن أن يكون الضغط الانقباضي أقل من الانبساطي.","Systolic pressure cannot be lower than diastolic."),
invalidDifferential:T("Nötrofil ve çomak toplamı %100'ü aşamaz.","Neytrofil və çubuqnüvəli cəmi 100%-i aşa bilməz.","يجب ألا يتجاوز مجموع العدلات والعصوية 100٪.","Neutrophils and bands cannot total more than 100%."),
genericError:T("Girdileri ve birimleri kontrol edin.","Daxil edilənləri və vahidləri yoxlayın.","تحقق من القيم والوحدات.","Check inputs and units."),
favoriteAdd:T("Favorilere ekle","Seçilmişlərə əlavə et","أضف للمفضلة","Add to favorites"),
favoriteRemove:T("Favorilerden çıkar","Seçilmişlərdən çıxar","أزل من المفضلة","Remove from favorites"),
close:T("Kapat","Bağla","إغلاق","Close"),
open:T("Aç","Aç","افتح","Open"),
language:T("Dil seçin","Dil seçin","اختر اللغة","Select language"),
theme:T("Temayı değiştir","Görünüşü dəyiş","تغيير المظهر","Toggle theme"),
curbLow:T("Düşük risk grubu (0–1); klinik değerlendirme şarttır.","Aşağı risk qrupu (0–1); klinik qiymətləndirmə vacibdir.","فئة خطورة منخفضة (0–1)؛ يلزم التقييم السريري.","Low-risk group (0–1); clinical assessment remains essential."),
curbMedium:T("Orta risk grubu (2); klinik değerlendirme şarttır.","Orta risk qrupu (2); klinik qiymətləndirmə vacibdir.","فئة خطورة متوسطة (2)؛ يلزم التقييم السريري.","Intermediate-risk group (2); clinical assessment remains essential."),
curbHigh:T("Yüksek risk grubu (3–5); acil klinik değerlendirme gerekir.","Yüksək risk qrupu (3–5); təcili klinik qiymətləndirmə lazımdır.","فئة خطورة مرتفعة (3–5)؛ يلزم التقييم السريري العاجل.","High-risk group (3–5); urgent clinical assessment is needed."),
qsofaAlert:T("≥2 bulgu var; organ disfonksiyonu açısından değerlendirin. Tek başına sepsis taraması değildir.","≥2 meyar var; orqan disfunksiyasını qiymətləndirin. Müstəqil sepsis skrininqi deyil.","يوجد معياران أو أكثر؛ قيّم خلل الأعضاء. ليست أداة فحص مستقلة للإنتان.","Two or more criteria; assess organ dysfunction. Not a stand-alone sepsis screen."),
qsofaCaution:T("Düşük qSOFA skoru sepsisi dışlamaz.","Aşağı qSOFA balı sepsisi istisna etmir.","الدرجة المنخفضة لا تستبعد الإنتان.","A low qSOFA score does not exclude sepsis."),
frailRobust:T("0: FRAIL ölçeğine göre sağlam.","0: FRAIL şkalasına görə robust.","0: غير هش وفق مقياس FRAIL.","0: Robust by FRAIL scale."),
frailPrefrail:T("1–2: Ön kırılgan.","1–2: Pre-frail.","1–2: مرحلة ما قبل الهشاشة.","1–2: Prefrail."),
frailFrail:T("3–5: Kırılganlık taraması pozitif; kapsamlı değerlendirme gerekir.","3–5: Kövrəklik skrininqi müsbət; geniş qiymətləndirmə lazımdır.","3–5: فحص هشاشة إيجابي؛ يلزم تقييم أشمل.","3–5: Frailty screen positive; further assessment needed.")
};
var categories = [
{id:"cardiology",icon:"🫀",title:T("Kardiyoloji","Kardiologiya","أمراض القلب","Cardiology")},
{id:"pulmonology",icon:"🫁",title:T("Göğüs Hastalıkları","Pulmonologiya","الأمراض الصدرية","Pulmonology")},
{id:"nephrology",icon:"💧",title:T("Nefroloji","Nefrologiya","أمراض الكلى","Nephrology")},
{id:"gastroenterology",icon:"🧬",title:T("Gastroenteroloji","Qastroenterologiya","أمراض الجهاز الهضمي","Gastroenterology")},
{id:"hematology",icon:"🩸",title:T("Hematoloji / Onkoloji","Hematologiya / Onkologiya","أمراض الدم / الأورام","Hematology / Oncology")},
{id:"infectious",icon:"🦠",title:T("Enfeksiyon Hastalıkları","İnfeksion xəstəliklər","الأمراض المعدية","Infectious Diseases")},
{id:"allergy",icon:"🌿",title:T("Alerji / İmmünoloji","Allerqologiya / İmmunologiya","الحساسية / المناعة","Allergy / Immunology")},
{id:"rheumatology",icon:"🦴",title:T("Romatoloji","Revmatologiya","أمراض الروماتيزم","Rheumatology")},
{id:"endocrinology",icon:"⚗️",title:T("Endokrinoloji","Endokrinologiya","الغدد الصماء","Endocrinology")},
{id:"geriatrics",icon:"🤝",title:T("Geriatri","Geriatriya","طب الشيخوخة","Geriatrics")}
];
var SBP=T("Sistolik kan basıncı","Sistolik qan təzyiqi","ضغط الدم الانقباضي","Systolic blood pressure");
var DBP=T("Diyastolik kan basıncı","Diastolik qan təzyiqi","ضغط الدم الانبساطي","Diastolic blood pressure");
var AGE=T("Yaş","Yaş","العمر","Age");
var WT=T("Ağırlık","Çəki","الوزن","Weight");
var HT=T("Boy","Boy","الطول","Height");
var HR=T("Nabız","Nəbz","معدل النبض","Heart rate");
var RR=T("Solunum sayısı","Tənəffüs tezliyi","معدل التنفس","Respiratory rate");
var NA=T("Serum sodyum","Serum natrium","صوديوم المصل","Serum sodium");
var SCR=T("Serum kreatinin","Serum kreatinin","كرياتينين المصل","Serum creatinine");
var WBC=T("Lökosit","Leykosit","عدد الكريات البيضاء","White blood cells");
var GLU=T("Kan glukozu","Qan qlükozası","غلوكوز الدم","Blood glucose");
var yesno=null;
var tools=[
m("map","cardiology","📈",T("Ortalama arter basıncı (OAB)","Orta arterial təzyiq (OAT)","متوسط الضغط الشرياني (MAP)","Mean arterial pressure (MAP)"),T("Sistolik ve diyastolik kan basıncından OAB tahmini.","Sistolik və diastolik təzyiqdən OAT təxmini.","تقدير المتوسط من الضغط الانقباضي والانبساطي.","Estimate MAP from systolic and diastolic pressure."),
[n("sbp",SBP,"mmHg",40,300),n("dbp",DBP,"mmHg",10,200)],"mmHg",1,
T("Yaklaşık formüldür; aritmi ve aşırı kalp hızlarında doğruluğu değişebilir.","Təxmini düsturdur; aritmiya və ekstremal nəbzdə dəqiqlik dəyişə bilər.","معادلة تقريبية وقد تتأثر بالدوران غير المنتظم أو النبض الشديد.","Approximation; accuracy may vary with arrhythmia and extreme heart rates."),
"MAP = (SBP + 2 × DBP) / 3","NCBI Bookshelf","https://www.ncbi.nlm.nih.gov/books/NBK538226/"),
m("aniongap","nephrology","⚡",T("Anyon açıklığı","Anion boşluğu","الفجوة الأيونية","Anion gap"),T("Potasyum eklenmeden serum anyon açıklığı.","Kaliumsuz serum anion boşluğu.","الفجوة الأيونية دون البوتاسيوم.","Serum anion gap without potassium."),
[n("na",NA,"mmol/L",80,200),n("cl",T("Serum klor","Serum xlor","كلوريد المصل","Serum chloride"),"mmol/L",40,160),n("hco3",T("Bikarbonat","Bikarbonat","البيكربونات","Bicarbonate"),"mmol/L",1,60)],"mmol/L",1,
T("Albümin düzeyi ve laboratuvar referans aralığı sonucu etkiler; burada albümin düzeltmesi yapılmaz.","Albumin səviyyəsi və laboratoriya aralığı nəticəyə təsir edir; albumin korreksiyası edilmir.","يتأثر بالألبومين والمجال المرجعي للمختبر؛ لا يُجرى تصحيح للألبومين.","Albumin and laboratory reference ranges affect interpretation; no albumin correction is applied."),
"AG = Na − (Cl + HCO₃)","Merck Manual","https://www.merckmanuals.com/professional/nephrology/acid-base-regulation-and-disorders/acid-base-disorders"),
m("bmi","endocrinology","📏",T("Vücut kitle indeksi (VKİ)","Bədən kütlə indeksi (BKİ)","مؤشر كتلة الجسم","Body mass index (BMI)"),T("Boy ve ağırlıktan VKİ hesaplama.","Boy və çəkidən BKİ hesablanması.","حساب المؤشر من الطول والوزن.","Calculate BMI from height and weight."),
[n("weight",WT,"kg",2,400),n("height",HT,"cm",50,250)],"kg/m²",1,
T("Vücut kompozisyonunu doğrudan ölçmez; gebelik ve özel popülasyonlarda yorum farklıdır.","Bədən tərkibini birbaşa ölçmür; hamiləlik və xüsusi qruplarda şərh fərqlidir.","لا يقيس تركيب الجسم مباشرة، ويختلف تفسيره في الحمل وفئات خاصة.","Does not directly assess body composition; interpretation varies in pregnancy and special populations."),
"BMI = weight(kg) / height(m)²","WHO","https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index"),
m("shock","cardiology","💓",T("Şok indeksi","Şok indeksi","مؤشر الصدمة","Shock index"),T("Nabız / sistolik kan basıncı.","Nəbz / sistolik qan təzyiqi.","معدل النبض ÷ الضغط الانقباضي.","Heart rate divided by systolic blood pressure."),
[n("hr",HR,"/min",20,300),n("sbp",SBP,"mmHg",40,300)],"",2,
T("Tek başına şok tanısı veya triyaj aracı değildir; yaş, ilaçlar ve ritim sonucu etkileyebilir.","Təkbaşına şok diaqnozu və ya triaj vasitəsi deyil; yaş, dərman və ritm təsir edə bilər.","لا يشخّص الصدمة وحده؛ تؤثر السن والأدوية ونظم القلب في النتيجة.","Not a stand-alone shock diagnosis or triage tool; age, medications and rhythm can alter the result."),
"SI = HR / SBP","PubMed","https://pubmed.ncbi.nlm.nih.gov/?term=shock+index+heart+rate+systolic+blood+pressure"),
m("qtc","cardiology","〰️",T("QTc (Fridericia)","QTc (Fridericia)","QTc (فريديريسيا)","QTc (Fridericia)"),T("QT ve RR aralığı ile kalp hızına göre düzeltilmiş QT.","QT və RR intervalına görə düzəldilmiş QT.","تصحيح QT وفق فترة RR.","Heart-rate corrected QT from QT and RR intervals."),
[n("qt",T("QT aralığı","QT intervalı","فترة QT","QT interval"),"ms",150,800),n("rr",T("RR aralığı","RR intervalı","فترة RR","RR interval"),"ms",250,3000)],"ms",0,
T("EKG'de QT ölçümünü doğrulayın. Geniş QRS, ritim değişkenliği ve klinik bağlam yorumu etkiler.","EKQ-də QT ölçümünü yoxlayın. Geniş QRS və ritm dəyişkənliyi şərhi dəyişir.","تحقق من قياس QT على التخطيط؛ يؤثر اتساع QRS واضطراب النظم في التفسير.","Verify ECG measurement. Wide QRS, rate variability and clinical context change interpretation."),
"QTcF = QT(ms) / (RR(s))^(1/3)","PubMed","https://pubmed.ncbi.nlm.nih.gov/8256750/"),
m("curb65","pulmonology","🫁",T("CURB-65","CURB-65","CURB-65","CURB-65"),T("Toplum kökenli pnömonide mortalite risk grubu.","İcma mənşəli pnevmoniyada ölüm riski qrupu.","تصنيف خطورة ذات الرئة المكتسبة من المجتمع.","Mortality risk grouping in community-acquired pneumonia."),
[y("confusion",T("Yeni gelişen konfüzyon","Yeni yaranmış çaşqınlıq","تشوش ذهني جديد","New confusion")),n("urea",T("Serum üre (BUN değil)","Serum sidik cövhəri (BUN deyil)","يوريا المصل (ليست BUN)","Serum urea (not BUN)"),"mmol/L",0,100),n("rr",RR,"/min",5,80),n("sbp",SBP,"mmHg",40,300),n("dbp",DBP,"mmHg",10,200),n("age",AGE,"years",18,120)]," / 5",0,
T("Yalnızca erişkin toplum kökenli pnömonide kullanın. Üre >7 mmol/L, solunum ≥30, SKB <90 veya DKB ≤60, yaş ≥65. Yatış kararı klinik değerlendirmeyle verilir.","Yalnız böyüklərdə icma pnevmoniyası üçün. Sidik cövhəri >7 mmol/L, tənəffüs ≥30, ST <90 və ya DT ≤60, yaş ≥65. Qərar klinik qiymətləndirməyə əsaslanır.","للبالغين المصابين بذات الرئة المكتسبة من المجتمع فقط. اليوريا >7، التنفس ≥30، الانقباضي <90 أو الانبساطي ≤60، العمر ≥65. القرار سريري.","For adults with community-acquired pneumonia only. Urea >7 mmol/L, RR ≥30, SBP <90 or DBP ≤60, age ≥65; clinical judgment determines disposition."),
"CURB-65 = C + [urea >7] + [RR ≥30] + [SBP <90 or DBP ≤60] + [age ≥65]","NICE NG250","https://www.nice.org.uk/guidance/NG250/chapter/recommendations"),
m("pf","pulmonology","🌬️",T("PaO₂ / FiO₂ (P/F)","PaO₂ / FiO₂ (P/F)","نسبة PaO₂ / FiO₂","PaO₂ / FiO₂ (P/F)"),T("Arteriyel oksijen basıncının FiO₂'ye oranı.","Arterial oksigen təzyiqinin FiO₂-yə nisbəti.","نسبة الضغط الجزئي للأكسجين إلى تركيز الأكسجين المستنشق.","Arterial oxygen tension divided by FiO₂."),
[n("pao2",T("PaO₂","PaO₂","PaO₂","PaO₂"),"mmHg",20,600),n("fio2",T("FiO₂ (yüzde)","FiO₂ (faiz)","FiO₂ (النسبة المئوية)","FiO₂ (percent)"),"%",21,100)],"mmHg",0,
T("P/F oranı tek başına ARDS tanısı koymaz. ARDS tanımında diğer klinik koşullar ve solunum desteği dikkate alınır.","P/F nisbəti təkbaşına ARDS diaqnozu qoymur; digər klinik şərtlər nəzərə alınır.","لا تشخّص النسبة متلازمة الضائقة التنفسية وحدها؛ يلزم استيفاء معايير أخرى.","P/F ratio alone cannot diagnose ARDS. Additional clinical and respiratory-support criteria apply."),
"P/F = PaO₂(mmHg) / (FiO₂% / 100)","MSD Manual","https://www.msdmanuals.com/professional/multimedia/table/berlin-definition-of-ards"),
m("cg","nephrology","🧪",T("Cockcroft–Gault kreatinin klirensi","Cockcroft–Gault kreatinin klirensi","تصفية الكرياتينين Cockcroft–Gault","Cockcroft–Gault creatinine clearance"),T("Erişkinlerde tahmini kreatinin klirensi.","Böyüklərdə təxmini kreatinin klirensi.","تقدير تصفية الكرياتينين لدى البالغين.","Estimate creatinine clearance in adults."),
[n("age",AGE,"years",18,120),n("weight",T("Formülde kullanılacak ağırlık","Düstur üçün seçilmiş çəki","الوزن المستخدم في المعادلة","Weight selected for formula"),"kg",20,300),n("creatinine",SCR,"mg/dL",0.1,20),s("sex",T("Formülün cinsiyet katsayısı","Düsturun cins əmsalı","معامل الجنس في المعادلة","Sex coefficient in equation"),[{value:"m",label:T("Erkek (×1)","Kişi (×1)","ذكر (×1)","Male (×1)")},{value:"f",label:T("Kadın (×0,85)","Qadın (×0,85)","أنثى (×0.85)","Female (×0.85)")}])],"mL/min",1,
T("Stabil kreatininde tahmindir; AKI'de güvenilir değildir. Gerçek/ideal/düzeltilmiş ağırlık seçimi ve düşük kas kütlesi özellikle önemlidir. eGFR değildir.","Stabil kreatinində təxmindir; AKI zamanı etibarlı deyil. Çəki seçimi və az əzələ kütləsi vacibdir. eGFR deyil.","تقدير عند ثبات الكرياتينين؛ لا يعتمد عليه في إصابة الكلى الحادة. اختيار الوزن وقلة العضلات مهمان. ليس eGFR.","Estimate assumes stable creatinine; unreliable in AKI. Weight choice and low muscle mass matter, and CrCl is not the same as eGFR."),
"CrCl = (140 − age) × weight / (72 × SCr); female coefficient ×0.85","NCBI Bookshelf","https://www.ncbi.nlm.nih.gov/books/NBK544228/"),
m("fena","nephrology","💧",T("Fraksiyonel sodyum atılımı (FeNa)","Natriumun fraksional ekskresiyası (FeNa)","الإطراح الجزئي للصوديوم (FeNa)","Fractional excretion of sodium (FeNa)"),T("Eş zamanlı serum ve idrar değerlerinden FeNa.","Eyni vaxtda serum və sidik göstəricilərindən FeNa.","حساب FeNa من عينات البول والدم المتزامنة.","FeNa from paired serum and urine measurements."),
[n("sna",NA,"mmol/L",80,200),n("una",T("İdrar sodyum","Sidik natrium","صوديوم البول","Urine sodium"),"mmol/L",0,300),n("scr",SCR,"mg/dL",0.1,25),n("ucr",T("İdrar kreatinin","Sidik kreatinin","كرياتينين البول","Urine creatinine"),"mg/dL",1,600)],"%",2,
T("Serum/idrar örnekleri eş zamanlı olmalıdır; kreatinin birimleri aynı olmalıdır. Diüretikler, KBH ve sepsis FeNa yorumunu sınırlar.","Serum və sidik nümunələri eyni vaxtda olmalı, kreatinin vahidləri eyni olmalıdır. Diuretiklər, XBX və sepsis şərhi məhdudlaşdırır.","ينبغي تزامن العينتين وتطابق وحدات الكرياتينين. المدرات والمرض الكلوي المزمن والإنتان تحد من التفسير.","Use contemporaneous samples and matching creatinine units. Diuretics, CKD and sepsis limit interpretation."),
"FeNa% = (UNa × SCr) / (SNa × UCr) × 100","PAHO / OPAS","https://recursos.opas.org.br/en/tools/fena-calculator"),
m("fib4","gastroenterology","🧬",T("FIB-4 fibrozis indeksi","FIB-4 fibroz indeksi","مؤشر التليف FIB-4","FIB-4 fibrosis index"),T("Yaş, AST, ALT ve trombositle karaciğer fibrozis skoru.","Yaş, AST, ALT və trombositlə qaraciyər fibroz balı.","درجة التليف من العمر وAST وALT والصفائح.","Liver fibrosis index from age, AST, ALT and platelets."),
[n("age",AGE,"years",18,120),n("ast",T("AST","AST","AST","AST"),"U/L",1,2000),n("alt",T("ALT","ALT","ALT","ALT"),"U/L",1,2000),n("platelets",T("Trombosit","Trombosit","الصفائح الدموية","Platelets"),"10⁹/L",1,1200)],"",2,
T("Akut karaciğer hasarında veya aşırı yaş gruplarında yanlış sınıflandırma olabilir. ≥65 yaşta eşikler farklıdır; klinik rehbere bakın.","Kəskin qaraciyər zədəsində və yaş sərhədlərində yanıltıcı ola bilər. ≥65 yaşda hədlər fərqlidir.","قد يكون مضللًا في إصابة الكبد الحادة أو أعمار معينة؛ تختلف العتبات لمن هم ≥65 سنة.","May misclassify acute liver injury and age extremes; age ≥65 requires different thresholds."),
"FIB-4 = age × AST / (platelets × √ALT)","AASLD","https://pmc.ncbi.nlm.nih.gov/articles/PMC10735173/"),
m("anc","hematology","🩸",T("Mutlak nötrofil sayısı (ANC)","Mütləq neytrofil sayı (ANC)","العدد المطلق للعدلات (ANC)","Absolute neutrophil count (ANC)"),T("Lökosit, nötrofil ve çomak yüzdeleriyle ANC.","Leykosit və neytrofil faizləri ilə ANC.","حساب العدلات من الكريات البيضاء والنسب المئوية.","Calculate ANC from WBC and differential percentages."),
[n("wbc",WBC,"10⁹/L",0,200),n("neut",T("Segmentli nötrofil","Seqmentli neytrofil","العدلات المجزأة","Segmented neutrophils"),"%",0,100),n("bands",T("Çomak nötrofil","Çubuqnüvəli neytrofil","العدلات العصوية","Band neutrophils"),"%",0,100)],"cells/µL",0,
T("Segmentli ve çomak toplamı %100'ü geçmemelidir. Febril nötropeni değerlendirmesinde klinik durum ve ateş kritiktir.","Seqmentli və çubuqnüvəli cəm 100%-i aşmamalıdır. Febril neytropeniyada klinik vəziyyət vacibdir.","يجب ألا يتجاوز مجموع النسب 100٪؛ تقييم قلة العدلات الحموية سريري.","Differential must total ≤100%. Febrile neutropenia requires immediate clinical assessment."),
"ANC(cells/µL) = WBC(10⁹/L) × 1000 × (segs% + bands%) / 100","Oncology Nursing Society","https://www.ons.org/clinical-tools/huddle-cards/clinical-calculations-anc-huddle-card"),
m("bsa","hematology","📐",T("Vücut yüzey alanı (Mosteller)","Bədən səthi sahəsi (Mosteller)","مساحة سطح الجسم (Mosteller)","Body surface area (Mosteller)"),T("Boy ve ağırlıktan BSA hesaplama.","Boy və çəkidən BSA hesablanması.","حساب مساحة سطح الجسم من الطول والوزن.","BSA from height and weight."),
[n("height",HT,"cm",50,250),n("weight",WT,"kg",2,400)],"m²",2,
T("İlaç dozları yalnızca bu değere göre belirlenmemelidir; protokol, organ işlevi ve hasta özellikleri kontrol edilmelidir.","Dərman dozası yalnız bu göstərici ilə seçilməməlidir; protokol və orqan funksiyası yoxlanmalıdır.","لا تُحدد الجرعات اعتمادًا على هذه القيمة وحدها؛ راجع البروتوكول ووظائف الأعضاء.","Never base dosing on BSA alone; verify protocol, organ function and patient factors."),
"BSA(m²) = √(height(cm) × weight(kg) / 3600)","PubMed","https://pubmed.ncbi.nlm.nih.gov/?term=Mosteller+body+surface+area+formula"),
m("qsofa","infectious","🦠",T("qSOFA (yalnız risk işareti)","qSOFA (yalnız risk göstəricisi)","qSOFA (مؤشر خطورة فقط)","qSOFA (risk flag only)"),T("Şüpheli enfeksiyonda üç qSOFA bulgusu.","Şübhəli infeksiyada üç qSOFA meyarı.","ثلاثة معايير qSOFA عند الاشتباه بعدوى.","Three qSOFA findings in suspected infection."),
[n("rr",RR,"/min",5,80),n("sbp",SBP,"mmHg",40,300),y("altered",T("Bilinç değişikliği (GKS <15)","Şüur dəyişikliyi (GKS <15)","تغير الوعي (GCS أقل من 15)","Altered mentation (GCS <15)"))]," / 3",0,
T("ÖNEMLİ: SSC 2026, hastanede tek sepsis taraması olarak qSOFA yerine NEWS/NEWS2, MEWS veya SIRS önermektedir. Düşük skor sepsisi dışlamaz.","VACİB: SSC 2026 xəstəxanada tək sepsis skrininqi üçün qSOFA əvəzinə NEWS/NEWS2, MEWS və ya SIRS tövsiyə edir. Aşağı bal sepsisi istisna etmir.","مهم: توصي إرشادات SSC 2026 باستخدام NEWS/NEWS2 أو MEWS أو SIRS بدل qSOFA كأداة فحص وحيدة للإنتان في المستشفى. الدرجة المنخفضة لا تستبعد الإنتان.","IMPORTANT: SSC 2026 recommends NEWS/NEWS2, MEWS or SIRS rather than qSOFA alone for inpatient sepsis screening. A low score does not rule out sepsis."),
"qSOFA = [RR ≥22] + [SBP ≤100] + [GCS <15]","Surviving Sepsis Campaign 2026","https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026"),
m("eos","allergy","🌿",T("Mutlak eozinofil sayısı","Mütləq eozinofil sayı","العدد المطلق للحمضات","Absolute eosinophil count"),T("Lökosit ve eozinofil yüzdesinden mutlak sayı.","Leykosit və eozinofil faizindən mütləq say.","حساب عدد الحمضات من الكريات البيضاء والنسبة.","Absolute count from WBC and eosinophil percentage."),
[n("wbc",WBC,"10⁹/L",0,200),n("eos",T("Eozinofil","Eozinofil","الحمضات","Eosinophils"),"%",0,100)],"cells/µL",0,
T("Eozinofili nedenini, klinik bağlamı ve laboratuvar referans aralığını birlikte değerlendirin.","Eozinofiliyanın səbəbini klinik vəziyyət və laboratoriya aralığı ilə birlikdə qiymətləndirin.","فسّر النتيجة مع السياق السريري والمجال المرجعي للمختبر.","Interpret alongside the clinical context and laboratory reference interval."),
"AEC(cells/µL) = WBC(10⁹/L) × 1000 × eosinophils% / 100","NCBI Bookshelf","https://www.ncbi.nlm.nih.gov/books/NBK560929/"),
m("das28","rheumatology","🦴",T("DAS28-CRP","DAS28-CRP","DAS28-CRP","DAS28-CRP"),T("Romatoid artritte 28 eklem üzerinden hastalık aktivitesi.","Revmatoid artritdə 28 oynaq üzrə aktivlik.","نشاط التهاب المفاصل الروماتويدي وفق 28 مفصلًا.","Rheumatoid arthritis activity using 28-joint counts."),
[n("tjc",T("Hassas eklem sayısı (28)","Ağrılı oynaq sayı (28)","المفاصل المؤلمة (من 28)","Tender joint count (of 28)"),"",0,28),n("sjc",T("Şiş eklem sayısı (28)","Şişmiş oynaq sayı (28)","المفاصل المتورمة (من 28)","Swollen joint count (of 28)"),"",0,28),n("crp",T("CRP","CRP","CRP","CRP"),"mg/L",0,500),n("pga",T("Hastanın genel değerlendirmesi (0–100)","Xəstənin ümumi qiyməti (0–100)","تقييم المريض العام (0–100)","Patient global assessment (0–100)"),"mm",0,100)],"",2,
T("DAS28-CRP ve DAS28-ESH eşikleri birebir aynı değildir; eklem sayımı ve klinik muayene gereklidir.","DAS28-CRP və DAS28-EÇS hədləri tam eyni deyil; oynaq müayinəsi vacibdir.","قد تختلف عتبات DAS28-CRP عن DAS28-ESR؛ يلزم فحص المفاصل.","DAS28-CRP and DAS28-ESR thresholds are not interchangeable; joint examination is required."),
"DAS28-CRP = 0.56√TJC + 0.28√SJC + 0.36ln(CRP+1) + 0.014PGA + 0.96","DAS-score.nl","https://www.das-score.nl/en/das-and-das28/how-to-meaure-the-das28/how-to-calculate-the-das28/alternative-validated-formulae"),
m("correctedna","endocrinology","🧂",T("Hiperglisemide düzeltilmiş sodyum","Hiperqlikemiyada korreksiya olunmuş natrium","الصوديوم المصحح لفرط سكر الدم","Glucose-corrected sodium"),T("Hiperglisemide ölçülen sodyumu tahmini düzeltme.","Hiperqlikemiyada ölçülmüş natriumun təxmini korreksiyası.","تصحيح تقديري للصوديوم المقاس في فرط سكر الدم.","Estimate sodium corrected for hyperglycemia."),
[n("na",NA,"mmol/L",80,200),n("glucose",GLU,"mg/dL",100,1500),s("factor",T("Düzeltme katsayısı / 100 mg/dL","Korreksiya əmsalı / 100 mg/dL","معامل التصحيح لكل 100 mg/dL","Correction factor per 100 mg/dL"),[{value:"1.6",label:T("1,6 (klasik)","1,6 (klassik)","1.6 (تقليدي)","1.6 (traditional)")},{value:"2.4",label:T("2,4 (Hillier)","2,4 (Hillier)","2.4 (Hillier)","2.4 (Hillier)")}])],"mmol/L",1,
T("Katsayı klinik duruma ve glukoz düzeyine göre değişir (özellikle >400 mg/dL). Tahmindir; sodyum yönetiminde doğrudan tedavi hedefi olarak kullanılmaz.","Əmsal klinik vəziyyətə və qlükozaya görə dəyişir (xüsusilə >400 mg/dL). Müalicə hədəfi kimi tək istifadə edilməməlidir.","يختلف المعامل حسب الحالة والغلوكوز (خصوصًا فوق 400 mg/dL). التقدير ليس هدفًا علاجيًا مستقلًا.","Factor varies by setting and glucose (especially >400 mg/dL). This estimate is not a stand-alone treatment target."),
"Corrected Na = Na + factor × (glucose − 100) / 100","Hillier et al., 1999","https://pubmed.ncbi.nlm.nih.gov/10225241/"),
m("frail","geriatrics","🤝",T("FRAIL kırılganlık ölçeği","FRAIL kövrəklik şkalası","مقياس الهشاشة FRAIL","FRAIL frailty scale"),T("Beş soruyla yaşlılarda kırılganlık taraması.","Beş sualla yaşlılarda kövrəklik skrininqi.","خمس أسئلة لفحص الهشاشة لدى كبار السن.","Five-item frailty screen for older adults."),
[y("fatigue",T("Son 4 haftada çoğu zaman yorgunluk","Son 4 həftədə çox vaxt yorğunluq","تعب معظم الوقت خلال آخر 4 أسابيع","Fatigued all or most of the last 4 weeks")),y("resistance",T("Yardımsız 10 basamak çıkmada güçlük","Köməksiz 10 pillə qalxmaqda çətinlik","صعوبة صعود 10 درجات دون مساعدة","Difficulty climbing 10 steps unaided")),y("walking",T("Yardımsız birkaç yüz metre yürümede güçlük","Köməksiz bir neçə yüz metr gəzməkdə çətinlik","صعوبة المشي بضع مئات من الأمتار دون مساعدة","Difficulty walking several hundred meters unaided")),y("illnesses",T("FRAIL listesindeki ≥5 kronik hastalık","FRAIL siyahısında ≥5 xroniki xəstəlik","وجود ≥5 أمراض مزمنة من قائمة FRAIL","≥5 chronic diseases on the FRAIL list"),T("Anjina, artrit, astım, inme, kanser, kronik akciğer hastalığı, diyabet, MI, böbrek hastalığı, hipertansiyon.","Stenokardiya, artrit, astma, insult, xərçəng, xroniki ağciyər xəstəliyi, diabet, infarkt, böyrək xəstəliyi, hipertenziya.","ذبحة صدرية، التهاب مفاصل، ربو، سكتة، سرطان، مرض رئوي مزمن، سكري، احتشاء قلب، مرض كلوي، ارتفاع ضغط.","Angina, arthritis, asthma, stroke, cancer, chronic lung disease, diabetes, myocardial infarction, kidney disease, hypertension.")),y("loss",T("Son yılda istemsiz >%5 kilo kaybı","Son ildə istəksiz >5% çəki itkisi","فقد وزن غير مقصود >5٪ خلال سنة","Unintentional >5% weight loss in 1 year"))]," / 5",0,
T("Akut hastalık sırasındaki değişikliklerden ziyade hastalık öncesi işlevi sorgulayın. Tek başına kapsamlı geriatrik değerlendirmenin yerine geçmez.","Kəskin xəstəlikdən əvvəlki funksiyanı qiymətləndirin. Geniş geriatrik müayinəni əvəz etmir.","قيّم القدرة الوظيفية قبل المرض الحاد؛ لا يغني عن التقييم الشامل للمسنين.","Assess usual function before acute illness. The scale does not replace comprehensive geriatric assessment."),
"FRAIL = fatigue + resistance + ambulation + illnesses + loss (0–5)","Harvard eFrailty","https://efrailty.hsl.harvard.edu/ToolFRAILScale.html")
];
tools.unshift({id:"acidbase",group:"nephrology",icon:"⚗️",title:T("Asit-Baz Bozuklukları","Turşu-qələvi pozğunluqları","اضطرابات الحمض والقاعدة","Acid–Base Disorders"),summary:T("Kan gazı analizi, kompansasyon, anyon açıklığı ve delta oranı.","Qan qazı təhlili, kompensasiya, anion boşluğu və delta nisbəti.","تحليل غازات الدم والتعويض والفجوة الأيونية ونسبة دلتا.","ABG interpretation, compensation, anion gap and delta ratio."),customPage:"acidbase.html"});
root.CAPAData = Object.freeze({UI:UI,categories:categories,tools:tools,languages:["tr","az","ar","en"]});
})(typeof globalThis !== "undefined" ? globalThis : this);
