import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Panel - Maestro Commerce",
  description: "管理画面 - Maestro Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
