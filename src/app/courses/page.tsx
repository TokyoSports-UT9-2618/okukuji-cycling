import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/lib/client';
import { CourseCard } from '@/components/CoursesSection';
import type { Course } from '@/types';

export const metadata: Metadata = {
    title: 'モデルコース | 奥久慈街道サイクリング',
    description: '初心者から上級者まで、レベルに合わせたサイクリングコースをご紹介。獲得標高を目安に、あなたにぴったりのコースを見つけてください。',
};

export default async function CoursesPage() {
    let courses: Course[] = [];

    try {
        const data = await client.getList<Course>({
            endpoint: 'courses',
            queries: { limit: 100, orders: 'elevation' },
        });
        courses = data.contents;
    } catch (error) {
        console.error('Failed to fetch courses:', error);
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-20">
                {/* ページヘッダー */}
                <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-emerald-100 font-medium mb-2 tracking-widest text-sm">
                            MODEL COURSES
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            モデルコース
                        </h1>
                        <p className="text-emerald-100 max-w-2xl mx-auto">
                            初心者から上級者まで、レベルに合わせたコースをご用意。
                            <br className="hidden sm:block" />
                            獲得標高を目安に、あなたにぴったりのコースを見つけてください。
                        </p>
                    </div>
                </section>

                {/* コース一覧 */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {courses.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.map((course, index) => (
                                    <CourseCard key={course.id} course={course} index={index} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-12">
                                コース情報を読み込めませんでした。
                            </p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
