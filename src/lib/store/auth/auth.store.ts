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
            accessTokenPayload: {
              role: (decoded as any)[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
              ],

              id: (decoded as any)[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
              ],

              name: (decoded as any)[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
              ],
            },
          }))
        }
      },
      signOut: () => {
        set(() => defaultAuthState)
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
