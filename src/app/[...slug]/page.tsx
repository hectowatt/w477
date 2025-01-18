import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { visit } from 'unist-util-visit';
import '../globals.css';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const postsDirectory = path.join(process.cwd(), 'src', 'posts');
const basePath = publicRuntimeConfig.basePath || "";


// 再帰的にMarkdownファイルを取得する関数
function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

// 静的パスを生成
export async function generateStaticParams() {
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  return markdownFiles.map((filePath) => {
    const relativePath = path.relative(postsDirectory, filePath);
    const segments = relativePath.replace(/\.md$/, '').split(path.sep);
    return { slug: segments };
  });
}

// Markdownファイルからコンテンツを取得しHTMLに変換
async function getPostContent(slugArray: string[]) {
  const filePath = path.join(postsDirectory, ...slugArray) + '.md';
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Markdown本文をHTMLに変換しながら画像パスを修正
let tableOfContents = ''; // 目次用変数
  const processedContent = await remark()
    .use(() => (tree) => {
      visit(tree, 'image', (node: { url: string; }) => {
        if (node.url.startsWith('/')) {
          node.url = `${basePath}${node.url}`;
        }
      });

      // 目次の生成
      visit(tree, 'heading', (node) => {
        if (node.depth === 3) { // ### の見出しを対象
          const textNode = node.children.find((child) => child.type === 'text');
          if (textNode) {
            const headingText = textNode.value;
            const id = headingText.toLowerCase().replace(/\s+/g, '-'); // IDを生成
            tableOfContents += `<li><a href="#${id}">${headingText}</a></li>`;
            node.data = {
              hProperties: {
                id,
              },
            };
          }
        }
      });
    })
    .use(html, {sanitize: false})
    .process(content);

  const contentHtml = processedContent.toString();

  return { data, contentHtml, tableOfContents: `<ul>${tableOfContents}</ul>` };
}

// ページコンポーネント
export default async function Post({ params }: { params: { slug: string[] } }) {
  const { data, contentHtml, tableOfContents } = await getPostContent(params.slug);

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>{data.title}</h1>
      <p className="text-sm text-gray-500">{data.date}</p>
      
      {/* 目次 */}
      {tableOfContents && (
        <div className="toc">
          <h2>目次</h2>
          <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
        </div>
      )}

      {/* 本文 */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
