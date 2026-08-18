"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-sm tracking-[0.14em] text-foreground uppercase"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const path = item.href.split("#")[0] ?? item.href;
              const hashed = item.href.includes("#");
              const current =
                !hashed &&
                (pathname === path || pathname.startsWith(`${path}/`));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "text-sm transition-colors",
                      current
                        ? "text-accent"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <MobileNav />
      </Container>
    </header>
  );
}
