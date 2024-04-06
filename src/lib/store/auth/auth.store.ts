import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import {
  AccessTokenPayload,
  AuthState,
  AuthStore,
  SignInPayload,
} from './auth.types'

const AUTH_STORAGE_KEY = 'auth.store'

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  accessTokenPayload: null,
}

const decodeToken = (token: string | null) => {
  try {
    if (!token) return
    return jwtDecode<AccessTokenPayload>(token)
  } catch {
    return
  }
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      ...defaultAuthState,
      signIn: ({ accessToken, refreshToken }: SignInPayload) => {
        const decoded = decodeToken(accessToken || '')
        /** allow only decodeable tokens */
        if (decoded) {
          set(() => ({
            accessToken,
            refreshToken,
            isAuthenticated: !!accessToken,
            user: null,
            accessTokenPayload: decoded,
          }))
        }
      },
      signOut: () => {
        set(() => defaultAuthState)
      },
      setTokenPayload: (payload) => {
        set((prev) => ({
          accessTokenPayload: {
            ...prev.accessTokenPayload,
            ...payload,
          },
        }))
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
