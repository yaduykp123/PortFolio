# Yadu Krishnan Portfolio — Redesigned

A professional developer portfolio built as a lightweight static site with HTML, CSS, JavaScript and an optional server-side AI assistant using a Netlify Function.

## Main features

- Real ExpireOff preview plus supplied Shoply project screenshot with live-site link
- Project case-study modal
- Animated car/person desktop navigation
- Continuous walking person around the profile image (20-second lap, no pause)
- Accent text/theme changes every 30 seconds
- Responsive mobile navigation
- Scroll reveal and progress indicator
- Working AI portfolio assistant with server-side API key handling
- Accessibility and reduced-motion support

## Run locally

For a quick visual preview, serve the folder with any static HTTP server.

For the AI function, use Netlify CLI:

```bash
npx netlify dev
```

Then open the local URL printed by Netlify.

## AI setup

Create your environment variables using `.env.example`. In Netlify, add `OPENAI_API_KEY` as a server-side environment variable. The current default model is `gpt-5.6-luna`.

## Main files

- `index.html` — page structure and content
- `style.css` — design, responsive rules and animations
- `portfolio.js` — interactions, project data, AI client and timers
- `netlify/functions/chat.mjs` — secure AI request handler
- `DOCUMENTATION.md` — beginner-friendly technical documentation
- `PORTFOLIO_CONTENT.md` — editable portfolio content reference
