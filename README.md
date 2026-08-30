# Finway

A modern banking dashboard built with the Next.js App Router. Users connect real
bank accounts through Plaid, view balances and transaction history, and move money
between accounts via Dwolla. Authentication and data storage are handled by Appwrite.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **Tailwind CSS 4** + shadcn/ui (Radix primitives)
- **Appwrite** – auth + database
- **Plaid** – bank account linking and transactions
- **Dwolla** – ACH transfers
- **Chart.js** – balance/spending charts
- **react-hook-form** + **zod** – forms and validation

## Getting started

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.

## Environment variables

Create a `.env` file at the project root:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_ITEM_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
NEXT_APPWRITE_KEY=

# Plaid
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions
PLAID_COUNTRY_CODES=US,CA

# Dwolla
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack)   |
| `npm run build` | Production build                   |
| `npm run start` | Serve the production build         |
| `npm run lint`  | Run ESLint                         |
