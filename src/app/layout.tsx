import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { SkipLink } from "@/components/layout/skip-link";
import { AppProviders } from "@/components/shared/app-providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Clario",
    template: "%s | Clario",
  },
  description:
    "A client-management workspace for freelancers, consultants and small agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistSans.className}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <SkipLink />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}