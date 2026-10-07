/* ==========================================================================
   Theme switching (light <-> dark)
   --------------------------------------------------------------------------
   The initial theme is applied by a tiny inline script in each page's <head>
   so the page never flashes the wrong colours. This file only wires up the
   button and remembers the choice.
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'happy-theme';
  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);

    var button = document.getElementById('theme-toggle');
    if (!button) return;

    // The button is an action, so it is labelled with what clicking will do.
    var next = theme === 'dark' ? 'light' : 'dark';
    var label = next.charAt(0).toUpperCase() + next.slice(1) + ' mode';
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    button.setAttribute('aria-label', 'Switch to ' + next + ' mode');
    button.title = 'Switch to ' + next + ' mode';

    var text = document.getElementById('theme-toggle-label');
    if (text) text.textContent = label;
  }

  function store(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* Private browsing or blocked storage: the theme still applies to this
         page view, it just will not be remembered on the next page. */
    }
  }

  function init() {
    applyTheme(currentTheme());

    var button = document.getElementById('theme-toggle');
    if (!button) return;

    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
