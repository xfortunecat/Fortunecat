import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../lib/store'
import { Eye, EyeOff } from 'lucide-react'

export default function AuthPage({ mode = 'login' }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useStore()
  const [isLogin, setIsLogin] = useState(mode === 'login')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!isLogin && form.password !== form.confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    // Mock auth — replace with real API call
    await new Promise(r => setTimeout(r, 800))
    login({ id: 'mock-user-1', name: form.name || 'Star Seeker', email: form.email, tier: 'free', preferredLang: 'zh-TW' })
    navigate('/')
    setLoading(false)
  }

  return (
    <div className="page-container flex flex-col justify-center min-h-[80vh]">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">✨</div>
        <h1 className="font-display text-2xl text-gold-400">{isLogin ? t('auth.welcome_back') : t('auth.create_account')}</h1>
      </div>

      <div className="card-glass p-6 space-y-4 animate-fade-up">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-ivory/50 text-xs mb-1 block">{t('auth.name')}</label>
              <input className="input-field" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t('auth.name')} />
            </div>
          )}
          <div>
            <label className="text-ivory/50 text-xs mb-1 block">{t('auth.email')}</label>
            <input className="input-field" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-ivory/50 text-xs mb-1 block">{t('auth.password')}</label>
            <div className="relative">
              <input className="input-field pr-10" type={showPw ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3.5 text-ivory/30 hover:text-ivory/60">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {!isLogin && (
            <div>
              <label className="text-ivory/50 text-xs mb-1 block">{t('auth.confirm_password')}</label>
              <input className="input-field" type="password" required value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} placeholder="••••••••" />
            </div>
          )}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full mt-2 flex items-center justify-center gap-2">
            {loading ? <span className="animate-spin">✦</span> : null}
            {isLogin ? t('auth.login') : t('auth.register')}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gold-400/10" /></div>
          <div className="relative flex justify-center"><span className="bg-navy-800 px-3 text-ivory/30 text-xs">or</span></div>
        </div>

        <div className="space-y-2">
          <button className="w-full border border-gold-400/20 text-ivory/70 py-3 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-navy-700 transition-colors">
            {/* Google logo */}
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {t('auth.google_login')}
          </button>
          <button className="w-full border border-gold-400/20 text-ivory/70 py-3 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-navy-700 transition-colors">
            {/* Apple logo */}
            <svg width="17" height="18" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg" fill="white">
              <path d="M8.85 3.54c.75 0 1.69-.51 2.25-1.18.51-.61.88-1.46.88-2.31 0-.11-.01-.23-.03-.32-.84.03-1.85.56-2.46 1.27-.48.54-.92 1.38-.92 2.24 0 .13.02.26.03.3.05.01.14.01.25.01zM6.19 18c1.03 0 1.49-.69 2.78-.69 1.31 0 1.6.67 2.74.67 1.12 0 1.87-1.04 2.58-2.06.8-1.17 1.13-2.31 1.15-2.37-.07-.02-2.24-.9-2.24-3.37 0-2.13 1.68-3.1 1.77-3.17-.99-1.44-2.52-1.48-2.96-1.48-1.27 0-2.3.77-2.94.77-.69 0-1.61-.73-2.7-.73C3.2 5.57 1 7.38 1 10.77c0 2.04.79 4.19 1.76 5.58.83 1.18 1.55 2.1 2.54 2.1-.01-.01-.11-.45-.11-.45z"/>
            </svg>
            {t('auth.apple_login')}
          </button>
        </div>

        <p className="text-center text-ivory/40 text-sm mt-4">
          {isLogin ? t('auth.no_account') : t('auth.have_account')}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-gold-400 hover:underline">
            {isLogin ? t('auth.register') : t('auth.login')}
          </button>
        </p>
      </div>
    </div>
  )
}
