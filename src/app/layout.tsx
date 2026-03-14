import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BiteCampus · 校园干饭指南",
  description: "帮你解决每天最难的问题——今天吃什么？",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
