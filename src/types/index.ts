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
    content: string; // HTML
}

// Courses（モデルコース）
export type Difficulty = '★1（家族向け）' | '★2（初心者）' | '★3（中級）' | '★4（上級）' | '★5（健脚）';
export type Season = '春' | '夏' | '秋' | '冬';
export type Duration = '2時間' | '3時間' | '半日' | '1日';

export interface Course extends MicroCMSDate {
    id: string;
    name: string;
    summary: string;
    distance: number; // km
    elevation: number; // m（獲得標高）
    duration: Duration;
    difficulty: Difficulty;
    seasons?: Season[];
    mainImage: MicroCMSImage;
    gpxUrl?: string;
    description: string;
    caution?: string;
}

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
    | 'コンビニ';

export interface Spot extends MicroCMSDate {
    id: string;
    name: string;
    categories: SpotCategory[];
    summary: string;
    description?: string;
    image?: MicroCMSImage;
    latitude?: number;
    longitude?: number;
}
