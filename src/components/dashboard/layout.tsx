import { PropsWithChildren } from 'react'

export interface LayoutProps {}

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex flex-1 flex-col w-full px-4 bg-muted">
      {children}{' '}
    </main>
  )
}
