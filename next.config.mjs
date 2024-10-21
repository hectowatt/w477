/** @type {import('next').NextConfig} */
const branchName = process.env.BRANCH_NAME ? "/" + process.env.BRANCH_NAME : "";
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: "export",
    basePath: isProd ? '/w477' : '',  // 本番環境だけ適用
    assetPrefix: isProd ? '/w477/' : '',
    publicRuntimeConfig: {
        basePath: isProd ? '/w477' : '', // 同じbasePathを公開設定に含める
      },
    images: {
        unoptimized: true,
    }
};

export default nextConfig;
