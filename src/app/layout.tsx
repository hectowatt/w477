import type { Metadata } from "next";
import "/globals.css";
import { ReactNode } from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const basePath = publicRuntimeConfig.basePath || "";

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "w477",
  description: "My blog by Next.js",
  icons: {
    icon: "/favicon.ico", // favicon.icoのパス
    apple: "/apple-touch-icon.png", // Apple向けアイコン
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja" className="h-full">
      <body className="h-full flex flex-col min-h-screen">
        <Header />
        <Hero/>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="text-black p-4 text-2xl">
      <div className="flex gap-4 items-center">
        <a
          href="https://hectowatt.github.io/w477/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`${basePath}/w477.png`}></img>
        </a>
        <h1>w477 Blog</h1>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="hero-image">
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-black p-4 mt-8">
      <p>w477 Powered by Next.js</p>
      <div className="flex gap-4 mi-t">
        <a
          href="https://misskey.io/@sublimesab"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${basePath}/MisskeyIcon.png`}
            alt="Misskey"
            className="hover:opacity-80 transition-opacity duration-300"
          ></img>
        </a>
        <a
          href="https://github.com/hectowatt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${basePath}/github.png`}
            alt="Misskey"
            className="hover:opacity-80 transition-opacity duration-300"
          ></img>
        </a>
      </div>
    </footer>
  );
}
