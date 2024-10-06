import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from '@next/font/google'

export const metadata: Metadata = {
  title: "Livraria",
  description: "Sistema Livraria",
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
