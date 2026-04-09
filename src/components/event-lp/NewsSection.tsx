'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { News } from '@/types';
import { fadeUp } from './shared';

type Props = {
  news: News[];
  primary: string;
};

export default function NewsSection({ news, primary }: Props) {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3">お知らせ</h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
        </div>
        <div className="space-y-4">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="block bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-xs text-slate-400">
                    {new Date(item.publishDate).toLocaleDateString('ja-JP')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block text-white text-xs font-bold px-2 py-0.5 rounded mr-2"
                    style={{ backgroundColor: primary }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold inline">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
