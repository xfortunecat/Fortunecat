import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ReadingsPage() {
  const { t } = useTranslation()
  return (
    <div className="page-container space-y-6">
      <div className="text-center pt-2">
        <div className="text-4xl mb-2">✨</div>
        <h1 className="section-title text-3xl">{t('nav.readings')}</h1>
      </div>
      <div className="space-y-4">
        <Link to="/readings/ziwei" className="card-glass p-6 flex items-center gap-5 hover:border-gold-400/30 transition-colors block">
          <span className="text-5xl animate-float">☯️</span>
          <div>
            <h2 className="text-ivory font-semibold text-lg">{t('ziwei.title')}</h2>
            <p className="text-ivory/40 text-sm mt-0.5">{t('ziwei.subtitle')}</p>
          </div>
        </Link>
        <Link to="/readings/tarot" className="card-glass p-6 flex items-center gap-5 hover:border-gold-400/30 transition-colors block">
          <span className="text-5xl animate-float" style={{ animationDelay: '1s' }}>🃏</span>
          <div>
            <h2 className="text-ivory font-semibold text-lg">{t('tarot.title')}</h2>
            <p className="text-ivory/40 text-sm mt-0.5">{t('tarot.daily')} · {t('tarot.three_card')} · {t('tarot.celtic_cross')}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
