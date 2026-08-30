import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect("/sign-in");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar user={loggedIn} />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="root-layout">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Image
                src="/icons/logo.svg"
                width={16}
                height={16}
                alt="Finway"
                className="brightness-0 invert"
              />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Finway</span>
          </Link>
          <MobileNav user={loggedIn} />
        </div>

        <div className="hidden md:block">
          <Topbar user={loggedIn} />
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
