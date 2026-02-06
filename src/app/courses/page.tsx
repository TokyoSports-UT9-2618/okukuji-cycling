import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockCourses } from '@/lib/mock-microcms';
import { CourseCard } from '@/components/CoursesSection';

export const metadata: Metadata = {
    title: 'モデルコース | 奥久慈街道サイクリング',
    description: '初心者から上級者まで、レベルに合わせたサイクリングコースをご紹介。獲得標高を目安に、あなたにぴったりのコースを見つけてください。',
};

export default function CoursesPage() {
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
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mockCourses.map((course, index) => (
                                <CourseCard key={course.id} course={course} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
