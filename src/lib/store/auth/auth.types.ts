import { JwtPayload } from 'jwt-decode'

export interface AccessTokenPayload extends JwtPayload {}

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
  setTokenPayload: (tokenPayload: Partial<AccessTokenPayload>) => void
}

export type AuthStore = AuthState & AuthActions
