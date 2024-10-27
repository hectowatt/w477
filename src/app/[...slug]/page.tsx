import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

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

// Markdownファイルからコンテンツを取得
function getPostContent(slugArray: string[]) {
  const filePath = path.join(postsDirectory, ...slugArray) + '.md';
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents); // フロントマターと本文を分離

  return { data, content };
}

// ページコンポーネント
export default function Post({ params }: { params: { slug: string[] } }) {
  const { data, content } = getPostContent(params.slug); // Markdownの読み込み

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <div>{content}</div>
    </article>
  );
}
