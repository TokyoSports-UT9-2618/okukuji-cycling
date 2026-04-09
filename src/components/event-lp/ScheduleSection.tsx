'use client';

import { motion } from 'framer-motion';
import type { EventData } from '@/data/events';
import { fadeUp, MaterialIcon } from './shared';

type Props = {
  event: EventData;
  primary: string;
};

export default function ScheduleSection({ event, primary }: Props) {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 bg-white"
      id="schedule"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Details */}
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-bold tracking-tight mb-10">開催概要</h2>
          <ul className="space-y-6">
            {event.details.map((d, i) => {
              const iconMap: Record<string, string> = {
                '開催日': 'calendar_today',
                'エリア': 'location_on',
                '場所': 'location_on',
                '参加費': 'payments',
                '定員': 'groups',
                '募集開始': 'campaign',
                'コース': 'route',
              };
              return (
                <li key={i} className="flex items-start gap-4">
                  <MaterialIcon
                    name={iconMap[d.label] ?? 'info'}
                    className="text-2xl mt-0.5"
                    style={{ color: primary } as React.CSSProperties}
                  />
                  <div>
                    <h4 className="font-bold text-xs tracking-wider text-slate-400 uppercase mb-1">{d.label}</h4>
                    <p className="text-lg font-medium">
                      {d.value}
                      {d.note && (
                        <span className="text-sm text-slate-400 font-normal ml-2">({d.note})</span>
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Schedule Timeline */}
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-bold tracking-tight mb-2">タイムテーブル</h2>
          <p className="text-xs text-slate-400 mb-8">※ ライド中の時間は想定スケジュールです。当日の天候や参加者のペースにより変更になる場合があります。</p>
          <div className="space-y-0 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
            {event.schedule.map((s, i) => (
              <div key={i} className={`relative pl-10 ${i < event.schedule.length - 1 ? 'pb-8' : ''}`}>
                <div
                  className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm"
                  style={{ backgroundColor: primary }}
                />
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <span className="font-black text-xl" style={{ color: primary }}>{s.time}</span>
                  <h4 className="text-lg font-bold">{s.title}</h4>
                </div>
                <p className="text-slate-600 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
