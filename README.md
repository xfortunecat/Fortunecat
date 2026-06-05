# 星盤 StarChart ☯️🃏

A trilingual (繁體中文 / 简体中文 / English) mobile-first web app combining **Zi Wei Dou Shu (紫微斗數)** astrology and **Tarot reading** with member registration, news, and e-commerce.

## Features
- ☯️ 紫微斗數 Ming Pan chart with 12 palaces and 四化
- 🃏 Tarot — daily card, 3-card spread, Celtic Cross (Premium)
- 🔐 Member login / register with Free & Premium tiers
- 🛍️ Shop with cart, promo codes, and mock Stripe checkout
- 📰 News & promotions with category filter
- 🔔 In-app notification centre
- 🌐 Full trilingual i18n (zh-TW / zh-CN / en) with language switcher

## Tech Stack
- React 18 + Vite
- TailwindCSS
- React Router v6
- i18next + react-i18next
- Zustand (state management)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

No API keys needed — the app runs entirely on mock data in demo mode.

## Deploying to GitHub Pages

```bash
npm run build
# Upload the dist/ folder to GitHub Pages or Vercel
```

## Adding Real Integrations (later)

1. Copy `.env.example` to `.env`
2. Fill in your Stripe, Firebase keys
3. Replace mock API calls in `src/lib/` with real fetch calls to your backend

## Folder Structure

```
src/
  components/layout/   → Header + bottom nav
  pages/               → All page components
  data/mockData.js     → All seed data (tarot deck, products, news)
  lib/store.js         → Zustand global state
  locales/             → zh-TW / zh-CN / en JSON files
  styles/globals.css   → Tailwind + custom CSS
  i18n.js              → i18next setup
  main.jsx             → App entry + routing
```

## Upgrading to Claude Code Later

This codebase is structured to hand off cleanly to Claude Code. Simply:
1. Connect your GitHub repo to a Claude Code project
2. Tell Claude Code: *"This is a Vite + React app. Replace mock data with a real Next.js backend, add Prisma + PostgreSQL, and wire up Stripe and Firebase."*
3. Claude Code will scaffold the backend while keeping all existing UI components.

---
*Built with ✨ — StarChart v1.0*
