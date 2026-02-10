'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// キャッチコピーの文字アニメーション
const catchCopy = '日本の原風景を駆ける、五感のリフレッシュ旅';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // prefers-reduced-motion の検出
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // パララックス用のスクロール位置
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // 文字アニメーションのバリアント
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring' as const, damping: 12, stiffness: 200 },
        },
    };

    // 静的表示（reduced-motion時）
    const staticContent = (
        <div className="text-center px-4">
            <p className="text-white/90 text-sm md:text-base mb-4 tracking-widest drop-shadow-lg">
                OKUKUJI KAIDO CYCLING
            </p>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
                {catchCopy}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8 drop-shadow-lg">
                福島県奥久慈地方の雄大な自然を、自転車で巡る特別な体験。
                <br className="hidden sm:block" />
                久慈川沿いの渓谷美、里山の風景、地元グルメを満喫できるサイクリングルート。
            </p>
            <a
                href="#courses"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
                コースを見る
            </a>
        </div>
    );

    // アニメーション付きコンテンツ
    const animatedContent = (
        <div className="text-center px-4">
            <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/90 text-sm md:text-base mb-4 tracking-widest drop-shadow-lg"
            >
                OKUKUJI KAIDO CYCLING
            </motion.p>

            <motion.h1
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg"
            >
                {catchCopy.split('').map((char, index) => (
                    <motion.span key={index} variants={charVariants} className="inline-block">
                        {char === '、' || char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8 drop-shadow-lg"
            >
                福島県奥久慈地方の雄大な自然を、自転車で巡る特別な体験。
                <br className="hidden sm:block" />
                久慈川沿いの渓谷美、里山の風景、地元グルメを満喫できるサイクリングルート。
            </motion.p>

            <motion.a
                href="#courses"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
                コースを見る
            </motion.a>
        </div>
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 背景画像（パララックス） */}
            <motion.div
                style={prefersReducedMotion ? {} : { y: backgroundY }}
                className="absolute inset-0 -z-10"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                    style={{
                        backgroundImage: `url('/hero-main.jpg')`,
                    }}
                />
                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </motion.div>

            {/* コンテンツ */}
            <motion.div
                style={prefersReducedMotion ? {} : { opacity }}
                className="relative z-10"
            >
                {prefersReducedMotion ? staticContent : animatedContent}
            </motion.div>

            {/* スクロールインジケーター */}
            <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={prefersReducedMotion ? {} : { opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20 hover:scale-110 transition-transform"
                onClick={() => {
                    const newsSection = document.getElementById('news');
                    if (newsSection) {
                        newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }}
            >
                <motion.div
                    animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronDown className="w-8 h-8 text-white/60" />
                </motion.div>
            </motion.div>
        </section>
    );
}
