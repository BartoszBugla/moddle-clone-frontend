import { Api } from './api-client'
import { authRequestMiddleware } from './middlewares/auth-request-middleware'

const api = new Api({
  baseURL: 'http://localhost:5162',
})

api.instance.interceptors.request.use(authRequestMiddleware)

export { api }
