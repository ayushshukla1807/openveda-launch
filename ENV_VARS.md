# OpenVeda Environment Variables

This document lists all the environment variables required to run OpenVeda locally and in production.

## Required Variables

### Supabase Connectivity
- `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project (e.g., `https://xyz.supabase.co`).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous public key for your Supabase project.

### Stripe Integration (Optional for local dev)
- `STRIPE_SECRET_KEY`: Your Stripe secret key for backend billing logic.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key for frontend checkout.
- `STRIPE_WEBHOOK_SECRET`: Used to verify Stripe webhook signatures.

### Security & Metadata
- `REVALIDATION_TOKEN`: A secret token used to trigger manual page revalidation.
- `GITHUB_TOKEN`: Required if you are programmatically fetching repository data from the GitHub API.

## Configuration

For local development, create a file named `.env.local` in the root of your project:

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

**Note**: Never commit your real secret keys to the repository.
