import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import { ExitIntentModal } from "@/components/site/exit-intent-modal";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SuperBox — One tool. Three tasks.",
  description:
    "The 3-in-1 Laser Measuring Tape Tool. 60m laser, 5m steel tape, 90° cross-line laser. Built for the job site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <ExitIntentModal />
      </body>
    </html>
  );
}
