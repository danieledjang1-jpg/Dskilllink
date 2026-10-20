# DskillLink — Local services marketplace

**Find Skilled People Near You. Get Things Done.**

A React + Vite responsive marketplace starter inspired by the supplied DskillLink UI board. It includes a customer-facing home page, service discovery, professional profiles, job posting and tracking, quote UI, chat with animated stickers, a DskillLink AI helper, notifications, profile settings, theme switcher, and admin demo dashboard.

## Run it locally

Requirements: Node.js 18+ and npm.

```bash
cd dskilllink
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). To test a production build:

```bash
npm run build
npm run preview
```

## What's functional immediately

- Responsive desktop/mobile layouts and bottom navigation
- DskillLink logo splash screen on launch
- Light/dark themes saved on this device
- Service search by profession, category, skills, description and location text
- Service category shortcuts and filters (verified, available, top-rated)
- Professional profile details, skills, pricing, portfolio/review demo panels
- Save/unsave professionals
- Request service and create jobs
- Job status updates and quote form with derived total
- Chat conversations saved locally, message sending, typing/reply simulation, read badges and animated stickers
- AI helper with local intent matching for common service problems; it does not require an API key
- Demo customer sign-in/sign-up and Google/Microsoft button flows (real OAuth requires Supabase setup)
- Admin demo dashboard with verification actions
- Persistent demo state using browser localStorage

## Important: demo vs production

This project is a usable frontend demo/MVP, not yet a fully deployed production marketplace. Without credentials, account sessions and data are stored only in the current browser. Demo professionals, reviews, map pins, analytics, quote acceptance, and chat replies are sample/demo behavior. The app does **not** process real payments, perform identity verification, provide live GPS/map coordinates, send real notifications, or run true cross-device real-time chat until the corresponding providers/backend are configured. Do not present sample reviews or demo verification as genuine proof.

## Connect Supabase (real authentication and backend foundation)

1. Create a project at [Supabase](https://supabase.com/).
2. In the project dashboard, open **Project Settings → API** and copy the Project URL and publishable/anon key.
3. Copy `.env.example` to `.env` in the project root and fill in:

   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
   VITE_AI_ENDPOINT=
   ```

4. Open **SQL Editor** in Supabase, create a new query, review `schema.sql`, and run it in a new/empty project. It creates profiles, professional profiles, jobs, quotes, conversations, messages, saved professionals, reviews, notifications, indexes, RLS policies and a new-user profile trigger.
5. In **Authentication → URL Configuration**, set your local Site URL to `http://localhost:5173` while testing. Add the eventual deployed domain to Redirect URLs.
6. In **Authentication → Providers**, enable Email. For Google and Microsoft, configure the OAuth app/provider credentials as described in the Supabase provider settings and set the callback URL shown by Supabase in each provider console. Never put an OAuth client secret in this React app.
7. For phone OTP, enable Phone provider and configure an SMS provider in Supabase. SMS may have charges and provider-specific restrictions.
8. Restart `npm run dev` after changing `.env`.

The auth form uses Supabase email/password sign-up/sign-in and phone OTP when configured. Google/Microsoft OAuth buttons call Supabase OAuth. Social sign-in will not work until provider credentials and redirect URLs are configured. Some marketplace pages still use local demo state; productionizing them means connecting their CRUD operations to the tables in `schema.sql`, then testing policies with separate customer/professional accounts.

## Realtime chat and uploads

Enable Supabase Realtime for `public.messages` and subscribe to changes scoped to a conversation. Use Supabase Storage buckets for portfolio images and message attachments, with private buckets and access policies. Validate file type and size on both client and server. The current chat and sticker experience is interactive but local-only.

## AI integration

The current assistant includes local keyword/intent fallbacks. If adding a real LLM, call it through a server-side Edge Function or backend endpoint and set `VITE_AI_ENDPOINT` to that endpoint. Keep all secret API keys server-side, apply rate limits, and never let AI invent a professional's verification status, qualifications, price, or availability.

## Payments and launch checklist

- Integrate a compliant payment provider (for example, Paystack or Flutterwave) using a server-side verified transaction flow before displaying payments as complete.
- Configure live maps/geocoding only after obtaining a maps API key and user consent for location.
- Add moderation/reporting, identity/skill verification procedures, spam protection, audit logs and customer support workflows.
- Add automated tests, error monitoring, backups, rate limiting and production security review.
- Add your real terms, privacy policy, support address, and actual social accounts before public launch.
- Deploy the Vite app to Netlify or Vercel and set the environment variables in the hosting dashboard.

## Main structure

```text
src/main.jsx       React app and interactive demo flows
src/style.css      Responsive styling, blue/green design, themes and animations
schema.sql         Supabase database starter and RLS policies
.env.example       Environment variable template
```
