import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">开发者工具集</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/tools/timestamp"
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
        >
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Unix 时间戳转换
          </h2>
          <p className="text-gray-600">
            在 Unix 时间戳和人类可读时间之间进行转换，支持多时区
          </p>
        </Link>
        
        <Link
          href="/tools/json"
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
        >
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            JSON 格式化工具
          </h2>
          <p className="text-gray-600">
            JSON 字符串的格式化、验证、压缩和美化
          </p>
        </Link>
      </div>
    </div>
  );
}
