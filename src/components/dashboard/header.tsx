import { Link } from '@tanstack/react-router'
import { CircleUser, Menu } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
} from '@/components/ui'
import { Route as DashboardRoute } from '@/routes/_protected/dashboard'
import { Button } from '../ui/button'
import { SheetContent, SheetTrigger } from '../ui/sheet'

export interface HeaderProps {}

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
]

export const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-transparent backdrop-blur-[20px] px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground text-nowrap"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <CircleUser className="h-5 w-5" />
              <span>Bartosz Bugla</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
