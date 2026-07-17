# AGENTS.md — portfolio

This file is generated and refreshed automatically by repo-guardian.
It tells any AI coding agent (or you) how changes in this folder get
committed and deployed. It intentionally contains NO real secret values —
only variable names. Real values live in a local, gitignored
`credentials.json` on this machine, outside any git repo.

## Deploy targets for this project

- **GitHub repo:** `myk02/portfolio`
- **Convex deployment:** `https://pastel-grouse-884.convex.cloud`
- **Vercel project:** `portfolio` (https://portfolio-delta-bay-50.vercel.app)

## Environment variables this project references

- `CONVEX_DEPLOY_KEY`
- `NODE_ENV`
- `PORT`
- `SITE_URL`
- `VITE_CONVEX_URL`

Real values for the above are stored in `credentials.json` on the developer's
machine (not in this repo). Do not hardcode secret values into source files
or commit a `.env` file with real values — commit only `.env.example` with
variable names and placeholder values.

## Commit & deploy procedure

1. Make your changes normally in this folder.
2. repo-guardian detects the change automatically (or run it manually) and:
   - Stages and commits on a `repo-guardian/<date>` branch (AI-drafted commit message via OpenCode) and opens a Pull Request — review and merge it yourself.
3. Pushing to GitHub triggers Vercel's own auto-deploy (if this project is linked to Vercel via Git integration) — no manual action needed on vercel.com.
4. If files under `convex/` changed, repo-guardian runs `npx convex deploy` using this project's deploy key automatically (when apply_changes is enabled in credentials.json).

## Manual commands (if you want to do a step yourself)

```bash
git add -A
git commit -m "your message"
git push
```

```bash
# Deploy Convex backend for this project (from within this folder):
# set CONVEX_DEPLOY_KEY from credentials.json first, then:
npx convex deploy
```
