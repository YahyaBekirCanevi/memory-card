"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Quiz", href: "/quiz" },
  { name: "Learn", href: "/learn" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-background min-h-screen text-secondary">
      {/* Topbar */}
      <nav className={`w-full bg-background/80 py-4 fixed z-100`}>
        <div className="container flex items-center justify-between">
          <div className="container flex items-center justify-start">
            <div className="icon w-[60px] h-[60px]" />
            <h1 className="text-2xl font-extrabold text-primary tracking-wider ml-4">
              Memory Card
            </h1>
          </div>
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
        </div>
      </nav>

      {/* Page Content */}
      <main className="container pb-10 pt-[90px]">{children}</main>
    </div>
  );
}
