export type EventHighlight = {
  icon: string;
  title: string;
  description: string;
};

export type EventScheduleItem = {
  time: string;
  title: string;
  description: string;
};

export type EventDetail = {
  label: string;
  value: string;
  note?: string;
};

export type EventData = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  heroImage: string;
  heroTagline: string;
  aboutTitle: string;
  aboutText: string;
  aboutQuote: string;
  galleryImages: string[];
  highlights: EventHighlight[];
  details: EventDetail[];
  schedule: EventScheduleItem[];
  ctaTitle: string;
  ctaText: string;
  ctaButtonLabel: string;
  ctaButtonUrl: string;
  mapEmbedUrl?: string;
  status: 'upcoming' | 'open' | 'closed' | 'finished';
};

export const events: EventData[] = [
  {
    slug: 'veloce-kinetic-2026-autumn',
    title: 'VELOCE KINETIC 2026',
    subtitle: 'Autumn Edition',
    date: '2026-10-24',
    heroImage: '/images/events/b78d052fc3953e1d933f322d5be626c8.png',
    heroTagline: '自然とスピードの調和。奥久慈の渓谷を駆け抜けるプレミアムライド。',
    aboutTitle: 'THE MISSION',
    aboutText:
      'サイクリングはただのスポーツではなく、人間と自然の景観がリズムを刻む対話です。2026年秋の奥久慈ライドは、久慈川沿いの紅葉と里山の風景の中を走り抜ける特別な1日。初心者からベテランまで、すべてのライダーに開かれたイベントです。',
    aboutQuote:
      '「タイムを測るのではなく、体験の濃さを測る。すべての登りが挑戦であり、すべての下りがご褒美。」',
    galleryImages: [
      '/images/events/681edd45625dda53023fa93c2dd1d758.png',
      '/images/events/8ef859bc3a6299c053a106d7c421d3d7.png',
      '/images/events/f10055c715fba04b9324b0a584d2d1d6.png',
      '/images/events/335a1ee23ecffb51522d497596509cd4.png',
    ],
    highlights: [
      {
        icon: 'terrain',
        title: '絶景ルート',
        description:
          '久慈川渓谷と袋田の滝周辺を巡る、地元ならではの隠れた絶景ポイントを走るルートです。',
      },
      {
        icon: 'restaurant',
        title: '地元グルメ',
        description:
          'エイドステーションでは地元の農家直送フルーツや郷土料理を楽しめます。走った後のご褒美です。',
      },
      {
        icon: 'groups',
        title: '初心者歓迎',
        description:
          '複数のコース設定で、初めてのロングライドから経験者まで自分に合ったペースで参加できます。',
      },
    ],
    details: [
      { label: '開催日', value: '2026年10月24日（土）' },
      { label: '場所', value: '福島県奥久慈エリア（大子町・塙町）' },
      { label: '参加費', value: '¥5,000', note: '早期割引' },
      { label: '定員', value: '150名' },
    ],
    schedule: [
      {
        time: '07:00',
        title: '受付開始',
        description: 'JR常陸大子駅前広場で受付。ゼッケン配布と最終ブリーフィング。',
      },
      {
        time: '08:30',
        title: 'スタート',
        description: 'ウェーブスタート。久慈川沿いのルートへ出発。',
      },
      {
        time: '12:00',
        title: 'エイドステーション',
        description: '地元グルメの補給ポイント。休憩と写真撮影を楽しんで。',
      },
      {
        time: '16:00',
        title: 'ゴール＆交流会',
        description: '完走証授与、地元食材のBBQ交流会。仲間との時間を楽しもう。',
      },
    ],
    ctaTitle: '走る準備は\nできた？',
    ctaText: '2026年秋の奥久慈ライド、定員に達し次第締め切り。今すぐエントリーを。',
    ctaButtonLabel: 'エントリーする',
    ctaButtonUrl: '#',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102400!2d140.35!3d36.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60218c0a5b8b1c5d%3A0x4e3e5f6a7b8c9d0e!2z5aWl5LmF5oWI!5e0!3m2!1sja!2sjp!4v1',
    status: 'upcoming',
  },
];
