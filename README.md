# Daniel Dumitru's Dev Space

This repository contains a personal student developer portfolio site with interactive project entry, a CV page, responsive layouts, and accessible forms and tables.

## Main additions

- Added `portfolio.html`, `portfolio.css`, and `portfolio.js`.
- Added an accessible project submission form with different control types: text, textarea, URL, select, optional image URL, and date.
- Added client-side JavaScript validation with visible error messages and `aria-describedby` support.
- Prevented invalid form submission and moved focus to the first invalid field.
- Added reset support for the form.
- Added a dynamic accessible table where valid projects are inserted after submission.
- Added image thumbnails with `loading="lazy"`.
- Added a project counter and a small animation when a new table row is inserted.
- Added `cv.html` as a dedicated CV page linked in the site navigation.
- Updated navigation to include Portfolio and CV pages.
- Added a homepage visual section for the Portfolio update.

## Accessibility notes

The site uses skip links, semantic landmarks, one clear `h1` per page, explicit form labels, fieldsets and legends, visible focus styles, table captions, scoped table headers, and accessible error messages. The portfolio form updates `aria-invalid` and uses live regions for feedback.

## Performance notes

The project uses static HTML, CSS, and vanilla JavaScript only. Images are kept small and dynamic table thumbnails use lazy loading. The portfolio JavaScript updates only the needed DOM elements and uses a `DocumentFragment` when adding a row.

## Lighthouse scores

- Performance: 95
- Accessibility: 96
- Best Practices: 100
- SEO: 90


## Known limitations

- The portfolio form stores submitted projects only for the current browser session. There is no backend or database because the project is hosted as a static GitHub Pages site.
- The optional image thumbnail URL is not uploaded anywhere. If left empty, the local placeholder image is used.
- Figma evidence from previous version is included through the authentication screenshot and `figma-auth.css`.
