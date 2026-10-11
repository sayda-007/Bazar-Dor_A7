
# Bazar Dor — B14-A7

Bazar Dor is a responsive price-comparison web application that helps users explore essential products, compare market prices, and understand daily price changes across Bangladesh.

## Project Links

- **GitHub Repository:** https://github.com/sayda-007/Bazar-Dor_A7
- **Live Website:** 

## Features

1. **Live Product Prices** — Fetches product and category data from the official Programming Hero Bazar Dor API.
2. **Price Change Highlights** — Displays products with the largest price increases and decreases.
3. **Product Details** — Shows today's price, previous prices, price changes, and market-by-market minimum and maximum prices.
4. **Category Browsing** — Browse products by rice, lentils, oil, vegetables, fish, meat, eggs and dairy, and spices.
5. **Price Sorting** — Sort category products from low to high price or high to low price using numeric values.
6. **Live Price Ticker** — Displays product prices and price changes in a scrolling ticker.
7. **Authentication** — Uses Better Auth for email/password registration and login.
8. **Protected Pages** — Requires authentication to access product details and the user's profile.
9. **Profile Management** — View account information and update the user's name and profile photo URL.
10. **Responsive Layout** — Designed for mobile, tablet, and desktop screens.

## Technologies Used

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Better Auth
- SQLite with better-sqlite3
- React Hot Toast
- Programming Hero Bazar Dor API

## API

**Base URL:**

`https://openapi.programming-hero.com/api/bazardor`

| Purpose | Endpoint |
|---|---|
| All products | `/products` |
| Filter products by category | `/products?category=chal` |
| Single product | `/products/1` |
| All categories | `/categories` |
| Single category | `/categories/chal` |

The application uses the API's product and category data. Prices may change according to the API data and the selected market.

## Main Routes

| Route | Description |
|---|---|
| `/` | Homepage with price highlights and all products |
| `/category/[slug]` | Category products and price sorting |
| `/product/[slug]` | Protected product details and market prices |
| `/signup` | Create an account |
| `/signin` | Sign in to an account |
| `/profile` | View the signed-in user's profile |
| `/profile/update` | Update profile information |
| `/api/auth/[...all]` | Better Auth API handler |

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- Access to the Bazar Dor API

### 1. Clone the repository

```bash
git clone https://github.com/sayda-007/Bazar-Dor_A7.git
cd Bazar-Dor_A7
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```dotenv
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-new-random-secret
```

Generate a strong secret with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Optional Google and GitHub OAuth configuration:

```dotenv
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Fill in the OAuth variables only after configuring the corresponding provider credentials.

**Security:** Never commit `.env.local`, authentication secrets, or the local SQLite database to Git.

### 4. Initialize the authentication database

After configuring the environment variables and Better Auth configuration, run:

```bash
npx auth@latest migrate --config ./src/lib/auth.ts
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npx tsc --noEmit
```

- `npm run dev` starts the development server.
- `npm run build` creates an optimized production build.
- `npm run start` serves the production build.
- `npx tsc --noEmit` checks TypeScript without emitting output files.

## Authentication Notes

Email/password authentication is configured with Better Auth. Google and GitHub sign-in require valid OAuth application credentials and matching callback settings before those providers can be used.

The local SQLite database is intended for local development. Configure an appropriate persistent database before deploying to a serverless hosting platform.

## Deployment

The production build has been tested locally. A public live URL must be added here after deployment.

Before deployment:

- Configure production environment variables securely.
- Use a database suitable for the chosen hosting platform.
- Configure OAuth callback URLs if social sign-in is enabled.
- Verify authentication, protected routes, product pages, and profile editing on the deployed website.

## Project Information

- **Project:** Bazar Dor
- **Assignment:** Programming Hero Assignment 7 (M42)
- **Repository:** `sayda-007/Bazar-Dor_A7`
