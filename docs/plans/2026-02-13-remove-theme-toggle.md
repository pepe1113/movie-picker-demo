# 移除 Dark Mode 切換按鈕實作計劃

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 從 Header 移除無法正常運作的 dark mode 切換按鈕，保持網站純 dark mode 設計

**Architecture:** 單一檔案修改 - 從 Header.tsx 移除主題切換相關的 imports、state、邏輯和 UI 元素

**Tech Stack:** React, TypeScript, Zustand

---

## Task 1: 移除未使用的 Icon Imports

**Files:**
- Modify: `src/components/layout/Header.tsx:1-13`

**Step 1: 移除 Moon 和 Sun icons**

在 `Header.tsx` 的 import 區塊，從 lucide-react 的 import 中移除 `Moon` 和 `Sun`：

修改前（第 3-13 行）：
```typescript
import {
  Film,
  Heart,
  Menu,
  Moon,
  Search,
  Sun,
  User,
  Dice5,
  TrendingUp,
} from 'lucide-react'
```

修改後：
```typescript
import {
  Film,
  Heart,
  Menu,
  Search,
  User,
  Dice5,
  TrendingUp,
} from 'lucide-react'
```

**Step 2: 驗證語法正確**

Run: `npm run build` 或開啟 dev server 確認無編譯錯誤

Expected: 編譯成功，無錯誤訊息

---

## Task 2: 移除 Theme Store Import

**Files:**
- Modify: `src/components/layout/Header.tsx:23`

**Step 1: 移除 useThemeStore import**

刪除第 23 行：
```typescript
import { useThemeStore } from '@/stores/themeStore'
```

**Step 2: 驗證編譯**

Run: 檢查 dev server 或執行 `npm run build`

Expected: 編譯成功

---

## Task 3: 移除 Theme 相關邏輯

**Files:**
- Modify: `src/components/layout/Header.tsx:34-54`

**Step 1: 移除 theme 和 toggleTheme 的解構**

在 `Header` 函數內部（約第 38 行），移除：
```typescript
const { theme, toggleTheme } = useThemeStore()
```

**Step 2: 移除 isDark 計算邏輯**

移除第 50-54 行：
```typescript
const isDark =
  theme === 'dark' ||
  (theme === 'system' &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
```

**Step 3: 驗證編譯**

Run: 檢查 dev server

Expected: 編譯成功，無未使用變數警告

---

## Task 4: 移除主題切換按鈕 UI

**Files:**
- Modify: `src/components/layout/Header.tsx:94-100`

**Step 1: 刪除按鈕區塊**

移除第 96-100 行（在 "右側操作" 區塊內）：
```typescript
{/* 深色模式切換 */}
<Button variant="ghost" size="icon" onClick={toggleTheme}>
  {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
  <span className="sr-only">切換主題</span>
</Button>
```

**Step 2: 確認 UI 區塊結構完整**

修改後的 "右側操作" 區塊（第 95 行附近）應該只包含：
- 登入/使用者按鈕
- 手機版選單按鈕

```typescript
<div className="ml-auto flex items-center gap-1 md:ml-0">
  {/* 登入/使用者 */}
  {isAuthenticated ? (
    <Button variant="ghost" size="sm" onClick={() => signOut()}>
      <User className="size-4" />
      <span className="hidden sm:inline">
        {user?.displayName ?? '使用者'}
      </span>
    </Button>
  ) : (
    <Button variant="ghost" size="sm" onClick={() => signIn()}>
      <User className="size-4" />
      <span className="hidden sm:inline">登入</span>
    </Button>
  )}

  {/* 手機版選單 */}
  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
    ...
  </Sheet>
</div>
```

**Step 3: 視覺測試**

Run: 在瀏覽器開啟應用程式

Expected:
- Header 右側沒有 Sun/Moon 圖示按鈕
- 登入按鈕正常顯示
- 手機版選單按鈕正常顯示
- 整體排版沒有錯位

---

## Task 5: 最終驗證與提交

**Files:**
- Modify: `src/components/layout/Header.tsx`

**Step 1: 完整功能測試**

測試項目：
1. Header 所有導航連結可點擊
2. 搜尋功能正常運作
3. 登入/登出按鈕正常
4. 手機版選單可開啟/關閉
5. 整個網站保持 dark mode 外觀

**Step 2: 檢查 linting**

Run: `npm run lint`

Expected: 無 linting 錯誤

**Step 3: Commit 變更**

```bash
git add src/components/layout/Header.tsx
git commit -m "$(cat <<'EOF'
refactor: remove non-functional theme toggle button from Header

- Remove Moon and Sun icon imports
- Remove useThemeStore usage
- Remove theme toggle button UI
- Keep website in dark mode only

Resolves issue where theme toggle button was not working
(root and .dark CSS variables had identical colors)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

Expected: Commit 成功

---

## Task 6: 文件更新（可選）

**Files:**
- Check: `docs/plans/2026-02-13-remove-theme-toggle-design.md`

**Step 1: 確認設計文件已更新狀態**

在設計文件頂部，確認狀態為「已完成」或「已實作」

**Step 2: 最終 commit（如有修改文件）**

```bash
git add docs/plans/2026-02-13-remove-theme-toggle-design.md
git commit -m "docs: mark theme toggle removal as completed"
```

---

## 預期結果

1. ✅ Header 不再顯示主題切換按鈕
2. ✅ 無編譯錯誤或 linting 警告
3. ✅ 所有其他 Header 功能正常運作
4. ✅ 網站保持 dark mode 外觀
5. ✅ 程式碼乾淨，無未使用的 imports

## 注意事項

- 不要移除 `src/stores/themeStore.ts` 檔案（保留以備未來使用）
- 不要修改 `src/index.css` 的顏色定義
- 確保移除按鈕後，Header 右側的其他按鈕排版正常
