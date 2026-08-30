'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <div className="flex flex-1 flex-col gap-1">
        <Link href="/" className="mb-4 flex items-center gap-2 px-2.5 py-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Image
              src="/icons/logo.svg"
              width={16}
              height={16}
              alt="Finway logo"
              className="brightness-0 invert"
            />
          </span>
          <h1 className="sidebar-logo">Finway</h1>
        </Link>

        <nav className="flex flex-col gap-0.5">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

            return (
              <Link href={item.route} key={item.label}
                className={cn('sidebar-link', { 'sidebar-link-active': isActive })}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={18}
                  height={18}
                  className={cn('shrink-0 transition-opacity', isActive ? 'opacity-100' : 'opacity-55')}
                />
                <p className="sidebar-label">{item.label}</p>
              </Link>
            )
          })}
        </nav>

        <div className="mt-4 border-t border-border pt-3">
          <PlaidLink user={user} />
        </div>
      </div>

      <Footer user={user} />
    </section>
  )
}

export default Sidebar
