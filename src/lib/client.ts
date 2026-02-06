/**
 * microCMS クライアント（本番用）
 * 
 * 環境変数:
 * - MICROCMS_SERVICE_DOMAIN: microCMSのサービスドメイン
 * - MICROCMS_API_KEY: APIキー
 */

import type { News, Course, Spot, MicroCMSListResponse } from '@/types';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || '';
const apiKey = process.env.MICROCMS_API_KEY || '';

const baseUrl = `https://${serviceDomain}.microcms.io/api/v1`;

async function fetchFromCMS<T>(
    endpoint: string,
    queries?: Record<string, string>
): Promise<T> {
    const url = new URL(`${baseUrl}/${endpoint}`);

    if (queries) {
        Object.entries(queries).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    const res = await fetch(url.toString(), {
        headers: {
            'X-MICROCMS-API-KEY': apiKey,
        },
    });

    if (!res.ok) {
        throw new Error(`microCMS API error: ${res.status}`);
    }

    return res.json();
}

// ======================
// 画像URL最適化ユーティリティ
// ======================
export function optimizeImageUrl(
    url: string,
    options: {
        width?: number;
        height?: number;
        format?: 'webp' | 'jpg' | 'png';
        quality?: number;
    } = {}
): string {
    const { width, height, format = 'webp', quality = 80 } = options;
    const params = new URLSearchParams();

    params.append('fm', format);
    params.append('q', quality.toString());

    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());

    return `${url}?${params.toString()}`;
}

// ======================
// API関数（本番用）
// ======================
export async function getNewsFromCMS(
    queries?: Record<string, string>
): Promise<MicroCMSListResponse<News>> {
    return fetchFromCMS<MicroCMSListResponse<News>>('news', queries);
}

export async function getNewsByIdFromCMS(id: string): Promise<News> {
    return fetchFromCMS<News>(`news/${id}`);
}

export async function getCoursesFromCMS(
    queries?: Record<string, string>
): Promise<MicroCMSListResponse<Course>> {
    return fetchFromCMS<MicroCMSListResponse<Course>>('courses', queries);
}

export async function getCourseByIdFromCMS(id: string): Promise<Course> {
    return fetchFromCMS<Course>(`courses/${id}`);
}

export async function getSpotsFromCMS(
    queries?: Record<string, string>
): Promise<MicroCMSListResponse<Spot>> {
    return fetchFromCMS<MicroCMSListResponse<Spot>>('spots', queries);
}

export async function getSpotByIdFromCMS(id: string): Promise<Spot> {
    return fetchFromCMS<Spot>(`spots/${id}`);
}
