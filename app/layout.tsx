import "./globals.css";

import { GeistSans } from "geist/font/sans";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Blog",
  description: "Next.js Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
