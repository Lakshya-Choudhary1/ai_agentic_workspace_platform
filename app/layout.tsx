import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/AppShell";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import {dark} from "@clerk/ui/themes"

import { ClerkProvider , useAuth } from "@clerk/nextjs";

const spicySale = localFont({
  src: "./fonts/spicy_sale/Spicy_Sale.otf",
  variable: "--font-spicy-local",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agentic Workspace",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {

 

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        spicySale.variable,
      )}
    >
      <body className={`min-h-full flex flex-col dark`}>
        <ClerkProvider 
          appearance={{
            theme:dark,
            variables : {colorPrimary : "oklch(0.488 0.243 264.376)"}
          }}>
          <TooltipProvider>
            <AppShell>{children}</AppShell>
          </TooltipProvider>
        </ClerkProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
