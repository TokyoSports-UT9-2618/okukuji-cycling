import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MainCourseSection from '@/components/MainCourseSection';
import SpotsSection from '@/components/SpotsSection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';
import { mockCourses, mockNews, mockAccess } from '@/lib/mock-microcms';
import { Train, Car, ChevronRight } from 'lucide-react';

import { client } from '@/lib/client';
import type { News, Course, Spot, Access } from '@/types';

export default async function Home() {
  let news: News[] = [];
  let spots: Spot[] = [];
  let access: Access[] = [];
  let mainCourse: Course = mockCourses[0];

  try {
    // News Fetch
    const newsData = await client.get({
      endpoint: 'news',
      queries: { limit: 3 },
    });
    news = newsData.contents;

    // Course Fetch (Main Course)
    const courseData = await client.get({
      endpoint: 'courses',
      queries: { limit: 1 }, // Fetch the first course as the main one
    });
    if (courseData.contents.length > 0) {
      mainCourse = courseData.contents[0];
    }

    // Spot Fetch (Top Page Filter)
    const spotsData = await client.get({
      endpoint: 'spots',
      queries: { filters: 'show_on_top[equals]true', limit: 10 },
    });
    spots = spotsData.contents;

    // Access Fetch
    const accessData = await client.get({
      endpoint: 'access',
    });
    access = accessData.contents;

  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Fallback to mock data for news (course already has fallback)
    news = mockNews;
    // Spots fallback: empty (Requirement: Delete mock data usage)
    // Access fallback
    access = mockAccess;
  }

  // Ensure we have data (if fetch returns empty but no error)
  if (news.length === 0) {
    news = mockNews;
  }
  if (access.length === 0) {
    access = mockAccess;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div id="news" className="scroll-mt-24">
          <NewsSection news={news} />
        </div>
        <div id="courses" className="scroll-mt-24">
          <MainCourseSection course={mainCourse} />
        </div>
        <SpotsSection spots={spots} viewAllLink="/spots" className="bg-gray-50" />

        {/* Access Section */}
        <section id="access" className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-emerald-400 font-medium mb-2 tracking-widest text-sm">
                ACCESS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                アクセス
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                奥久慈街道（福島県東白川エリア）へのアクセス情報
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {Array.isArray(access) && access.map((item) => {
                // categoryがオブジェクトの場合（microCMSの仕様）に対応して正規化
                const rawInfo = item.category as any;
                const categoryStr = typeof rawInfo === 'object' && rawInfo !== null
                  ? rawInfo.id || (Array.isArray(rawInfo) ? rawInfo[0] : '')
                  : rawInfo;

                const isTrain = String(categoryStr || '').toLowerCase().includes('train');
                const Icon = isTrain ? Train : Car;
                const iconColor = isTrain ? 'text-emerald-600' : 'text-rose-500';
                // itemsが配列か文字列（リッチエディタ等）かを確認して正規化
                const listItems = Array.isArray(item.items)
                  ? item.items
                  : typeof item.items === 'string'
                    ? [item.items]
                    : [];

                return (
                  <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Icon className="w-6 h-6 text-gray-700" />
                      {item.title}
                    </h3>
                    <ul className="space-y-3 text-gray-800">
                      {listItems.map((listItem, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                          <div
                            className="break-words [&>p]:mb-0"
                            dangerouslySetInnerHTML={{ __html: listItem }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
