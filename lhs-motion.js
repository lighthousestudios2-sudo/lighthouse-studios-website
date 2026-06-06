(function(){
var mo = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mo && mo.matches) return;

var style = document.createElement('style');
style.textContent = [
'.lhs-sr{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}',
'.lhs-sr.lhs-v{opacity:1;transform:translateY(0)}',
'.lhs-d1{transition-delay:.08s}',
'.lhs-d2{transition-delay:.18s}',
'.lhs-d3{transition-delay:.28s}',
'.lhs-d4{transition-delay:.38s}',
'.lhs-d5{transition-delay:.48s}',
'.lhs-ub{position:relative;display:inline-block}',
'.lhs-ub::after{content:"";position:absolute;bottom:-4px;left:0;width:0;height:2px;background:#F2B544;transition:width .5s ease .15s}',
'.lhs-ub.lhs-v::after{width:48px}',
'.btn-primary:hover,.approach-promo-cta:hover,.custom-panel-cta:hover,.re-cta:hover{box-shadow:0 6px 24px rgba(242,181,68,.18)}'
].join('\n');
document.head.appendChild(style);

function tag(selector, delay) {
  var els = document.querySelectorAll(selector);
  for (var i = 0; i < els.length; i++) {
    els[i].classList.add('lhs-sr');
    if (delay === 'stagger') {
      els[i].classList.add('lhs-d' + Math.min(i + 1, 5));
    }
  }
}

function tagUnderline(selector) {
  var els = document.querySelectorAll(selector);
  for (var i = 0; i < els.length; i++) {
    els[i].classList.add('lhs-sr', 'lhs-ub');
  }
}

/* Homepage */
tag('.brand-card', 'stagger');
tag('.about-section .eyebrow');
tag('.about-section h2');
tag('.about-section p');
tagUnderline('.about-section .eyebrow');

/* Marketing page */
tag('.approach-card', 'stagger');
tag('.tier', 'stagger');
tag('.approach-promo-card');
tag('.custom-panel');
tag('.alacarte');
tag('.faq-item', 'stagger');
tag('.contact-form');
tag('.contact-intro');
tag('.work-card', 'stagger');
tag('.system-card', 'stagger');
tag('.adstyle-block', 'stagger');
tag('.adstyles-closer');
tag('.re-feature', 'stagger');
tag('.re-content');
tag('.faq-cta');
tag('.inline-cta');

/* Section headings across all pages */
tag('.section-head h2');
tag('.section-head p');
tag('.section-head .eyebrow');
tag('.about-teaser h2');
tag('.about-teaser .eyebrow');
tag('.cta-block h2');
tag('.cta-block p');
tag('.final-cta h2');
tag('.final-cta p');
tag('.intro h2');
tag('.intro p');
tag('.coming-soon h3');
tag('.coming-soon p');
tagUnderline('.section-head .eyebrow');
tagUnderline('.about-teaser .eyebrow');

/* About page */
tag('.story-section .body p');
tag('.story-section h2');
tag('.founder-photo');
tag('.video-placeholder');
tag('.family-card', 'stagger');

/* FAQs page */
tag('.faq-page .faq-item', 'stagger');

/* Add-ons page */
tag('.alacarte-category');

/* Footer */
tag('.footer-grid');

/* Value strip */
var vs = document.querySelector('.value-strip-inner');
if (vs) vs.classList.add('lhs-sr');

/* Observer */
var observer = new IntersectionObserver(function(entries) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add('lhs-v');
      observer.unobserve(entries[i].target);
    }
  }
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

var targets = document.querySelectorAll('.lhs-sr');
for (var i = 0; i < targets.length; i++) {
  observer.observe(targets[i]);
}

/* Parallax — desktop only */
if (window.innerWidth > 880) {
  var hero = document.querySelector('.hero .container') ||
             document.querySelector('.page-hero .container') ||
             document.querySelector('.page-hero .container-narrow');
  if (hero) {
    var parent = hero.parentElement;
    window.addEventListener('scroll', function() {
      var y = window.pageYOffset;
      if (y < parent.offsetHeight) {
        hero.style.transform = 'translateY(' + (y * 0.2) + 'px)';
      }
    }, { passive: true });
  }
}

})();
