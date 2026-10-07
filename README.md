# Personal site — version 2

A hand-written static site: three HTML pages, one stylesheet and one small script.
No Jekyll, no build step, no frameworks, no bundled template. Open `index.html`
in a browser and it works.

## Files

```
v2/
├── index.html          Home
├── cv.html             CV (mirrors the CV PDF)
├── projects.html       Project write-ups
├── .nojekyll           Tells GitHub Pages to skip the Jekyll build
├── assets/
│   ├── styles.css      All styling, both light and dark themes
│   └── theme.js        Light/dark toggle logic
└── README.md
```

All links between pages are relative, so the site works whether it is opened
directly from disk, served locally, or published at the root of a GitHub Pages
site.

## The three nav buttons

`Home`, `CV` and `Projects` sit in a bar across the top of every page. The
current page is marked with `aria-current="page"`, which is what draws the
outlined box around it and tells a screen reader where it is. The bar sticks to
the top of the window as you scroll.

## Light / dark mode

The button at the right of the bar switches themes. There is no flash on load:
a four-line inline script in each page's `<head>` decides the theme before
anything is painted.

The order of preference is:

1. what you chose last time (saved in `localStorage` under `happy-theme`)
2. otherwise, the operating system setting (`prefers-color-scheme`)

Because the choice is per-browser it carries across all three pages. With
JavaScript disabled the site stays in light mode and remains fully readable —
no content is behind the toggle.

## Content source

The pages are built from the LaTeX CV (`Last updated in September 2026` in the
source, published here as "Last updated October 2026"):

| Page | Covers |
|---|---|
| `index.html` | Short introduction, contact details, areas of work |
| `cv.html` | Education, projects & competitions, internships, awards, UROP, course highlights, soft skills, enrichment activities |
| `projects.html` | TrustShop (final year project), the five UROP phases in detail, Cathay Hackathon 2025 |

Two deliberate choices:

- **The mobile number on the CV is not on the website.** A public page gets
  scraped by bots; the PDF still carries it for applications. Add it to the
  `<dl>` in `index.html` and to the `cv.html` header if you want it public.
- **The CV's `\hspace{...}0` block** in the LaTeX is a spacing artifact that
  renders a stray `0` after the "Last updated" line. It is not carried over
  here.

## Still to do

1. **The CV PDF has not been copied into this folder.** The "Download CV (PDF)"
   buttons point at `happychoi_cv.pdf`, which needs to sit in `v2/`. Copy it
   over from the repo root:

   ```powershell
   Copy-Item D:\webpage\lhchoihappy.github.io\happychoi_cv.pdf D:\webpage\v2\happychoi_cv.pdf
   ```

2. **Consider refreshing the PDF itself.** The copy in the repository is the old
   one; the LaTeX above is the current content.

3. **Review the rewording.** The CV's terse bullet style ("Perform UAT Testing")
   has been written out as full sentences to read naturally on a web page. If
   any line now overstates what you did, tell me and I will dial it back.

## Publishing

The site is plain files, so deployment is a straight copy to the repository
that GitHub Pages serves.

To preview locally:

```powershell
# any static server works; opening index.html directly is also fine
python -m http.server 8000
```

To publish, replace the contents of the `lhchoihappy.github.io` repository with
the contents of this folder, keeping `happychoi_cv.pdf` at the root so any saved
`/happychoi_CV.pdf` links continue to resolve. Then commit and push. The old
Jekyll site stays intact in this working copy until you decide to remove it.

Note that the old site's `_config.yml` advertised `happpys374@gmail.com` and an
Instagram link. Neither appears on the current CV, so the new pages use the
HKUST address and LinkedIn instead. If you still want Instagram, say so and I
will add it back.

## Notes on the design

The goal was to look like a normal, hand-made web page rather than a generated
landing page. That means: one accent colour, system fonts, a readable measure of
about 62 characters, underlined links, visible focus outlines, and no cards,
gradients, or animation beyond the theme colour fading over 0.18s. Print styles
are included, so `Ctrl+P` on `cv.html` gives a clean paper copy with the nav bar
and footer removed.
