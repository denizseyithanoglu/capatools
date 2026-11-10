/* Four-language performance status selection and scoring, with no automated mapping
   between ECOG and Karnofsky: they are related but not interchangeable. */
(function(root) {
"use strict";
var D=root.CAPAData;if(!D||!Array.isArray(D.tools))return;
var T=function(tr,az,ar,en){return {tr:tr,az:az,ar:ar,en:en};};
var ecog=[
[0,T("0 · Tam aktif; kısıtlılık yok","0 · Tam aktiv, məhdudiyyət yoxdur","0 · نشط بالكامل دون قيود","0 · Fully active without restriction")],
[1,T("1 · Ağır eforda kısıtlı; hafif iş yapabilir","1 · Ağır iş məhdud; yüngül iş görür","1 · نشاط بدني مجهد محدود؛ يستطيع العمل الخفيف","1 · Restricted strenuous activity; able to do light work")],
[2,T("2 · Öz bakım tam; çalışamaz, uyanıkken >%50 ayakta","2 · Özünə qulluq tam; işləmir, oyaq vaxtın >50%-i ayaqdadır","2 · قادر على رعاية نفسه؛ لا يعمل؛ متحرك لأكثر من نصف النهار","2 · Ambulatory, self-care intact; no work; up >50% of waking time")],
[3,T("3 · Öz bakım sınırlı; zamanın >%50'si yatak/koltukta","3 · Özünə qulluq məhdud; vaxtın >50%-i yataq/stulda","3 · رعاية ذاتية محدودة؛ في السرير/الكرسي أكثر من نصف النهار","3 · Limited self-care; in bed/chair >50% of waking time")],
[4,T("4 · Tam bağımlı; sürekli yatak/koltukta","4 · Tam asılı; daim yataq/stulda","4 · عاجز تمامًا؛ ملازم للفراش أو الكرسي","4 · Completely disabled; bed/chair bound")],
[5,T("5 · Vefat etmiş","5 · Vəfat etmiş","5 · متوفى","5 · Deceased")]
];
var kps=[
[100,T("100 · Normal; yakınma ya da hastalık belirtisi yok","100 · Normal; şikayət və əlamət yoxdur","100 · طبيعي دون شكوى أو دليل مرض","100 · Normal, no symptoms or evidence of disease")],
[90,T("90 · Normal aktivite; hafif bulgu/belirti","90 · Adi fəaliyyət; yüngül əlamət","90 · نشاط طبيعي مع أعراض طفيفة","90 · Normal activity with minor symptoms")],
[80,T("80 · Normal aktivite için çaba gerekli","80 · Adi fəaliyyət üçün səy tələb olunur","80 · نشاط طبيعي مع بذل جهد","80 · Normal activity with effort")],
[70,T("70 · Öz bakım yeterli; normal aktivite/çalışma yok","70 · Özünə qulluq; normal iş görə bilmir","70 · قادر على رعاية نفسه؛ غير قادر على العمل المعتاد","70 · Self-care possible; cannot work normally")],
[60,T("60 · Ara sıra yardım; çoğu ihtiyacını karşılayabilir","60 · Bəzən kömək; çox ehtiyacını özü görür","60 · يحتاج مساعدة أحيانًا؛ يلبي معظم احتياجاته","60 · Occasional help, most needs met independently")],
[50,T("50 · Önemli yardım ve sık tıbbi bakım","50 · Xeyli kömək və tez-tez tibbi baxım","50 · يحتاج مساعدة كبيرة ورعاية طبية متكررة","50 · Considerable assistance and frequent medical care")],
[40,T("40 · Belirgin engellilik; özel bakım/yardım gerekli","40 · Ciddi məhdudiyyət; xüsusi yardım lazımdır","40 · عجز مع حاجة لرعاية خاصة","40 · Disabled, special care and assistance needed")],
[30,T("30 · Ağır engellilik; hastane bakımı endikasyonu","30 · Ağır məhdudiyyət; xəstəxana qayğısı","30 · عجز شديد يستدعي الرعاية بالمستشفى","30 · Severely disabled; hospitalization indicated")],
[20,T("20 · Çok ağır hasta; aktif destek tedavisi","20 · Çox ağır xəstə; aktiv dəstək lazımdır","20 · مريض جدًا؛ يحتاج علاجًا داعمًا فعالًا","20 · Very ill; active supportive treatment needed")],
[10,T("10 · Ölüm öncesi ağır klinik durum","10 · Ölümə yaxın ağır vəziyyət","10 · حالة حرجة واحتضار","10 · Moribund")],
[0,T("0 · Vefat etmiş","0 · Vəfat etmiş","0 · متوفى","0 · Deceased")]
];
var group="hematology";
Object.assign(D.UI,{
 ecogGrade0:T("Tam aktif, günlük aktiviteler kısıtlanmamış.","Tam aktiv, gündəlik fəaliyyət məhdud deyil.","نشط بالكامل دون قيود على الأنشطة اليومية.","Fully active without functional limitation."),
 ecogGrade1:T("Ağır efor kısıtlı; hafif iş yapılabilir.","Ağır fiziki iş məhduddur; yüngül iş mümkündür.","الجهد الشديد محدود مع إمكان العمل الخفيف.","Strenuous exertion limited; light work possible."),
 ecogGrade2:T("Öz bakımını yapabilir ancak çalışamaz; uyanıkken çoğunlukla hareketlidir.","Özünə qulluq edir, işləmir; oyaq vaxtın çoxunda hərəkətlidir.","رعاية ذاتية مستقلة دون قدرة على العمل؛ متحرك معظم النهار.","Independent self-care; cannot work; ambulatory most waking hours."),
 ecogGrade3:T("Öz bakım sınırlı, uyanık zamanın çoğu yatak veya koltukta.","Özünə qulluq məhduddur; oyaq vaxtın çoxu yataq/stulda.","رعاية ذاتية محدودة ومعظم النهار في السرير أو الكرسي.","Limited self-care; in bed/chair most waking hours."),
 ecogGrade4:T("Tam bağımlı; öz bakım yapılamaz.","Tam asılıdır; özünə qulluq etmir.","عجز كامل عن الرعاية الذاتية.","Completely disabled; unable to perform self-care."),
 ecogGrade5:T("Vefat etmiş.","Vəfat etmiş.","متوفى.","Deceased.")
});
kps.forEach(function(item) {
  D.UI["kpsGrade"+item[0]]=item[1];
});
var ref="https://ecog-acrin.org/resources/ecog-performance-status/";
D.tools.push({
 id:"ecog",group:group,icon:"🧍",
 title:T("ECOG Performans Durumu","ECOG Performans Vəziyyəti","الحالة الوظيفية ECOG","ECOG Performance Status"),
 summary:T("Onkolojide işlev durumunu 0–5 arasında sınıflandırır.","Onkologiyada funksional vəziyyəti 0–5 ilə qiymətləndirir.","يصنف الحالة الوظيفية في الأورام من 0 إلى 5.","Classify functional status in oncology from 0 to 5."),
 fields:[{key:"performance",label:T("Mevcut performans düzeyi","Hazırkı funksional səviyyə","مستوى الأداء الحالي","Current performance level"),kind:"select",numeric:true,options:ecog.map(function(item){return {value:String(item[0]),label:item[1]};})}],
 unit:" / 5",decimals:0,
 warning:T("Klinik görüşme ve gözleme dayanır. ECOG skoru tedavi uygunluğunu tek başına belirlemez. Karnofsky ile birebir eşleştirilmemelidir.","Klinik müşahidə tələb edir. ECOG təkbaşına müalicə qərarı deyil; Karnofsky ilə tam eyni deyil.","يتطلب تقييمًا سريريًا ولا يكفي وحده لتحديد العلاج؛ ليس مطابقًا تمامًا لكارنوفسكي.","Requires clinical assessment and does not independently determine treatment eligibility; do not treat ECOG and Karnofsky as exact equivalents."),
 formula:"ECOG Performance Status: 0 (fully active) to 5 (deceased).",
 source:"ECOG-ACRIN — Performance Status",sourceUrl:ref
});
D.tools.push({
 id:"karnofsky",group:group,icon:"♿",
 title:T("Karnofsky Performans Skoru (KPS)","Karnofsky Performans Balı (KPS)","مقياس كارنوفسكي للأداء (KPS)","Karnofsky Performance Status (KPS)"),
 summary:T("Günlük aktivite ve bakım gereksinimini 0–100 ile değerlendirir.","Gündəlik fəaliyyət və qayğı ehtiyacını 0–100 ilə qiymətləndirir.","يقيم النشاط اليومي والحاجة للمساعدة من 0 إلى 100.","Rate activity and care needs on a 0–100 scale."),
 fields:[{key:"performance",label:T("Mevcut işlev düzeyi","Hazırkı funksional səviyyə","المستوى الوظيفي الحالي","Current function"),kind:"select",numeric:true,options:kps.map(function(item){return {value:String(item[0]),label:item[1]};})}],
 unit:" / 100",decimals:0,
 warning:T("Bu işlevsellik ölçeğidir; tek başına prognoz veya tedavi kararı değildir. ECOG ile tam dönüşüm yapılmamalıdır.","Bu funksionallıq şkalasıdır; təkbaşına proqnoz və müalicə qərarı deyil.","أداة لتقييم الأداء، وليست قرارًا علاجيًا أو تنبؤيًا مستقلًا.","Functioning scale, not a stand-alone prognosis or treatment decision. No exact ECOG conversion is provided."),
 formula:"Karnofsky Performance Status: 100 (normal) to 0 (deceased), in steps of 10.",
 source:"ECOG-ACRIN — Karnofsky Scale",sourceUrl:ref
});
})(typeof globalThis!=="undefined"?globalThis:this);
