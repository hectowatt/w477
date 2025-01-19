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
          {/* サイドバー（プロフィールカード） */}
          <aside className="w-1/4">
            <ProfileCard />
          </aside>

          {/* メインコンテンツ */}
          <main className="p-4 w-3/4">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="text-black p-4 text-2xl border-b border-yellow">
      <div className="flex gap-4 items-center max-w-screen-lg mx-auto ">
        <a
          href="https://hectowatt.github.io/w477/"
          rel="noopener noreferrer"
        >
          <img src={`${basePath}/w477.png`} alt="w477 Blog Icon"></img>
        </a>
        <h1>w477 Blog</h1>
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


function ProfileCard() {
  return (
    <aside className="max-w-xs mx-auto p-2">
      <div >
        {/* プロフィール画像 */}
        <div className="relative w-14 h-14 mx-auto mb-4">
          <Image
            src={`${basePath}/w477.png`}
            alt="w477 icon"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        {/* 名前 */}
        <h2 className="text-xl font-bold mb-4">w477</h2>

        {/* 居住地 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Image
            src={`${basePath}/home.png`}
            alt="home icon"
            width={20}
            height={20}
          />
          <span>Japan</span>
        </div>

        {/* 職業 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Image
            src={`${basePath}/work.png`}
            alt="work icon"
            width={20}
            height={20}
          />
          <span>Software Engineer</span>
        </div>

        {/* SNS リンク */}
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <Image
              src={`${basePath}/misskey_mono.svg`}
              alt="Misskey icon"
              width={20}
              height={20}
            />
            <a
              href="https://misskey.io/@sublimesab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black"
            >
              Misskey
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Image
              src={`${basePath}/github-mark.png`}
              alt="GitHub icon"
              width={20}
              height={20}
            />
            <a
              href="https://github.com/hectowatt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

