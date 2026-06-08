import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="page-container flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center">
      <div className="text-8xl animate-float">✦</div>
      <div className="space-y-2">
        <h1 className="font-display text-6xl text-gold-400">404</h1>
        <p className="text-ivory/60 text-lg">{t('notfound.title')}</p>
        <p className="text-ivory/30 text-sm max-w-xs">{t('notfound.message')}</p>
      </div>
      {/* Decorative stars */}
      <div className="flex gap-4 text-gold-400/20 text-2xl select-none">
        <span>⭐</span><span>✦</span><span>⭐</span>
      </div>
      <Link to="/" className="btn-gold">{t('notfound.back_home')}</Link>
    </div>
  )
}
