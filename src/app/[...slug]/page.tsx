import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

// Markdownファイルのパスを再帰的に取得する関数
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

// generateStaticParamsの実装
export async function generateStaticParams() {
  console.log('generateStaticParams has been called');

  const markdownFiles = getAllMarkdownFiles(postsDirectory);
  console.log('Markdown Files:', markdownFiles);

  return markdownFiles.map((filePath) => {
    const relativePath = path.relative(postsDirectory, filePath);
    const segments = relativePath.replace(/\.md$/, '').split(path.sep);
    console.log('Segments:', segments);
    return { slug: [...segments] };
  });
}

// ダイナミックルートのページコンポーネント
export default function Post({ params }: { params: { slug: string[] } }) {
  console.log('Params:', params);

  return (
    <article>
      <h1>{params.slug.join('/')}</h1>
    </article>
  );
}
