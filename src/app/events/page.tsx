import { events } from '@/data/events';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'イベント | 奥久慈街道サイクリング',
  description: '奥久慈エリアで開催されるサイクリングイベント一覧',
};

const statusLabel: Record<string, { text: string; color: string }> = {
  upcoming: { text: '開催予定', color: 'bg-blue-100 text-blue-700' },
  open: { text: 'エントリー受付中', color: 'bg-emerald-100 text-emerald-700' },
  closed: { text: '受付終了', color: 'bg-gray-100 text-gray-600' },
  finished: { text: '開催済み', color: 'bg-gray-100 text-gray-500' },
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">イベント</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const status = statusLabel[event.status];
              return (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.heroImage}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                      {status.text}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-500 mb-1">{event.subtitle}</p>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{event.heroTagline}</p>
                    <p className="mt-3 text-sm font-medium text-emerald-600">詳細を見る →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
