import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { INDEXABLE, SITE, SITE_URL } from "@/config";
import { asset } from "@/lib/asset";
import { Shell } from "@/components/Shell";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--ff-display",
  display: "swap",
});
const signature = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--ff-sig", display: "swap" });
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

export const viewport: Viewport = { themeColor: "#f4ece3", width: "device-width", initialScale: 1, viewportFit: "cover" };

// Marca "js" cedo (estados iniciais de animação só com JS) e decide a intro (1ª visita da sessão).
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(!sessionStorage.getItem('jr-intro')){d.dataset.intro='1';sessionStorage.setItem('jr-intro','1')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${signature.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
