# Meet Movie V2 重建計劃 🎬

> 使用 Claude Code 從零開始打造現代化電影推薦網站

## 📋 目錄

- [專案概述](#專案概述)
- [技術棧](#技術棧)
- [專案結構](#專案結構)
- [開發階段](#開發階段)
- [Claude Code 使用指南](#claude-code-使用指南)
- [關鍵功能清單](#關鍵功能清單)

---

## 專案概述

**專案名稱：** Meet Movie V2  
**目標：** 現代化電影推薦網站，展現前端最佳實踐  
**開發方式：** 使用 Claude Code 輔助開發  

**核心價值主張：**
- 解決選擇障礙：智能推薦與隨機挑片
- 快速瀏覽：熱門/高分電影排行
- 個人化：收藏清單與偏好設定
- 流暢體驗：現代 UI/UX 與效能優化

---

## 技術棧

### Core
\`\`\`json
{
  "runtime": "React 18.3+",
  "language": "TypeScript 5.0+",
  "buildTool": "Vite 5.0+",
  "routing": "React Router v6"
}
\`\`\`

### State Management
\`\`\`json
{
  "globalState": "Zustand",
  "serverState": "TanStack Query (React Query)",
  "formState": "React Hook Form"
}
\`\`\`

### Styling & UI
\`\`\`json
{
  "framework": "Tailwind CSS",
  "components": "shadcn/ui",
  "animations": "Framer Motion",
  "icons": "Lucide React"
}
\`\`\`

### Backend & Database
\`\`\`json
{
  "database": "Firebase Firestore",
  "authentication": "Firebase Auth",
  "storage": "Firebase Storage (海報/頭像)"
}
\`\`\`

### Testing & Quality
\`\`\`json
{
  "unitTest": "Vitest",
  "componentTest": "React Testing Library",
  "e2e": "Playwright (optional)",
  "linting": "ESLint + TypeScript ESLint",
  "formatting": "Prettier"
}
\`\`\`

### External APIs
\`\`\`json
{
  "movies": "TMDB API",
  "streaming": "JustWatch API (optional)"
}
\`\`\`

---

## 專案結構

\`\`\`
meet-movie-v2/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   └── features/
│   │       ├── movie/
│   │       │   ├── MovieCard.tsx
│   │       │   ├── MovieGrid.tsx
│   │       │   ├── MovieDetail.tsx
│   │       │   └── MovieSkeleton.tsx
│   │       ├── search/
│   │       │   ├── SearchBar.tsx
│   │       │   └── SearchResults.tsx
│   │       ├── filter/
│   │       │   ├── FilterPanel.tsx
│   │       │   └── FilterChips.tsx
│   │       └── wishlist/
│   │           ├── WishlistButton.tsx
│   │           └── WishlistGrid.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── MovieDetail.tsx
│   │   ├── Search.tsx
│   │   ├── Top100.tsx
│   │   ├── RandomPick.tsx
│   │   ├── Wishlist.tsx
│   │   └── NotFound.tsx
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── wishlistStore.ts
│   │   ├── filterStore.ts
│   │   └── themeStore.ts
│   ├── hooks/
│   │   ├── useMovies.ts
│   │   ├── useMovieDetail.ts
│   │   ├── useSearch.ts
│   │   ├── useWishlist.ts
│   │   └── useAuth.ts
│   ├── services/
│   │   ├── tmdb/
│   │   │   ├── api.ts
│   │   │   ├── endpoints.ts
│   │   │   └── types.ts
│   │   └── firebase/
│   │       ├── auth.ts
│   │       ├── firestore.ts
│   │       └── config.ts
│   ├── types/
│   │   ├── movie.ts
│   │   ├── user.ts
│   │   └── filter.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── styles/
│   │   └── globals.css
│   ├── lib/
│   │   └── utils.ts
│   └── main.tsx
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
\`\`\`

---

## 開發階段

#### Step 1.2: 安裝核心依賴

**Claude Code 提示詞：**
\`\`\`
請安裝以下依賴套件並更新 package.json：

核心依賴：
- react-router-dom
- zustand
- @tanstack/react-query
- axios
- react-hook-form
- zod

UI 相關：
- tailwindcss
- @radix-ui/react-* (各種 shadcn/ui 需要的套件)
- framer-motion
- lucide-react
- clsx
- tailwind-merge

Firebase：
- firebase

開發依賴：
- @types/node
- vitest
- @testing-library/react
- @testing-library/jest-dom
- eslint-config-prettier
- prettier
- prettier-plugin-tailwindcss

並設定好 Tailwind CSS 的配置
\`\`\`

#### Step 1.3: 設定開發工具

**Claude Code 提示詞：**
\`\`\`
請幫我設定開發工具：
1. 建立 .eslintrc.json，啟用 TypeScript 和 React 規則
2. 建立 .prettierrc，設定程式碼格式（2 空格縮排、單引號等）
3. 更新 tsconfig.json，啟用嚴格模式（strict: true）
4. 建立 .env.example 範本檔案
5. 建立 .gitignore（排除 node_modules, .env, dist 等）
\`\`\`

#### Step 1.4: 建立基礎專案結構

**Claude Code 提示詞：**
\`\`\`
請建立以下資料夾結構，並在每個資料夾放置一個 .gitkeep 檔案：
- src/components/ui
- src/components/layout
- src/components/features/movie
- src/components/features/search
- src/components/features/filter
- src/components/features/wishlist
- src/pages
- src/stores
- src/hooks
- src/services/tmdb
- src/services/firebase
- src/types
- src/utils
- src/lib
- tests/unit
- tests/integration

並建立以下基礎檔案（空白或基本模板即可）：
- src/app/router.tsx
- src/app/providers.tsx
- src/lib/utils.ts
- src/styles/globals.css
- src/utils/constants.ts
\`\`\`

---

### Phase 2: 設定 TMDB API 與基礎資料層 (Day 3-4)

#### Step 2.1: 設定 TMDB API Service

**Claude Code 提示詞：**
\`\`\`
請建立 TMDB API 的完整服務層：

1. src/services/tmdb/types.ts
   - 定義 Movie, MovieDetail, Genre, Cast, Video 等 TypeScript 介面
   - 參考 TMDB API 文檔：https://developer.themoviedb.org/docs

2. src/services/tmdb/endpoints.ts
   - 定義所有 API endpoints 常數
   - 包含：trending, popular, top_rated, search, movie detail, credits, videos

3. src/services/tmdb/api.ts
   - 使用 axios 建立 API client
   - 實作所有 API 呼叫函數：
     * getTrendingMovies()
     * getPopularMovies()
     * getTopRatedMovies()
     * searchMovies(query)
     * getMovieDetail(id)
     * getMovieCredits(id)
     * getMovieVideos(id)
     * discoverMovies(filters)
   - 加入錯誤處理和類型安全

4. 在 .env.example 加入 VITE_TMDB_API_KEY 說明
\`\`\`

#### Step 2.2: 建立 React Query Hooks

**Claude Code 提示詞：**
\`\`\`
請在 src/hooks/ 建立以下 React Query hooks：

1. useMovies.ts
   - useMovies(type: 'trending' | 'popular' | 'top_rated')
   - 使用 useInfiniteQuery 支援無限滾動
   - 包含 Loading, Error, Empty 狀態處理

2. useMovieDetail.ts
   - useMovieDetail(movieId: number)
   - 同時 fetch movie detail, credits, videos
   - 使用 useQueries 平行請求

3. useSearch.ts
   - useSearch(query: string)
   - 使用 debounce 避免過多請求
   - 空字串時不發送請求

4. 在 src/app/providers.tsx 設定 QueryClientProvider
   - 設定預設的 staleTime, cacheTime
   - 設定全域錯誤處理
\`\`\`

---

### Phase 3: Zustand Stores 與狀態管理 (Day 4-5)

#### Step 3.1: 建立 Zustand Stores

**Claude Code 提示詞：**
\`\`\`
請建立以下 Zustand stores，都要有完整的 TypeScript 類型：

1. src/stores/authStore.ts
   - State: user, isAuthenticated, isLoading
   - Actions: signIn, signOut, checkAuth
   - 與 Firebase Auth 整合（先用 mock）

2. src/stores/wishlistStore.ts
   - State: wishlist (Movie[]), isLoading
   - Actions: addToWishlist, removeFromWishlist, clearWishlist
   - 使用 localStorage 持久化（後續改成 Firebase）

3. src/stores/filterStore.ts
   - State: genres, year, rating, sortBy
   - Actions: setGenre, setYear, setRating, setSortBy, resetFilters
   - 支援 URL query params 同步

4. src/stores/themeStore.ts
   - State: theme ('light' | 'dark' | 'system')
   - Actions: setTheme, toggleTheme
   - 與 localStorage 同步
   - 實作系統主題偵測

每個 store 都要：
- 匯出 typed hooks (useAuthStore, useWishlistStore 等)
- 加入 devtools 支援
- 完整的 TypeScript 類型定義
\`\`\`

---

### Phase 4: UI Components 開發 (Day 6-10)

#### Step 4.1: 設定 shadcn/ui

**Claude Code 提示詞：**
\`\`\`
請設定 shadcn/ui：
1. 執行 npx shadcn-ui@latest init
2. 選擇 New York 風格、zinc 色彩
3. 安裝以下組件：
   - button
   - card
   - dialog
   - dropdown-menu
   - input
   - select
   - skeleton
   - toast
   - badge
   - tabs
   - sheet (側邊欄)
4. 確認 src/lib/utils.ts 的 cn() 函數正確設定
\`\`\`

#### Step 4.2: Layout 組件

**Claude Code 提示詞：**
\`\`\`
請建立 Layout 組件：

1. src/components/layout/Header.tsx
   - Logo + 導航連結 (Home, Top 100, Random, Wishlist)
   - 搜尋列（桌面版顯示，手機版隱藏）
   - 深色模式切換按鈕
   - 登入/使用者頭像按鈕
   - 響應式設計（手機版使用 Sheet 側邊欄）

2. src/components/layout/Footer.tsx
   - TMDB 版權聲明
   - GitHub 連結
   - 簡單的社群連結

3. src/components/layout/MainLayout.tsx
   - Header + children + Footer 的組合
   - 使用 Outlet (React Router v6)

使用 Tailwind CSS 和 shadcn/ui 組件，並加上 Framer Motion 動畫
\`\`\`

#### Step 4.3: Movie 相關組件

**Claude Code 提示詞：**
\`\`\`
請建立 Movie 相關組件：

1. src/components/features/movie/MovieCard.tsx
   - 顯示電影海報、標題、評分、年份
   - Hover 效果：顯示概述、類型、加入收藏按鈕
   - 支援骨架屏模式（isLoading prop）
   - 點擊跳轉到詳情頁
   - 使用 Framer Motion 的 hover 和 tap 動畫

2. src/components/features/movie/MovieGrid.tsx
   - 響應式網格佈局（1/2/3/4 欄）
   - 支援無限滾動（使用 IntersectionObserver）
   - Loading 狀態顯示 Skeleton
   - Empty 狀態顯示提示訊息

3. src/components/features/movie/MovieSkeleton.tsx
   - 使用 shadcn/ui Skeleton 組件
   - 符合 MovieCard 的外觀

4. src/components/features/movie/MovieDetail.tsx
   - Hero Section（背景、海報、標題、評分、類型）
   - 概述、演員卡片輪播（Swiper）
   - 預告片播放器（YouTube embed）
   - 相似電影推薦
   - 加入收藏按鈕（大型）
\`\`\`

#### Step 4.4: Search 與 Filter 組件

**Claude Code 提示詞：**
\`\`\`
請建立搜尋和篩選組件：

1. src/components/features/search/SearchBar.tsx
   - 使用 shadcn/ui Input
   - 即時搜尋建議（debounce 500ms）
   - 顯示搜尋歷史（localStorage）
   - 鍵盤導航支援（上下選擇、Enter 確認）

2. src/components/features/search/SearchResults.tsx
   - 顯示搜尋結果（MovieGrid 格式）
   - 無結果時顯示建議或隨機推薦

3. src/components/features/filter/FilterPanel.tsx
   - 類型多選（使用 shadcn/ui Checkbox）
   - 年份範圍滑桿
   - 評分篩選（星級選擇器）
   - 排序方式（下拉選單）
   - 重置按鈕
   - 桌面版側邊欄、手機版 Sheet

4. src/components/features/filter/FilterChips.tsx
   - 顯示已選篩選條件為 Badge
   - 可點擊移除單一條件
\`\`\`

#### Step 4.5: Wishlist 組件

**Claude Code 提示詞：**
\`\`\`
請建立收藏清單組件：

1. src/components/features/wishlist/WishlistButton.tsx
   - 愛心圖示按鈕（已收藏時填滿）
   - 點擊動畫（Framer Motion scale）
   - 連接 wishlistStore
   - Toast 提示訊息

2. src/components/features/wishlist/WishlistGrid.tsx
   - 複用 MovieGrid，但加上移除按鈕
   - 空狀態：引導使用者探索電影
   - 支援拖曳排序（optional，使用 dnd-kit）
\`\`\`

---

### Phase 5: Pages 開發 (Day 11-15)

#### Step 5.1: 首頁

**Claude Code 提示詞：**
\`\`\`
請建立 src/pages/Home.tsx：

1. Hero Section
   - 顯示今日推薦電影（輪播）
   - CTA 按鈕：「開始探索」、「隨機選片」

2. Trending Section
   - 使用 useMovies('trending')
   - MovieGrid 顯示
   - 無限滾動

3. Popular Section
   - 使用 useMovies('popular')
   - 僅顯示前 12 部
   - 「查看更多」按鈕

4. Top Rated Section
   - 使用 useMovies('top_rated')
   - 僅顯示前 12 部

所有 Section 都要有：
- 標題和副標題
- Loading 骨架屏
- 錯誤處理
- Framer Motion 進場動畫
\`\`\`

#### Step 5.2: 電影詳情頁

**Claude Code 提示詞：**
\`\`\`
請建立 src/pages/MovieDetail.tsx：

1. 使用 useParams 取得 movieId
2. 使用 useMovieDetail hook 取得資料
3. 使用 MovieDetail 組件顯示
4. SEO Meta Tags（使用 react-helmet-async）
5. 分享按鈕（複製連結、分享到社群）
6. 麵包屑導航
7. 404 處理（電影不存在）
\`\`\`

#### Step 5.3: Top 100 頁面

**Claude Code 提示詞：**
\`\`\`
請建立 src/pages/Top100.tsx：

1. Tabs 切換（電影 / 電視劇）
2. 使用 useMovies('top_rated')
3. 顯示排名編號（1-100）
4. MovieGrid 顯示
5. 無限滾動載入
\`\`\`

#### Step 5.4: 隨機挑片頁面

**Claude Code 提示詞：**
\`\`\`
請建立 src/pages/RandomPick.tsx：

1. 兩種模式：
   - 完全隨機：從熱門電影中隨機挑 3 部
   - 條件篩選隨機：使用 FilterPanel + 隨機挑選

2. 「重新選擇」按鈕（搖骰子動畫）
3. 結果卡片放大顯示（Framer Motion）
4. 可直接加入收藏或查看詳情
5. 有趣的文案：「選擇障礙救星」
\`\`\`

#### Step 5.5: 收藏清單頁面

**Claude Code 提示詞：**
\`\`\`
請建立 src/pages/Wishlist.tsx：

1. 顯示所有收藏的電影（使用 WishlistGrid）
2. 統計資訊：總數、平均評分、總時長
3. 清空收藏按鈕（需二次確認）
4. 匯出清單功能（複製為純文字或 JSON）
5. 未登入時引導登入
6. 空狀態引導探索
\`\`\`

#### Step 5.6: 搜尋結果頁面

**Claude Code 提示詞：**
\`\`\`
請建立 src/pages/Search.tsx：

1. 從 URL query 取得搜尋關鍵字
2. 使用 useSearch hook
3. 顯示搜尋結果數量
4. SearchResults 組件顯示
5. 相關搜尋建議
6. 篩選功能（可與搜尋結合）
\`\`\`

---

### Phase 6: Firebase 整合 (Day 16-18)

#### Step 6.1: Firebase 設定

**Claude Code 提示詞：**
\`\`\`
請建立 Firebase 服務層：

1. src/services/firebase/config.ts
   - Firebase 初始化
   - 從環境變數讀取設定
   - 匯出 auth, db, storage 實例

2. src/services/firebase/auth.ts
   - signInWithGoogle()
   - signOut()
   - onAuthStateChanged() 監聽
   - getCurrentUser()

3. src/services/firebase/firestore.ts
   - saveWishlist(userId, movies)
   - getWishlist(userId)
   - updateWishlist(userId, movieId, action)
   - Firestore 資料結構：
     users/{userId}/wishlist/{movieId}

4. 更新 .env.example 加入 Firebase 設定變數
\`\`\`

#### Step 6.2: 整合 Auth Store

**Claude Code 提示詞：**
\`\`\`
請更新 src/stores/authStore.ts：

1. 使用 Firebase Auth 取代 mock
2. 實作 signInWithGoogle (彈出視窗登入)
3. 實作 signOut
4. 在 App.tsx 加入 auth state listener
5. 建立 ProtectedRoute 組件（未登入跳轉）
\`\`\`

#### Step 6.3: 整合 Wishlist Store

**Claude Code 提示詞：**
\`\`\`
請更新 src/stores/wishlistStore.ts：

1. 登入時從 Firestore 同步收藏清單
2. 新增/移除時即時更新到 Firestore
3. 未登入時使用 localStorage
4. 登入時合併 localStorage 和雲端資料
5. 錯誤處理和重試機制
\`\`\`

---

### Phase 7: 測試 (Day 19-21)

#### Step 7.1: 單元測試

**Claude Code 提示詞：**
\`\`\`
請使用 Vitest 撰寫單元測試：

1. tests/unit/stores/wishlistStore.test.ts
   - 測試 add/remove/clear 功能
   - 測試 localStorage 持久化

2. tests/unit/utils/formatters.test.ts
   - 測試日期格式化
   - 測試評分顯示

3. tests/unit/hooks/useSearch.test.ts
   - 測試 debounce 行為
   - 測試空字串處理

設定 vitest.config.ts 並確保測試可執行
\`\`\`

#### Step 7.2: 組件測試

**Claude Code 提示詞：**
\`\`\`
請使用 React Testing Library 撰寫組件測試：

1. tests/integration/MovieCard.test.tsx
   - 測試渲染正確資訊
   - 測試點擊跳轉
   - 測試收藏按鈕

2. tests/integration/SearchBar.test.tsx
   - 測試輸入行為
   - 測試搜尋建議
   - 測試鍵盤導航

3. tests/integration/FilterPanel.test.tsx
   - 測試篩選選項
   - 測試重置功能

目標：測試覆蓋率達到 60% 以上
\`\`\`

---

### Phase 8: 優化與部署 (Day 22-25)

#### Step 8.1: 效能優化

**Claude Code 提示詞：**
\`\`\`
請進行效能優化：

1. 程式碼分割
   - 使用 React.lazy 和 Suspense
   - 路由層級的 code splitting
   - 大型套件動態載入（Framer Motion）

2. 圖片優化
   - 使用 TMDB 的縮圖 API
   - 實作圖片懶載入
   - 加入 loading="lazy" 和 placeholder

3. Bundle 優化
   - 分析 bundle size（vite-plugin-bundle-analyzer）
   - Tree shaking 確認
   - 移除未使用的依賴

4. React Query 優化
   - 設定合理的 staleTime
   - 預取常用資料（prefetch）
   - 背景重新驗證

目標：Lighthouse Performance 分數 90+
\`\`\`

#### Step 8.2: SEO 與 Meta Tags

**Claude Code 提示詞：**
\`\`\`
請加入 SEO 優化：

1. 安裝 react-helmet-async
2. 建立 SEO 組件（動態 meta tags）
3. 每個頁面加入適當的 title, description
4. Open Graph tags（社群分享預覽）
5. 結構化資料（JSON-LD）
6. sitemap.xml 生成
7. robots.txt
\`\`\`

#### Step 8.3: PWA 支援

**Claude Code 提示詞：**
\`\`\`
請加入 PWA 支援：

1. 使用 vite-plugin-pwa
2. 建立 manifest.json（名稱、icon、主題色）
3. Service Worker 快取策略
4. 離線頁面
5. 安裝提示（A2HS）
\`\`\`

#### Step 8.4: Vercel 部署

**Claude Code 提示詞：**
\`\`\`
請準備部署設定：

1. 建立 vercel.json 設定檔
2. 設定環境變數範例
3. 建立部署前檢查腳本
4. 設定 GitHub Actions（可選）
   - 每次 push 到 main 自動部署
   - PR 時執行測試

5. 撰寫部署步驟文檔於 README
\`\`\`

---

### Phase 9: 文檔與收尾 (Day 26-28)

#### Step 9.1: README 撰寫

**Claude Code 提示詞：**
\`\`\`
請撰寫專業的 README.md，包含：

1. 專案 Banner（可用 screenshot 或設計圖）
2. 專案簡介與特色
3. 技術棧（使用 shields.io badges）
4. 功能清單（使用 checkbox）
5. 專案結構說明
6. 安裝與執行步驟
7. 環境變數設定說明
8. 測試指令
9. 部署步驟
10. 技術亮點說明
11. 未來規劃
12. 授權聲明

參考 GitHub 熱門專案的 README 風格
\`\`\`

#### Step 9.2: 建立展示素材

**Claude Code 提示詞：**
\`\`\`
請協助準備展示素材：

1. 撰寫 FEATURES.md 詳細功能說明
2. 建立 TECH_DECISIONS.md 技術選型說明
3. 準備螢幕截圖清單（需要截圖的頁面）
4. 撰寫簡短的 Demo 腳本
5. 建立 CHANGELOG.md
\`\`\`

---

## Claude Code 使用指南

### 基本使用方式

#### 1. 啟動 Claude Code
\`\`\`bash
# 在專案目錄下
claude code
\`\`\`

#### 2. 下達指令的技巧

**❌ 不好的指令：**
\`\`\`
幫我寫一個電影卡片組件
\`\`\`

**✅ 好的指令：**
\`\`\`
請建立 src/components/features/movie/MovieCard.tsx：
- 接收 Movie 類型的 props
- 顯示海報（使用 TMDB 圖片 URL）
- 顯示標題、評分（星星圖示）、年份
- Hover 時顯示概述和「加入收藏」按鈕
- 使用 Tailwind CSS 和 shadcn/ui Card 組件
- 加入 Framer Motion 的 hover 動畫
- 點擊卡片跳轉到 /movie/:id
- 完整的 TypeScript 類型定義
\`\`\`

### 提示詞範本

#### 建立新功能
\`\`\`
請建立 [檔案路徑]：

功能需求：
1. [功能點 1]
2. [功能點 2]
3. [功能點 3]

技術要求：
- 使用 [技術/套件]
- [TypeScript/測試/樣式] 規範
- [效能/無障礙] 考量

範例：
[可選：提供參考程式碼或截圖]
\`\`\`

#### 除錯或修改
\`\`\`
目前遇到的問題：
[描述問題]

預期行為：
[應該要怎樣]

相關檔案：
- [檔案 1]
- [檔案 2]

請協助修正並說明原因
\`\`\`

#### 程式碼審查
\`\`\`
請審查 [檔案路徑]：

檢查項目：
- TypeScript 類型安全
- 效能問題（不必要的 re-render）
- 無障礙性（a11y）
- 錯誤處理
- 程式碼風格一致性

並提供改善建議
\`\`\`

### 進階技巧

#### 1. 多步驟任務
\`\`\`
請依序執行以下步驟：

Step 1: 建立 Movie 類型定義
- 定義於 src/types/movie.ts
- 包含所有 TMDB API 回傳欄位

Step 2: 建立 API service
- 實作 getMovieDetail 函數
- 使用剛才的類型定義

Step 3: 建立 React Query hook
- useMovieDetail(id)
- 錯誤和 loading 處理

每完成一步請等我確認再繼續
\`\`\`

#### 2. 要求解釋
\`\`\`
請建立 [功能]，並且：
1. 在程式碼中加入詳細註解
2. 說明為什麼這樣設計
3. 列出可能的替代方案
4. 提醒需要注意的事項
\`\`\`

#### 3. 測試導向開發
\`\`\`
請先撰寫 [組件] 的測試：
- 測試應該涵蓋 [情境 1], [情境 2]
- 使用 React Testing Library

然後再實作組件以通過測試
\`\`\`

### 常見問題處理

#### Q: Claude Code 產生的程式碼有錯誤？
\`\`\`
[複製錯誤訊息]

請修正上述錯誤，並確保：
- TypeScript 無類型錯誤
- ESLint 無警告
- 程式碼可正常執行
\`\`\`

#### Q: 想要調整產出的風格？
\`\`\`
請將程式碼改為：
- 使用箭頭函數（不要用 function 宣告）
- 使用具名匯出（不要用 default export）
- 使用 const/let（不要用 var）
- 加入 JSDoc 註解
\`\`\`

#### Q: 需要看到完整檔案內容？
\`\`\`
請顯示 [檔案路徑] 的完整內容
不要省略任何部分
\`\`\`

---

## 關鍵功能清單

### 必備功能（MVP）
- [ ] 首頁顯示熱門/流行/高分電影
- [ ] 電影搜尋（即時建議）
- [ ] 電影詳情頁（資訊、演員、預告片）
- [ ] Top 100 排行榜
- [ ] 隨機挑片（3 部）
- [ ] 收藏清單（localStorage）
- [ ] Google 登入
- [ ] 深色模式
- [ ] 響應式設計

### 進階功能
- [ ] 條件篩選（類型、年份、評分）
- [ ] 收藏清單雲端同步（Firebase）
- [ ] 基於收藏的推薦
- [ ] 分享功能（複製連結）
- [ ] 搜尋歷史
- [ ] 無限滾動
- [ ] 圖片懶載入
- [ ] PWA 離線支援

### 加分功能（時間允許）
- [ ] 多語系（i18n）
- [ ] 電視劇支援
- [ ] 演員/導演頁面
- [ ] 使用者評分/評論
- [ ] 觀看進度追蹤
- [ ] 串流平台查詢（JustWatch API）
- [ ] 社群分享（Open Graph）
- [ ] E2E 測試（Playwright）

---

## 時程規劃

| Week | 重點 | 交付成果 |
|------|------|----------|
| 1 | 專案設定 + 資料層 | 可運行的專案骨架、TMDB API 整合 |
| 2 | UI 組件開發 | 所有基礎組件完成 |
| 3 | 頁面整合 | 所有頁面功能完整 |
| 4 | Firebase + 測試 | 登入、雲端同步、測試覆蓋 60%+ |
| 5 | 優化與部署 | 上線可用的版本、完整文檔 |

---

## 檢查清單

### 開發前
- [ ] 申請 TMDB API Key
- [ ] 建立 Firebase 專案
- [ ] 準備好設計稿或 UI 參考

### 開發中
- [ ] 每個功能都有 TypeScript 類型
- [ ] 每個組件都考慮 Loading/Error/Empty 狀態
- [ ] 定期 commit（Conventional Commits）
- [ ] 關鍵功能撰寫測試

### 部署前
- [ ] Lighthouse 評分 90+
- [ ] 測試覆蓋率 60%+
- [ ] 無 TypeScript 錯誤
- [ ] 無 ESLint 警告
- [ ] README 完整
- [ ] 環境變數設定文檔
- [ ] Demo 影片或 GIF

---

## 參考資源

### 官方文檔
- [TMDB API Docs](https://developer.themoviedb.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Docs](https://firebase.google.com/docs)

### 靈感來源
- [IMDb](https://www.imdb.com/)
- [Letterboxd](https://letterboxd.com/)
- [Trakt](https://trakt.tv/)

---

## 注意事項

1. **TMDB API 使用限制**
   - 免費版有 rate limit
   - 圖片需使用 TMDB CDN
   - 必須顯示 TMDB logo

2. **Firebase 免費額度**
   - Firestore: 50k reads/day
   - Auth: 無限制
   - 注意查詢優化

3. **效能考量**
   - 圖片使用 WebP 格式
   - 啟用 Vite 的程式碼分割
   - React Query 設定合理的 cache time

4. **安全性**
   - API Key 不要 commit
   - Firebase rules 設定正確
   - 輸入驗證（XSS 防護）

---
