'use client';

import { Bike, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const footerLinks = {
    about: [
        { label: '奥久慈街道サイクリングとは', href: '/about' },
        { label: 'モデルコース', href: '#courses' },
        { label: 'スポット情報', href: '#spots' },
        { label: 'アクセス', href: '#access' },
    ],
    support: [
        { label: 'お問い合わせ', href: '/contact' },
        { label: 'よくある質問', href: '/faq' },
        { label: '安全ガイド', href: '/safety' },
        { label: 'レンタサイクル', href: '/rental' },
    ],
    external: [
        { label: '大子町観光協会', href: 'https://www.daigo-kanko.jp/', external: true },
        { label: '茨城県観光情報', href: 'https://www.ibarakiguide.jp/', external: true },
        { label: '袋田の滝', href: 'https://www.daigo-kanko.jp/?page_id=2873', external: true },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            {/* メインフッター */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* ブランド */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Bike className="w-8 h-8 text-emerald-400" />
                            <div>
                                <p className="font-bold text-lg">奥久慈街道サイクリング</p>
                                <p className="text-xs text-gray-400">Okukuji Kaido Cycling</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            福島県東白川郡を中心に、奥久慈の自然を楽しむ
                            サイクルツーリズムの公式サイトです。
                        </p>
                        {/* 連絡先 */}
                        <div className="space-y-4 text-sm text-gray-400">
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p>〒963-5405</p>
                                    <p>福島県東白川郡塙町大字塙字大町3−21</p>
                                </div>
                            </div>
                            <a
                                href="tel:0247432112"
                                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                            >
                                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                0247-43-2112（東白川サイクリング推進会議事務局）
                            </a>
                            <a
                                href="mailto:sinko@town.hanawa.fukushima.jp"
                                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                            >
                                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                sinko@town.hanawa.fukushima.jp
                            </a>
                        </div>
                    </div>

                    {/* サイトについて */}
                    <div>
                        <h3 className="font-bold text-white mb-4">サイトについて</h3>
                        <ul className="space-y-2">
                            {footerLinks.about.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* サポート */}
                    <div>
                        <h3 className="font-bold text-white mb-4">サポート</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 関連リンク */}
                    <div>
                        <h3 className="font-bold text-white mb-4">関連リンク</h3>
                    </div>
                </div>
            </div>

            {/* コピーライト */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-500">
                            © 2026 東白川サイクリング推進会議. All rights reserved.
                        </p>
                        <div className="flex gap-4 text-xs text-gray-500">
                            <a href="/privacy" className="hover:text-gray-400 transition-colors">
                                プライバシーポリシー
                            </a>
                            <a href="/terms" className="hover:text-gray-400 transition-colors">
                                利用規約
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
