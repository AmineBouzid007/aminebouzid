# Amine Bouzid - portfolio (Next.js 16, same stack as Stikky)

## Edit content
Everything you change lives in `public/`:
- `public/projects.js` : projects, text (FR/EN), tags, links, screenshot paths, profile photo path
- `public/assets/` : your images (screenshots, `profile.jpg`)

### Screenshots
1. Put images in `public/assets/` (e.g. `seniorscare-1.png`). Keep each under ~500 KB.
2. List them in `public/projects.js` under that project's `shots`, as `"/assets/seniorscare-1.png"`.
Missing images are hidden automatically. Clicking a screenshot opens it full screen.

### Profile photo
Save it as `public/assets/profile.jpg` (shown in the About section).

### New project
Copy one block in `public/projects.js`, paste it after a comma, edit it.

## Run locally
npm install
npm run dev

## Deploy on Vercel
Push to GitHub, import the repo on vercel.com/new. Vercel detects Next.js automatically. No settings to change.
