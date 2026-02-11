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

const LAYOUT_PATTERN = [
    // --- ブロックA: 高さ2行分 (左に大、右に縦と小) ---
    // [ 大 ][ 大 ][ 縦 ][ 小 ]
    // [ 大 ][ 大 ][ 縦 ][ 小 ]
    // 0. 大 (Large 2x2)
    { col: 'col-span-2 md:col-span-2', row: 'row-span-2' },
    // 1. 縦 (Vertical 1x2)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-2' },
    // 2. 小 (Small 1x1)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-1' },
    // 3. 小 (Small 1x1)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-1' },

    // --- ブロックB: 高さ2行分 (横長の積み重ね) ---
    // [ 横長 ][ 横長 ][ 小 ][ 小 ]
    // [ 小 ][ 小 ][ 横長 ][ 横長 ]
    // 4. 横 (Horizontal 2x1)
    { col: 'col-span-2 md:col-span-2', row: 'row-span-1' },
    // 5. 小 (Small 1x1)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-1' },
    // 6. 小 (Small 1x1)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-1' },
    // 7. 小 (Small 1x1)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-1' },
    // 8. 小 (Small 1x1)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-1' },
    // 9. 横 (Horizontal 2x1)
    { col: 'col-span-2 md:col-span-2', row: 'row-span-1' },

    // --- ブロックC: 高さ2行分 (左に縦、右に大) ---
    // [ 縦 ][ 小 ][ 大 ][ 大 ]
    // [ 縦 ][ 小 ][ 大 ][ 大 ]
    // 10. 縦 (Vertical 1x2)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-2' },
    // 11. 小 (Small 1x1)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-1' },
    // 12. 小 (Small 1x1)
    { col: 'col-span-1 md:col-span-1', row: 'row-span-1' },
    // 13. 大 (Large 2x2)
    { col: 'col-span-2 md:col-span-2', row: 'row-span-2' },
];

/**
 * グリッドサイズ・クラスの決定 (14-Step Pattern)
 */
export const getGridSpanClass = (item: Gallery, index: number): string => {
    const pattern = LAYOUT_PATTERN[index % LAYOUT_PATTERN.length];
    return `${pattern.col} ${pattern.row}`;
};

/**
 * ギャラリーのレイアウトを最適化
 */
export const getOptimizedGalleryLayout = (images: Gallery[]): { image: Gallery; spanClass: string }[] => {
    if (!images || images.length === 0) return [];

    const total = images.length;
    return images.map((image, index) => {
        let spanClass = getGridSpanClass(image, index);

        // Safety: Force the last item to be full width to catch any layout gaps and ensure visibility
        if (index === total - 1) {
            spanClass = 'col-span-2 md:col-span-full row-span-1';
        }

        return {
            image,
            spanClass,
        };
    });
};
