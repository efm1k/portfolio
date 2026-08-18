"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/cn";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const panelId = useId();

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 items-center border border-border px-3 font-mono text-xs tracking-wide uppercase"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Закрыть" : "Меню"}
      </button>
      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-border bg-background"
        >
          <nav aria-label="Мобильная навигация" className="px-4 py-4">
            <ul className="flex flex-col gap-1">
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
                        "block px-2 py-3 text-base",
                        current ? "text-accent" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
