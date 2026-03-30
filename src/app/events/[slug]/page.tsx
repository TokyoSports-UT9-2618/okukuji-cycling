import { notFound } from 'next/navigation';
import { events } from '@/data/events';
import EventLP from '@/components/EventLP';
import type { Metadata } from 'next';

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
    title: `${event.title} | 奥久慈街道サイクリング`,
    description: event.heroTagline,
    openGraph: {
      title: `${event.title} | 奥久慈街道サイクリング`,
      description: event.heroTagline,
      images: [event.heroImage],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Manrope:wght@300;400;700&display=swap"
      />
      <EventLP event={event} />
    </>
  );
}
