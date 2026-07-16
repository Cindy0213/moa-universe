import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "@/components/shared/AppProvider";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { PreferenceEffects } from "@/components/shared/PreferenceEffects";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOA UNIVERSE | TXT Magic Archive",
  description: "MOA追星宇宙，一个清新梦幻的 TXT 粉丝数字档案网站。",
  openGraph: {
    title: "MOA UNIVERSE",
    description: "TXT Magic Archive for MOA memories, timelines, collections, and guide.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <PreferenceEffects />
          <Navbar />
          {children}
          <MobileNavigation />
        </AppProvider>
      </body>
    </html>
  );
}
