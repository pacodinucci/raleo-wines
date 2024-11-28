import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  montserrat,
  roboto,
  poppins,
  playfair,
  righteous,
  inter,
  raleway,
  anton,
  noto,
  lato,
  oswald,
  signika,
} from "@/lib/fonts";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          <Toaster richColors />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
