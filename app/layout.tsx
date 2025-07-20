import type React from "react";
import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/error-boundary";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "Dua & Ruqyah - Islamic Supplications",
  description: "Authentic Islamic duas from the Quran and Sunnah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${amiri.variable}`}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
