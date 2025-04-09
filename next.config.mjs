/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',  // 启用静态导出
images: {
    unoptimized: true,  // 禁用图片优化，因为静态导出不支持
},
// basePath: '/',  // 设置基础路径，用于 GitHub Pages
};

export default nextConfig;