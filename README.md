# orucubozarmi.com

AI-Assisted Fasting Question Classification System built with Next.js, TypeScript, PostgreSQL, and Claude API.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `DATABASE_URL` - PostgreSQL connection string (e.g. `postgresql://user:password@localhost:5432/orucubozarmi`)

### 3. Create and seed the database

Create a PostgreSQL database named `orucubozarmi`, then run:

```bash
npm run seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Production build

```bash
npm run build
npm start
```

## Architecture

- **AI Classification Only** - Claude API converts Turkish questions into category codes. It never generates religious rulings.
- **Database-backed rulings** - All religious rulings come from a predefined database seeded with Diyanet-sourced content.
- **Rate limiting** - IP-based in-memory rate limiting (20 req/min).
- **Caching** - In-memory cache for repeated questions (5 min TTL).

## Deployment

This project is ready for Vercel deployment. Set environment variables in the Vercel dashboard and connect your PostgreSQL database (e.g. Vercel Postgres, Supabase, Neon).
