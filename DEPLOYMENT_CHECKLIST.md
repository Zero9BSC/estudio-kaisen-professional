# Deployment Checklist

Full deployment steps, prerender verification, and Google Search Console setup are in:

**[docs/deployment.md](docs/deployment.md)**

Use that doc for:

- Pre-deployment steps (build, validate:seo, verify:schema, preview, test:routing)
- Files to deploy (dist/ contents)
- Post-deployment verification
- Prerender verification (build:prerender, not build:ssg)
- Google Search Console (property, verify, sitemap, indexing)
- Monitoring and rollback

Quick reminder: run **`npm run build`** (SPA) or **`npm run build:prerender`** (HTML per route) before deploy; test with **`npm run preview`** at http://localhost:4173.
