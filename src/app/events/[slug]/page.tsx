import { notFound } from 'next/navigation';
import { events } from '@/data/events';
import { client } from '@/lib/client';
import EventLP from '@/components/EventLP';
import type { Metadata } from 'next';
import type { News, MicroCMSListResponse } from '@/types';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};

  return {
    title: `${event.title.replace('\n', ' ')} | 奥久慈街道サイクリング`,
    description: event.heroTagline,
    openGraph: {
      title: `${event.title.replace('\n', ' ')} | 奥久慈街道サイクリング`,
      description: event.heroTagline,
      images: [event.heroImage],
    },
  };
}

async function getEventNews(eventTag?: string): Promise<News[]> {
  if (!eventTag) return [];
  try {
    const res = await client.getList<News>({
      endpoint: 'news',
      queries: {
        filters: `eventTag[contains]${eventTag}`,
        orders: '-publishDate',
        limit: 5,
      },
    });
    return res.contents;
  } catch {
    // eventTagフィールドがまだmicroCMSに追加されていない場合や、
    // category=イベントのニュースをフォールバックで取得
    try {
      const res = await client.getList<News>({
        endpoint: 'news',
        queries: {
          filters: 'category[equals]イベント',
          orders: '-publishDate',
          limit: 3,
        },
      });
      return res.contents;
    } catch {
      return [];
    }
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();

  const news = await getEventNews(event.eventTag);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <EventLP event={event} news={news} />
    </>
  );
}
