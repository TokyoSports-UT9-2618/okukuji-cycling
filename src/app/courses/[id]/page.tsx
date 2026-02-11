import { Mountain, Clock, Route, Star, ChevronLeft, Download, AlertTriangle, Calendar } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/lib/client';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

// Static Export用: ビルド時に全パスを生成
export async function generateStaticParams() {
    try {
        const data = await client.getList({
            endpoint: 'courses',
            queries: { fields: 'id', limit: 100 },
        });
        return data.contents.map((course) => ({
            id: course.id,
        }));
    } catch (error) {
        console.error('Failed to generate static params for courses:', error);
        return [];
    }
}

// 難易度を星の数に変換
function getDifficultyStars(difficulty: string): number {
    const match = difficulty.match(/★(\d)/);
    return match ? parseInt(match[1]) : 1;
}

interface CourseDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
    const { id } = await params;
    let course: Course | null = null;

    try {
        course = await client.get<Course>({
            endpoint: 'courses',
            contentId: id,
        });
    } catch (error) {
        console.error(`Failed to fetch course detail for id ${id}:`, error);
    }

    if (!course) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-20 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            コースが見つかりません
                        </h1>
                        <Link
                            href="/#courses"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            コース一覧に戻る
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const stars = getDifficultyStars(course.difficulty);

    return (
        <>
            <Header />
            <main className="min-h-screen">
                {/* Hero */}
                <section className="relative h-[50vh] min-h-[400px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${course.mainImage.url})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                            {/* パンくず */}
                            <Link
                                href="/#courses"
                                className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-4 text-sm transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                コース一覧に戻る
                            </Link>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                {course.name}
                            </h1>

                            {/* 難易度・シーズン */}
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                'w-4 h-4',
                                                i < stars ? 'text-amber-400 fill-amber-400' : 'text-white/40'
                                            )}
                                        />
                                    ))}
                                    <span className="text-white text-sm ml-1">
                                        {course.difficulty.replace(/★\d（/, '').replace('）', '')}
                                    </span>
                                </div>

                                {course.seasons && course.seasons.length > 0 && (
                                    <div className="flex gap-2">
                                        {course.seasons.map((season) => (
                                            <span
                                                key={season}
                                                className="bg-emerald-500/80 text-white text-sm px-3 py-1 rounded-full"
                                            >
                                                {season}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* メインコンテンツ */}
                            <div className="lg:col-span-2">
                                {/* 概要 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">コース概要</h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {course.summary}
                                    </p>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {course.description}
                                    </p>
                                </div>

                                {/* 注意事項 */}
                                {course.caution && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                                        <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5" />
                                            注意事項
                                        </h2>
                                        <p className="text-amber-700 leading-relaxed">
                                            {course.caution}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* サイドバー */}
                            <div className="lg:col-span-1">
                                {/* スペックカード */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">コーススペック</h2>

                                    {/* 獲得標高（強調） */}
                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-emerald-500 text-white p-3 rounded-full">
                                                <Mountain className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-emerald-600 font-medium">獲得標高</p>
                                                <p className="text-3xl font-bold text-emerald-700">
                                                    {course.elevation.toLocaleString()}
                                                    <span className="text-lg font-normal ml-1">m</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* その他スペック */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <Route className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500">距離</p>
                                                <p className="font-semibold text-gray-900">{course.distance} km</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <Clock className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-500">所要時間（目安）</p>
                                                <p className="font-semibold text-gray-900">{course.duration}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <Star className="w-5 h-5 text-amber-400" />
                                            <div>
                                                <p className="text-sm text-gray-500">難易度</p>
                                                <p className="font-semibold text-gray-900">{course.difficulty}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* GPXダウンロード */}
                                    {course.gpxUrl && (
                                        <a
                                            href={course.gpxUrl}
                                            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
                                        >
                                            <Download className="w-5 h-5" />
                                            GPXをダウンロード
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
