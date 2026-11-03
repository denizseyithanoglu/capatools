/* Local-only, non-clinical tool-open counters. Never stores calculator inputs. */
(function (root) {
  "use strict";
  var KEY="capa-usage-v1";
  function read() {
    var counts=Object.create(null);
    try {
      var parsed=JSON.parse(localStorage.getItem(KEY)||"{}");
      if (!parsed || typeof parsed!=="object" || Array.isArray(parsed)) return counts;
      Object.keys(parsed).forEach(function(key) {
        if (/^[a-z0-9-]{1,40}$/.test(key) && Number.isSafeInteger(parsed[key]) && parsed[key] > 0) {
          counts[key]=parsed[key];
        }
      });
    } catch(e) {}
    return counts;
  }
  function record(id) {
    if (typeof id!=="string" || !/^[a-z0-9-]{1,40}$/.test(id)) return;
    var counts=read();
    counts[id]=Math.min(Number.MAX_SAFE_INTEGER,(counts[id]||0)+1);
    try {localStorage.setItem(KEY,JSON.stringify(counts));} catch(e) {}
  }
  root.CAPAUsage=Object.freeze({read:read,record:record});
})(typeof globalThis!=="undefined"?globalThis:this);
