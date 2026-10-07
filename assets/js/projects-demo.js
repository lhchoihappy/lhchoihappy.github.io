/* Interactive demos for the Projects page (heat-index / sky-view research).
   Two self-contained demos:
   1. "Daylight & shade in a street" - a cross-section between two buildings where you move
      a measurement point and the time of day; shows sky-view factor and whether the sun
      reaches the point.
   2. "Merging maps without seams" - two overlapping measurement tiles merged naively vs.
      with a feathered blend, demonstrating boundary artifacts.
   All models are illustrative (not research data). */

(function () {
  'use strict';

  /* ---------- small helpers ---------- */
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function deg(rad) { return (rad * 180) / Math.PI; }

  function hexToRgb(h) {
    var n = parseInt(h.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToCss(rgb, alpha) {
    var r = Math.round(rgb[0]), g = Math.round(rgb[1]), b = Math.round(rgb[2]);
    if (alpha == null) return 'rgb(' + r + ',' + g + ',' + b + ')';
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }
  function mix(a, b, t) {
    var ca = hexToRgb(a), cb = hexToRgb(b);
    return [ca[0] + (cb[0] - ca[0]) * t, ca[1] + (cb[1] - ca[1]) * t, ca[2] + (cb[2] - ca[2]) * t];
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtTime(hours) {
    hours = clamp(hours, 6, 19);
    var hh = Math.floor(hours);
    var mm = Math.round((hours - hh) * 60);
    if (mm === 60) { hh += 1; mm = 0; }
    return pad(hh) + ':' + pad(mm);
  }
  /* viridis-ish / heat ramp */
  function heatColor(v) {
    v = clamp(v, 0, 1);
    var stops = [
      [0.0, '#2d4bc7'],   /* deep indigo */
      [0.28, '#008fb3'],  /* teal */
      [0.55, '#26c26e'],  /* green */
      [0.78, '#f2d53c'],  /* yellow */
      [1.0, '#e8442a']    /* red */
    ];
    for (var i = 1; i < stops.length; i++) {
      if (v <= stops[i][0]) {
        var a = stops[i - 1], b = stops[i];
        var t = (v - a[0]) / (b[0] - a[0]);
        var c = mix(a[1], b[1], t);
        return rgbToCss(c);
      }
    }
    return rgbToCss(hexToRgb(stops[stops.length - 1][1]));
  }

  /* =====================================================================
     DEMO 1 — Daylight & shade in a street
     ===================================================================== */
  function initStreetDemo() {
    var canvas = document.getElementById('demo-street');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;

    var GROUND = 272;            /* y of the street surface */
    var LEFT = { x1: 118, top: 116 };   /* building face occupies x in [0,118] */
    var RIGHT = { x0: 602, top: 158 };  /* building face occupies x in [602,W]  */

    var timeInput = document.getElementById('ctl-time');
    var pointInput = document.getElementById('ctl-point');
    var outTime = document.getElementById('out-time');
    var outSvf = document.getElementById('out-svf');
    var outSun = document.getElementById('out-sun');

    function measure(time, pct) {
      var dayFrac = (time - 6) / (19 - 6);          /* 0..1 across the day */
      var sunK = Math.max(0.02, Math.sin(Math.PI * dayFrac)); /* 0..1 height */
      var xS = lerp(150, W - 150, dayFrac);
      var yS = GROUND - (GROUND - 24) * sunK;

      var px = lerp(LEFT.x1 + 10, RIGHT.x0 - 10, clamp(pct, 0, 100) / 100);

      /* building top angles as seen from the point (degrees above horizon) */
      var dL = px - LEFT.x1;          /* distance to left building face */
      var dR = RIGHT.x0 - px;         /* distance to right building face */
      var hL = GROUND - LEFT.top;
      var hR = GROUND - RIGHT.top;
      var elevL = deg(Math.atan2(hL, Math.max(dL, 1)));
      var elevR = deg(Math.atan2(hR, Math.max(dR, 1)));

      /* sky-view factor = visible sky arc / 180 deg */
      var svf = clamp((180 - elevL - elevR) / 180, 0, 1);

      /* direct sun: is the sun above the building that stands between it and the point? */
      var inSun = false;
      var dx = xS - px;
      var dy = GROUND - yS;
      var dist = Math.abs(dx);
      var sunElev = deg(Math.atan2(dy, Math.max(dist, 1)));
      if (dist < 2) {
        inSun = svf > 0.05;
      } else if (dx < 0) {          /* sun to the left */
        inSun = px > LEFT.x1 && sunElev > elevL;
      } else {                       /* sun to the right */
        inSun = px < RIGHT.x0 && sunElev > elevR;
      }

      return { px: px, xS: xS, yS: yS, sunK: sunK, elevL: elevL, elevR: elevR, svf: svf, inSun: inSun, sunElev: sunElev };
    }

    function draw(time, pct) {
      var m = measure(time, pct);

      /* sky */
      var topSky = mix('#7fb0ff', '#f7bd7e', 1 - m.sunK);
      var lowSky = mix('#cfe3ff', '#ffd9a8', 1 - m.sunK);
      var sky = ctx.createLinearGradient(0, 0, 0, GROUND);
      sky.addColorStop(0, rgbToCss(topSky));
      sky.addColorStop(1, rgbToCss(lowSky));
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, GROUND);

      /* ground */
      var ground = ctx.createLinearGradient(0, GROUND, 0, H);
      ground.addColorStop(0, '#b9c0cb');
      ground.addColorStop(1, '#8f979f');
      ctx.fillStyle = ground;
      ctx.fillRect(0, GROUND, W, H - GROUND);
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillRect(0, GROUND, W, 2);

      /* buildings */
      ctx.fillStyle = '#59616f';
      ctx.fillRect(0, LEFT.top, LEFT.x1, GROUND - LEFT.top);
      ctx.fillRect(RIGHT.x0, RIGHT.top, W - RIGHT.x0, GROUND - RIGHT.top);
      ctx.fillStyle = '#3e4551';
      ctx.fillRect(0, LEFT.top, LEFT.x1, 4);
      ctx.fillRect(RIGHT.x0, RIGHT.top, W - RIGHT.x0, 4);

      /* visible sky wedge + sight lines from the point to building tops */
      ctx.beginPath();
      ctx.moveTo(m.px, GROUND);
      ctx.lineTo(LEFT.x1, LEFT.top);
      ctx.lineTo(RIGHT.x0, RIGHT.top);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(m.px, GROUND);
      ctx.lineTo(LEFT.x1, LEFT.top);
      ctx.moveTo(m.px, GROUND);
      ctx.lineTo(RIGHT.x0, RIGHT.top);
      ctx.stroke();
      ctx.setLineDash([]);

      /* sun */
      var sunR = 15;
      var glow = ctx.createRadialGradient(m.xS, m.yS, 2, m.xS, m.yS, sunR * 3);
      glow.addColorStop(0, 'rgba(255,200,60,0.35)');
      glow.addColorStop(1, 'rgba(255,200,60,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(m.xS, m.yS, sunR * 3, 0, Math.PI * 2);
      ctx.fill();

      if (!m.inSun) ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#ffd23c';
      ctx.strokeStyle = '#f5a623';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(m.xS, m.yS, sunR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;

      /* measurement point marker */
      ctx.strokeStyle = m.inSun ? 'rgba(214,138,0,0.8)' : 'rgba(70,110,220,0.85)';
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(m.px, 10);
      ctx.lineTo(m.px, GROUND - 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = m.inSun ? '#f6a623' : '#4a7de0';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(m.px, GROUND, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      /* labels */
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.font = '700 15px "Space Grotesk", "Segoe UI", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('building', 14, GROUND - 8);
      ctx.textAlign = 'right';
      ctx.fillText('building', W - 16, GROUND - 8);

      /* readouts */
      outTime.textContent = fmtTime(time);
      outSvf.textContent = Math.round(m.svf * 100) + '%';
      outSun.textContent = m.inSun ? 'Yes ☀' : 'No';
      outSun.className = 'demo__value ' + (m.inSun ? 'is-good' : 'is-bad');
      outSvf.className = 'demo__value';
      var svfEl = outSvf;
      svfEl.style.color = '';
      if (m.svf < 0.25) { svfEl.classList.add('is-bad'); }
      else if (m.svf > 0.6) { svfEl.classList.add('is-good'); }
    }

    function render() {
      draw(parseFloat(timeInput.value), parseFloat(pointInput.value));
    }
    timeInput.addEventListener('input', render);
    pointInput.addEventListener('input', render);
    render();
  }

  /* =====================================================================
     DEMO 2 — Merging maps without seams
     ===================================================================== */
  function initMapDemo() {
    var canvas = document.getElementById('demo-map');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;
    var CELL = 6;
    var cols = Math.floor(W / CELL);
    var rows = Math.floor(H / CELL);

    var tileAEnd = 0.75;   /* tile A covers u in [0, tileAEnd] */
    var tileBStart = 0.25; /* tile B covers u in [tileBStart, 1] */

    var mismatchInput = document.getElementById('ctl-mismatch');
    var outMethod = document.getElementById('out-method');
    var outSeam = document.getElementById('out-seam');
    var buttons = document.querySelectorAll('.demo__btn[data-merge]');

    var method = 'feather';

    /* smooth "true" field: a couple of warm blobs over a cool base */
    function field(u, v) {
      var g = function (cx, cy, s) {
        var dx = (u - cx), dy = (v - cy);
        return Math.exp(-(dx * dx + dy * dy) / s);
      };
      return 0.35 * g(0.42, 0.5, 0.05) + 0.5 * g(0.66, 0.42, 0.03) + 0.2 * g(0.2, 0.62, 0.04);
    }
    /* per-tile deterministic noise */
    function noise(x, seed) {
      return 0.035 * Math.sin(x * 38 + seed * 9.7) * Math.cos(x * 23 + seed * 4.1);
    }

    function valueA(u, v, bias) { return field(u, v) + bias + noise(u, 1); }
    function valueB(u, v, bias) { return field(u, v) - bias + noise(u, 2); }

    function merged(u, v, bias) {
      if (u <= tileBStart) return valueA(u, v, bias);
      if (u >= tileAEnd) return valueB(u, v, bias);
      if (method === 'naive') return (valueA(u, v, bias) + valueB(u, v, bias)) / 2;
      var w = (u - tileBStart) / (tileAEnd - tileBStart);
      return valueA(u, v, bias) * (1 - w) + valueB(u, v, bias) * w;
    }

    function draw() {
      var mismatch = parseInt(mismatchInput.value, 10) || 0;
      var bias = (mismatch / 60) * 0.24;

      /* find value range for a nice colour scale */
      var vals = [];
      for (var c = 0; c < cols; c++) {
        for (var r = 0; r < rows; r++) {
          var u = (c + 0.5) / cols, v = (r + 0.5) / rows;
          vals.push(merged(u, v, bias));
        }
      }
      var min = Math.min.apply(null, vals);
      var max = Math.max.apply(null, vals);
      var span = Math.max(max - min, 1e-6);

      for (var cc = 0; cc < cols; cc++) {
        for (var rr = 0; rr < rows; rr++) {
          var uu = (cc + 0.5) / cols, vv = (rr + 0.5) / rows;
          var val = merged(uu, vv, bias);
          ctx.fillStyle = heatColor((val - min) / span);
          ctx.fillRect(cc * CELL, rr * CELL, CELL + 0.5, CELL + 0.5);
        }
      }

      /* tile edges */
      var xA = tileAEnd * W, xB = tileBStart * W;
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xB, 0); ctx.lineTo(xB, H);
      ctx.moveTo(xA, 0); ctx.lineTo(xA, H);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(17,20,28,0.75)';
      ctx.font = '700 13px "Space Grotesk", "Segoe UI", sans-serif';
      ctx.fillText('tile A', 10, 22);
      ctx.textAlign = 'right';
      ctx.fillText('tile B', W - 10, 22);
      ctx.textAlign = 'left';

      /* biggest seam: max over rows of the abs column-to-column jump at the two edges */
      var seam = 0;
      [Math.round(tileBStart * cols), Math.round(tileAEnd * cols)].forEach(function (colIdx) {
        if (colIdx <= 0 || colIdx >= cols) return;
        for (var r2 = 0; r2 < rows; r2++) {
          var u1 = (colIdx - 0.5) / cols, u2 = (colIdx + 0.5) / cols;
          var v2 = (r2 + 0.5) / rows;
          var d = Math.abs(merged(u1, v2, bias) - merged(u2, v2, bias));
          if (d > seam) seam = d;
        }
      });

      outMethod.textContent = method === 'naive' ? 'Naive' : 'Feathered';
      outSeam.textContent = (seam / span * 100).toFixed(0) + '%';
      outSeam.className = 'demo__value ' + (seam / span > 0.12 ? 'is-bad' : 'is-good');
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        method = btn.getAttribute('data-merge');
        buttons.forEach(function (b) { b.classList.remove('demo__btn--active'); });
        btn.classList.add('demo__btn--active');
        draw();
      });
    });
    mismatchInput.addEventListener('input', draw);
    draw();
  }

  function init() {
    initStreetDemo();
    initMapDemo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
