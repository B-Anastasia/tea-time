# Tea Time

Landing page for a tea shop. Built with HTML, SCSS and vanilla JavaScript.

## Getting Started

```bash
npm install
npm start
```

This runs `live-server` and `sass --watch` in parallel. The site will be available at `http://127.0.0.1:8080`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server + sass watcher |
| `npm run build:css` | Full CSS build (compile → autoprefix → compress) |
| `npm run compile:sass` | Compile SCSS to CSS |
| `npm run prefix:css` | Add vendor prefixes via Autoprefixer |
| `npm run compress:css` | Minify CSS |

## Tech Stack

- HTML5
- SCSS (Dart Sass, `@use`/`@forward` module system)
- Vanilla JavaScript
- PostCSS + Autoprefixer
- live-server
