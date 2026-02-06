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

    return (
        <motion.article
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex-shrink-0 w-80 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group"
        >
            {/* サムネイル */}
            {news.thumbnail && (
                <div className="h-40 overflow-hidden">
                    <img
                        src={news.thumbnail.url}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* コンテンツ */}
            <div className="p-5">
                {/* カテゴリ & 日付 */}
                <div className="flex items-center gap-3 mb-3">
                    <span
                        className={cn(
                            'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium',
                            categoryColors[news.category]
                        )}
                    >
                        <Tag className="w-3 h-3" />
                        {news.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(news.publishDate)}
                    </span>
                </div>

                {/* タイトル */}
                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {news.title}
                </h3>

                {/* 詳細リンク */}
                <a
                    href={`/news/${news.id}`}
                    className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors group/link"
                >
                    続きを読む
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
            </div>
        </motion.article>
    );
}

interface NewsSectionProps {
    news: News[];
}

export default function NewsSection({ news }: NewsSectionProps) {
    return (
        <section id="news" className="py-20 bg-gray-50 overflow-hidden">
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

                {/* 横スクロールカード */}
                <div className="relative">
                    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                        {news.map((item, index) => (
                            <div key={item.id} className="snap-start">
                                <NewsCard news={item} index={index} />
                            </div>
                        ))}
                        {/* すべて見るカード */}
                        <motion.a
                            href="/news"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="flex-shrink-0 w-60 bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-xl flex flex-col items-center justify-center p-6 hover:bg-emerald-100 transition-colors group"
                        >
                            <ChevronRight className="w-10 h-10 text-emerald-500 mb-2 group-hover:translate-x-1 transition-transform" />
                            <span className="text-emerald-700 font-semibold">すべて見る</span>
                        </motion.a>
                    </div>

                    {/* グラデーションフェード（右端） */}
                    <div className="absolute top-0 right-0 bottom-4 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
