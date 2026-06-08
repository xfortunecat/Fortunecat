import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import i18n from '../i18n'
import { LogOut, Star, Crown, ChevronRight, Package, History, Bell, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const LANGS = [
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'en', label: 'English' },
]

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} aria-label="Toggle"
      className={clsx('relative w-10 h-6 rounded-full transition-colors duration-200', on ? 'bg-gold-400' : 'bg-navy-700')}>
      <span className={clsx('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200', on ? 'left-5' : 'left-1')} />
    </button>
  )
}

function ReadingHistoryItem({ entry, lang }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const getCardName = (card) => lang === 'zh-CN' ? card.name_zhCN : lang === 'en' ? card.name_en : card.name_zhTW
  const getTypeLabel = () => {
    if (entry.type === 'daily') return t('tarot.daily')
    if (entry.type === 'three') return t('tarot.three_card')
    if (entry.type === 'celtic') return t('tarot.celtic_cross')
    return entry.type
  }

  return (
    <div className="card-glass overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center justify-between text-left">
        <div>
          <p className="text-ivory/80 text-sm font-medium">{getTypeLabel()}</p>
          <p className="text-ivory/40 text-xs mt-0.5">{new Date(entry.date).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {entry.cards.slice(0, 3).map((c, i) => (
              <span key={i} className="text-base">{c.image}</span>
            ))}
            {entry.cards.length > 3 && <span className="text-ivory/30 text-xs">+{entry.cards.length - 3}</span>}
          </div>
          <ChevronDown size={14} className={clsx('text-ivory/30 transition-transform', expanded && 'rotate-180')} />
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-gold-400/10 pt-3 space-y-2">
          {entry.cards.map((card, i) => {
            const meaning = card.reversed
              ? (lang === 'zh-CN' ? card.reversed_zhCN : lang === 'en' ? card.reversed_en : card.reversed_zhTW)
              : (lang === 'zh-CN' ? card.upright_zhCN : lang === 'en' ? card.upright_en : card.upright_zhTW)
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-lg shrink-0">{card.image}</span>
                <div>
                  <p className="text-ivory/80 text-xs font-medium">{getCardName(card)} {card.reversed ? '↓' : '↑'}</p>
                  <p className="text-ivory/40 text-xs leading-snug">{meaning}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ProfilePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, updateUser, savedCharts, readingHistory, notifPrefs, setNotifPref } = useStore()
  const lang = i18n.language
  const [showHistory, setShowHistory] = useState(false)
  const [showNotifPrefs, setShowNotifPrefs] = useState(false)

  if (!isAuthenticated) return (
    <div className="page-container flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center">
      <div className="text-5xl animate-float">✨</div>
      <h2 className="font-display text-2xl text-gold-400">{t('app_name')}</h2>
      <p className="text-ivory/40 text-sm max-w-xs">{t('tagline')}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link to="/login" className="btn-gold w-full text-center">{t('auth.login')}</Link>
        <Link to="/login" className="btn-outline w-full text-center">{t('auth.register')}</Link>
      </div>
    </div>
  )

  const handleLangChange = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    updateUser({ preferredLang: code })
  }

  const handleLogout = () => { logout(); navigate('/') }

  const isPremium = user.tier === 'premium'
  const freeLimit = 3
  const visibleHistory = isPremium ? readingHistory : readingHistory.slice(0, freeLimit)

  const notifPrefItems = [
    { key: 'dailyCard', label: t('profile.notif_daily_card') },
    { key: 'newArticle', label: t('profile.notif_new_article') },
    { key: 'promotions', label: t('profile.notif_promotions') },
    { key: 'orders', label: t('profile.notif_orders') },
  ]

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pt-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-navy-900 text-xl font-bold">
          {user.name?.[0] || '✦'}
        </div>
        <div>
          <h2 className="text-ivory font-semibold text-lg">{user.name}</h2>
          <p className="text-ivory/40 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Membership */}
      <div className={clsx('rounded-2xl p-5 border', isPremium ? 'bg-gradient-to-r from-gold-400/10 to-gold-500/5 border-gold-400/30' : 'card-glass')}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {isPremium ? <Crown size={18} className="text-gold-400" /> : <Star size={18} className="text-ivory/40" />}
            <span className="font-semibold text-ivory">{isPremium ? t('profile.premium') : t('profile.free')}</span>
          </div>
          {isPremium && user.premiumExpiry && (
            <span className="text-xs text-gold-400/60">
              {t('profile.expires')} {new Date(user.premiumExpiry).toLocaleDateString()}
            </span>
          )}
          {!isPremium && <Link to="/shop/p2" className="btn-gold text-xs py-1.5 px-3">{t('profile.upgrade')}</Link>}
        </div>
        <ul className="space-y-1">
          {(isPremium ? t('membership.premium_features', { returnObjects: true }) : t('membership.free_features', { returnObjects: true })).map((f, i) => (
            <li key={i} className="text-ivory/60 text-xs flex items-center gap-2">
              <span className="text-gold-400">{isPremium ? '✓' : '•'}</span> {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Language */}
      <div className="card-glass p-5 space-y-3">
        <h3 className="text-gold-400/70 text-xs uppercase tracking-wider">{t('profile.language')}</h3>
        <div className="flex gap-2 flex-wrap">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => handleLangChange(l.code)}
              className={clsx('px-3 py-1.5 rounded-full text-xs font-medium transition-colors', i18n.language === l.code ? 'bg-gold-400 text-navy-900' : 'bg-navy-700 text-ivory/50 hover:text-ivory')}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="card-glass overflow-hidden">
        <button onClick={() => setShowNotifPrefs(!showNotifPrefs)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-navy-700/30 transition-colors">
          <div className="flex items-center gap-3 text-ivory/70"><Bell size={18} /> {t('profile.notifications')}</div>
          <ChevronDown size={16} className={clsx('text-gold-400/40 transition-transform', showNotifPrefs && 'rotate-180')} />
        </button>
        {showNotifPrefs && (
          <div className="border-t border-gold-400/10 px-5 py-4 space-y-4">
            {notifPrefItems.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-ivory/70 text-sm">{label}</span>
                <Toggle on={notifPrefs[key]} onChange={val => setNotifPref(key, val)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="card-glass divide-y divide-gold-400/10">
        <Link to="/shop/orders" className="flex items-center justify-between px-5 py-4 hover:bg-navy-700/30 transition-colors">
          <div className="flex items-center gap-3 text-ivory/70"><Package size={18} /> {t('shop.orders')}</div>
          <ChevronRight size={16} className="text-gold-400/40" />
        </Link>
        <button onClick={() => setShowHistory(!showHistory)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-navy-700/30 transition-colors">
          <div className="flex items-center gap-3 text-ivory/70"><History size={18} /> {t('tarot.history')} ({readingHistory.length})</div>
          <ChevronDown size={16} className={clsx('text-gold-400/40 transition-transform', showHistory && 'rotate-180')} />
        </button>
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3 text-ivory/70"><Star size={18} /> {t('profile.saved_charts')} ({savedCharts.length})</div>
          <ChevronRight size={16} className="text-gold-400/40" />
        </div>
      </div>

      {/* Reading History Expanded */}
      {showHistory && (
        <div className="space-y-3 animate-fade-up">
          <h3 className="text-gold-400/70 text-xs uppercase tracking-wider px-1">{t('tarot.history')}</h3>
          {readingHistory.length === 0 ? (
            <div className="card-glass p-6 text-center">
              <p className="text-ivory/40 text-sm">{t('tarot.no_history')}</p>
              <Link to="/readings/tarot" className="btn-gold text-sm mt-3 inline-block">{t('tarot.title')}</Link>
            </div>
          ) : (
            <>
              {visibleHistory.map(entry => (
                <ReadingHistoryItem key={entry.id} entry={entry} lang={lang} />
              ))}
              {!isPremium && readingHistory.length > freeLimit && (
                <div className="card-glass p-4 text-center border border-gold-400/20">
                  <p className="text-ivory/50 text-xs mb-2">{t('tarot.history_free_limit')}</p>
                  <Link to="/shop/p2" className="btn-gold text-xs py-1.5 px-4">{t('profile.upgrade')}</Link>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Logout */}
      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 text-red-400/60 hover:text-red-400 transition-colors text-sm">
        <LogOut size={16} /> {t('auth.logout')}
      </button>
    </div>
  )
}
