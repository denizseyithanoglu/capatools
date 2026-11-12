/* CAPA Tools specialty extensions: hematology and gastroenterology.
   Short metadata, translations, input help and source links.
   FIB-4 already exists in base data.js and is intentionally not duplicated. */
(function(root){
"use strict";
var D=root.CAPAData;if(!D||!Array.isArray(D.tools))return;
var T=function(tr,az,ar,en){return {tr:tr,az:az,ar:ar,en:en};};
var n=function(key,label,unit,min,max,help){return {key:key,label:label,unit:unit,kind:"number",min:min,max:max,help:help||null};};
var y=function(key,label){return {key:key,label:label,kind:"binary"};};
var s=function(key,label,options,help){
 return {key:key,label:label,kind:"select",
 numeric:options.every(function(option){return typeof option[0]==="number";}),
 options:options.map(function(option){return {value:String(option[0]),label:option[1]};}),
 help:help||null};
};
var add=function(id,group,icon,title,summary,fields,max,warning,formula,source,url){
 D.tools.push({id:id,group:group,icon:icon,title:title,summary:summary,fields:fields,
 unit:" / "+max,decimals:0,warning:warning,formula:formula,source:source,sourceUrl:url});
};
var sbp=T("Sistolik kan basıncı","Sistolik qan təzyiqi","ضغط الدم الانقباضي","Systolic blood pressure");
var age=T("Yaş","Yaş","العمر","Age");
var pulse=T("Nabız","Nəbz","النبض","Pulse");
Object.assign(D.UI,{
 masccLow:T("≥21: MASCC'a göre düşük komplikasyon riski; tek başına taburculuk ölçütü değildir.","≥21: MASCC üzrə aşağı risk; təkbaşına evə yazılma meyarı deyil.","≥21: خطر مضاعفات أقل حسب MASCC؛ لا يكفي وحده للخروج.","≥21: lower complication risk by MASCC; not sufficient alone for discharge."),
 masccHigh:T("<21: yüksek komplikasyon riski; acil klinik yönetim gerekir.","<21: ağırlaşma riski yüksəkdir; təcili klinik müdaxilə lazımdır.","<21: خطر مضاعفات مرتفع؛ يلزم تدبير سريري عاجل.","<21: high risk of complications; urgent clinical management required."),
 saagPortal:T("≥1,1 g/dL: portal hipertansiyonla ilişkili asit lehine.","≥1,1 g/dL: portal hipertenziya ilə əlaqəli assit ehtimalı.","≥1.1 غ/دل: يشير إلى استسقاء مرتبط بفرط ضغط الباب.","≥1.1 g/dL: suggests portal-hypertension-related ascites."),
 saagOther:T("<1,1 g/dL: portal hipertansiyon dışı nedenleri araştırın.","<1,1 g/dL: portal hipertenziyadan kənar səbəbləri araşdırın.","<1.1 غ/دل: ابحث عن أسباب أخرى للاستسقاء.","<1.1 g/dL: investigate non-portal hypertensive causes."),
 gbsVeryLow:T("GBS 0–1: çok düşük risk grubu; ayaktan takip uygunluğu yalnız klinik değerlendirmeyle belirlenir.","GBS 0–1: çox aşağı risk; ambulator qərar yalnız klinik qiymətləndirmə ilə verilir.","GBS 0–1: خطر منخفض جدًا؛ قرار المتابعة الخارجية سريري.","GBS 0–1: very low risk; suitability for outpatient care requires clinical assessment."),
 gbsElevated:T("GBS >1: hastane bazlı değerlendirme / müdahale ihtimali artar; klinik durum belirleyicidir.","GBS >1: xəstəxanada qiymətləndirmə ehtiyacı arta bilər; klinik vəziyyət əsasdır.","GBS >1: قد تزداد الحاجة للرعاية في المستشفى؛ التقييم السريري أساسي.","GBS >1: increased potential need for hospital-based care; clinical status guides action."),
 aimsLower:T("AIMS65 0–1: göreli olarak daha düşük mortalite riski; taburculuk skoru değildir.","AIMS65 0–1: nisbətən aşağı ölüm riski; evə yazılma balı deyil.","AIMS65 0–1: خطر وفاة نسبي أقل؛ ليس أداة لاتخاذ قرار الخروج.","AIMS65 0–1: relatively lower mortality risk; not a discharge score."),
 aimsHigher:T("AIMS65 ≥2: artmış mortalite riskiyle ilişkili; yakın klinik değerlendirme gerekir.","AIMS65 ≥2: ölüm riski artımı ilə əlaqəlidir; yaxından qiymətləndirin.","AIMS65 ≥2: يرتبط بزيادة خطر الوفاة؛ يلزم التقييم القريب.","AIMS65 ≥2: associated with higher mortality risk; close clinical evaluation required."),
 rockallCaution:T("Pre-endoskopik Rockall: yalnız ilk değerlendirme içindir; endoskopi sonrası tam skor farklıdır.","Endoskopiyadan əvvəlki Rockall: ilkin qiymətləndirmə üçündür.","روكال قبل التنظير: للتقييم الأولي فقط، وليس الدرجة الكاملة.","Pre-endoscopic Rockall is an initial estimate, not the full post-endoscopic score."),
 rockallHigher:T("Pre-endoskopik Rockall ≥3: artmış risk düşündürür; endoskopi sonrası tam skor ayrı hesaplanır.","Endoskopiyadan əvvəlki Rockall ≥3: yüksək risk ehtimalı.","روكال قبل التنظير ≥3: قد يشير لخطر أعلى.","Pre-endoscopic Rockall ≥3: higher risk may be present; full score requires endoscopy.")
});
add("mascc","hematology","🩸",
 T("MASCC – Febril Nötropeni","MASCC – Febril neytropeniya","MASCC – قلة العدلات الحموية","MASCC – Febrile Neutropenia"),
 T("Febril nötropenide komplikasyon risk indeksi (0–26).","Febril neytropeniyada ağırlaşma riski (0–26).","تقدير خطر مضاعفات قلة العدلات الحموية (0–26).","Febrile neutropenia complication risk index (0–26)."),
 [
 s("burden",T("Hastalığın klinik yükü","Xəstəliyin klinik ağırlığı","شدة الحالة السريرية","Burden of illness"),[
 [5,T("Semptom yok veya hafif (+5)","Yüngül / yoxdur (+5)","لا أعراض أو طفيفة (+5)","No or mild symptoms (+5)")],
 [3,T("Orta derecede (+3)","Orta (+3)","متوسطة (+3)","Moderate symptoms (+3)")],
 [0,T("Ağır / moribund (+0)","Ağır (+0)","شديدة / حرجة (+0)","Severe / moribund (+0)")]
 ]),
 n("sbp",sbp,"mmHg",40,300,T("Hipotansiyon olmaması: SKB >90 mmHg (+5).","Hipotenziya olmaması: ST >90 mmHg (+5).","غياب انخفاض الضغط: انقباضي >90 (+5).","No hypotension: SBP >90 mmHg (+5).")),
 y("noCopd",T("Aktif KOAH yok","Aktiv AXOX yoxdur","لا يوجد COPD نشط","No active COPD")),
 y("tumorFungus",T("Solid tümör VEYA hematolojik malignitede önceden fungal infeksiyon yok","Solid şiş VƏ YA hematoloji xəstəlikdə keçmiş fungal infeksiya yoxdur","ورم صلب أو خباثة دموية دون عدوى فطرية سابقة","Solid tumour OR hematologic malignancy without prior fungal infection")),
 y("noDehydration",T("Parenteral sıvı gerektiren dehidratasyon yok","Venadaxili maye tələb edən susuzlaşma yoxdur","لا يوجد تجفاف يتطلب سوائل وريدية","No dehydration requiring IV fluids")),
 y("outpatient",T("Ateş başladığında hasta ayaktaydı (poliklinik/ev)","Hərarət başlayanda ambulator idi","كان خارج المستشفى عند بدء الحمى","Outpatient at fever onset")),
 n("age",age,"years",18,120)
 ],26,
 T("Febril nötropeni acil değerlendirme ve ampirik antimikrobiyal yönetim gerektirir. MASCC ≥21 tek başına taburculuk veya oral tedavi kararı verdirmez; klinik stabilite, beklenen nötropeni süresi ve komorbiditeler önemlidir.","Febril neytropeniya təcili qiymətləndirmə tələb edir. ≥21 təkbaşına evə yazılma meyarı deyil.","قلة العدلات الحموية تستلزم تقييمًا وعلاجًا عاجلين. ≥21 لا يكفي للخروج دون تقييم سريري.","Febrile neutropenia requires urgent assessment and empiric management. MASCC ≥21 alone cannot justify discharge or oral treatment."),
 "MASCC = burden(0/3/5) + SBP>90(5) + no COPD(4) + tumor/fungus(4) + no dehydration(3) + outpatient(3) + age<60(2).",
 "ASCO – MASCC Risk Index","https://eguideline.guidelinecentral.com/i/1475492-outpatient-management-of-fever-and-neutropenia-in-adults-treated-for-malignancy/7");
D.tools.push({
 id:"saag",group:"gastroenterology",icon:"🧪",
 title:T("Serum–Asit Albümin Gradiyenti (SAAG)","Serum–Assit Albumin Qradiyenti (SAAG)","تدرج ألبومين المصل–الاستسقاء (SAAG)","Serum–Ascites Albumin Gradient (SAAG)"),
 summary:T("Eş zamanlı serum ve asit albümininden portal hipertansiyon değerlendirmesi.","Eyni vaxtda serum və assit albumini ilə portal hipertenziya dəyərləndirməsi.","تقدير سبب الاستسقاء من ألبومين المصل والسائل.","Assess portal hypertension using paired serum and ascites albumin."),
 fields:[
 n("serumAlbumin",T("Serum albümin","Serum albumin","ألبومين المصل","Serum albumin"),"g/dL",0,8),
 n("ascitesAlbumin",T("Asit sıvısı albümini","Assit mayesi albumini","ألبومين سائل الاستسقاء","Ascitic fluid albumin"),"g/dL",0,8)
 ],unit:"g/dL",decimals:2,
 warning:T("Serum ve asit albümini aynı zamanda örneklenmelidir. SAAG tek başına siroz tanısı koymaz veya enfeksiyon değerlendirmesinin yerine geçmez. Negatif sonuçta eş zamanlılık ve ölçümleri kontrol edin.","Serum və assit albumini eyni zamanda götürülməlidir. SAAG diaqnoz üçün yetərli deyil.","يجب أخذ عينتي المصل والاستسقاء في الوقت نفسه. لا يشخّص SAAG التشمع وحده ولا يستبدل فحوص العدوى.","Use samples obtained at the same time. SAAG alone neither diagnoses cirrhosis nor replaces infection evaluation; verify unexpected negative gradients."),
 formula:"SAAG (g/dL) = serum albumin − ascites albumin; ≥1.1 suggests portal hypertension.",
 source:"AASLD Ascites Practice Guidance (2021)",sourceUrl:"https://aasldpubs.onlinelibrary.wiley.com/doi/full/10.1002/hep.31884"
});
add("gbs","gastroenterology","🩺",
 T("Glasgow–Blatchford Skoru (GBS)","Glasgow–Blatchford Balı (GBS)","درجة غلاسكو–بلاتشفورد (GBS)","Glasgow–Blatchford Score (GBS)"),
 T("Üst GİS kanamasında endoskopi öncesi müdahale riski.","Yuxarı GİS qanaxmasında endoskopiyadan əvvəl risk.","تقييم خطر نزف الجهاز الهضمي العلوي قبل التنظير.","Pre-endoscopy risk stratification in upper GI bleeding."),
 [
 n("urea",T("Serum üre (BUN değil)","Serum sidik cövhəri (BUN deyil)","يوريا المصل (وليست BUN)","Serum urea (NOT BUN)"),"mmol/L",0,100),
 n("hb",T("Hemoglobin","Hemoqlobin","الهيموغلوبين","Hemoglobin"),"g/dL",0,25),
 s("sex",T("Hemoglobin eşiği için cinsiyet","Hemoqlobin həddi üçün cins","الجنس لتفسير الهيموغلوبين","Sex for hemoglobin cutoff"),[
 ["m",T("Erkek","Kişi","ذكر","Male")],
 ["f",T("Kadın","Qadın","أنثى","Female")]
 ]),
 n("sbp",sbp,"mmHg",40,300),
 n("hr",pulse,"/min",20,250),
 y("melena",T("Melena var","Melena var","يوجد ميلينا","Melena")),
 y("syncope",T("Senkop var","Sinkop var","إغماء","Syncope")),
 y("liverDisease",T("Karaciğer hastalığı var","Qaraciyər xəstəliyi var","مرض كبدي","Liver disease")),
 y("heartFailure",T("Kalp yetmezliği var","Ürək çatışmazlığı var","فشل قلبي","Heart failure"))
 ],23,
 T("Üst GİS kanamasına yöneliktir; alt GİS kanamasında kullanmayın. Hemodinamik instabilite veya aktif kanamada skor düşük olsa bile acil değerlendirme gerekir. Üre birimi mmol/L'dir; BUN mg/dL doğrudan girilmez.","Yuxarı GİS qanaxması üçündür. Qeyri-stabil xəstədə aşağı bal təhlükəsiz evə yazılma demək deyil. Urea mmol/L daxil edin.","مخصص للنزف الهضمي العلوي. عدم الاستقرار يتطلب رعاية عاجلة ولو كانت الدرجة منخفضة. أدخل اليوريا mmol/L وليس BUN mg/dL.","For upper GI bleeding. Hemodynamic instability or ongoing bleeding requires urgent care despite a low score. Enter urea in mmol/L, not BUN mg/dL."),
 "GBS: urea 0/2/3/4/6; Hb by sex 0/1/3/6; SBP 0/1/2/3; pulse≥100 +1; melena +1; syncope +2; liver disease +2; heart failure +2.",
 "GGC – Glasgow–Blatchford score","https://handbook.ggcmedicines.org.uk/guidelines/gastrointestinal-system/glasgow-blatchford-score/");
add("aims65","gastroenterology","🩸",
 T("AIMS65 – Üst GİS Kanaması","AIMS65 – Yuxarı GİS Qanaxması","AIMS65 – النزف الهضمي العلوي","AIMS65 – Upper GI Bleeding"),
 T("Üst GİS kanamasında hastane içi mortalite risk göstergesi.","Yuxarı GİS qanaxmasında stasionar ölüm riski.","مؤشر خطر الوفيات داخل المستشفى في النزف الهضمي العلوي.","In-hospital mortality risk indicator in upper GI bleeding."),
 [
 n("albumin",T("Serum albümin","Serum albumin","ألبومين المصل","Serum albumin"),"g/dL",0,8),
 n("inr",T("INR","INR","INR","INR"),"",0.5,15),
 y("altered",T("Bilinç değişikliği","Şüur dəyişikliyi","تغير الوعي","Altered mental status")),
 n("sbp",sbp,"mmHg",40,300),
 n("age",age,"years",18,120)
 ],5,
 T("AIMS65 mortalite riskini öngörmeye yöneliktir; kanama müdahale ihtiyacını veya güvenli taburculuğu belirlemek için tek başına kullanılmaz. GBS ile aynı amaca hizmet etmez.","AIMS65 ölüm riskini təxmin edir; müdaxilə və evə yazılma üçün təkbaşına istifadə edilməz.","AIMS65 لتقدير الوفيات وليس لاتخاذ قرار الخروج أو الحاجة للتدخل وحده.","AIMS65 predicts mortality risk, not intervention need or safe discharge; it serves a different purpose from GBS."),
 "AIMS65: albumin <3 g/dL + INR >1.5 + altered mental status + SBP ≤90 + age >65 (1 point each).",
 "Saltzman et al. (PubMed)","https://pubmed.ncbi.nlm.nih.gov/21907980/");
add("prerockall","gastroenterology","📊",
 T("Pre-endoskopik Rockall","Endoskopiyadan əvvəlki Rockall","روكال قبل التنظير","Pre-endoscopic Rockall"),
 T("Üst GİS kanamasında endoskopi öncesi klinik risk tahmini.","Yuxarı GİS qanaxmasında ilkin risk təxmini.","تقدير أولي لخطر النزف الهضمي العلوي قبل التنظير.","Pre-endoscopy clinical risk estimate for upper GI bleeding."),
 [
 n("age",age,"years",18,120),
 n("hr",pulse,"/min",20,250),
 n("sbp",sbp,"mmHg",40,300),
 s("comorbidity",T("Eşlik eden majör hastalık","Yanaşı ağır xəstəlik","الأمراض المرافقة الكبرى","Major comorbidity"),[
 [0,T("Yok","Yoxdur","لا يوجد","None")],
 [2,T("Kalp yetmezliği veya iskemik kalp hastalığı","Ürək çatışmazlığı və ya işemik xəstəlik","فشل قلبي أو مرض قلبي إقفاري","Cardiac failure or ischemic heart disease")],
 [3,T("Böbrek/karaciğer yetmezliği veya yaygın malignite","Böyrək/qaraciyər çatışmazlığı və ya yayılmış xərçəng","فشل كلوي/كبدي أو سرطان منتشر","Renal/liver failure or disseminated malignancy")]
 ])
 ],7,
 T("Sadece pre-endoskopik klinik Rockall (0–7) hesaplanır; tam Rockall skoru değildir. Üst GİS kanamasında GBS, endoskopi öncesi triyaj için daha çok önerilir.","Yalnız endoskopiyadan əvvəlki Rockall (0–7) hesablanır; tam bal deyil.","تحسب الدرجة قبل التنظير فقط (0–7)، وليست روكال الكاملة.","Calculates pre-endoscopic Rockall (0–7), not full Rockall. GBS is generally preferred for pre-endoscopic triage."),
 "Pre-Rockall: age (<60=0, 60–79=1, ≥80=2) + shock (SBP<100=2, HR≥100=1, else=0) + comorbidity (0/2/3).",
 "Risk stratification review (PMC)","https://pmc.ncbi.nlm.nih.gov/articles/PMC5325906/");

Object.assign(D.UI,{
  childA:T("Child–Pugh A (5–6): görece korunmuş karaciğer fonksiyonu.","Child–Pugh A (5–6): nisbətən qorunmuş qaraciyər funksiyası.","Child–Pugh A (5–6): وظيفة كبدية محفوظة نسبيًا.","Child–Pugh A (5–6): relatively preserved liver function."),
  childB:T("Child–Pugh B (7–9): orta derecede karaciğer fonksiyon bozukluğu.","Child–Pugh B (7–9): orta dərəcəli qaraciyər disfunksiyası.","Child–Pugh B (7–9): خلل كبدي متوسط.","Child–Pugh B (7–9): moderate hepatic dysfunction."),
  childC:T("Child–Pugh C (10–15): ileri karaciğer fonksiyon bozukluğu.","Child–Pugh C (10–15): ağır qaraciyər disfunksiyası.","Child–Pugh C (10–15): خلل كبدي شديد.","Child–Pugh C (10–15): severe hepatic dysfunction."),
  meldBase:T("Başlangıç MELD","İlkin MELD","MELD الأساسي","Initial MELD"),
  meldNaCaution:T("Klasik MELD-Na (2016–2023); daha yüksek skor daha yüksek mortalite riskiyle ilişkilidir. ABD organ tahsisinde Temmuz 2023'ten beri MELD 3.0 kullanılır.","Klassik MELD-Na (2016–2023); yüksək nəticə artmış ölüm riski ilə bağlıdır. ABŞ-da 2023-cü ildən MELD 3.0 istifadə olunur.","MELD-Na التقليدي (2016–2023)؛ الدرجة الأعلى ترتبط بزيادة خطر الوفاة. تستخدم الولايات المتحدة MELD 3.0 منذ يوليو 2023.","Legacy MELD-Na (2016–2023); higher scores correlate with mortality risk. US allocation has used MELD 3.0 since July 2023."),
  lilleResponse:T("Lille ≤0,45: kortikosteroide biyokimyasal yanıt lehine; klinikle birlikte yorumlayın.","Lille ≤0,45: kortikosteroidə cavab ehtimalı; klinik qiymətləndirin.","Lille ≤0.45: يشير إلى استجابة للستيرويد؛ فسّره ضمن السياق السريري.","Lille ≤0.45: suggests response to corticosteroids; interpret in clinical context."),
  lilleNonresponse:T("Lille >0,45: kortikosteroide yanıtsızlık lehine; tedavinin sürdürülmesini klinik olarak yeniden değerlendirin.","Lille >0,45: kortikosteroidə cavabsızlıq; müalicəni yenidən qiymətləndirin.","Lille >0.45: يشير إلى عدم الاستجابة؛ أعد تقييم استمرار الستيرويد سريريًا.","Lille >0.45: suggests corticosteroid nonresponse; clinically reassess continued therapy.")
});

/* Hepatology scores: Child–Pugh, legacy MELD-Na, Lille day-7. */
D.tools.push({
  id:"childpugh",group:"gastroenterology",icon:"🫀",
  title:T("Child–Pugh Skoru","Child–Pugh Balı","درجة تشايلد–بوغ","Child–Pugh Score"),
  summary:T("Sirozda beş parametreyle A/B/C sınıflaması.","Sirrozda beş göstərici ilə A/B/C sinfi.","تصنيف شدة التشمع بخمسة معايير إلى A/B/C.","Cirrhosis severity classification from five parameters (A/B/C)."),
  fields:[
    n("bilirubin",T("Total bilirubin","Ümumi bilirubin","البيليروبين الكلي","Total bilirubin"),"mg/dL",0.1,80),
    n("albumin",T("Serum albümin","Serum albumin","ألبومين المصل","Serum albumin"),"g/dL",0.5,7),
    n("inr",T("INR","INR","INR","INR"),"",0.5,15),
    s("ascites",T("Asit","Assit","الاستسقاء","Ascites"),[
      [0,T("Yok","Yoxdur","لا يوجد","None")],
      [1,T("Hafif / diüretikle kontrollü","Yüngül / diuretiklə nəzarətdə","خفيف / مضبوط بالمدرات","Mild / controlled with diuretics")],
      [2,T("Orta–ileri / dirençli","Orta–ağır / refrakter","متوسط إلى شديد / مقاوم","Moderate–severe / refractory")]
    ]),
    s("encephalopathy",T("Hepatik ensefalopati","Hepatik ensefalopatiya","الاعتلال الدماغي الكبدي","Hepatic encephalopathy"),[
      [0,T("Yok (evre 0)","Yoxdur (0)","لا يوجد (0)","None (grade 0)")],
      [1,T("Evre 1–2","Dərəcə 1–2","الدرجة 1–2","Grade 1–2")],
      [2,T("Evre 3–4","Dərəcə 3–4","الدرجة 3–4","Grade 3–4")]
    ])
  ],unit:" / 15",decimals:0,
  warning:T("Klinik asit ve ensefalopati değerlendirmesi öznel olabilir; mevcut tedavi ve kolestaz sonucu etkileyebilir. Tek başına karar aracı değildir.","Assit və ensefalopatiya qiymətləndirməsi subyektiv ola bilər; təkbaşına qərar verməyin.","تقييم الاستسقاء والاعتلال الدماغي قد يكون ذاتيًا؛ لا تعتمد على الدرجة وحدها.","Ascites and encephalopathy grading can be subjective; treatment and cholestasis affect interpretation. Not a stand-alone decision tool."),
  formula:"Child–Pugh = bilirubin (1–3) + albumin (1–3) + INR (1–3) + ascites (1–3) + encephalopathy (1–3). A=5–6, B=7–9, C=10–15.",
  source:"Merck Manual – Child–Turcotte–Pugh",sourceUrl:"https://www.merckmanuals.com/professional/multimedia/table/child-turcotte-pugh-scoring-system"
});
D.tools.push({
  id:"meldna",group:"gastroenterology",icon:"🧮",
  title:T("MELD-Na (klasik, 2016–2023)","MELD-Na (klassik, 2016–2023)","MELD-Na (التقليدي، 2016–2023)","MELD-Na (legacy, 2016–2023)"),
  summary:T("Bilirubin, INR, kreatinin ve sodyum ile klasik MELD-Na.","Bilirubin, INR, kreatinin və natrium ilə klassik MELD-Na.","حساب MELD-Na التقليدي من البيليروبين وINR والكرياتينين والصوديوم.","Legacy sodium-adjusted MELD from bilirubin, INR, creatinine and sodium."),
  fields:[
    n("bilirubin",T("Total bilirubin","Ümumi bilirubin","البيليروبين الكلي","Total bilirubin"),"mg/dL",0.1,80),
    n("inr",T("INR","INR","INR","INR"),"",0.5,15),
    n("creatinine",T("Serum kreatinin","Serum kreatinin","كرياتينين المصل","Serum creatinine"),"mg/dL",0.1,20),
    n("sodium",T("Serum sodyum","Serum natrium","صوديوم المصل","Serum sodium"),"mmol/L",100,170),
    y("dialysis",T("Son 7 günde ≥2 diyaliz veya ≥24 saat CVVHD","Son 7 gündə ≥2 dializ və ya ≥24 saat CVVHD","جلستا غسيل على الأقل أو 24 ساعة CVVHD خلال 7 أيام","≥2 dialysis sessions or ≥24 h CVVHD within 7 days"))
  ],unit:" / 40",decimals:0,
  warning:T("Klasik OPTN 2016 MELD-Na formülüdür, güncel nakil tahsis skoru değildir (MELD 3.0 kullanılmaktadır). Kreatinin 1–4, bilirubin/INR ≥1, sodyum 125–137 olarak sınırlandırılır. MELD ≤11 ise sodyum düzeltmesi uygulanmaz.","Klassik OPTN 2016 hesabıdır, hazırkı transplantasiya balı deyil (MELD 3.0). Kreatinin 1–4, Na 125–137; ilkin MELD ≤11 olduqda Na düzəlişi yoxdur.","صيغة OPTN 2016 القديمة وليست درجة التخصيص الحالية (MELD 3.0). يحدد الكرياتينين بين 1–4 والصوديوم بين 125–137؛ لا يصحح الصوديوم إذا كان MELD ≤11.","Legacy OPTN 2016 equation, NOT the current allocation score (MELD 3.0). Creatinine capped 1–4; bilirubin/INR floored at 1; sodium capped 125–137. Sodium adjustment only for initial MELD >11."),
  formula:"MELD(i) = round[9.57 ln(Cr) + 3.78 ln(bilirubin) + 11.20 ln(INR) + 6.43]; if MELD(i)>11: MELD-Na=MELD(i)+1.32(137−Na)−0.033 MELD(i)(137−Na); total bounded 6–40.",
  source:"Kim et al., MELD 3.0 (prior MELD-Na methods)",sourceUrl:"https://pmc.ncbi.nlm.nih.gov/articles/PMC8608337/"
});
D.tools.push({
  id:"lille",group:"gastroenterology",icon:"🧬",
  title:T("Lille Skoru (7. gün)","Lille Balı (7-ci gün)","درجة ليل (اليوم السابع)","Lille Score (day 7)"),
  summary:T("Ağır alkol ilişkili hepatitte 7 günlük kortikosteroid yanıtı.","Ağır alkoqolla əlaqəli hepatitdə 7 günlük steroid cavabı.","استجابة التهاب الكبد الكحولي الشديد للكورتيكوستيرويد بعد 7 أيام.","Day-7 corticosteroid response in severe alcohol-associated hepatitis."),
  fields:[
    n("age",age,"years",18,120),
    n("albumin",T("Başlangıç albümin","İlkin albumin","ألبومين البداية","Baseline albumin"),"g/dL",0.5,7),
    n("bilirubin0",T("0. gün total bilirubin","0-cı gün ümumi bilirubin","البيليروبين الكلي يوم 0","Day-0 total bilirubin"),"mg/dL",0.1,80),
    n("bilirubin7",T("7. gün total bilirubin","7-ci gün ümumi bilirubin","البيليروبين الكلي يوم 7","Day-7 total bilirubin"),"mg/dL",0.1,80),
    n("pt",T("Başlangıç protrombin zamanı (PT)","İlkin protrombin vaxtı (PT)","زمن البروثرومبين الأولي (PT)","Baseline prothrombin time (PT)"),"s",5,120,T("INR değil, saniye cinsinden PT girin.","INR deyil, PT saniyə ilə daxil edin.","أدخل زمن PT بالثواني وليس INR.","Use PT in seconds, NOT INR.")),
    y("renalFailure",T("Başlangıçta böbrek yetmezliği","İlkin böyrək çatışmazlığı","قصور كلوي عند البداية","Renal insufficiency at baseline"))
  ],unit:"",decimals:3,
  warning:T("Sadece ağır alkol ilişkili hepatitte kortikosteroid tedavisinin 7. gününde doğrulanmıştır. Böbrek yetmezliği: kreatinin >1,3 mg/dL veya CrCl <40 mL/dk. 0/7. gün bilirubin mg/dL, albümin g/dL, PT saniye olarak girilir. Tedavi kararı tek başına skora dayanmaz.","Yalnız ağır alkoqol hepatitində steroidin 7-ci günü üçün təsdiqlənib. Böyrək çatışmazlığı: kreatinin >1,3 mg/dL və ya CrCl <40 mL/dəq. Vahidləri yoxlayın.","مُثبت في اليوم السابع من علاج التهاب الكبد الكحولي الشديد بالستيرويد. القصور الكلوي: الكرياتينين >1.3 mg/dL أو تصفية <40 mL/min. تحقق من الوحدات.","Validated at day 7 of corticosteroids for severe alcohol-associated hepatitis. Renal insufficiency: creatinine >1.3 mg/dL or CrCl <40 mL/min. Check units. Never make treatment decisions from the score alone."),
  formula:"R = 3.19−0.101×age+0.147×albumin(g/L)+0.0165×(bilirubin₀−bilirubin₇)(µmol/L)−0.206×renalFailure−0.0065×bilirubin₀(µmol/L)−0.0096×PT(s); Lille=1/(1+exp(R)).",
  source:"Louvet et al., Hepatology 2007",sourceUrl:"https://pubmed.ncbi.nlm.nih.gov/17518367/"
});
})(typeof globalThis!=="undefined"?globalThis:this);
