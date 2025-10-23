import type { Metadata } from "next";
// Font Geist kamu sudah benar
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; 
import Header from "@/components/shared/Header"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillSync AI",
  description: "AI Career Roadmap Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 4. TAMBAHKAN suppressHydrationWarning
    <html lang="en" suppressHydrationWarning>
      <body
        // 5. GUNAKAN cn() untuk best practice
        className={cn(
          "min-h-screen bg-background antialiased", // <-- Style dasar Shadcn
          geistSans.variable,
          geistMono.variable
        )}
      >
        <Header /> {}
        <main>{children}</main> {}
      </body>
    </html>
  );
}