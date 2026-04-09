'use client';

import { motion } from 'framer-motion';
import type { EventData } from '@/data/events';
import { fadeUp } from './shared';

type Props = {
  event: EventData;
  primary: string;
};

export default function CtaSection({ event, primary }: Props) {
  return (
    <section className="py-20 px-6 md:px-12 text-white" id="entry" style={{ backgroundColor: primary }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight whitespace-pre-line"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {event.ctaTitle}
        </motion.h2>
        <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto">{event.ctaText}</p>
        {event.ctaButtonUrl === '#' ? (
          <div className="inline-block bg-white/20 backdrop-blur px-10 py-5 rounded-full font-bold text-lg">
            エントリー準備中
          </div>
        ) : (
          <a
            href={event.ctaButtonUrl}
            className="inline-block bg-white px-10 py-5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
            style={{ color: primary }}
          >
            {event.ctaButtonLabel}
          </a>
        )}
      </div>
    </section>
  );
}
