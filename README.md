# Birthday Surprise App

A romantic single-page birthday app built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Elegant hero section with floating romantic accents
- Framed profile card with subtle motion and glow
- Interactive "Why I Love You" memory cards
- Love meter and confetti celebration
- Story timeline of your milestones
- Fixed music player with background romantic audio
- Responsive design for mobile, tablet, and desktop

## Customize the content

Edit the object in `src/contentConfig.ts` to update the details:

- girlfriend name
- birthday date
- headline and subtitle
- profile image URL
- memory cards
- milestone timeline
- love messages
- background music URL

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the local URL printed in the terminal, usually:

   ```text
   http://localhost:3000
   ```

## Production build

```bash
npm run build
```

Then preview it locally:

```bash
npm run preview
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Vercel should auto-detect the Vite app.
4. Use the default settings and deploy.

## Deploy to Netlify

1. Push the project to GitHub.
2. In Netlify, choose "Add new site" → "Import an existing project".
3. Select the repo.
4. Build command: `npm run build`
5. Publish directory: `dist`

## Files to customize

- `src/contentConfig.ts` — central content configuration
- `src/App.tsx` — main app structure and interactions
- `src/index.css` — typography, color palette, and visual styling
# birthday
# birthday
