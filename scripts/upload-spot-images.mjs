/**
 * WIX画像をmicroCMSスポットにアップロードするスクリプト
 *
 * 実行方法:
 *   node scripts/upload-spot-images.mjs
 *
 * 必要条件:
 *   - Node.js v18以上（fetch組み込み済み）
 *   - プロジェクトルートで実行すること
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const API_KEY = '9rLZVNfwXED44LCGw1cgvalCJxwJQukKMNfY';
const SERVICE_DOMAIN = 'okukuji-cycling';
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;
const MGMT_URL = `https://${SERVICE_DOMAIN}.microcms-management.io/api/v1`; // メディアアップロード用
const TMP_DIR = './tmp_spot_images';

// Cloudflare Pagesにデプロイ済みの画像URL（WIX解約後も永続）
const BASE_IMAGE_URL = 'https://okukuji-cycling2.pages.dev/spots';

const wixImageMapping = {
  // 塙町コース
  "塙町コミュニティプラザ":          `${BASE_IMAGE_URL}/spot-1.jpg`,
  "笹原パン店":                       `${BASE_IMAGE_URL}/spot-2.jpg`,
  "Shiro Cafe":                       `${BASE_IMAGE_URL}/spot-3.jpg`,
  "Café's Bond141":                   `${BASE_IMAGE_URL}/spot-4.jpg`,
  "久慈川サイクリングロード":         `${BASE_IMAGE_URL}/spot-5.jpg`,
  "道の駅 はなわ天領の郷":           `${BASE_IMAGE_URL}/spot-6.jpg`,
  "向ヶ丘公園":                       `${BASE_IMAGE_URL}/spot-7.jpg`,
  "風呂山公園":                       `${BASE_IMAGE_URL}/spot-8.jpg`,
  // 矢祭町コース
  "ユーパル矢祭":                     `${BASE_IMAGE_URL}/spot-1-1.jpg`,
  "和ダイニング つどい":              `${BASE_IMAGE_URL}/spot-2-1.jpg`,
  "珈琲香坊":                         `${BASE_IMAGE_URL}/spot-3-1.jpg`,
  "滝川渓谷遊歩道":                   `${BASE_IMAGE_URL}/spot-4-1.jpg`,
  "農泊 保木山":                      `${BASE_IMAGE_URL}/spot-5-1.jpg`,
  "矢祭山公園":                       `${BASE_IMAGE_URL}/spot-6-1.jpg`,
  "桧山登山道":                       `${BASE_IMAGE_URL}/spot-7-1.jpg`,
  "夢想滝":                           `${BASE_IMAGE_URL}/spot-8-1.jpg`,
  "みりょく満点物語矢祭店 太郎の四季":`${BASE_IMAGE_URL}/spot-9.jpg`,
  // 棚倉町コース
  "ルネサンス棚倉":                   `${BASE_IMAGE_URL}/spot-1-2.jpg`,
  "馬場都々古別神社":                 `${BASE_IMAGE_URL}/spot-2-2.jpg`,
  "蓮家寺":                           `${BASE_IMAGE_URL}/spot-3-2.jpg`,
  "棚倉城跡（国指定史跡）":          `${BASE_IMAGE_URL}/spot-4-2.jpg`,
  "山本不動尊":                       `${BASE_IMAGE_URL}/spot-5-2.jpg`,
  "みりょく満点物語":                 `${BASE_IMAGE_URL}/spot-6-2.jpg`,
  "八槻都々古別神社":                 `${BASE_IMAGE_URL}/spot-7-2.jpg`,
  // 鮫川村コース
  "手・まめ・館":                     `${BASE_IMAGE_URL}/spot-1-3.jpg`,
  "清水端のしだれ桜":                 `${BASE_IMAGE_URL}/spot-2-3.jpg`,
  "鹿角平観光牧場":                   `${BASE_IMAGE_URL}/spot-3-3.jpg`,
  "Little Café":                      `${BASE_IMAGE_URL}/spot-4-3.jpg`,
  "Rêve":                             `${BASE_IMAGE_URL}/spot-5-3.jpg`,
  "あぶくま高原美術館":               `${BASE_IMAGE_URL}/spot-6-3.jpg`,
  // 三角形の道
  "湯遊ランドはなわ":                 `${BASE_IMAGE_URL}/spot-1-4.jpg`,
  "不動滝":                           `${BASE_IMAGE_URL}/spot-3-4.jpg`,
  "湯岐渓谷":                         `${BASE_IMAGE_URL}/spot-4-4.jpg`,
};

async function main() {
  // Step 1: microCMSから全スポット取得
  console.log('📋 microCMSからスポット一覧を取得中...');
  const spotsRes = await fetch(`${BASE_URL}/spots?limit=100`, {
    headers: { 'X-MICROCMS-API-KEY': API_KEY }
  });
  if (!spotsRes.ok) throw new Error(`スポット取得失敗: ${spotsRes.status}`);
  const spotsData = await spotsRes.json();
  const spots = spotsData.contents;
  console.log(`✅ ${spots.length}件取得\n`);

  // スポット名 → {id, hasImage}
  const spotMap = {};
  for (const spot of spots) {
    spotMap[spot.title] = { id: spot.id, hasImage: !!spot.image };
  }

  await mkdir(TMP_DIR, { recursive: true });

  const results = { success: [], skipped: [], error: [] };

  for (const [spotName, wixUrl] of Object.entries(wixImageMapping)) {
    const spotInfo = spotMap[spotName];

    if (!spotInfo) {
      console.log(`⚠️  スキップ（未登録）: ${spotName}`);
      results.skipped.push({ name: spotName, reason: 'microCMSに見つからない' });
      continue;
    }

    if (spotInfo.hasImage) {
      console.log(`⏭️  スキップ（登録済み）: ${spotName}`);
      results.skipped.push({ name: spotName, reason: '画像登録済み' });
      continue;
    }

    try {
      // Cloudflare Pages上の自前URLをそのまま使用
      const imageUrl = wixUrl;

      console.log(`📝 更新中: ${spotName}`);
      const patchRes = await fetch(`${BASE_URL}/spots/${spotInfo.id}`, {
        method: 'PATCH',
        headers: {
          'X-MICROCMS-API-KEY': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: { url: imageUrl } })
      });
      if (!patchRes.ok) {
        const err = await patchRes.text();
        throw new Error(`更新失敗: ${patchRes.status} ${err}`);
      }

      console.log(`🎉 完了: ${spotName}\n`);
      results.success.push({ name: spotName });

    } catch (err) {
      console.error(`❌ エラー: ${spotName} → ${err.message}\n`);
      results.error.push({ name: spotName, error: err.message });
    }

    // API制限対策
    await new Promise(r => setTimeout(r, 600));
  }

  // 完了レポート
  console.log('\n========== 完了レポート ==========');
  console.log(`✅ 成功: ${results.success.length}件`);
  results.success.forEach(r => console.log(`   - ${r.name}`));
  console.log(`⏭️  スキップ: ${results.skipped.length}件`);
  console.log(`❌ エラー: ${results.error.length}件`);
  results.error.forEach(r => console.log(`   - ${r.name}: ${r.error}`));
}

main().catch(console.error);
