'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { EventAidStation } from '@/data/events';
import { fadeUp, MaterialIcon } from './shared';

type Props = {
  stations: EventAidStation[];
  primary: string;
};

export default function AidStationSection({ stations, primary }: Props) {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 bg-emerald-50/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3">エイドステーション＆グルメ</h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stations.map((station, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } },
              }}
            >
              {station.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={station.image}
                    alt={station.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold shadow-md"
                      style={{ backgroundColor: primary }}
                    >
                      {i + 1}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {!station.image && (
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: primary }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span className="text-xs font-medium text-slate-400">{station.area}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{station.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{station.description}</p>
                {station.menu && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: primary }}>
                    <MaterialIcon name="restaurant" className="text-lg" />
                    <span className="font-medium">{station.menu}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
