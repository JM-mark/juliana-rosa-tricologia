import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { INDEXABLE, SITE, SITE_URL } from "@/config";
import { asset } from "@/lib/asset";
import { Shell } from "@/components/Shell";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--ff-display",
  display: "swap",
});
const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Tricologia e micropigmentação fio a fio em Nova Odessa | Juliana Rosa", template: "%s" },
  description: SITE.tagline + ". " + SITE.method + ".",
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [{ url: asset("/icon.png"), type: "image/png" }],
    apple: [{ url: asset("/apple-icon.png"), sizes: "180x180" }],
  },
};

export const viewport: Viewport = { themeColor: "#f4ece3", width: "device-width", initialScale: 1 };

// Marca "js" cedo (estados iniciais de animação só com JS) e decide a intro (1ª visita da sessão).
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(!sessionStorage.getItem('jr-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='1'}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
