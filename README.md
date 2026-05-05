# Zefi – AI-Powered Personal Finance Manager

Zefi is a full-stack personal finance management application that helps you track transactions, manage budgets, and gain AI-powered insights into your spending habits.

## 🚀 Live Demo
[usezefi.vercel.app](https://usezefi.vercel.app/)

## ✨ Features

- **Authentication** – Secure sign in/sign up with Clerk
- **Account Management** – Create and manage multiple bank accounts (Current/Savings)
- **Transaction Tracking** – Add, edit, delete, and bulk manage transactions
- **Receipt Scanner** – Scan receipts using Google Gemini AI to auto-fill transaction details
- **Budget Management** – Set monthly budgets with real-time progress tracking
- **Smart Alerts** – Automated email alerts when budget exceeds 80% via Inngest cron jobs
- **Monthly Reports** – AI-generated financial insights delivered to your inbox every month
- **Data Visualization** – Interactive charts for expense breakdown and account overview
- **Recurring Transactions** – Set up and automate recurring income/expense transactions
- **Bot Protection** – Arcjet-powered rate limiting and bot detection

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript |
| Auth | Clerk |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Styling | Tailwind CSS + shadcn/ui |
| Background Jobs | Inngest |
| Email | Resend + React Email |
| AI | Google Gemini 2.5 Flash |
| Security | Arcjet |
| Deployment | Vercel |

## 📁 Project Structure

```
zefi/
├── app/
│   ├── (auth)/          # Sign in / Sign up pages
│   ├── (main)/          # Dashboard, Account, Transaction pages
│   └── api/             # Inngest and seed API routes
├── actions/             # Server actions
├── components/          # Reusable UI components
├── emails/              # React Email templates
├── hooks/               # Custom React hooks
├── lib/
│   ├── inngest/         # Inngest client and functions
│   └── prisma.js        # Prisma client
└── prisma/
    └── schema.prisma    # Database schema
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Wasef07/zefi.git
cd zefi
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Fill in your `.env`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
DATABASE_URL=
DIRECT_URL=
ARCJET_KEY=
RESEND_API_KEY=
GEMINI_API_KEY=
INNGEST_SIGNING_KEY=
INNGEST_EVENT_KEY=
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

6. Start Inngest dev server (separate terminal)
```bash
npx inngest-cli@latest dev
```

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `DATABASE_URL` | Supabase connection pooling URL |
| `DIRECT_URL` | Supabase direct connection URL |
| `ARCJET_KEY` | Arcjet API key |
| `RESEND_API_KEY` | Resend email API key |
| `GEMINI_API_KEY` | Google Gemini API key |
| `INNGEST_SIGNING_KEY` | Inngest signing key (production) |
| `INNGEST_EVENT_KEY` | Inngest event key (production) |

