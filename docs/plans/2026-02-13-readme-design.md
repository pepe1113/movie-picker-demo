# README 文件設計

**日期：** 2026-02-13
**狀態：** 已批准

## 目標

為 Movie Picker 專案建立雙語（英文/繁體中文）的展示型 README，作為 Portfolio 作品展示使用。

## 設計決策

### 語言策略：分檔案方式

建立兩個獨立的 README 檔案：
- `README.md` - 英文版（GitHub 預設顯示）
- `README.zh-TW.md` - 繁體中文版

**理由：**
1. 符合開源專案標準做法
2. 英文版優先展示，利於國際化呈現
3. 兩種語言獨立維護，閱讀體驗佳
4. 結構清晰，更新時明確

### README 類型：Portfolio 展示型

**定位：**
- 個人作品集展示用途
- 不提供下載/部署指南（非開源專案）
- 強調技術能力和專案成果

**重點：**
- ✅ 專案功能和特色
- ✅ 技術棧展示
- ✅ 視覺效果（截圖）
- ❌ 安裝步驟
- ❌ 使用說明
- ❌ 貢獻指南

## README 結構設計

### 檔案結構

```
README.md (英文版)
├── Title & Logo
├── Language Switch (🇬🇧 English | 🇹🇼 繁體中文)
├── Project Description
├── Important Notice
│   ├── Portfolio project disclaimer
│   └── TMDB API rate limit warning
├── Screenshots/Demo (placeholder)
├── ✨ Features
├── 🛠️ Tech Stack
├── 📁 Project Structure (optional)
└── 📄 License/Credits

README.zh-TW.md (繁體中文版)
└── (相同結構，繁體中文內容)
```

### 1. 專案標題區塊

**內容：**
- 專案名稱：Movie Picker
- 副標題：Modern Movie Recommendation Web App / 現代化電影推薦網站
- Badges（可選）：
  - React version badge
  - TypeScript badge
  - License badge

**語言切換連結：**
- 英文版：`[🇬🇧 English](./README.md) | [🇹🇼 繁體中文](./README.zh-TW.md)`
- 中文版：`[🇬🇧 English](./README.md) | [🇹🇼 繁體中文](./README.zh-TW.md)`

### 2. 專案簡介

**英文版：**
> A modern movie recommendation web app that helps you overcome choice paralysis. Discover popular movies, get random picks, and build your personal watchlist.

**中文版：**
> 現代化電影推薦網站，解決你的選擇障礙。探索熱門電影、隨機挑片、建立個人收藏清單。

### 3. 重要說明 (Important Notice)

**英文版：**
```markdown
📌 **Note**: This is a personal portfolio project for demonstration purposes.

⚠️ **API Limitation**: Uses TMDB API with rate limits - not intended for public deployment or distribution.
```

**中文版：**
```markdown
📌 **說明**：此專案僅作為個人作品集展示用途。

⚠️ **API 限制**：使用 TMDB API，有流量限制 - 不適合公開部署或分發使用。
```

### 4. 截圖/Demo 區塊

**設計：**
- 預留 3-4 個截圖位置
- 使用 placeholder 圖片或註解
- 建議截圖內容：
  1. 首頁 (Home)
  2. 隨機挑片 (Random Pick)
  3. 電影詳情頁 (Movie Detail)
  4. 收藏清單 (Wishlist)

**範例格式：**
```markdown
## 📸 Screenshots

> Screenshots will be added here

<!-- Placeholder for:
- Home page with popular movies
- Random pick feature with filtering
- Movie detail page
- Wishlist collection
-->
```

### 5. 功能特色 (Features)

**英文版：**
```markdown
## ✨ Features

- 🎲 **Random Pick** - Random movie selection with optional filters
- 🔥 **Top 100** - Popular and highly-rated movies
- ❤️ **Wishlist** - Build your personal movie collection
- 🔍 **Smart Search** - Quick movie discovery
- 📱 **Responsive Design** - Perfect on desktop and mobile
```

**中文版：**
```markdown
## ✨ 主要功能

- 🎲 **隨機挑片** - 完全隨機或條件篩選，讓命運幫你決定
- 🔥 **熱門排行** - Top 100 熱門與高分電影
- ❤️ **個人收藏** - 建立專屬的觀影清單
- 🔍 **智能搜尋** - 快速找到想看的電影
- 📱 **響應式設計** - 完美支援桌面與行動裝置
```

### 6. 技術棧 (Tech Stack)

**結構：**
```markdown
## 🛠️ Tech Stack

**Frontend**
- React 19 with TypeScript
- Vite - Build tool
- React Router - Navigation

**Styling**
- Tailwind CSS 4
- Shadcn UI - Component library
- Framer Motion - Animations

**State Management**
- Zustand - Global state
- React Query (TanStack Query) - Server state

**API & Data**
- TMDB API - Movie data source

**Planned Features**
- Firebase Authentication
- Firestore Database
```

### 7. 專案結構 (Project Structure) - 可選

**簡化版結構：**
```markdown
## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── features/    # Feature-specific components
│   ├── layout/      # Layout components
│   └── ui/          # Reusable UI components
├── pages/           # Page components
├── stores/          # Zustand stores
├── services/        # API services
├── utils/           # Utility functions
└── types/           # TypeScript types
```
```

### 8. 授權/致謝 (License/Credits)

**內容：**
```markdown
## 📄 Credits

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- This product uses the TMDB API but is not endorsed or certified by TMDB

---

Made with ❤️ as a portfolio project
```

## 設計原則

1. **視覺吸引力** - 使用 emoji、badges、清晰的區塊劃分
2. **簡潔明瞭** - 專注於展示成果，不提供冗長的使用說明
3. **專業性** - 明確標示專案性質和限制
4. **雙語完整** - 兩個版本都包含完整資訊
5. **易於維護** - 結構清晰，未來更新截圖或內容都很方便

## 實作注意事項

1. **截圖預留** - 先使用 placeholder 註解，未來補上實際截圖
2. **Badges** - 可使用 shields.io 生成技術棧 badges
3. **連結** - 確保語言切換連結正確
4. **格式一致** - 兩個版本保持相同的結構和排版
5. **TMDB 聲明** - 必須包含 TMDB API 使用聲明（符合使用條款）

## 未來擴充

如果專案完成度提高，可考慮添加：
- Live Demo 連結
- 實際的專案截圖/GIF
- 技術架構圖
- 效能指標
- 已知限制說明
