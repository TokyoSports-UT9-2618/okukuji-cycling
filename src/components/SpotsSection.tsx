'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bike,
    Wrench,
    Wind,
    MapPin,
    Droplets,
    UtensilsCrossed,
    Coffee,
    Thermometer,
    Store,
    Phone,
    ExternalLink,
} from 'lucide-react';
import type { Spot, SpotCategory } from '@/types';
import { cn } from '@/lib/utils';

// スポット名 → ローカル画像パスのマッピング（Cloudflare Pagesから配信）
const SPOT_LOCAL_IMAGES: Record<string, string> = {
    // 塙町コース
    '塙町コミュニティプラザ':           '/spots/spot-1.jpg',
    '笹原パン店':                        '/spots/spot-2.jpg',
    'Shiro Cafe':                        '/spots/spot-3.jpg',
    "Café's Bond141":                    '/spots/spot-4.jpg',
    '久慈川サイクリングロード':          '/spots/spot-5.jpg',
    '道の駅 はなわ天領の郷':            '/spots/spot-6.jpg',
    '向ヶ丘公園':                        '/spots/spot-7.jpg',
    '風呂山公園':                        '/spots/spot-8.jpg',
    // 矢祭町コース
    'ユーパル矢祭':                      '/spots/spot-1-1.jpg',
    '和ダイニング つどい':               '/spots/spot-2-1.jpg',
    '珈琲香坊':                          '/spots/spot-3-1.jpg',
    '滝川渓谷遊歩道':                    '/spots/spot-4-1.jpg',
    '農泊 保木山':                       '/spots/spot-5-1.jpg',
    '矢祭山公園':                        '/spots/spot-6-1.jpg',
    '桧山登山道':                        '/spots/spot-7-1.jpg',
    '夢想滝':                            '/spots/spot-8-1.jpg',
    'みりょく満点物語矢祭店 太郎の四季': '/spots/spot-9.jpg',
    // 棚倉町コース
    'ルネサンス棚倉':                    '/spots/spot-1-2.jpg',
    '馬場都々古別神社':                  '/spots/spot-2-2.jpg',
    '蓮家寺':                            '/spots/spot-3-2.jpg',
    '棚倉城跡（国指定史跡）':           '/spots/spot-4-2.jpg',
    '山本不動尊':                        '/spots/spot-5-2.jpg',
    'みりょく満点物語':                  '/spots/spot-6-2.jpg',
    '八槻都々古別神社':                  '/spots/spot-7-2.jpg',
    // 鮫川村コース
    '手・まめ・館':                      '/spots/spot-1-3.jpg',
    '清水端のしだれ桜':                  '/spots/spot-2-3.jpg',
    '鹿角平観光牧場':                    '/spots/spot-3-3.jpg',
    'Little Café':                       '/spots/spot-4-3.jpg',
    'Rêve':                              '/spots/spot-5-3.jpg',
    'あぶくま高原美術館':                '/spots/spot-6-3.jpg',
    // 三角形の道
    '湯遊ランドはなわ':                  '/spots/spot-1-4.jpg',
    '不動滝':                            '/spots/spot-3-4.jpg',
    '湯岐渓谷':                          '/spots/spot-4-4.jpg',
};

// カテゴリアイコンのマッピング
const categoryIcons: Record<SpotCategory, React.ElementType> = {
    サイクルラック: Bike,
    工具貸出: Wrench,
    空気入れ: Wind,
    トイレ: MapPin,
    給水: Droplets,
    ランチ: UtensilsCrossed,
    カフェ: Coffee,
    温泉: Thermometer,
    コンビニ: Store,
};

// カテゴリ色のマッピング
const categoryColors: Record<SpotCategory, string> = {
    サイクルラック: 'bg-blue-100 text-blue-600',
    工具貸出: 'bg-orange-100 text-orange-600',
    空気入れ: 'bg-cyan-100 text-cyan-600',
    トイレ: 'bg-gray-100 text-gray-600',
    給水: 'bg-sky-100 text-sky-600',
    ランチ: 'bg-red-100 text-red-600',
    カフェ: 'bg-amber-100 text-amber-700',
    温泉: 'bg-rose-100 text-rose-600',
    コンビニ: 'bg-green-100 text-green-600',
};

// カテゴリ絵文字
const categoryEmojis: Record<SpotCategory, string> = {
    サイクルラック: '🚲',
    工具貸出: '🔧',
    空気入れ: '💨',
    トイレ: '🚻',
    給水: '💧',
    ランチ: '🍱',
    カフェ: '☕',
    温泉: '♨️',
    コンビニ: '🏪',
};

// カテゴリ背景グラデーション（プレースホルダー用）
const categoryBgGradients: Record<SpotCategory, string> = {
    サイクルラック: 'from-blue-600 to-blue-800',
    工具貸出: 'from-orange-500 to-orange-700',
    空気入れ: 'from-cyan-500 to-cyan-700',
    トイレ: 'from-gray-500 to-gray-700',
    給水: 'from-sky-500 to-sky-700',
    ランチ: 'from-red-500 to-red-700',
    カフェ: 'from-amber-500 to-amber-700',
    温泉: 'from-rose-500 to-rose-700',
    コンビニ: 'from-green-500 to-green-700',
};

// CMSのfacilitiesフィールド（英語キー）とSpotCategory（日本語ラベル）のマッピング
const FACILITY_MAPPING: Record<string, SpotCategory> = {
    cycle_rack: 'サイクルラック',
    tools: '工具貸出',
    pump: '空気入れ',
    toilet: 'トイレ',
    water: '給水',
    lunch: 'ランチ',
    cafe: 'カフェ',
    onsen: '温泉',
    store: 'コンビニ',
};

interface SpotsSectionProps {
    spots: Spot[];
    viewAllLink?: string;
    className?: string;
    hideHeader?: boolean;
}

export function SpotCard({ spot, index }: { spot: Spot; index: number }) {
    // facilitiesがあれば日本語カテゴリに変換して優先使用、なければ既存のcategoriesを使用
    const displayCategories = spot.facilities
        ? spot.facilities
            .map((f) => FACILITY_MAPPING[f])
            .filter((c): c is SpotCategory => c !== undefined)
        : spot.categories;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
        >
            {/* カード全体リンク（存在する場合のみ） */}
            {spot.link && (
                <a
                    href={spot.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`${spot.title}の公式サイトへ`}
                />
            )}

            {/* 画像 or プレースホルダー */}
            {(spot.image?.url || SPOT_LOCAL_IMAGES[spot.title]) ? (
                <div className="h-40 overflow-hidden relative">
                    <img
                        src={spot.image?.url || SPOT_LOCAL_IMAGES[spot.title]}
                        alt={spot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {spot.link && (
                        <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    )}
                </div>
            ) : (
                <div className={cn(
                    'h-40 overflow-hidden relative flex flex-col items-center justify-center bg-gradient-to-br',
                    displayCategories[0] ? categoryBgGradients[displayCategories[0]] : 'from-emerald-600 to-emerald-800'
                )}>
                    {/* 装飾パターン */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                    <span className="text-4xl mb-1 drop-shadow-md z-10">
                        {displayCategories[0] ? categoryEmojis[displayCategories[0]] : '📍'}
                    </span>
                    <span className="text-white/80 text-xs font-medium tracking-widest z-10">
                        {displayCategories[0] ?? 'スポット'}
                    </span>
                    {spot.link && (
                        <div className="absolute top-2 right-2 bg-black/30 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    )}
                </div>
            )}

            {/* コンテンツ */}
            <div className="p-6 flex flex-col flex-grow bg-white">
                <h3 className={cn(
                    "font-bold text-lg mb-2 transition-colors",
                    "text-gray-900", // 明示的に黒を指定
                    spot.link && "group-hover:text-emerald-600"
                )}>
                    {spot.title}
                </h3>
                <p className="text-gray-800 text-sm mb-3 line-clamp-2">
                    {spot.description || spot.summary}
                </p>

                {/* 電話番号 & カテゴリ & 住所 */}
                <div className="mt-auto space-y-2">
                    {/* 住所（Google Mapsリンク） */}
                    {spot.address && (
                        <div className="flex items-start">
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-20 inline-flex items-start gap-1.5 text-sm text-gray-800 hover:text-emerald-600 font-medium transition-colors p-1 -ml-1 rounded hover:bg-emerald-50"
                            >
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span className="break-all">{spot.address}</span>
                            </a>
                        </div>
                    )}

                    {/* 電話番号（リンクの上に配置するため z-20） */}
                    {spot.tel && (
                        <div className="flex items-center">
                            <a
                                href={`tel:${spot.tel}`}
                                className="relative z-20 inline-flex items-center gap-1.5 text-sm text-gray-800 hover:text-emerald-600 font-medium transition-colors p-1 -ml-1 rounded hover:bg-emerald-50"
                            >
                                <Phone className="w-4 h-4" />
                                <span>{spot.tel}</span>
                            </a>
                        </div>
                    )}

                    {/* カテゴリアイコン */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        {displayCategories.map((category) => {
                            const Icon = categoryIcons[category];
                            if (!Icon) return null;
                            return (
                                <span
                                    key={category}
                                    className={cn(
                                        'inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full',
                                        categoryColors[category]
                                    )}
                                >
                                    <Icon className="w-3 h-3" />
                                    {category}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export default function SpotsSection({ spots, viewAllLink, className, hideHeader = false }: SpotsSectionProps) {
    const [activeCategory, setActiveCategory] = useState<SpotCategory | null>(null);

    // フィルタリングロジック
    const filteredSpots = activeCategory
        ? spots.filter((spot) => {
            const categories = spot.facilities
                ? spot.facilities
                    .map((f) => FACILITY_MAPPING[f])
                    .filter((c): c is SpotCategory => c !== undefined)
                : spot.categories;
            return categories.includes(activeCategory);
        })
        : spots;

    return (
        <section id="spots" className={cn("py-20", className)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* セクションヘッダー */}
                {!hideHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <p className="text-emerald-600 font-medium mb-2 tracking-widest text-sm">
                            CYCLING SPOTS
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            スポット情報
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            休憩・補給・グルメ・温泉など、サイクリストに便利なスポットをご紹介。
                            <br className="hidden sm:block" />
                            アイコンをクリックして、設備で絞り込みができます。
                        </p>
                    </motion.div>
                )}

                {/* カテゴリ凡例（フィルタボタン） */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {Object.entries(categoryIcons).map(([category, Icon]) => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() =>
                                    setActiveCategory(
                                        isActive ? null : (category as SpotCategory)
                                    )
                                }
                                className={cn(
                                    'inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-300 border',
                                    isActive
                                        ? 'ring-2 ring-emerald-500 ring-offset-2 border-transparent scale-105 shadow-md'
                                        : 'border-transparent hover:bg-gray-100 hover:scale-105',
                                    categoryColors[category as SpotCategory],
                                    // 非アクティブ時は少し薄くする（フィルタ適用中のみ）
                                    activeCategory && !isActive && 'opacity-40 grayscale-[0.5]'
                                )}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {category}
                            </button>
                        );
                    })}
                </motion.div>

                {/* スポットグリッド (AnimatePresenceでフィルタ変更時のアニメーション) */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {filteredSpots.map((spot, index) => (
                            <SpotCard key={spot.id} spot={spot} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                {filteredSpots.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        該当するスポットがありません。
                    </div>
                )}

                {/* 「すべて見る」ボタン */}
                {viewAllLink && (
                    <div className="mt-12 text-center">
                        <Link
                            href={viewAllLink}
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-emerald-600 border-2 border-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-colors duration-300"
                        >
                            すべてのスポットを見る
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
