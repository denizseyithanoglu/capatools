(function () {
"use strict";
var D = window.CAPAData;
var E = window.CAPACalc;
if (!D || !E) return;
var UI = D.UI, CATS = D.categories, TOOLS = D.tools;
var $ = function(id){return document.getElementById(id);};
var getStored = function(key, fallback){try {return localStorage.getItem(key)||fallback;} catch(e){return fallback;}};
var store = function(key,value){try {localStorage.setItem(key,value);} catch(e){}};
var initialFavorites = [];
try {
  var parsed = JSON.parse(getStored("capa-favorites","[]"));
  if (Array.isArray(parsed)) initialFavorites = parsed.filter(function(x){return typeof x==="string" && TOOLS.some(function(t){return t.id===x;});});
} catch(e){}
var state = {
  lang: D.languages.indexOf(getStored("capa-lang","tr"))!==-1 ? getStored("capa-lang","tr") : "tr",
  category: "all",
  search: "",
  favorites: initialFavorites,
  active: null,
  lastFocus: null,
  theme: getStored("capa-theme","light")==="dark" ? "dark" : "light"
};
var localeMap = {tr:"tr-TR",az:"az-AZ",ar:"ar-EG-u-nu-latn",en:"en-US"};
function tr(text) {
  if (typeof text==="string") return text;
  return text && (text[state.lang] || text.en || text.tr) || "";
}
function ui(key) { return tr(UI[key]); }
function make(tag, className, text) {
  var el=document.createElement(tag);
  if (className) el.className=className;
  if (typeof text!=="undefined") el.textContent=text;
  return el;
}
function numberString(n,decimals){
  return new Intl.NumberFormat(localeMap[state.lang],{minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(n);
}
function labelForCategory(id){
  var c=CATS.find(function(item){return item.id===id;});
  return c ? tr(c.title) : "";
}
function renderStatic(){
  document.documentElement.lang=state.lang;
  document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
  document.documentElement.dataset.theme=state.theme;
  document.title="CAPA Tools · "+ui("brandSubtitle");
  $("brandSubtitle").textContent=ui("brandSubtitle");
  $("specialtyLabel").textContent=ui("specialties");
  $("offlineLabel").textContent=ui("offline");
  $("heroEyebrow").textContent=ui("heroEyebrow");
  $("heroTitle").textContent=ui("heroTitle");
  $("heroDescription").textContent=ui("heroDescription");
  $("sectionEyebrow").textContent=ui("sectionEyebrow");
  $("safetyTitle").textContent=ui("safetyTitle");
  $("safetyText").textContent=ui("safetyText");
  $("footerText").textContent=ui("footer");
  $("searchInput").placeholder=ui("search");
  $("searchInput").setAttribute("aria-label",ui("search"));
  $("languageSelect").setAttribute("aria-label",ui("language"));
  $("themeButton").setAttribute("aria-label",ui("theme"));
  $("themeButton").title=ui("theme");
  $("themeButton").textContent=state.theme==="dark"?"☀":"☾";
  $("closeDialog").setAttribute("aria-label",ui("close"));
  $("referenceLabel").textContent=ui("source")+":";
  $("outputLabel").textContent=ui("result");
  $("resetButton").textContent=ui("reset");
  $("calculateButton").textContent=ui("calculate")+" →";
  $("year").textContent=String(new Date().getFullYear());
  $("languageSelect").value=state.lang;
  $("skipLink").textContent=state.lang==="tr"?"İçeriğe geç":state.lang==="az"?"Məzmuna keç":state.lang==="ar"?"تخطي إلى المحتوى":"Skip to content";
  var metrics=[{n:TOOLS.length,k:"metricTools"},{n:CATS.length,k:"metricSpecialties"},{n:4,k:"metricLanguages"}];
  $("heroMetrics").replaceChildren();
  metrics.forEach(function(item){
    var wrap=make("div","metric");
    wrap.append(make("strong","",String(item.n)),make("span","",ui(item.k)));
    $("heroMetrics").append(wrap);
  });
}
function menu(open){
  $("sidebar").classList.toggle("open",open);
  $("mobileBackdrop").hidden=!open;
  $("menuButton").setAttribute("aria-expanded",open?"true":"false");
}
function navButton(id,icon,name,count){
  var selected=state.category===id;
  var button=make("button","category-item"+(selected?" active":""));
  button.type="button";
  button.setAttribute("aria-pressed",selected?"true":"false");
  button.append(make("span","category-emoji",icon),make("span","category-name",name),make("span","category-count",String(count)));
  button.onclick=function(){
    state.category=id;
    state.search="";
    $("searchInput").value="";
    renderNav();
    renderTools();
    menu(false);
  };
  return button;
}
function renderNav(){
  var nav=$("categoryNav");
  nav.replaceChildren();
  nav.append(navButton("all","▦",ui("all"),TOOLS.length));
  nav.append(navButton("favorites","☆",ui("favorites"),state.favorites.length));
  CATS.forEach(function(c){
    var count=TOOLS.filter(function(tool){return tool.group===c.id;}).length;
    nav.append(navButton(c.id,c.icon,tr(c.title),count));
  });
}
function matchesSearch(tool,q){
  if (!q) return true;
  var c=CATS.find(function(x){return x.id===tool.group;});
  var parts=[tool.id];
  [tool.title,tool.summary,c.title].forEach(function(dict){
    D.languages.forEach(function(lang){parts.push(dict[lang]||"");});
  });
  return parts.join(" ").toLocaleLowerCase().indexOf(q)!==-1;
}
function currentTools(){
  var tools=TOOLS.filter(function(t){
    return (state.category==="all" || (state.category==="favorites" && state.favorites.includes(t.id)) || t.group===state.category);
  });
  var q=state.search.trim().toLocaleLowerCase();
  return tools.filter(function(t){return matchesSearch(t,q);});
}
function toggleFavorite(id){
  if (state.favorites.includes(id)) state.favorites=state.favorites.filter(function(x){return x!==id;});
  else state.favorites.push(id);
  store("capa-favorites",JSON.stringify(state.favorites));
  renderNav();
  renderTools();
}
function makeCard(tool){
  var card=make("div","tool-card");
  card.tabIndex=0;
  card.setAttribute("role","button");
  card.setAttribute("aria-label",ui("open")+" "+tr(tool.title));
  card.addEventListener("click",function(){openCalculator(tool);});
  card.addEventListener("keydown",function(e){
    if (e.target!==card) return;
    if (e.key==="Enter" || e.key===" "){e.preventDefault();openCalculator(tool);}
  });
  var top=make("div","tool-card-top");
  top.append(make("span","tool-icon",tool.icon));
  var active=state.favorites.includes(tool.id);
  var star=make("button","tool-favorite"+(active?" selected":""),active?"★":"☆");
  star.type="button";
  star.setAttribute("aria-label",active?ui("favoriteRemove"):ui("favoriteAdd"));
  star.setAttribute("aria-pressed",active?"true":"false");
  star.addEventListener("click",function(e){e.stopPropagation();toggleFavorite(tool.id);});
  top.append(star);
  card.append(top);
  card.append(make("h3","",tr(tool.title)));
  card.append(make("p","",tr(tool.summary)));
  var bottom=make("div","tool-card-bottom");
  bottom.append(make("span","",labelForCategory(tool.group)),make("span","","↗"));
  card.append(bottom);
  return card;
}
function renderTools(){
  var title=state.category==="all"?ui("all"):state.category==="favorites"?ui("favorites"):labelForCategory(state.category);
  $("sectionTitle").textContent=title;
  $("sectionDescription").textContent=state.category==="favorites"?ui("favDescription"):ui("allDescription");
  var list=currentTools();
  $("resultCount").textContent=ui("results").replace("{n}",String(list.length));
  $("toolGrid").replaceChildren();
  list.forEach(function(t){$("toolGrid").append(makeCard(t));});
  var empty=list.length===0;
  $("emptyState").hidden=!empty;
  if (empty) {
    var fav=state.category==="favorites" && !state.search;
    $("emptyTitle").textContent=ui(fav?"noFavorites":"noResults");
    $("emptyDescription").textContent=ui(fav?"noFavoritesDesc":"noResultsDesc");
  }
}
function renderField(field,idx){
  var id="calc-field-"+field.key;
  var block=make("div","form-field");
  var label=make("label","",tr(field.label));label.htmlFor=id;
  block.append(label);
  var input;
  if(field.kind==="number"){
    var shell=make("div","input-shell");
    input=make("input");
    input.type="number";
    input.inputMode="decimal";
    input.step=["age","tjc","sjc"].includes(field.key)?"1":"any";
    if (typeof field.min==="number") input.min=String(field.min);
    if (typeof field.max==="number") input.max=String(field.max);
    input.autocomplete="off";
    input.setAttribute("dir","ltr");
    shell.append(input);
    if(field.unit) shell.append(make("span","field-unit",field.unit));
    block.append(shell);
  } else {
    input=make("select");
    var placeholder=make("option","",ui("select"));placeholder.value="";
    placeholder.disabled=true;placeholder.selected=true;
    input.append(placeholder);
    var options=field.kind==="binary"?[
      {value:"1",label:UI.yes},{value:"0",label:UI.no}
    ]:field.options;
    options.forEach(function(opt){
      var op=make("option","",tr(opt.label));
      op.value=opt.value;
      input.append(op);
    });
    block.append(input);
  }
  input.id=id;
  input.name=field.key;
  input.required=true;
  input.dataset.kind=field.kind;
  input.addEventListener("input",function(){
    input.removeAttribute("aria-invalid");
    $("calcError").textContent="";
    $("calcOutput").hidden=true;
  });
  input.addEventListener("change",function(){
    input.removeAttribute("aria-invalid");
    $("calcError").textContent="";
    $("calcOutput").hidden=true;
  });
  if (field.help){
    var helper=make("p","field-help",tr(field.help));
    helper.id=id+"-help";
    input.setAttribute("aria-describedby",helper.id);
    block.append(helper);
  }
  return block;
}
function openCalculator(tool){
  if(tool.customPage){window.location.href=tool.customPage;return;}
  state.lastFocus=document.activeElement;
  state.active=tool;
  $("dialogIcon").textContent=tool.icon;
  $("dialogCategory").textContent=labelForCategory(tool.group);
  $("dialogTitle").textContent=tr(tool.title);
  $("dialogIntro").textContent=tr(tool.summary);
  $("calcWarning").textContent=tr(tool.warning);
  $("formulaLabel").textContent=tool.formula;
  $("referenceLink").textContent=tool.source+" ↗";
  $("referenceLink").href=tool.sourceUrl;
  $("calcOutput").hidden=true;
  $("outputInterpretation").textContent="";
  $("outputUnit").textContent="";
  $("outputValue").textContent="";
  var form=$("calcForm");
  form.replaceChildren();
  var grid=make("div","fields-grid");
  tool.fields.forEach(function(f,i){grid.append(renderField(f,i));});
  form.append(grid,make("span","form-error",""));
  form.lastChild.id="calcError";
  $("dialogBackdrop").hidden=false;
  document.body.style.overflow="hidden";
  var first=form.querySelector("input,select");
  (first||$("closeDialog")).focus();
  menu(false);
}
function closeCalculator(){
  if($("dialogBackdrop").hidden) return;
  $("dialogBackdrop").hidden=true;
  document.body.style.overflow="";
  state.active=null;
  if(state.lastFocus && state.lastFocus.isConnected) state.lastFocus.focus();
  else $("searchInput").focus();
}
function onCalculate(e){
  e.preventDefault();
  if(!state.active) return;
  var fields=state.active.fields, v={},valid=true,firstInvalid=null;
  fields.forEach(function(field){
    var el=$("calc-field-"+field.key);
    var raw=el.value;
    var missing=raw==="";
    var numeric=field.kind==="number" || field.kind==="binary" || field.key==="factor";
    var value=numeric?Number(raw):raw;
    var bad=missing || (numeric && !Number.isFinite(value)) ||
      (field.kind==="number" && (!el.validity.valid ||
        (typeof field.min==="number" && value<field.min) ||
        (typeof field.max==="number" && value>field.max)));
    if(bad){valid=false;el.setAttribute("aria-invalid","true");if(!firstInvalid)firstInvalid=el;}
    else {el.removeAttribute("aria-invalid");v[field.key]=value;}
  });
  $("calcOutput").hidden=true;
  var error=$("calcError");
  if(!valid){error.textContent=ui("required");if(firstInvalid)firstInvalid.focus();return;}
  if(typeof v.sbp==="number" && typeof v.dbp==="number" && v.sbp<v.dbp){
    error.textContent=ui("invalidBP");$("calc-field-sbp").focus();return;
  }
  if(typeof v.neut==="number" && typeof v.bands==="number" && v.neut+v.bands>100){
    error.textContent=ui("invalidDifferential");$("calc-field-bands").focus();return;
  }
  try{
    var res=E.compute(state.active.id,v);
    error.textContent="";
    $("outputValue").textContent=numberString(res.value,state.active.decimals);
    $("outputUnit").textContent=state.active.unit;
    $("outputInterpretation").textContent=res.interpretation?ui(res.interpretation):"";
    $("calcOutput").hidden=false;
    $("calcOutput").scrollIntoView({block:"nearest",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  }catch(err){
    error.textContent=ui("genericError");
  }
}
function trapFocus(e){
  if($("dialogBackdrop").hidden)return;
  if(e.key==="Escape"){e.preventDefault();closeCalculator();return;}
  if(e.key!=="Tab")return;
  var focusables=Array.from($("dialogBackdrop").querySelectorAll("button:not([disabled]),a[href],input:not([disabled]),select:not([disabled])")).filter(function(x){return x.offsetParent!==null;});
  if(!focusables.length)return;
  var first=focusables[0],last=focusables[focusables.length-1];
  if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
}
function init(){
  renderStatic();renderNav();renderTools();
  $("languageSelect").addEventListener("change",function(e){
    state.lang=e.target.value;
    store("capa-lang",state.lang);
    var active=state.active;
    renderStatic();renderNav();renderTools();
    if(active)openCalculator(active);
  });
  $("themeButton").addEventListener("click",function(){
    state.theme=state.theme==="light"?"dark":"light";
    store("capa-theme",state.theme);
    renderStatic();
  });
  $("searchInput").addEventListener("input",function(e){
    state.search=e.target.value;
    if(state.search && state.category!=="all"){state.category="all";renderNav();}
    renderTools();
  });
  $("menuButton").addEventListener("click",function(){menu(!$("sidebar").classList.contains("open"));});
  $("mobileBackdrop").addEventListener("click",function(){menu(false);});
  $("closeDialog").addEventListener("click",closeCalculator);
  $("dialogBackdrop").addEventListener("click",function(e){if(e.target===$("dialogBackdrop"))closeCalculator();});
  $("calcForm").addEventListener("submit",onCalculate);
  $("resetButton").addEventListener("click",function(){
    $("calcForm").reset();
    $("calcOutput").hidden=true;
    $("calcError").textContent="";
    $("calcForm").querySelectorAll("[aria-invalid]").forEach(function(el){el.removeAttribute("aria-invalid");});
    var first=$("calcForm").querySelector("input,select");if(first)first.focus();
  });
  document.addEventListener("keydown",trapFocus);
  window.addEventListener("resize",function(){if(window.innerWidth>820)menu(false);});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
