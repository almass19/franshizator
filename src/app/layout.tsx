import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Франшизатор — Упаковка и продажа франшиз под ключ",
  description:
    "Полное сопровождение после запуска: от первой продажи до построения франчайзинговой сети",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
