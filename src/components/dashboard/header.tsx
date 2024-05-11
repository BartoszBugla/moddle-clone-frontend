import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Check, CheckCircle, CircleUser, Menu, X } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
} from '@/components/ui'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/store/auth'
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

const myInvitations = [{ id: '1', name: 'Invitation 1' }]

export const Header = () => {
  const profile = useAuth((state) => state.accessTokenPayload)

  const { data } = useQuery({
    queryKey: ['my-invitations'],
    queryFn: api.enrollment.invitedCourseList,
  })

  // const { mutateAsync } = useMutation({
  //   mutationFn: api,
  // })

  return (
    <header className="sticky top-0 flex z-50 h-16 items-center gap-4 border-b-2 backdrop-blur-[20px] px-4 md:px-6 bg-background/50">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              Invitations {`(${(data || []).length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(data || []).length === 0 && (
              <DropdownMenuLabel className="flex flex-row gap-2 items-center">
                <span className="text-sm font-normal">No new invitations</span>
                <CheckCircle className="size-4" />
              </DropdownMenuLabel>
            )}
            {(data || []).map((invitation) => (
              <DropdownMenuLabel
                key={invitation.id}
                className="flex flex-row gap-2 items-center"
              >
                <span className="text-sm font-normal">My Account </span>
                <Button size="icon" variant="ghost">
                  <Check className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <X className="size-4" />
                </Button>
              </DropdownMenuLabel>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
              <span>{profile.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/logout">
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
