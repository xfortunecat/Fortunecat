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
            <span>G</span> {t('auth.google_login')}
          </button>
          <button className="w-full border border-gold-400/20 text-ivory/70 py-3 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-navy-700 transition-colors">
            <span></span> {t('auth.apple_login')}
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
