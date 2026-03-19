import { Mountain, Clock, Route, Star, ChevronLeft, Download, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/lib/client';
import type { Course, Spot } from '@/types';
import { cn } from '@/lib/utils';
import { SpotCard } from '@/components/SpotsSection';

// コースタイトルに応じたビジュアルテーマ（CoursesSection.tsx と同期）
const courseHeroThemes: Record<string, { gradient: string; emoji: string; label: string }> = {
    '塙町コース':         { gradient: 'from-pink-900 via-rose-800 to-orange-900',    emoji: '🌸', label: '久慈川・桜' },
    '矢祭町コース':       { gradient: 'from-teal-900 via-emerald-800 to-cyan-900',   emoji: '🌊', label: '渓谷・滝川' },
    '棚倉町コース':       { gradient: 'from-amber-800 via-yellow-700 to-orange-900', emoji: '⛩️', label: '城下町・神社' },
    '鮫川村コース':       { gradient: 'from-green-900 via-lime-800 to-emerald-900',  emoji: '🐄', label: '牧場・高原' },
    'ツール・ド・はなわ': { gradient: 'from-red-900 via-rose-800 to-pink-900',        emoji: '🏆', label: 'レースコース' },
    '三角形の道':         { gradient: 'from-violet-900 via-purple-800 to-indigo-900', emoji: '🌿', label: '渓谷・滝' },
    '奥久慈街道':         { gradient: 'from-blue-900 via-indigo-800 to-slate-900',   emoji: '🗺️', label: '全線80km' },
};

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
    let courseSpots: Spot[] = [];

    try {
        course = await client.get<Course>({
            endpoint: 'courses',
            contentId: id,
        });
    } catch (error) {
        console.error(`Failed to fetch course detail for id ${id}:`, error);
    }

    // コース名でスポットをフィルタ取得
    if (course) {
        try {
            const spotsData = await client.getList<Spot>({
                endpoint: 'spots',
                queries: {
                    filters: `course[contains]${course.title}`,
                    limit: 100,
                },
            });
            courseSpots = spotsData.contents;
        } catch (error) {
            console.error(`Failed to fetch spots for course ${course.title}:`, error);
        }
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
    const heroTheme = courseHeroThemes[course.title] ?? { gradient: 'from-emerald-900 via-gray-800 to-black', emoji: '🚴', label: 'サイクリング' };

    return (
        <>
            <Header />
            <main className="min-h-screen">
                {/* Hero */}
                <section className={cn('relative h-[50vh] min-h-[400px] bg-gradient-to-br', heroTheme.gradient)}>
                    {/* 装飾パターン */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                    {/* 山並みシルエット */}
                    <svg className="absolute bottom-0 left-0 w-full opacity-15" viewBox="0 0 800 150" preserveAspectRatio="none">
                        <path d="M0,150 L0,90 L100,50 L200,80 L320,30 L440,65 L560,20 L680,55 L800,35 L800,150 Z" fill="white" />
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 800 150" preserveAspectRatio="none">
                        <path d="M0,150 L0,110 L130,80 L260,100 L380,65 L500,90 L620,70 L730,85 L800,75 L800,150 Z" fill="white" />
                    </svg>
                    {/* コースアイコン */}
                    <div className="absolute top-1/4 right-12 hidden md:flex flex-col items-center opacity-20">
                        <span className="text-7xl">{heroTheme.emoji}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                            {/* パンくず */}
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-4 text-sm transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                コース一覧に戻る
                            </Link>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                {course.title}
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

                {/* コース概要・スペック */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* メインコンテンツ */}
                            <div className="lg:col-span-2">
                                {/* 概要 */}
                                {(course.summary || course.description) && (
                                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">コース概要</h2>
                                        {course.summary && (
                                            <p className="text-gray-600 leading-relaxed mb-6">
                                                {course.summary}
                                            </p>
                                        )}
                                        {course.description && (
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                {course.description}
                                            </p>
                                        )}
                                    </div>
                                )}

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

                                        {course.duration && (
                                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                                <Clock className="w-5 h-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">所要時間（目安）</p>
                                                    <p className="font-semibold text-gray-900">{course.duration}</p>
                                                </div>
                                            </div>
                                        )}

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

                {/* コーススポット */}
                {courseSpots.length > 0 && (
                    <section className="py-12 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mb-10">
                                <p className="text-emerald-600 font-medium mb-2 tracking-widest text-sm">
                                    COURSE SPOTS
                                </p>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    立ち寄りスポット
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    このコース沿いのおすすめスポット（{courseSpots.length}件）
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courseSpots.map((spot, index) => (
                                    <SpotCard key={spot.id} spot={spot} index={index} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
