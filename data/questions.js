

const allQuestions = [

  /* ---------- LEVEL 1: greetings (2–3 chunks) ---------- */
  { level: 1, words: ["你", "好"], answer: ["你", "好"], chinese: "你好", pinyin: "nǐ hǎo", en: "Hello", th: "สวัสดี" },
  { level: 1, words: ["谢谢", "你"], answer: ["谢谢", "你"], chinese: "谢谢你", pinyin: "xièxie nǐ", en: "Thank you", th: "ขอบคุณ" },
  { level: 1, words: ["早上", "好"], answer: ["早上", "好"], chinese: "早上好", pinyin: "zǎoshang hǎo", en: "Good morning", th: "สวัสดีตอนเช้า" },
  { level: 1, words: ["晚", "安"], answer: ["晚", "安"], chinese: "晚安", pinyin: "wǎn ān", en: "Good night", th: "ราตรีสวัสดิ์" },
  { level: 1, words: ["再", "见"], answer: ["再", "见"], chinese: "再见", pinyin: "zàijiàn", en: "Goodbye", th: "ลาก่อน" },
  { level: 1, words: ["你", "好吗"], answer: ["你", "好吗"], chinese: "你好吗", pinyin: "nǐ hǎo ma", en: "How are you?", th: "คุณสบายดีไหม" },
  { level: 1, words: ["我", "很", "好"], answer: ["我", "很", "好"], chinese: "我很好", pinyin: "wǒ hěn hǎo", en: "I'm fine", th: "ฉันสบายดี" },
  { level: 1, words: ["不", "客气"], answer: ["不", "客气"], chinese: "不客气", pinyin: "bú kèqi", en: "You're welcome", th: "ไม่เป็นไร" },

  /* ---------- LEVEL 2: subject + verb + object (3 chunks) ---------- */
  { level: 2, words: ["我", "是", "学生"], answer: ["我", "是", "学生"], chinese: "我是学生", pinyin: "wǒ shì xuésheng", en: "I am a student", th: "ฉันเป็นนักเรียน" },
  { level: 2, words: ["我", "喜欢", "中文"], answer: ["我", "喜欢", "中文"], chinese: "我喜欢中文", pinyin: "wǒ xǐhuan Zhōngwén", en: "I like Chinese", th: "ฉันชอบภาษาจีน" },
  { level: 2, words: ["我", "爱", "中国"], answer: ["我", "爱", "中国"], chinese: "我爱中国", pinyin: "wǒ ài Zhōngguó", en: "I love China", th: "ฉันรักประเทศจีน" },
  { level: 2, words: ["他", "是", "老师"], answer: ["他", "是", "老师"], chinese: "他是老师", pinyin: "tā shì lǎoshī", en: "He is a teacher", th: "เขาเป็นครู" },
  { level: 2, words: ["她", "是", "医生"], answer: ["她", "是", "医生"], chinese: "她是医生", pinyin: "tā shì yīshēng", en: "She is a doctor", th: "เธอเป็นหมอ" },
  { level: 2, words: ["我", "喝", "咖啡"], answer: ["我", "喝", "咖啡"], chinese: "我喝咖啡", pinyin: "wǒ hē kāfēi", en: "I drink coffee", th: "ฉันดื่มกาแฟ" },
  { level: 2, words: ["我", "吃", "苹果"], answer: ["我", "吃", "苹果"], chinese: "我吃苹果", pinyin: "wǒ chī píngguǒ", en: "I eat an apple", th: "ฉันกินแอปเปิล" },
  { level: 2, words: ["我们", "是", "朋友"], answer: ["我们", "是", "朋友"], chinese: "我们是朋友", pinyin: "wǒmen shì péngyou", en: "We are friends", th: "เราเป็นเพื่อนกัน" },

  /* ---------- LEVEL 3: questions (3 chunks) ---------- */
  { level: 3, words: ["你", "叫什么", "名字"], answer: ["你", "叫什么", "名字"], chinese: "你叫什么名字", pinyin: "nǐ jiào shénme míngzi", en: "What is your name?", th: "คุณชื่ออะไร" },
  { level: 3, words: ["你", "吃饭", "了吗"], answer: ["你", "吃饭", "了吗"], chinese: "你吃饭了吗", pinyin: "nǐ chīfàn le ma", en: "Have you eaten?", th: "คุณกินข้าวหรือยัง" },
  { level: 3, words: ["今天", "天气", "很好"], answer: ["今天", "天气", "很好"], chinese: "今天天气很好", pinyin: "jīntiān tiānqì hěn hǎo", en: "The weather is nice today", th: "วันนี้อากาศดีมาก" },
  { level: 3, words: ["你", "多大", "了"], answer: ["你", "多大", "了"], chinese: "你多大了", pinyin: "nǐ duō dà le", en: "How old are you?", th: "คุณอายุเท่าไหร่" },
  { level: 3, words: ["你", "住在", "哪里"], answer: ["你", "住在", "哪里"], chinese: "你住在哪里", pinyin: "nǐ zhù zài nǎlǐ", en: "Where do you live?", th: "คุณอาศัยอยู่ที่ไหน" },
  { level: 3, words: ["现在", "几点", "了"], answer: ["现在", "几点", "了"], chinese: "现在几点了", pinyin: "xiànzài jǐ diǎn le", en: "What time is it now?", th: "ตอนนี้กี่โมงแล้ว" },
  { level: 3, words: ["这个", "多少", "钱"], answer: ["这个", "多少", "钱"], chinese: "这个多少钱", pinyin: "zhège duōshao qián", en: "How much is this?", th: "อันนี้ราคาเท่าไหร่" },
  { level: 3, words: ["他", "喜欢", "什么"], answer: ["他", "喜欢", "什么"], chinese: "他喜欢什么", pinyin: "tā xǐhuan shénme", en: "What does he like?", th: "เขาชอบอะไร" },

  /* ---------- LEVEL 4: longer sentences (4–5 chunks) ---------- */
  { level: 4, words: ["我", "每天", "早上", "六点", "起床"], answer: ["我", "每天", "早上", "六点", "起床"], chinese: "我每天早上六点起床", pinyin: "wǒ měitiān zǎoshang liù diǎn qǐchuáng", en: "I get up at six every morning", th: "ฉันตื่นนอนตอนหกโมงเช้าทุกวัน" },
  { level: 4, words: ["我", "每天", "下午", "打", "篮球"], answer: ["我", "每天", "下午", "打", "篮球"], chinese: "我每天下午打篮球", pinyin: "wǒ měitiān xiàwǔ dǎ lánqiú", en: "I play basketball every afternoon", th: "ฉันเล่นบาสเก็ตบอลทุกบ่าย" },
  { level: 4, words: ["我", "喜欢", "听", "中文", "歌曲"], answer: ["我", "喜欢", "听", "中文", "歌曲"], chinese: "我喜欢听中文歌曲", pinyin: "wǒ xǐhuan tīng Zhōngwén gēqǔ", en: "I like listening to Chinese songs", th: "ฉันชอบฟังเพลงจีน" },
  { level: 4, words: ["他", "昨天", "下午", "去了", "超市"], answer: ["他", "昨天", "下午", "去了", "超市"], chinese: "他昨天下午去了超市", pinyin: "tā zuótiān xiàwǔ qùle chāoshì", en: "He went to the supermarket yesterday afternoon", th: "เมื่อวานบ่ายเขาไปซูเปอร์มาร์เก็ต" },
  { level: 4, words: ["我", "明天", "要", "去", "学校"], answer: ["我", "明天", "要", "去", "学校"], chinese: "我明天要去学校", pinyin: "wǒ míngtiān yào qù xuéxiào", en: "I will go to school tomorrow", th: "พรุ่งนี้ฉันจะไปโรงเรียน" },
  { level: 4, words: ["她", "每个", "周末", "学", "中文"], answer: ["她", "每个", "周末", "学", "中文"], chinese: "她每个周末学中文", pinyin: "tā měige zhōumò xué Zhōngwén", en: "She studies Chinese every weekend", th: "เธอเรียนภาษาจีนทุกสุดสัปดาห์" },
  { level: 4, words: ["我们", "一起", "去", "公园", "玩"], answer: ["我们", "一起", "去", "公园", "玩"], chinese: "我们一起去公园玩", pinyin: "wǒmen yìqǐ qù gōngyuán wán", en: "We go to the park together to play", th: "เราไปเล่นที่สวนสาธารณะด้วยกัน" },

  /* ---------- LEVEL 5: complex sentences (6–7 chunks) ---------- */
  { level: 5, words: ["我们", "下个", "星期", "要", "去", "北京", "旅游"], answer: ["我们", "下个", "星期", "要", "去", "北京", "旅游"], chinese: "我们下个星期要去北京旅游", pinyin: "wǒmen xiàge xīngqī yào qù Běijīng lǚyóu", en: "We are going to travel to Beijing next week", th: "สัปดาห์หน้าเราจะไปเที่ยวปักกิ่ง" },
  { level: 5, words: ["她", "每天", "晚上", "都", "看", "一本", "书"], answer: ["她", "每天", "晚上", "都", "看", "一本", "书"], chinese: "她每天晚上都看一本书", pinyin: "tā měitiān wǎnshàng dōu kàn yìběn shū", en: "She reads a book every night", th: "เธออ่านหนังสือทุกคืน" },
  { level: 5, words: ["他", "昨天", "和", "朋友", "一起", "去", "电影院"], answer: ["他", "昨天", "和", "朋友", "一起", "去", "电影院"], chinese: "他昨天和朋友一起去电影院", pinyin: "tā zuótiān hé péngyou yìqǐ qù diànyǐngyuàn", en: "He went to the cinema with friends yesterday", th: "เมื่อวานเขาไปโรงหนังกับเพื่อน" },
  { level: 5, words: ["我妈妈", "每天", "早上", "都", "做", "早饭"], answer: ["我妈妈", "每天", "早上", "都", "做", "早饭"], chinese: "我妈妈每天早上都做早饭", pinyin: "wǒ māma měitiān zǎoshang dōu zuò zǎofàn", en: "My mom makes breakfast every morning", th: "แม่ของฉันทำอาหารเช้าทุกเช้า" },
  { level: 5, words: ["他", "每个", "星期天", "都", "去", "图书馆", "看书"], answer: ["他", "每个", "星期天", "都", "去", "图书馆", "看书"], chinese: "他每个星期天都去图书馆看书", pinyin: "tā měige xīngqītiān dōu qù túshūguǎn kànshū", en: "He goes to the library to read every Sunday", th: "เขาไปห้องสมุดอ่านหนังสือทุกวันอาทิตย์" },
  { level: 5, words: ["我们", "下个月", "要", "去", "日本", "旅行"], answer: ["我们", "下个月", "要", "去", "日本", "旅行"], chinese: "我们下个月要去日本旅行", pinyin: "wǒmen xiàge yuè yào qù Rìběn lǚxíng", en: "We are going to travel to Japan next month", th: "เดือนหน้าเราจะไปเที่ยวญี่ปุ่น" }

];
