import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vazirmatnFont = localFont({
  src: [
    {
      path: "../../public/fonts/vazirmatn/Vazirmatn[wght].woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "block",
});

export const metadata: Metadata = {
  title: "پنل کولر هوشمند",
  description: "مدیریت هوشمند و از راه دور کولر",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatnFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
