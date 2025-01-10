import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Image from "next/image";
import HeaderNavLinks from "./ui/header-nav-links";


export const metadata: Metadata = {
  title: "UwUmedia",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} antialiased`}
      >
        <header>
          <div className="max-w-screen-2xl m-auto">
            <Image src='/logos/logo-primary.svg' alt="Logo UwUmedia" width={300} height={100} priority/>
          </div>
          <div className="bg-white border-y-secondary-color border-4 w-full">
            <div className="max-w-screen-2xl m-auto">
              <div className="flex flex-wrap">
                <HeaderNavLinks/>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-screen-2xl m-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
