/* Theme control for the colour-scheme meta tag.
   The design uses the CSS light-dark() function, so switching the meta
   content between "light" / "dark" re-themes the whole page. We keep the
   user's choice in localStorage and mirror it to <html data-theme> so CSS
   can show the correct sun/moon icon on the toggle button. */

(function () {
  'use strict';

  var meta = document.querySelector('meta[name="color-scheme"]');
  var root = document.documentElement;
  var KEY = 'hc-theme';

  function isDark() {
    var content = meta.getAttribute('content');
    if (content === 'light dark') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return content === 'dark';
  }

  function paint() {
    root.setAttribute('data-theme', isDark() ? 'dark' : 'light');
  }

  function apply(content) {
    meta.setAttribute('content', content);
    paint();
  }

  function toggle() {
    apply(isDark() ? 'light' : 'dark');
    try { localStorage.setItem(KEY, isDark() ? 'dark' : 'light'); } catch (e) {}
  }

  // Restore a previously saved choice, otherwise follow the OS.
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  if (saved === 'light' || saved === 'dark') {
    apply(saved);
  } else {
    paint(); // stays on "light dark"
  }

  // Keep icons in sync when the OS theme changes while on "light dark".
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', function () {
      if (meta.getAttribute('content') === 'light dark') paint();
    });

  var btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', toggle);
})();
