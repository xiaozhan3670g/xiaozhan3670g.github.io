import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Next Tools - 开发者工具集',
  description: '为开发者提供的常用工具集合',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-lg font-bold">开发者工具集</div>
            <div className="flex space-x-4">
              {/* 将 <a> 标签替换为 <Link> 组件 */}
              <Link href="/" className="hover:text-blue-400">
                首页
              </Link>
              <Link href="/tools/timestamp" className="hover:text-blue-400">
                时间戳工具
              </Link>
              <Link href="/tools/json" className="hover:text-blue-400">
                JSON 工具
              </Link>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}
