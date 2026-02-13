# 🎬 Movie Picker

> Modern Movie Recommendation Web App

[🇬🇧 English](./README.md) | [🇹🇼 繁體中文](./README.zh-TW.md)

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

A modern movie recommendation web app that helps you overcome choice paralysis. Discover popular movies, get random picks, and build your personal watchlist.

## 📌 Important Notice

**Portfolio Project**: This is a personal portfolio project for demonstration purposes.

**API Limitation**: Uses TMDB API with rate limits - not intended for public deployment or distribution.

## ✨ Features

- 🎲 **Random Pick** - Random movie selection with optional filters (genre, year, rating)
- 🔥 **Top 100** - Browse popular and highly-rated movies
- ❤️ **Wishlist** - Build and manage your personal movie collection
- 🔍 **Smart Search** - Quick movie discovery with search functionality
- 📱 **Responsive Design** - Seamless experience on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Next generation build tool
- **React Router** - Client-side routing

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - Beautifully designed components
- **Framer Motion** - Production-ready animations

### State Management
- **Zustand** - Lightweight state management
- **React Query** (TanStack Query) - Server state management

### API & Data
- **TMDB API** - The Movie Database API for movie data

### Planned Features
- **Firebase Authentication** - User authentication
- **Firestore Database** - Cloud data storage

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── features/        # Feature-specific components
│   │   ├── filter/      # Filter panel and chips
│   │   ├── movie/       # Movie cards, grids, sections
│   │   ├── search/      # Search bar and results
│   │   └── wishlist/    # Wishlist button and grid
│   ├── layout/          # Layout components (Header, Footer)
│   └── ui/              # Reusable UI components (Shadcn)
├── pages/               # Page components
│   ├── Home.tsx
│   ├── MovieDetailPage.tsx
│   ├── RandomPick.tsx
│   ├── Search.tsx
│   ├── Top100.tsx
│   └── Wishlist.tsx
├── stores/              # Zustand stores
│   ├── authStore.ts
│   ├── filterStore.ts
│   ├── themeStore.ts
│   └── wishlistStore.ts
├── services/            # API services
│   ├── api.ts           # TMDB API client
│   └── firebase/        # Firebase services (planned)
├── utils/               # Utility functions
│   ├── constants.ts
│   ├── formatters.ts
│   └── imageHelpers.ts
└── types/               # TypeScript type definitions
    └── movie.ts
```

## 🎨 Design Philosophy

- **Bold Typography** - Clean, modern typography-first design
- **Dark Mode** - Sleek dark interface for comfortable viewing
- **Zero Border Radius** - Sharp, distinctive geometric aesthetic
- **Minimal & Focused** - No unnecessary features, just what matters

## 📄 Credits

- Movie data provided by [TMDB (The Movie Database)](https://www.themoviedb.org/)
- This product uses the TMDB API but is not endorsed or certified by TMDB

---

<p align="center">
Made with ❤️ as a portfolio project
</p>
