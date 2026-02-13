import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
}

interface ThemeActions {
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

type ThemeStore = ThemeState & ThemeActions

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  root.classList.toggle('dark', isDark)
}

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        // State
        theme: 'system',

        // Actions
        setTheme: (theme) => {
          set({ theme }, false, 'setTheme')
          applyTheme(theme)
        },

        toggleTheme: () => {
          set(
            (state) => {
              const next = state.theme === 'dark' ? 'light' : 'dark'
              applyTheme(next)
              return { theme: next }
            },
            false,
            'toggleTheme',
          )
        },
      }),
      {
        name: 'theme-storage',
        onRehydrateStorage: () => (state) => {
          if (state) {
            applyTheme(state.theme)
          }
        },
      },
    ),
    { name: 'theme-store' },
  ),
)

// 監聽系統主題變更
if (typeof window !== 'undefined') {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      const { theme } = useThemeStore.getState()
      if (theme === 'system') {
        applyTheme('system')
      }
    })
}
