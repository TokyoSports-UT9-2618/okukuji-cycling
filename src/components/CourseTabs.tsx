'use client';

import { useState } from 'react';
import type { CourseData } from '@/data/courses';
import { MapPin, Clock, ArrowUpDown, Phone, Home, AlarmClock } from 'lucide-react';
import { cn } from '@/lib/utils';

const levelColors: Record<number, string> = {
  1: 'bg-emerald-100 text-emerald-800',
  2: 'bg-blue-100 text-blue-800',
  3: 'bg-amber-100 text-amber-800',
  4: 'bg-red-100 text-red-800',
  5: 'bg-purple-100 text-purple-800',
};

const levelDots = (level: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={cn(
        'inline-block w-3 h-3 rounded-full',
        i < level ? 'bg-emerald-500' : 'bg-gray-200'
      )}
    />
  ));

interface Props {
  courses: CourseData[];
}

export default function CourseTabs({ courses }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = courses[activeIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* タブバー */}
      <div className="flex flex-wrap gap-2 mb-8">
        {courses.map((course, i) => (
          <button
            key={course.id}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeIndex === i
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
            )}
          >
            {course.name}
          </button>
        ))}
      </div>

      {/* コース詳細カード */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-slate-900 px-6 py-6 sm:py-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className={cn(
                'text-xs font-bold px-3 py-1 rounded-full',
                levelColors[active.level] ?? 'bg-gray-100 text-gray-700'
              )}
            >
              {active.levelLabel}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{active.name}</h2>
          <div className="flex gap-1 mt-2">{levelDots(active.level)}</div>
        </div>

        {/* スペック */}
        {(active.distance || active.elevation || active.timeWithStop || active.timeWithoutStop) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100 border-b border-slate-100">
            {active.distance && (
              <div className="flex flex-col items-center gap-1 py-4 px-3">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-slate-500">距離</span>
                <span className="font-semibold text-slate-800">{active.distance}</span>
              </div>
            )}
            {active.elevation && (
              <div className="flex flex-col items-center gap-1 py-4 px-3">
                <ArrowUpDown className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-slate-500">獲得標高</span>
                <span className="font-semibold text-slate-800">{active.elevation}</span>
              </div>
            )}
            {active.timeWithStop && (
              <div className="flex flex-col items-center gap-1 py-4 px-3">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-slate-500">立ち寄りあり</span>
                <span className="font-semibold text-slate-800">{active.timeWithStop}</span>
              </div>
            )}
            {active.timeWithoutStop && (
              <div className="flex flex-col items-center gap-1 py-4 px-3">
                <AlarmClock className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-slate-500">立ち寄りなし</span>
                <span className="font-semibold text-slate-800">{active.timeWithoutStop}</span>
              </div>
            )}
          </div>
        )}

        {/* コース説明 */}
        <div className="px-6 py-6">
          <h3 className="text-base font-semibold text-slate-800 mb-2">コース説明</h3>
          <p className="text-slate-600 leading-relaxed text-sm">{active.description}</p>
        </div>

        {/* 季節のみどころ */}
        {active.seasonNote && (
          <div className="px-6 pb-6">
            <div className="bg-emerald-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-emerald-800 mb-1">🌸 季節のみどころ</h3>
              <p className="text-emerald-900 text-sm leading-relaxed">{active.seasonNote}</p>
            </div>
          </div>
        )}

        {/* スポット一覧 */}
        {active.spots.length > 0 && (
          <div className="px-6 pb-8">
            <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              立ち寄りスポット（{active.spots.length}件）
            </h3>
            <div className="space-y-4">
              {active.spots.map((spot) => (
                <div
                  key={spot.number}
                  className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100"
                >
                  {/* 番号バッジ */}
                  <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">
                    {spot.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm mb-1">{spot.name}</p>
                    <p className="text-slate-500 text-xs leading-relaxed mb-2">
                      {spot.description}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                      {spot.address && (
                        <span className="flex items-center gap-1">
                          <Home className="w-3 h-3" />
                          {spot.address}
                        </span>
                      )}
                      {spot.hours && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {spot.hours}
                        </span>
                      )}
                      {spot.closed && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium">休：</span>
                          {spot.closed}
                        </span>
                      )}
                      {spot.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {spot.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
