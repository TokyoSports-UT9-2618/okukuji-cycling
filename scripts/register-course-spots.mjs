/**
 * microCMS コーススポット一括登録スクリプト
 *
 * 実行前に必要な手動作業（microCMS管理コンソール）:
 *
 * 【手動作業1】spotsコンテンツ型に `course` フィールドを追加
 *   1. https://app.microcms.io/ にログイン
 *   2. 左メニュー「spots」→ 右上「APIの設定」→「APIスキーマ」タブ
 *   3. 「フィールドを追加」ボタンをクリック
 *   4. 以下の設定でフィールドを追加:
 *      - フィールドID: course
 *      - 表示名: コース
 *      - 種類: 複数選択（チェックボックス）
 *      - 選択肢（改行区切りで入力）:
 *        塙町コース
 *        矢祭町コース
 *        棚倉町コース
 *        鮫川村コース
 *        ツール・ド・はなわ
 *        三角形の道
 *        奥久慈街道
 *   5. 「保存」をクリック
 *
 * 【手動作業2】APIキーに書き込み権限を付与
 *   1. https://app.microcms.io/ にログイン
 *   2. 左メニュー「APIキー」→ 既存キー「9rLZVNfwXED44LCGw1cgvalCJxwJQukKMNfY」を選択
 *   3. 「spots」APIに対して「GET・POST・PUT・PATCH・DELETE」権限を有効化
 *   4. 「保存」をクリック
 *   ※ または「APIキーを追加」で書き込み専用キーを新規作成し、
 *     下の WRITE_API_KEY を書き換えてください
 *
 * 実行方法:
 *   node scripts/register-course-spots.mjs
 *
 * 既存スポット（course フィールドを追加更新）:
 *   - 道の駅 はなわ天領の郷 → 塙町コース
 *   - ユーパル矢祭           → 矢祭町コース
 *   - ルネサンス棚倉         → 棚倉町コース
 *   - 村民保養施設さぎり荘   → 鮫川村コース
 *   - 湯遊ランドはなわ       → 三角形の道
 *
 * 新規登録スポット: 約29件
 */

const SERVICE_DOMAIN = 'okukuji-cycling';
const WRITE_API_KEY = '9rLZVNfwXED44LCGw1cgvalCJxwJQukKMNfY'; // 書き込み権限付与後に有効になります
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/spots`;

// ====================================================================
// 既存スポットのcourseフィールド更新データ
// （microCMS管理コンソールで確認したID）
// ====================================================================
const EXISTING_SPOT_UPDATES = [
  { id: 'nmenwprrzxec', course: ['塙町コース'] },        // 道の駅 はなわ天領の郷
  { id: 'fxfhakggx8l',  course: ['矢祭町コース'] },      // ユーパル矢祭
  { id: '3sg6h188d',    course: ['棚倉町コース'] },       // ルネサンス棚倉
  { id: 'khv2-2jk8',    course: ['鮫川村コース'] },       // 村民保養施設さぎり荘
  { id: '9_qh79r58o',   course: ['三角形の道'] },         // 湯遊ランドはなわ
];

// ====================================================================
// 新規登録スポットデータ（Wixサイトより）
// ====================================================================
const NEW_SPOTS = [
  // ── 塙町コース ─────────────────────────────────────────────────────
  {
    title: '塙町コミュニティプラザ',
    description: 'JR水郡線の磐城塙駅に町立図書館を併設した施設。喫茶店や物産品販売コーナーなどもあります。',
    category: ['観光スポット'],
    address: '福島県東白川郡塙町大字塙字宮田町1-4',
    tel: '0247-43-4120',
    facilities: ['cycle_rack', 'toilet'],
    course: ['塙町コース'],
    show_on_top: false,
  },
  {
    title: '笹原パン店',
    description: '昔ながらの素朴なパンを提供。地元の給食でも人気の揚げパンは、砂糖・ここア・きなこ味などがあります。',
    category: ['グルメ'],
    address: '福島県東白川郡塙町大字川上字堀ノ内14-6',
    tel: '0247-43-0918',
    facilities: ['cafe'],
    course: ['塙町コース'],
    show_on_top: false,
  },
  {
    title: 'Shiro Cafe',
    description: '旬の素材を使ったランチのほか、ひきたてコーヒー、こだわりスイーツ、自家製パンなどを提供。',
    category: ['グルメ'],
    address: '福島県東白川郡塙町大字川上字堀ノ内168',
    tel: '0247-57-8311',
    facilities: ['lunch', 'cafe'],
    course: ['塙町コース'],
    show_on_top: false,
  },
  {
    title: "Café's Bond141",
    description: 'サンドイッチや日替わりランチをはじめ、コーヒーなどのドリンクも充実している人気カフェ。テイクアウトも可能。',
    category: ['グルメ'],
    address: '福島県東白川郡棚倉町大字寺山字大豆柄34-1',
    tel: '0247-33-8141',
    facilities: ['lunch', 'cafe'],
    course: ['塙町コース'],
    show_on_top: false,
  },
  {
    title: '久慈川サイクリングロード',
    description: '鮎釣りで人気の久慈川沿いに整備された、県道矢祭・塙・棚倉自転車道。春は南北5kmにわたり桜が咲き誇ります。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡塙町塙字大町',
    tel: '0247-43-3400',
    facilities: ['cycle_rack'],
    course: ['塙町コース'],
    show_on_top: false,
  },
  {
    title: '向ヶ丘公園',
    description: '塙代官・寺西重次郎源封元により農村復興・農民救済の一環でつくられました。園内の枝垂れ桜は県指定天然記念物。',
    category: ['観光スポット'],
    address: '福島県東白川郡塙町大字塙字桜木町204-1',
    tel: '0247-43-3400',
    facilities: [],
    course: ['塙町コース'],
    show_on_top: false,
  },
  {
    title: '風呂山公園',
    description: '塙自宅のお風呂からでも見られるようにと名付けられた公園。春は約3,300株の山つつじが真っ赤な絨毯を作ります。',
    category: ['観光スポット'],
    address: '福島県東白川郡塙町大字塙字桜木町271-1',
    tel: '0247-43-3400',
    facilities: [],
    course: ['塙町コース'],
    show_on_top: false,
  },

  // ── 矢祭町コース ───────────────────────────────────────────────────
  {
    title: '和ダイニング つどい',
    description: 'ランチは魚料理や揚げ物の定食を中心に味わうことができます。手頃な価格の日替わり定食が人気。',
    category: ['グルメ'],
    address: '福島県東白川郡矢祭町大字小田川字春田38-1',
    tel: '0247-46-2203',
    facilities: ['lunch'],
    course: ['矢祭町コース'],
    show_on_top: false,
  },
  {
    title: '珈琲香坊',
    description: '世界各国の優良農園から厳選した高品質なコーヒー豆を自家焙煎。ログハウス風の店内でゆったりと楽しめます。',
    category: ['グルメ'],
    address: '福島県東白川郡矢祭町大字小田川字中山17-1',
    tel: '0247-34-1131',
    facilities: ['cafe'],
    course: ['矢祭町コース'],
    show_on_top: false,
  },
  {
    title: '滝川渓谷遊歩道',
    description: '全長3kmの散策路内に48の滝が連続する渓谷。巨大な奇岩や天然の老木など、ありのままの自然が広がります。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡矢祭町大字大垬字滝平',
    tel: '0247-46-4575',
    facilities: ['toilet'],
    course: ['矢祭町コース'],
    show_on_top: false,
  },
  {
    title: '農泊 保木山',
    description: '農業体験等をしながら地元の生活に触れることができる農家民宿。地元食材をふんだんに使った味が楽しめます。',
    category: ['観光スポット'],
    address: '福島県東白川郡矢祭町大字高野字高野69',
    tel: '0247-46-4575',
    facilities: [],
    course: ['矢祭町コース'],
    show_on_top: false,
  },
  {
    title: '矢祭山公園',
    description: '春は100本を超えるソメイヨシノと約5万本のつつじ、秋は燃えるような紅葉と、四季折々の美に満ちています。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡矢祭町大字内川字矢祭',
    tel: '0247-46-4575',
    facilities: ['toilet', 'cycle_rack'],
    course: ['矢祭町コース'],
    show_on_top: false,
  },
  {
    title: '桧山登山道',
    description: '複数の登山ルートがあり、季節ごとに異なる景色が広がります。標高510mの山頂では360度の展望を楽しめます。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡矢祭町大字山下字下河原',
    tel: '0247-46-4575',
    facilities: [],
    course: ['矢祭町コース'],
    show_on_top: false,
  },
  {
    title: '夢想滝',
    description: '「ふくしまの水三十選」のひとつ。あゆのつり橋から約200mの所にあります。清涼な流れが疲れを癒やしてくれます。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡矢祭町大字山下字太鼓堂',
    tel: '0247-46-4575',
    facilities: [],
    course: ['矢祭町コース'],
    show_on_top: false,
  },
  {
    title: 'みりょく満点物語 矢祭店 太郎の四季',
    description: '地元の農産物や加工品を販売。新鮮さと安全安心を求めて、地元客はもちろん、県外の常連客や観光客で賑わいます。',
    category: ['グルメ', '観光スポット'],
    address: '福島県東白川郡矢祭町大字関岡字下小坂56',
    tel: '0247-46-2405',
    facilities: ['toilet'],
    course: ['矢祭町コース'],
    show_on_top: false,
  },

  // ── 棚倉町コース ───────────────────────────────────────────────────
  {
    title: '馬場都々古別神社',
    description: '陸奥一宮であり、祭神は味耜高彦根命と日本武尊を祀っています。本殿は国指定重要文化財です。',
    category: ['観光スポット', '歴史'],
    address: '福島県東白川郡棚倉町大字棚倉字馬場39',
    tel: '0247-33-7219',
    facilities: [],
    course: ['棚倉町コース'],
    show_on_top: false,
  },
  {
    title: '蓮家寺',
    description: '慶長8年建立。町指定文化財の山門をはじめとする貴重な文化財が残されています。',
    category: ['観光スポット', '歴史'],
    address: '福島県東白川郡棚倉町大字新町129',
    tel: '0247-33-2344',
    facilities: [],
    course: ['棚倉町コース'],
    show_on_top: false,
  },
  {
    title: '棚倉城跡（国指定史跡）',
    description: '春は桜、秋はもみじがお堀に映り込み、美しい景色を堪能できます。城跡内は、ゆっくりとくつろげる憩いの場です。',
    category: ['観光スポット', '歴史', '絶景'],
    address: '福島県東白川郡棚倉町大字棚倉字城跡',
    tel: '0247-33-7886',
    facilities: ['toilet'],
    course: ['棚倉町コース'],
    show_on_top: false,
  },
  {
    title: '山本不動尊',
    description: '130段の石段を上り詰めると、巨岩の洞窟のもとに弘法大師尊像が安置されています。四季折々の景色が魅力です。',
    category: ['観光スポット', '歴史'],
    address: '福島県東白川郡棚倉町大字北山本字小檜沢94-2',
    tel: '0247-33-2445',
    facilities: [],
    course: ['棚倉町コース'],
    show_on_top: false,
  },
  {
    title: 'みりょく満点物語',
    description: '地元産の野菜や果物、加工品を豊富に扱う直売所。濃厚ソフトクリームや食材にこだわったレストランもあります。',
    category: ['グルメ', '観光スポット'],
    address: '福島県東白川郡棚倉町下山本字愛宕平15-1',
    tel: '0247-33-1212',
    facilities: ['lunch', 'toilet'],
    course: ['棚倉町コース'],
    show_on_top: false,
  },
  {
    title: '八槻都々古別神社',
    description: '奥州一宮であり、祭神は味耜高彦根命と日本武尊を祀っています。国指定重要無形民俗文化財の御田植祭が有名です。',
    category: ['観光スポット', '歴史'],
    address: '福島県東白川郡棚倉町大字八槻字大宮224',
    tel: '0247-33-3505',
    facilities: [],
    course: ['棚倉町コース'],
    show_on_top: false,
  },

  // ── 鮫川村コース ───────────────────────────────────────────────────
  {
    title: '手・まめ・館',
    description: '大豆の栽培による「まめで達者な村づくり」の拠点施設。直売所、食堂、カフェなどが併設されています。',
    category: ['グルメ', '観光スポット'],
    address: '福島県東白川郡鮫川村大字赤坂中野字巡ヶ作116',
    tel: '0247-49-2556',
    facilities: ['lunch', 'cafe', 'toilet'],
    course: ['鮫川村コース'],
    show_on_top: false,
  },
  {
    title: '清水端のしだれ桜',
    description: '樹齢150年のしだれ桜で、近くには東屋があります。傍らの清水端という11℃の冷たい湧水は飲用できます。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡鮫川村大字渡瀬字田尻44-1',
    tel: '0247-49-3113',
    facilities: [],
    course: ['鮫川村コース'],
    show_on_top: false,
  },
  {
    title: '鹿角平観光牧場',
    description: '大草原が広がる牧場内には、バーベキューハウスやロッジ、天文台などが整備。売店及び食堂も併設。標高700mで満天の星空も楽しめます。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡鮫川村大字青生野字世々麦343',
    tel: '0247-57-8311',
    facilities: ['lunch', 'toilet'],
    course: ['鮫川村コース'],
    show_on_top: false,
  },
  {
    title: 'Little Café',
    description: '手作りにこだわったカフェ。自然と絵本に囲まれながら、カレーライス、オムライス、ラーメンなどを味わえます。',
    category: ['グルメ'],
    address: '福島県東白川郡鮫川村大字赤坂東字戸草447',
    tel: '0247-49-2250',
    facilities: ['lunch', 'cafe'],
    course: ['鮫川村コース'],
    show_on_top: false,
  },
  {
    title: 'Rêve',
    description: '地元の食材を使用したケーキや焼き菓子を提供するオシャレなスイーツ屋。ドリンクも提供しています。',
    category: ['グルメ'],
    address: '福島県東白川郡鮫川村赤坂中野道少田18-2',
    tel: '0247-57-6550',
    facilities: ['cafe'],
    course: ['鮫川村コース'],
    show_on_top: false,
  },

  // ── 三角形の道 ─────────────────────────────────────────────────────
  {
    title: 'あぶくま高原美術館',
    description: '廃校になった塙町立那倉小学校を改築し、平成16年4月に開館。塙町出身の画伯・杉三郎氏と書家・鈴木清水氏の作品を展示。',
    category: ['観光スポット', '歴史'],
    address: '福島県東白川郡塙町大字那倉字吉元86-2',
    tel: '0247-42-2510',
    facilities: [],
    course: ['三角形の道'],
    show_on_top: false,
  },
  {
    title: '不動滝',
    description: '圧倒的な存在感を放つ不動滝は、道沿いから眺めることができます。湯岐渓谷の見どころのひとつです。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡塙町',
    facilities: [],
    course: ['三角形の道'],
    show_on_top: false,
  },
  {
    title: '湯岐渓谷',
    description: '県道高萩・塙線沿いを流れる湯川の渓谷です。途中に不動滝、雷滝があり、マイナスイオンを浴びながら散策できます。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡塙町',
    facilities: [],
    course: ['三角形の道'],
    show_on_top: false,
  },
  {
    title: '雷滝',
    description: '道路脇に遊歩道があり、近くで見ることができます。湯岐渓谷を流れる湯川の滝。',
    category: ['観光スポット', '絶景'],
    address: '福島県東白川郡塙町',
    facilities: [],
    course: ['三角形の道'],
    show_on_top: false,
  },
];

// ====================================================================
// ユーティリティ
// ====================================================================
async function apiRequest(url, method, body) {
  const res = await fetch(url, {
    method,
    headers: {
      'X-MICROCMS-API-KEY': WRITE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

function stripCourse(spot) {
  const { course: _course, ...rest } = spot;
  return rest;
}

// ====================================================================
// メイン処理
// ====================================================================
async function main() {
  const mode = process.argv[2] || 'register'; // 'register' or 'patch-course'
  console.log(`=== microCMS コーススポット一括登録スクリプト (mode: ${mode}) ===\n`);

  if (mode === 'patch-course') {
    // ────────────────────────────────────────────────────────────────
    // patch-course モード: courseフィールド追加後に実行
    // 新規スポットのIDマップをAPI取得→courseをPATCH
    // ────────────────────────────────────────────────────────────────
    console.log('【courseフィールド一括PATCH】');
    console.log('全スポット取得中...');
    const listRes = await fetch(`${BASE_URL}?limit=100`, {
      headers: { 'X-MICROCMS-API-KEY': WRITE_API_KEY },
    });
    const listJson = await listRes.json();
    const allSpots = listJson.contents || [];
    console.log(`  取得: ${allSpots.length} 件\n`);

    // 既存スポットのPATCH
    let patchOk = 0, patchFail = 0;
    for (const update of EXISTING_SPOT_UPDATES) {
      const { ok, json } = await apiRequest(`${BASE_URL}/${update.id}`, 'PATCH', { course: update.course });
      if (ok) {
        console.log(`  ✅ ${update.id} → course: ${update.course.join(', ')}`);
        patchOk++;
      } else {
        console.log(`  ❌ ${update.id} → ${JSON.stringify(json)}`);
        patchFail++;
      }
      await new Promise(r => setTimeout(r, 300));
    }

    // 新規登録スポットのPATCH（タイトルでIDを照合）
    const titleToId = Object.fromEntries(allSpots.map(s => [s.title, s.id]));
    for (const spot of NEW_SPOTS) {
      const id = titleToId[spot.title];
      if (!id) {
        console.log(`  ⚠️  ID不明（未登録?）: ${spot.title}`);
        patchFail++;
        continue;
      }
      const { ok, json } = await apiRequest(`${BASE_URL}/${id}`, 'PATCH', { course: spot.course });
      if (ok) {
        console.log(`  ✅ ${spot.title} → course: ${spot.course.join(', ')}`);
        patchOk++;
      } else {
        console.log(`  ❌ ${spot.title} → ${JSON.stringify(json)}`);
        patchFail++;
      }
      await new Promise(r => setTimeout(r, 300));
    }

    console.log(`\n=== PATCH完了 ===`);
    console.log(`成功: ${patchOk} 件 / 失敗: ${patchFail} 件`);
    return;
  }

  // ────────────────────────────────────────────────────────────────
  // register モード（デフォルト）: course フィールドなしで新規登録
  // ────────────────────────────────────────────────────────────────

  // 既存スポット一覧を取得して重複チェック
  console.log('【Step 1】既存スポットを取得中...');
  const listRes = await fetch(`${BASE_URL}?limit=100`, {
    headers: { 'X-MICROCMS-API-KEY': WRITE_API_KEY },
  });
  const listJson = await listRes.json();
  const existingTitles = new Set((listJson.contents || []).map(s => s.title));
  console.log(`  既存: ${existingTitles.size} 件 (${[...existingTitles].join(' / ')})\n`);

  // 新規スポット登録（courseフィールドなし）
  console.log('【Step 2】新規スポットを登録中...');
  let registeredCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const spot of NEW_SPOTS) {
    if (existingTitles.has(spot.title)) {
      console.log(`  ⏭️  スキップ（既存）: ${spot.title}`);
      skippedCount++;
      continue;
    }
    const body = stripCourse(spot); // courseフィールドは除外
    const { ok, json } = await apiRequest(BASE_URL, 'POST', body);
    if (ok) {
      console.log(`  ✅ 登録成功: ${spot.title} (ID: ${json.id})`);
      registeredCount++;
    } else {
      console.log(`  ❌ 登録失敗: ${spot.title} → ${JSON.stringify(json)}`);
      errorCount++;
    }
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n=== 完了 ===');
  console.log(`新規登録: ${registeredCount} 件`);
  console.log(`スキップ（既存）: ${skippedCount} 件`);
  if (errorCount > 0) console.log(`エラー: ${errorCount} 件`);
  console.log('\n次のステップ:');
  console.log('  microCMS管理コンソールで spots スキーマに "course" フィールドを追加後、');
  console.log('  node scripts/register-course-spots.mjs patch-course を実行してください。');
}

main().catch(err => {
  console.error('予期せぬエラー:', err);
  process.exit(1);
});
