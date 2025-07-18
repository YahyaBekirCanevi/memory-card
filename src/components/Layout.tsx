"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Quiz", href: "/quiz" },
  { name: "Learn", href: "/learn" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath="/api/auth">
      <div className="bg-background min-h-screen text-secondary">
        <Topbar />
        <main className="container pb-10 pt-[90px]">{children}</main>
      </div>
    </SessionProvider>
  );
}

function Topbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className={`w-full bg-background/80 py-4 fixed z-100`}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-primary tracking-tight ml-4">
          BrainBolt
        </Link>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-lg font-medium transition ${
                pathname === item.href
                  ? "text-primary"
                  : "text-secondary/70 hover:text-secondary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-end py-2 w-[100px]">
          {session ? (
            <button onClick={() => signOut()} className="btn text-lg">
              Logout
            </button>
          ) : (
            <Link href="/login" className="btn text-lg">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
