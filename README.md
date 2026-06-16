# Opura AI — AI Shopping Assistant

Full Stack Developer Intern assignment for **BotMakers Pvt Ltd**.

An AI-powered shopping assistant that helps users search for products, browse recommendations in a carousel, and compare up to 3 products side-by-side — built from the [Figma design](https://www.figma.com/design/9iGNHKi7vwCCnPrBLwwQxc/AI-Shopping-Assistant).

## Live Demo

> Deploy to Vercel and add your live URL here before submission.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Backend | Next.js API Routes |
| State | React Context + localStorage (compare list) |
| AI | Keyword-based product search with contextual replies |

## Features

- **Landing screen** — Greeting, search bar, quick suggestion chips
- **AI chat** — User queries return contextual replies + product carousel
- **Product cards** — Price, discount, rating, hover overlay with size/color selection
- **Add to cart** — Client-side confirmation (UI interaction)
- **Add to compare** — Up to 3 products, persisted in localStorage
- **Compare page** — Product slots, category filter, detailed comparison table
- **REST API** — `/api/chat`, `/api/products`, `/api/compare`

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts       # AI chat endpoint
│   ├── api/products/route.ts   # Product listing
│   ├── api/compare/route.ts    # Comparison data
│   ├── compare/page.tsx        # Compare products screen
│   └── page.tsx                # Main chat / landing
├── components/                 # UI components
├── context/CompareContext.tsx  # Compare list state
├── data/products.ts            # Mock product catalog
├── lib/utils.ts                # Helpers
└── types/index.ts              # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <your-repo-url>
cd Botmakers_Assessment
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### `POST /api/chat`

```json
{ "message": "Show me sneakers" }
```

Response:

```json
{
  "reply": "I found 3 great unisex sneakers for you...",
  "products": [/* Product[] */]
}
```

### `GET /api/products?category=Running+Shoes`

Returns filtered product list.

### `POST /api/compare`

```json
{ "productIds": ["1", "2", "3"] }
```

Returns products and side-by-side comparison rows.

## Screens Implemented

1. **Desktop 1** — Landing with sidebar, greeting, search input
2. **Desktop 2** — Chat view with AI response and product carousel
3. **Product Card** — Default + hover states (size, color, cart, compare)
4. **Compare Products** — 3 slots, category dropdown, comparison table

## Assumptions

- AI uses keyword-based search (no external API key required for demo)
- Product images sourced from Unsplash
- Voice input button is UI-only
- Cart is client-side toast confirmation (no checkout flow)

## Author

Kashish — BotMakers Full Stack Developer Intern Assignment

## License

MIT
