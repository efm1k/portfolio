import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-family",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono-family",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.summary,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Full-stack developer",
    "PHP",
    "TypeScript",
    "Next.js",
    "Telegram Mini Apps",
    "AI integrations",
    "legacy modernization",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Portfolio`,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    description: siteConfig.summary,
    knowsAbout: [
      "PHP",
      "WordPress",
      "Bitrix",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Telegram Mini Apps",
      "REST API",
      "SQL",
      "Python",
      "n8n",
      "LLM integrations",
    ],
    sameAs: [
      siteConfig.contacts.github
        ? `https://github.com/${siteConfig.contacts.github.replace(/^@/, "")}`
        : undefined,
      siteConfig.contacts.telegram
        ? `https://t.me/${siteConfig.contacts.telegram.replace(/^@/, "")}`
        : undefined,
    ].filter((value): value is string => Boolean(value)),
  };

  return (
    <html
      lang={siteConfig.language}
      className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SkipLink />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
