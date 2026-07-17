# Haxmas

12 days. 12 workshops. Epic prizes. From December 13-25

## Setup

```bash
bun install
cp .env.example .env # then fill out .env
bun run db:migrate
bun run dev
```

## Deploy to Vercel

The app uses Bun for package management and Vercel's SvelteKit adapter.

1. Install and authenticate the Vercel CLI, then link the repository to a project:

   ```bash
   bun install --frozen-lockfile
   bun add --global vercel
   vercel login
   vercel link
   ```

2. Add every variable from `.env.example` to Vercel. Running the command without an
   environment lets you select Production, Preview, and Development as needed:

   ```bash
   for name in DATABASE_URL HACKCLUB_CLIENT_ID HACKCLUB_CLIENT_SECRET HACKCLUB_REDIRECT_URI SESSION_SECRET AIRTABLE_API_KEY AIRTABLE_BASE_ID; do
     vercel env add "$name"
   done
   ```

   Set `HACKCLUB_REDIRECT_URI` to the deployed callback URL, for example
   `https://haxmas.example.com/auth/callback`, and register the same URL with Hack Club OAuth.

3. Apply the database migrations using the production environment:

   ```bash
   vercel env run --environment production -- bun run db:migrate
   ```

4. Build with Vercel's production settings, then deploy the exact prebuilt output:

   ```bash
   vercel pull --yes --environment production
   vercel build --prod
   vercel deploy --prebuilt --prod
   ```

For a preview deployment, use `vercel` instead of the commands in step 4.
