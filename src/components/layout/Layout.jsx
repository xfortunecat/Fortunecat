import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, Sparkles, ShoppingBag, Newspaper, User, Bell, Globe } from 'lucide-react'
import { useStore } from '../../lib/store'
import { useState } from 'react'
import i18n from '../../i18n'
import clsx from 'clsx'

const LANGS = [
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'en', label: 'English' },
]

export default function Layout({ children }) {
  const { t } = useTranslation()
  const location = useLocation()
  const { notifications, markAllRead, user } = useStore()
  const unread = notifications.filter(n => !n.read).length
  const [showLang, setShowLang] = useState(false)
  const [showNotif, setShowNotif] = useState(false)

  const switchLang = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    setShowLang(false)
  }

  const navItems = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/readings', icon: Sparkles, label: t('nav.readings') },
    { to: '/shop', icon: ShoppingBag, label: t('nav.shop') },
    { to: '/news', icon: Newspaper, label: t('nav.news') },
    { to: '/profile', icon: User, label: t('nav.profile') },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-navy-900/80 backdrop-blur-md border-b border-gold-400/10 px-4 flex items-center justify-between" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 12px)', paddingBottom: '12px' }}>
        <Link to="/" className="font-display text-gold-400 text-lg font-semibold tracking-wide">
          {t('app_name')}
        </Link>
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="relative">
            <button onClick={() => { setShowLang(!showLang); setShowNotif(false) }} className="p-2 text-ivory/60 hover:text-gold-400 transition-colors" aria-label="Language">
              <Globe size={20} />
            </button>
            {showLang && (
              <div className="absolute right-0 top-10 bg-navy-800 border border-gold-400/20 rounded-xl shadow-xl overflow-hidden z-50 min-w-[140px] animate-fade-up">
                {LANGS.map(l => (
                  <button key={l.code} onClick={() => switchLang(l.code)}
                    className={clsx('w-full text-left px-4 py-3 text-sm transition-colors', i18n.language === l.code ? 'text-gold-400 bg-gold-400/10' : 'text-ivory/70 hover:text-ivory hover:bg-navy-700')}>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Notifications */}
          {user && (
            <div className="relative">
              <button onClick={() => { setShowNotif(!showNotif); setShowLang(false) }} className="relative p-2 text-ivory/60 hover:text-gold-400 transition-colors" aria-label="Notifications">
                <Bell size={20} />
                {unread > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-gold-400 text-navy-900 text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-10 bg-navy-800 border border-gold-400/20 rounded-xl shadow-xl z-50 w-72 animate-fade-up">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gold-400/10">
                    <span className="text-gold-400 font-semibold text-sm">{t('notifications.title')}</span>
                    <button onClick={markAllRead} className="text-ivory/40 text-xs hover:text-ivory">✓ all</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-ivory/40 text-sm px-4 py-6 text-center">{t('notifications.empty')}</p>
                    ) : notifications.map(n => (
                      <div key={n.id} className={clsx('px-4 py-3 border-b border-gold-400/5 text-sm', !n.read && 'bg-gold-400/5')}>
                        <p className={clsx('leading-snug', n.read ? 'text-ivory/50' : 'text-ivory/80')}>
                          {i18n.language === 'zh-CN' ? n.message_zhCN : i18n.language === 'en' ? n.message_en : n.message_zhTW}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mock mode banner */}
      <div className="bg-gold-400/10 border-b border-gold-400/20 text-gold-400/80 text-center text-xs py-1.5 px-4">
        🧪 {t('common.mock_notice')}
      </div>

      {/* Main */}
      <main className="flex-1" onClick={() => { setShowLang(false); setShowNotif(false) }}>
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav fixed bottom-0 inset-x-0 z-40 bg-navy-900/90 backdrop-blur-md border-t border-gold-400/10">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
            return (
              <Link key={to} to={to} className={clsx('flex flex-col items-center gap-0.5 py-2.5 px-3 min-w-[44px] transition-colors', active ? 'text-gold-400' : 'text-ivory/40 hover:text-ivory/70')}>
                <Icon size={22} strokeWidth={active ? 2 : 1.5} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
