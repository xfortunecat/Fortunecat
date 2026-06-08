import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { TAROT_DECK } from '../data/mockData'
import { useStore } from '../lib/store'
import i18n from '../i18n'
import { Lock, RotateCcw } from 'lucide-react'
import clsx from 'clsx'

function drawCards(count) {
  const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map(card => ({ ...card, reversed: Math.random() < 0.2 }))
}

function todayKey() {
  return `daily_card_${new Date().toISOString().slice(0, 10)}`
}

function TarotCard({ card, flipped, onClick, label }) {
  const lang = i18n.language
  const getName = () => lang === 'zh-CN' ? card?.name_zhCN : lang === 'en' ? card?.name_en : card?.name_zhTW
  const getMeaning = () => {
    if (!card) return ''
    if (card.reversed) return lang === 'zh-CN' ? card.reversed_zhCN : lang === 'en' ? card.reversed_en : card.reversed_zhTW
    return lang === 'zh-CN' ? card.upright_zhCN : lang === 'en' ? card.upright_en : card.upright_zhTW
  }
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-2">
      {label && <p className="text-gold-400/60 text-xs uppercase tracking-wider">{label}</p>}
      <div className="card-scene w-28 h-44" onClick={onClick} style={{ cursor: card ? 'pointer' : 'default' }}>
        <div className={clsx('card-inner w-full h-full', flipped && 'flipped')}>
          <div className="card-face w-full h-full rounded-2xl border border-gold-400/30 bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center shadow-lg shadow-black/30">
            <div className="text-4xl opacity-40">✦</div>
          </div>
          <div className={clsx('card-face card-back w-full h-full rounded-2xl border border-gold-400/40 bg-gradient-to-br from-navy-700 to-navy-900 flex flex-col items-center justify-center p-3 shadow-lg shadow-black/30', card?.reversed && 'rotate-180')}>
            <div className="text-4xl mb-1">{card?.image}</div>
            <p className="text-ivory/90 text-[11px] font-semibold text-center leading-tight">{getName()}</p>
            <p className={clsx('text-[9px] mt-0.5', card?.reversed ? 'text-red-400' : 'text-gold-400')}>
              {card?.reversed ? t('tarot.reversed') : t('tarot.upright')}
            </p>
          </div>
        </div>
      </div>
      {flipped && card && (
        <p className="text-ivory/50 text-[11px] text-center max-w-[120px] leading-snug">{getMeaning()}</p>
      )}
    </div>
  )
}

// ── Selector ──────────────────────────────────────────────────────────────────
export function TarotSelectorPage() {
  const { t } = useTranslation()
  const { user } = useStore()
  const isPremium = user?.tier === 'premium'

  return (
    <div className="page-container space-y-6">
      <div className="text-center pt-2">
        <div className="text-4xl mb-2 animate-float">🃏</div>
        <h1 className="section-title text-3xl">{t('tarot.title')}</h1>
      </div>
      <div className="space-y-4">
        {[
          { to: '/readings/tarot/daily', icon: '🌙', label: t('tarot.daily'), sub: 'En / 每日 / 每日', free: true },
          { to: '/readings/tarot/spread?type=three', icon: '🌟', label: t('tarot.three_card'), sub: 'Past · Present · Future', free: true },
          { to: '/readings/tarot/spread?type=celtic', icon: '☸️', label: t('tarot.celtic_cross'), sub: '10 cards', free: false },
        ].map(item => (
          <Link key={item.to} to={item.free || isPremium ? item.to : '/profile'}
            className={clsx('card-glass p-5 flex items-center gap-4 hover:border-gold-400/30 transition-colors block', !item.free && !isPremium && 'opacity-60')}>
            <span className="text-4xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-ivory/90 font-semibold">{item.label}</p>
              <p className="text-ivory/40 text-xs mt-0.5">{item.sub}</p>
            </div>
            {!item.free && !isPremium ? (
              <span className="text-xs bg-gold-400/20 text-gold-400 px-2 py-1 rounded-full flex items-center gap-1"><Lock size={10} /> {t('common.premium_badge')}</span>
            ) : (
              <span className="text-gold-400/40">›</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Daily Card ────────────────────────────────────────────────────────────────
export function TarotDailyPage() {
  const { t } = useTranslation()
  const { user, addReadingHistory } = useStore()
  const isLoggedIn = !!user
  const lang = i18n.language

  // Feature 4: persist today's card in localStorage
  const [card] = useState(() => {
    const key = todayKey()
    try {
      const stored = localStorage.getItem(key)
      if (stored) return JSON.parse(stored)
    } catch {}
    const drawn = drawCards(1)[0]
    try { localStorage.setItem(key, JSON.stringify(drawn)) } catch {}
    return drawn
  })

  const [flipped, setFlipped] = useState(false)

  const getMeaning = () => card.reversed
    ? (lang === 'zh-CN' ? card.reversed_zhCN : lang === 'en' ? card.reversed_en : card.reversed_zhTW)
    : (lang === 'zh-CN' ? card.upright_zhCN : lang === 'en' ? card.upright_en : card.upright_zhTW)

  const getName = () => lang === 'zh-CN' ? card.name_zhCN : lang === 'en' ? card.name_en : card.name_zhTW

  const handleFlip = () => {
    if (flipped) return
    setFlipped(true)
    // Feature 5: save to reading history
    if (isLoggedIn) {
      addReadingHistory({
        id: Date.now(),
        type: 'daily',
        date: new Date().toISOString(),
        cards: [card],
      })
    }
  }

  return (
    <div className="page-container flex flex-col items-center space-y-8">
      <div className="text-center pt-2">
        <div className="text-3xl mb-2">🌙</div>
        <h1 className="section-title">{t('tarot.daily')}</h1>
        <p className="text-ivory/40 text-sm">{new Date().toLocaleDateString(lang === 'en' ? 'en-US' : lang, { month: 'long', day: 'numeric' })}</p>
      </div>

      <TarotCard card={card} flipped={flipped} onClick={handleFlip} />

      {!flipped ? (
        <button onClick={handleFlip} className="btn-gold flex items-center gap-2">
          ✨ {t('tarot.flip')}
        </button>
      ) : (
        <div className="card-glass p-5 w-full animate-fade-up space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-gold-400 font-semibold">{getName()}</h3>
            <span className={clsx('text-xs px-2 py-1 rounded-full', card.reversed ? 'bg-red-400/20 text-red-400' : 'bg-gold-400/20 text-gold-400')}>
              {card.reversed ? t('tarot.reversed') : t('tarot.upright')}
            </span>
          </div>
          {/* Feature 4: blur meaning for non-logged-in users */}
          {isLoggedIn ? (
            <p className="text-ivory/70 text-sm leading-relaxed">{getMeaning()}</p>
          ) : (
            <div className="relative">
              <p className="text-ivory/70 text-sm leading-relaxed blur-sm select-none">{getMeaning()}</p>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Lock size={20} className="text-gold-400" />
                <p className="text-ivory/80 text-xs font-semibold text-center">{t('tarot.login_to_see')}</p>
                <Link to="/login" className="btn-gold text-xs py-1.5 px-4">{t('auth.login')}</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Spread ────────────────────────────────────────────────────────────────────
export function TarotSpreadPage() {
  const { t } = useTranslation()
  const lang = i18n.language
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || 'three'
  const count = type === 'celtic' ? 10 : 3
  const [cards] = useState(() => drawCards(count))
  const [flipped, setFlipped] = useState([])
  const [allFlipped, setAllFlipped] = useState(false)
  const { user, addReadingHistory } = useStore()

  const labels3 = [t('tarot.past'), t('tarot.present'), t('tarot.future')]
  const labels10 = ['Present', 'Challenge', 'Past', 'Future', 'Above', 'Below', 'Self', 'Environment', 'Hopes', 'Outcome']

  const flipAll = () => {
    setFlipped(cards.map((_, i) => i))
    setAllFlipped(true)
    // Feature 5: save spread to reading history
    if (user) {
      addReadingHistory({
        id: Date.now(),
        type,
        date: new Date().toISOString(),
        cards,
      })
    }
  }
  const flipOne = (i) => { if (!flipped.includes(i)) setFlipped([...flipped, i]) }

  const handleReset = () => { setFlipped([]); setAllFlipped(false) }

  return (
    <div className="page-container space-y-6">
      <div className="text-center pt-2">
        <h1 className="section-title">{type === 'celtic' ? t('tarot.celtic_cross') : t('tarot.three_card')}</h1>
      </div>

      <div className={clsx('flex gap-4 justify-center flex-wrap', type === 'three' ? 'flex-row' : 'flex-wrap')}>
        {cards.map((card, i) => (
          <TarotCard key={i} card={card} flipped={flipped.includes(i)}
            onClick={() => flipOne(i)}
            label={type === 'three' ? labels3[i] : labels10[i]} />
        ))}
      </div>

      {!allFlipped && (
        <div className="flex gap-3 justify-center">
          <button onClick={flipAll} className="btn-gold flex items-center gap-2">✨ {t('tarot.flip_all')}</button>
        </div>
      )}
      {allFlipped && (
        <button onClick={handleReset} className="btn-outline w-full flex items-center justify-center gap-2">
          <RotateCcw size={16} /> {lang === 'en' ? 'New Reading' : '重新占卜'}
        </button>
      )}
    </div>
  )
}
