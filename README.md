# VELOOP Rewards – Watch Ads Page

A complete UI/UX redesign of the **Watch Ads** page for **VELOOP Rewards**, built as part of the
VELOOP Rewards Frontend Internship Program (Task 04).

## Project Overview

Watch Ads is one of the core earning modules of VELOOP Rewards. Users watch short advertisements
and earn **VEs (VELOOP Earn Tokens)**, which can later be converted into real cash and withdrawn to
their linked bank account.

This project rebuilds that page from scratch with a premium, trustworthy, gamified and fully
responsive interface. No existing design was copied — the layout, color system, components and
interactions are all new.

## Features

- **Premium hero section** – headline, total VEs earned, today's earnings, available ads, total ads
  completed and an animated daily earnings progress ring.
- **Statistics section** – animated counters for today's earnings, lifetime VEs, ads watched today
  and remaining ads, including live cash-value conversion.
- **Available ads list** – 6 advertisement cards with filters (All / Available / Completed / Bonus).
- **Watch ad cards** – illustration icon, brand, category, reward badge, duration and status
  indicator.
- **Premium CTA button** – hover animation, ripple effect, live playback progress, loading,
  disabled, locked and completed states.
- **Reward information cards** – how VEs are earned, cash conversion rate and bank withdrawal rules,
  plus a security/trust banner.
- **UI states** – loading skeletons, empty state, already-watched state and a success celebration
  overlay when a reward is credited.
- **Optional enhancements** – daily progress tracker, bonus reward banner linking to
  `/watchAd-bonus`, limited-time bonus ads page, recent earnings timeline and celebration animation.
- **Animations** – fade-in, card hover lift, reward glow, floating icons, shimmer skeletons and
  counter animations, with `prefers-reduced-motion` support.
- **Fully responsive** – 320px mobile up to full HD and ultra-wide displays.

## Technology Stack

- React 19
- TypeScript
- Vite
- TanStack Router (file-based routing)
- Tailwind CSS v4 design tokens (semantic theme in `src/styles.css`)
- Lucide React icons
- React Hooks (`useState`, `useEffect`, `useMemo`, custom `useCountUp`)

> Note: this project runs on the Vite + TanStack Router setup instead of Bootstrap/CSS Modules.
> The same requirements — modular components, scoped styling through a token-based design system,
> React Icons-style icon set (Lucide) and hooks — are fully satisfied.

## Folder Structure

```text
src/
  components/
    watch-ads/
      AdCard.tsx           # Premium advertisement card
      AdCardSkeleton.tsx   # Loading skeleton state
      BonusBanner.tsx      # Limited-time bonus banner -> /watchAd-bonus
      EarningsTimeline.tsx # Recent earnings timeline
      HeroSection.tsx      # Hero + daily progress ring
      InfoCards.tsx        # Reward information + trust banner
      StatCard.tsx         # Animated statistics tile
      StatesPanels.tsx     # Empty state + reward success overlay
      WatchAdButton.tsx    # Premium CTA with all states
  data/
    ads.ts                 # Dummy advertisement + earnings data
  hooks/
    useCountUp.ts          # Animated counter hook
  routes/
    index.tsx              # Watch Ads page
    watchAd-bonus.tsx      # Bonus rewards page
  styles.css               # Design system (colors, gradients, animations)
```

## Installation Guide

```bash
git clone <your-repository-url>
cd veloop-watch-ads
npm install
```

## Running the Project

```bash
npm run dev      # start the development server
npm run build    # production build
npm run preview  # preview the production build
```

## Dummy Data

All figures are static placeholders (no backend integration):

| Metric                  | Value      |
| ----------------------- | ---------- |
| Today's Earnings        | 96 VEs     |
| Total Lifetime Earnings | 12,450 VEs |
| Weekly Earnings         | 1,260 VEs  |
| Available Ads           | 12         |
| Completed Ads Today     | 5          |

## Live Demo

Deployed link: _add your Vercel / Netlify URL here after deployment_
