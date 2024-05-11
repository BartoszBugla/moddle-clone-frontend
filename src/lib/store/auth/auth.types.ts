import { JwtPayload } from 'jwt-decode'

export interface AccessTokenPayload extends JwtPayload {
  role: string
  name: string
}

export interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  accessTokenPayload: AccessTokenPayload | null
}

export interface SignInPayload {
  accessToken?: string
  refreshToken?: string
}

export interface SetTokenPayload {
  accessToken?: string
  refreshToken?: string
}

export interface AuthActions {
  signIn: (payload: SignInPayload) => void
  signOut: () => void
}

export type AuthStore = AuthState & AuthActions
