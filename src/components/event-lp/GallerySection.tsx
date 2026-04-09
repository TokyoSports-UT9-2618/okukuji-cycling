'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { EventData } from '@/data/events';
import { fadeUp, MaterialIcon } from './shared';

type Props = {
  event: EventData;
  primary: string;
};

export default function GallerySection({ event, primary }: Props) {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="px-6 md:px-12 max-w-6xl mx-auto mb-6">
        <h2 className="text-3xl font-bold tracking-tight mb-3">昨年の様子</h2>
        <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
      </div>
      {/* Desktop: Bento Grid */}
      <div className="hidden md:block px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            {event.galleryImages.slice(0, 8).map((img, i) => (
              <motion.div
                key={i}
                className={`relative group overflow-hidden rounded-xl ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.08 } },
                }}
              >
                <Image
                  src={img}
                  alt={`ギャラリー ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide">
          {event.galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 w-[280px] h-[200px] rounded-xl overflow-hidden snap-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: i * 0.05 } },
              }}
            >
              <Image
                src={img}
                alt={`ギャラリー ${i + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-3 text-slate-400">
          <span className="text-xs">&larr;</span>
          <span className="text-xs tracking-wider">スワイプで写真を見る</span>
          <span className="text-xs">&rarr;</span>
        </div>
      </div>

      {/* Gallery Video */}
      {event.galleryVideoId && (
        <motion.div
          className="px-6 md:px-12 mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
              <MaterialIcon name="play_circle" className="text-lg" style={{ color: primary }} />
              昨年の動画もチェック！
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
              <iframe
                src={`https://www.youtube.com/embed/${event.galleryVideoId}`}
                title="イベント動画"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
