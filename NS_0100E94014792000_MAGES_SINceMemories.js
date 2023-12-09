// ==UserScript==
// @name         [0100E94014792000] SINce Memories: Hoshi no Sora no Shita de
// @version      0.1 - 1.0.0 (base), 1.0.1
// @author       [DC]
// @description  Yuzu, SINce Memories Off the starry sky
// * MAGES. inc.
// * MAGES Engine
// ==/UserScript==
const gameVer = '1.0.0';

const { setHook } = require('./libYuzu.js');
const { readString } = require('./libPCMAGES.js');

const table = createTable();
const mainHandler = trans.send(handler, '200+'); // join 200ms (line + name)
const directHandler = trans.send(handler);

const base100 = {
    [0x80048cc8 - 0x80004000]: mainHandler, // line + name => join
    [0x8004f44c - 0x80004000]: directHandler, // fast trophy
    [0x8004f474 - 0x80004000]: directHandler, // prompt
    [0x80039dc0 - 0x80004000]: mainHandler  // choice
};

setHook({
    '1.0.0': base100,
    '1.0.1': base100 // same exe
}[globalThis.gameVer ?? gameVer]);

function handler(regs) {
    const address = regs[0].value; // x0

    console.log('onEnter');
    console.log(hexdump(address, { header: false, ansi: false, length: 0x50 }));

    let s = readString(address, table);

    return s;
}

//-------------------------------------------------
function createTable() {
    const table = [];

    // PrivateUseCharacters


    // Thanks: mrShiba#4412 and Ernovace#2827 (ZDTL)
    // row   : 43
    // column: 64 (1row = 64chars)
    const charset = (
        '　0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ' +   // 0 - 8000->803F
        '/:-;!?′.@#%~*&`()°^>+<ノキリッ${},[]=                               ' + // 1 - 8040->807F
        '０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ、。' + // 2 - 8080->80BF
        '，．：；？！゛゜‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＜＞〖〗・…〜‐♪ーぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ①②' +        // 3 - 80C0-> 80FF (⋯ -> …)
        '―――                                                             ' + // 4 - 8100->813F
        '                               あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてで' + // 5 - 8140->817F
        'とどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもやゆよらりるれろわゐゑをんアイウエオカガキギクグケゲコゴサザシジスズセゼソ' + // 6
        'ゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプへベペホボポマミムメモヤユヨラリルレロワヰヱヲンヴ☆★◎○●△▲□■▽▼◇◆※' + // 7
        '                                                                ' + // 8 - 8200->823F
        '全日記憶始鷹也腹減時簡単仕事依頼人前会思俺隼誰罪背負言行待兄貴必死絞出声幻風景切裂先視界広見知顔凛黒瞳写間抜自分身距離息呑起返相' + // 9  - 8240-827F
        '変細唇笑形作傾首動合髪流一妙鮮烈意識覚醒寝私珍楽北條通大学水元幼夢世部現実戻胸指回隣示立陽詩伊勢正解不手厳物苦眼鏡奥冗談乱暴駄目' + // 10 - ...
        '眠姫王子様番探木陰柄葉抗湧上途体少要徹夜丈夫心配表情向屈込軽制馴染直男女適辺昔感慣受入嬢噂当本達付稚園頃違成長理家住澄空有数名父' + // 11
        '親地代役政治祖門血筋然生完璧隠般的庭育市民気使話客観友何突休方別普甘線続調管屋業両最初決教師説面降伏仰茶化照即参挙吐昨好小発売緒' + // 12
        '族年嬉交互含頂題堂多願聞引後仁急二無今度優戴持汲頷以謝走期冷静保芸味伝社用車場移営域密着我員忘働明雑主材座藤了基力草越定修商店街' + // 13
        '混整種済常連式第晴良雨下快進握助席揺任足遅刻横読内買収載態瞬渡想像勝赤信号差点停止右海沿睨諦山登青左曲坂道抵暫咳故周困伸嘘際輪中' + // 14
        '同士潤滑油結眩輝太惑星集奇跡存在幸純粋興奮弟性格恵得難悪緩電十冊抱廊歩階段往復来半経確書埋隙古卸運繰口駆取落英考申訳頭低高校君開' + // 15
        '尋反応押逃飛扉閉肩跳酷驚惚藍乃法律触馬鹿積次構崩飲失礼丁寧乗騒便利重宝八幡宮駅者預査節約三芽給料夕飯命令妹春験迎対特品把送担怒予' + // 16
        '母病逆帰窓振神奈川県関東光仏銭洗弁財天寺秋加旅夏浴砂浜尽館芦島賑沢遊去録症激増蝶床毎食注文側百除届可称殊状換製造倒産工削根週末務' + // 17
        '所町鎮角宅鷲雄外鍵昼残麦邪魔寄机詰置覗姿留守放級端仲間欲脱軌旧射答華甲斐真亡他宙浮扱技術革新老朽替更斜繋希望挟割嫌由将卒婚庶責改' + // 18
        '摘色消音戸訝挨拶似呆追遣提案燃殺脳裏敵蘇憎係許彼接覆到誘延々断片掴包個機導喧嘩絶終局強叩痛鈍服朝計鳴微納坊位早股短布団這健康睡限' + // 19
        '若晩潜卓椅壇炊碗噌汁温白巻卵焼魚豆腐綺麗盛婦満喫眉午忙準備揃習近影響敏察塩鮭深顛論議娘歳捜程拝張画剣欠勧貸贔屓呼寂報支愛余裕講義' + // 20
        '課念認効耶趣打絡腰傍証遠慮侍矜叫平非怖充危害及警戒漏促雰囲喜転釈針絵描従建並暮築懐供穴頻繁否柵掛質敷玄筈久掃壊如語処懇却維費共図' + // 21
        '棚狭森斎類室挨舞居和軸飾縁柱奴字盤秘耳舌価値貰凄恐素巡徒凝震頬涙侵咎脇腕折踏里美告猫月曜秒路退偶忠泰伺僕籍迷野果汎額払金緊固狙畜' + // 22
        '穏徴怪誤黄玉銃刃衝撃与印象功国被富層俗勉選資源姉郷再歴史鞄撮恥軒慌各算円雇安都徳酬倍醸黙設試判賃裁量寸阴斉朗暇岸公塀派盗犯順御褒' + // 23
        '菓熱滞吹逡臨展捨拓詳石鳥沖縄看板眺湘南紹介肘仮稲穂齢悲淹杯香酸辞土丸契領儀枚例浸惹披露過永唸争揮拒鱗焦審傷犠牲攻略戦障謎泣贅販奢' + // 24
        '銘球候補散策皆疲装活舍逐継豊堅氏愚痴束邸超捕佐荷繕塗衆院駐葬悔憔悴険昇柔勘紅洋職専厨房属施徐速沈避井賛喋殿唯漫誌缶悩借曰禁型区魅' + // 25
        '能推吸餌帯喉濡底刺撫慰奪投授火干万抑釣鼻求損精労箸泳児恋就童妊娠憧酒咥規排該監訪菜検討翌歯企測頑宣盾陣至倣膝膨弛締釘糧範敢聴央蔵' + // 26
        '索台帳博籠概昭欄○廃棄司架庫請紙鉛筆益省羨箱肝愕矛剛迫爆噛花添哲慢枯袖暖悟裾招羅慎奏句援帽拾戯潔千縦植醜件権棒梨況袋札陶酔栓蛇圧' + // 27
        '条偉塊嬌汚旦那独詮婿譲薄票凍綾瀬既泊揚祝乾豪泡穫曾翡翠融極府顧宴贈盃酌没拗尖尊敬縮煽覧緑採掘拳濯執具摯防医恰枕畳垣鋭弱忍矢襖季幽' + // 28
        '霊昆虫怯暗闇脅兎比渋捉靴履協臭逸溶随堪湯壁清汗軍拭巾賭嫁鐘剤憩陥組踊歌才揉列幅努零魂叱己咳催未競乙隅庇癖叶章槌錯胡坐据鎌伴侶福翻' + // 29
        '朱肉容拍滅淀稼募器袴鬼庵舗京鈴税署郵衛薬項皿輩雅猶儲境匂漂祭煩噪倉芝紐択武抹涛嘉舐粛模映厚控倅橋疎刷購総占杖沙汰憐賢婆溢冬淑併躍' + // 30
        '訴誕為遽召乳谷疑挿硬遮幾環涯救致易毒陸兵研究鎖評剥刀善兆原因拠訂双丘挑編異歓蹴猛操疇則尻尾握恨辛旺弄浅襲贖幹偵呂灯忌凌駕誉鼓膜寒' + // 31
        '騙謹濃訓潰封筒宛官貼養護西逗敗典踪酒奨詫渉灰雲傘雷蒸葛淡承塞系統瞼瞑哀粗米牛飽遷版遺隔煌紫虹七橙絨毯謐瓦妻捻唐躊躇幕窒倫療遁貞憂' + // 32
        '鬱紛渦粉遂暦竜城舎陳五樹託匙綴笹培絆逝破曇骨溜掻摺驕拘冒複誠誓波赦偏肢悠遙囚萎虎諸練遭剰織彦逢窺析攣遇励嫉妬羽凧傲勤償亘宜塵威癇' + // 33
        '摂胆憑睡較竦粧馳懸恩郎穿熟貧薦愉滲乏厄曖味蚊唆砕械埒等吉透囁縋岩犬飼刑率鉢嘲咄嗟迂闊罠泥狐狸苛慕憫訊劇垂瞭緯志貶諾凶豹惜携啖呵荒' + // 34
        '鳩磨胃液跨勇謙虚誇痒迅阿弥掌晒歪濁喰稽楚虐做牽隈惨演蓋貫貪嗅釜耐懺躾朧罵嘆掲付村縛漕奉旨宗篤娶餞儘弾錠梁嵌祀孫霞儚咲四鉄箇津縫俯' + // 35
        '罰掠詐欺毟祈枠俳漢宇洞蒼委符皮暑漠是顎丹煮卑昏捗臓閲銀刊咤遍箋某巧毀糸舳辿儂呻凹藪偽貢飴鞭恫喝祉仇述袈裟渇涼痕謀棘瑕疵辻棲澱肌躱' + // 36
        '醍醐狼狽廻蓮托賄賂爽饒炎糾撤遜噴甚匿繊栄殴睦湿脆痺脚阻闘壺臣匠梶拙党閣溌刺免績滓殻賞獲颯噤霧弔狂拡紀套践悶湛瓶妖皺蔑粒毛喩綿輸拵' + // 37
        '軋簿献掬矮嗤讐墨澹蓄憤怠煙詈嵐嗜廉冠碍妥僧旗酢腫些詭姑焚綱氷劾媚僭憚牢曹唖輿閥侮恣蠢芯墓伐杞粘弊懲臆遡偲閃寿罹須諳恒慨啄戚沸騰麻' + // 38
        '航衣濤呈標肯逼巣暢櫛梳畑膳秀堵科禊茜肺峙序錬鍛牙盪杏冴燥漁吊塔群窟佇挫甥撲靭誅篭鍮鍋胴爪旋蛮僅孔循郭躓莫墜裸凡曽畏繭聖斑軟磁湾礎' + // 39
        '董勿鶴岡圏券彫勾壮貯悼睫嫋鑑傑宥貝糖墟宿癒蹲朋暈船頓訣藁韻括兼舟瞠唱詞紋冥賠醤扮忸怩雌吠穹轟貨饅雀慄辱爛浙江隗昌劣禄諌碧班紡芻吻' + // 40
        '捧堀砦炒椒絲淋柿鶏蛋咀嚼罫譜棲詠呪刈凪潮宰挺彩賀酎擦妄妨膚云梅彷徨辣蕩孤牧抽渾翼翔Ｍ蝉茂熾萌瞥旬掟耽搦枷攫謳柴諭需捌匹苺雪滴函凸' + // 41
        '垢駈諍飄腺拐囮渥艶狩孝嵩腔檻疼搬寛賜啓九窮拉昂脈均督怨恭逮讃災肖誹謗遥摑裡六荘崖擁*癪                                       ' + // 42
        '').replace(/\r|\n/g, '');

    let charCode;
    for (let i = 0; i < charset.length; i++) {
        // by index
        //table.push(charset[i]);

        // by code
        charCode = 0x8000 + i; // init
        charCode = ((charCode & 0xFF) << 8) | charCode >> 8; // swap endian (0x8001 -> 0x0180)
        table[charCode] = charset[i];
    }
    return table;
}