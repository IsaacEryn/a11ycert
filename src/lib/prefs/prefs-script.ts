// Blocking inline script injected into <head> before hydration.
// Reads localStorage and sets data-theme/data-fs/data-motion on <html>
// to prevent FOUC (flash of unstyled/wrong-theme content).
export const PREFS_INLINE_SCRIPT = `(function(){
  var KEY="a11ycert.prefs.v1";
  var r=document.documentElement;
  function sysTheme(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
  function sysMotion(){return window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?"reduced":"full";}
  function sysContrast(){return window.matchMedia&&window.matchMedia("(prefers-contrast: more)").matches?"hc":null;}
  var p;
  try{var raw=localStorage.getItem(KEY);if(raw)p=JSON.parse(raw);}catch(e){}
  if(!p)p={theme:sysContrast()||sysTheme(),fs:"m",motion:sysMotion()};
  r.setAttribute("data-theme",p.theme);
  r.setAttribute("data-fs",p.fs);
  r.setAttribute("data-motion",p.motion);
})();`;
