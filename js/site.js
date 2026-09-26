(function () {
  const cfg = window.WINKME || {};
  const profiles = window.PROFILES || [];

  function telegramHref() {
    return cfg.telegramUrl && cfg.telegramUrl.trim()
      ? cfg.telegramUrl.trim()
      : "#telegram";
  }

  function telegramAttrs() {
    const href = telegramHref();
    if (href === "#telegram") {
      return 'href="#telegram" data-telegram-pending="1"';
    }
    return `href="${href}" target="_blank" rel="noopener noreferrer"`;
  }

  const icons = {
    telegram: `<svg class="ic" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.61 7.59c-.12.54-.43.67-.87.42l-2.4-1.77-1.16 1.12c-.13.13-.24.24-.49.24l.17-2.43 4.47-4.04c.19-.17-.04-.27-.3-.1l-5.53 3.48-2.38-.75c-.52-.16-.53-.52.11-.77l9.3-3.58c.43-.16.81.1.67.59z"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>`,
    cake: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 6a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm6 4h-2.18A3 3 0 0 0 13 8h-2a3 3 0 0 0-2.82 2H6a2 2 0 0 0-2 2v2h16v-2a2 2 0 0 0-2-2zM4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4H4z"/></svg>`,
    lock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-7 0V6a1 1 0 0 1 2 0v2h-2z"/></svg>`,
  };

  function pathPrefix() {
    const depth = (location.pathname.match(/\//g) || []).length;
    // file:// or nested: profiles/x.html → need ../
    if (/\/profiles\//.test(location.pathname) || /\\profiles\\/.test(location.pathname)) {
      return "../";
    }
    return "";
  }

  const base = pathPrefix();

  function renderHeader(active) {
    const el = document.getElementById("site-header");
    if (!el) return;
    el.innerHTML = `
<header class="site-header" id="siteHeader">
  <div class="container nav-row">
    <a class="brand" href="${base}index.html" aria-label="Wink Me Club home">
      <span class="brand-mark"><img src="${base}assets/logo.png" alt="" width="42" height="42" style="border-radius:10px;object-fit:cover"></span>
      <span class="brand-text">
        <span class="brand-name">Wink <em>Me</em> Club</span>
        <span class="brand-sub">Connect · Wink · Match</span>
      </span>
    </a>
    <nav class="nav-links" id="navLinks" aria-label="Main navigation">
      <a href="${base}index.html" class="${active === "home" ? "active" : ""}">Home</a>
      <a href="${base}profiles.html" class="${active === "profiles" ? "active" : ""}">Profiles</a>
      <a href="${base}membership.html" class="${active === "membership" ? "active" : ""}">Membership</a>
      <a href="${base}how-it-works.html" class="${active === "how" ? "active" : ""}">How it works</a>
      <a href="${base}safety.html" class="${active === "safety" ? "active" : ""}">Safety</a>
      <a href="${base}contact.html" class="${active === "contact" ? "active" : ""}">Contact</a>
      <a class="btn btn-gradient btn-sm drawer-cta tg-link" ${telegramAttrs()}>${icons.telegram} Join on Telegram</a>
    </nav>
    <div class="nav-actions">
      <a class="btn btn-gradient btn-sm nav-cta tg-link" ${telegramAttrs()}>${icons.telegram} Join on Telegram</a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navLinks" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`;
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    el.innerHTML = `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${base}index.html">
        <span class="brand-mark"><img src="${base}assets/logo.png" alt="" width="36" height="36" style="border-radius:8px;object-fit:cover"></span>
        <span class="brand-text">
          <span class="brand-name">Wink <em>Me</em> Club</span>
          <span class="brand-sub">Connect · Wink · Match</span>
        </span>
      </a>
      <p>Wink Me Club is a safe and friendly 18+ community where you can meet new people and build meaningful connections.</p>
    </div>
    <div class="footer-col">
      <h3>Quick links</h3>
      <a href="${base}about.html">About us</a>
      <a href="${base}membership.html">Membership</a>
      <a href="${base}profiles.html">Verified profiles</a>
      <a href="${base}how-it-works.html">How it works</a>
      <a href="${base}contact.html">Contact us</a>
    </div>
    <div class="footer-col">
      <h3>Legal</h3>
      <a href="${base}privacy.html">Privacy policy</a>
      <a href="${base}terms.html">Terms &amp; conditions</a>
      <a href="${base}refund.html">Refund policy</a>
      <a href="${base}safety.html">Safety tips</a>
    </div>
    <div class="footer-col">
      <h3>Connect with us</h3>
      <p>Join our Telegram for support and any help you need.</p>
      <a class="footer-cta tg-link" ${telegramAttrs()}>${icons.telegram} Join on Telegram</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© ${new Date().getFullYear()} Wink Me Club. All rights reserved.</p>
  </div>
</footer>`;
  }

  function resolvePhoto(src) {
    if (!src) return "";
    if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src;
    return base + src.replace(/^\.\//, "");
  }

  function memberCard(p, opts = {}) {
    const prefix = opts.prefix != null ? opts.prefix : base;
    const href = `${prefix}profile.html?slug=${encodeURIComponent(p.slug)}`;
    const initial = (p.name || "?").charAt(0).toUpperCase();
    const age = p.age ? `${p.age} years` : "";
    const city = p.city || "";
    const photo = resolvePhoto(p.photo);
    return `
<article class="member-card reveal">
  <a class="member-hit" href="${href}" aria-label="View ${p.name}'s profile"></a>
  ${p.verified ? `<span class="member-verified">${icons.check} Verified</span>` : ""}
  ${p.online ? `<span class="member-online" title="Online now"></span>` : ""}
  <div class="member-media">
    <img src="${photo}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<span class=member-initial>${initial}</span>')">
  </div>
  <div class="member-info">
    <h3>${p.name}</h3>
    ${age ? `<p class="member-meta"><span class="member-age">${icons.cake} ${age}</span></p>` : ""}
    ${city ? `<p class="member-meta">${icons.pin} ${city}</p>` : ""}
    <a class="member-lock" href="${href}">${icons.lock} View profile</a>
  </div>
</article>`;
  }

  function renderMemberGrid(selector, list, opts) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = list.map((p) => memberCard(p, opts)).join("");
  }

  function wireTelegram() {
    document.querySelectorAll(".tg-link, [data-telegram-pending]").forEach((a) => {
      a.addEventListener("click", (e) => {
        if (!cfg.telegramUrl || !cfg.telegramUrl.trim()) {
          e.preventDefault();
          alert("Telegram link coming soon — paste your URL in js/config.js (telegramUrl).");
        }
      });
    });
  }

  function wireNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    const header = document.getElementById("siteHeader");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  function wireReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
  }

  function getProfile(slug) {
    return profiles.find((p) => p.slug === slug);
  }

  window.WinkSite = {
    icons,
    telegramAttrs,
    telegramHref,
    renderHeader,
    renderFooter,
    memberCard,
    renderMemberGrid,
    getProfile,
    profiles,
    cfg,
    base,
    init(active) {
      renderHeader(active);
      renderFooter();
      wireNav();
      wireTelegram();
      wireReveal();
    },
  };
})();
