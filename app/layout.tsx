import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Smart Bookmark App",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
