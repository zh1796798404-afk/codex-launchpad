# Codex Launchpad

A deploy-ready full-stack Next.js starter built for the workflow:

1. Build or edit locally with Codex
2. Push to GitHub
3. Let Vercel deploy automatically
4. Share the public URL with end users

## What is included

- A polished landing page in the Next.js App Router
- A working API endpoint at `POST /api/interest`
- Environment variable examples for local development and Vercel
- A beginner-friendly deployment checklist for GitHub and Vercel

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` from `.env.example`.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Codex Launchpad
CONTACT_EMAIL=hello@example.com
```

Notes:

- `NEXT_PUBLIC_SITE_URL` is used as the public base URL.
- `NEXT_PUBLIC_SITE_NAME` is available for future client-side branding.
- `CONTACT_EMAIL` is read on the server side by the API route.

## Run checks before deployment

```bash
npm run lint
npm run build
```

## GitHub and Vercel deployment

### 1. Create a GitHub repository

If the repo does not already have a remote:

```bash
git remote add origin <your-github-repo-url>
git push -u origin codex/my-change
```

If you want production deployments from `main`, merge your working branch into `main` after review.

### 2. Import the repository into Vercel

In Vercel:

1. Click `Add New...`
2. Choose `Project`
3. Import the GitHub repository
4. Keep the detected Next.js framework preset

### 3. Add environment variables in Vercel

In the Vercel project settings, add:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `CONTACT_EMAIL`

For production, set `NEXT_PUBLIC_SITE_URL` to your deployed domain, for example:

```bash
https://your-project.vercel.app
```

### 4. Deploy and share

After the first successful deployment:

- test the homepage
- submit the built-in form
- confirm the API route responds
- share the generated `vercel.app` URL with users

### 5. Optional custom domain

When you are ready for a branded URL:

1. Open the Vercel project
2. Go to `Settings -> Domains`
3. Add your domain
4. Update third-party callback URLs if you use login, payments, or email providers

## Codex commit flow

Inside Codex's `Submit changes` dialog:

- `Commit` creates a local git commit only
- `Commit and push` pushes your branch to GitHub
- `Commit and create PR` requires GitHub CLI (`gh`) and is optional

For a beginner-friendly workflow, `Commit and push` is enough.
