/* amp.ire — shared site behaviour.
   The pre-paint theme resolution lives inline in each page's <head>;
   everything that can wait until DOM-ready lives here. */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */

  var btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('ampire-theme', next); } catch (e) {}
    });
  }

  /* Follow the OS as long as the visitor has not chosen manually. */
  var mq = window.matchMedia('(prefers-color-scheme: light)');
  var onSystemChange = function (e) {
    var stored = null;
    try { stored = localStorage.getItem('ampire-theme'); } catch (err) {}
    if (!stored) root.dataset.theme = e.matches ? 'light' : 'dark';
  };
  if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
  else if (mq.addListener) mq.addListener(onSystemChange);

  /* ---------- Missing images fall back to a labelled placeholder ----------
     Nothing to edit by hand: drop the file into assets/ and the placeholder
     disappears on its own. */

  var flagMissing = function (el, holderSelector) {
    var holder = el.closest(holderSelector);
    if (holder) holder.classList.add('missing');
  };

  var watch = function (selector, holderSelector) {
    document.querySelectorAll(selector).forEach(function (img) {
      img.addEventListener('error', function () { flagMissing(img, holderSelector); });
      if (img.complete && img.naturalWidth === 0) flagMissing(img, holderSelector);
    });
  };

  watch('.shot .ss', '.shot');
  watch('.cover img', '.cover');
  watch('.portrait img', '.portrait');

  /* ---------- Footer year ---------- */

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
