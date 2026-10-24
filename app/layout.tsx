import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FiboRSI8 Monitor",
  description: "Live status of the FiboRSI8 Telegram signal bot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
