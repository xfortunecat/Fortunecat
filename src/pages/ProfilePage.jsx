import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import i18n from '../i18n'
import { LogOut, Star, Crown, ChevronRight, Package } from 'lucide-react'
import clsx from 'clsx'

const LANGS = [
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'en', label: 'English' },
]

export default function ProfilePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, updateUser, savedCharts } = useStore()
  const [saved, setSaved] = useState(false)

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
      <div className={clsx('rounded-2xl p-5 border', user.tier === 'premium' ? 'bg-gradient-to-r from-gold-400/10 to-gold-500/5 border-gold-400/30' : 'card-glass')}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {user.tier === 'premium' ? <Crown size={18} className="text-gold-400" /> : <Star size={18} className="text-ivory/40" />}
            <span className="font-semibold text-ivory">{user.tier === 'premium' ? t('profile.premium') : t('profile.free')}</span>
          </div>
          {user.tier === 'free' && <Link to="/shop/p2" className="btn-gold text-xs py-1.5 px-3">{t('profile.upgrade')}</Link>}
        </div>
        <ul className="space-y-1">
          {(user.tier === 'premium' ? t('membership.premium_features', { returnObjects: true }) : t('membership.free_features', { returnObjects: true })).map((f, i) => (
            <li key={i} className="text-ivory/60 text-xs flex items-center gap-2">
              <span className="text-gold-400">{user.tier === 'premium' ? '✓' : '•'}</span> {f}
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

      {/* Quick Links */}
      <div className="card-glass divide-y divide-gold-400/10">
        <Link to="/shop/orders" className="flex items-center justify-between px-5 py-4 hover:bg-navy-700/30 transition-colors">
          <div className="flex items-center gap-3 text-ivory/70"><Package size={18} /> {t('shop.orders')}</div>
          <ChevronRight size={16} className="text-gold-400/40" />
        </Link>
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3 text-ivory/70"><Star size={18} /> {t('profile.saved_charts')} ({savedCharts.length})</div>
          <ChevronRight size={16} className="text-gold-400/40" />
        </div>
      </div>

      {/* Logout */}
      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 text-red-400/60 hover:text-red-400 transition-colors text-sm">
        <LogOut size={16} /> {t('auth.logout')}
      </button>
    </div>
  )
}
