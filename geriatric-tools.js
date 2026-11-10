/* Short clinical score-entry UI. Do not reproduce licensed instruments here.
 * GDS short item themes are paraphrased; require a validated language form.
 * MNA-SF is a point entry helper requiring the officially licensed form. */
(function(root){
"use strict";
var D=root.CAPAData;if(!D||!Array.isArray(D.tools))return;
var T=function(tr,az,ar,en){return {tr:tr,az:az,ar:ar,en:en};};
var select=function(key,label,items,help){
 return {key:key,label:label,kind:"select",numeric:!items.some(function(i){return typeof i[0]==="string";}),options:items.map(function(i){return {value:String(i[0]),label:i[1]};}),help:help||null};
};
var yesno=function(key,label){return {key:key,label:label,kind:"binary"};};
function score(id,icon,title,summary,fields,max,warning,formula,source,sourceUrl){
 return {id:id,group:"geriatrics",icon:icon,title:title,summary:summary,fields:fields,
  unit:" / "+max,decimals:0,singleColumn:true,warning:warning,formula:formula,source:source,sourceUrl:sourceUrl};
}
Object.assign(D.UI,{
 sarcPositive:T("≥4: sarkopeni açısından değerlendirme önerilir.","≥4: sarkopeniya üçün əlavə qiymətləndirmə məsləhətdir.","≥4: يُوصى بتقييم إضافي لاحتمال الساركوبينيا.","≥4: additional sarcopenia evaluation recommended."),
 sarcNegative:T("<4: tarama negatif; sarkopeni dışlanmaz.","<4: skrininq mənfi; sarkopeniya istisna olunmur.","<4: الفحص سلبي ولا يستبعد الساركوبينيا.","<4: negative screen; does not exclude sarcopenia."),
 mnaNormal:T("12–14: normal nütrisyonel durum.","12–14: normal qidalanma vəziyyəti.","12–14: وضع تغذوي طبيعي.","12–14: normal nutritional status."),
 mnaRisk:T("8–11: malnütrisyon riski; beslenme değerlendirmesi önerilir.","8–11: malnutrisiya riski; qiymətləndirmə tövsiyə olunur.","8–11: خطر سوء التغذية؛ يُنصح بتقييم غذائي.","8–11: at risk of malnutrition; nutritional assessment recommended."),
 mnaMalnourished:T("0–7: malnütrisyonla uyumlu tarama; klinik değerlendirme gerekir.","0–7: malnutrisiyaya uyğun skrininq; klinik qiymətləndirmə lazımdır.","0–7: فحص يشير إلى سوء التغذية؛ يلزم تقييم سريري.","0–7: screen indicates malnutrition; clinical evaluation needed."),
 gdsNegative:T("0–4: GDS-15 taraması negatif; belirtiler varsa yine değerlendirin.","0–4: GDS-15 skrininqi mənfi; simptomlar varsa qiymətləndirin.","0–4: الفحص سلبي؛ قيّم الأعراض عند وجود شك.","0–4: negative GDS-15 screen; assess if symptoms persist."),
 gdsPositive:T("5–8: depresif belirtiler açısından pozitif tarama; klinik görüşme gerekir.","5–8: depressiv simptomlar üçün müsbət skrininq; müayinə lazımdır.","5–8: فحص إيجابي لأعراض اكتئابية؛ يلزم التقييم.","5–8: positive screen for depressive symptoms; clinical assessment indicated."),
 gdsHigh:T("9–15: yüksek depresif belirti yükü; kapsamlı değerlendirme gerekir.","9–15: yüksək depressiv simptom yükü; ətraflı qiymətləndirin.","9–15: أعراض اكتئابية عديدة؛ يلزم تقييم شامل.","9–15: substantial depressive symptom burden; comprehensive assessment indicated."),
 miniHigh:T("0–2: bilişsel bozukluk olasılığı artmış; ileri değerlendirme önerilir.","0–2: koqnitiv pozğunluq ehtimalı artıb; əlavə qiymətləndirmə.","0–2: احتمال أكبر لضعف إدراكي؛ يُوصى بالتقييم.","0–2: increased likelihood of cognitive impairment; assess further."),
 miniLow:T("3–5: daha düşük demans olasılığı; bilişsel bozukluğu dışlamaz.","3–5: daha aşağı demensiya ehtimalı; pozğunluğu istisna etmir.","3–5: احتمال أقل للخرف؛ لا يستبعد الضعف الإدراكي.","3–5: lower likelihood of dementia; does not exclude cognitive impairment.")
});
var degree=[
 [0,T("Yok","Yoxdur","لا شيء","None")],
 [1,T("Bir miktar","Bir qədər","بعض الصعوبة","Some")],
 [2,T("Çok güçlük veya yapamıyor","Çox çətin və ya mümkün deyil","صعوبة شديدة أو غير قادر","Severe / unable")]
];
var sarcf=score("sarcf","💪",T("SARC-F","SARC-F","SARC-F","SARC-F"),
 T("Kas gücü ve işlevine yönelik beş soruluk tarama.","Əzələ gücü və funksiyası üçün beş maddə.","فحص بخمس نقاط لقوة العضلات والوظيفة.","Five-item screen of muscle strength and function."),[
 select("sfStrength",T("Yaklaşık 4,5 kg kaldırma/taşıma güçlüğü","Təxminən 4,5 kq qaldırmaq/daşımaq çətinliyi","صعوبة حمل نحو 4.5 كغ","Difficulty lifting/carrying about 4.5 kg"),degree),
 select("sfWalking",T("Oda içinde yürüme güçlüğü","Otaq daxilində yerimə çətinliyi","صعوبة المشي عبر غرفة","Difficulty walking across a room"),degree),
 select("sfChair",T("Sandalyeden veya yataktan kalkma güçlüğü","Stuldan/yataqdan qalxmaq çətinliyi","صعوبة النهوض من سرير أو كرسي","Difficulty rising from a bed or chair"),degree),
 select("sfStairs",T("10 basamak merdiven çıkma güçlüğü","10 pilləkən qalxmaq çətinliyi","صعوبة صعود عشر درجات","Difficulty climbing 10 stairs"),degree),
 select("sfFalls",T("Son bir yıldaki düşme sayısı","Son 1 ildə yıxılma sayı","عدد مرات السقوط في آخر سنة","Number of falls in the past year"),[
 [0,T("0","0","0","0")],[1,T("1–3","1–3","1–3","1–3")],[2,T("≥4","≥4","≥4","≥4")]
 ])
 ],10,
 T("Tarama tanı değildir. Yürüme yardımcısı kullanımı 2 puan olabilir. Klinik uygulamada valide dil sürümünü ve ölçütlerin özgün açıklamalarını kontrol edin.","Skrininq diaqnoz deyil; təsdiqlənmiş dil versiyasını yoxlayın.","الفحص ليس تشخيصًا؛ استخدم نسخة لغوية مُتحققًا منها.","Screening is not diagnosis. Assistive walking devices may count as 2 points. Use a validated language form for clinical assessment."),
 "SARC-F: 5 domains, each 0–2; total 0–10; positive ≥4.",
 "SARC-F – NCBI Bookshelf","https://www.ncbi.nlm.nih.gov/books/NBK532533/table/obesity-in-elderly.T.sarcf_questionnaire/");
var p2=[
 [0,T("0 puan","0 bal","0 نقطة","0 points")],
 [1,T("1 puan","1 bal","1 نقطة","1 point")],
 [2,T("2 puan","2 bal","2 نقطة","2 points")]
];
var p3=p2.concat([[3,T("3 puan","3 bal","3 نقاط","3 points")]]);
var mna=score("mnasf","🥣",T("MNA-SF puanlayıcı","MNA-SF bal kalkulyatoru","حاسبة نقاط MNA-SF","MNA-SF score calculator"),
 T("Resmî MNA-SF formundaki altı madde puanını toplayın.","Rəsmi MNA-SF üzrə altı bölmənin balını toplayın.","اجمع نقاط العناصر الستة من النموذج الرسمي.","Sum six item scores from the official MNA-SF form."),[
 select("mnaA",T("A · Besin alımı puanı","A · Qida qəbulu balı","A · درجة تناول الطعام","A · Food intake points"),p2),
 select("mnaB",T("B · Kilo kaybı puanı","B · Çəki itkisi balı","B · درجة فقد الوزن","B · Weight loss points"),p3),
 select("mnaC",T("C · Mobilite puanı","C · Hərəkətlilik balı","C · درجة الحركة","C · Mobility points"),p2),
 select("mnaD",T("D · Akut hastalık/stres puanı","D · Kəskin xəstəlik/stress balı","D · درجة المرض الحاد/الضغط النفسي","D · Acute illness/stress points"),[
 [0,T("0 puan","0 bal","0","0 points")],[2,T("2 puan","2 bal","2","2 points")]
 ]),
 select("mnaE",T("E · Nöropsikolojik sorun puanı","E · Neyropsixoloji problem balı","E · درجة المشاكل العصبية النفسية","E · Neuropsychological points"),p2),
 select("mnaF",T("F · Antropometri puanı (VKİ veya baldır)","F · Antropometriya balı (BKİ və ya baldır)","F · نقاط القياس (BMI أو محيط الربلة)","F · Anthropometry points (BMI or calf)"),[
 ["bmi0",T("VKİ: 0 puan","BKİ: 0 bal","BMI: 0","BMI: 0")],
 ["bmi1",T("VKİ: 1 puan","BKİ: 1 bal","BMI: 1","BMI: 1")],
 ["bmi2",T("VKİ: 2 puan","BKİ: 2 bal","BMI: 2","BMI: 2")],
 ["bmi3",T("VKİ: 3 puan","BKİ: 3 bal","BMI: 3","BMI: 3")],
 ["cc0",T("Baldır çevresi: 0 puan","Baldır: 0 bal","محيط الربلة: 0","Calf circumference: 0")],
 ["cc3",T("Baldır çevresi: 3 puan","Baldır: 3 bal","محيط الربلة: 3","Calf circumference: 3")]
 ],T("VKİ mevcutsa VKİ seçeneğini kullanın; yalnızca VKİ yoksa baldır çevresi alternatiftir.","BKİ mövcuddursa onu istifadə edin; yalnız yoxdursa baldır çevrəsi seçin.","استخدم BMI عند توفره؛ محيط الربلة بديل فقط عند غيابه.","Use BMI when available; calf circumference is an alternative only if BMI unavailable."))
 ],14,
 T("MNA® telifli bir araçtır. Bu ekran soru formu değil, yalnızca resmî MNA-SF formundan puan girişi içindir. Kurumsal kullanımda lisans koşullarını kontrol edin; form olmadan maddeleri tahmin etmeyin.","MNA® müəllif hüquqlu vasitədir. Bu yalnız rəsmi formadan bal toplama köməkçisidir; müəssisə lisenziyasını yoxlayın.","MNA® أداة محمية بحقوق؛ هذا لجمع النقاط من النموذج الرسمي فقط. تحقق من شروط ترخيص المؤسسات.","MNA® is copyrighted. This is a scoring companion to the official form, not the questionnaire. Check organizational licensing terms before use."),
 "MNA-SF: A(0–2)+B(0–3)+C(0–2)+D(0/2)+E(0–2)+F(BMI:0–3 OR calf:0/3).",
 "Official MNA® Forms","https://www.mna-elderly.com/mna-forms");
var gdsPrompts=[
 T("Yaşamından genel olarak memnun mu?","Həyatından əsasən razıdır?","هل هو راضٍ عن حياته عمومًا؟","Generally satisfied with life?"),
 T("Etkinlik ve ilgilerinde belirgin azalma var mı?","Fəaliyyət və maraqları azalıbmı?","هل قلّت أنشطته واهتماماته؟","Dropped many activities or interests?"),
 T("Yaşamını boş buluyor mu?","Həyatını boş hiss edirmi?","هل يشعر بفراغ في حياته؟","Feel life is empty?"),
 T("Sık sık canı sıkılıyor mu?","Tez-tez darıxırmı?","هل يشعر بالملل كثيرًا؟","Frequently bored?"),
 T("Genellikle neşeli mi?","Adətən ruh yüksəkliyi varmı?","هل تكون معنوياته جيدة غالبًا؟","Usually in good spirits?"),
 T("Kötü bir şey olacağından korkuyor mu?","Pis hadisədən qorxurmu?","هل يخاف حدوث أمر سيئ؟","Afraid something bad will happen?"),
 T("Çoğu zaman mutlu mu?","Çox vaxt xoşbəxtdirmi?","هل يشعر بالسعادة معظم الوقت؟","Happy most of the time?"),
 T("Sık sık çaresiz hissediyor mu?","Tez-tez aciz hiss edirmi?","هل يشعر بالعجز كثيرًا؟","Frequently helpless?"),
 T("Dışarı çıkmak yerine evde kalmayı mı yeğliyor?","Çölə çıxmaq əvəzinə evdə qalmağı seçirmi?","هل يفضل البقاء بالمنزل؟","Prefer staying home to going out?"),
 T("Bellek sorunlarının yaşıtlarından fazla olduğunu düşünüyor mu?","Yaddaş problemi yaşıdlarından çoxdurmu?","هل يرى مشكلات ذاكرته أكبر من غيره؟","Feel memory problems exceed peers'?"),
 T("Yaşıyor olmaktan memnun mu?","Yaşamaqdan məmnundurmu?","هل يشعر أن الحياة جميلة الآن؟","Feel it is good to be alive?"),
 T("Kendini değersiz hissediyor mu?","Özünü dəyərsiz hiss edirmi?","هل يشعر بأنه بلا قيمة؟","Feel worthless?"),
 T("Kendisini enerjik hissediyor mu?","Özünü enerjili hiss edirmi?","هل يشعر بالنشاط؟","Feel energetic?"),
 T("Durumunu umutsuz buluyor mu?","Vəziyyətini ümidsiz sayırmı?","هل يشعر أن وضعه ميؤوس منه؟","Feel situation is hopeless?"),
 T("Başkalarının kendisinden daha iyi durumda olduğunu düşünüyor mu?","Başqalarının daha yaxşı vəziyyətdə olduğunu düşünürmü?","هل يرى الآخرين أفضل حالًا منه؟","Think others are better off?")
];
var gds=score("gds15","🧠",T("GDS-15 (Geriatrik Depresyon)","GDS-15 (Geriatrik depressiya)","GDS-15 (اكتئاب كبار السن)","GDS-15 Depression Screen"),
 T("Son bir haftaya ilişkin 15 evet/hayır yanıtını puanlar.","Son həftə üzrə 15 bəli/xeyr cavabını hesablayır.","يحسب 15 إجابة نعم/لا عن الأسبوع الماضي.","Scores 15 yes/no responses about the past week."),
 gdsPrompts.map(function(txt,i){return yesno("gds"+(i+1),T((i+1)+". "+txt.tr,(i+1)+". "+txt.az,(i+1)+". "+txt.ar,(i+1)+". "+txt.en));}),15,
 T("Tanı koydurmaz. Soru temaları kısaltılmıştır; hastaya uygularken valide GDS-15 sürümünü kullanın. Akut intihar riski ayrıca sorgulanmalıdır.","Diaqnostik deyil. Xəstəyə tətbiq üçün təsdiqlənmiş GDS-15 versiyası lazımdır.","ليس أداة تشخيص. استخدم نسخة لغوية مُتحققًا منها عند التطبيق. قيّم خطر الانتحار بشكل مستقل.","Not diagnostic. Item themes are abbreviated; use a validated GDS-15 translation for administration. Assess acute suicide risk separately."),
 "GDS-15: 1 point for a depressive response. Reverse-scored 'No': 1, 5, 7, 11, 13; total 0–15.",
 "Stanford GDS (public-domain form)","https://www.web.stanford.edu/~yesavage/Testing.htm");
var mini=score("minicog","🕒",T("Mini-Cog® puanlama","Mini-Cog® bal hesabı","حساب Mini-Cog®","Mini-Cog® scoring"),
 T("Üç sözcük hatırlama ve saat çizimi puanını toplayın.","3 sözün xatırlanması və saat rəsmini ballayın.","اجمع درجة تذكر ثلاث كلمات ورسم الساعة.","Score three-word recall and clock drawing."),
 [
 select("recall",T("İpucu olmadan hatırlanan sözcük sayısı","İpucusuz xatırlanan söz sayı","عدد الكلمات المتذكَّرة دون تلميح","Words recalled without cues"),[
 [0,T("0 sözcük","0 söz","0 كلمات","0 words")],[1,T("1 sözcük","1 söz","كلمة واحدة","1 word")],
 [2,T("2 sözcük","2 söz","كلمتان","2 words")],[3,T("3 sözcük","3 söz","3 كلمات","3 words")]
 ]),
 select("clock",T("Saat çizim değerlendirmesi","Saat rəsm qiymətləndirməsi","تقييم رسم الساعة","Clock drawing assessment"),[
 [0,T("Anormal / yapılamadı (0)","Anormal / edilmədi (0)","غير طبيعي / تعذر (0)","Abnormal or not completed (0)")],
 [2,T("Normal (2)","Normal (2)","طبيعي (2)","Normal (2)")]
 ])
 ],5,
 T("Mini-Cog® puanlama yardımcısıdır; sözcük sunumu ve saat çizimi resmî yönergelere göre yapılmalıdır. Klinik/akademik kullanım koşullarını kontrol edin; araştırma veya ticari kullanım için izin gerekebilir.","Mini-Cog® rəsmi göstərişlə tətbiq edilməlidir; istifadə şərtlərini yoxlayın.","يُطبَّق Mini-Cog® وفق تعليماته الرسمية. تحقق من شروط الترخيص خاصة للبحث أو الاستخدام التجاري.","Mini-Cog® score helper only; administer recall and clock test following official instructions. Check licensing, especially for research or commercial uses."),
 "Mini-Cog® = spontaneous 3-word recall (0–3) + clock drawing (0 or 2). Screen positive when <3.",
 "Mini-Cog® Official Scoring","https://mini-cog.com/scoring-the-mini-cog/");
D.tools.push(sarcf,mna,gds,mini);
})(typeof globalThis!=="undefined"?globalThis:this);
