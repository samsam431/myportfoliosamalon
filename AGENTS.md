# AGENTS.md

## Architecture

Static three-file site: `index.html`, `style.css`, `script.js`, plus `assets/images/` for the profile photo. No build step, no framework, no backend, no database.

## Conventions

- All colors, spacing radii, and shadows are CSS custom properties defined in `:root` (light theme) and overridden under `[data-theme="dark"]` in `style.css`. Add new colors as variables, never hardcoded hex values in components.
- Section markup follows a repeating pattern: `<section class="section" id="...">` containing a `.container`, a `.section-head` (eyebrow + h2 + optional subtitle), then the section's grid/cards.
- Elements that should animate in on scroll get the `.reveal` class; `script.js` toggles `.in-view` via IntersectionObserver.
- Portfolio cards carry `data-category` attributes matched against filter button `data-filter` values in `script.js`.

## Non-obvious decisions

- The profile photo placeholder comment (`<!-- Replace this placeholder with Sam's professional profile photo -->`) is intentionally kept in `index.html` even though a real photo (`assets/images/sam-profile.jpg`) is now wired in, per the original content rules for this portfolio.
- Skill levels are always labeled "Skilled" (no percentages, no years-of-experience claims) — this is a content requirement, not a placeholder to fill in later.
- Portfolio projects are explicitly labeled "Practice Project" — do not add real client names, testimonials, or metrics.
