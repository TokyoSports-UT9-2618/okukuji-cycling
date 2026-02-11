'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, X, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { Gallery } from '@/types';
import { getOptimizedGalleryLayout } from '@/lib/galleryLogic';

interface GallerySectionProps {
    images: Gallery[];
}

export default function GallerySection({ images }: GallerySectionProps) {
    const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);
    const layoutImages = getOptimizedGalleryLayout(images);

    return (
        <section className="py-20 bg-[#111827] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* セクションヘッダー */}
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-emerald-400 font-medium mb-2 tracking-widest text-sm"
                    >
                        GALLERY
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        フォトギャラリー
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        奥久慈街道（福島県東白川エリア）の美しい四季と風景
                    </motion.p>
                </div>
            </div>

            {/* モバイル: 全幅 (Edge-to-Edge) / PC: コンテナ幅 */}
            <div className="w-full md:max-w-7xl md:mx-auto md:px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 auto-rows-[200px] grid-flow-dense">
                    {layoutImages.map(({ image, spanClass }, index) => {
                        return (
                            <ParallaxImage
                                key={image.id}
                                image={image}
                                spanClass={spanClass}
                                onClick={() => setSelectedImage(image)}
                                index={index}
                            />
                        );
                    })}
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
                                    src={selectedImage.image.url}
                                    alt={selectedImage.locationName}
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
                                    <h3 className="text-2xl font-bold mb-1 text-white">{selectedImage.locationName}</h3>
                                </div>

                                {selectedImage.mapUrl && (
                                    <a
                                        href={selectedImage.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-emerald-900/40 justify-center w-full md:w-auto"
                                    >
                                        <MapPin className="w-5 h-5" />
                                        Google Maps
                                    </a>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// パララックス効果とGlassmorphismを持つ画像コンポーネント
function ParallaxImage({ image, spanClass, onClick, index }: { image: Gallery; spanClass: string; onClick: () => void; index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // スクロールに合わせて画像を少し動かす（パララックス）
    // インデックスによって動きを変えてランダム感を出す
    const yRange = index % 2 === 0 ? ["-10%", "10%"] : ["-5%", "5%"];
    const y = useTransform(scrollYProgress, [0, 1], yRange);

    return (
        <motion.div
            ref={ref}
            layoutId={`gallery-item-${image.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }} // Staggered
            className={`relative group overflow-hidden cursor-pointer bg-gray-800 ${spanClass}`}
            onClick={onClick}
        >
            <motion.div className="w-full h-[120%] -y-[10%] relative" style={{ y }}>
                <Image
                    src={image.image.url}
                    alt={image.locationName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>

            {/* 拡大アイコン */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 p-1.5 rounded-full backdrop-blur-sm text-white z-10">
                <Maximize2 className="w-4 h-4" />
            </div>

            {/* キャプション (Glassmorphism + Gradient) */}
            <div className="absolute inset-x-0 bottom-0 p-3 z-10">
                <div className="bg-black/30 backdrop-blur-md rounded-lg p-2 border border-white/10 shadow-lg relative overflow-hidden group-hover:bg-black/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-1.5 relative z-10">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="text-white text-xs md:text-sm font-medium truncate tracking-wide">
                            {image.locationName}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
