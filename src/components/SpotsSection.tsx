'use client';

import { motion } from 'framer-motion';
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

interface SpotCardProps {
    spot: Spot;
    index: number;
}

export function SpotCard({ spot, index }: SpotCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
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
                        {spot.categories.map((category) => {
                            const Icon = categoryIcons[category];
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

interface SpotsSectionProps {
    spots: Spot[];
}

export default function SpotsSection({ spots }: SpotsSectionProps) {
    return (
        <section id="spots" className="py-20">
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
                        アイコンで設備をすぐに確認できます。
                    </p>
                </motion.div>

                {/* カテゴリ凡例 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {Object.entries(categoryIcons).map(([category, Icon]) => (
                        <span
                            key={category}
                            className={cn(
                                'inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full',
                                categoryColors[category as SpotCategory]
                            )}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {category}
                        </span>
                    ))}
                </motion.div>

                {/* スポットグリッド */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {spots.map((spot, index) => (
                        <SpotCard key={spot.id} spot={spot} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
