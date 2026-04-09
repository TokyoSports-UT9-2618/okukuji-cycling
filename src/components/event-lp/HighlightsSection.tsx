'use client';

import { motion } from 'framer-motion';
import type { EventData } from '@/data/events';
import { fadeUp, MaterialIcon } from './shared';

type Props = {
  event: EventData;
  primary: string;
};

export default function HighlightsSection({ event, primary }: Props) {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 bg-gray-50"
      id="highlights"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">見どころ</h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {event.highlights.map((h, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } },
              }}
            >
              <div className="mb-4" style={{ color: primary }}>
                <MaterialIcon name={h.icon} className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">{h.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{h.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
