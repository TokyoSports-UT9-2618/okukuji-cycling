'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';

// ギャラリー画像の型定義
interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    location: string; // 撮影場所
    mapLink: string;  // Google Maps URL
    span?: 'col-span-1' | 'col-span-2'; // グリッドのサイズ指定
}

// モックデータ (実際の画像パスに合わせて調整してください)
const galleryImages: GalleryImage[] = [
    {
        id: '1',
        src: '/hero-main.jpg', // 仮画像
        alt: '久慈川の清流',
        location: '久慈川サイクリングロード',
        mapLink: 'https://goo.gl/maps/example1',
        span: 'col-span-2',
    },
    {
        id: '2',
        src: '/placeholders/news-1.jpg', // 仮画像
        alt: '袋田の滝',
        location: '袋田の滝',
        mapLink: 'https://goo.gl/maps/example2',
        span: 'col-span-1',
    },
    {
        id: '3',
        src: '/placeholders/news-2.jpg', // 仮画像
        alt: '紅葉の山並み',
        location: '奥久慈の山々',
        mapLink: 'https://goo.gl/maps/example3',
        span: 'col-span-1',
    },
    {
        id: '4',
        src: '/placeholders/news-3.jpg', // 仮画像
        alt: '鮎の塩焼き',
        location: '道の駅 奥久慈だいご',
        mapLink: 'https://goo.gl/maps/example4',
        span: 'col-span-1',
    },
    {
        id: '5',
        src: '/hero-main.jpg', // 仮画像
        alt: '春の桜並木',
        location: '矢祭山公園',
        mapLink: 'https://goo.gl/maps/example5',
        span: 'col-span-1',
    },
    {
        id: '6',
        src: '/placeholders/news-1.jpg', // 仮画像
        alt: '竜神大吊橋',
        location: '竜神大吊橋',
        mapLink: 'https://goo.gl/maps/example6',
        span: 'col-span-2',
    },
];

export default function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* セクションヘッダー */}
                <div className="text-center mb-12">
                    <p className="text-emerald-500 font-medium mb-2 tracking-widest text-sm">
                        GALLERY
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        フォトギャラリー
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        奥久慈の美しい風景とサイクリングの瞬間
                    </p>
                </div>

                {/* ベントー・グリッド (Bento Grid) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            layoutId={`gallery-item-${image.id}`}
                            className={`relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-shadow ${image.span === 'col-span-2' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                                }`}
                            onClick={() => setSelectedImage(image)}
                            whileHover={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* ホバー時のオーバーレイ (PC向け) */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                            {/* 拡大アイコン */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 p-2 rounded-full backdrop-blur-sm text-white">
                                <Maximize2 className="w-5 h-5" />
                            </div>

                            {/* 場所名チップ (常に表示またはホバー) */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full">
                                    <MapPin className="w-3 h-3 text-emerald-400" />
                                    <span className="truncate">{image.location}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* 閉じるボタン */}
                        <button
                            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div
                            className="relative w-full max-w-5xl h-full flex flex-col justify-center"
                            onClick={(e) => e.stopPropagation()} // コンテンツクリックで閉じない
                        >
                            {/* 画像 */}
                            <motion.div
                                layoutId={`gallery-item-${selectedImage.id}`}
                                className="relative w-full h-[60vh] md:h-[75vh] rounded-lg overflow-hidden mb-6"
                            >
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    fill
                                    className="object-contain" // 横長も縦長も収める
                                    priority
                                />
                            </motion.div>

                            {/* キャプションエリア */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col md:flex-row items-center justify-between gap-4 text-white w-full px-4"
                            >
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl font-bold mb-1">{selectedImage.alt}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300 text-sm">
                                        <MapPin className="w-4 h-4 text-emerald-500" />
                                        {selectedImage.location}
                                    </div>
                                </div>

                                {/* マップボタン */}
                                <a
                                    href={selectedImage.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-emerald-900/20 w-full md:w-auto justify-center"
                                >
                                    <MapPin className="w-5 h-5" />
                                    Google Mapsで見る
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
