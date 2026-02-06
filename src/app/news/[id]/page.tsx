import { ChevronLeft, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockNews, getNewsById } from '@/lib/mock-microcms';
import type { NewsCategory } from '@/types';
import { cn } from '@/lib/utils';

// Static Export用: ビルド時に全パスを生成
export function generateStaticParams() {
    return mockNews.map((news) => ({
        id: news.id,
    }));
}

// カテゴリ色のマッピング
const categoryColors: Record<NewsCategory, string> = {
    イベント: 'bg-emerald-100 text-emerald-700',
    '交通・規制': 'bg-red-100 text-red-700',
    お知らせ: 'bg-blue-100 text-blue-700',
    メディア掲載: 'bg-purple-100 text-purple-700',
};

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
    const news = await getNewsById(id);

    if (!news) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-20 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            記事が見つかりません
                        </h1>
                        <Link
                            href="/#news"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            お知らせ一覧に戻る
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-20">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* パンくず */}
                    <Link
                        href="/#news"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-emerald-600 mb-8 text-sm transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        お知らせ一覧に戻る
                    </Link>

                    {/* ヘッダー */}
                    <header className="mb-8">
                        {/* カテゴリ & 日付 */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span
                                className={cn(
                                    'inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full font-medium',
                                    categoryColors[news.category]
                                )}
                            >
                                <Tag className="w-4 h-4" />
                                {news.category}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-gray-500 text-sm">
                                <Calendar className="w-4 h-4" />
                                {formatDate(news.publishDate)}
                            </span>
                        </div>

                        {/* タイトル */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            {news.title}
                        </h1>
                    </header>

                    {/* サムネイル */}
                    {news.thumbnail && (
                        <div className="mb-8 rounded-2xl overflow-hidden">
                            <img
                                src={news.thumbnail.url}
                                alt={news.title}
                                className="w-full h-auto"
                            />
                        </div>
                    )}

                    {/* 本文 (HTML) */}
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-700"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />

                    {/* フッターナビ */}
                    <div className="mt-12 pt-8 border-t">
                        <Link
                            href="/#news"
                            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            お知らせ一覧に戻る
                        </Link>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
