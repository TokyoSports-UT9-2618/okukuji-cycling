'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, X, Maximize2 } from 'lucide-react';
import Image from 'next/image';

// ギャラリー画像の型定義
interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    location: string;
    mapLink: string;
    span?: 'col-span-1' | 'col-span-2' | 'md:col-span-2'; // グリッドのサイズ指定
}

// 福島県東白川エリアのスポットデータ
// ※画像はプレースホルダーを使用しています。実画像への差し替え推奨。
const galleryImages: GalleryImage[] = [
    {
        id: '1',
        src: '/hero-main.jpg', // 仮画像: 棚倉城跡
        alt: '棚倉城跡の桜',
        location: '棚倉町',
        mapLink: 'https://goo.gl/maps/example1',
        span: 'col-span-2',
    },
    {
        id: '2',
        src: '/placeholders/news-1.jpg', // 仮画像: 山本不動尊
        alt: '山本不動尊',
        location: '棚倉町',
        mapLink: 'https://goo.gl/maps/example2',
        span: 'col-span-1',
    },
    {
        id: '3',
        src: '/placeholders/news-2.jpg', // 仮画像: 塙町のダリア
        alt: '湯遊ランドはなわのダリア',
        location: '塙町',
        mapLink: 'https://goo.gl/maps/example3',
        span: 'col-span-1',
    },
    {
        id: '4',
        src: '/placeholders/news-3.jpg', // 仮画像: 強滝
        alt: '強滝（こわだき）',
        location: '鮫川村',
        mapLink: 'https://goo.gl/maps/example4',
        span: 'col-span-2',
    },
    {
        id: '5',
        src: '/hero-main.jpg', // 仮画像: 矢祭山
        alt: '矢祭山公園',
        location: '矢祭町',
        mapLink: 'https://goo.gl/maps/example5',
        span: 'col-span-1',
    },
    {
        id: '6',
        src: '/placeholders/news-1.jpg', // 仮画像: 江竜田の滝
        alt: '江竜田の滝',
        location: '鮫川村',
        mapLink: 'https://goo.gl/maps/example6',
        span: 'col-span-1',
    },
];

export default function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    return (
        <section className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* セクションヘッダー */}
                <div className="text-center mb-12">
                    <p className="text-emerald-400 font-medium mb-2 tracking-widest text-sm">
                        GALLERY
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        フォトギャラリー
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        奥久慈街道（福島県東白川エリア）の美しい四季と風景
                    </p>
                </div>
            </div>

            {/* モバイル: 全幅 (Edge-to-Edge) / PC: コンテナ幅 */}
            <div className="w-full md:max-w-7xl md:mx-auto md:px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 auto-rows-[250px] md:auto-rows-[300px]">
                    {galleryImages.map((image) => (
                        <ParallaxImage
                            key={image.id}
                            image={image}
                            onClick={() => setSelectedImage(image)}
                        />
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-0 md:p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
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
                            className="relative w-full h-full flex flex-col justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                layoutId={`gallery-item-${selectedImage.id}`}
                                className="relative w-full h-[60vh] md:h-[75vh] md:rounded-lg overflow-hidden mb-0 md:mb-6"
                            >
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent pt-20 pb-10 px-6 md:static md:bg-none md:p-0 md:flex md:items-center md:justify-between md:max-w-5xl md:mx-auto"
                            >
                                <div className="mb-6 md:mb-0">
                                    <h3 className="text-2xl font-bold mb-1 text-white">{selectedImage.alt}</h3>
                                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                                        <MapPin className="w-4 h-4 text-emerald-500" />
                                        {selectedImage.location}
                                    </div>
                                </div>

                                <a
                                    href={selectedImage.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-emerald-900/40 justify-center w-full md:w-auto"
                                >
                                    <MapPin className="w-5 h-5" />
                                    Google Maps
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// パララックス効果を持つ画像コンポーネント
function ParallaxImage({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // スクロールに合わせて画像を少し動かす（パララックス）
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <motion.div
            ref={ref}
            layoutId={`gallery-item-${image.id}`}
            className={`relative group overflow-hidden cursor-pointer bg-gray-800 ${image.span === 'col-span-2' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                }`}
            onClick={onClick}
        >
            <motion.div className="w-full h-[120%] -y-[10%] relative" style={{ y }}>
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                />
            </motion.div>

            {/* 拡大アイコン */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 p-2 rounded-full backdrop-blur-sm text-white z-10">
                <Maximize2 className="w-5 h-5" />
            </div>

            {/* キャプション（グラデーションオーバーレイ） */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 z-10">
                <div className="inline-flex items-center gap-1.5 text-white text-shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 drop-shadow-md" />
                    <span className="text-sm font-medium tracking-wide drop-shadow-md">{image.location}</span>
                </div>
                <p className="text-white text-xs opacity-80 mt-0.5 truncate drop-shadow-md block md:hidden">
                    {image.alt}
                </p>
            </div>
        </motion.div>
    );
}
