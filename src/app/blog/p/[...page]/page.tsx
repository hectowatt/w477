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
const POSTS_PER_PAGE = 5;

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

export async function generateStaticParams() {
    const allPosts = getSortedPosts();
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    return Array.from({ length: totalPages - 1 }, (_, i) => (
        {
            page: [(i + 2).toString()],
        }
    ));
}


export default function Blog({ params }: { params: { page: string } }) {
    const allPosts = getSortedPosts();
    const currentPage = parseInt(params.page || '1', 10);
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const paginatedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="prose lg:prose-xl max-w-none">
                <h1>Posts</h1>
            </div>

            <div className='min-h-[500px] w-full mt-8'>
                <ul className="divide-y divide-gray-200 w-full">
                    {paginatedPosts.map((post) => (
                        <li key={post.slug} className="py-4 w-full">
                            <a
                                href={`${basePath}/blog/${post.slug}`}
                                className="text-xl font-bold hover:underline block w-full break-words"
                            >
                                {post.title}
                            </a>
                            <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {allPosts.length > POSTS_PER_PAGE && (
                <div className="flex justify-between items-center mt-12 pb-10 border-t pt-4">
                    <a
                        href={currentPage === 2 ? `${basePath}/blog/` : `${basePath}/blog/p/${currentPage - 1}`}
                        className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-30 pointer-events-none" : "hover:bg-gray-100"} mr-2`}
                    >
                        Previous
                    </a>
                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <a
                        href={`${basePath}/blog/p/${currentPage + 1}`}
                        className={`px-4 py-2 border rounded ${currentPage === totalPages ? "opacity-30 pointer-events-none" : "hover:bg-gray-100"} ml-2`}
                    >
                        Next
                    </a>
                </div>
            )}
        </div>
    );
}
