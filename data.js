/* 記敘與唐詩 · 學習射擊 — 擴充題庫（隨機抽題／選項洗牌） */
window.GAME_DATA = {
  title: "記敘與唐詩 · 學習射擊",
  subtitle: "人稱 · 記敘方法 · 唐詩停頓",

  /* 每關從大題庫抽出的題數 */
  drawCount: {
    person: 10,
    method: 10,
    songyou: 10,
    mulan: 12,
    boss: 12,
  },

  levels: [
    { id: "person", name: "第一關 · 人稱射擊場", unit: "人稱", desc: "隨機出題：辨認第一／二／三人稱及其效果" },
    { id: "method", name: "第二關 · 記敘方法", unit: "方法", desc: "隨機出題：順敘、倒敘、插敘與順序" },
    { id: "songyou", name: "第三關 · 《送友人》", unit: "送友人", desc: "隨機抽詩句停頓＋詩意理解題" },
    { id: "mulan", name: "第四關 · 《木蘭詩》", unit: "木蘭詩", desc: "隨機抽詩句停頓＋詩意理解題" },
    { id: "boss", name: "總複習 Boss", unit: "綜合", desc: "綜合隨機亂鬥，每次組合不同" },
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

  /* ========== 人稱題庫（擴大） ========== */
  person: [
    { type: "choice", prompt: "以「當事人」身份敘述，使用的人稱是？", options: ["第一人稱「我」", "第二人稱「你」", "第三人稱「他」"], answer: 0, explain: "第一人稱以「當事人」身份敘述。" },
    { type: "choice", prompt: "以「對方」為敘事對象，使用的人稱是？", options: ["第一人稱「我」", "第二人稱「你」", "第三人稱「他」"], answer: 1, explain: "第二人稱以「對方」為敘事對象。" },
    { type: "choice", prompt: "以「旁觀者」身份敘述，使用的人稱是？", options: ["第一人稱「我」", "第二人稱「你」", "第三人稱「他」"], answer: 2, explain: "第三人稱以旁觀者身份敘述。" },
    { type: "choice", prompt: "哪一種人稱最能讓讀者「親歷其境、感同身受」？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 0, explain: "第一人稱的效果是親歷其境，引起共鳴。" },
    { type: "choice", prompt: "哪一種人稱能「拉近與讀者的距離，感覺親切」？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 1, explain: "第二人稱直接對話，感覺親切。" },
    { type: "choice", prompt: "哪一種人稱能讓讀者「全面了解事件、掌握各角色心理」？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 2, explain: "第三人稱便於全面了解與掌握心理。" },
    { type: "choice", prompt: "「我那天站在校門口，心怦怦跳。」主要運用？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 0, explain: "「我」是當事人，屬第一人稱。" },
    { type: "choice", prompt: "【練習短句】「你可曾想過，那天如果沒有回頭？」主要運用？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 1, explain: "「你」以對方為對象，屬第二人稱。" },
    { type: "choice", prompt: "「他靜靜看著窗外，誰也不知道他在想什麼。」主要運用？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 2, explain: "「他」屬第三人稱旁觀敘述。" },
    { type: "choice", prompt: "想引起讀者共鳴、彷彿親身經歷，宜多用？", options: ["第一人稱", "僅用倒敘", "不含人稱的說明文"], answer: 0, explain: "第一人稱的好處是親歷其境、感同身受。" },
    { type: "choice", prompt: "第一人稱常用的代詞是？", options: ["我", "你", "他"], answer: 0, explain: "第一人稱以「我」為敘述主體。" },
    { type: "choice", prompt: "第二人稱常用的代詞是？", options: ["我", "你", "他們"], answer: 1, explain: "第二人稱以「你」為敘事對象。" },
    { type: "choice", prompt: "第三人稱常用的代詞是？", options: ["我／我們", "你／你們", "他／她／他們"], answer: 2, explain: "第三人稱常用他／她／他們。" },
    { type: "choice", prompt: "「我們一起衝過終點線。」這句主要是？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 0, explain: "「我們」仍屬第一人稱複數。" },
    { type: "choice", prompt: "【練習短句】「請你記住這一刻的陽光。」主要是？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 1, explain: "呼喚「你」，屬第二人稱練習短句。" },
    { type: "choice", prompt: "「小明低頭不語，老師卻看穿了他的不安。」主要是？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 2, explain: "以旁觀者寫人物，屬第三人稱。" },
    { type: "choice", prompt: "下列哪項是第一人稱的主要好處？", options: ["親歷其境、引起共鳴", "製造懸念、追看下文", "補充情節、突出性格"], answer: 0, explain: "親歷其境、感同身受並引起共鳴是第一人稱效果。" },
    { type: "choice", prompt: "下列哪項是第二人稱的主要好處？", options: ["全面掌握所有角色心理", "拉近距離、感覺親切", "按時間順序交代清楚"], answer: 1, explain: "第二人稱拉近與讀者距離，感覺親切。" },
    { type: "choice", prompt: "下列哪項是第三人稱的主要好處？", options: ["像與讀者直接對話", "只寫自己的感覺", "全面了解事件與人物心理"], answer: 2, explain: "第三人稱便於全面了解事件與角色心理。" },
    { type: "choice", prompt: "若作者想同時寫出甲乙丙三人的內心，較適合？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 2, explain: "第三人稱旁觀較易掌握多角色心理。" },
    { type: "choice", prompt: "日記、遊記最常使用哪一種人稱？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 0, explain: "日記、遊記多用「我」敘述親身經歷。" },
    { type: "choice", prompt: "廣告口號常說「這是為你而設」，傾向？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 1, explain: "對「你」說話，屬第二人稱手法。" },
    { type: "choice", prompt: "小說全知視角常對應哪一種人稱？", options: ["第一人稱", "第二人稱", "第三人稱"], answer: 2, explain: "全知旁觀多以第三人稱呈現。" },
    { type: "choice", prompt: "「我聽見雨打在鐵皮屋上。」強調的是？", options: ["當事人親身感受", "對讀者直接呼喚", "旁觀多名角色"], answer: 0, explain: "第一人稱強調當事人親歷感受。" },
    { type: "choice", prompt: "「你一踏進教室，就聽見掌聲。」主要效果是？", options: ["拉開距離、冷眼旁觀", "拉近距離、彷彿對話", "只交代時間順序"], answer: 1, explain: "第二人稱令讀者感覺被直接對話。" },
    { type: "choice", prompt: "下列哪句屬第三人稱？", options: ["我決定明天再試", "你別放棄啊", "她終於露出微笑"], answer: 2, explain: "「她」為第三人稱。" },
    { type: "choice", prompt: "下列哪句屬第一人稱？", options: ["他們爭論不休", "我幾乎忘了害怕", "你聽見了嗎"], answer: 1, explain: "「我」為第一人稱。" },
    { type: "choice", prompt: "下列哪句屬第二人稱？（練習短句）", options: ["他點了點頭", "我關上燈", "你走在長廊上"], answer: 2, explain: "「你」為第二人稱練習短句。" },
  ],

  /* ========== 記敘方法題庫（擴大） ========== */
  method: [
    { type: "choice", prompt: "按事情發生的先後次序／時間順序排列，稱為？", options: ["順敘", "倒敘", "插敘"], answer: 0, explain: "順敘按時間先後排列。" },
    { type: "choice", prompt: "先寫結果或重要情節，再交代原因和經過，稱為？", options: ["順敘", "倒敘", "插敘"], answer: 1, explain: "倒敘先寫結果／重要情節。" },
    { type: "choice", prompt: "中斷原來記敘，插入相關片段後再恢復，稱為？", options: ["順敘", "倒敘", "插敘"], answer: 2, explain: "插敘是中斷後插入關鍵片段。" },
    { type: "choice", prompt: "「結構清晰，掌握來龍去脈與感情轉變」是哪種方法的好處？", options: ["順敘", "倒敘", "插敘"], answer: 0, explain: "這是順敘的效果及好處。" },
    { type: "choice", prompt: "「製造懸念，吸引追看下文」是哪種方法的好處？", options: ["順敘", "倒敘", "插敘"], answer: 1, explain: "這是倒敘的效果及好處。" },
    { type: "choice", prompt: "「突出性格／感情變化，補充情節」屬於哪種方法的好處？", options: ["順敘", "倒敘", "插敘"], answer: 2, explain: "這是插敘的效果及好處。" },
    { type: "order", prompt: "請按「順敘」正確順序擊落牌子", options: ["原因", "經過", "結果"], answer: ["原因", "經過", "結果"], explain: "順敘：原因 → 經過 → 結果。" },
    { type: "order", prompt: "請按「倒敘」常見順序擊落牌子", options: ["結果", "原因", "經過"], answer: ["結果", "原因", "經過"], explain: "倒敘：結果 → 原因 → 經過。" },
    { type: "order", prompt: "請按「插敘」結構順序擊落牌子", options: ["原因", "經過", "過去片段", "結果"], answer: ["原因", "經過", "過去片段", "結果"], explain: "插敘：原因 → 經過 → 過去片段 → 結果。" },
    { type: "choice", prompt: "文章開頭先寫比賽落敗，再回想訓練過程，主要是？", options: ["順敘", "倒敘", "插敘"], answer: 1, explain: "先寫結果再補原因經過，屬倒敘。" },
    { type: "choice", prompt: "由早上寫到晚上，事件依時間推進，主要是？", options: ["順敘", "倒敘", "插敘"], answer: 0, explain: "依時間先後，屬順敘。" },
    { type: "choice", prompt: "正寫比賽中途，忽然插入童年學琴片段，再續寫比賽，屬？", options: ["順敘", "倒敘", "插敘"], answer: 2, explain: "中斷插入過去片段，屬插敘。" },
    { type: "choice", prompt: "順敘的基本順序是？", options: ["原因→經過→結果", "結果→原因→經過", "結果→過去片段→原因"], answer: 0, explain: "順敘：原因 → 經過 → 結果。" },
    { type: "choice", prompt: "倒敘常見順序是？", options: ["原因→經過→結果", "結果→原因→經過", "經過→結果→原因"], answer: 1, explain: "倒敘：結果 → 原因 → 經過。" },
    { type: "choice", prompt: "插敘結構可寫成？", options: ["結果→原因→經過", "原因→經過→過去片段→結果", "過去片段→結果→原因"], answer: 1, explain: "插敘：原因→經過→過去片段→結果。" },
    { type: "choice", prompt: "想避免平鋪直敘、製造懸念，可用？", options: ["順敘", "倒敘", "只寫對話"], answer: 1, explain: "倒敘能製造懸念、吸引追看。" },
    { type: "choice", prompt: "想讓讀者清楚掌握來龍去脈，宜用？", options: ["順敘", "倒敘", "完全省略經過"], answer: 0, explain: "順敘結構清晰，來龍去脈分明。" },
    { type: "choice", prompt: "想補充背景、突出人物性格，可用？", options: ["純景物描寫", "插敘", "刪去所有回憶"], answer: 1, explain: "插敘可補充情節、突出性格與感情。" },
    { type: "choice", prompt: "先寫「獎盃高舉」，再寫訓練與比賽過程，屬？", options: ["順敘", "倒敘", "插敘"], answer: 1, explain: "先結果後經過，屬倒敘。" },
    { type: "choice", prompt: "「起床→上學→放學→寫作業」這種寫法屬？", options: ["順敘", "倒敘", "插敘"], answer: 0, explain: "依時間先後，屬順敘。" },
    { type: "choice", prompt: "正文寫考試，突然插入去年失敗記憶，再回到考場，屬？", options: ["順敘", "倒敘", "插敘"], answer: 2, explain: "插入過去片段後恢復，屬插敘。" },
    { type: "choice", prompt: "倒敘的主要好處不包括？", options: ["製造懸念", "吸引追看下文", "一定比順敘更短"], answer: 2, explain: "倒敘重點是懸念與趣味，未必更短。" },
    { type: "choice", prompt: "插敘的主要好處不包括？", options: ["突出性格形象", "補充情節", "必定取消主線"], answer: 2, explain: "插敘補充後仍回復主線，不會取消主線。" },
    { type: "choice", prompt: "下列哪組最能對應順敘好處？", options: ["結構清晰、感情轉變清楚", "只製造混亂", "完全不要結果"], answer: 0, explain: "順敘讓來龍去脈與感情轉變清晰。" },
    { type: "choice", prompt: "開頭寫「那場雨改變了一切」，再回溯雨前故事，屬？", options: ["順敘", "倒敘", "插敘"], answer: 1, explain: "先提示結果／重要點再回溯，屬倒敘。" },
    { type: "choice", prompt: "寫旅行途中，插入對故鄉的短暫回憶，再繼續行程，屬？", options: ["順敘", "倒敘", "插敘"], answer: 2, explain: "短暫插入回憶後恢復，屬插敘。" },
    { type: "order", prompt: "把「倒敘」三步依正確次序擊落", options: ["結果", "原因", "經過"], answer: ["結果", "原因", "經過"], explain: "倒敘：結果 → 原因 → 經過。" },
    { type: "order", prompt: "把「順敘」三步依正確次序擊落", options: ["原因", "經過", "結果"], answer: ["原因", "經過", "結果"], explain: "順敘：原因 → 經過 → 結果。" },
  ],

  /* 詩句停頓 */
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

  /* 詩意／作者理解題（與停頓題混合） */
  songyouQuiz: [
    { type: "choice", prompt: "《送友人》的作者是？", options: ["李白", "杜甫", "王維"], answer: 0, explain: "《送友人》作者為李白。" },
    { type: "choice", prompt: "「孤蓬萬里征」的「孤蓬」常比喻？", options: ["漂泊的遊子", "堅固的城牆", "盛開的桃花"], answer: 0, explain: "孤蓬比喻漂泊無依的遊子。" },
    { type: "choice", prompt: "「浮雲遊子意，落日故人情」主要寫？", options: ["送別之情", "邊塞征戰", "田園隱居"], answer: 0, explain: "以浮雲、落日寫離情與故人意。" },
    { type: "choice", prompt: "「青山橫北郭，白水繞東城」屬？", options: ["寫景起興", "議論說理", "純對話"], answer: 0, explain: "以山水景物起筆。" },
    { type: "choice", prompt: "「揮手自茲去」的「茲」意思接近？", options: ["此、這裏", "昨天", "敵人"], answer: 0, explain: "「茲」即此、這裏。" },
    { type: "choice", prompt: "「蕭蕭班馬鳴」渲染的氣氛是？", options: ["離別不捨", "歡慶豐收", "科考成功"], answer: 0, explain: "馬鳴蕭蕭烘托離別之情。" },
    { type: "choice", prompt: "「此地一為別」的「為別」指？", options: ["分別", "相聚", "比賽"], answer: 0, explain: "為別即分別、作別。" },
    { type: "choice", prompt: "本詩體裁屬？", options: ["五言律詩", "七言絕句", "詞"], answer: 0, explain: "《送友人》為五言律詩。" },
  ],

  mulanQuiz: [
    { type: "choice", prompt: "《木蘭詩》作者一般標作？", options: ["佚名", "李白", "白居易"], answer: 0, explain: "《木蘭詩》通常題為佚名。" },
    { type: "choice", prompt: "「木蘭當戶織」寫木蘭正在？", options: ["織布", "練劍", "讀書"], answer: 0, explain: "當戶織即在門前織布。" },
    { type: "choice", prompt: "「不聞機杼聲，唯聞女歎息」表示？", options: ["木蘭心有所憂", "織布特別快", "家中無人"], answer: 0, explain: "機杼聲停而歎息，顯示心事。" },
    { type: "choice", prompt: "「可汗大點兵」的「點兵」指？", options: ["徵兵、調兵", "點名吃飯", "比賽射箭"], answer: 0, explain: "點兵即大規模徵調兵員。" },
    { type: "choice", prompt: "「卷卷有爺名」說明？", options: ["軍書每卷都有父親名字", "木蘭愛書法", "爺已出征多次"], answer: 0, explain: "每卷軍書都寫著父親之名。" },
    { type: "choice", prompt: "「願為市鞍馬，從此替爺征」寫木蘭？", options: ["買鞍馬代父從軍", "拒絕出征", "只想織布"], answer: 0, explain: "她願買鞍馬替父出征。" },
    { type: "choice", prompt: "「阿爺無大兒，木蘭無長兄」指出家庭？", options: ["沒有可替代出征的兄弟", "兄弟很多", "父親很年輕"], answer: 0, explain: "家中無長兄可代父從軍。" },
    { type: "choice", prompt: "「唧唧復唧唧」傳統多解作？", options: ["織機聲或歎息聲", "馬蹄聲", "鼓聲"], answer: 0, explain: "多解為織機聲或歎息聲起興。" },
    { type: "choice", prompt: "「問女何所思，問女何所憶」是誰在問？", options: ["家人關心詢問", "可汗親自問", "敵人拷問"], answer: 0, explain: "是家人詢問木蘭所思所憶。" },
    { type: "choice", prompt: "木蘭回覆「無所思／無所憶」後真正原因是？", options: ["見軍帖、父親被徵", "不想織布", "想去遊山"], answer: 0, explain: "因見軍帖、父親在徵兵之列而憂。" },
  ],
};

/* ---------- 工具：洗牌／抽題／選項隨機 ---------- */
window.GAME_DATA.shuffle = function (arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

window.GAME_DATA.pick = function (arr, n) {
  const shuffled = window.GAME_DATA.shuffle(arr);
  return shuffled.slice(0, Math.min(n, shuffled.length));
};

/** 選擇題：打亂選項並重算 answer 索引 */
window.GAME_DATA.prepareQuestion = function (q) {
  const copy = {
    ...q,
    options: q.options ? q.options.slice() : undefined,
    answer: Array.isArray(q.answer) ? q.answer.slice() : q.answer,
    segments: q.segments ? q.segments.slice() : undefined,
  };
  if (copy.type === "choice" && copy.options) {
    const correctText = copy.options[copy.answer];
    copy.options = window.GAME_DATA.shuffle(copy.options);
    copy.answer = copy.options.indexOf(correctText);
  }
  return copy;
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
  const n = d.drawCount[levelId] || 10;
  const tag = (qs, unit) => qs.map((q) => d.prepareQuestion({ ...q, unit }));

  if (levelId === "person") {
    return tag(d.pick(d.person, n), "人稱");
  }
  if (levelId === "method") {
    return tag(d.pick(d.method, n), "方法");
  }
  if (levelId === "songyou") {
    const pauses = d.pick(d.buildPauseQuestions(d.songyouLines, "《送友人》"), 6);
    const quizzes = d.pick(d.songyouQuiz, Math.max(2, n - pauses.length));
    return tag(d.shuffle([...pauses, ...quizzes]), "送友人").slice(0, n);
  }
  if (levelId === "mulan") {
    const pauses = d.pick(d.buildPauseQuestions(d.mulanLines, "《木蘭詩》"), 8);
    const quizzes = d.pick(d.mulanQuiz, Math.max(2, n - pauses.length));
    return tag(d.shuffle([...pauses, ...quizzes]), "木蘭詩").slice(0, n);
  }
  if (levelId === "boss") {
    const personQ = d.pick(d.person, 3);
    const methodQ = d.pick(d.method, 3);
    const songPause = d.pick(d.buildPauseQuestions(d.songyouLines, "《送友人》"), 2);
    const mulanPause = d.pick(d.buildPauseQuestions(d.mulanLines, "《木蘭詩》"), 2);
    const songQuiz = d.pick(d.songyouQuiz, 1);
    const mulanQuiz = d.pick(d.mulanQuiz, 1);
    const mixed = d.shuffle([
      ...personQ.map((q) => ({ ...q, unit: "人稱" })),
      ...methodQ.map((q) => ({ ...q, unit: "方法" })),
      ...songPause.map((q) => ({ ...q, unit: "送友人" })),
      ...mulanPause.map((q) => ({ ...q, unit: "木蘭詩" })),
      ...songQuiz.map((q) => ({ ...q, unit: "送友人" })),
      ...mulanQuiz.map((q) => ({ ...q, unit: "木蘭詩" })),
    ]);
    return mixed.slice(0, n).map((q) => d.prepareQuestion(q));
  }
  return [];
};
