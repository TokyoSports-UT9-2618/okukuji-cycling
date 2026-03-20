export type CourseSpot = {
  number: number;
  name: string;
  description: string;
  address: string;
  parking: string;
  hours: string;
  closed: string;
  phone: string;
  image?: string;
};

export type CourseData = {
  id: string;
  name: string;
  level: number;
  levelLabel: string;
  distance: string;
  elevation: string;
  timeWithStop: string;
  timeWithoutStop: string;
  description: string;
  seasonNote: string;
  spots: CourseSpot[];
  mapImage?: string;
  mapPdf?: string;
};

export const courses: CourseData[] = [
  {
    id: 'hanawa',
    name: '塙町コース',
    level: 1,
    levelLabel: 'レベル1・初心者向け',
    distance: '21.7km',
    elevation: '98m',
    timeWithStop: '約3〜4時間',
    timeWithoutStop: '約1〜1.5時間',
    description:
      '奥久慈街道の中で最も初心者向けのコースです。久慈川サイクリングロード、穏やかな町並み、田園風景となだらかな道が続きます。東北最南端の道の駅、カフェなど休憩地点も点在するので、ゆっくりサイクリングを楽しむのに最適です。磐城塙駅にはレンタサイクルもあります。',
    seasonNote:
      '塙町はいつでも花盛り！！久慈川河川敷が満開の桜でいっぱいになる春。風呂山公園が山つつじで真っ赤に染まるゴールディンウィーク。町の至る所でダリアが咲き誇る夏から秋。那倉川渓谷の紅葉が美しく色づく秋。ぜひサイクリングとともに、お花も楽しんでね。',
    mapImage: '/maps/course-hanawa.png',
    mapPdf: '/maps/course-hanawa.pdf',
    spots: [
      {
        number: 1,
        name: '塙町コミュニティプラザ',
        description:
          'JR水郡線の磐城塙駅に町立図書館を併設した施設。喫茶店や物産品販売コーナーなどもあります。',
        address: '塙町大字塙字宮田町1-4',
        parking: 'あり',
        hours: '9:00〜17:30',
        closed: '月曜日・第3日曜日・祝日・年末年始',
        phone: '0247-43-4120',
        image: '/spots/spot-1.jpg',
      },
      {
        number: 2,
        name: '笹原パン店',
        description:
          '昔ながらの素朴なパンを提供。地元の給食でも人気の揚げパンは、砂糖・ここア・きなこ味などがあります。',
        address: '塙町大字川上字堀ノ内14-6',
        parking: 'あり',
        hours: '11:00〜19:00',
        closed: '月曜日',
        phone: '0247-43-0918',
        image: '/spots/spot-2.jpg',
      },
      {
        number: 3,
        name: 'Shiro Cafe',
        description:
          '旬の素材を使ったランチのほか、ひきたてコーヒー、こだわりスイーツ、自家製パンなどを提供。',
        address: '塙町大字川上字堀ノ内168',
        parking: 'あり',
        hours: '11:30〜17:30',
        closed: '月・火・水曜日',
        phone: '0247-57-8311',
        image: '/spots/spot-3.jpg',
      },
      {
        number: 4,
        name: "Café's Bond141",
        description:
          'サンドイッチや日替わりランチをはじめ、コーヒーなどのドリンクも充実している人気カフェ。テイクアウトも可能。',
        address: '棚倉町大字寺山字大豆柄34-1',
        parking: 'あり',
        hours: '11:00〜（閉店時間要問い合わせ）',
        closed: '水曜日・第3火曜日',
        phone: '0247-33-8141',
        image: '/spots/spot-4.jpg',
      },
      {
        number: 5,
        name: '久慈川サイクリングロード',
        description:
          '鮎釣りで人気の久慈川沿いに整備された、県道矢祭・塙・棚倉自転車道。春は南北5kmにわたり桜が咲き誇ります。',
        address: '塙町塙字大町',
        parking: 'なし',
        hours: '',
        closed: '',
        phone: '塙町観光協会 0247-43-3400',
        image: '/spots/spot-5.jpg',
      },
      {
        number: 6,
        name: '道の駅はなわ',
        description:
          '食事処で塙町ならではのメニューを味わえます。久慈川を眺めながらの休憩もオススメ。',
        address: '塙町大字塙字桜木町388-1',
        parking: 'あり',
        hours: '直売所9:00〜18:00、食事処 平日11:00〜19:00・土日祝11:00〜20:00',
        closed: '1月1日・2日',
        phone: '0247-44-0123',
        image: '/spots/spot-6.jpg',
      },
      {
        number: 7,
        name: '向ヶ丘公園',
        description:
          '塙代官・寺西重次郎源封元により、農村復興・農民救済の一環でつくられました。園内の枝垂れ桜は県指定天然記念物。',
        address: '塙町大字塙字桜木町204-1',
        parking: '',
        hours: '',
        closed: '',
        phone: '塙町観光協会 0247-43-3400',
        image: '/spots/spot-7.jpg',
      },
      {
        number: 8,
        name: '風呂山公園',
        description:
          '塙自宅のお風呂からでも見られるようにと名付けられた公園。春は約3,300株の山つつじが真っ赤な絨毯を作ります。',
        address: '塙町大字塙字桜木町271-1',
        parking: '',
        hours: '',
        closed: '',
        phone: '塙町観光協会 0247-43-3400',
        image: '/spots/spot-8.jpg',
      },
    ],
  },
  {
    id: 'yamatsuri',
    name: '矢祭町コース',
    level: 2,
    levelLabel: 'レベル2',
    distance: '',
    elevation: '',
    timeWithStop: '',
    timeWithoutStop: '',
    description:
      '矢祭町の2大観光スポット「矢祭山公園」と「滝川渓谷」をめぐる絶景堪能コース。ゆるやかな農村風景を堪能できるコースの途中には農産物直売所やこだわりの珈琲店など、矢祭町の食が楽しめるスポットも！心地よい充実感が味わえるサイクリングコースです。',
    seasonNote:
      '里山、田んぼ、清流…思い浮かべる田舎の風景を体感できるコースです。四季折々の景色、匂い、暮らしを感じながらの散走と行く先々での美味しい食事は、おなかも心も満たしてくれます。ちなみにやまっぴーは鮎の塩焼きが大好きです。食べてみてね！',
    mapImage: '/maps/course-yabuki.png',
    mapPdf: '/maps/course-yabuki.pdf',
    spots: [
      {
        number: 1,
        name: 'ユーパル矢祭',
        description:
          '露天風呂、超音波風呂など多様な湯で体を癒やせる宿泊施設。日帰り入浴可能。プールやテニスコートもあります。',
        address: '矢祭町大字東舘字蔵屋敷108-1',
        parking: 'あり',
        hours: '9:00〜17:00',
        closed: 'なし',
        phone: '矢祭振興公社 0247-46-4300',
        image: '/spots/spot-1.jpg',
      },
      {
        number: 2,
        name: '和ダイニング つどい',
        description:
          'ランチは魚料理や揚げ物の定食を中心に味わうことができます。手頃な価格の日替わり定食が人気。',
        address: '矢祭町大字小田川字春田38-1',
        parking: '',
        hours: '11:00〜14:00、18:00〜22:00（L.O.21:30）',
        closed: '火曜日・第4月曜日',
        phone: '0247-46-2203',
        image: '/spots/spot-2.jpg',
      },
      {
        number: 3,
        name: '珈琲香坊',
        description:
          '世界各国の優良農園から厳選した高品質なコーヒー豆を自家焙煎。ログハウス風の店内でゆったりと楽しめます。',
        address: '矢祭町大字小田川字中山17-1',
        parking: 'あり',
        hours: '11:00〜18:00',
        closed: '毎週水曜日',
        phone: '0247-34-1131',
        image: '/spots/spot-3.jpg',
      },
      {
        number: 4,
        name: '滝川渓谷遊歩道',
        description:
          '全長3kmの散策路内に48の滝が連続する渓谷。巨大な奇岩や天然の老木など、ありのままの自然が広がります。',
        address: '矢祭町大字大垬字滝平',
        parking: 'あり',
        hours: '',
        closed: '12月〜3月',
        phone: '矢祭町事業課産業グループ 0247-46-4575',
        image: '/spots/spot-4.jpg',
      },
      {
        number: 5,
        name: '農泊 保木山',
        description:
          '農業体験等をしながら地元の生活に触れることができる農家民宿。地元食材をふんだんに使った味が楽しめます。',
        address: '矢祭町大字高野字高野69',
        parking: 'あり',
        hours: '',
        closed: '不定休（要予約）',
        phone: '矢祭町農泊推進協議会 0247-46-4575',
        image: '/spots/spot-5.jpg',
      },
      {
        number: 6,
        name: '矢祭山公園',
        description:
          '春は100本を超えるソメイヨシノと約5万本のつつじ、秋は燃えるような紅葉と、四季折々の美に満ちています。',
        address: '矢祭町大字内川字矢祭',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '矢祭町事業課産業グループ 0247-46-4575',
        image: '/spots/spot-6.jpg',
      },
      {
        number: 7,
        name: '桧山登山道',
        description:
          '複数の登山ルートがあり、季節ごとに異なる景色が広がります。標高510mの山頂では360度の展望を楽しめます。',
        address: '矢祭町大字山下字下河原',
        parking: '',
        hours: '',
        closed: '',
        phone: '矢祭町事業課産業グループ 0247-46-4575',
        image: '/spots/spot-7.jpg',
      },
      {
        number: 8,
        name: '夢想滝',
        description:
          '「ふくしまの水三十選」のひとつ。あゆのつり橋から約200mの所にあります。清涼な流れが疲れを癒やしてくれます。',
        address: '矢祭町大字山下字太鼓堂',
        parking: '',
        hours: '',
        closed: '',
        phone: '矢祭町事業課産業グループ 0247-46-4575',
        image: '/spots/spot-8.jpg',
      },
      {
        number: 9,
        name: 'みりょく満点物語 矢祭店 太郎の四季',
        description:
          '地元の農産物や加工品を販売。新鮮さと安全安心を求めて、地元客はもちろん、県外の常連客や観光客で賑わいます。',
        address: '矢祭町大字関岡字下小坂56',
        parking: 'あり',
        hours: '8:00〜18:00',
        closed: '第3火曜日・1月1日・2日',
        phone: '0247-46-2405',
        image: '/spots/spot-9.jpg',
      },
    ],
  },
  {
    id: 'tanagura',
    name: '棚倉町コース',
    level: 2,
    levelLabel: 'レベル2',
    distance: '',
    elevation: '',
    timeWithStop: '',
    timeWithoutStop: '',
    description:
      '四季折々の自然が魅力で、二つの一宮が現存するなど多くの歴史的建造物が残る棚倉町。久慈川の雄大な流れを眺めながら、のどかで豊かな自然風景を通るサイクリングコースを含め、神社仏閣をめぐる東北の小京都棚倉の周遊コースです。豊かな自然の新鮮な空気と、城下町の歴史を感じることができるコースです。',
    seasonNote:
      '桜や紅葉の頃は棚倉城跡のお堀の水面に映る景色や、山本不動尊のもみじ参道がきれいだよ。二つの一宮、神社仏閣のパワースポット、おいしいお菓子やパン屋さんも沢山あるよ。東北の小京都棚倉で、幸福・満腹めぐりに出かけてみよう！',
    mapImage: '/maps/course-tanagura.png',
    mapPdf: '/maps/course-tanagura.pdf',
    spots: [
      {
        number: 1,
        name: 'ルネサンス棚倉',
        description:
          '宿泊のほか、日帰り温泉、食事、運動などが楽しめるリゾート宿泊施設。サイクリングの汗を流すのに最適です。',
        address: '棚倉町大字関口字一本松43-1',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '0247-33-4111',
        image: '/spots/spot-1.jpg',
      },
      {
        number: 2,
        name: '馬場都々古別神社',
        description:
          '陸奥一宮であり、祭神は味耜高彦根命と日本武尊を祀っています。本殿は国指定重要文化財です。',
        address: '棚倉町大字棚倉字馬場39',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '0247-33-7219',
        image: '/spots/spot-2.jpg',
      },
      {
        number: 3,
        name: '蓮家寺',
        description:
          '慶長8年建立。町指定文化財の山門をはじめとする貴重な文化財が残されています。',
        address: '棚倉町大字新町129',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '0247-33-2344',
        image: '/spots/spot-3.jpg',
      },
      {
        number: 4,
        name: '棚倉城跡（国指定史跡）',
        description:
          '春は桜、秋はもみじがお堀に映り込み、美しい景色を堪能できます。城跡内は、ゆっくりとくつろげる憩いの場です。',
        address: '棚倉町大字棚倉字城跡',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '棚倉町観光協会 0247-33-7886',
        image: '/spots/spot-4.jpg',
      },
      {
        number: 5,
        name: '山本不動尊',
        description:
          '130段の石段を上り詰めると、巨岩の洞窟のもとに弘法大師尊像が安置されています。四季折々の景色が魅力です。',
        address: '棚倉町大字北山本字小檜沢94-2',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '0247-33-2445',
        image: '/spots/spot-5.jpg',
      },
      {
        number: 6,
        name: 'みりょく満点物語',
        description:
          '地元産の野菜や果物、加工品を豊富に扱う直売所で、濃厚ソフトクリームや食材にこだわったレストランもあります。',
        address: '棚倉町下山本字愛宕平15-1',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '0247-33-1212',
        image: '/spots/spot-6.jpg',
      },
      {
        number: 7,
        name: '八槻都々古別神社',
        description:
          '奥州一宮であり、祭神は味耜高彦根命と日本武尊を祀っています。国指定重要無形民俗文化財の御田植祭が有名です。',
        address: '棚倉町大字八槻字大宮224',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '0247-33-3505',
        image: '/spots/spot-7.jpg',
      },
    ],
  },
  {
    id: 'samegawa',
    name: '鮫川村コース',
    level: 3,
    levelLabel: 'レベル3・中級',
    distance: '',
    elevation: '270m',
    timeWithStop: '',
    timeWithoutStop: '',
    description:
      '本コースは高低差が270mあり、中間点の「鹿角平観光牧場」までの上り坂は試練坂です。上り切った先に見える大草原は、開放的な景観とともに達成感を味わえ心癒されること間違いありません。おすすめは、新緑（5〜7月）の季節です。里山風景を楽しみながら、ゆっくりと散走してみませんか。',
    seasonNote:
      'ハードなコースを走り抜けながら、田園や里山の美しい風景を楽しもう！標高700mに位置する鹿角平観光牧場では、1年を通して周囲の光に邪魔されることなく満天の星空を眺めることができるよ。宿泊しながらのサイクリングもおすすめ。道中、鮫川村の鳥に指定されているキジに遭遇できたらラッキーかも！？',
    mapImage: '/maps/course-samegawa.png',
    mapPdf: '/maps/course-samegawa.pdf',
    spots: [
      {
        number: 1,
        name: '手・まめ・館',
        description:
          '大豆の栽培による「まめで達者な村づくり」の拠点施設。直売所、食堂、カフェなどが併設されています。',
        address: '鮫川村大字赤坂中野字巡ヶ作116',
        parking: 'あり',
        hours: '9:00〜18:00',
        closed: '毎月第1水曜日',
        phone: '0247-49-2556',
        image: '/spots/spot-1.jpg',
      },
      {
        number: 2,
        name: '清水端のしだれ桜',
        description:
          '樹齢150年のしだれ桜で、近くには東屋があります。傍らの清水端という11℃の冷たい湧水は飲用できます。',
        address: '鮫川村大字渡瀬字田尻44-1',
        parking: '',
        hours: '',
        closed: '',
        phone: '鮫川村役場農林商工課 0247-49-3113',
        image: '/spots/spot-2.jpg',
      },
      {
        number: 3,
        name: '鹿角平観光牧場',
        description:
          '大草原が広がる牧場内には、バーベキューハウスやロッジ、天文台などが整備されてます。売店及び食堂も併設。',
        address: '鮫川村大字青生野字世々麦343',
        parking: 'あり',
        hours: '4〜11月 9:00〜17:00・12〜3月 9:00〜15:45',
        closed: '年末年始',
        phone: '0247-57-8311',
        image: '/spots/spot-3.jpg',
      },
      {
        number: 4,
        name: 'Little Café',
        description:
          '手作りにこだわったカフェ。自然と絵本に囲まれながら、カレーライス、オムライス、ラーメンなどを味わえます。',
        address: '鮫川村大字赤坂東字戸草447',
        parking: '',
        hours: '土曜日・日曜日 11:00〜15:00',
        closed: '月〜金曜日',
        phone: '0247-49-2250',
        image: '/spots/spot-4.jpg',
      },
      {
        number: 5,
        name: 'さぎり荘',
        description:
          '山並みに抱かれた彩り�かな自然の中で、四季を感じながらゆったりとした温泉時間を楽しむことができる施設。',
        address: '鮫川村大字赤坂東野字広畑199-2',
        parking: 'あり',
        hours: '4〜10月 9:30〜21:00・11〜3月 9:30〜20:00',
        closed: '毎週水曜日',
        phone: '0247-49-2205',
        image: '/spots/spot-5.jpg',
      },
      {
        number: 6,
        name: 'Rêve',
        description:
          '地元の食材を使用したケーキや焼き菓子を提供するオシャレなスイーツ屋。ドリンクも提供しています。',
        address: '鮫川村赤坂中野道少田18-2',
        parking: '',
        hours: '9:30〜17:30',
        closed: '火曜日',
        phone: '0247-57-6550',
        image: '/spots/spot-6.jpg',
      },
    ],
  },
  {
    id: 'tour-de-hanawa',
    name: 'ツール・ド・はなわ',
    level: 4,
    levelLabel: 'レベル4・上級',
    distance: '',
    elevation: '',
    timeWithStop: '',
    timeWithoutStop: '',
    description:
      '福島県内の公道を舞台に開催されている自転車のロードレース「ツール・ド・ふくしま」を、塙町で開催するために設定された「ツール・ド・はなわ」コースです。きつめの上り坂、蛇行する下り坂などレースコースならではのバリエーションに富んだコースは、サイクリングコースとしてもお楽しみいただけます。ご利用いただく際は、時計回りで走行してください。',
    seasonNote: '',
    mapImage: '/maps/course-tourde.png',
    mapPdf: '/maps/course-tourde.pdf',
    spots: [],
  },
  {
    id: 'triangle',
    name: '三角形の道',
    level: 3,
    levelLabel: 'レベル3・中級',
    distance: '',
    elevation: '',
    timeWithStop: '',
    timeWithoutStop: '',
    description:
      '観光庁が開設したランナーズインフォメーション研究所の認定コース。四季折々の景色、穏やかな町並み、懐かしい里山の風景など、豊かな自然と人の営みが絡み合う、自転車で走る道としての魅力すべてが備わった、本格的なサイクリングコースです。適度な高低差があるため、軽めのヒルクライムとして、お楽しみいただけます。',
    seasonNote: '',
    mapImage: '/maps/course-sankakkei.png',
    mapPdf: '/maps/course-sankakkei.pdf',
    spots: [
      {
        number: 1,
        name: '湯遊ランドはなわ',
        description:
          '宿泊のほか、日帰り温泉、食事、運動などが楽しめるリゾート宿泊施設。サイクリングの汗を流すのに最適です。',
        address: '塙町大字湯岐字立石21',
        parking: 'あり',
        hours: '',
        closed: '',
        phone: '0247-43-3000',
        image: '/spots/spot-1.jpg',
      },
      {
        number: 2,
        name: 'あぶくま高原美術館',
        description:
          '廃校なった塙町立那倉小学校を改築し、平成16年4月に開館。塙町出身の画伯・杉三郎氏と書家・鈴木清水氏の作品を展示。',
        address: '塙町大字那倉字吉元86-2',
        parking: 'あり',
        hours: '10:00〜16:00',
        closed: '毎週月曜日・火曜日および冬期（12〜3月）',
        phone: '0247-42-2510',
        image: '/spots/spot-2.jpg',
      },
      {
        number: 3,
        name: '不動滝',
        description: '圧倒的な存在感を放つ不動滝は、道沿いから眺めることができます。',
        address: '',
        parking: '',
        hours: '',
        closed: '',
        phone: '',
        image: '/spots/spot-3.jpg',
      },
      {
        number: 4,
        name: '湯岐渓谷',
        description:
          '県道高萩・塙線沿いを流れる湯川の渓谷です。途中に不動滝、雷滝があり、マイナスイオンを浴びながら散策できます。',
        address: '',
        parking: '',
        hours: '',
        closed: '',
        phone: '',
        image: '/spots/spot-4.jpg',
      },
      {
        number: 5,
        name: '雷滝',
        description: '道路脇に遊歩道があり、近くで見ることができます。',
        address: '',
        parking: '',
        hours: '',
        closed: '',
        phone: '',
        image: '/spots/spot-5.jpg',
      },
    ],
  },
  {
    id: 'okukuji-kaido',
    name: '奥久慈街道',
    level: 4,
    levelLabel: 'レベル4・中上級',
    distance: '約80km',
    elevation: '',
    timeWithStop: '',
    timeWithoutStop: '',
    description:
      '奥久慈の穏やかな旅情を感じながら巡る、約80kmの中・上級者向けヒルクライムコース。久慈川沿いの風光明媚な景色を進む道、急な上り坂やアップダウンが続く挑戦心を掻き立てる道、のどかな田園風景や草原がひろがる小高い丘などの自然を満喫する道など、さまざまなサイクリングをじっくり楽しむことができます。コース内にはほどよく温泉・宿泊施設、直売所などが点在するので、宿泊しながらじっくり楽しむのがおススメです。',
    seasonNote: '',
    mapImage: '/maps/course-okukuji.png',
    mapPdf: '/maps/course-okukuji.pdf',
    spots: [],
  },
];
