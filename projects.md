---
title: "Projects"
layout: default
---

<a class="back-link" href="/">← Back to home</a>

<header class="page-header">
  <p class="eyebrow">Research &amp; demos</p>
  <h1 class="page-title">Projects</h1>
  <p class="page-subtitle">
    A page about my UROP research on heat index estimation — with a couple of little interactive
    demos that illustrate the ideas behind it.
  </p>
</header>

<section class="project-intro">
  <article class="item-card card">
    <div class="item-card__meta">
      <span class="org">Undergraduate Research Opportunities Programme</span>
      <span class="tag">HKUST</span>
    </div>
    <h2>Heat Index Estimation</h2>
    <p class="skill-card__desc">
      Supervised by Prof. FUNG, Jimmy Chi Hung &middot; co-supervised by Dr. CHAN, Jimmy Wai Man
    </p>
    <p>
      Weather stations only measure temperature at a single point, so two nearby spots can feel
      very different depending on whether the sun is hitting them. The goal of this project is to
      <strong>estimate local heat exposure</strong> — for different times and different places —
      using the <em>Sky-View Factor (SVF)</em>, a number that describes how much open sky a
      location can actually see.
    </p>
    <ul>
      <li><strong>Summer 2025:</strong> predicting localized temperature exposure across times and locations with a Sky-View Factor approach.</li>
      <li><strong>Fall 2025:</strong> visualizing minute-level sunlight patterns with high temporal resolution, and studying map-merging strategies that avoid boundary artifacts.</li>
    </ul>
  </article>
</section>

<section class="section" id="demo-daylight">
  <header class="section__head">
    <p class="eyebrow">Demo 1 · Interactive</p>
    <h2 class="section__title">Daylight &amp; shade in a street</h2>
    <p class="section__lead">
      Drag the sliders to move a "measurement point" along a street and to change the time of day.
      The scene shows why tall buildings can cool a spot down: they shrink the visible sky and
      block the sun.
    </p>
  </header>

  <div class="demo card">
    <canvas id="demo-street" class="demo__canvas" width="720" height="330"
            aria-label="Interactive cross-section of a street between two buildings, with a moving sun and measurement point"></canvas>

    <div class="demo__readouts" aria-live="polite">
      <div class="demo__readout"><span class="demo__label">Time</span><span id="out-time" class="demo__value">12:00</span></div>
      <div class="demo__readout"><span class="demo__label">Sky-view factor</span><span id="out-svf" class="demo__value">—</span></div>
      <div class="demo__readout"><span class="demo__label">Direct sun</span><span id="out-sun" class="demo__value">—</span></div>
    </div>

    <div class="demo__controls">
      <label class="demo__control">
        <span class="demo__control-name">Time of day</span>
        <input id="ctl-time" type="range" min="6" max="19" step="0.25" value="12">
        <span class="demo__control-min">06:00</span>
        <span class="demo__control-max">19:00</span>
      </label>
      <label class="demo__control">
        <span class="demo__control-name">Measurement point</span>
        <input id="ctl-point" type="range" min="0" max="100" step="1" value="50">
        <span class="demo__control-min">left</span>
        <span class="demo__control-max">right</span>
      </label>
    </div>

    <p class="demo__note">
      <strong>What to look for:</strong> near the middle of the street the point sees a lot of sky
      (high sky-view factor). Slide it close to a building — the visible sky shrinks, and once the
      sun drops behind the building (morning and late afternoon) the point falls into shade.
    </p>
  </div>
</section>

<section class="section" id="demo-merge">
  <header class="section__head">
    <p class="eyebrow">Demo 2 · Interactive</p>
    <h2 class="section__title">Merging maps without seams</h2>
    <p class="section__lead">
      Sunlight maps are built from many small tiles that are measured separately. Because each tile
      can be slightly off from its neighbours, simply overlapping them leaves ugly seams. This demo
      lets you compare a <em>naive</em> merge with a <em>feathered</em> merge.
    </p>
  </header>

  <div class="demo card">
    <canvas id="demo-map" class="demo__canvas" width="720" height="300"
            aria-label="Heatmap showing two overlapping measurement tiles merged together"></canvas>

    <div class="demo__readouts" aria-live="polite">
      <div class="demo__readout"><span class="demo__label">Method</span><span id="out-method" class="demo__value">Feathered</span></div>
      <div class="demo__readout"><span class="demo__label">Biggest seam jump</span><span id="out-seam" class="demo__value">0</span></div>
    </div>

    <div class="demo__controls">
      <div class="demo__toggle" role="group" aria-label="Merging method">
        <button type="button" class="demo__btn" data-merge="naive">Naive merge</button>
        <button type="button" class="demo__btn demo__btn--active" data-merge="feather">Feathered merge</button>
      </div>
      <label class="demo__control">
        <span class="demo__control-name">Tile mismatch</span>
        <input id="ctl-mismatch" type="range" min="0" max="60" step="2" value="34">
        <span class="demo__control-min">none</span>
        <span class="demo__control-max">large</span>
      </label>
    </div>

    <p class="demo__note">
      <strong>What to look for:</strong> with a large mismatch, the naive merge shows two visible
      vertical seams where the tiles meet. The feathered merge blends smoothly across the overlap
      and the seam disappears — this is the kind of problem my Fall&nbsp;2025 UROP looked into.
    </p>
  </div>
</section>

<section class="section">
  <p class="section__lead" style="color: var(--muted); font-size: 0.95rem;">
    The demos above are simplified, illustrative models that I built for this page to make the
    research ideas easier to play with — they are <em>not</em> outputs from the actual research
    data.
  </p>
</section>

<script defer src="/assets/js/projects-demo.js"></script>
