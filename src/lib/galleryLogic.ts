import { Gallery } from "@/types";

/**
 * 現在の月（日本時間）を取得
 */
export const getCurrentMonth = (): number => {
    const now = new Date();
    return now.getMonth() + 1; // 1-12
};

/**
 * 月に基づいて季節タグを決定
 * 12-4月: spring
 * 5-8月: summer
 * 9-11月: autumn
 */
export const getTargetSeasons = (month: number): string[] => {
    if (month >= 5 && month <= 8) return ['summer'];
    if (month >= 9 && month <= 11) return ['autumn'];
    return ['spring']; // 12, 1, 2, 3, 4
};

/**
 * 配列をシャッフル (Fisher-Yates)
 */
export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/**
 * ギャラリー表示用データの生成
 */
export const processGalleryData = (allImages: Gallery[], limit: number = 10): Gallery[] => {
    if (!allImages || allImages.length === 0) return [];

    const currentMonth = getCurrentMonth();
    const targetSeasons = getTargetSeasons(currentMonth);

    // 1. 優先画像 (今月の季節 OR all)
    const priorityImages = allImages.filter(img =>
        img.season?.some(s => targetSeasons.includes(s) || s === 'all')
    );

    // 2. その他の画像
    const otherImages = allImages.filter(img =>
        !img.season?.some(s => targetSeasons.includes(s) || s === 'all')
    );

    // 3. シャッフル
    const shuffledPriority = shuffleArray(priorityImages);
    const shuffledOthers = shuffleArray(otherImages);

    // 4. 結合と制限
    // 優先画像を先に、足りなければその他から
    let result = [...shuffledPriority];
    if (result.length < limit) {
        result = result.concat(shuffledOthers.slice(0, limit - result.length));
    } else {
        result = result.slice(0, limit);
    }

    // 最終的にもう一度シャッフルして、優先画像ばかりが上に固まらないようにする（お好みで）
    // ユーザー要望「常に新鮮な印象」→全体シャッフルが良い
    return shuffleArray(result);
};

/**
 * グリッドサイズ・クラスの決定 (Perfect Block Logic)
 * 4個1セットの鉄壁パターン + 余り処理
 */
export const getGridSpanClass = (item: Gallery, index: number, total: number): string => {
    // 余りの計算
    const remainder = total % 4;
    const isRemainder = index >= total - remainder;

    // 余り処理 (Remainder Logic)
    if (isRemainder) {
        const remainderIndex = index - (total - remainder); // 0, 1, 2...

        // 余りが1枚の場合: 全幅で大きく表示
        if (remainder === 1) {
            return 'col-span-2 md:col-span-4 row-span-2';
        }

        // 余りが2枚の場合: 2枚並べる (2列ずつ = 半幅)
        if (remainder === 2) {
            return 'col-span-1 md:col-span-2 row-span-1';
        }

        // 余りが3枚の場合: 最初の1枚をBig、残り2枚を縦に長くして隙間を埋める
        if (remainder === 3) {
            if (remainderIndex === 0) return 'col-span-2 md:col-span-2 row-span-2'; // Big
            return 'col-span-1 md:col-span-1 row-span-2'; // Tall
        }
    }

    // 4個1セットの鉄壁パターン (Perfect Block)
    // [0 0 1 2]
    // [0 0 3 3]
    const mod = index % 4;
    if (mod === 0) return 'col-span-2 md:col-span-2 row-span-2'; // Big
    if (mod === 3) return 'col-span-2 md:col-span-2 row-span-1'; // Wide
    return 'col-span-1 md:col-span-1 row-span-1'; // Small (1 & 2)
};

/**
 * ギャラリーのレイアウトを最適化
 */
export const getOptimizedGalleryLayout = (images: Gallery[]): { image: Gallery; spanClass: string }[] => {
    if (!images || images.length === 0) return [];

    const total = images.length;
    return images.map((image, index) => ({
        image,
        spanClass: getGridSpanClass(image, index, total),
    }));
};
