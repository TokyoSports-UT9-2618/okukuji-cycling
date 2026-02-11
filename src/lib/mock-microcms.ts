import type { News, Course, Spot, Access, Gallery, MicroCMSListResponse } from '@/types';

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
// ======================
// Courses モックデータ
// ======================
export const mockCourses: Course[] = [];

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
// Gallery モックデータ
// ======================
export const mockGallery: Gallery[] = [];

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
