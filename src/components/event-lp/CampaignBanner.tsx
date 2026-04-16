'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from './shared';

function WaveLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 6c16.667-6 33.333-6 50 0s33.333 6 50 0 33.333-6 50 0 33.333 6 50 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CampaignBanner() {
  return (
    <section
      className="relative py-16 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: '#f2efec' }}
    >
      {/* 装飾の波線 */}
      <WaveLine className="absolute top-8 left-10 w-28 text-emerald-400/60" />
      <WaveLine className="absolute bottom-10 right-16 w-36 text-emerald-400/60" />
      <WaveLine className="absolute top-1/3 right-1/4 w-20 text-emerald-300/50 rotate-6" />

      <motion.div
        className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {/* DCロゴ — アイソレーション確保のためpadding付き */}
        <a
          href="https://www.fukushima-dc-cp.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-4 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/events/suigun-cycling/dc-logo.png"
            alt="しあわせの風ふくしま — ふくしまデスティネーションキャンペーン2026"
            width={180}
            height={163}
            className="w-[140px] md:w-[180px] h-auto mix-blend-multiply"
          />
        </a>

        {/* テキスト */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs tracking-widest text-slate-400 uppercase mb-1">
            Fukushima Destination Campaign 2026
          </p>
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
            <a
              href="https://www.fukushima-dc-cp.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              ふくしまデスティネーションキャンペーン
            </a>
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-3">
            本イベントは「ふくしまデスティネーションキャンペーン2026」の連携イベントです。
            JR東日本と福島県が協力して福島の魅力を発信しています。
          </p>
          <a
            href="https://www.fukushima-dc-cp.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            キャンペーンサイトを見る
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* QRコード */}
        <a
          href="https://www.fukushima-dc-cp.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/events/suigun-cycling/dc-qr.png"
            alt="ふくしまDCキャンペーンサイト QRコード"
            width={100}
            height={100}
            className="w-[80px] md:w-[100px] h-auto mix-blend-multiply"
          />
          <span className="text-[10px] text-slate-400">キャンペーンサイト</span>
        </a>
      </motion.div>
    </section>
  );
}
