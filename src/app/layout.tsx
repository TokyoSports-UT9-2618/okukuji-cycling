import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '奥久慈街道サイクリング | Okukuji Kaido Cycling',
  description:
    '福島県奥久慈地方の雄大な自然を自転車で巡る、サイクルツーリズムの公式サイト。久慈川沿いの渓谷美、里山の風景、地元グルメを満喫できるサイクリングルートをご紹介します。',
  keywords: [
    '奥久慈',
    'サイクリング',
    '福島県',
    '久慈川',
    'サイクルツーリズム',
    '自転車旅',
    '袋田の滝',
  ],
  openGraph: {
    title: '奥久慈街道サイクリング | Okukuji Kaido Cycling',
    description:
      '福島県奥久慈地方の雄大な自然を自転車で巡る、サイクルツーリズムの公式サイト。',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="antialiased">
        {children}
        <GoogleAnalytics gaId="G-7FC47SBCNM" />
      </body>
    </html>
  );
}
