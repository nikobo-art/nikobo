# HANDOFF — nikobo.art redesign ("Two Worlds, One Artist")

**Status: COMPLETE — built, two iteration passes done, all routes + transitions verified headlessly. Awaiting owner review in a real browser.**

The new site is `index.html` (single file, no dependencies — the previous version is in git at `ba5f524`).

## Concept
One WebGL fragment shader (hand-rolled, WebGL1) renders a living atmosphere behind the whole site, sliding between two states:
- **THE CLUB** (`data-world="club"`): void #07060c, acid #c9ff2f, UV #8759ff — display font **Unbounded**, fast motion.
- **THE CEREMONY** (`data-world="fire"`): ember #160d07, gold #e6a054, clay #c96f45 — display font **Fraunces** italic, breathing at 6 breaths/min.
- Landing = threshold gate: hover pulls the atmosphere toward a world; entering triggers a shader burst + veil transition. Split axis follows layout orientation (horizontal desktop, vertical mobile).
- Shared: **Instrument Sans** body, **Space Mono** labels/data, bone #f2ede3.

## Dev / testing
- Serve: `node serve.mjs` → http://localhost:3000 (handles /music, /coaching, /coaching/* like the `_redirects` + stub folders do in production).
- Screenshots: `node screenshot.mjs <url> <label>` (puppeteer at `C:/Users/Usuario/AppData/Local/Temp/puppeteer-test`), output in `temporary screenshots/`.
- **`?still` debug flag** (e.g. `localhost:3000/music?still`): freezes the shader at one frame and pauses CSS animations — use for screenshots; software-rendered/headless browsers choke on the live loop.
- Reduced motion: shader renders a single still frame, all choreography disabled. No WebGL → CSS gradient fallback (`body.no-gl`).

## Notes for future edits
- Content edit map is in the HTML comment at the top of index.html ([EDIT: …] markers).
- SoundCloud players are lazy: cards store track id in `data-sc`, player color in `data-color`; iframe injected on click.
- Routing: sessionStorage `nikobo_page` (set by stub folders) + pushState URLs; keys are `music, holistic, coaching1on1, coachinggroups, coachingbody`.
- Watch selector specificity against `.page{display:none}` — `#landing` needed an `.is-active` variant for exactly this reason.
