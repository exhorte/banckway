import { Bell, Plus, Search } from 'lucide-react'

const Topbar = ({ user }: { user: User }) => {
  const initials =
    `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase() || 'U'

  return (
    <header className="shell-topbar">
      <div className="flex flex-1 items-center">
        <button
          type="button"
          className="group flex h-9 w-full max-w-[420px] items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 text-[13px] text-muted-foreground transition-colors hover:bg-muted"
        >
          <Search className="size-4" />
          <span className="flex-1 text-left">Search for anything</span>
          <kbd className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:flex">
            <span className="text-[12px]">⌘</span>K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-[18px]" />
        </button>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Create"
        >
          <Plus className="size-[18px]" />
        </button>
        <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-accent-foreground">
          {initials}
        </div>
      </div>
    </header>
  )
}

export default Topbar
