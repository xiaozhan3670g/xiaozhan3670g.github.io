'use client';

import { useState } from 'react';

export default function Base64Decode() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const decodeBase64 = () => {
    try {
      const decoded = atob(input); // 使用 atob 进行 Base64 解码
      setOutput(decoded);
    } catch (error) {
      setOutput('解码失败，请检查输入内容是否为有效的 Base64 字符串。');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Base64 解码工具</h1>
      


      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入要解码的 Base64 字符串
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md font-mono text-sm"
          rows="5"
          placeholder="输入 Base64 字符串..."
        ></textarea>

        <div className="flex gap-4 mt-4">
          <button
            onClick={decodeBase64}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            解码
          </button>
          <button
            onClick={clearAll}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            清空
          </button>
        </div>
      </div>

      {output && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">解码结果</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm font-mono">
            {output}
          </pre>
        </div>
      )}

        {/* 添加工具说明 */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">什么是 Base64 解码？</h2>
        <p className="text-blue-600 mb-2">
          Base64 解码是将 Base64 编码的字符串转换回原始数据的过程。常见的使用场景包括：
        </p>
        <ul className="list-disc list-inside text-blue-600 space-y-1">
          <li>解码邮件中的附件数据</li>
          <li>还原经过 Base64 编码的图片</li>
          <li>处理 API 返回的 Base64 格式数据</li>
          <li>解码 JWT Token 中的 payload 数据</li>
        </ul>
      </div>

      {/* 添加使用提示 */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">使用提示</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">📝 输入格式要求</h3>
            <p className="text-gray-600">
              Base64 字符串通常只包含字母（A-Z, a-z）、数字（0-9）、加号（+）和斜线（/），有时会以等号（=）结尾作为填充。
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">⚠️ 常见问题</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>确保输入的是完整的 Base64 字符串，不要漏掉末尾的等号</li>
              <li>注意区分字母 O 和数字 0，字母 l 和数字 1</li>
              <li>检查是否包含非法字符（如空格、换行符）</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">💡 小贴士</h3>
            <p className="text-gray-600">
              如果解码失败，可以尝试先去除字符串中的空格和换行符，或检查是否缺少填充的等号。标准的 Base64 字符串长度应该是 4 的倍数。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}