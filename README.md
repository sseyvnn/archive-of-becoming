# ARCHIVE OF BECOMING — SEYVN portfolio

A React + Vite portfolio built around one archival, documentary voice
(IBM Plex Mono throughout — hierarchy comes from size/weight/case/tracking,
never a second typeface). The site is titled **Archive of Becoming**; SEYVN
is the creative identity behind it, and appears only in the marquee and in
quiet metadata (footer, About) — never as a giant hero title.

Routes: `/` (landing/work), `/work`, `/about`, `/cv`, `/contact`,
`/project/:slug`. There is no navbar and no hero section anywhere — the
Index list (at the bottom of the landing page) is the only site navigation.

## Running it locally

This project was built and syntax-verified in a sandboxed environment with
no access to the npm registry, so the dependencies have **not** been
installed or run here. On your own machine, with normal internet access:

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

```bash
npm run build     # production build to dist/
npm run preview   # preview that production build locally
```

To regenerate the placeholder media:

```bash
npm run generate:placeholders
```

I verified every file bundles cleanly (correct JSX/JS syntax, every import
path resolves) using a dependency-free bundler as a stand-in, and separately
built and exercised a full interactive copy of the app in a headless browser
(routing, hover states, the project board's layout/lightbox/mobile reflow,
overflow at six breakpoints) to catch real rendering bugs before handing
this back. Please still run it locally yourself and tell me about anything
that looks or behaves wrong.

## File structure

```
seyvn/
  scripts/
    generate-placeholders.mjs     # regenerates the neutral SVG/MP4/WEBM placeholders
  src/
    assets/placeholders/          # placeholder media, one folder per project slug
    components/
      Marquee/                    # the small SEYVN identity strip (no separators)
      WorkField/                   # the landing editorial field of 16:9 thumbnails + labels
      ProjectReferences/            # the WORK / 2026 legend list (8 projects)
      IndexNav/                     # WORK / ABOUT / CV / CONTACT navigation
      Footer/                       # the micro footer
      Cursor/                       # restrained custom cursor (desktop only)
      ProjectBoard/                 # the individual project's "process board"
        ProjectBoard.jsx             # lays out artifacts + connecting lines
        Artifact.jsx                 # one node on the board (image/video/text/info)
        Connections.jsx              # thin SVG lines between related artifacts
        Lightbox.jsx                 # click-to-expand for image/video artifacts
    context/
      ProjectHoverContext.jsx       # shared hover state (field ↔ reference list)
    hooks/
      useReducedMotion.js
      usePointerFine.js
    data/
      projects.js                   # <-- all 8 projects and their project boards
      workField.js                  # <-- landing thumbnails: which, where, what media
      siteConfig.js                 # <-- identity + About/Contact content
      cv.js                         # <-- CV/résumé content
    pages/
      Work.jsx                      # composes the whole landing page
      About.jsx / About.css
      CV.jsx / CV.css
      Contact.jsx / Contact.css
      Project.jsx / Project.css     # renders <ProjectBoard> + prev/next nav
    styles/
      variables.css                  # design tokens (color, spacing, board grid)
      typography.css                 # the single archival mono type scale
      globals.css                    # resets + base page rules + shared .page-kicker
    App.jsx                          # routes
    main.jsx                         # entry point
```

## 1. Every major file changed or added in this revision

- `index.html` — title/meta updated to Archive of Becoming.
- `src/styles/typography.css` — rewritten: single IBM Plex Mono voice, new
  smaller type scale end-to-end.
- `src/styles/variables.css` — board/field grid tokens replaced the old
  masonry-grid tokens.
- `src/styles/globals.css` — added the shared `.page-kicker` class used by
  every inner page's "SECTION / NN" heading.
- `src/components/Marquee/Marquee.css` — shrunk height/type size, removed
  the separator glyph between repetitions entirely.
- `src/components/IndexNav/IndexNav.jsx` — renumbered to WORK/00, ABOUT/01,
  CV/02, CONTACT/03.
- `src/components/Footer/Footer.jsx` — now names both "Archive of Becoming"
  and "Becoming SEYVN".
- `src/components/ProjectField/gridPresets.js` — replaced the old
  `sm/md/lg/wide/tall` size lookup with a direct `col/colSpan/row/rowSpan`
  passthrough, since the field is now explicitly, individually composed.
- `src/components/ProjectField/ProjectField.css`,
  `src/components/ProjectMedia/ProjectMedia.jsx` / `.css` — switched from
  auto-packed masonry to explicit placement (no `grid-auto-flow: dense`).
- `src/data/projects.js` — fully rewritten: the 8 new projects (exact
  titles/descriptions you gave me), the landing field's explicit 16-item
  layout, and each project's `projectBoard` data (new).
- `src/data/siteConfig.js` (new) — identity, About content, Contact content.
- `src/data/cv.js` (new) — CV/résumé content.
- `src/pages/About.jsx` / `.css` (new design) — full editorial About page.
- `src/pages/CV.jsx` / `.css` (new design) — full archival CV page.
- `src/pages/Contact.jsx` / `.css` (new design) — full Contact page.
- `src/pages/Project.jsx` / `.css` (new design) — the process-board project
  page, previously a bare placeholder.
- `src/components/ProjectBoard/*` (new) — `ProjectBoard.jsx`, `Artifact.jsx`,
  `Connections.jsx`, `Lightbox.jsx`, `ProjectBoard.css`.
- `scripts/generate-placeholders.mjs` — regenerated for the 8 new project
  slugs and their artifact media.
- `src/pages/Placeholder.css` — removed (no page uses a bare placeholder
  design anymore).

## 2. Where project data lives

`src/data/projects.js`. Each of the 8 projects is one object in the
`projects` array (`title`, `shortDescription`, `fullDescription`, `year`,
`role`, `disciplines`, `tools`, `landingMedia`). Every project's
`projectBoard` (its process-board artifacts + connections) is generated at
the bottom of the file via `buildBoard()` — see question 8/9/10 below.

## 3. How to add or remove landing media

Add or remove objects in a project's `landingMedia` array (image or video
shape — see the existing entries). Then add or remove that item's
`{ projectId, mediaIndex, ...layout }` entry in the `landingLayout` array
further down the same file — an item only appears on the landing page if
it has an entry there (it's still reachable from its own project page
either way, since that reads `landingMedia` directly).

## 4. How to position landing media

Each `landingLayout` entry has `col`/`row` (starting cell) and
`colSpan`/`rowSpan` (size in cells) on the fixed 24-column desktop grid
(`--board-columns` in `variables.css`). Placement is explicit, not
auto-packed, so you're always composing intentional negative space, not
filling a grid. `wide: true` also makes that tile span both columns in the
2-column mobile layout. Nudge/resize by changing these numbers directly —
there's no visual editor, but the numbers are the whole layout.

## 5. Where About content lives

`src/data/siteConfig.js` → `aboutContent` (statement, `archiveStatement`,
`practice`/`education`/`currentlyExploring`/`tools` lists) and `identity`.
The portrait is a labelled placeholder box in `About.jsx` — see question 11.

## 6. Where CV content lives

`src/data/cv.js` — `experience`, `education`, `selectedProjectSlugs` (which
projects show under "Selected Projects" — currently 01/04/07),
`technologies`, `additional`, and `downloadHref` (see question 12).

## 7. Where Contact information lives

`src/data/siteConfig.js` → `contactContent` (`openTo` list and `channels`).
Each channel is `{ label, value, href }` — see question 11 for how to turn
a placeholder into a real link.

## 8. How to create project artifacts

Each project's board is built by `buildBoard()` in `projects.js` from a
`boardContent[project.id]` entry (`media.final/prototype/interface` +
`notes.research/experiment/model`). To add an eighth artifact type or
change what a project's board contains, edit `buildBoard()` itself (it
currently always produces the same 7 roles: info, final, prototype,
research, experiment, interface, model/process-note) — the per-project
content is data, the shape is shared code, so no project's layout is
hand-authored twice.

## 9. How to position project artifacts

`BOARD_SLOTS` at the top of `projects.js` is the one shared coordinate
template (percentage `x`/`y`/`width`, used by every project's board) —
change a slot there and every project's board shifts together. An
individual artifact's `x`/`y`/`width` in the final `projectBoard.artifacts`
array can also be overridden per-project if one project's board needs a
different arrangement.

## 10. How to connect artifacts

`BOARD_CONNECTIONS` in `projects.js` — an array of `[fromKey, toKey]` pairs
(using the same role keys as `BOARD_SLOTS`: `info`, `final`, `prototype`,
`research`, `experiment`, `interface`, `model`). These become the thin
lines drawn by `Connections.jsx`. Add or remove a pair to change which
artifacts are shown as related.

## 11. How to replace placeholder media

Same pattern everywhere: put the real file under `src/assets/` (a
per-project subfolder is the existing convention), import it at the top of
`projects.js`, and swap it into the relevant `src`/`sources`/`alt` field —
in `landingMedia`, or in a project's `boardContent` entry. For the About
portrait, replace the placeholder block in `About.jsx` with a real `<img>`
and delete the `[Placeholder — replace with a real image]` note. For
Contact, replace a channel's `value`/`href` in `siteConfig.js` — while
`href` is `null` the page shows it as a visibly-tagged placeholder rather
than a real link, so once you fill in `href` that tag disappears
automatically.

## 12. How to add the actual CV PDF

Add the real file to `/public/cv.pdf` (create a `public/` folder at the
project root if it doesn't exist yet — Vite serves anything there at the
site root). `downloadHref` in `src/data/cv.js` already points at `/cv.pdf`,
so the "Download CV ↗" link will work as soon as the file exists there; the
placeholder note under it in `CV.jsx` can be deleted at the same time.

## 13. How desktop/mobile project layouts differ

They share one set of DOM nodes — `ProjectBoard.jsx` renders each artifact
exactly once. On desktop (`ProjectBoard.css`), `.board-artifact` is
positioned absolutely by its `x`/`y`/`width` percentages inside a
fixed-height `.project-board`, with `Connections.jsx`'s thin SVG lines
drawn on top — a spatial composition. Below 720px, the same elements switch
to `position: static` in a column flex layout and take `order:
var(--mobile-order)` (computed in `ProjectBoard.jsx` from a fixed reading
sequence — info → research → prototype → model → experiment → interface →
final) instead of a spatial position, and the connecting lines are hidden —
an intentional linear editorial sequence rather than a shrunk board.

## 14. Placeholder information still remaining

Per your instruction not to invent anything not already in the codebase,
these are all clearly marked and waiting on real information:

- **All project artifact/media imagery and the one video clip** —
  generated neutral placeholders (`src/assets/placeholders/`).
- **About portrait** — a labelled empty box (`[Placeholder — replace with a
  real image]`).
- **CV**: the one Experience entry is entirely placeholder
  (period/role/company/location/description); both Education entries use
  your real fields of study (Computer Science, Cybersecurity) but
  placeholder institution/location/period; "Additional" is a placeholder
  line; the CV PDF itself doesn't exist yet (see question 12).
- **Contact**: Email/Instagram/LinkedIn are placeholder values with a
  visible "placeholder" tag and no real `href` — I did not invent handles.
  Location ("Columbus, OH" / "Available for relocation / New York
  opportunities") is the real content you gave me.
- **Project board process notes** ("Research", "Experiment", "Process
  Note" text artifacts) are all explicitly prefixed `[Placeholder]` —
  they're reserved space for real process writing, not invented history.
- Nothing else (project titles, descriptions, tools, the About statement,
  the Archive of Becoming statement, the Open To list) is placeholder —
  those are the exact content you gave me.

## Design notes for future you

- No Tailwind, no cards, no shadows, no rounded corners, no gradients —
  plain CSS custom properties + component-scoped stylesheets.
- The landing field and every project board share one placement philosophy:
  explicit `x/y` (or `col/row`) coordinates you author by hand, never
  auto-packed — negative space is treated as part of the composition, not
  empty space to fill.
- Framer Motion is used in exactly one place (a single quiet fade-in on
  first load) plus a global `MotionConfig reducedMotion="user"` — resist
  adding motion just because the library is installed.

## Landing thumbnail field (WorkField)

`src/data/workField.js` is the only file you edit to change the landing
composition. Each entry is one 16:9 thumbnail + label: set `thumbnail` to
`{ type: 'image', src, alt }` or `{ type: 'video', sources, poster, alt }`
(it stays a flat placeholder while `null`), and move it with
`layout.desktop/tablet/mobile` (`x`, `w`, `pull`, `label` — documented at the
top of that file). Title/description/link are pulled from `projects.js` via
`slug` (or set them directly on the entry). The Gucci SS27 project is not
added yet — see the note in `workField.js` for the two ways to add it.

## Marquee

`Marquee.jsx` measures one "SEYVN" item against the strip width and repeats
as many as needed per group (two identical groups, translated -50%), so it
is seamless at any width. Speed is a constant 20px/s (`SPEED_PX_PER_SECOND`).
Reduced-motion users get a static, edge-to-edge strip.
