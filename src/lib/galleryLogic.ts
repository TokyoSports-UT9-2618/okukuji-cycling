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
 * グリッドサイズ・クラスの決定
 * Bento Grid用に、インデックスに応じてクラスを割り当てる等の補正も可能
 */
export const getGridSpanClass = (item: Gallery, index: number): string => {
    // CMSで明示的に指定されている場合
    if (item.gridSize && item.gridSize.length > 0) {
        const size = item.gridSize[0];
        if (size === 'large') return 'col-span-2 row-span-2';
        if (size === 'medium') return 'col-span-1 row-span-1 md:col-span-2 md:row-span-1'; // 横長?
        // small default
    }

    // 自動生成ロジック (リズムを作る)
    // 例: 3つおきに大きくする、など
    // スマホ(2列)とPC(4列)で崩れないようにする
    // 0: Big, 1: Small, 2: Small, 3: Big... 
    // index % 3 === 0 ? 'col-span-2 row-span-2' vs 'col-span-1 row-span-1'
    if (index % 5 === 0) return 'col-span-2 row-span-2'; // 0, 5, 10
    if (index % 5 === 3) return 'col-span-2 row-span-1'; // 横長

    return 'col-span-1 row-span-1';
};
