import { NavProvider } from "@/components/Nav";
import { Motion } from "@/components/Motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { JsonLd } from "@/components/JsonLd";
import { businessLd } from "@/lib/seo";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-cream">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <MobileBar />
      <Motion />
      <JsonLd data={businessLd} />
    </NavProvider>
  );
}
