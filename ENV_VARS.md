# OpenVeda Production Environment Variables

## Core API (Java)
- `PORT`: 8080
- `SITE_URL`: https://openveda.in
- `REDIS_HOST`: localhost
- `REDIS_PORT`: 6379

## Scoring Service (Python)
- `PORT`: 8000
- `SITE_URL`: https://openveda.in
- `GITHUB_APP_ORG`: OpenVeda-Labs
- `GSOC_CERTIFIED_MIN_SCORE`: 85

## Web (Next.js)
- `NEXT_PUBLIC_SITE_URL`: https://openveda.in
- `NEXT_PUBLIC_SUPABASE_URL`: [Retrieved from AWS Secrets Manager]
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: [Retrieved from AWS Secrets Manager]
