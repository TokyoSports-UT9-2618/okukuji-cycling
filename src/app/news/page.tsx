import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockNews } from '@/lib/mock-microcms';
import { NewsCard } from '@/components/NewsSection';
import { client } from '@/lib/client';
import type { News } from '@/types';

export const metadata: Metadata = {
    title: 'お知らせ | 奥久慈街道サイクリング',
    description: 'イベント情報、交通規制、メディア掲載など、奥久慈街道サイクリングの最新情報をお届けします。',
};

export default async function NewsPage() {
    let news: News[] = [];

    try {
        const data = await client.getList({
            endpoint: 'news',
        });
        news = data.contents;
    } catch (error) {
        console.error('Failed to fetch news:', error);
        news = mockNews;
    }

    // Ensure we have data (fallback if empty array returned explicitly or error occurred)
    if (news.length === 0) {
        news = mockNews;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-20">
                {/* ページヘッダー */}
                <section className="bg-slate-900 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-emerald-400 font-medium mb-2 tracking-widest text-sm">
                            NEWS & TOPICS
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            お知らせ
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            イベント情報、交通規制、メディア掲載など最新情報をお届けします。
                        </p>
                    </div>
                </section>

                {/* ニュース一覧 */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {news.map((item, index) => (
                                <div key={item.id} className="w-full h-full">
                                    <NewsCard news={item} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
