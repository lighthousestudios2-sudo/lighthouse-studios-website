/* ============================================================
   Lighthouse Studios — Motion Layer v2
   ============================================================
   Works across all LHS pages. Add to your repo root.
   Add before </body> on every page:
     <script src="/lhs-motion.js"></script>
   
   Doesn't replace anything. Doesn't touch your existing
   .reveal classes (those handle hero on page load).
   This adds scroll-triggered animations for everything
   below the fold + hover micro-interactions.
   ============================================================ */

(function () {
  'use strict';

  // Bail if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── INJECT CSS ── */
  const css = document.createElement('style');
  css.textContent = `

    /* Scroll-triggered fade-up — applied by JS */
    .lhs-scroll-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s cubic-bezier(0.25, 0.1, 0.25, 1),
                  transform 0.65s cubic-bezier(0.25, 0.1, 0.25, 1);
      will-change: opacity, transform;
    }
    .lhs-scroll-reveal.lhs-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Stagger delays for grid children */
    .lhs-stagger-1 { transition-delay: 0.08s; }
    .lhs-stagger-2 { transition-delay: 0.18s; }
    .lhs-stagger-3 { transition-delay: 0.28s; }
    .lhs-stagger-4 { transition-delay: 0.38s; }
    .lhs-stagger-5 { transition-delay: 0.48s; }

    /* Card lift on hover — enhances existing hover */
    .brand-card,
    .family-card,
    .tier,
    .work-card,
    .adstyle-block,
    .re-feature {
      transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
                  box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
                  border-color 0.3s ease;
    }

    /* Button pulse on hover */
    .btn-primary,
    .nav-cta,
    .approach-promo-cta,
    .custom-panel-cta,
    .form-submit,
    .re-cta {
      transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
    }
    .btn-primary:hover,
    .approach-promo-cta:hover,
    .custom-panel-cta:hover,
    .re-cta:hover {
      box-shadow: 0 6px 24px rgba(242, 181, 68, 0.18);
    }

    /* Social icons — stagger entrance */
    .footer-social a {
      transition: all 0.22s ease,
                  opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
                  transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    /* Gold underline draw on section eyebrows */
    .lhs-underline {
      position: relative;
      display: inline-block;
    }
    .lhs-underline::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #F2B544;
      transition: width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0.15s;
    }
    .lhs-underline.lhs-visible::after {
      width: 48px;
    }

    /* Value strip items fade in with stagger */
    .value-strip-inner span {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .value-strip-inner.lhs-visible span {
      opacity: 1;
      transform: translateY(0);
    }
    .value-strip-inner.lhs-visible span:nth-child(1) { transition-delay: 0.05s; }
    .value-strip-inner.lhs-visible span:nth-child(2) { transition-delay: 0.12s; }
    .value-strip-inner.lhs-visible span:nth-child(3) { transition-delay: 0.19s; }
    .value-strip-inner.lhs-visible span:nth-child(4) { transition-delay: 0.26s; }
    .value-strip-inner.lhs-visible span:nth-child(5) { transition-delay: 0.33s; }
    .value-strip-inner.lhs-visible span:nth-child(6) { transition-delay: 0.40s; }

    /* Hero parallax — desktop only */
    @media (min-width: 881px) {
      .hero .container,
      .page-hero .container,
      .page-hero .container-narrow {
        transition: transform 0s linear;
      }
    }
  `;
  document.head.appendChild(css);


  /* ── TAG ELEMENTS FOR SCROLL REVEAL ── */

  function tagElements() {
    // Section headings and eyebrows
    document.querySelectorAll(
      'section .eyebrow, .section-head .eyebrow, .faq-intro .eyebrow'
    ).forEach(el => {
      el.classList.add('lhs-scroll-reveal', 'lhs-underline');
    });

    document.querySelectorAll(
      'section h2, .section-head h2, .about-teaser h2, .faq-intro h2, .cta-block h2, .final-cta h2, .coming-soon h3, .family-head h3, .intro h2'
    ).forEach(el => {
      el.classList.add('lhs-scroll-reveal');
    });

    // Section body paragraphs (not hero — hero already has .reveal)
    document.querySelectorAll(
      '.section-head p, .about-teaser p, .about-section p, .faq-intro p, .cta-block p, .final-cta p, .intro p, .coming-soon p'
    ).forEach(el => {
      if (!el.closest('.hero') && !el.closest('.page-hero')) {
        el.classList.add('lhs-scroll-reveal');
      }
    });

    // Grid children with stagger — brand cards, tier cards, approach cards, etc.
    const grids = [
      '.brand-grid', '.approach-grid', '.tiers', '.work-grid',
      '.adstyles-grid', '.system-grid', '.family-grid', '.brands-grid'
    ];
    grids.forEach(selector => {
      const grid = document.querySelector(selector);
      if (!grid) return;
      Array.from(grid.children).forEach((child, i) => {
        child.classList.add('lhs-scroll-reveal', `lhs-stagger-${i + 1}`);
      });
    });

    // Standalone cards and blocks
    document.querySelectorAll(
      '.approach-promo-card, .custom-panel, .alacarte, .adstyles-closer, .contact-form, .contact-intro, .re-content, .re-features'
    ).forEach(el => {
      el.classList.add('lhs-scroll-reveal');
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach((el, i) => {
      el.classList.add('lhs-scroll-reveal', `lhs-stagger-${Math.min(i + 1, 5)}`);
    });

    // Value strip
    const valueStrip = document.querySelector('.value-strip-inner');
    if (valueStrip) {
      valueStrip.classList.add('lhs-scroll-reveal');
    }

    // Footer
    const footerGrid = document.querySelector('.footer-grid');
    if (footerGrid) {
      footerGrid.classList.add('lhs-scroll-reveal');
    }

    // GEO detail rows on approach page
    document.querySelectorAll('.section > .container > div[style*="flex-direction"]').forEach(el => {
      el.classList.add('lhs-scroll-reveal');
    });

    // About page story paragraphs
    document.querySelectorAll('.story-section .body p').forEach(el => {
      el.classList.add('lhs-scroll-reveal');
    });

    // Founder photo and video placeholders
    document.querySelectorAll('.founder-photo, .video-placeholder').forEach(el => {
      el.classList.add('lhs-scroll-reveal');
    });

    // Inline CTAs
    document.querySelectorAll('.inline-cta, .faq-cta').forEach(el => {
      el.classList.add('lhs-scroll-reveal');
    });

    // Buttons below sections (not nav, not hero)
    document.querySelectorAll(
      '.tier-cta, .cta-block .btn-primary, .final-cta .btn, .intro .btn-primary'
    ).forEach(el => {
      el.classList.add('lhs-scroll-reveal');
    });
  }


  /* ── INTERSECTION OBSERVER ── */

  function initObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lhs-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.lhs-scroll-reveal').forEach(el => {
      observer.observe(el);
    });
  }


  /* ── PARALLAX ── */

  function initParallax() {
    if (window.innerWidth < 881) return;

    const heroContainer =
      document.querySelector('.hero .container') ||
      document.querySelector('.page-hero .container') ||
      document.querySelector('.page-hero .container-narrow');

    if (!heroContainer) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          const heroHeight = heroContainer.parentElement.offsetHeight;
          if (scrollY < heroHeight) {
            heroContainer.style.transform = `translateY(${scrollY * 0.25}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  /* ── INIT ── */

  function init() {
    tagElements();
    initObserver();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
