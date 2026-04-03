'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { EventData, EventGuest, EventAidStation, EventTransport, EventCourseProfile } from '@/data/events';
import type { News } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function MaterialIcon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`material-symbols-outlined ${className ?? ''}`} style={style}>{name}</span>
  );
}

type EventLPProps = {
  event: EventData;
  news?: News[];
};

export default function EventLP({ event, news }: EventLPProps) {
  const primary = event.themeColor ?? '#059669';
  const primaryDim = event.themeColor ? `${event.themeColor}dd` : '#047857';

  return (
    <div className="bg-gray-50 text-slate-900 antialiased font-sans">
      {/* Header */}
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

      <main className="pt-14">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={event.heroImage}
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
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

        {/* About Section */}
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

        {/* Guest Section */}
        {event.guest && <GuestSection guest={event.guest} primary={primary} />}

        {/* Gallery: Desktop Bento / Mobile Horizontal Scroll */}
        <section className="py-12 bg-white overflow-hidden">
          {/* Desktop: Bento Grid */}
          <div className="hidden md:block px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
                {event.galleryImages.slice(0, 8).map((img, i) => (
                  <motion.div
                    key={i}
                    className={`relative group overflow-hidden rounded-xl ${
                      i === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.08 } },
                    }}
                  >
                    <Image
                      src={img}
                      alt={`ギャラリー ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide">
              {event.galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  className="relative flex-shrink-0 w-[280px] h-[200px] rounded-xl overflow-hidden snap-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: i * 0.05 } },
                  }}
                >
                  <Image
                    src={img}
                    alt={`ギャラリー ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
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

        {/* Aid Stations */}
        {event.aidStations && (
          <AidStationSection stations={event.aidStations} primary={primary} />
        )}

        {/* Course Profile */}
        {event.courseProfile && (
          <CourseProfileSection profile={event.courseProfile} primary={primary} />
        )}

        {/* Details & Schedule */}
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
              <h2 className="text-3xl font-bold tracking-tight mb-10">タイムテーブル</h2>
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

        {/* Transport / Cycle Train */}
        {event.transport && (
          <TransportSection transport={event.transport} primary={primary} />
        )}

        {/* News Section */}
        {news && news.length > 0 && (
          <NewsOnLPSection news={news} primary={primary} />
        )}

        {/* Final CTA */}
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
      </main>

      {/* Footer */}
      <footer className="bg-white py-10 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="block mb-2">
              <Image
                src="/logo.png"
                alt="奥久慈街道サイクリング"
                width={300}
                height={75}
                className="w-[120px] h-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-400">© 2026 奥久慈街道サイクリング All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs font-medium text-slate-400">
            <Link href="/events" className="hover:text-emerald-600 transition-colors">イベント一覧</Link>
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
            <Link href="/" className="hover:text-emerald-600 transition-colors">Top</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ================================
// Guest Section
// ================================
function GuestSection({ guest, primary }: { guest: EventGuest; primary: string }) {
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
          {/* Guest Image */}
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
          {/* Guest Info */}
          <div className="md:col-span-3">
            <span
              className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: primary }}
            >
              {guest.title}
            </span>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">{guest.name}</h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-base">{guest.description}</p>
            {guest.youtubeChannelName && (
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white" />
                </svg>
                <span>YouTube: {guest.youtubeChannelName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ================================
// Aid Station Section
// ================================
function AidStationSection({ stations, primary }: { stations: EventAidStation[]; primary: string }) {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 bg-emerald-50/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3">エイドステーション＆グルメ</h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stations.map((station, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } },
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                    style={{ backgroundColor: primary }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{station.area}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{station.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{station.description}</p>
                {station.menu && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: primary }}>
                    <MaterialIcon name="restaurant" className="text-lg" />
                    <span className="font-medium">{station.menu}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ================================
// Course Profile Section
// ================================
function CourseProfileSection({ profile, primary }: { profile: EventCourseProfile; primary: string }) {
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
          {/* RideWithGPS Embed — 2/3 */}
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

          {/* Stats Tiles — 1/3 */}
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

// ================================
// Transport / Cycle Train Section
// ================================
function TransportSection({ transport, primary }: { transport: EventTransport; primary: string }) {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 bg-slate-900 text-white"
      id="access"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3">{transport.title}</h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
        </div>
        <p className="text-slate-300 mb-10 max-w-2xl leading-relaxed">{transport.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transport.outbound && (
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MaterialIcon name="arrow_forward" className="text-emerald-400" />
                <span className="font-bold text-lg">{transport.outbound.label}</span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="text-center">
                  <p className="text-2xl font-bold">{transport.outbound.departure}</p>
                  <p className="text-xs text-slate-400">{transport.outbound.from}</p>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-[2px] bg-emerald-500/50" />
                  <MaterialIcon name="train" className="text-emerald-400" />
                  <div className="flex-1 h-[2px] bg-emerald-500/50" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{transport.outbound.arrival}</p>
                  <p className="text-xs text-slate-400">{transport.outbound.to}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center">所要時間 {transport.outbound.duration}</p>
            </div>
          )}

          {transport.inbound && (
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MaterialIcon name="arrow_back" className="text-emerald-400" />
                <span className="font-bold text-lg">{transport.inbound.label}</span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="text-center">
                  <p className="text-2xl font-bold">{transport.inbound.departure}</p>
                  <p className="text-xs text-slate-400">{transport.inbound.from}</p>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-[2px] bg-emerald-500/50" />
                  <MaterialIcon name="train" className="text-emerald-400" />
                  <div className="flex-1 h-[2px] bg-emerald-500/50" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{transport.inbound.arrival}</p>
                  <p className="text-xs text-slate-400">{transport.inbound.to}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center">所要時間 {transport.inbound.duration}</p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

// ================================
// News on LP Section
// ================================
function NewsOnLPSection({ news, primary }: { news: News[]; primary: string }) {
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
          <h2 className="text-3xl font-bold tracking-tight mb-3">お知らせ</h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: primary }} />
        </div>
        <div className="space-y-4">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="block bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-xs text-slate-400">
                    {new Date(item.publishDate).toLocaleDateString('ja-JP')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block text-white text-xs font-bold px-2 py-0.5 rounded mr-2"
                    style={{ backgroundColor: primary }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold inline">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
