export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full bg-background font-sans">
      <div className="flex w-full flex-col lg:w-1/2">{children}</div>

      <aside className="auth-asset">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-[13px] font-bold">F</span>
            </span>
            <span className="text-[17px] font-semibold tracking-tight text-foreground">
              Finway
            </span>
          </div>

          <h2 className="display text-[28px] leading-tight text-foreground">
            Every account, card and transfer in one clean view.
          </h2>
          <p className="mt-3 text-[14px] text-muted-foreground">
            Finway connects your banks through Plaid and moves money with Dwolla —
            so you always know where things stand.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-card">
            <p className="text-[12px] font-medium text-muted-foreground">
              Total balance
            </p>
            <p className="tnum mt-1 text-[26px] font-semibold tracking-tight text-foreground">
              $128,430.55
            </p>
            <div className="mt-4 flex h-[90px] items-end gap-2">
              {[38, 52, 44, 63, 58, 74, 69, 88].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[3px] bg-primary/60"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
