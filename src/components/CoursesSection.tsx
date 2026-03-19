'use client';

import { motion } from 'framer-motion';
import { Mountain, Clock, Route, ChevronRight, Star } from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

interface CourseCardProps {
    course: Course;
    index: number;
}

// コースタイトルに応じたビジュアルテーマ
const courseThemes: Record<string, { gradient: string; emoji: string; label: string }> = {
    '塙町コース':      { gradient: 'from-pink-800 via-rose-700 to-orange-800',   emoji: '🌸', label: '久慈川・桜' },
    '矢祭町コース':    { gradient: 'from-teal-800 via-emerald-700 to-cyan-800',  emoji: '🌊', label: '渓谷・滝川' },
    '棚倉町コース':    { gradient: 'from-amber-700 via-yellow-600 to-orange-800', emoji: '⛩️', label: '城下町・神社' },
    '鮫川村コース':    { gradient: 'from-green-800 via-lime-700 to-emerald-800',  emoji: '🐄', label: '牧場・高原' },
    'ツール・ド・はなわ': { gradient: 'from-red-800 via-rose-700 to-pink-800',   emoji: '🏆', label: 'レースコース' },
    '三角形の道':      { gradient: 'from-violet-800 via-purple-700 to-indigo-800', emoji: '🌿', label: '渓谷・滝' },
    '奥久慈街道':      { gradient: 'from-blue-800 via-indigo-700 to-slate-800',  emoji: '🗺️', label: '全線80km' },
};
const defaultTheme = { gradient: 'from-emerald-800 via-gray-700 to-black', emoji: '🚴', label: 'サイクリング' };

// 難易度を星の数に変換
function getDifficultyStars(difficulty: string): number {
    const match = difficulty.match(/★(\d)/);
    return match ? parseInt(match[1]) : 1;
}

export function CourseCard({ course, index }: CourseCardProps) {
    const stars = getDifficultyStars(course.difficulty);
    const theme = courseThemes[course.title] ?? defaultTheme;

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
            {/* ビジュアルヘッダー */}
            <div className={cn('relative h-56 overflow-hidden bg-gray-800 bg-gradient-to-br', theme.gradient)}>
                {/* 地形風パターン */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)', backgroundSize: '18px 18px' }} />
                {/* 山並みシルエット */}
                <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,100 L0,60 L60,30 L120,55 L180,20 L240,45 L300,15 L360,40 L400,25 L400,100 Z" fill="white" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-full opacity-15" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,100 L0,75 L80,50 L150,65 L220,40 L290,60 L350,45 L400,55 L400,100 Z" fill="white" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* コースアイコン（中央） */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pb-8">
                    <span className="text-5xl mb-2 drop-shadow-lg">{theme.emoji}</span>
                    <span className="text-white/80 text-xs font-medium tracking-widest uppercase">{theme.label}</span>
                </div>

                {/* 難易度バッジ */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                'w-3 h-3',
                                i < stars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                            )}
                        />
                    ))}
                </div>

                {/* 推奨シーズン */}
                {course.seasons && course.seasons.length > 0 && (
                    <div className="absolute top-4 right-4 flex gap-1">
                        {course.seasons.map((season) => (
                            <span
                                key={season}
                                className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/30"
                            >
                                {season}
                            </span>
                        ))}
                    </div>
                )}

                {/* コースタイトル（下部） */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">
                        {course.title}
                    </h3>
                </div>
            </div>

            {/* コンテンツ */}
            <div className="p-6">
                {course.summary && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.summary}
                    </p>
                )}

                {/* スペック（獲得標高を強調） */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* 獲得標高（最も目立たせる） */}
                    <div className="col-span-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 flex items-center gap-3">
                        <div className="bg-emerald-500 text-white p-3 rounded-full">
                            <Mountain className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-emerald-600 font-medium">獲得標高</p>
                            <p className="text-2xl font-bold text-emerald-700">
                                {course.elevation.toLocaleString()}
                                <span className="text-sm font-normal ml-1">m</span>
                            </p>
                        </div>
                    </div>

                    {/* 距離 */}
                    <div className="text-center">
                        <Route className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                        <p className="text-lg font-semibold text-gray-900">{course.distance}</p>
                        <p className="text-xs text-gray-500">km</p>
                    </div>

                    {/* 所要時間 */}
                    <div className="text-center">
                        <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                        <p className="text-lg font-semibold text-gray-900">{course.duration ?? '—'}</p>
                        <p className="text-xs text-gray-500">目安</p>
                    </div>

                    {/* 難易度テキスト */}
                    <div className="text-center">
                        <Star className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                        <p className="text-sm font-semibold text-gray-900">
                            {course.difficulty.replace(/★\d（/, '').replace('）', '')}
                        </p>
                    </div>
                </div>

                {/* 詳細ボタン */}
                <a
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link"
                >
                    詳細を見る
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
            </div>
        </motion.article>
    );
}

interface CoursesSectionProps {
    courses: Course[];
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
    return (
        <section id="courses" className="py-20 bg-gray-50">
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
                        MODEL COURSES
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        モデルコース
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        初心者から上級者まで、レベルに合わせたコースをご用意。
                        <br className="hidden sm:block" />
                        獲得標高を目安に、あなたにぴったりのコースを見つけてください。
                    </p>
                </motion.div>

                {/* コースカード */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
