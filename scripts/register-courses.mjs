/**
 * microCMS courses 一括登録スクリプト
 * 旧WIXサイト（https://www.okukujicycleroute.com/course）のデータをベースに登録
 *
 * 実行方法: node scripts/register-courses.mjs
 */

const SERVICE_DOMAIN = 'okukuji-cycling';
const API_KEY = '9rLZVNfwXED44LCGw1cgvalCJxwJQukKMNfY';
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/courses`;

// ====================================================================
// コースデータ（Wixサイトより）
// ====================================================================
const COURSES = [
  {
    title: '塙町コース',
    name: '塙町コース',
    summary: '奥久慈街道の中で最も初心者向けのコースです。久慈川サイクリングロード、穏やかな町並み、田園風景となだらかな道が続きます。磐城塙駅にはレンタサイクルもあります。',
    description: '奥久慈街道の中で最も初心者向けのコースです。久慈川サイクリングロード、穏やかな町並み、田園風景となだらかな道が続きます。東北最南端の道の駅、カフェなど休憩地点も点在するので、ゆっくりサイクリングを楽しむのに最適です。磐城塙駅にはレンタサイクルもあります。\n\n【季節のみどころ】\n塙町はいつでも花盛り！！久慈川河川敷が満開の桜でいっぱいになる春。風呂山公園が山つつじで真っ赤に染まるゴールディンウィーク。町の至る所でダリアが咲き誇る夏から秋。那倉川渓谷の紅葉が美しく色づく秋。',
    distance: 21.7,
    elevation: 98,
    difficulty: '★1（家族向け）',
    duration: '半日',
    seasons: ['春', '夏', '秋', '冬'],
  },
  {
    title: '矢祭町コース',
    name: '矢祭町コース',
    summary: '矢祭町の２大観光スポット「矢祭山公園」と「滝川渓谷」をめぐる絶景堪能コース。農産物直売所やこだわりの珈琲店など、矢祭町の食が楽しめるスポットも充実。',
    description: '矢祭町の２大観光スポット「矢祭山公園」と「滝川渓谷」をめぐる絶景堪能コース。ゆるやかな農村風景を堪能できるコースの途中には農産物直売所やこだわりの珈琲店など、矢祭町の食が楽しめるスポットも！心地よい充実感が味わえるサイクリングコースです。\n\n【季節のみどころ】\n里山、田んぼ、清流…思い浮かべる田舎の風景を体感できるコースです。四季折々の景色、匂い、暮らしを感じながらの散走と行く先々での美味しい食事は、おなかも心も満たしてくれます。',
    distance: 22.3,
    elevation: 222,
    difficulty: '★2（初心者）',
    duration: '半日',
    seasons: ['春', '夏', '秋', '冬'],
  },
  {
    title: '棚倉町コース',
    name: '棚倉町コース',
    summary: '四季折々の自然と歴史的建造物が残る「東北の小京都」棚倉。久慈川を眺めながら神社仏閣をめぐる周遊コース。',
    description: '四季折々の自然が魅力で、二つの一宮が現存するなど多くの歴史的建造物が残る棚倉町。久慈川の雄大な流れを眺めながら、のどかで豊かな自然風景を通るサイクリングコースを含め、神社仏閣をめぐる東北の小京都棚倉の周遊コースです。豊かな自然の新鮮な空気と、城下町の歴史を感じることができるコースです。\n\n【季節のみどころ】\n桜や紅葉の頃は棚倉城跡のお堀の水面に映る景色や、山本不動尊のもみじ参道がきれいだよ。二つの一宮、神社仏閣のパワースポット、おいしいお菓子やパン屋さんも沢山あるよ。東北の小京都棚倉で、幸福・満腹めぐりに出かけてみよう！',
    distance: 22.8,
    elevation: 227,
    difficulty: '★3（中級）',
    duration: '半日',
    seasons: ['春', '夏', '秋', '冬'],
  },
  {
    title: '鮫川村コース',
    name: '鮫川村コース',
    summary: '高低差270mの試練坂を越えた先に広がる大草原。標高700mの鹿角平観光牧場からの達成感と絶景が待っています。',
    description: '本コースは高低差が270mあり、中間点の「鹿角平観光牧場」までの上り坂は試練坂です。上り切った先に見える大草原は、開放的な景観とともに達成感を味わえ心癒されること間違いありません。おすすめは、新緑（5〜7月）の季節です。里山風景を楽しみながら、ゆっくりと散走してみませんか。\n\n【季節のみどころ】\nハードなコースを走り抜けながら、田園や里山の美しい風景を楽しもう！標高700mに位置する鹿角平観光牧場では、1年を通して周囲の光に邪魔されることなく満天の星空を眺めることができるよ。宿泊しながらのサイクリングもおすすめ。',
    distance: 24.2,
    elevation: 391,
    difficulty: '★4（上級）',
    duration: '半日',
    seasons: ['春', '夏', '秋'],
  },
  {
    title: 'ツール・ド・はなわ',
    name: 'ツール・ド・はなわ',
    summary: '「ツール・ド・ふくしま」塙町開催用に設定されたレースコース。きつめの上り坂と蛇行する下り坂など、バリエーション豊富なコース。時計回りで走行してください。',
    description: '福島県内の公道を舞台に開催されている自転車のロードレース「ツール・ド・ふくしま」を、塙町で開催するために設定された「ツール・ド・はなわ」コースです。きつめの上り坂、蛇行する下り坂などレースコースならではのバリエーションに富んだコースは、サイクリングコースとしてもお楽しみいただけます。ご利用いただく際は、時計回りで走行してください。',
    distance: 7.7,
    elevation: 128,
    difficulty: '★3（中級）',
    duration: '2時間',
    seasons: ['春', '夏', '秋', '冬'],
    caution: '走行の際は必ず時計回りで走行してください。',
  },
  {
    title: '三角形の道',
    name: '三角形の道',
    summary: '観光庁認定の本格的サイクリングコース。四季折々の景色、穏やかな町並み、懐かしい里山の風景が絡み合う、適度なヒルクライムが楽しめるコース。',
    description: '観光庁が開設したランナーズインフォメーション研究所の認定コース。四季折々の景色、穏やかな町並み、懐かしい里山の風景など、豊かな自然と人の営みが絡み合う、自転車で走る道としての魅力すべてが備わった、本格的なサイクリングコースです。適度な高低差があるため、軽めのヒルクライムとして、お楽しみいただけます。',
    distance: 25.7,
    elevation: 556,
    difficulty: '★4（上級）',
    duration: '半日',
    seasons: ['春', '夏', '秋', '冬'],
  },
];

// ====================================================================
// ユーティリティ
// ====================================================================
async function api(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

// ====================================================================
// メイン処理
// ====================================================================
async function main() {
  console.log('=== microCMS courses 一括登録スクリプト ===\n');

  // 既存コースを取得して重複チェック
  console.log('【Step 1】既存コースを確認中...');
  const { json: list } = await api('GET', '?limit=100');
  const existing = list.contents || [];
  console.log(`  既存: ${existing.length} 件`);
  existing.forEach(c => console.log(`    - ${c.title || c.name} (ID: ${c.id})`));
  console.log();

  const existingTitles = new Set(existing.map(c => c.title || c.name));

  // スキーマ対応フィールドを1件テストPOSTで確認
  console.log('【Step 2】スキーマ対応フィールドをテスト確認中...');
  const testBody = {
    title: '__SCHEMA_TEST__',
    name: '__SCHEMA_TEST__',
    summary: 'test',
    description: 'test',
    distance: 1.0,
    elevation: 1,
    difficulty: '★1（家族向け）',
    duration: '2時間',
    seasons: ['春'],
  };
  const testRes = await api('POST', '', testBody);
  const supportedFields = new Set(['title', 'distance', 'elevation', 'difficulty']); // 確認済み最小セット

  if (testRes.ok) {
    // テストデータ削除
    await api('DELETE', `/${testRes.json.id}`);
    // 全フィールドが受け入れられた
    ['name','summary','description','duration','seasons','caution'].forEach(f => supportedFields.add(f));
    console.log(`  ✅ 全フィールド対応: ${[...supportedFields].join(', ')}\n`);
  } else {
    // 不明フィールドがある場合、エラーメッセージで特定
    const msg = testRes.json.message || '';
    console.log(`  ⚠️  テストエラー: ${msg}`);
    const unexpectedMatch = msg.match(/'([^']+)' is unexpected key/);
    if (unexpectedMatch) {
      console.log(`  → スキーマに存在しないフィールド: ${unexpectedMatch[1]}`);
    }
    // フォールバック: 確認済みフィールドのみで登録
    console.log('  → 確認済みフィールドのみで登録します: title, distance, elevation, difficulty\n');
  }

  // コース登録
  console.log('【Step 3】コースを登録中...');
  let registered = 0, skipped = 0, errors = 0;

  for (const course of COURSES) {
    if (existingTitles.has(course.title) || existingTitles.has(course.name)) {
      console.log(`  ⏭️  スキップ（既存）: ${course.title}`);
      skipped++;
      continue;
    }

    // サポートフィールドのみ抽出
    const body = {};
    for (const field of supportedFields) {
      if (course[field] !== undefined) body[field] = course[field];
    }

    const res = await api('POST', '', body);
    if (res.ok) {
      console.log(`  ✅ 登録成功: ${course.title} (ID: ${res.json.id})`);
      registered++;
    } else {
      // "unexpected key" エラーが出た場合、そのフィールドを除外して再試行
      const msg = res.json.message || '';
      const unexpectedMatch = msg.match(/'([^']+)' is unexpected key/);
      if (unexpectedMatch) {
        const badField = unexpectedMatch[1];
        console.log(`  ⚠️  フィールド "${badField}" は非対応 → 除外して再試行: ${course.title}`);
        supportedFields.delete(badField);
        delete body[badField];
        const retry = await api('POST', '', body);
        if (retry.ok) {
          console.log(`  ✅ 再試行成功: ${course.title} (ID: ${retry.json.id})`);
          registered++;
        } else {
          console.log(`  ❌ 再試行失敗: ${course.title} → ${JSON.stringify(retry.json)}`);
          errors++;
        }
      } else {
        console.log(`  ❌ 登録失敗: ${course.title} → ${JSON.stringify(res.json)}`);
        errors++;
      }
    }
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n=== 完了 ===');
  console.log(`登録成功: ${registered} 件 / スキップ: ${skipped} 件 / エラー: ${errors} 件`);
  console.log('\n対応フィールド（最終）:', [...supportedFields].join(', '));
}

main().catch(err => {
  console.error('予期せぬエラー:', err);
  process.exit(1);
});
