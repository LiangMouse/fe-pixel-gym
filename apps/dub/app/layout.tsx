import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linear Landing - Pixel Gym",
  description: "像素级设计练习 - Linear 首页",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
