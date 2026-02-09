'use client';

import { motion } from 'framer-motion';
import { Mountain, Clock, Route, ExternalLink } from 'lucide-react';
import { mockCourses } from '@/lib/mock-microcms';
import Image from 'next/image';

export default function MainCourseSection() {
    // ID: course-001 (久慈川源流周遊コース) を取得
    const course = mockCourses.find((c) => c.id === 'course-001') || mockCourses[0];

    return (
        <section className="relative py-24 bg-stone-900 text-white overflow-hidden">
            {/* 背景装飾 */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/pattern-bg.png)' }} // パターン背景があれば
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* 左側：テキスト情報 */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase mb-2 block">
                                Featured Course
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                奥久慈街道
                                <br />
                                <span className="text-2xl md:text-3xl font-medium text-gray-300">
                                    {course.name}
                                </span>
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {course.description}
                            </p>
                        </motion.div>

                        {/* 統計情報 */}
                        <motion.div
                            className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div>
                                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                                    <Route className="w-5 h-5" />
                                    <span className="text-sm font-medium">DISTANCE</span>
                                </div>
                                <p className="text-3xl font-bold">{course.distance}<span className="text-base font-normal text-gray-400 ml-1">km</span></p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                                    <Mountain className="w-5 h-5" />
                                    <span className="text-sm font-medium">ELEVATION</span>
                                </div>
                                <p className="text-3xl font-bold">{course.elevation}<span className="text-base font-normal text-gray-400 ml-1">m</span></p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                                    <Clock className="w-5 h-5" />
                                    <span className="text-sm font-medium">LEVEL</span>
                                </div>
                                <p className="text-xl font-bold mt-1">中級</p>
                            </div>
                        </motion.div>

                        {/* アクションボタン */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="pt-4"
                        >
                            <a
                                href="https://ridewithgps.com/routes/37488447"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                            >
                                Ride with GPS でルートを見る
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </div>

                    {/* 右側：ビジュアル＆地図 */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* メイン画像 */}
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={course.mainImage.url}
                                alt={course.name}
                                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* 埋め込み地図 */}
                        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50">
                            <iframe
                                src="https://ridewithgps.com/embeds?type=route&id=37488447&sampleGraph=true"
                                style={{ width: '100%', height: '300px', border: 'none' }}
                                title="Ride with GPS Route"
                            >
                            </iframe>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
