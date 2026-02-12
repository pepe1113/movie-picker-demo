import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { User } from '@/types/user'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      signIn: async () => {
        set({ isLoading: true }, false, 'signIn/start')
        // TODO: Phase 6 替換為 Firebase Auth
        const mockUser: User = {
          uid: 'mock-uid',
          email: 'user@example.com',
          displayName: 'Mock User',
          photoURL: null,
        }
        set(
          { user: mockUser, isAuthenticated: true, isLoading: false },
          false,
          'signIn/success',
        )
      },

      signOut: async () => {
        set({ isLoading: true }, false, 'signOut/start')
        // TODO: Phase 6 替換為 Firebase Auth
        set(
          { user: null, isAuthenticated: false, isLoading: false },
          false,
          'signOut/success',
        )
      },

      setUser: (user) => {
        set(
          { user, isAuthenticated: user !== null, isLoading: false },
          false,
          'setUser',
        )
      },

      setLoading: (isLoading) => {
        set({ isLoading }, false, 'setLoading')
      },
    }),
    { name: 'auth-store' },
  ),
)
