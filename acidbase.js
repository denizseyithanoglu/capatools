(function(){
"use strict";
const $=id=>document.getElementById(id);
const T=(tr,az,ar,en)=>({tr,az,ar,en});
const L={
back:T("← Tüm hesaplayıcılar","← Bütün kalkulyatorlar","→ جميع الحاسبات","← All calculators"),
eyebrow:T("NEFROLOJİ","NEFROLOGİYA","أمراض الكلى","NEPHROLOGY"),
title:T("Asit-Baz Bozuklukları","Turşu-qələvi pozğunluqları","اضطرابات الحمض والقاعدة","Acid–Base Disorders"),
intro:T("Kan gazı, kompansasyon, anyon açıklığı ve karma bozuklukları adım adım değerlendirin.","Qan qazı, kompensasiya, anion boşluğu və qarışıq pozğunluqları qiymətləndirin.","تحليل غازات الدم والتعويض والفجوة الأيونية والاضطرابات المختلطة.","Assess blood gases, compensation, anion gap and mixed disorders."),
agNormalLabel:T("Anyon açıklığı","Anion boşluğu","الفجوة الأيونية","Anion gap"),
inputsEyebrow:T("LABORATUVAR","LABORATORİYA","المختبر","LAB RESULTS"),
inputsHeading:T("Değerleri girin","Göstəriciləri daxil edin","أدخل القيم","Enter values"),
abgSub:T("Arter kan gazı (zorunlu)","Arterial qan qazı (vacib)","غازات الدم الشرياني (مطلوب)","Arterial blood gas (required)"),
chemSub:T("Serum elektrolitleri (isteğe bağlı)","Serum elektrolitləri (ixtiyari)","شوارد المصل (اختياري)","Serum electrolytes (optional)"),
chemHelp:T("Anyon açıklığı için Na ve Cl birlikte girilmeli. Mümkünse eş zamanlı serum biyokimya HCO₃ değerini kullanın.","Anion boşluğu üçün Na və Cl birgə daxil edilməlidir. Eyni vaxtda serum biokimyası HCO₃ tövsiyə olunur.","يجب إدخال Na وCl معًا. يُفضّل استخدام بيكربونات كيمياء الدم المتزامنة.","Enter Na and Cl together. Prefer contemporaneous serum chemistry bicarbonate for gap assessment."),
albuminLabel:T("Albümin","Albumin","الألبومين","Albumin"),
clear:T("Temizle","Təmizlə","مسح","Clear"),
run:T("Değerlendir →","Qiymətləndir →","تحليل ←","Analyze →"),
placeholderTitle:T("Sonuçlar burada görünecek","Nəticələr burada görünəcək","ستظهر النتائج هنا","Results will appear here"),
placeholderText:T("Kan gazı değerlerini girerek değerlendirmeye başlayın.","Qan qazı göstəricilərini daxil edin.","أدخل قيم غازات الدم لبدء التقييم.","Enter blood gas values to start the assessment."),
resultEyebrow:T("ANALİZ","TƏHLİL","التحليل","ANALYSIS"),
resultsTitle:T("Değerlendirme","Qiymətləndirmə","التقييم","Assessment"),
phResultLabel:T("pH durumu","pH vəziyyəti","حالة pH","pH status"),
compHeading:T("Beklenen kompansasyon","Gözlənilən kompensasiya","التعويض المتوقع","Expected compensation"),
agHeading:T("Anyon açıklığı ve delta oranı","Anion boşluğu və delta nisbəti","الفجوة الأيونية ونسبة دلتا","Anion gap and delta ratio"),
cautionsHeading:T("Yorum ve uyarılar","Şərh və xəbərdarlıqlar","التفسير والتنبيهات","Interpretation and cautions"),
guideEyebrow:T("HIZLI BAŞVURU","QISA BƏLƏDÇİ","مرجع سريع","QUICK REFERENCE"),
guideHeading:T("Dört aşamalı yaklaşım","Dörd mərhələli yanaşma","النهج المكون من أربع خطوات","Four-step approach"),
formulaSummary:T("Kompansasyon formülleri ve notlar","Kompensasiya düsturları və qeydlər","معادلات التعويض وملاحظات","Compensation formulas and notes"),
causesSummary:T("Yüksek anyon açıklığı nedenleri","Yüksək anion boşluğunun səbəbləri","أسباب ارتفاع الفجوة الأيونية","Causes of high anion gap"),
deltaSummary:T("Delta oranı nasıl yorumlanır?","Delta nisbəti necə şərh olunur?","كيف نفسر نسبة دلتا؟","Interpreting the delta ratio"),
disorderHeading:T("Bozukluk","Pozğunluq","الاضطراب","Disorder"),
formulaHeading:T("Beklenen yanıt","Gözlənilən cavab","التعويض المتوقع","Expected response"),
formulaNote:T("Respiratuvar bozukluklarda akut ve kronik süre ayrımı önemlidir (renal kompansasyon yaklaşık 3–5 günde tamamlanır). Formüller yaklaşık değerlerdir.","Respirator pozğunluqlarda kəskin və xroniki müddət vacibdir (böyrək kompensasiyası təxminən 3–5 gün çəkir). Düsturlar təxminidir.","يهم التفريق بين الحاد والمزمن في اضطرابات التنفس (يكتمل تعويض الكلى خلال نحو 3–5 أيام). المعادلات تقريبية.","Distinguish acute from chronic respiratory disorders (renal compensation typically completes in 3–5 days). Formulas are approximate."),
causesContent:T("Laktat artışı, ketoasidoz, ileri böbrek yetmezliği, toksik alkoller, salisilatlar ve 5-oksoprolin (örn. kronik parasetamol kullanımı) başlıca nedenlerdir. D-laktik asidoz daha nadirdir. Nedenleri öykü, muayene ve testlerle doğrulayın.","Laktat yüksəlməsi, ketoasidoz, ağır böyrək çatışmazlığı, toksik spirtlər, salisilatlar və 5-oksoprolin (məs. uzunmüddətli parasetamol) əsas səbəblərdir. D-laktik asidoz daha nadirdir.","تشمل الأسباب ارتفاع اللاكتات والحماض الكيتوني والفشل الكلوي الشديد والكحولات السامة والساليسيلات و5-أوكسوبرولين. والحماض بـ D-lactate أقل شيوعًا. تأكد من السبب سريريًا.","Causes include lactic acidosis, ketoacidosis, advanced kidney failure, toxic alcohols, salicylates and 5-oxoproline (e.g., chronic acetaminophen exposure). D-lactic acidosis is less common. Confirm causes clinically."),
deltaContent:T("Delta oranı = (AG−12)/(24−HCO₃). <1: eşlik eden normal AG asidozu olasıdır; 1–2: yüksek AG asidozu ile uyumludur; >2: eşlik eden metabolik alkaloz veya önceden yüksek bikarbonat düşünülebilir. Tek başına tanı koymaz.","Delta nisbəti = (AG−12)/(24−HCO₃). <1: yanaşı normal AG asidozu; 1–2: yüksək AG asidozu; >2: yanaşı metabolik alkaloz və ya əvvəldən yüksək bikarbonat mümkündür. Diaqnostik deyil.","نسبة دلتا = (AG−12)/(24−HCO₃). أقل من 1: قد يوجد حماض بفجوة طبيعية؛ 1–2: يتماشى مع حماض فجوة مرتفعة؛ أكثر من 2: قد توجد قلاء استقلابي أو بيكربونات مرتفعة مسبقًا. ليست تشخيصية وحدها.","Delta = (AG−12)/(24−HCO₃). <1 may suggest additional normal-gap acidosis; 1–2 is compatible with high-gap acidosis; >2 may suggest concomitant metabolic alkalosis or pre-existing elevated bicarbonate. Not diagnostic alone."),
safetyHeading:T("Klinik kullanım uyarısı","Klinik istifadə xəbərdarlığı","تنبيه سريري","Clinical use notice"),
safetyContent:T("Eğitim ve karar desteği amaçlı ilk sürüm. Bağımsız klinik doğrulama yapılmadan hasta yönetiminde kullanılmamalıdır. Kompansasyon değerleri yaklaşık olup klinik süre, cihaz, ölçüm birimleri ve eş zamanlı örnekler dikkate alınmalıdır. Hasta kimliği girmeyin.","Təlim və qərar dəstəyi üçün ilkin versiya. Müstəqil yoxlama olmadan xəstə idarəsində istifadə edilməməlidir. Nəticələr təxminidir. Xəstə kimliyini daxil etməyin.","نسخة أولية للتعليم ودعم القرار؛ لا تستخدم لإدارة المرضى قبل التحقق السريري المستقل. القيم تقريبية وتعتمد على الظروف والوحدات وتزامن العينات. لا تدخل معلومات هوية المرضى.","Educational beta; not for patient management before independent clinical validation. Compensation estimates depend on clinical timing, sample timing and units. Do not enter patient identifiers."),
sourcesHeading:T("Kaynaklar","Mənbələr","المراجع","References"),
required:T("pH, PaCO₂ ve HCO₃ değerlerini geçerli aralıklarda girin.","pH, PaCO₂ və HCO₃ üçün düzgün qiymətlər daxil edin.","أدخل قيمًا صحيحة لكل من pH وPaCO₂ وHCO₃.","Enter valid pH, PaCO₂ and HCO₃ values."),
paired:T("Na ve Cl birlikte girilmelidir.","Na və Cl birgə daxil edilməlidir.","يجب إدخال Na وCl معًا.","Na and Cl must be provided together."),
albuminNeeds:T("Albümin düzeltmesi için Na ve Cl gerekir.","Albumin korreksiyası üçün Na və Cl lazımdır.","يتطلب تصحيح الألبومين إدخال Na وCl.","Albumin correction requires Na and Cl."),
error:T("Değerleri ve birimleri kontrol edin.","Göstəriciləri və vahidləri yoxlayın.","تحقق من القيم والوحدات.","Check the values and units."),
noComp:T("Bu patern için tek bir kompansasyon formülü güvenilir biçimde uygulanamaz.","Bu patern üçün tək kompensasiya düsturu etibarlı deyil.","لا يمكن تطبيق معادلة تعويض واحدة على هذا النمط بثقة.","No single compensation equation can be reliably applied to this pattern."),
noAG:T("Na ve Cl girildiğinde hesaplanır.","Na və Cl daxil edildikdə hesablanır.","يُحسب عند إدخال Na وCl.","Calculated when Na and Cl are entered."),
actual:T("Ölçülen","Ölçülən","المقاس","Measured"),
expected:T("Beklenen","Gözlənilən","المتوقع","Expected"),
raw:T("Anyon açıklığı","Anion boşluğu","الفجوة الأيونية","Anion gap"),
corrected:T("Albümin düzeltilmiş AG","Albuminlə düzəldilmiş AG","الفجوة المصححة للألبومين","Albumin-adjusted AG"),
delta:T("Delta oranı","Delta nisbəti","نسبة دلتا","Delta ratio"),
normalAG:T("Yaklaşık normal aralık","Təxmini normal aralıq","ضمن المجال التقريبي","Approximate reference range"),
highAG:T("Yüksek anyon açıklığı","Yüksək anion boşluğu","فجوة أيونية مرتفعة","Elevated anion gap"),
lowAG:T("Düşük anyon açıklığı","Aşağı anion boşluğu","فجوة أيونية منخفضة","Low anion gap"),
deltaUnderOne:T("<1: ek normal AG asidozu veya asit anyonu kaybı olasılığı.","<1: əlavə normal AG asidozu və ya turşu anionu itkisi mümkündür.","<1: قد يوجد حماض بفجوة طبيعية أو فقد أنيونات حمضية.","<1: additional normal-gap acidosis or urinary acid-anion loss is possible."),
deltaOneToTwo:T("1–2: yüksek AG metabolik asidozuyla uyumlu; karma bozukluğu dışlamaz.","1–2: yüksək AG metabolik asidozuna uyğundur; qarışıq pozğunluğu istisna etmir.","1–2: متوافق مع حماض بفجوة مرتفعة ولا ينفي اضطرابًا مختلطًا.","1–2: compatible with high-gap acidosis; does not exclude mixed disorders."),
deltaAboveTwo:T(">2: metabolik alkaloz veya başlangıçta yüksek HCO₃ olasılığı."," >2: metabolik alkaloz və ya başlanğıcda yüksək HCO₃ mümkündür.","أكثر من 2: قد يوجد قلاء استقلابي أو بيكربونات مرتفعة مسبقًا.",">2: possible metabolic alkalosis or elevated baseline bicarbonate."),
inExpected:T("Beklenen aralıkta","Gözlənilən aralıqda","ضمن المجال المتوقع","Within expected range"),
belowExpected:T("Beklenenden düşük; karma bozukluk açısından değerlendirin.","Gözləniləndən aşağı; qarışıq pozğunluğu qiymətləndirin.","أقل من المتوقع؛ قيّم احتمال اضطراب مختلط.","Below expected; assess for mixed disorder."),
aboveExpected:T("Beklenenden yüksek; karma bozukluk açısından değerlendirin.","Gözləniləndən yüksək; qarışıq pozğunluğu qiymətləndirin.","أعلى من المتوقع؛ قيّم احتمال اضطراب مختلط.","Above expected; assess for mixed disorder."),
phStatus:T("pH değerlendirmesi","pH qiymətləndirməsi","تقييم pH","pH assessment")
};
const states={
acidemia:T("Asidemi","Asidemiya","حماض الدم","Acidemia"),
alkalemia:T("Alkalemi","Alkalemiya","قلوية الدم","Alkalemia"),
normalPH:T("Normal pH aralığı","Normal pH aralığı","pH ضمن المجال الطبيعي","pH within reference range"),
metabolicAcidosis:T("Metabolik asidoz baskın","Metabolik asidoz üstünlük təşkil edir","حماض استقلابي غالب","Metabolic acidosis predominates"),
metabolicAlkalosis:T("Metabolik alkaloz baskın","Metabolik alkaloz üstünlük təşkil edir","قلاء استقلابي غالب","Metabolic alkalosis predominates"),
respiratoryAcidosis:T("Respiratuvar asidoz baskın","Respirator asidoz üstünlük təşkil edir","حماض تنفسي غالب","Respiratory acidosis predominates"),
respiratoryAlkalosis:T("Respiratuvar alkaloz baskın","Respirator alkaloz üstünlük təşkil edir","قلاء تنفسي غالب","Respiratory alkalosis predominates"),
mixedAcidosis:T("Karma metabolik + respiratuvar asidoz paterni","Qarışıq metabolik + respirator asidoz","نمط حماض استقلابي وتنـفسي مختلط","Mixed metabolic + respiratory acidosis pattern"),
mixedAlkalosis:T("Karma metabolik + respiratuvar alkaloz paterni","Qarışıq metabolik + respirator alkaloz","نمط قلاء استقلابي وتنفسي مختلط","Mixed metabolic + respiratory alkalosis pattern"),
normalPattern:T("Belirgin bozukluk saptanmadı","Aydın pozğunluq aşkarlanmadı","لم يُكشف اضطراب واضح","No evident disorder"),
normalPHAbnormalValues:T("Normal pH, anormal PaCO₂/HCO₃: karma veya kronik kompanse patern olabilir","Normal pH, anormal PaCO₂/HCO₃: qarışıq və ya kompensasiya olunmuş ola bilər","pH طبيعي مع قيم غير طبيعية: قد يكون اضطرابًا مختلطًا أو معوضًا","Normal pH with abnormal gases: mixed or chronically compensated pattern possible"),
undetermined:T("Atipik patern; yeniden değerlendirin","Qeyri-tipik patern; yenidən qiymətləndirin","نمط غير نمطي؛ أعد التقييم","Atypical pattern; reassess")
};
const warnings={
hhMismatch:T("Ölçülen pH, Henderson–Hasselbalch eşitliğiyle beklenenden belirgin farklı. Aynı örnekten ölçüm/birimleri kontrol edin.","Ölçülmüş pH Henderson–Hasselbalch hesabından fərqlidir. Nümunə və vahidləri yoxlayın.","هناك اختلاف ملحوظ بين pH المقاس والمحسوب. تحقق من العينة والوحدات.","Measured pH differs materially from Henderson–Hasselbalch estimate; verify sample and units."),
atypicalPattern:T("pH ve gaz değerleri klasik tek bozukluğa uymuyor; klinik yeniden değerlendirme gerekir.","pH və qazlar klassik sadə pozğunluğa uyğun deyil; yenidən qiymətləndirin.","القيم لا تتوافق مع اضطراب بسيط نمطي؛ يلزم التقييم.","Values do not follow a classic single-disorder pattern; reassess clinically."),
normalPhCaution:T("Normal pH karma bozukluğu dışlamaz; kronik kompansasyon öyküsünü değerlendirin.","Normal pH qarışıq pozğunluğu istisna etmir; xroniki kompensasiyanı qiymətləndirin.","pH الطبيعي لا ينفي اضطرابًا مختلطًا؛ راجع التعويض المزمن.","Normal pH does not exclude mixed disorder; review chronic compensation."),
extremePH:T("Ciddi pH sapması; hasta klinik olarak acilen değerlendirilmelidir.","Ciddi pH dəyişməsi; təcili klinik qiymətləndirin.","انحراف شديد في pH؛ يلزم تقييم سريري عاجل.","Severe pH deviation; urgent clinical assessment is required."),
possibleRespAcid:T("Beklenenden yüksek PaCO₂: ek respiratuvar asidoz düşünülebilir.","Gözləniləndən yüksək PaCO₂: əlavə respirator asidoz mümkündür.","PaCO₂ أعلى من المتوقع: احتمال حماض تنفسي إضافي.","PaCO₂ above expected: possible additional respiratory acidosis."),
possibleRespAlk:T("Beklenenden düşük PaCO₂: ek respiratuvar alkaloz düşünülebilir.","Gözləniləndən aşağı PaCO₂: əlavə respirator alkaloz mümkündür.","PaCO₂ أقل من المتوقع: احتمال قلاء تنفسي إضافي.","PaCO₂ below expected: possible additional respiratory alkalosis."),
timingMatters:T("Respiratuvar kompansasyonda akut ve kronik tahminler ayrıdır; başlangıç süresi ve hastanın bazal HCO₃ değeri önemlidir.","Respirator kompensasiyanın kəskin və xroniki təxminləri fərqlidir; müddət və bazal HCO₃ vacibdir.","تختلف التقديرات بين الحاد والمزمن؛ مدة الاضطراب والبيكربونات الأساسية مهمتان.","Acute and chronic respiratory compensation differ; timing and baseline bicarbonate are critical."),
checkAlbumin:T("Albümin girilmedi: düşük albümin yüksek AG'yi maskeleyebilir.","Albumin daxil edilməyib: aşağı albumin yüksək AG-ni gizlədə bilər.","لم يُدخل الألبومين؛ انخفاضه قد يخفي ارتفاع الفجوة الأيونية.","No albumin entered: hypoalbuminemia may mask a high gap."),
agLabRange:T("Anyon açıklığının referansı laboratuvara göre değişir; mümkünse hastanın bazal değerine bakın.","Anion boşluğu aralığı laboratoriyadan asılıdır; bazal dəyəri yoxlayın.","يختلف المجال المرجعي للفجوة حسب المختبر؛ راجع القيمة الأساسية إن توفرت.","AG reference ranges vary by laboratory; compare baseline values where available.")
};
const formulaLabel={
winter:T("Winter formülü (metabolik asidoz)","Winter düsturu (metabolik asidoz)","معادلة وينتر (الحماض الاستقلابي)","Winter equation (metabolic acidosis)"),
severeLimit:T("Ağır metabolik asidozda alt fizyolojik sınır","Ağır metabolik asidozda fizioloji aşağı hədd","الحد الفسيولوجي في الحماض الاستقلابي الشديد","Severe metabolic acidosis physiologic limit"),
metAlk:T("Metabolik alkaloz kompansasyonu","Metabolik alkaloz kompensasiyası","تعويض القلاء الاستقلابي","Metabolic alkalosis compensation"),
respAcidAcute:T("Akut respiratuvar asidoz","Kəskin respirator asidoz","حماض تنفسي حاد","Acute respiratory acidosis"),
respAcidChronic:T("Kronik respiratuvar asidoz","Xroniki respirator asidoz","حماض تنفسي مزمن","Chronic respiratory acidosis"),
respAlkAcute:T("Akut respiratuvar alkaloz","Kəskin respirator alkaloz","قلاء تنفسي حاد","Acute respiratory alkalosis"),
respAlkChronic:T("Kronik respiratuvar alkaloz","Xroniki respirator alkaloz","قلاء تنفسي مزمن","Chronic respiratory alkalosis")
};
const steps=[
T(["1. Primer bozukluk","pH ve PaCO₂/HCO₃ yönünü birlikte değerlendir."],["1. İlkin pozğunluq","pH və PaCO₂/HCO₃ istiqamətini müqayisə edin."],["1. الاضطراب الأساسي","قارن pH مع PaCO₂ وHCO₃."],["1. Primary process","Compare pH with the direction of PaCO₂/HCO₃."]),
T(["2. Kompansasyon","Ölçülen değeri beklenen yanıtla karşılaştır."],["2. Kompensasiya","Ölçülmüş dəyəri gözlənilənlə müqayisə edin."],["2. التعويض","قارن القياس بالقيمة المتوقعة."],["2. Compensation","Compare measured and expected values."]),
T(["3. Anyon açıklığı","Na−(Cl+HCO₃); gerekirse albümin ve delta."],["3. Anion boşluğu","Na−(Cl+HCO₃); albumin və delta."],["3. الفجوة الأيونية","Na−(Cl+HCO₃)، ثم الألبومين ودلتا."],["3. Anion gap","Na−(Cl+HCO₃); adjust for albumin and assess delta."]),
T(["4. Klinik neden","Laktat, keton, böbrek ve toksik nedenleri araştır."],["4. Klinik səbəb","Laktat, keton, böyrək və toksinlər."],["4. السبب السريري","افحص اللاكتات والكيتونات والكلى والسموم."],["4. Clinical cause","Check lactate, ketones, kidney function and toxins."])
];
const tableRows=[
[formulaLabel.winter,"PaCO₂ = 1.5 × HCO₃ + 8 ± 2 mmHg"],
[formulaLabel.severeLimit,"HCO₃ ≤ 5 → PaCO₂ ≈ 8–12 mmHg"],
[formulaLabel.metAlk,"PaCO₂ ≈ HCO₃ + 10 mmHg"],
[formulaLabel.respAcidAcute,"HCO₃ ↑ 1 mEq/L per +10 mmHg PaCO₂"],
[formulaLabel.respAcidChronic,"HCO₃ ↑ 3.5–4 mEq/L per +10 mmHg PaCO₂"],
[formulaLabel.respAlkAcute,"HCO₃ ↓ 2 mEq/L per −10 mmHg PaCO₂"],
[formulaLabel.respAlkChronic,"HCO₃ ↓ 4–5 mEq/L per −10 mmHg PaCO₂"]
];
let lang="tr",theme="light",last=null;
function lookup(x){if(typeof x==="string")return x;return (x&&x[lang])||"";}
function localGet(k,v){try{return localStorage.getItem(k)||v;}catch(e){return v;}}
function localSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function num(x){return new Intl.NumberFormat(({tr:"tr-TR",az:"az-AZ",ar:"ar-EG-u-nu-latn",en:"en-US"})[lang],{maximumFractionDigits:1,minimumFractionDigits:0}).format(x);}
function setText(id,v){$(id).textContent=lookup(v);}
function renderStatic(){
 document.documentElement.lang=lang;
 document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 document.documentElement.dataset.theme=theme;
 $("lang").value=lang;
 $("theme").textContent=theme==="dark"?"☀":"☾";
 Object.keys(L).forEach(k=>{if($(k))setText(k,L[k]);});
 setText("footerBack",L.back);
 document.title=lookup(L.title)+" · ÇAPATools";
 const grid=$("guideSteps");grid.replaceChildren();
 steps.forEach(step=>{const tile=document.createElement("div");tile.className="ab-guide-step";const title=document.createElement("b");title.textContent=lookup(step)[0];const p=document.createElement("p");p.textContent=lookup(step)[1];tile.append(title,p);grid.append(tile);});
 const rows=$("formulaRows");rows.replaceChildren();
 tableRows.forEach(row=>{const tr=document.createElement("tr");const a=document.createElement("td"),b=document.createElement("td");a.textContent=lookup(row[0]);b.textContent=row[1];tr.append(a,b);rows.append(tr);});
}
function metric(name,value){const row=document.createElement("div");row.className="ab-metric-line";const label=document.createElement("span");label.textContent=lookup(name);const val=document.createElement("strong");val.textContent=value;row.append(label,val);return row;}
function textParagraph(target,txt){const p=document.createElement("p");p.textContent=lookup(txt);target.append(p);}
function renderResult(res){
 $("placeholder").hidden=true;$("results").hidden=false;
 $("phResult").textContent=lookup(states[res.phStatus]);
 $("primaryResult").textContent=lookup(states[res.primary]);
 const comp=$("compContent");comp.replaceChildren();
 if(!res.compensations.length)textParagraph(comp,L.noComp);
 res.compensations.forEach(c=>{
  const box=document.createElement("div");box.className="ab-comparison";
  const title=document.createElement("strong");title.textContent=lookup(formulaLabel[c.method]);
  const p=document.createElement("p");
  const expected=document.createElement("span");expected.className="ab-value";expected.textContent=num(c.low)+"–"+num(c.high)+" "+(c.metric==="pco2"?"mmHg":"mEq/L");
  const actual=document.createElement("span");actual.className="ab-value";actual.textContent=num(c.measured)+" "+(c.metric==="pco2"?"mmHg":"mEq/L");
  p.append(lookup(L.expected)+": ",expected," · "+lookup(L.actual)+": ",actual);
  const note=document.createElement("p");note.textContent=lookup(L[c.compare]);
  box.append(title,p,note);comp.append(box);
 });
 const ag=$("agContent");ag.replaceChildren();
 if(!res.ag) textParagraph(ag,L.noAG);
 else{
  ag.append(metric(L.raw,num(res.ag.raw)+" mEq/L"));
  if(res.ag.corrected!==null)ag.append(metric(L.corrected,num(res.ag.corrected)+" mEq/L"));
  textParagraph(ag,L[res.ag.category]);
  if(res.ag.delta!==null){ag.append(metric(L.delta,num(res.ag.delta)));textParagraph(ag,L[res.ag.deltaStatus]);}
 }
 const list=$("warnings");list.replaceChildren();
 res.warnings.forEach(k=>{if(!warnings[k])return;const li=document.createElement("li");li.textContent=lookup(warnings[k]);list.append(li);});
 $("warningsBlock").hidden=!list.children.length;
}
function readNum(id,optional){
 const el=$(id);const str=el.value.trim();
 if(optional&&str==="")return null;
 if(str===""||!el.validity.valid)return NaN;
 const n=Number(str);return Number.isFinite(n)?n:NaN;
}
function calculate(event){
 if(event)event.preventDefault();
 const vals={ph:readNum("ph"),pco2:readNum("pco2"),hco3:readNum("hco3"),na:readNum("na",true),cl:readNum("cl",true),albumin:readNum("albumin",true)};
 const error=$("formError");
 if(["ph","pco2","hco3"].some(k=>!Number.isFinite(vals[k]))){error.textContent=lookup(L.required);return;}
 if(Number.isNaN(vals.na)||Number.isNaN(vals.cl)||Number.isNaN(vals.albumin)){error.textContent=lookup(L.error);return;}
 if((vals.na===null)!==(vals.cl===null)){error.textContent=lookup(L.paired);return;}
 if(vals.albumin!==null&&vals.na===null){error.textContent=lookup(L.albuminNeeds);return;}
 try{last=window.CAPAAcidBase.classify(vals);error.textContent="";renderResult(last);}
 catch(e){error.textContent=lookup(L.error);}
}
function init(){
 lang=localGet("capa-lang","tr");if(!["tr","az","ar","en"].includes(lang))lang="tr";
 theme=localGet("capa-theme","light")==="dark"?"dark":"light";
 renderStatic();
 $("lang").addEventListener("change",e=>{lang=e.target.value;localSet("capa-lang",lang);renderStatic();if(last)renderResult(last);});
 $("theme").addEventListener("click",()=>{theme=theme==="dark"?"light":"dark";localSet("capa-theme",theme);renderStatic();});
 $("acidForm").addEventListener("submit",calculate);
 $("acidForm").addEventListener("input",()=>{$("formError").textContent="";if(last){$("results").hidden=true;$("placeholder").hidden=false;last=null;}});
 $("clear").addEventListener("click",()=>{$("acidForm").reset();$("results").hidden=true;$("placeholder").hidden=false;$("formError").textContent="";last=null;$("ph").focus();});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();