import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseTabs from '@/components/CourseTabs';
import { courses } from '@/data/courses';
import { client } from '@/lib/client';
import type { Spot } from '@/types';

export const metadata = {
    title: 'コース情報 | 奥久慈街道サイクリング',
    description:
        '奥久慈街道エリアのサイクリングコース情報。塙町・矢祭町・棚倉町・鮫川村・ツール・ド・はなわ・三角形の道・奥久慈街道の7コースをご紹介。',
};

export default async function CoursePage() {
    let spots: Spot[] = [];

    try {
        const spotsData = await client.getList<Spot>({
            endpoint: 'spots',
            queries: { limit: 100 },
        });
        spots = spotsData.contents;
    } catch (error) {
        console.error('Failed to fetch spots:', error);
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                {/* ページヘッダー */}
                <section className="bg-slate-900 pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-emerald-400 font-medium mb-2 tracking-widest text-sm">
                            CYCLING COURSES
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            コース情報
                        </h1>
                        <p className="text-slate-300 max-w-2xl mx-auto">
                            奥久慈街道エリアの7つのサイクリングコースをご紹介します。<br />
                            初心者から上級者まで、お好みのコースをお楽しみください。
                        </p>
                    </div>
                </section>

                {/* タブメニュー */}
                <CourseTabs courses={courses} spots={spots} />
            </main>
            <Footer />
        </>
    );
}
