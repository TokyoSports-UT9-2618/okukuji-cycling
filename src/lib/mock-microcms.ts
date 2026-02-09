import type { News, Course, Spot, Access, MicroCMSListResponse } from '@/types';

// ダミー日時
const now = new Date().toISOString();
const baseDate = {
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
    revisedAt: now,
};

// ======================
// News モックデータ
// ======================
export const mockNews: News[] = [
    {
        id: 'news-001',
        ...baseDate,
        title: '【2026/02/15】春のサイクリングイベント開催決定！',
        publishDate: '2026-02-15',
        category: 'イベント',
        eyecatch: {
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
            width: 1200,
            height: 630,
        },
        content: '<h2>春の奥久慈を駆け抜けよう</h2><p>2026年3月21日（土）、奥久慈街道サイクリングの春イベントを開催します。</p><p>初心者向けの20kmコースから、上級者向けの80kmコースまで、レベルに合わせてお選びいただけます。</p><ul><li>参加費：1,500円（保険料込み）</li><li>定員：各コース50名</li><li>申込締切：3月10日</li></ul>',
    },
    {
        id: 'news-002',
        ...baseDate,
        title: '県道118号線の一部通行規制のお知らせ',
        publishDate: '2026-02-10',
        category: '交通・規制',
        content: '<h2>工事に伴う通行規制</h2><p>2026年2月20日〜3月15日の期間、県道118号線の一部区間で道路工事が行われます。</p><p>該当区間を通過するコースをご利用の方は、迂回ルートをご確認ください。</p>',
    },
    {
        id: 'news-003',
        ...baseDate,
        title: 'サイト全面リニューアルのお知らせ',
        publishDate: '2026-02-06',
        category: 'お知らせ',
        eyecatch: {
            url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200',
            width: 1200,
            height: 630,
        },
        content: '<h2>より使いやすく、より美しく</h2><p>奥久慈街道サイクリングの公式サイトをリニューアルしました。</p><p>スマートフォンでも見やすいデザインに刷新し、コース情報の検索がより便利になりました。</p>',
    },
];

// ======================
// Courses モックデータ
// ======================
export const mockCourses: Course[] = [
    {
        id: 'course-001',
        ...baseDate,
        name: '久慈川源流周遊コース',
        summary: '久慈川の源流を辿る、原風景を満喫できる中級者向けコース。四季折々の渓谷美が楽しめます。',
        distance: 52.4,
        elevation: 680,
        duration: '半日',
        difficulty: '★3（中級）',
        seasons: ['春', '秋'],
        mainImage: {
            url: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920',
            width: 1920,
            height: 1080,
        },
        description: '久慈川の源流域を巡る本格的なサイクリングコース。序盤は平坦な河川沿いを走り、中盤から徐々に標高を上げていきます。途中、地元の名産品を販売する道の駅や、歴史ある温泉施設に立ち寄ることができます。秋は紅葉、春は山桜が美しいルートです。',
        caution: '一部狭い道あり。雨天後は路面が滑りやすいため注意。携帯電話の電波が届かない区間あり。',
    },
    {
        id: 'course-002',
        ...baseDate,
        name: '袋田の滝グルメライド',
        summary: '日本三名瀑・袋田の滝を目指すコース。地元グルメスポットを巡りながら走れます。',
        distance: 35.2,
        elevation: 420,
        duration: '3時間',
        difficulty: '★2（初心者）',
        seasons: ['春', '夏', '秋'],
        mainImage: {
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920',
            width: 1920,
            height: 1080,
        },
        description: '袋田の滝を目的地とした初心者でも楽しめるコース。途中、常陸秋そばの名店や、リンゴ農園、地元の直売所など、グルメスポットが点在しています。袋田の滝では四季折々の絶景を堪能できます。',
        caution: '観光シーズンは混雑あり。駐車場から滝までは徒歩10分。自転車は駐輪場に停めてください。',
    },
    {
        id: 'course-003',
        ...baseDate,
        name: '里山ファミリーコース',
        summary: '家族で楽しめる平坦なコース。田園風景の中をのんびり走れます。サイクルラックも充実。',
        distance: 18.5,
        elevation: 120,
        duration: '2時間',
        difficulty: '★1（家族向け）',
        seasons: ['春', '夏', '秋', '冬'],
        mainImage: {
            url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1920',
            width: 1920,
            height: 1080,
        },
        description: 'お子様連れのファミリーにおすすめの平坦コース。田んぼや畑が広がるのどかな里山風景の中を走ります。途中の休憩スポットにはサイクルラックやトイレが完備されており、安心してサイクリングを楽しめます。',
        caution: '農繁期（田植え・稲刈り時期）は農作業車両に注意。',
    },
];

// ======================
// Spots モックデータ
// ======================
export const mockSpots: Spot[] = [];

// ======================
// Access モックデータ
// ======================
export const mockAccess: Access[] = [
    {
        id: 'access-001',
        ...baseDate,
        category: 'train',
        title: '電車でお越しの方',
        items: [
            'JR水郡線「常陸大子駅」下車',
            '水戸駅から約1時間30分',
            '郡山駅から約1時間40分',
        ],
    },
    {
        id: 'access-002',
        ...baseDate,
        category: 'car',
        title: 'お車でお越しの方',
        items: [
            '常磐自動車道「那珂IC」から約50分',
            '東北自動車道「矢板IC」から約60分',
            '無料駐車場あり（大子駅前・袋田の滝）',
        ],
    },
];

// ======================
// データ取得関数（モック）
// ======================
export async function getNews(): Promise<MicroCMSListResponse<News>> {
    return {
        contents: mockNews,
        totalCount: mockNews.length,
        offset: 0,
        limit: 10,
    };
}

export async function getNewsById(id: string): Promise<News | null> {
    return mockNews.find((news) => news.id === id) || null;
}

export async function getCourses(): Promise<MicroCMSListResponse<Course>> {
    return {
        contents: mockCourses,
        totalCount: mockCourses.length,
        offset: 0,
        limit: 10,
    };
}

export async function getCourseById(id: string): Promise<Course | null> {
    return mockCourses.find((course) => course.id === id) || null;
}

export async function getSpots(): Promise<MicroCMSListResponse<Spot>> {
    return {
        contents: mockSpots,
        totalCount: mockSpots.length,
        offset: 0,
        limit: 20,
    };
}

export async function getSpotById(id: string): Promise<Spot | null> {
    return mockSpots.find((spot) => spot.id === id) || null;
}

export async function getAccess(): Promise<MicroCMSListResponse<Access>> {
    return {
        contents: mockAccess,
        totalCount: mockAccess.length,
        offset: 0,
        limit: 10,
    };
}
