(function () {
  const cfg = window.WINKME || {};

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
  };

  const base = "";

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

  function initCarousel(root, opts) {
    if (!root) return;
    const trackSel = opts.track || ".plan-track";
    const slideSel = opts.slide || ".plan-slide";
    const track = root.querySelector(trackSel);
    const slides = [...root.querySelectorAll(slideSel)];
    const dots = [...root.querySelectorAll(".plan-dot")];
    const prev = root.querySelector(".plan-nav-prev");
    const next = root.querySelector(".plan-nav-next");
    if (!track || slides.length < 2) return;

    let index = 0;
    const delay = parseInt(root.dataset.autoplay || "2000", 10);
    let timer = null;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
    }

    function start() {
      stop();
      if (delay > 0) timer = setInterval(() => goTo(index + 1), delay);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    prev?.addEventListener("click", () => { goTo(index - 1); start(); });
    next?.addEventListener("click", () => { goTo(index + 1); start(); });
    dots.forEach((d) => {
      d.addEventListener("click", () => {
        goTo(parseInt(d.dataset.index || "0", 10));
        start();
      });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("touchstart", stop, { passive: true });
    root.addEventListener("touchend", start, { passive: true });

    goTo(0);
    start();
  }

  function initPlanSlider(root) {
    initCarousel(root, { track: ".plan-track", slide: ".plan-slide" });
  }

  function initGallerySlider(root) {
    initCarousel(root, { track: ".gallery-track", slide: ".gallery-slide" });
  }

  window.WinkSite = {
    icons,
    telegramAttrs,
    telegramHref,
    renderHeader,
    renderFooter,
    cfg,
    base,
    initPlanSlider,
    initGallerySlider,
    init(active) {
      renderHeader(active);
      renderFooter();
      wireNav();
      wireTelegram();
      wireReveal();
      initPlanSlider(document.getElementById("planSlider"));
      initGallerySlider(document.getElementById("gallerySlider"));
    },
  };
})();
