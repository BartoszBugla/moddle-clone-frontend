// Import the generated route tree
import { createHashHistory, createRouter } from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'

const memoryHistory = createHashHistory({})

// Create a new router instance
export const router = createRouter({
  routeTree,
  basepath: '/moddle-clone-frontend',
  history: memoryHistory,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
