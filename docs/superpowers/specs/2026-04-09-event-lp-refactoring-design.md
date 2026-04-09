# EventLP リファクタリング設計

## 目的

- EventLP.tsx（804行）をセクション単位で分割し、保守性を上げる
- 今年中に5-6本追加されるイベントLPの量産体制を整える
- 将来のセクション追加（リザルト表など）を容易にする

## 方針: A案（セクション分割のみ）

現在のEventLP.tsxから各セクションを個別ファイルに切り出す。ロジックや表示の変更は行わない。純粋なファイル分割。

## ファイル構成

### Before

```
src/components/EventLP.tsx  (804行・全セクション混在)
```

### After

```
src/components/event-lp/
├── index.tsx              ← re-export（import変更を最小化）
├── EventLP.tsx            ← 組成のみ（セクションを並べるだけ）
├── EventHeader.tsx        ← ヘッダー（ナビ + CTAボタン）
├── HeroSection.tsx        ← ヒーローセクション
├── AboutSection.tsx       ← 概要セクション
├── GuestSection.tsx       ← ゲストライダー
├── GallerySection.tsx     ← ギャラリー（Bento Grid + スクロール + 動画）
├── HighlightsSection.tsx  ← 見どころ
├── AidStationSection.tsx  ← エイドステーション
├── CourseProfileSection.tsx ← コースプロフィル
├── ScheduleSection.tsx    ← 開催概要 + タイムテーブル
├── TransportSection.tsx   ← サイクルトレイン / アクセス
├── NewsSection.tsx        ← お知らせ
├── CtaSection.tsx         ← 最終CTA
├── EventFooter.tsx        ← フッター
└── shared.tsx             ← fadeUp定数、MaterialIcon、SocialIcon
```

## 設計ルール

### 各セクションコンポーネントのインターフェース

すべてのセクションは以下のパターンに従う：

```tsx
type Props = {
  event: EventData;   // または必要なサブセットの型
  primary: string;    // テーマカラー
  news?: News[];      // NewsSection のみ
};
```

### セクションの表示/非表示

現行のパターンを維持。EventLP.tsx内で条件分岐：

```tsx
{event.guest && <GuestSection guest={event.guest} primary={primary} />}
{event.aidStations && <AidStationSection stations={event.aidStations} primary={primary} />}
```

### import の互換性

`src/components/event-lp/index.tsx` で re-export することで、既存のimport文の変更を最小限にする：

```tsx
// index.tsx
export { default } from './EventLP';
```

呼び出し側の変更：
```tsx
// Before
import EventLP from '@/components/EventLP';
// After
import EventLP from '@/components/event-lp';
```

## スコープ外（今回やらないこと）

- セクション順序のデータ駆動化（B案）— イベント10本超えたら検討
- カラー/テーマの中央集約 — 別タスクで対応
- 型定義の統一（CourseData/Course二重定義）— 別タスクで対応
- /course と /courses の統一 — 別タスクで対応
- admin認証 — 別タスクで対応

## 新イベント追加時のワークフロー（リファクタリング後）

1. `src/data/events.ts` にイベントデータを追加
2. `public/images/events/<slug>/` に画像を配置
3. 完了。コンポーネントの変更は不要

新セクションが必要な場合：
1. `src/components/event-lp/` に新セクションファイルを作成
2. `EventLP.tsx` の組成に1行追加
3. `EventData` 型に必要なフィールドを追加
