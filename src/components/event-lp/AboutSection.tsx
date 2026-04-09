'use client';

import { motion } from 'framer-motion';
import type { EventData } from '@/data/events';
import { fadeUp, MaterialIcon } from './shared';

type Props = {
  event: EventData;
  primary: string;
};

export default function AboutSection({ event, primary }: Props) {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 max-w-6xl mx-auto"
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-6">{event.aboutTitle}</h2>
          <p className="text-base text-slate-600 leading-loose">{event.aboutText}</p>
        </div>
        <div className="bg-emerald-50 p-8 rounded-xl border border-emerald-100">
          <p className="text-xl font-light italic text-slate-700 leading-snug">
            {event.aboutQuote}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: primary }}
            >
              <MaterialIcon name="directions_bike" className="text-xl" />
            </div>
            <span className="font-bold text-sm text-slate-500">東白川サイクリング推進会議</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
