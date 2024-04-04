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

interface CreateAuthStorageOptions {
  persist?: boolean
}

/**
 * Returns local or session storage based on the options or the current state of the storage.
 * @param options Options used to initialize the auth store storage.
 * @returns localStorage if `persist` is `true` or if the localStorage was initialized previously, and sessionStorage otherwise,
 * @example
 * createAuthStorage({ persist: true }) // returns localStorage
 * createAuthStorage({ persist: false }) // returns sessionStorage
 * createAuthStorage() // returns the localStorage if it was initialized, otherwise returns sessionStorage.
 */
const createAuthStorage = ({ persist }: CreateAuthStorageOptions = {}) => {
  const isPersistentStorageInitialized =
    !!localStorage.getItem(AUTH_STORAGE_KEY)

  if (persist ?? isPersistentStorageInitialized) {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    return localStorage
  }

  localStorage.removeItem(AUTH_STORAGE_KEY)
  return sessionStorage
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
        window.localStorage.clear()
        window.sessionStorage.clear()
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
      storage: createJSONStorage(createAuthStorage),
    }
  )
)

export const setAuthStorage = (options: CreateAuthStorageOptions) =>
  useAuth.persist.setOptions({
    name: AUTH_STORAGE_KEY,
    storage: createJSONStorage(() => createAuthStorage(options)),
  })
