# Designerkid student course site

A responsive Designerkid website with a landing page, 30 one-hour UI/UX lessons, career guides, an original blog, and moderated student reviews. The slide viewer supports previous/next buttons, keyboard arrows, fullscreen, and direct lesson links. Students do not see edit controls or PowerPoint downloads.

## Pages and editing

- `#/`: landing page, goal, learner reviews, support placeholder
- `#/lessons`: course dashboard; `#/lesson/1/1`: slide viewer
- `#/guides`: interview, CV, portfolio, and research guides with browser-saved checklists; the CV guide leads with an illustrated resume and short visual explanations, with detailed notes collapsed below the interactive bullet builder and editable Word templates
- `#/blog`: original beginner UI/UX articles

Edit guide and blog text in `content/resources.js`. The menu and page layout live in `src/App.jsx` and `src/ContentPages.jsx`. The support section currently says “Coffee link coming soon”; replace it with a real payment URL in `src/ContentPages.jsx` when one is available. No payment is collected by this site.

Reviews are submitted to the existing Supabase project and start in `pending` status. In the Supabase dashboard, open **Table Editor → designerkid_reviews**, read each submission, and set `status` to `approved` to publish or `rejected` to decline. The public site only reads approved reviews. The browser uses a publishable key with row level security; never put a secret or service-role key in the website. The public form has basic spam controls, but a high-traffic launch should add stronger rate limiting or CAPTCHA.

## Current course files

All 30 PowerPoint decks from `Designerkid_UIUX_30_Presentations_FRESH.zip` are imported as 240 rendered slide images. Each lesson also has one illustrated example slide inside the web viewer, for 270 viewable slides total. The example slide appears after original slide 4 and is editable in `content/examples.js`. The course titles, class assignments, and live example links follow the ZIP's `COURSE_INDEX.csv`. Original PPTX files stay out of the published site. The new examples are website content; they are not written back into the instructor's PPTX files.

## Run locally

Requirements: Node.js 18+, npm. To import PowerPoints, also install LibreOffice (`soffice`) and Poppler (`pdfinfo`, `pdftoppm`).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to create the static site in `dist/`.

## Replace or add a lesson

Keep original PPTX files in a private folder outside the deployed site. This project's `source-pptx/` is Git ignored. To replace Day 04:

```bash
npm run import:slides -- --day 4 /private/path/my-lesson.pptx
npm run build
```

The command updates the slide count in `content/slides.json` and the rendered images in `public/images/lessons/day-04/`. Upload the rebuilt `dist/` folder or push the change and let your host redeploy. To reimport the full course, keep the decks named `Day_01_*.pptx` through `Day_30_*.pptx` in a private folder and run:

```bash
npm run import:slides -- --directory /private/path/to/decks
npm run build
```

Do not commit or upload the original PPTX directory to a public repository. Only the converted images and site files should be public. Slide images can still be saved or captured by visitors; a website cannot guarantee prevention of downloads, copying, or screenshots. For limited access, use a host with authentication.

## Deploy on Netlify

1. Create a new site from this project in Netlify, or drag the built `dist/` folder into Netlify Drop.
2. For a Git-connected site, set build command `npm run build` and publish directory `dist`.
3. Netlify provides a shareable `*.netlify.app` URL. Add a custom domain if desired.
4. After importing new decks, commit the rendered images and `content/slides.json`; Netlify rebuilds automatically.

## Deploy on GitHub Pages

1. Put this project in a repository. Keep `source-pptx/` private and untracked.
2. In GitHub repository settings, enable Pages with **GitHub Actions** as the source.
3. Push to `main`. The included workflow builds the site and publishes `dist/`.
4. Open `https://YOUR-USERNAME.github.io/REPOSITORY/`. Lesson links use hash routing, so refreshing a lesson works.

GitHub Pages sites are public. If access must be restricted to enrolled students, choose a host with access controls.
