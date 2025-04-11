/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',  // 启用静态导出
images: {
    unoptimized: true,  // 禁用图片优化，因为静态导出不支持
},
// basePath: '/next-tools', // 添加这行，因为GitHub Pages项目站点需要这个路径
// assetPrefix: '/next-tools/', // 添加这行，确保静态资源使用正确的路径
generateStaticParams: async () => {
    return []
  },
};

export default nextConfig;