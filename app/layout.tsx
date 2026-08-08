import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minjoon Choi — Portfolio",
  description: "Selected works by Minjoon Choi.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
