import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockNews, getNewsById } from '@/lib/mock-microcms';
import { client } from '@/lib/client';
import { cn } from '@/lib/utils';
import type { News, NewsCategory } from '@/types';
import { Calendar, Tag, ChevronLeft, ChevronRight, Pin, ArrowLeft } from 'lucide-react';

// カテゴリ色のマッピング
const categoryColors: Record<NewsCategory, string> = {
    イベント: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    '交通・規制': 'bg-red-100 text-red-700 border-red-200',
    お知らせ: 'bg-blue-100 text-blue-700 border-blue-200',
    メディア掲載: 'bg-purple-100 text-purple-700 border-purple-200',
};

export async function generateStaticParams() {
    try {
        const data = await client.getList({
            endpoint: 'news',
            queries: { fields: 'id', limit: 100 },
        });
        return data.contents.map((content) => ({ id: content.id }));
    } catch (error) {
        console.error('generateStaticParams error:', error);
        return [];
    }
}

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

// 画像枚数に応じたグリッドクラス
function getImageGridClass(count: number) {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    return 'grid-cols-3';
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { id } = await params;

    let news: News | null = null;
    let allNews: News[] = [];

    try {
        news = await client.get({ endpoint: 'news', contentId: id });
    } catch (e) {
        console.warn(`API fetch failed for ${id}, falling back to mock.`);
        news = await getNewsById(id);
    }

    try {
        const listData = await client.getList({
            endpoint: 'news',
            queries: { limit: 100, orders: '-publishDate', fields: 'id,title,publishDate,publishedAt' },
        });
        allNews = listData.contents;
    } catch (e) {
        allNews = mockNews;
    }

    if (!news) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-20 flex items-center justify-center bg-white">
                    <div className="text-center text-gray-900">
                        <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
                        <Link href="/news" className="text-emerald-600 underline">お知らせ一覧へ戻る</Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // 前後の記事
    const currentIndex = allNews.findIndex((n) => n.id === id);
    const prevNews = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;
    const nextNews = currentIndex > 0 ? allNews[currentIndex - 1] : null;

    // 表示する画像を決定（imagesが優先、なければeyecatch/thumbnail）
    const images = news.images && news.images.length > 0
        ? news.images.slice(0, 3)
        : news.eyecatch
            ? [news.eyecatch]
            : news.thumbnail
                ? [news.thumbnail]
                : [];

    const hasImages = images.length > 0;
    const colorClass = categoryColors[news.category as NewsCategory] ?? 'bg-gray-100 text-gray-700 border-gray-200';

    // ヘッダー部分（画像の有無によらず同じ）
    const ArticleHeader = () => (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
            {/* パンくずリスト */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/news" className="hover:text-white transition-colors">お知らせ</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-300 line-clamp-1">{news!.title}</span>
            </nav>

            {/* カテゴリ & 固定バッジ */}
            <div className="flex items-center gap-2 mb-4">
                <span className={cn('inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium border', colorClass)}>
                    <Tag className="w-3 h-3" />
                    {news!.category}
                </span>
                {news!.pinned && (
                    <span className="inline-flex items-center gap-1 bg-amber-400 text-white text-xs px-3 py-1 rounded-full font-bold">
                        <Pin className="w-3 h-3" />
                        固定
                    </span>
                )}
            </div>

            {/* タイトル */}
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                {news!.title}
            </h1>

            {/* 公開日 */}
            <p className="inline-flex items-center gap-1.5 text-sm text-slate-400 mb-8">
                <Calendar className="w-4 h-4" />
                {formatDate(news!.publishDate || news!.publishedAt)}
            </p>
        </div>
    );

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 text-gray-900">
                <div className="w-full bg-slate-900 pt-24 pb-0">
                    <ArticleHeader />

                    {/* 画像エリア */}
                    {hasImages && (
                        <div className="max-w-3xl mx-auto px-4 sm:px-6">
                            <div className={cn('grid gap-2 rounded-t-xl overflow-hidden', getImageGridClass(images.length))}>
                                {images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            'overflow-hidden bg-slate-800',
                                            images.length === 1 ? 'aspect-video' : 'aspect-square'
                                        )}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`${news!.title} 画像${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 本文エリア */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
                    <div
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 prose prose-gray max-w-none prose-headings:font-bold prose-a:text-emerald-600 prose-img:rounded-lg"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />

                    {/* 前後ナビゲーション */}
                    <nav className="mt-10 border-t border-gray-200 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {prevNews ? (
                            <Link
                                href={`/news/${prevNews.id}`}
                                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
                            >
                                <ChevronLeft className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5 group-hover:-translate-x-1 transition-transform" />
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-400 mb-1">前の記事</p>
                                    <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                        {prevNews.title}
                                    </p>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextNews ? (
                            <Link
                                href={`/news/${nextNews.id}`}
                                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group text-right sm:flex-row-reverse"
                            >
                                <ChevronRight className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-400 mb-1">次の記事</p>
                                    <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                        {nextNews.title}
                                    </p>
                                </div>
                            </Link>
                        ) : <div />}
                    </nav>

                    {/* 一覧へ戻るボタン */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-3 rounded-full transition-all shadow-sm hover:shadow-md group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            お知らせ一覧へ戻る
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
