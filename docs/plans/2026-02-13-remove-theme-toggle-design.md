# 移除 Dark Mode 切換按鈕設計文件

**日期：** 2026-02-13
**狀態：** 已批准

## 問題描述

使用者回報 Header 中的 dark mode 切換按鈕無法正常運作：
- 點擊按鈕時圖示會變化（Sun/Moon 切換）
- 但頁面主題顏色不會改變

### 根本原因

在 `src/index.css` 中，`:root` 和 `.dark` 選擇器使用了完全相同的顏色值（都是深色主題）：

```css
:root {
  --background: rgb(10 10 10);  /* 深色背景 */
  --foreground: rgb(250 250 250); /* 淺色文字 */
  ...
}

.dark {
  --background: rgb(10 10 10);  /* 相同的深色背景 */
  --foreground: rgb(250 250 250); /* 相同的淺色文字 */
  ...
}
```

因此無論是否套用 `.dark` class，視覺效果都相同。

## 解決方案

採用**方案 2：保持純 dark mode，移除切換功能**

### 理由

1. 設計系統註解中明確表示 "Bold Typography is dark-first"
2. 目前的配色方案只設計了 dark mode
3. 移除按鈕比設計完整的 light mode 更快速、簡潔
4. 減少維護成本

## 架構變更

### 移除的部分

**Header.tsx：**
- 移除 `Moon`, `Sun` icon imports (第 7、9 行)
- 移除 `useThemeStore` import (第 23 行)
- 移除 `theme`, `toggleTheme` 的使用 (第 38 行)
- 移除 `isDark` 計算邏輯 (第 50-54 行)
- 移除整個主題切換按鈕區塊 (第 96-100 行)

### 保留的部分

- `src/stores/themeStore.ts` - 保留檔案（未來可能需要）
- `src/index.css` - 保留現有的 dark mode 顏色定義
- `html { color-scheme: dark; }` - 保持設定

## 預期結果

1. Header 右側少一個按鈕（主題切換按鈕）
2. 整個網站固定使用 dark mode
3. UI 更簡潔，減少使用者困惑
4. 無需維護 light/dark 兩套配色

## 未來考慮

如果未來需要支援 light mode：
1. 在 `:root` 定義 light mode 配色
2. 在 `.dark` 保持現有的 dark mode 配色
3. 恢復 Header 的切換按鈕

## 測試計劃

1. 視覺測試：檢查 Header 是否正常顯示（無主題切換按鈕）
2. 功能測試：確認其他 Header 功能正常（導航、搜尋、登入按鈕）
3. 樣式測試：確認整個網站保持 dark mode 外觀
