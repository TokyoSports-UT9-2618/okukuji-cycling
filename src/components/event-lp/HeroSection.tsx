'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { EventData } from '@/data/events';
import { fadeUp } from './shared';

type Props = {
  event: EventData;
  primary: string;
};

export default function HeroSection({ event, primary }: Props) {
  return (
    <section className="relative min-h-[85vh] flex items-center px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={event.heroImage}
          alt="Hero"
          fill
          className="object-cover object-right md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent md:to-transparent" />
      </div>
      <motion.div
        className="relative z-10 max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <p
          className="uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2 text-sm"
          style={{ color: primary }}
        >
          <span className="w-8 h-[2px]" style={{ backgroundColor: primary }} />
          {event.subtitle}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 whitespace-pre-line">
          {event.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
          {event.heroTagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={event.ctaButtonUrl === '#' ? '#entry' : event.ctaButtonUrl}
            className="text-white px-8 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity text-center"
            style={{ backgroundColor: primary }}
          >
            {event.ctaButtonLabel}
          </a>
          {event.courseProfile?.routeUrl && (
            <a
              href={event.courseProfile.routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-200 text-slate-900 px-8 py-4 rounded-full font-bold text-center hover:bg-slate-300 transition-colors"
            >
              コースを見る
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
