'use client';

import { motion } from 'framer-motion';
import type { EventCourseProfile } from '@/data/events';
import { fadeUp, MaterialIcon } from './shared';

type Props = {
  profile: EventCourseProfile;
  primary: string;
};

export default function CourseProfileSection({ profile, primary }: Props) {
  const stats = [
    { label: '走行距離', value: profile.distance, icon: 'straighten' },
    { label: '獲得標高', value: profile.elevation, icon: 'landscape' },
    { label: '平均勾配', value: profile.averageGrade, icon: 'trending_up' },
  ];

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
          <h2 className="text-3xl font-bold tracking-tight mb-3">コースプロフィル</h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {profile.routeEmbedUrl && (
            <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-md bg-white">
              <iframe
                src={profile.routeEmbedUrl}
                width="100%"
                height="480"
                className="border-0 w-full"
                allowFullScreen
                loading="lazy"
                title="コースプロフィル"
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 flex items-center gap-4 flex-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${primary}15` }}
                >
                  <MaterialIcon name={s.icon} className="text-2xl" style={{ color: primary }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              </div>
            ))}

            {profile.routeUrl && (
              <a
                href={profile.routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-medium rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                style={{ color: primary }}
              >
                <MaterialIcon name="open_in_new" className="text-lg" />
                Ride with GPSで詳細を見る
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
