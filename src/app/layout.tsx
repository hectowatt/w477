import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "w477",
  description: "My blog by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <Header />
        <Hero></Hero>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="text-white p-4">
      <h1>w477 Blog</h1>
    </header>
  );
}

function Hero() {
  return (
    <div
      className="bg-cover bg-center h-64 flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-image.jpg')" }}
    >
      <h2 className="text-white text-4xl font-bold">Welcome to My Site</h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <p>© 2024 w477</p>
    </footer>
  );
}
