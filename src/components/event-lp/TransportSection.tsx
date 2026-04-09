'use client';

import { motion } from 'framer-motion';
import type { EventTransport } from '@/data/events';
import { fadeUp, MaterialIcon } from './shared';

type Props = {
  transport: EventTransport;
  primary: string;
};

export default function TransportSection({ transport, primary }: Props) {
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
