'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { EventData } from '@/data/events';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className ?? ''}`}>{name}</span>
  );
}

export default function EventLP({ event }: { event: EventData }) {
  return (
    <div className="bg-[#f5f7f9] text-[#2c2f31] antialiased">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-6 py-4 shadow-2xl shadow-zinc-900/5">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Okukuji Kaido Cycling"
              width={300}
              height={75}
              className="w-[120px] md:w-[140px] h-auto object-contain"
              priority
            />
          </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <a className="font-bold tracking-tight uppercase text-zinc-600 hover:opacity-80 transition-opacity text-sm" href="#about">About</a>
          <a className="font-bold tracking-tight uppercase text-zinc-600 hover:opacity-80 transition-opacity text-sm" href="#highlights">Highlights</a>
          <a className="font-bold tracking-tight uppercase text-zinc-600 hover:opacity-80 transition-opacity text-sm" href="#schedule">Schedule</a>
          <a className="font-bold tracking-tight uppercase text-zinc-600 hover:opacity-80 transition-opacity text-sm" href="#map">Map</a>
        </nav>
        <a
          href={event.ctaButtonUrl}
          className="bg-[#a13900] text-white px-6 py-2 rounded-full font-bold tracking-tight text-sm uppercase transition-transform active:scale-95"
        >
          ENTRY
        </a>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={event.heroImage}
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5f7f9]/90 via-[#f5f7f9]/40 to-transparent" />
          </div>
          <motion.div
            className="relative z-10 max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <p className="uppercase tracking-[0.3em] text-[#a13900] font-bold mb-4 flex items-center gap-2 text-sm">
              <span className="w-8 h-[2px] bg-[#a13900]" />
              {event.subtitle}
            </p>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
              {event.title.split(' ').map((word, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <span className="text-[#a13900] italic">{word}</span>
                  ) : (
                    word
                  )}
                  {i < event.title.split(' ').length - 1 && (i === 0 ? <br /> : ' ')}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-[#595c5e] max-w-xl mb-10 leading-relaxed">
              {event.heroTagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={event.ctaButtonUrl}
                className="bg-[#a13900] text-[#ffefea] px-10 py-4 rounded-full font-bold uppercase tracking-tight shadow-xl shadow-[#a13900]/20 hover:bg-[#8d3100] transition-colors text-center"
              >
                {event.ctaButtonLabel}
              </a>
              <Link
                href="/course"
                className="bg-[#d9dde0] text-[#2c2f31] px-10 py-4 rounded-full font-bold uppercase tracking-tight text-center"
              >
                コースを見る
              </Link>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section
          className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-8">{event.aboutTitle}</h2>
              <p className="text-lg text-[#595c5e] leading-loose">{event.aboutText}</p>
            </div>
            <div className="bg-[#eef1f3] p-8 rounded-xl">
              <p className="text-2xl font-light italic leading-snug">
                {event.aboutQuote}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#a13900] rounded-full flex items-center justify-center text-white">
                  <MaterialIcon name="directions_bike" />
                </div>
                <span className="font-bold uppercase tracking-widest text-sm">Founding Ethos</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Gallery: Bento Grid */}
        <section className="py-12 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-auto md:h-[700px]">
              {event.galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  className={`relative group overflow-hidden rounded-lg ${
                    i === 0 ? 'sm:col-span-2 md:row-span-2 min-h-[250px]' : i === 1 ? 'sm:col-span-2 min-h-[200px]' : 'min-h-[200px]'
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.1 } },
                  }}
                >
                  <Image
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <motion.section
          className="py-24 px-6 md:px-12 bg-[#f5f7f9]"
          id="highlights"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4">EVENT HIGHLIGHTS</h2>
              <div className="w-20 h-1 bg-[#a13900]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {event.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="bg-[#eef1f3] p-10 rounded-xl hover:shadow-2xl hover:shadow-[#a13900]/5 transition-all"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } },
                  }}
                >
                  <div className="text-[#a13900] mb-6">
                    <MaterialIcon name={h.icon} className="text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 uppercase">{h.title}</h3>
                  <p className="text-[#595c5e] leading-relaxed">{h.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Details & Schedule */}
        <motion.section
          className="py-24 px-6 md:px-12 bg-white"
          id="schedule"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Details */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl font-bold tracking-tight mb-12">開催概要</h2>
              <ul className="space-y-8">
                {event.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-6">
                    <MaterialIcon
                      name={
                        d.label === '開催日' ? 'calendar_today' :
                        d.label === '場所' ? 'location_on' :
                        d.label === '参加費' ? 'payments' :
                        'info'
                      }
                      className="text-[#a13900] text-2xl mt-1"
                    />
                    <div>
                      <h4 className="font-bold text-sm tracking-widest text-[#595c5e] uppercase mb-1">{d.label}</h4>
                      <p className="text-xl font-medium">
                        {d.value}
                        {d.note && (
                          <span className="text-sm text-[#595c5e] font-normal ml-2">({d.note})</span>
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule Timeline */}
            <div className="lg:col-span-7">
              <h2 className="text-4xl font-bold tracking-tight mb-12 uppercase">タイムライン</h2>
              <div className="space-y-0 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#dfe3e6]">
                {event.schedule.map((s, i) => (
                  <div key={i} className={`relative pl-12 ${i < event.schedule.length - 1 ? 'pb-12' : ''}`}>
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#a13900] border-4 border-white" />
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="font-black text-2xl text-[#a13900]">{s.time}</span>
                      <h4 className="text-xl font-bold uppercase tracking-tight">{s.title}</h4>
                    </div>
                    <p className="text-[#595c5e]">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Map Section */}
        {event.mapEmbedUrl && (
          <motion.section
            className="py-24 px-6 md:px-12 bg-[#eef1f3]"
            id="map"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-4">COURSE MAP</h2>
                <div className="w-20 h-1 bg-[#a13900]" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={event.mapEmbedUrl}
                  width="100%"
                  height="500"
                  className="border-0 w-full"
                  allowFullScreen
                  loading="lazy"
                  title="コースマップ"
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Final CTA */}
        <section className="py-24 px-6 md:px-12 bg-[#a13900] text-[#ffefea]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight whitespace-pre-line"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {event.ctaTitle}
            </motion.h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">{event.ctaText}</p>
            <a
              href={event.ctaButtonUrl}
              className="inline-block bg-white text-[#a13900] px-12 py-5 rounded-full font-bold text-xl uppercase tracking-tighter hover:bg-[#ffefea] transition-all shadow-2xl"
            >
              {event.ctaButtonLabel}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#eef1f3] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="block mb-2">
              <Image
                src="/logo.png"
                alt="Okukuji Kaido Cycling"
                width={300}
                height={75}
                className="w-[120px] h-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#595c5e]">© 2026 奥久慈街道サイクリング All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-[0.2em] font-bold text-[#595c5e]">
            <Link href="/privacy" className="hover:text-[#a13900] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#a13900] transition-colors">Terms</Link>
            <Link href="/" className="hover:text-[#a13900] transition-colors">Top</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
