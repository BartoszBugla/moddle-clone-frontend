// Import the generated route tree
import { createMemoryHistory, createRouter } from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
})

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
