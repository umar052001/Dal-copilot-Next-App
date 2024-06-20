import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/context/languageContext";
import { Toaster } from "@/components/ui/toaster";

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
      <body >
        <ClerkProvider>
          <LanguageProvider>
              <main>
                {children}
                <Toaster />
              </main>
          </LanguageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
