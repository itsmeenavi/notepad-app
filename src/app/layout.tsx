import type { Metadata } from "next";
// Remove Geist font imports
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Remove Geist font setup
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Temp Note App", // Updated title
  description: "Create temporary, shareable text notes.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Remove font variables from className */}
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
