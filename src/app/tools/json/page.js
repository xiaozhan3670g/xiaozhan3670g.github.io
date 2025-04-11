'use client';

import PageContainer from '@/components/PageContainer';
import { useState } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // 格式化 JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const prettyJson = JSON.stringify(parsed, null, 2);
      setInput(prettyJson); // 更新输入框内容
      setError('');
    } catch (err) {
      setError(`JSON 格式错误: ${err.message}`);
    }
  };

  // 压缩 JSON
  const compressJson = () => {
    try {
      const parsed = JSON.parse(input);
      const compactJson = JSON.stringify(parsed);
      setInput(compactJson); // 更新输入框内容
      setError('');
    } catch (err) {
      setError(`JSON 压缩失败: ${err.message}`);
    }
  };

  // 去除转义字符
  const removeEscapes = () => {
    try {
      const unescaped = input.replace(/\\(["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '$1');
      setInput(unescaped); // 更新输入框内容
      setError('');
    } catch (err) {
      setError(`去除转义失败: ${err.message}`);
    }
  };

  // 清空输入框
  const clearAll = () => {
    setInput('');
    setError('');
  };

  // 复制到剪贴板
  const copyToClipboard = () => {
    if (input) {
      navigator.clipboard.writeText(input);
      alert('已复制到剪贴板！');
    }
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">JSON 格式化、压缩与校验</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入或查看 JSON 数据
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md font-mono text-sm"
          rows="10"
          placeholder="在此输入 JSON 数据..."
        ></textarea>

        <div className="flex gap-4 mt-4">
          <button
            onClick={formatJson}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            格式化
          </button>
          <button
            onClick={compressJson}
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
          >
            压缩
          </button>
          <button
            onClick={removeEscapes}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
          >
            去除转义
          </button>
          <button
            onClick={clearAll}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            清空
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!input}
            className={`py-2 px-4 rounded-md transition-colors ${
              input
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            复制结果
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-8">
          <strong>错误:</strong> {error}
        </div>
      )}

    <div className="mt-8 bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">工具说明</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">🔧 功能介绍</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><span className="font-medium">格式化</span>：将紧凑的 JSON 转换为缩进格式，提高可读性</li>
            <li><span className="font-medium">压缩</span>：移除所有空格和换行，减少数据体积</li>
            <li><span className="font-medium">去除转义</span>：处理 JSON 字符串中的转义字符</li>
            <li><span className="font-medium">复制结果</span>：一键复制处理后的内容</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">📝 JSON 语法要点</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>对象使用花括号 {`{}`}，数组使用方括号 {`[]`}</li>
            <li>属性名必须使用双引号 {`""`} 包裹</li>
            <li>字符串值也需要使用双引号</li>
            <li>数值可以直接书写，支持整数和浮点数</li>
            <li>布尔值使用 true 或 false</li>
            <li>null 表示空值</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">💡 使用技巧</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>开发调试时使用格式化功能提高代码可读性</li>
            <li>生产环境建议使用压缩功能减少数据传输量</li>
            <li>处理后端返回数据时可以使用去除转义功能</li>
            <li>遇到格式错误时，仔细检查是否缺少逗号或引号</li>
          </ul>
        </div>
      </div>
      </div>
    </PageContainer>
  );
}