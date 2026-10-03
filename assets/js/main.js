/* C5GAME 速览站 · 交互脚本（原生 JS，零依赖） */
(function () {
  'use strict';

  /* 1. data-link 按钮统一读 SITE_LINKS 并绑定跳转 */
  function bindLinks() {
    var links = window.SITE_LINKS || {};
    document.querySelectorAll('[data-link]').forEach(function (el) {
      var key = el.getAttribute('data-link');
      var url = links[key];
      if (url) {
        el.setAttribute('href', url);
        el.setAttribute('rel', 'noopener');
        if (el.tagName === 'A') {
          el.setAttribute('target', '_blank');
        }
      }
    });
  }

  /* 2. 移动端导航展开/收起 */
  function bindNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 3. 返回顶部按钮：下滚后出现 */
  function bindBackTop() {
    var btn = document.getElementById('backTop');
    if (!btn) return;
    var onScroll = function () {
      btn.classList.toggle('show', window.scrollY > 320);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 4. 滚入渐显（尊重 prefers-reduced-motion） */
  function bindReveal() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items = document.querySelectorAll('.reveal');
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* 5. FAQ 手风琴（details/summary 原生，这里只做互斥展开） */
  function bindFaq() {
    var all = document.querySelectorAll('details.faq-item');
    all.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) {
          all.forEach(function (o) { if (o !== d) o.open = false; });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindLinks();
    bindNav();
    bindBackTop();
    bindReveal();
    bindFaq();
  });
})();
