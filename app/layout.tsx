import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from '@next/font/google'
import { UserProvider } from "@/utils/UserProvider";

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
    <UserProvider>
      <html lang="pt-BR">
        <body className={roboto.className}>
          {children}
        </body>
      </html>
    </UserProvider>

  );
}
