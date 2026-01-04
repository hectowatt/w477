import type { Metadata } from "next";
import "/src/app/globals.css";
import { ReactNode } from "react";
import getConfig from "next/config";
import Image from "next/image"

const { publicRuntimeConfig } = getConfig();
const basePath = publicRuntimeConfig.basePath || "";

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "w477",
  description: "My blog by Next.js",
  icons: {
    icon: '${basePath}/favicon.ico', // favicon.icoのパス
    apple: '${basePath}/apple-touch-icon.png', // Apple向けアイコン
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${basePath}/apple-touch-icon.png`} />
        <style>{`:root { --base-path: '${basePath}'; }`}</style>
        <meta name="google-site-verification" content="HWHnOv44YHJ23JtvfwWQSQ83egNh3GvsAVcYHP5Ksf0" />
        <meta name="description" content="w477 Blog"></meta>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />

        {/* メインコンテンツとサイドバーを横並び */}
        <div className="flex flex-grow max-w-screen-lg mx-auto px-4 gap-4">

          {/* メインコンテンツ */}
          <main className="w-full lg:w-3/4 p-4 flex-grow">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header style={{ backgroundColor: "var(--header-bg)" }} className="text-black p-4 text-2xl border-b border-yellow">
      <div className="flex gap-4 items-center max-w-screen-lg mx-auto ">
        {process.env.NODE_ENV === "production" ? (
          <a
            href="https://hectowatt.github.io/w477/"
            rel="noopener noreferrer"
          >
            <img src={`${basePath}/w477.png`} alt="w477 Blog Icon"></img>
          </a>
        ) : (
          <a
            href="http://localhost:3000"
            rel="noopener noreferrer"
          >
            <img src={`${basePath}/w477.png`} alt="w477 Blog Icon"></img>
          </a>)
        }
        <h1>w477 Site</h1>
        <nav className="ml-auto">
          {process.env.NODE_ENV === "production" ? (
            <div>
              <a
                href="https://hectowatt.github.io/w477/"
                className="mr-4 hover:underline"
              >
                Home
              </a>
              <a
                href="https://hectowatt.github.io/w477/about"
                className="mr-4 hover:underline"
              >
                About
              </a>
              <a
                href="https://hectowatt.github.io/w477/blog"
                className="mr-4 hover:underline"
              >
                Blog
              </a>
            </div>
          ) : (
            <div>
              <a
                href="http://localhost:3000"
                className="mr-4 hover:underline"
              >
                Home
              </a>
              <a
                href="http://localhost:3000/about"
                className="mr-4 hover:underline"
              >
                About
              </a>
              <a
                href="http://localhost:3000/blog"
                className="mr-4 hover:underline"
              >
                Blog
              </a>
            </div>
          )
          }
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--footer-bg)" }}
      className="text-black p-4 mt-8"
    >
      <div className="max-w-screen-lg mx-auto">
        {/* 著作権表示 */}
        <p>©w477 Powered by Next.js</p>

        {/* アイコン */}
        <div className="flex gap-4">
          <a
            href="https://misskey.io/@sublimesab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${basePath}/MisskeyIcon.png`}
              alt="Misskey"
              className="hover:opacity-80 transition-opacity duration-300"
            />
          </a>
          <a
            href="https://github.com/hectowatt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${basePath}/github.png`}
              alt="Github"
              className="hover:opacity-80 transition-opacity duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
