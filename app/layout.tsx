import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "World App Atlas — Delivery & Service Apps Around the Globe",
  description:
    "An interactive editorial dataviz of the most-used delivery, ride-hailing, fintech, and super-apps in every region of the world.",
  authors: [{ name: "World App Atlas" }],
  openGraph: {
    title: "World App Atlas",
    description:
      "The most popular delivery and service apps used in every country.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-ink text-bone antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
