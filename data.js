/* 記敘與唐詩 · 學習射擊 — 題庫與詩句資料（依附件學習重點） */
window.GAME_DATA = {
  title: "記敘與唐詩 · 學習射擊",
  subtitle: "人稱 · 記敘方法 · 唐詩停頓",

  levels: [
    { id: "person", name: "第一關 · 人稱射擊場", unit: "人稱", desc: "辨認第一／二／三人稱及其效果" },
    { id: "method", name: "第二關 · 記敘方法", unit: "方法", desc: "順敘、倒敘、插敘與順序" },
    { id: "songyou", name: "第三關 · 《送友人》", unit: "送友人", desc: "按正確停頓擊落詞組" },
    { id: "mulan", name: "第四關 · 《木蘭詩》", unit: "木蘭詩", desc: "按正確停頓擊落詞組" },
    { id: "boss", name: "總複習 Boss", unit: "綜合", desc: "人稱、方法與兩詩綜合亂鬥" },
  ],

  studyCard: {
    person: [
      { name: "第一人稱「我」", def: "以「當事人」身份敘述", effect: "讓讀者親歷其境，感同身受並引起共鳴。" },
      { name: "第二人稱「你」", def: "以「對方」為敘事對象", effect: "拉近與讀者的距離，直接對話，感覺親切。" },
      { name: "第三人稱「他」", def: "以「旁觀者」身份敘述", effect: "讓讀者對事件有全面了解，掌握所有角色心理狀況。" },
    ],
    method: [
      {
        name: "順敘",
        def: "按事情發生的先後次序／時間順序排列",
        order: "原因 → 經過 → 結果",
        effect: "結構清晰，讓讀者清楚掌握來龍去脈，以及人物感情轉變。",
      },
      {
        name: "倒敘",
        def: "先寫結果／某個重要情節，再交代原因和經過",
        order: "結果 → 原因 → 經過",
        effect: "製造懸念，避免平鋪直敘，吸引讀者思考、激發興趣，追看下文。",
      },
      {
        name: "插敘",
        def: "先中斷原來的記敘，插入與主要／關鍵相關的片段，再恢復原來的敘述",
        order: "原因 → 經過 → 過去片段 → 結果",
        effect: "突出人物的性格形象；突出人物的感情變化；補充情節。",
      },
    ],
    poems: [
      {
        title: "《送友人》",
        author: "李白",
        lines: [
          "青山／橫／北郭，",
          "白水／繞／東城。",
          "此地／一／為別，",
          "孤蓬／萬里／征。",
          "浮雲／遊子意，",
          "落日／故人情。",
          "揮手／自茲／去，",
          "蕭蕭／班馬鳴。",
        ],
      },
      {
        title: "《木蘭詩》",
        author: "佚名（節選）",
        lines: [
          "唧唧／復唧唧，",
          "木蘭／當戶／織。",
          "不聞／機杼聲，",
          "唯聞／女歎息。",
          "問女／何所／思，",
          "問女／何所／憶。",
          "女亦／無所／思，",
          "女亦／無所／憶。",
          "昨夜／見軍帖，",
          "可汗／大／點兵。",
          "軍書／十二卷，",
          "卷卷／有爺名。",
          "阿爺／無大兒，",
          "木蘭／無長兄。",
          "願為／市／鞍馬，",
          "從此／替爺／征。",
        ],
      },
    ],
  },

  person: [
    {
      type: "choice",
      prompt: "以「當事人」身份敘述，使用的人稱是？",
      options: ["第一人稱「我」", "第二人稱「你」", "第三人稱「他」"],
      answer: 0,
      explain: "第一人稱以「當事人」身份敘述，讓讀者親歷其境。",
    },
    {
      type: "choice",
      prompt: "以「對方」為敘事對象，使用的人稱是？",
      options: ["第一人稱「我」", "第二人稱「你」", "第三人稱「他」"],
      answer: 1,
      explain: "第二人稱以「對方」為敘事對象，感覺像直接對話。",
    },
    {
      type: "choice",
      prompt: "以「旁觀者」身份敘述，使用的人稱是？",
      options: ["第一人稱「我」", "第二人稱「你」", "第三人稱「他」"],
      answer: 2,
      explain: "第三人稱以旁觀者身份敘述，便於全面掌握事件。",
    },
    {
      type: "choice",
      prompt: "哪一種人稱最能讓讀者「親歷其境、感同身受」？",
      options: ["第一人稱", "第二人稱", "第三人稱"],
      answer: 0,
      explain: "第一人稱的效果是親歷其境，引起共鳴。",
    },
    {
      type: "choice",
      prompt: "哪一種人稱能「拉近與讀者的距離，感覺親切」？",
      options: ["第一人稱", "第二人稱", "第三人稱"],
      answer: 1,
      explain: "第二人稱直接對話，拉近距離、感覺親切。",
    },
    {
      type: "choice",
      prompt: "哪一種人稱能讓讀者「全面了解事件、掌握各角色心理」？",
      options: ["第一人稱", "第二人稱", "第三人稱"],
      answer: 2,
      explain: "第三人稱旁觀敘述，便於全面了解與掌握心理。",
    },
    {
      type: "choice",
      prompt: "「我那天站在校門口，心怦怦跳。」主要運用？",
      options: ["第一人稱", "第二人稱", "第三人稱"],
      answer: 0,
      explain: "「我」是當事人身份，屬第一人稱。",
    },
    {
      type: "choice",
      prompt: "【練習短句】「你可曾想過，那天如果沒有回頭？」主要運用？",
      options: ["第一人稱", "第二人稱", "第三人稱"],
      answer: 1,
      explain: "「你」以對方為對象，屬第二人稱。（練習用短句）",
    },
    {
      type: "choice",
      prompt: "「他靜靜看著窗外，誰也不知道他在想什麼。」主要運用？",
      options: ["第一人稱", "第二人稱", "第三人稱"],
      answer: 2,
      explain: "「他」是旁觀者敘述對象，屬第三人稱。",
    },
    {
      type: "choice",
      prompt: "想引起讀者共鳴、彷彿親身經歷，宜多用？",
      options: ["第一人稱", "僅用倒敘", "不含人稱的說明文"],
      answer: 0,
      explain: "第一人稱的好處是親歷其境、感同身受。",
    },
  ],

  method: [
    {
      type: "choice",
      prompt: "按事情發生的先後次序／時間順序排列，稱為？",
      options: ["順敘", "倒敘", "插敘"],
      answer: 0,
      explain: "順敘按時間先後排列，結構清晰。",
    },
    {
      type: "choice",
      prompt: "先寫結果或重要情節，再交代原因和經過，稱為？",
      options: ["順敘", "倒敘", "插敘"],
      answer: 1,
      explain: "倒敘先寫結果／重要情節，再補原因經過。",
    },
    {
      type: "choice",
      prompt: "中斷原來記敘，插入相關片段後再恢復，稱為？",
      options: ["順敘", "倒敘", "插敘"],
      answer: 2,
      explain: "插敘是中斷後插入關鍵片段，再恢復原敘述。",
    },
    {
      type: "choice",
      prompt: "「結構清晰，掌握來龍去脈與感情轉變」是哪種方法的好處？",
      options: ["順敘", "倒敘", "插敘"],
      answer: 0,
      explain: "這是順敘的效果及好處。",
    },
    {
      type: "choice",
      prompt: "「製造懸念，吸引追看下文」是哪種方法的好處？",
      options: ["順敘", "倒敘", "插敘"],
      answer: 1,
      explain: "這是倒敘的效果及好處。",
    },
    {
      type: "choice",
      prompt: "「突出性格／感情變化，補充情節」屬於哪種方法的好處？",
      options: ["順敘", "倒敘", "插敘"],
      answer: 2,
      explain: "這是插敘的效果及好處。",
    },
    {
      type: "order",
      prompt: "請按「順敘」正確順序擊落牌子",
      options: ["原因", "經過", "結果"],
      answer: ["原因", "經過", "結果"],
      explain: "順敘：原因 → 經過 → 結果。",
    },
    {
      type: "order",
      prompt: "請按「倒敘」常見順序擊落牌子",
      options: ["結果", "原因", "經過"],
      answer: ["結果", "原因", "經過"],
      explain: "倒敘：結果 → 原因 → 經過。",
    },
    {
      type: "order",
      prompt: "請按「插敘」結構順序擊落牌子",
      options: ["原因", "經過", "過去片段", "結果"],
      answer: ["原因", "經過", "過去片段", "結果"],
      explain: "插敘：原因 → 經過 → 過去片段 → 結果。",
    },
    {
      type: "choice",
      prompt: "文章開頭先寫比賽落敗，再回想訓練過程，主要是？",
      options: ["順敘", "倒敘", "插敘"],
      answer: 1,
      explain: "先寫結果再補原因經過，屬倒敘。",
    },
  ],

  songyouLines: [
    { full: "青山／橫／北郭，", segments: ["青山", "橫", "北郭"] },
    { full: "白水／繞／東城。", segments: ["白水", "繞", "東城"] },
    { full: "此地／一／為別，", segments: ["此地", "一", "為別"] },
    { full: "孤蓬／萬里／征。", segments: ["孤蓬", "萬里", "征"] },
    { full: "浮雲／遊子意，", segments: ["浮雲", "遊子意"] },
    { full: "落日／故人情。", segments: ["落日", "故人情"] },
    { full: "揮手／自茲／去，", segments: ["揮手", "自茲", "去"] },
    { full: "蕭蕭／班馬鳴。", segments: ["蕭蕭", "班馬鳴"] },
  ],

  mulanLines: [
    { full: "唧唧／復唧唧，", segments: ["唧唧", "復唧唧"] },
    { full: "木蘭／當戶／織。", segments: ["木蘭", "當戶", "織"] },
    { full: "不聞／機杼聲，", segments: ["不聞", "機杼聲"] },
    { full: "唯聞／女歎息。", segments: ["唯聞", "女歎息"] },
    { full: "問女／何所／思，", segments: ["問女", "何所", "思"] },
    { full: "問女／何所／憶。", segments: ["問女", "何所", "憶"] },
    { full: "女亦／無所／思，", segments: ["女亦", "無所", "思"] },
    { full: "女亦／無所／憶。", segments: ["女亦", "無所", "憶"] },
    { full: "昨夜／見軍帖，", segments: ["昨夜", "見軍帖"] },
    { full: "可汗／大／點兵。", segments: ["可汗", "大", "點兵"] },
    { full: "軍書／十二卷，", segments: ["軍書", "十二卷"] },
    { full: "卷卷／有爺名。", segments: ["卷卷", "有爺名"] },
    { full: "阿爺／無大兒，", segments: ["阿爺", "無大兒"] },
    { full: "木蘭／無長兄。", segments: ["木蘭", "無長兄"] },
    { full: "願為／市／鞍馬，", segments: ["願為", "市", "鞍馬"] },
    { full: "從此／替爺／征。", segments: ["從此", "替爺", "征"] },
  ],
};

window.GAME_DATA.buildPauseQuestions = function (lines, poemName) {
  return lines.map((line, idx) => ({
    type: "pause",
    poem: poemName,
    lineIndex: idx,
    prompt: `請按正確停頓，依次擊落詞組\n${line.full}`,
    full: line.full,
    segments: line.segments.slice(),
    explain: `正確停頓：${line.segments.join("／")}`,
  }));
};

window.GAME_DATA.getLevelQuestions = function (levelId) {
  const d = window.GAME_DATA;
  if (levelId === "person") return d.person.map((q) => ({ ...q, unit: "人稱" }));
  if (levelId === "method") return d.method.map((q) => ({ ...q, unit: "方法" }));
  if (levelId === "songyou") {
    return d.buildPauseQuestions(d.songyouLines, "《送友人》").map((q) => ({ ...q, unit: "送友人" }));
  }
  if (levelId === "mulan") {
    return d.buildPauseQuestions(d.mulanLines, "《木蘭詩》").map((q) => ({ ...q, unit: "木蘭詩" }));
  }
  if (levelId === "boss") {
    const pick = (arr, n) => {
      const copy = arr.slice();
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy.slice(0, n);
    };
    const personQ = pick(d.person, 3).map((q) => ({ ...q, unit: "人稱" }));
    const methodQ = pick(
      d.method.filter((q) => q.type === "choice"),
      3
    ).map((q) => ({ ...q, unit: "方法" }));
    const songQ = pick(d.buildPauseQuestions(d.songyouLines, "《送友人》"), 2).map((q) => ({
      ...q,
      unit: "送友人",
    }));
    const mulanQ = pick(d.buildPauseQuestions(d.mulanLines, "《木蘭詩》"), 2).map((q) => ({
      ...q,
      unit: "木蘭詩",
    }));
    const all = [...personQ, ...methodQ, ...songQ, ...mulanQ];
    return pick(all, all.length);
  }
  return [];
};
