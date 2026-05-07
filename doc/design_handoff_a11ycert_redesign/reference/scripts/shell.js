/* ============================================================
   A11yCert shell helpers — buildHeader, buildFooter, mode menu
   ============================================================ */
(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  // ---- Icons (inline SVG, currentColor) ----
  const Icons = {
    sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
    moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    contrast: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>`,
    settings: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.36.4.59.93.6 1.51V11a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    type: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
    motion: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>`,
    chevron: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
    close: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  };

  // ---- Header ----
  function buildHeader(opts = {}) {
    const { active = "home", lang = "ko" } = opts;
    const navItems = [
      { id: "home", label: "홈", href: "index.html" },
      { id: "cpacc", label: "CPACC", href: "cpacc.html" },
      { id: "was", label: "WAS", href: "was.html" },
      { id: "study", label: "학습", href: "study.html" },
      { id: "quiz", label: "모의 퀴즈", href: "quiz.html" },
      { id: "flash", label: "플래시카드", href: "flashcards.html" },
      { id: "glossary", label: "용어집", href: "glossary.html" },
    ];
    const themeNow = document.documentElement.getAttribute("data-theme") || "light";
    const fsNow = document.documentElement.getAttribute("data-fs") || "m";
    const motionNow = document.documentElement.getAttribute("data-motion") || "full";

    return el(`
      <header class="app-header" role="banner">
        <div class="container">
          <div class="app-header__row">
            <a href="index.html" class="brand" aria-label="A11yCert 홈">
              <span class="brand__mark" aria-hidden="true">A11</span>
              <span>A11yCert</span>
            </a>
            <nav class="nav" aria-label="주요 메뉴">
              ${navItems.map(n => `
                <a class="nav__link" href="${n.href}" ${n.id === active ? 'aria-current="page"' : ''}>${n.label}</a>
              `).join("")}
            </nav>
            <div class="app-header__spacer"></div>

            <button type="button" class="mobile-trigger" aria-label="메뉴 열기" data-mobile-trigger>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>

            <div class="lang-toggle" role="group" aria-label="언어">
              <button type="button" aria-pressed="${lang === 'ko'}" data-lang="ko">한국어</button>
              <button type="button" aria-pressed="${lang === 'en'}" data-lang="en">EN</button>
            </div>

            <div class="mode-menu" data-mode-menu>
              <button type="button" class="mode-menu__trigger" aria-haspopup="true" aria-expanded="false" aria-controls="mode-panel">
                <span class="mode-menu__icon" aria-hidden="true">${Icons.settings}</span>
                <span>모드</span>
                ${Icons.chevron}
              </button>
              <div class="mode-menu__panel" id="mode-panel" role="dialog" aria-label="화면 및 접근성 설정">
                <div class="mode-menu__group">
                  <div class="mode-menu__label">테마</div>
                  <div class="seg" role="group" aria-label="테마">
                    <button type="button" data-mode-target="theme" data-mode-value="light" aria-pressed="${themeNow==='light'}">${Icons.sun}<span>라이트</span></button>
                    <button type="button" data-mode-target="theme" data-mode-value="dark"  aria-pressed="${themeNow==='dark'}">${Icons.moon}<span>다크</span></button>
                    <button type="button" data-mode-target="theme" data-mode-value="hc"    aria-pressed="${themeNow==='hc'}">${Icons.contrast}<span>고대비</span></button>
                  </div>
                </div>

                <div class="mode-menu__group">
                  <div class="mode-menu__label">${Icons.type} 글자 크기</div>
                  <div class="seg" role="group" aria-label="글자 크기">
                    <button type="button" data-mode-target="fs" data-mode-value="s"  aria-pressed="${fsNow==='s'}"><span style="font-size:11px">A</span></button>
                    <button type="button" data-mode-target="fs" data-mode-value="m"  aria-pressed="${fsNow==='m'}"><span style="font-size:13px">A</span></button>
                    <button type="button" data-mode-target="fs" data-mode-value="l"  aria-pressed="${fsNow==='l'}"><span style="font-size:15px">A</span></button>
                    <button type="button" data-mode-target="fs" data-mode-value="xl" aria-pressed="${fsNow==='xl'}"><span style="font-size:18px">A</span></button>
                  </div>
                </div>

                <div class="mode-menu__group">
                  <div class="mode-menu__label">${Icons.motion} 애니메이션</div>
                  <div class="seg" role="group" aria-label="애니메이션">
                    <button type="button" data-mode-target="motion" data-mode-value="full"    aria-pressed="${motionNow==='full'}"><span>기본</span></button>
                    <button type="button" data-mode-target="motion" data-mode-value="reduced" aria-pressed="${motionNow==='reduced'}"><span>줄이기</span></button>
                  </div>
                </div>

                <p style="font-size:var(--fs-xs);color:var(--fg-subtle);margin:0;line-height:1.5;">
                  설정은 이 브라우저에 저장됩니다. 시스템 설정도 자동으로 반영합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    `);
  }

  // ---- Footer ----
  function buildFooter() {
    return el(`
      <footer class="app-footer" role="contentinfo">
        <div class="container">
          <div class="app-footer__grid">
            <div class="app-footer__col">
              <a href="index.html" class="brand" style="font-size:var(--fs-md)">
                <span class="brand__mark" aria-hidden="true">A11</span>
                <span>A11yCert</span>
              </a>
              <p style="margin-top:var(--space-3);color:var(--fg-muted);font-size:var(--fs-sm);max-width:32ch;line-height:1.6;">
                IAAP BoK 기반 비공식 한국어 학습 플랫폼. 모든 학습 자료는 무료로 제공됩니다.
              </p>
            </div>
            <div class="app-footer__col">
              <h4>CPACC</h4>
              <ul>
                <li><a href="cpacc.html">개요</a></li>
                <li><a href="study.html?cert=cpacc">학습</a></li>
                <li><a href="quiz.html?cert=cpacc">모의 퀴즈</a></li>
                <li><a href="flashcards.html?cert=cpacc">플래시카드</a></li>
              </ul>
            </div>
            <div class="app-footer__col">
              <h4>WAS</h4>
              <ul>
                <li><a href="was.html">개요</a></li>
                <li><a href="study.html?cert=was">학습</a></li>
                <li><a href="quiz.html?cert=was">모의 퀴즈</a></li>
                <li><a href="flashcards.html?cert=was">플래시카드</a></li>
              </ul>
            </div>
            <div class="app-footer__col">
              <h4>사이트</h4>
              <ul>
                <li><a href="glossary.html">용어집</a></li>
                <li><a href="#">커뮤니티</a></li>
                <li><a href="#">소개</a></li>
                <li><a href="#">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div class="app-footer__bottom">
            <span>© 2026 A11yCert · IAAP와 무관한 독립 운영 사이트</span>
            <span>오류 제보: GitHub Issues</span>
          </div>
        </div>
      </footer>
    `);
  }

  // ---- Mode menu open/close ----
  function wireModeMenu(headerEl) {
    const wrap = headerEl.querySelector("[data-mode-menu]");
    const trigger = wrap.querySelector(".mode-menu__trigger");
    const close = () => {
      wrap.removeAttribute("data-open");
      trigger.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      wrap.setAttribute("data-open", "true");
      trigger.setAttribute("aria-expanded", "true");
    };
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = wrap.hasAttribute("data-open");
      isOpen ? close() : open();
    });
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // ---- Mobile sheet ----
  function buildMobileSheet({ active = "home", lang = "ko" } = {}) {
    const navItems = [
      { id: "home", label: "홈", href: "index.html" },
      { id: "cpacc", label: "CPACC", href: "cpacc.html" },
      { id: "was", label: "WAS", href: "was.html" },
      { id: "study", label: "학습", href: "study.html" },
      { id: "quiz", label: "모의 퀴즈", href: "quiz.html" },
      { id: "flash", label: "플래시카드", href: "flashcards.html" },
      { id: "glossary", label: "용어집", href: "glossary.html" },
    ];
    return el(`
      <div class="mobile-sheet" role="dialog" aria-modal="true" aria-label="메뉴" data-mobile-sheet>
        <div class="mobile-sheet__backdrop" data-mobile-close></div>
        <div class="mobile-sheet__panel">
          <div class="mobile-sheet__handle" aria-hidden="true"></div>
          <div class="mobile-sheet__head">
            <div class="mobile-sheet__title">메뉴</div>
            <button class="mobile-sheet__close" aria-label="닫기" data-mobile-close>${Icons.close}</button>
          </div>
          <nav class="mobile-nav" aria-label="모바일 메뉴">
            ${navItems.map(n => `
              <a href="${n.href}" ${n.id === active ? 'aria-current="page"' : ''}>
                <span>${n.label}</span>
                <span aria-hidden="true">→</span>
              </a>
            `).join("")}
          </nav>
          <div class="mode-menu__group" style="margin-top:var(--space-4);">
            <div class="mode-menu__label">테마</div>
            <div class="seg" role="group" aria-label="테마">
              <button type="button" data-mode-target="theme" data-mode-value="light">${Icons.sun}<span>라이트</span></button>
              <button type="button" data-mode-target="theme" data-mode-value="dark">${Icons.moon}<span>다크</span></button>
              <button type="button" data-mode-target="theme" data-mode-value="hc">${Icons.contrast}<span>고대비</span></button>
            </div>
          </div>
          <div class="mode-menu__group" style="margin-top:var(--space-3);">
            <div class="mode-menu__label">글자 크기</div>
            <div class="seg" role="group" aria-label="글자 크기">
              <button type="button" data-mode-target="fs" data-mode-value="s"><span style="font-size:11px">A</span></button>
              <button type="button" data-mode-target="fs" data-mode-value="m"><span style="font-size:13px">A</span></button>
              <button type="button" data-mode-target="fs" data-mode-value="l"><span style="font-size:15px">A</span></button>
              <button type="button" data-mode-target="fs" data-mode-value="xl"><span style="font-size:18px">A</span></button>
            </div>
          </div>
          <div class="mode-menu__group" style="margin-top:var(--space-3);">
            <div class="mode-menu__label">애니메이션</div>
            <div class="seg" role="group" aria-label="애니메이션">
              <button type="button" data-mode-target="motion" data-mode-value="full"><span>기본</span></button>
              <button type="button" data-mode-target="motion" data-mode-value="reduced"><span>줄이기</span></button>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  function wireMobileSheet() {
    const trigger = document.querySelector("[data-mobile-trigger]");
    const sheet = document.querySelector("[data-mobile-sheet]");
    if (!trigger || !sheet) return;
    const open = () => {
      sheet.setAttribute("data-open", "true");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      sheet.removeAttribute("data-open");
      document.body.style.overflow = "";
    };
    trigger.addEventListener("click", open);
    sheet.querySelectorAll("[data-mobile-close]").forEach(el => el.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  // ---- Public ----
  window.A11yCertShell = {
    mount({ active, lang } = {}) {
      // Skip link first
      const skip = el(`<a href="#main-content" class="skip-link">본문으로 바로가기</a>`);
      document.body.prepend(skip);

      const header = buildHeader({ active, lang });
      // Insert before #main-content
      const main = document.getElementById("main-content");
      if (main) {
        main.parentNode.insertBefore(header, main);
      } else {
        document.body.prepend(header);
      }
      wireModeMenu(header);

      const sheet = buildMobileSheet({ active, lang });
      document.body.append(sheet);
      wireMobileSheet();

      const footer = buildFooter();
      document.body.append(footer);
    },
    Icons,
  };
})();
