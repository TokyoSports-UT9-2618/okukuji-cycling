// microCMS 共通型
export interface MicroCMSImage {
    url: string;
    height: number;
    width: number;
}

export interface MicroCMSDate {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
}

export interface MicroCMSListResponse<T> {
    contents: T[];
    totalCount: number;
    offset: number;
    limit: number;
}

// News（お知らせ）
export type NewsCategory = 'イベント' | '交通・規制' | 'お知らせ' | 'メディア掲載';

export interface News extends MicroCMSDate {
    id: string;
    title: string;
    publishDate: string;
    category: NewsCategory;
    thumbnail?: MicroCMSImage;
    eyecatch?: MicroCMSImage;
    images?: MicroCMSImage[]; // 記事上部タイル表示用（最大3枚）
    content: string; // HTML
    pinned?: boolean; // TOPページに固定表示するかどうか
    eventTag?: string[]; // イベントLPとの紐付け（例: ['suigun-cycling']）
}

// Courses（モデルコース）
export type Season = '春' | '夏' | '秋' | '冬';

export interface Course extends MicroCMSDate {
    id: string;
    title: string;      // microCMS フィールド名は title
    distance: number;   // km
    elevation: number;  // m（獲得標高）
    difficulty: string;
    // 以下はスキーマ拡張後に使用可能
    summary?: string;
    description?: string;
    duration?: string;
    seasons?: Season[];
    gpxUrl?: string;
    caution?: string;
}

// CourseName（コース情報ページ用）
export type CourseName = '塙町コース' | '矢祭町コース' | '棚倉町コース' | '鮫川村コース' | 'ツール・ド・はなわ' | '三角形の道' | '奥久慈街道';

// Spots（駅・グルメ・設備スポット）
export type SpotCategory =
    | 'サイクルラック'
    | '工具貸出'
    | '空気入れ'
    | 'トイレ'
    | '給水'
    | 'ランチ'
    | 'カフェ'
    | '温泉'
    | 'コンビニ'
    | '絶景'
    | '宿泊'
    | '寺社仏閣';

export interface Spot extends MicroCMSDate {
    id: string;
    title: string;
    categories: SpotCategory[];
    summary: string;
    description?: string;
    image?: MicroCMSImage;
    latitude?: number;
    longitude?: number;
    link?: string;
    tel?: string;
    address?: string;
    facilities?: string[];
    show_on_top?: boolean;
    course?: CourseName[];
}

// Access（アクセス）
export interface Access extends MicroCMSDate {
    id: string;
    category: 'train' | 'car';
    title: string;
    items?: string[] | string;
}

// Gallery（フォトギャラリー）
export interface Gallery extends MicroCMSDate {
    id: string;
    image: MicroCMSImage;
    locationName: string;
    mapUrl?: string;
    gridSize?: string[]; // ['large'] | ['medium'] | ['small']
    season?: string[];   // ['spring'] | ['summer'] | ['autumn'] | ['winter'] | ['all']
}
