import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockSpots } from '@/lib/mock-microcms';
import { SpotCard } from '@/components/SpotsSection';

export const metadata: Metadata = {
    title: 'スポット情報 | 奥久慈街道サイクリング',
    description: '休憩・補給・グルメ・温泉など、サイクリストに便利なスポットをご紹介。アイコンで設備をすぐに確認できます。',
};

export default function SpotsPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-20">
                {/* ページヘッダー */}
                <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-emerald-100 font-medium mb-2 tracking-widest text-sm">
                            CYCLING SPOTS
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            スポット情報
                        </h1>
                        <p className="text-emerald-100 max-w-2xl mx-auto">
                            休憩・補給・グルメ・温泉など、サイクリストに便利なスポットをご紹介。
                            <br className="hidden sm:block" />
                            アイコンで設備をすぐに確認できます。
                        </p>
                    </div>
                </section>

                {/* スポット一覧 */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockSpots.map((spot, index) => (
                                <SpotCard key={spot.id} spot={spot} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
