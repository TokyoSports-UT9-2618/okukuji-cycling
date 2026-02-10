import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'プライバシーポリシー | 奥久慈街道サイクリング',
    description: '奥久慈街道サイクリング公式サイトのプライバシーポリシー（個人情報保護方針）について。',
};

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50">
                {/* ページヘッダー */}
                <section className="bg-slate-900 pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            プライバシーポリシー
                        </h1>
                        <p className="text-slate-300 max-w-2xl mx-auto">
                            当サイトにおける個人情報の取り扱い方針
                        </p>
                    </div>
                </section>

                {/* コンテンツ */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12">
                            {/* 管理主体 */}
                            <div className="prose max-w-none">
                                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-4">
                                    管理主体
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    東白川サイクリング推進会議
                                </p>
                            </div>

                            {/* 収集情報 */}
                            <div className="prose max-w-none">
                                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-4">
                                    収集情報
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    当サイトでは、Google Analytics等によるサイト利用状況の分析のため、Cookie（クッキー）を利用してアクセス情報を収集しています。収集される情報には個人を特定する情報は含まれません。
                                </p>
                            </div>

                            {/* 利用目的 */}
                            <div className="prose max-w-none">
                                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-4">
                                    利用目的
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    収集した情報は、サービスの向上およびサイクルツーリズムの統計分析のみに使用いたします。
                                </p>
                            </div>

                            {/* 第三者提供 */}
                            <div className="prose max-w-none">
                                <h2 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-4">
                                    第三者提供
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    法令に基づく場合を除き、同意なく第三者へ個人情報を提供することはありません。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
