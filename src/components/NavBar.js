"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState('');
  const pathname = usePathname();

  // 定义菜单项及其子菜单
  const menuItems = {
    timestamp: { title: '时间戳', path: '/tools/timestamp' },
    json: { title: 'JSON', path: '/tools/json' },
    base64: {
      title: 'Base64',
      subItems: [
        { title: 'Base64 编码', path: '/tools/base64/encode' },
        { title: 'Base64 解码', path: '/tools/base64/decode' },
      ],
    },
  };

  // 获取当前路径对应的主菜单
  const getCurrentMenu = () => {
    if (pathname.includes('/base64')) return 'base64';
    if (pathname.includes('/json')) return 'json';
    if (pathname.includes('/timestamp')) return 'timestamp';
    return '';
  };

  // 处理菜单项点击
  const handleMenuItemClick = (key) => {
    if (activeSubmenu === key) {
      setActiveSubmenu('');
    } else {
      setActiveSubmenu(key);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold hover:text-blue-400">
          工具箱
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-1 hover:text-blue-400"
          >
            <span>导航</span>
            <svg
              className={`w-4 h-4 transform transition-transform duration-200 ${
                menuOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
              {Object.entries(menuItems).map(([key, item]) => (
                <div key={key}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => handleMenuItemClick(key)}
                        className={`w-full text-left px-4 py-2 font-medium hover:bg-gray-100 flex justify-between items-center ${
                          activeSubmenu === key ? 'bg-gray-100' : ''
                        }`}
                      >
                        {item.title}
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-200 ${
                            activeSubmenu === key ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {activeSubmenu === key && (
                        <div className="bg-gray-50">
                          {item.subItems.map(subItem => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className="block px-6 py-2 hover:bg-gray-100"
                              onClick={() => setMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`block px-4 py-2 hover:bg-gray-100 ${
                        getCurrentMenu() === key ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}