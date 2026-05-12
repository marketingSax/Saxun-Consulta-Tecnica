import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { TabProvider } from "@/context/TabContext";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"],
  variable: "--font-display" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "Dossier Celosías Saxun | Inteligencia Técnica",
  description: "Consulta avanzada de especificaciones técnicas Saxun con IA",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-sans bg-brand-bg text-white">
        <TabProvider>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </TabProvider>
      </body>
    </html>
  );
}
