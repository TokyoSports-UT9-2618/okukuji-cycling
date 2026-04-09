'use client';

import type { EventData } from '@/data/events';
import type { News } from '@/types';
import EventHeader from './EventHeader';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import GuestSection from './GuestSection';
import GallerySection from './GallerySection';
import HighlightsSection from './HighlightsSection';
import AidStationSection from './AidStationSection';
import CourseProfileSection from './CourseProfileSection';
import ScheduleSection from './ScheduleSection';
import TransportSection from './TransportSection';
import NewsSection from './NewsSection';
import CtaSection from './CtaSection';
import EventFooter from './EventFooter';

type EventLPProps = {
  event: EventData;
  news?: News[];
};

export default function EventLP({ event, news }: EventLPProps) {
  const primary = event.themeColor ?? '#059669';

  return (
    <div className="bg-gray-50 text-slate-900 antialiased font-sans">
      <EventHeader event={event} primary={primary} />

      <main className="pt-14">
        <HeroSection event={event} primary={primary} />
        <AboutSection event={event} primary={primary} />
        {event.guest && <GuestSection guest={event.guest} primary={primary} />}
        <GallerySection event={event} primary={primary} />
        <HighlightsSection event={event} primary={primary} />
        {event.aidStations && <AidStationSection stations={event.aidStations} primary={primary} />}
        {event.courseProfile && <CourseProfileSection profile={event.courseProfile} primary={primary} />}
        <ScheduleSection event={event} primary={primary} />
        {event.transport && <TransportSection transport={event.transport} primary={primary} />}
        {news && news.length > 0 && <NewsSection news={news} primary={primary} />}
        <CtaSection event={event} primary={primary} />
      </main>

      <EventFooter />
    </div>
  );
}
