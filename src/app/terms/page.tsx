import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: '利用規約 | 奥久慈街道サイクリング',
    description: '奥久慈街道サイクリング公式サイトの安全な利用と免責事項について。',
};

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                {/* ページヘッダー */}
                <section className="bg-slate-900 pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            利用規約
                        </h1>
                        <p className="text-slate-300 max-w-2xl mx-auto">
                            サイトの安全な利用と免責事項
                        </p>
                    </div>
                </section>

                {/* コンテンツ */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12">
                            {/* 免責事項 */}
                            <div className="prose max-w-none">
                                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-4">
                                    免責事項
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    当サイトに掲載されているルートの安全性や情報の正確性を完全に保証するものではありません。実際の走行は道路交通法を遵守し、自己責任で行ってください。天候や道路状況により、ルートが通行止めになる場合もありますので、現地の案内に従ってください。
                                </p>
                            </div>

                            {/* 著作権 */}
                            <div className="prose max-w-none">
                                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-4">
                                    著作権
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    当サイト内に掲載されている画像、文章、ロゴマーク等の著作権は「東白川サイクリング推進会議」または各権利者に帰属します。私的利用の範囲を超えて、これらを無断で転載、複製、改変、公衆送信等することは、法令により禁止されています。
                                </p>
                            </div>

                            {/* 禁止事項 */}
                            <div className="prose max-w-none">
                                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-4">
                                    禁止事項
                                </h2>
                                <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
                                    <li>当サイトの運営を妨害する行為</li>
                                    <li>他の利用者、第三者、または当会議に不利益を与える行為</li>
                                    <li>情報の改ざんや不正アクセス</li>
                                    <li>公序良俗に反する行為、またはその恐れのある行為</li>
                                    <li>その他、当会議が不適切と判断する行為</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
