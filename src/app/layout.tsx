import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CompareProvider } from "@/context/CompareContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Opura AI — AI Shopping Assistant",
  description:
    "BotMakers Full Stack Intern Assignment — AI-powered shopping assistant with product search and comparison.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <CompareProvider>{children}</CompareProvider>
      </body>
    </html>
  );
}
