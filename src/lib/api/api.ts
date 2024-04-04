import { Api } from './api-client'
import { authRequestMiddleware } from './middlewares/auth-request-middleware'

const api = new Api({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.instance.interceptors.request.use(authRequestMiddleware)

export { api }
