// ─── TAROT DECK (78 cards, abbreviated — extend with full meanings) ───
export const TAROT_DECK = [
  // Major Arcana
  { id: 0, name_en: 'The Fool', name_zhTW: '愚者', name_zhCN: '愚者', arcana: 'major', image: '🃏',
    upright_en: 'New beginnings, innocence, spontaneity, a free spirit', upright_zhTW: '新的開始，純真，自發性，自由精神', upright_zhCN: '新的开始，纯真，自发性，自由精神',
    reversed_en: 'Holding back, recklessness, risk-taking', reversed_zhTW: '猶豫不決，魯莽，冒险', reversed_zhCN: '犹豫不决，鲁莽，冒险' },
  { id: 1, name_en: 'The Magician', name_zhTW: '魔術師', name_zhCN: '魔术师', arcana: 'major', image: '✨',
    upright_en: 'Manifestation, resourcefulness, power, inspired action', upright_zhTW: '顯化，機智，力量，靈感行動', upright_zhCN: '显化，机智，力量，灵感行动',
    reversed_en: 'Manipulation, poor planning, untapped talents', reversed_zhTW: '操控，計劃不周，未開發的才能', reversed_zhCN: '操控，计划不周，未开发的才能' },
  { id: 2, name_en: 'The High Priestess', name_zhTW: '女祭司', name_zhCN: '女祭司', arcana: 'major', image: '🌙',
    upright_en: 'Intuition, sacred knowledge, divine feminine, the subconscious', upright_zhTW: '直覺，神聖知識，神聖陰性，潛意識', upright_zhCN: '直觉，神圣知识，神圣阴性，潜意识',
    reversed_en: 'Secrets, disconnected from intuition, withdrawal', reversed_zhTW: '秘密，與直覺脫節，退縮', reversed_zhCN: '秘密，与直觉脱节，退缩' },
  { id: 3, name_en: 'The Empress', name_zhTW: '女皇', name_zhCN: '女皇', arcana: 'major', image: '👑',
    upright_en: 'Femininity, beauty, nature, nurturing, abundance', upright_zhTW: '女性氣質，美麗，自然，養育，豐盛', upright_zhCN: '女性气质，美丽，自然，养育，丰盛',
    reversed_en: 'Creative block, dependence on others', reversed_zhTW: '創意阻塞，依賴他人', reversed_zhCN: '创意阻塞，依赖他人' },
  { id: 4, name_en: 'The Emperor', name_zhTW: '皇帝', name_zhCN: '皇帝', arcana: 'major', image: '⚡',
    upright_en: 'Authority, establishment, structure, a father figure', upright_zhTW: '權威，建立，結構，父親形象', upright_zhCN: '权威，建立，结构，父亲形象',
    reversed_en: 'Domination, excessive control, rigidity', reversed_zhTW: '支配，過度控制，僵化', reversed_zhCN: '支配，过度控制，僵化' },
  { id: 5, name_en: 'The Hierophant', name_zhTW: '教皇', name_zhCN: '教皇', arcana: 'major', image: '⛪',
    upright_en: 'Spiritual wisdom, religious beliefs, conformity, tradition', upright_zhTW: '靈性智慧，宗教信仰，傳統', upright_zhCN: '灵性智慧，宗教信仰，传统',
    reversed_en: 'Personal beliefs, freedom, challenging the status quo', reversed_zhTW: '個人信仰，自由，挑戰現狀', reversed_zhCN: '个人信仰，自由，挑战现状' },
  { id: 6, name_en: 'The Lovers', name_zhTW: '戀人', name_zhCN: '恋人', arcana: 'major', image: '💞',
    upright_en: 'Love, harmony, relationships, values alignment, choices', upright_zhTW: '愛情，和諧，關係，價值觀一致，選擇', upright_zhCN: '爱情，和谐，关系，价值观一致，选择',
    reversed_en: 'Self-love, disharmony, imbalance, misaligned values', reversed_zhTW: '自愛，不和諧，失衡，價值觀不一致', reversed_zhCN: '自爱，不和谐，失衡，价值观不一致' },
  { id: 7, name_en: 'The Chariot', name_zhTW: '戰車', name_zhCN: '战车', arcana: 'major', image: '🏆',
    upright_en: 'Control, willpower, success, determination, direction', upright_zhTW: '控制，意志力，成功，決心，方向', upright_zhCN: '控制，意志力，成功，决心，方向',
    reversed_en: 'Self-discipline, opposition, lack of direction', reversed_zhTW: '自律，阻力，缺乏方向', reversed_zhCN: '自律，阻力，缺乏方向' },
  { id: 8, name_en: 'Strength', name_zhTW: '力量', name_zhCN: '力量', arcana: 'major', image: '🦁',
    upright_en: 'Strength, courage, persuasion, influence, compassion', upright_zhTW: '力量，勇氣，說服，影響，慈悲', upright_zhCN: '力量，勇气，说服，影响，慈悲',
    reversed_en: 'Inner strength, self-doubt, low energy', reversed_zhTW: '內在力量，自我懷疑，能量低落', reversed_zhCN: '内在力量，自我怀疑，能量低落' },
  { id: 9, name_en: 'The Hermit', name_zhTW: '隱士', name_zhCN: '隐士', arcana: 'major', image: '🕯️',
    upright_en: 'Soul-searching, introspection, being alone, inner guidance', upright_zhTW: '靈魂探索，內省，獨處，內在引導', upright_zhCN: '灵魂探索，内省，独处，内在引导',
    reversed_en: 'Isolation, loneliness, withdrawal', reversed_zhTW: '孤立，孤獨，退縮', reversed_zhCN: '孤立，孤独，退缩' },
  { id: 10, name_en: 'Wheel of Fortune', name_zhTW: '命運之輪', name_zhCN: '命运之轮', arcana: 'major', image: '☸️',
    upright_en: 'Good luck, karma, life cycles, destiny, a turning point', upright_zhTW: '好運，業力，生命周期，命運，轉捩點', upright_zhCN: '好运，业力，生命周期，命运，转折点',
    reversed_en: 'Bad luck, resistance to change, breaking cycles', reversed_zhTW: '厄運，抗拒改變，打破循環', reversed_zhCN: '厄运，抗拒改变，打破循环' },
  { id: 11, name_en: 'Justice', name_zhTW: '正義', name_zhCN: '正义', arcana: 'major', image: '⚖️',
    upright_en: 'Justice, fairness, truth, cause and effect, law', upright_zhTW: '公正，公平，真相，因果，法律', upright_zhCN: '公正，公平，真相，因果，法律',
    reversed_en: 'Unfairness, lack of accountability, dishonesty', reversed_zhTW: '不公平，缺乏責任感，不誠實', reversed_zhCN: '不公平，缺乏责任感，不诚实' },
  { id: 12, name_en: 'The Hanged Man', name_zhTW: '倒吊人', name_zhCN: '倒吊人', arcana: 'major', image: '🙃',
    upright_en: 'Pause, surrender, letting go, new perspectives', upright_zhTW: '暫停，臣服，放手，新視角', upright_zhCN: '暂停，臣服，放手，新视角',
    reversed_en: 'Delays, resistance, stalling', reversed_zhTW: '延誤，抗拒，拖延', reversed_zhCN: '延误，抗拒，拖延' },
  { id: 13, name_en: 'Death', name_zhTW: '死神', name_zhCN: '死神', arcana: 'major', image: '🌑',
    upright_en: 'Endings, change, transformation, transition', upright_zhTW: '結束，改變，蛻變，過渡', upright_zhCN: '结束，改变，蜕变，过渡',
    reversed_en: 'Resistance to change, personal transformation', reversed_zhTW: '抗拒改變，個人蛻變', reversed_zhCN: '抗拒改变，个人蜕变' },
  { id: 14, name_en: 'Temperance', name_zhTW: '節制', name_zhCN: '节制', arcana: 'major', image: '🏺',
    upright_en: 'Balance, moderation, patience, purpose', upright_zhTW: '平衡，節制，耐心，目標', upright_zhCN: '平衡，节制，耐心，目标',
    reversed_en: 'Imbalance, excess, self-healing', reversed_zhTW: '失衡，過度，自我療愈', reversed_zhCN: '失衡，过度，自我疗愈' },
  { id: 15, name_en: 'The Devil', name_zhTW: '惡魔', name_zhCN: '恶魔', arcana: 'major', image: '🔗',
    upright_en: 'Shadow self, attachment, addiction, restriction', upright_zhTW: '陰暗面，執著，上癮，束縛', upright_zhCN: '阴暗面，执着，上瘾，束缚',
    reversed_en: 'Releasing limiting beliefs, exploring dark thoughts', reversed_zhTW: '釋放限制性信念，探索黑暗思想', reversed_zhCN: '释放限制性信念，探索黑暗思想' },
  { id: 16, name_en: 'The Tower', name_zhTW: '高塔', name_zhCN: '高塔', arcana: 'major', image: '⚡',
    upright_en: 'Sudden change, upheaval, chaos, revelation', upright_zhTW: '突然改變，動盪，混亂，啟示', upright_zhCN: '突然改变，动荡，混乱，启示',
    reversed_en: 'Personal transformation, fear of change', reversed_zhTW: '個人蛻變，對改變的恐懼', reversed_zhCN: '个人蜕变，对改变的恐惧' },
  { id: 17, name_en: 'The Star', name_zhTW: '星星', name_zhCN: '星星', arcana: 'major', image: '⭐',
    upright_en: 'Hope, faith, purpose, renewal, spirituality', upright_zhTW: '希望，信念，目標，更新，靈性', upright_zhCN: '希望，信念，目标，更新，灵性',
    reversed_en: 'Lack of faith, despair, self-trust', reversed_zhTW: '缺乏信念，絕望，自信', reversed_zhCN: '缺乏信念，绝望，自信' },
  { id: 18, name_en: 'The Moon', name_zhTW: '月亮', name_zhCN: '月亮', arcana: 'major', image: '🌕',
    upright_en: 'Illusion, fear, the unconscious, intuition', upright_zhTW: '幻覺，恐懼，潛意識，直覺', upright_zhCN: '幻觉，恐惧，潜意识，直觉',
    reversed_en: 'Release of fear, repressed emotion', reversed_zhTW: '釋放恐懼，壓抑的情緒', reversed_zhCN: '释放恐惧，压抑的情绪' },
  { id: 19, name_en: 'The Sun', name_zhTW: '太陽', name_zhCN: '太阳', arcana: 'major', image: '☀️',
    upright_en: 'Positivity, fun, warmth, success, vitality', upright_zhTW: '積極，樂趣，溫暖，成功，活力', upright_zhCN: '积极，乐趣，温暖，成功，活力',
    reversed_en: 'Inner child, feeling down, overly optimistic', reversed_zhTW: '內在小孩，情緒低落，過度樂觀', reversed_zhCN: '内在小孩，情绪低落，过度乐观' },
  { id: 20, name_en: 'Judgement', name_zhTW: '審判', name_zhCN: '审判', arcana: 'major', image: '📯',
    upright_en: 'Reflection, reckoning, awakening', upright_zhTW: '反思，清算，覺醒', upright_zhCN: '反思，清算，觉醒',
    reversed_en: 'Lack of self-awareness, doubt, self-loathing', reversed_zhTW: '缺乏自我意識，懷疑，自我厭惡', reversed_zhCN: '缺乏自我意识，怀疑，自我厌恶' },
  { id: 21, name_en: 'The World', name_zhTW: '世界', name_zhCN: '世界', arcana: 'major', image: '🌍',
    upright_en: 'Completion, integration, accomplishment, travel', upright_zhTW: '完成，整合，成就，旅行', upright_zhCN: '完成，整合，成就，旅行',
    reversed_en: 'Seeking closure, shortcuts, delays', reversed_zhTW: '尋求終結，走捷徑，延誤', reversed_zhCN: '寻求终结，走捷径，延误' },
  // Minor Arcana samples (Wands suit)
  { id: 22, name_en: 'Ace of Wands', name_zhTW: '權杖王牌', name_zhCN: '权杖王牌', arcana: 'minor', suit: 'wands', image: '🔥',
    upright_en: 'Inspiration, new opportunities, growth, potential', upright_zhTW: '靈感，新機遇，成長，潛力', upright_zhCN: '灵感，新机遇，成长，潜力',
    reversed_en: 'Delays, lack of motivation, weighed down', reversed_zhTW: '延誤，缺乏動力，受阻', reversed_zhCN: '延误，缺乏动力，受阻' },
  { id: 23, name_en: 'Two of Wands', name_zhTW: '權杖二', name_zhCN: '权杖二', arcana: 'minor', suit: 'wands', image: '🗺️',
    upright_en: 'Future planning, progress, decisions, discovery', upright_zhTW: '未來規劃，進展，決策，發現', upright_zhCN: '未来规划，进展，决策，发现',
    reversed_en: 'Personal goals, inner alignment, fear of unknown', reversed_zhTW: '個人目標，內在一致，對未知的恐懼', reversed_zhCN: '个人目标，内在一致，对未知的恐惧' },
  // Cups
  { id: 36, name_en: 'Ace of Cups', name_zhTW: '聖杯王牌', name_zhCN: '圣杯王牌', arcana: 'minor', suit: 'cups', image: '💧',
    upright_en: 'Love, new relationships, compassion, creativity', upright_zhTW: '愛，新關係，慈悲，創意', upright_zhCN: '爱，新关系，慈悲，创意',
    reversed_en: 'Emotional loss, blocked creativity, emptiness', reversed_zhTW: '情感損失，創意受阻，空虛', reversed_zhCN: '情感损失，创意受阻，空虚' },
  // Swords
  { id: 50, name_en: 'Ace of Swords', name_zhTW: '寶劍王牌', name_zhCN: '宝剑王牌', arcana: 'minor', suit: 'swords', image: '⚔️',
    upright_en: 'Breakthroughs, new ideas, mental clarity, success', upright_zhTW: '突破，新想法，心智清晰，成功', upright_zhCN: '突破，新想法，心智清晰，成功',
    reversed_en: 'Confusion, brutality, chaos', reversed_zhTW: '混亂，殘忍，混沌', reversed_zhCN: '混乱，残忍，混沌' },
  // Pentacles
  { id: 64, name_en: 'Ace of Pentacles', name_zhTW: '星幣王牌', name_zhCN: '星币王牌', arcana: 'minor', suit: 'pentacles', image: '💰',
    upright_en: 'A new financial opportunity, manifestation, abundance', upright_zhTW: '新的財務機遇，顯化，豐盛', upright_zhCN: '新的财务机遇，显化，丰盛',
    reversed_en: 'Lost opportunity, lack of planning', reversed_zhTW: '錯失機遇，缺乏計劃', reversed_zhCN: '错失机遇，缺乏计划' },
]

// ─── PRODUCTS ───
export const PRODUCTS = [
  { id: 'p1', name_zhTW: '尊享月費會員', name_zhCN: '尊享月费会员', name_en: 'Premium Monthly', description_zhTW: '解鎖完整紫微命盤、凱爾特十字塔羅及所有尊享功能', description_zhCN: '解锁完整紫微命盘、凯尔特十字塔罗及所有尊享功能', description_en: 'Unlock the full Zi Wei chart, Celtic Cross tarot, and all premium features', price: 9900, type: 'digital', images: ['💎'], active: true },
  { id: 'p2', name_zhTW: '尊享年費會員', name_zhCN: '尊享年费会员', name_en: 'Premium Annual', description_zhTW: '年費尊享會員，較月費節省 30%，包含所有尊享功能', description_zhCN: '年费尊享会员，较月费节省 30%，包含所有尊享功能', description_en: 'Annual Premium — save 30% vs monthly. All premium features included', price: 79900, type: 'digital', images: ['👑'], active: true },
  { id: 'p3', name_zhTW: '星盤塔羅牌套裝', name_zhCN: '星盘塔罗牌套装', name_en: 'StarChart Tarot Deck', description_zhTW: '精緻星盤主題塔羅牌，78張，配精美卡盒及說明書', description_zhCN: '精致星盘主题塔罗牌，78张，配精美卡盒及说明书', description_en: 'Beautifully illustrated StarChart-themed 78-card tarot deck with box and guidebook', price: 48000, type: 'physical', stock: 50, images: ['🃏'], active: true },
  { id: 'p4', name_zhTW: '紫水晶能量石套裝', name_zhCN: '紫水晶能量石套装', name_en: 'Amethyst Crystal Set', description_zhTW: '精選紫水晶、白水晶及月長石組合，附能量淨化指南', description_zhCN: '精选紫水晶、白水晶及月长石组合，附能量净化指南', description_en: 'Curated amethyst, clear quartz, and moonstone set with cleansing guide', price: 38000, type: 'physical', stock: 30, images: ['💜'], active: true },
  { id: 'p5', name_zhTW: '紫微斗數入門指南 PDF', name_zhCN: '紫微斗数入门指南 PDF', name_en: 'Zi Wei Dou Shu Guide PDF', description_zhTW: '全面的紫微斗數電子書，120頁，繁、簡、英三語版本', description_zhCN: '全面的紫微斗数电子书，120页，繁、简、英三语版本', description_en: '120-page comprehensive Zi Wei Dou Shu guide in all 3 languages (PDF)', price: 18000, type: 'digital', images: ['📖'], active: true },
]

// ─── NEWS POSTS ───
export const POSTS = [
  { id: 'n1', slug: 'mercury-retrograde-2026', category: 'astrology', publishedAt: '2026-05-28',
    title_zhTW: '2026年水星逆行完全指南', title_zhCN: '2026年水星逆行完全指南', title_en: 'Complete Guide to Mercury Retrograde 2026',
    body_zhTW: '水星逆行對紫微斗數命盤中的「遷移宮」和「交友宮」影響尤為顯著。今年的逆行期間，建議避免簽署重要合約，並多審視自身的溝通方式...',
    body_zhCN: '水星逆行对紫微斗数命盘中的「迁移宫」和「交友宫」影响尤为显著。今年的逆行期间，建议避免签署重要合约，并多审视自身的沟通方式...',
    body_en: 'Mercury retrograde has a particularly strong influence on the Travel Palace and Friends Palace in your Zi Wei chart. During this retrograde period, avoid signing major contracts and take time to review your communication patterns...',
    featuredImage: '☿' },
  { id: 'n2', slug: 'moon-phases-tarot', category: 'tarot', publishedAt: '2026-05-20',
    title_zhTW: '月相與塔羅：如何配合月亮能量占卜', title_zhCN: '月相与塔罗：如何配合月亮能量占卜', title_en: 'Moon Phases & Tarot: Reading with Lunar Energy',
    body_zhTW: '每個月相都有其獨特的能量，結合塔羅占卜能讓解讀更加準確。新月時適合抽牌問新開始，滿月能量最強適合大牌陣...',
    body_zhCN: '每个月相都有其独特的能量，结合塔罗占卜能让解读更加准确。新月时适合抽牌问新开始，满月能量最强适合大牌阵...',
    body_en: 'Each lunar phase carries distinct energy that can enhance your tarot readings. The new moon is perfect for cards about fresh starts, while the full moon\'s peak energy suits larger spreads...',
    featuredImage: '🌕' },
  { id: 'n3', slug: 'summer-promotion-2026', category: 'promotion', publishedAt: '2026-06-01',
    title_zhTW: '夏日星象慶典 — 尊享會員8折優惠', title_zhCN: '夏日星象庆典 — 尊享会员8折优惠', title_en: 'Summer Celestial Festival — 20% Off Premium',
    body_zhTW: '為慶祝夏至，即日起至6月30日，使用優惠碼 SUMMER2026 可享尊享會員8折優惠。限時搶購，名額有限！',
    body_zhCN: '为庆祝夏至，即日起至6月30日，使用优惠码 SUMMER2026 可享尊享会员8折优惠。限时抢购，名额有限！',
    body_en: 'Celebrate the summer solstice with 20% off Premium membership. Use code SUMMER2026 at checkout, valid until June 30. Limited spots available!',
    featuredImage: '☀️' },
]

// ─── ZIWEI PALACES ───
export const ZIWEI_PALACES = [
  { key: 'siblings', index: 0 }, { key: 'life', index: 1 }, { key: 'parents', index: 2 },
  { key: 'fortune', index: 3 }, { key: 'career', index: 4, center: true },
  { key: 'property', index: 5 }, { key: 'health', index: 6 },
  { key: 'travel', index: 7 }, { key: 'friends', index: 8 },
  { key: 'children', index: 9 }, { key: 'spouse', index: 10 }, { key: 'wealth', index: 11 },
]

// Mock chart result
export const MOCK_CHART = {
  palaces: [
    { key: 'siblings', stars: ['天機', '左輔'], sihua: [] },
    { key: 'life', stars: ['紫微', '天府'], sihua: ['化科'] },
    { key: 'parents', stars: ['太陽'], sihua: ['化祿'] },
    { key: 'fortune', stars: ['武曲', '七殺'], sihua: [] },
    { key: 'career', stars: ['天同', '太陰'], sihua: ['化權'] },
    { key: 'property', stars: ['廉貞', '天相'], sihua: [] },
    { key: 'health', stars: ['天梁'], sihua: [] },
    { key: 'travel', stars: ['貪狼'], sihua: ['化忌'] },
    { key: 'friends', stars: ['巨門'], sihua: [] },
    { key: 'children', stars: ['破軍'], sihua: [] },
    { key: 'spouse', stars: ['天機', '右弼'], sihua: [] },
    { key: 'wealth', stars: ['太陽', '祿存'], sihua: [] },
  ],
  interpretations: {
    life: { zhTW: '命宮有紫微、天府坐守，代表您天生具有領導氣質與貴人緣，一生衣食無憂，能獲上司賞識。宜從事管理或創業方向發展。', zhCN: '命宫有紫微、天府坐守，代表您天生具有领导气质与贵人缘，一生衣食无忧，能获上司赏识。宜从事管理或创业方向发展。', en: 'With Zi Wei and Tian Fu in your Life Palace, you possess natural leadership charisma and attract helpful benefactors throughout life. You are well-suited to management or entrepreneurship.' },
    wealth: { zhTW: '財帛宮有太陽、祿存，財運整體佳，適合靠專業技能累積財富，中年後財運更旺。', zhCN: '财帛宫有太阳、禄存，财运整体佳，适合靠专业技能积累财富，中年后财运更旺。', en: 'Your Wealth Palace features the Sun and Lu Cun, indicating strong financial fortune through professional expertise, with wealth accumulating strongly after middle age.' },
    spouse: { zhTW: '夫妻宮有天機、右弼，配偶聰明機智，婚姻需要溝通與包容，建立相互尊重的基礎。', zhCN: '夫妻宫有天机、右弼，配偶聪明机智，婚姻需要沟通与包容，建立相互尊重的基础。', en: 'With Tian Ji in your Spouse Palace, your partner will be intelligent and adaptable. A successful marriage requires open communication and mutual respect.' },
  }
}

// ─── NOTIFICATIONS ───
export const MOCK_NOTIFICATIONS = [
  { id: 'notif1', message_zhTW: '您的每日塔羅牌已準備好，快來看看今日運勢！', message_zhCN: '您的每日塔罗牌已准备好，快来看看今日运势！', message_en: 'Your daily tarot card is ready! Check your fortune for today.', read: false, createdAt: new Date().toISOString() },
  { id: 'notif2', message_zhTW: '新文章：2026年水星逆行完全指南', message_zhCN: '新文章：2026年水星逆行完全指南', message_en: 'New article: Complete Guide to Mercury Retrograde 2026', read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'notif3', message_zhTW: '限時優惠：使用 SUMMER2026 享尊享會員8折！', message_zhCN: '限时优惠：使用 SUMMER2026 享尊享会员8折！', message_en: 'Limited offer: Use SUMMER2026 for 20% off Premium!', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
]
