'use client'

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Footer from "./Footer"

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[264px] border-border bg-[hsl(var(--sidebar))] p-3">
        <Link href="/" className="mb-4 flex items-center gap-2 px-2.5 py-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Image src="/icons/logo.svg" width={16} height={16} alt="Finway" className="brightness-0 invert" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-foreground">Finway</span>
        </Link>

        <div className="mobilenav-sheet">
          <nav className="flex flex-col gap-0.5">
            {sidebarLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

              return (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.route}
                    className={cn('mobilenav-sheet_close', isActive && 'bg-white text-foreground shadow-[0_1px_2px_rgba(16,24,40,0.06),0_0_0_1px_rgba(16,24,40,0.04)]')}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={18}
                      height={18}
                      className={cn(isActive ? 'opacity-100' : 'opacity-55')}
                    />
                    <span>{item.label}</span>
                  </Link>
                </SheetClose>
              )
            })}
          </nav>

          <Footer user={user} type="mobile" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
