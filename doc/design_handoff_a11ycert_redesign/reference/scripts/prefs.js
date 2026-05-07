/* ============================================================
   A11yCert Mode Controller
   - Theme: light / dark / hc
   - Font scale: s / m / l / xl
   - Motion: full / reduced
   Persists in localStorage. Respects system prefs on first load.
   ============================================================ */
(function () {
  const KEY = "a11ycert.prefs.v1";
  const root = document.documentElement;

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }
  function getSystemMotion() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
    return "full";
  }
  function getSystemContrast() {
    if (window.matchMedia && window.matchMedia("(prefers-contrast: more)").matches) return "hc";
    return null;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      theme: getSystemContrast() || getSystemTheme(),
      fs: "m",
      motion: getSystemMotion(),
    };
  }
  function save(p) {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {}
  }

  function apply(p) {
    root.setAttribute("data-theme", p.theme);
    root.setAttribute("data-fs", p.fs);
    root.setAttribute("data-motion", p.motion);
    // Update aria-pressed on any toggles
    document.querySelectorAll("[data-mode-target]").forEach((el) => {
      const target = el.getAttribute("data-mode-target");
      const value = el.getAttribute("data-mode-value");
      const active = (p[target] === value);
      el.setAttribute("aria-pressed", active ? "true" : "false");
    });
    // Notify listeners
    document.dispatchEvent(new CustomEvent("a11ycert:prefs", { detail: p }));
  }

  let prefs = load();

  window.A11yCertPrefs = {
    get: () => ({ ...prefs }),
    set: (patch) => {
      prefs = { ...prefs, ...patch };
      save(prefs);
      apply(prefs);
    },
    cycleTheme: () => {
      const order = ["light", "dark", "hc"];
      const next = order[(order.indexOf(prefs.theme) + 1) % order.length];
      window.A11yCertPrefs.set({ theme: next });
    },
  };

  // Apply on DOM ready
  apply(prefs);
  document.addEventListener("DOMContentLoaded", () => apply(prefs));

  // Click handler delegated
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-mode-target]");
    if (!t) return;
    const target = t.getAttribute("data-mode-target");
    const value = t.getAttribute("data-mode-value");
    if (!target || !value) return;
    window.A11yCertPrefs.set({ [target]: value });
  });
})();
