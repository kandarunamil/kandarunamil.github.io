# kandarunamil (Hugo)

Requirements: Hugo Extended (v0.128+).

```bash
# 1. add the font (see static/fonts/README.txt)
# 2. run locally
hugo server -D
# 3. production build
hugo --minify --gc
```

Add a new tool: copy `content/tools/bubble-text.md`, change front matter. `groups` picks which
style groups from `assets/js/cooltext.js` appear (basic, fancy, bubble, box, wide, small, flip, line, decor, or all).

TODO before launch: Inter font file, og-default.png (1200x630) in static/img, real contact email, Organization logo in schema.html, real author details, full article text.
