import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alperen Demirli | Technical Manager",
  description:
    "Technical Manager with major project experience across airports, metro, hospitality, infrastructure, and operational readiness environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}