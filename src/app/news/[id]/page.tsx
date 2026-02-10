import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockNews, getNewsById } from '@/lib/mock-microcms';
import { client } from '@/lib/client';

import { cn } from '@/lib/utils';

// Static Export (Optional, keep if needed for build, but here we focus on simple render)
// Static Export: Fetch all IDs from microCMS
export async function generateStaticParams() {
    try {
        const data = await client.getList({
            endpoint: 'news',
            queries: { fields: 'id', limit: 100 },
        });
        return data.contents.map((content) => ({
            id: content.id,
        }));
    } catch (error) {
        console.error('generateStaticParams error:', error);
        // API failure fallback (empty or mock if absolutely needed, but user asked to remove mock dependency for generating params)
        return [];
    }
}

// 日付フォーマット
function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

interface NewsDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { id } = await params;

    // Try to fetch from API, fallback to mock
    let news = null;
    try {
        news = await client.get({ endpoint: 'news', contentId: id });
    } catch (e) {
        console.warn(`API fetch failed for ${id}, falling back to mock.`);
        news = await getNewsById(id);
    }

    if (!news) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-20 flex items-center justify-center bg-white">
                    <div className="text-center text-gray-900">
                        <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
                        <Link href="/" className="underline">トップへ戻る</Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // 画像ソースの決定
    const displaySrc = news.eyecatch?.url || news.thumbnail?.url || '/placehokder.jpg';
    const isPlaceholder = displaySrc === '/placehokder.jpg' || displaySrc === '/logo.png';

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-20 bg-white text-gray-900">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header: Title & Date */}
                    <header className="mb-8 border-b border-gray-100 pb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
                            {news.title}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {formatDate(news.publishDate || news.publishedAt)}
                        </p>
                    </header>

                    {/* アイキャッチ画像 */}
                    <div className="mb-10 w-full aspect-video overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <img
                            src={displaySrc}
                            alt={news.title}
                            className="w-full h-full object-contain p-2"
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                </article>
            </main>
            <Footer />
        </>
    );
}
