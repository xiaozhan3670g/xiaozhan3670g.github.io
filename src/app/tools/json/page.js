'use client';

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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">JSON 格式化、压缩与校验工具</h1>

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
    </div>
  );
}