'use client';

import PageContainer from '@/components/PageContainer';
import { useState } from 'react';

export default function Base64Encode() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encodeBase64 = () => {
    try {
      const encoded = btoa(input); // 使用 btoa 进行 Base64 编码
      setOutput(encoded);
    } catch (error) {
      setOutput('编码失败，请检查输入内容是否正确。');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">Base64 编码工具</h1>
      


      {/* 原有的输入区域 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入要编码的文本
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md font-mono text-sm"
          rows="5"
          placeholder="输入文本..."
        ></textarea>

        <div className="flex gap-4 mt-4">
          <button
            onClick={encodeBase64}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            编码
          </button>
          <button
            onClick={clearAll}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            清空
          </button>
        </div>
      </div>

      {/* 原有的输出区域 */}
      {output && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">编码结果</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm font-mono">
            {output}
          </pre>
        </div>
      )}
      {/* 添加工具说明 */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">什么是 Base64 编码？</h2>
        <p className="text-blue-600 mb-2">
          Base64 是一种基于 64 个可打印字符来表示二进制数据的编码方式。它能把任意二进制数据编码为 ASCII 字符串，广泛应用于：
        </p>
        <ul className="list-disc list-inside text-blue-600 space-y-1">
          <li>在 URL 中传输包含特殊字符的数据</li>
          <li>在 HTML 中嵌入小型图片</li>
          <li>邮件传输图片或文件</li>
          <li>处理含有特殊字符的 JSON 数据</li>
        </ul>
      </div>
      {/* 添加使用说明 */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">使用说明</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">🎯 编码特点</h3>
            <p className="text-gray-600">
              Base64 编码会将输入文本转换为一个只包含 A-Z、a-z、0-9、+、/ 这 64 个字符的字符串，末尾可能会添加 = 号作为填充。编码后的文本通常比原文本长约 33%。
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-2">💡 使用场景</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>需要在网址中传递包含中文或特殊字符的参数</li>
              <li>将小型图片转换为 Data URI 在网页中使用</li>
              <li>编码二进制文件用于文本协议传输</li>
              <li>处理包含换行符或特殊字符的配置数据</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">✨ 使用技巧</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>可以编码任何文本内容，包括中文、emoji 等 Unicode 字符</li>
              <li>编码结果不含空格和换行，便于复制和传输</li>
              <li>如果编码失败，请检查输入内容是否包含无法处理的字符</li>
              <li>大文本编码后会明显变长，请注意控制数据量</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}