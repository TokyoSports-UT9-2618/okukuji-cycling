'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { EventData } from '@/data/events';

type Props = {
  event: EventData;
  primary: string;
};

export default function EventHeader({ event, primary }: Props) {
  return (
    <header className="bg-white/80 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-4 sm:px-6 py-3 shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="奥久慈街道サイクリング"
          width={300}
          height={75}
          className="w-[120px] md:w-[140px] h-auto object-contain"
          priority
        />
      </Link>
      <nav className="hidden md:flex gap-6 text-sm">
        <a className="font-medium text-slate-600 hover:text-emerald-600 transition-colors" href="#about">概要</a>
        {event.guest && (
          <a className="font-medium text-slate-600 hover:text-emerald-600 transition-colors" href="#guest">ゲスト</a>
        )}
        <a className="font-medium text-slate-600 hover:text-emerald-600 transition-colors" href="#highlights">見どころ</a>
        <a className="font-medium text-slate-600 hover:text-emerald-600 transition-colors" href="#schedule">スケジュール</a>
        {event.transport && (
          <a className="font-medium text-slate-600 hover:text-emerald-600 transition-colors" href="#access">アクセス</a>
        )}
      </nav>
      <a
        href={event.ctaButtonUrl === '#' ? '#entry' : event.ctaButtonUrl}
        className="text-white px-5 py-2 rounded-full font-bold text-sm transition-transform active:scale-95"
        style={{ backgroundColor: primary }}
      >
        {event.status === 'upcoming' && event.registrationNote
          ? event.registrationNote
          : 'ENTRY'}
      </a>
    </header>
  );
}
