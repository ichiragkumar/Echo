import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Echo - The Future of Perception",
  description: "Real-Time Multimodal Affective Overlays and Agentic Intervention Frameworks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[var(--color-midnight)] text-[var(--color-grey-50)]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
