# Deploy to Cloudflare Pages (free)

**Git integration (auto-rebuild on every commit)**
1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git -> pick the repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `_site`
   - Environment variables: `NODE_VERSION=22`, `SITE_URL=https://<project>.pages.dev` (or your custom domain later), optional `NODE_ENV=production`
4. Save and deploy. Every push to the production branch rebuilds and deploys (`_headers` is honoured: caching + security headers).

**Direct upload from the box (no git needed)**
```bash
SITE_URL=https://<project>.pages.dev ./build.sh
npx wrangler pages deploy _site --project-name leonida-guides     # needs `wrangler login` or CLOUDFLARE_API_TOKEN
```

**Custom domain later:** Pages -> project -> Custom domains -> add; then change the `SITE_URL` variable to the new origin and redeploy. Nothing else changes.

**Free analytics:** Cloudflare Web Analytics can be enabled in the dashboard (no code change when using Pages' one-click toggle).
