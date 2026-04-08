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

export type EventGuestSocial = {
  platform: 'youtube' | 'instagram' | 'twitter' | 'tiktok';
  url: string;
  handle: string;
};

export type EventGuest = {
  name: string;
  title: string;
  description: string;
  image: string;
  youtubeUrl?: string;
  youtubeChannelName?: string;
  socials?: EventGuestSocial[];
};

export type EventAidStation = {
  name: string;
  area: string;
  description: string;
  menu?: string;
  image?: string;
};

export type EventTransport = {
  title: string;
  description: string;
  outbound?: {
    label: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
  };
  inbound?: {
    label: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
  };
};

export type EventCourseProfile = {
  distance: string;
  elevation: string;
  averageGrade: string;
  routeUrl?: string;
  routeEmbedUrl?: string;
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
  // 拡張フィールド
  themeColor?: string;
  guest?: EventGuest;
  courseProfile?: EventCourseProfile;
  aidStations?: EventAidStation[];
  transport?: EventTransport;
  eventTag?: string;
  registrationStartDate?: string;
  registrationNote?: string;
  galleryVideoId?: string;
};

export const events: EventData[] = [
  // ============================
  // 水郡線で行こう！久慈川サイクリングツアー
  // ============================
  {
    slug: 'suigun-cycling-2026',
    title: '水郡線で行こう！\n久慈川サイクリングツアー',
    subtitle: 'まるごとパワースポット・奥久慈満喫サイクリング',
    date: '2026-05-31',
    heroImage: '/images/events/suigun-cycling/hero.jpg',
    heroTagline:
      'サイクルトレインで行く、パワースポットと地元グルメを満喫するゆるポタツアー。人気YouTuber・あむさんと走ろう！',
    themeColor: '#059669',
    eventTag: 'suigun-cycling',
    status: 'upcoming',
    registrationStartDate: '2026-04-11',
    registrationNote: '4月11日（土）募集開始',
    galleryVideoId: 'JbFrXtqvvwk',

    // ゲスト
    guest: {
      name: 'あむさん',
      title: '自転車YouTuber',
      description:
        '人気自転車YouTuberのあむさんがゲストライダーとして参加！一緒に奥久慈の絶景とグルメを楽しみながら走りましょう。初心者から経験者まで、みんなが楽しめるゆるポタライドです。',
      image: '/images/events/suigun-cycling/guest.jpg',
      youtubeUrl: 'https://www.youtube.com/@amuaiamu',
      youtubeChannelName: 'あむちゃん',
      socials: [
        { platform: 'youtube', url: 'https://www.youtube.com/@amuaiamu', handle: '@amuaiamu' },
        { platform: 'instagram', url: 'https://www.instagram.com/amuaiamu', handle: '@amuaiamu' },
        { platform: 'twitter', url: 'https://twitter.com/macaroncoloram', handle: '@macaroncoloram' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@amuaiamu', handle: '@amuaiamu' },
      ],
    },

    // About
    aboutTitle: 'このイベントについて',
    aboutText:
      '水郡線のサイクルトレインに自転車を載せて、東白川エリアの久慈川沿いを走るガイド付きサイクリングツアーです。棚倉町・塙町・矢祭町をつなぐ約36kmのゆるポタコースで、パワースポット巡りと地元グルメを満喫。サポートライダー付きなので初心者でも安心して参加できます。',
    aboutQuote:
      '「水郡線サイクルトレインは奥久慈エリアの宝。自転車と一緒に列車に乗って、とっておきの場所へ出かけよう。」',

    // ギャラリー（プレースホルダー：後で差し替え）
    galleryImages: [
      '/images/events/suigun-cycling/gallery-1.jpg',
      '/images/events/suigun-cycling/gallery-2.jpg',
      '/images/events/suigun-cycling/gallery-3.jpg',
      '/images/events/suigun-cycling/gallery-4.jpg',
      '/images/events/suigun-cycling/gallery-6.jpg',
      '/images/events/suigun-cycling/gallery-7.jpg',
      '/images/events/suigun-cycling/gallery-8.jpg',
    ],

    // ハイライト
    highlights: [
      {
        icon: 'temple_buddhist',
        title: 'パワースポット巡り',
        description:
          '馬場都々古別神社・山本不動・三峯神社など、東白川エリアの由緒あるパワースポットを巡ります。',
      },
      {
        icon: 'restaurant',
        title: '地元グルメ満載',
        description:
          '福美屋の焼きだんご、道の駅はなわのえっちゃん弁当＆野点コーヒー、矢祭山の鮎の塩焼き。走った先にご褒美が待っています。',
      },
      {
        icon: 'train',
        title: 'サイクルトレインで楽々',
        description:
          '水郡線の通常運行列車にそのまま自転車を持ち込めるサイクルトレイン。輪行袋不要で手軽にサイクリングが楽しめます。',
      },
    ],

    // 開催概要
    details: [
      { label: '開催日', value: '2026年5月31日（日）' },
      { label: 'エリア', value: '東白川郡（久慈川サイクリングロード主体）' },
      { label: '参加費', value: '¥5,000' },
      { label: '定員', value: '20名', note: '上菅谷発' },
      { label: '募集開始', value: '2026年4月11日（土）' },
      { label: 'コース', value: 'ゆるポタコース（約36km / 獲得標高364m）' },
    ],

    // コースプロフィル
    courseProfile: {
      distance: '36.4km',
      elevation: '364m',
      averageGrade: '1.1%',
      routeUrl: 'https://ridewithgps.com/routes/54480903',
      routeEmbedUrl:
        'https://ridewithgps.com/embeds?type=route&id=54480903&sampleGraph=true',
    },

    // タイムテーブル
    schedule: [
      {
        time: '07:15',
        title: '上菅谷駅に集合',
        description: '車でお越しの方は近隣の駐車場にお停めいただいてからお集まりください。',
      },
      {
        time: '07:53',
        title: '上菅谷駅 サイクルトレイン出発',
        description:
          '自転車と一緒に水郡線に乗車！約2時間の列車旅を楽しみましょう。',
      },
      {
        time: '09:46',
        title: '磐城棚倉駅 到着',
        description: '棚倉城跡に移動して開会式。ゲストのあむさんと合流！',
      },
      {
        time: '10:30',
        title: 'ライドスタート',
        description:
          '馬場都々古別神社を経由して山本不動へ。焼きだんごでエネルギー補給。',
      },
      {
        time: '12:15',
        title: '道の駅はなわ（昼食）',
        description:
          'えっちゃん弁当と野点コーヒーでゆったり休憩。ダリちゃんがお出迎え？',
      },
      {
        time: '13:00',
        title: '風呂山公園〜矢祭山へ',
        description:
          '三峯神社と満開のツツジを楽しみながら矢祭山駅を目指します。',
      },
      {
        time: '15:00',
        title: '矢祭山駅 ゴール',
        description:
          '鮎の塩焼きで乾杯！あゆの吊り橋や夢想滝など散策を楽しめます。',
      },
      {
        time: '17:31',
        title: '矢祭山駅 サイクルトレインで帰路',
        description: '皆さん、乗り遅れないようにお集まりください。',
      },
      {
        time: '18:55',
        title: '上菅谷駅到着',
        description: 'お疲れ様でした！',
      },
    ],

    // エイドステーション
    aidStations: [
      {
        name: '山本不動（福美屋）',
        area: '棚倉町',
        description:
          '山本キャンプ場手前の川沿いで、焼きだんごを頬張りながら休憩。',
        menu: '焼きだんご',
        image: '/images/events/suigun-cycling/aid-yamamoto.jpg',
      },
      {
        name: '道の駅はなわ',
        area: '塙町',
        description:
          'メインのランチエイド。えっちゃん弁当と野点コーヒーでゆったり。',
        menu: 'えっちゃん弁当 / 野点コーヒー',
        image: '/images/events/suigun-cycling/aid-hanawa.jpg',
      },
      {
        name: '矢祭山駅（ゴール）',
        area: '矢祭町',
        description:
          'ゴール地点。名物の鮎の塩焼きを食べながら、矢祭山公園を散策。',
        menu: '鮎の塩焼き',
        image: '/images/events/suigun-cycling/aid-yamatsuri.jpg',
      },
    ],

    // サイクルトレイン
    transport: {
      title: 'サイクルトレインで行こう！',
      description:
        '水郡線では自転車をそのまま列車に持ち込めるサイクルトレインを常時運行中。輪行袋不要で、改札を通ってホームに上がるだけ。今回は上菅谷駅から乗車します。',
      outbound: {
        label: '往路',
        from: '上菅谷',
        to: '磐城棚倉',
        departure: '07:53',
        arrival: '09:46',
        duration: '113分',
      },
      inbound: {
        label: '復路',
        from: '矢祭山',
        to: '上菅谷',
        departure: '17:31',
        arrival: '18:45',
        duration: '74分',
      },
    },

    // CTA
    ctaTitle: '一緒に\n走りませんか？',
    ctaText:
      '定員20名・先着順です。募集開始は4月11日（土）。お早めにエントリーを！',
    ctaButtonLabel: 'エントリーする',
    ctaButtonUrl: 'https://www.sportsentry.ne.jp/event/t/105184',

  },

];
