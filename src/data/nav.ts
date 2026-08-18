export type NavItem = {
  href: string;
  label: string;
};

export const navItems: readonly NavItem[] = [
  { href: "/projects", label: "Проекты" },
  { href: "/about", label: "Опыт" },
  { href: "/about#about", label: "Обо мне" },
  { href: "/contact", label: "Контакты" },
] as const;
