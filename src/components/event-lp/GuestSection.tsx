'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { EventGuest } from '@/data/events';
import { fadeUp, SocialIcon } from './shared';

type Props = {
  guest: EventGuest;
  primary: string;
};

export default function GuestSection({ guest, primary }: Props) {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 bg-white"
      id="guest"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3">ゲストライダー</h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={guest.image}
                alt={guest.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <span
              className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: primary }}
            >
              {guest.title}
            </span>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">{guest.name}</h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-base">{guest.description}</p>
            {guest.socials && guest.socials.length > 0 && (
              <div className="flex items-center gap-4 mt-2">
                {guest.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title={`${s.platform}: ${s.handle}`}
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
