import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/context/languageContext";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dal Copilot",
  description: "Dal Copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="https://www.dal-demo.live/static/media/LogoMark.b58bee8dcba820ab1e4cfb4edb402eb3.svg" type="/ico" sizes="28x28" />
      </Head>
      <body >
          <LanguageProvider>
        <ClerkProvider>
              <main>
                {children}
                <Toaster />
              </main>
        </ClerkProvider>
          </LanguageProvider>
      </body>
    </html>
  );
}
