import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MainCourseSection from '@/components/MainCourseSection';
import SpotsSection from '@/components/SpotsSection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';
import { mockCourses, mockSpots, mockNews } from '@/lib/mock-microcms';

import { client } from '@/lib/client';
import type { News } from '@/types';

export default async function Home() {
  let news: News[] = [];
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 3 },
    });
    news = data.contents;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    // Fallback to mock data
    news = mockNews;
  }

  // Ensure we have data (if fetch returns empty but no error)
  if (news.length === 0) {
    news = mockNews;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <NewsSection news={news} />
        <MainCourseSection />
        <SpotsSection spots={mockSpots} />

        {/* Access Section */}
        <section id="access" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-emerald-600 font-medium mb-2 tracking-widest text-sm">
                ACCESS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                アクセス
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                常陸大子駅を拠点としたアクセス情報
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 電車 */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🚃 電車でお越しの方
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">▶</span>
                    <span>JR水郡線「常陸大子駅」下車</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">▶</span>
                    <span>水戸駅から約1時間30分</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">▶</span>
                    <span>郡山駅から約1時間40分</span>
                  </li>
                </ul>
              </div>

              {/* 車 */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🚗 お車でお越しの方
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">▶</span>
                    <span>常磐自動車道「那珂IC」から約50分</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">▶</span>
                    <span>東北自動車道「矢板IC」から約60分</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">▶</span>
                    <span>無料駐車場あり（大子駅前・袋田の滝）</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 地図プレースホルダー */}
            <div className="mt-8 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
              <p className="text-gray-400">
                地図表示エリア（Google Maps埋め込み予定）
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
