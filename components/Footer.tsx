'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { logoutAccount } from '@/lib/actions/user.actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    router.push('/sign-in');
    void loggedOut;
  }

  const initial = user?.firstName?.[0] ?? user?.name?.[0] ?? '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="footer w-full text-left transition-colors hover:bg-black/[0.04]">
          <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
            {initial}
          </div>
          <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
            <span className="truncate text-[13px] font-semibold text-foreground">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="truncate text-[12px] text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[220px]">
        <DropdownMenuLabel className="truncate">{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Footer
