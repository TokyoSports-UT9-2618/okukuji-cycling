import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockNews, getNewsById } from '@/lib/mock-microcms';
import { client } from '@/lib/client';

import { cn } from '@/lib/utils';

// Static Export (Optional, keep if needed for build, but here we focus on simple render)
export function generateStaticParams() {
    return mockNews.map((news) => ({
        id: news.id,
    }));
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
                    <div className="mb-10 w-full overflow-hidden rounded-xl bg-gray-100 border border-gray-100 flex items-center justify-center">
                        <img
                            src={displaySrc}
                            alt={news.title}
                            className={cn(
                                "w-full",
                                isPlaceholder ? "object-contain h-64 p-2 opacity-90" : "object-cover h-auto max-h-[500px]"
                            )}
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
