/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hectowatt.github.io/w477', // GitHub Pages の URL
  generateRobotsTxt: true, // robots.txt も生成
  generateIndexSitemap: false, // インデックス用サイトマップを生成しない
  outDir: './out', // 出力先を指定 (GitHub Pages 用に調整)
  basePath: '/w477', // リポジトリ名を設定
  autoLastmod: false,
  transform: async (config, path) => {
    // App Router固有の処理を追加可能
    return {
      loc: path, // URL
      lastmod: new Date().toISOString(),
    };
  }
};
