'use client';

import { useState } from 'react';
import type { CourseData } from '@/data/courses';
import type { Spot } from '@/types';
import { MapPin, Clock, ArrowUpDown, Phone, Home, AlarmClock, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpotCard } from '@/components/SpotsSection';

function getSpotTheme(name: string, description: string): { emoji: string; gradient: string } {
  const text = (name + ' ' + description).toLowerCase();
  if (text.includes('カフェ') || text.includes('cafe') || text.includes('コーヒー'))
    return { emoji: '☕', gradient: 'from-amber-500 to-amber-700' };
  if (text.includes('パン') || text.includes('ランチ') || text.includes('食堂') || text.includes('レストラン'))
    return { emoji: '🍱', gradient: 'from-red-500 to-red-700' };
  if (text.includes('温泉') || text.includes('湯'))
    return { emoji: '♨️', gradient: 'from-rose-500 to-rose-700' };
  if (text.includes('サイクル') || text.includes('自転車') || text.includes('ラック'))
    return { emoji: '🚲', gradient: 'from-blue-500 to-blue-700' };
  if (text.includes('道の駅') || text.includes('物産') || text.includes('コンビニ'))
    return { emoji: '🏪', gradient: 'from-green-500 to-green-700' };
  if (text.includes('神社') || text.includes('寺') || text.includes('城'))
    return { emoji: '⛩️', gradient: 'from-orange-500 to-orange-700' };
  if (text.includes('公園') || text.includes('山') || text.includes('川') || text.includes('渓谷'))
    return { emoji: '🌿', gradient: 'from-emerald-500 to-emerald-700' };
  if (text.includes('トイレ'))
    return { emoji: '🚻', gradient: 'from-gray-500 to-gray-700' };
  return { emoji: '📍', gradient: 'from-emerald-600 to-emerald-800' };
}

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
  spots: Spot[];
}

export default function CourseTabs({ courses, spots }: Props) {
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

        {/* コースマップ */}
        {active.mapImage && (
          <div className="px-6 py-6 border-b border-slate-100">
            <h3 className="text-base font-semibold text-slate-800 mb-4">コースマップ</h3>
            <img
              src={active.mapImage}
              alt={`${active.name}マップ`}
              className="w-full rounded-lg border border-slate-200 shadow-sm"
            />
            {active.mapPdf && (
              <a
                href={active.mapPdf}
                download
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                PDFダウンロード
              </a>
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
        {(() => {
          // アクティブなコース名でスポットをフィルタリング
          const filteredSpots = spots.filter((spot) => {
            if (!spot.course) return false;
            // course フィールドが配列またはコース名を含む場合
            const courseName = active.name as any;
            return Array.isArray(spot.course)
              ? spot.course.includes(courseName)
              : String(spot.course).includes(courseName);
          });

          if (filteredSpots.length === 0) {
            return (
              <div className="px-6 pb-8">
                <div className="text-center py-8 text-slate-500">
                  <p>スポット情報は準備中です</p>
                </div>
              </div>
            );
          }

          return (
            <div className="px-6 pb-8">
              <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                立ち寄りスポット（{filteredSpots.length}件）
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSpots.map((spot, index) => (
                  <SpotCard key={spot.id} spot={spot} index={index} />
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
