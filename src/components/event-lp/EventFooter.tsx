import Image from 'next/image';
import Link from 'next/link';

export default function EventFooter() {
  return (
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
          <p className="text-xs text-slate-400">&copy; 2026 奥久慈街道サイクリング All rights reserved.</p>
        </div>
        <div className="flex gap-6 text-xs font-medium text-slate-400">
          <Link href="/events" className="hover:text-emerald-600 transition-colors">イベント一覧</Link>
          <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
          <Link href="/" className="hover:text-emerald-600 transition-colors">Top</Link>
        </div>
      </div>
    </footer>
  );
}
