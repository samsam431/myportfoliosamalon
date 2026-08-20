# Sam Altir P. Alon — Virtual Assistant Portfolio

A static portfolio website for Sam Altir P. Alon, presenting Virtual Assistant skills in Shopify product listing, customer support, general VA tasks, and basic social media management.

## Technologies

- HTML5
- CSS3 (custom properties for theming, no framework)
- Vanilla JavaScript (no libraries)

## Structure

- `index.html` — all page content and sections
- `style.css` — theme variables, layout, components, responsive rules
- `script.js` — theme toggle, mobile nav, scroll reveal, portfolio filter, modal, form validation
- `assets/images/` — profile photo

## Running locally

Open `index.html` directly in a browser, or serve the folder with any static file server:

```
npx serve .
```

## Deployment

This is a static site with no build step. Deploy directly to Netlify by pointing it at the project root (`netlify.toml` publishes `.`).
