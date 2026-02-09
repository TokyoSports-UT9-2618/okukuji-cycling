'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Tag } from 'lucide-react';
import type { News, NewsCategory } from '@/types';
import { cn } from '@/lib/utils';

// カテゴリ色のマッピング
const categoryColors: Record<NewsCategory, string> = {
    イベント: 'bg-emerald-100 text-emerald-700',
    '交通・規制': 'bg-red-100 text-red-700',
    お知らせ: 'bg-blue-100 text-blue-700',
    メディア掲載: 'bg-purple-100 text-purple-700',
};

interface NewsCardProps {
    news: News;
    index: number;
}

export function NewsCard({ news, index }: NewsCardProps) {
    // 日付をフォーマット
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // 画像ソースの決定（eyecatch -> thumbnail -> プレースホルダー）
    const displaySrc = news.eyecatch?.url || news.thumbnail?.url || '/placehokder.jpg';
    const isPlaceholder = displaySrc === '/placehokder.jpg' || displaySrc === '/logo.png';

    return (
        <motion.article
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full"
        >
            <a
                href={`/news/${news.id}`}
                className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group h-full flex flex-col"
            >
                {/* サムネイル */}
                <div className="aspect-video w-full overflow-hidden bg-gray-50 flex items-center justify-center relative">
                    <img
                        src={displaySrc}
                        alt={news.title}
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* カテゴリ (画像の上に配置するデザインもよくあるが、今回は元の位置を維持するか、画像上がいいか？要望は特にないので元の位置に近い形で) */}
                </div>

                {/* コンテンツ */}
                <div className="p-5 flex flex-col flex-grow">
                    {/* カテゴリ & 日付 */}
                    <div className="flex items-center gap-3 mb-3">
                        <span
                            className={cn(
                                'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium',
                                categoryColors[news.category] || 'bg-gray-100 text-gray-700'
                            )}
                        >
                            <Tag className="w-3 h-3" />
                            {news.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {formatDate(news.publishDate || news.publishedAt)}
                        </span>
                    </div>

                    {/* タイトル */}
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {news.title}
                    </h3>

                    {/* 詳細リンク（見た目だけ） */}
                    <div className="mt-auto pt-2">
                        <span className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
                            続きを読む
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </a>
        </motion.article>
    );
}

interface NewsSectionProps {
    news: News[];
}

export default function NewsSection({ news }: NewsSectionProps) {
    // 最新3件のみ表示
    const latestNews = news.slice(0, 3);

    return (
        <section id="news" className="py-20 bg-emerald-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* セクションヘッダー */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="text-emerald-600 font-medium mb-2 tracking-widest text-sm">
                        NEWS & TOPICS
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        お知らせ
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        イベント情報、交通規制、メディア掲載など最新情報をお届けします。
                    </p>
                </motion.div>

                {/* ニュースグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {latestNews.map((item, index) => (
                        <NewsCard key={item.id} news={item} index={index} />
                    ))}
                </div>

                {/* すべて見るボタン */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                >
                    <a
                        href="/news"
                        className="inline-flex items-center gap-2 bg-white border border-emerald-500 text-emerald-600 font-medium px-8 py-3 rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-sm hover:shadow-md group"
                    >
                        お知らせ一覧を見る
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
