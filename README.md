# Hearth — GitHub Pages Edition

This project was converted from the Grok/TanStack Start workspace into a fully static Vite + React site for GitHub Pages.

## What changed

- Removed TanStack Start/Nitro server runtime.
- Removed Grok preview, auth, database, migration, and Vercel scaffolding.
- Kept all recipe and collection content in the existing static TypeScript data.
- Kept saved recipes in browser `localStorage` via Zustand.
- Converted routing to TanStack Router hash history so refreshes on nested pages never 404 on GitHub Pages.
- Uses Vite `base: "./"`, so the build works under any GitHub repository name without editing the config.
- Added an official GitHub Pages Actions deployment workflow.

## Local development

```bash
npm ci
npm run dev
```

## Production checks

```bash
npm run typecheck
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository (for example `hearth`). On GitHub Free, make it public for GitHub Pages.
2. Push the **contents of this project** to the repository's `main` branch. Do not upload the outer ZIP as a single file.
3. Open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Open **Actions** and let **Deploy Hearth to GitHub Pages** finish.

Your project-site URL will normally be:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

Routes use hashes, for example:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/#/recipes`

No custom domain, backend, database, Vercel, Netlify, or VPS is required.
