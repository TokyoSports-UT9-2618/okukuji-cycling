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
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
        >
            {/* カード全体リンク（存在する場合のみ） */}
            {spot.link && (
                <a
                    href={spot.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`${spot.name}の公式サイトへ`}
                />
            )}

            {/* 画像 */}
            {spot.image && (
                <div className="h-40 overflow-hidden relative">
                    <img
                        src={spot.image.url}
                        alt={spot.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* 外部リンクアイコン（右上に表示など） */}
                    {spot.link && (
                        <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    )}
                </div>
            )}

            {/* コンテンツ */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className={cn(
                    "font-bold text-gray-900 mb-2 transition-colors",
                    spot.link && "group-hover:text-emerald-600"
                )}>
                    {spot.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{spot.summary}</p>

                {/* 電話番号 & カテゴリ */}
                <div className="mt-auto space-y-3">
                    {/* 電話番号（リンクの上に配置するため z-20） */}
                    {spot.tel && (
                        <div className="flex items-center">
                            <a
                                href={`tel:${spot.tel}`}
                                className="relative z-20 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-600 font-medium transition-colors p-1 -ml-1 rounded hover:bg-emerald-50"
                            >
                                <Phone className="w-4 h-4" />
                                <span>{spot.tel}</span>
                            </a>
                        </div>
                    )}

                    {/* カテゴリアイコン */}
                    <div className="flex flex-wrap gap-2">
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

export default function SpotsSection({ spots, viewAllLink, className }: SpotsSectionProps) {
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
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        スポット情報
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        休憩・補給・グルメ・温泉など、サイクリストに便利なスポットをご紹介。
                        <br className="hidden sm:block" />
                        アイコンをクリックして、設備で絞り込みができます。
                    </p>
                </motion.div>

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
