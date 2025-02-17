import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const basePath = publicRuntimeConfig.basePath || "";

type PostData = {
  title: string;
  date: string;
  slug: string;
  draft: boolean;
};

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

// Markdownファイルを再帰的に取得する関数
function getAllMarkdownFiles(dirPath: string): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const files = entries.flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return getAllMarkdownFiles(fullPath); // 再帰的に探索
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      return fullPath;
    } else {
      return [];
    }
  });

  return files;
}

// Markdownファイルから記事データを取得する関数
function getSortedPosts(): PostData[] {
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  const allPosts: PostData[] = markdownFiles.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      title: data.title || 'Untitled',
      date: data.date || 'Unknown date',
      slug: filePath
        .replace(postsDirectory + path.sep, '')
        .replace(/\.md$/, ''),
      draft: data.draft || false,
    };
  });

  // 日付でソート（降順）
  return allPosts.filter((post) => !post.draft).sort((a, b) => (a.date < b.date ? 1 : -1));
}

  

  export default function Home() {
    const posts = getSortedPosts();
  
    return (
      <main className="prose lg:prose-xl mx-auto">
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`${basePath}/${post.slug}`}>{post.title}</a>
              <p className="text-sm text-gray-500">{post.date}</p>
            </li>
          ))}
        </ul>
      </main>
    );
  }
