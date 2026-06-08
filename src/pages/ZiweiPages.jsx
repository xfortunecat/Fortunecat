import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import i18n from '../i18n'
import { MOCK_CHART, ZIWEI_PALACES, ZIWEI_STARS } from '../data/mockData'
import { useStore } from '../lib/store'
import { Star, Lock, ChevronUp, X } from 'lucide-react'
import clsx from 'clsx'

const HOURS = ['zi','chou','yin','mao','chen','si','wu','wei','shen','you','xu','hai']
const SIHUA_COLORS = { '化祿': 'text-emerald-400', '化權': 'text-blue-400', '化科': 'text-purple-400', '化忌': 'text-red-400' }

// ── Input Form ───────────────────────────────────────────────────────────────
export function ZiweiInputPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ date: '', hour: '', location: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    navigate('/readings/ziwei/chart', { state: { form, chart: MOCK_CHART } })
  }

  return (
    <div className="page-container space-y-6">
      <div className="text-center pt-2">
        <div className="text-4xl mb-2 animate-float">☯️</div>
        <h1 className="section-title text-3xl">{t('ziwei.title')}</h1>
        <p className="text-ivory/40 text-sm">{t('ziwei.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="card-glass p-6 space-y-5 animate-fade-up">
        <div>
          <label className="text-gold-400/70 text-xs uppercase tracking-wider mb-1.5 block">{t('ziwei.birth_date')}</label>
          <input type="date" required className="input-field" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
        <div>
          <label className="text-gold-400/70 text-xs uppercase tracking-wider mb-1.5 block">{t('ziwei.birth_hour')}</label>
          <select required className="input-field" value={form.hour} onChange={e => setForm({ ...form, hour: e.target.value })}>
            <option value="">{t('ziwei.birth_hour')}</option>
            {HOURS.map(h => <option key={h} value={h}>{t(`ziwei.hours.${h}`)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-gold-400/70 text-xs uppercase tracking-wider mb-1.5 block">{t('ziwei.birth_location')}</label>
          <input type="text" className="input-field" placeholder="e.g. Hong Kong, Taipei, Beijing" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        </div>
        <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2">
          {loading ? <><span className="animate-spin">✦</span> {t('common.loading')}</> : <><Star size={16} /> {t('ziwei.calculate')}</>}
        </button>
      </form>
    </div>
  )
}

// ── Chart Display ────────────────────────────────────────────────────────────
export function ZiweiChartPage() {
  const { t } = useTranslation()
  const { user, saveChart } = useStore()
  const lang = i18n.language
  const isPremium = user?.tier === 'premium'
  const [selected, setSelected] = useState(null)
  const [selectedStar, setSelectedStar] = useState(null)
  const [saved, setSaved] = useState(false)

  const chart = MOCK_CHART
  const FREE_PALACES = ['life', 'wealth', 'spouse']

  const getPalaceName = (key) => {
    const map = { life: 'life_palace', wealth: 'wealth_palace', spouse: 'spouse_palace', career: 'career_palace', siblings: 'siblings_palace', children: 'children_palace', health: 'health_palace', travel: 'travel_palace', friends: 'friends_palace', property: 'property_palace', fortune: 'fortune_palace', parents: 'parents_palace' }
    return t(`ziwei.${map[key]}`)
  }

  const getInterpretation = (key) => {
    const i = chart.interpretations[key]
    if (!i) return null
    return lang === 'zh-CN' ? i.zhCN : lang === 'en' ? i.en : i.zhTW
  }

  const getStarInfo = (starName) => {
    const info = ZIWEI_STARS[starName]
    if (!info) return null
    return {
      label: lang === 'zh-CN' ? info.zhCN : lang === 'en' ? info.en : info.zhTW,
      desc: lang === 'zh-CN' ? info.desc_zhCN : lang === 'en' ? info.desc_en : info.desc_zhTW,
      nature: lang === 'zh-CN' ? info.nature_zhCN : lang === 'en' ? info.nature_en : info.nature_zhTW,
    }
  }

  const handleSave = () => {
    saveChart({ id: Date.now(), type: 'ziwei', data: chart, date: new Date().toISOString() })
    setSaved(true)
  }

  const selectedPalace = chart.palaces.find(p => p.key === selected)

  const gridOrder = [
    'siblings', 'life', 'parents', 'fortune',
    'career', null, null, 'property',
    'health', 'travel', 'friends', 'children',
    'spouse', 'wealth', null, null,
  ]

  return (
    <div className="page-container space-y-6">
      <div className="text-center">
        <h1 className="section-title">{t('ziwei.title')}</h1>
        <p className="text-ivory/40 text-xs">{t('common.mock_notice')}</p>
      </div>

      {/* Ming Pan Grid */}
      <div className="grid grid-cols-4 gap-1 animate-fade-up">
        {gridOrder.map((key, i) => {
          if (!key) return (
            <div key={i} className="aspect-square rounded-lg bg-navy-950/40 flex items-center justify-center">
              <span className="text-gold-400/10 text-xl">☯</span>
            </div>
          )
          const palace = chart.palaces.find(p => p.key === key)
          const isLocked = !isPremium && !FREE_PALACES.includes(key)
          const isSelected = selected === key
          return (
            <button key={key} onClick={() => setSelected(isSelected ? null : key)}
              className={clsx('aspect-square rounded-lg border p-1.5 flex flex-col items-center justify-center text-center transition-all',
                isSelected ? 'border-gold-400 bg-gold-400/10' : 'border-gold-400/15 bg-navy-800/50 hover:border-gold-400/40',
                isLocked && 'opacity-60')}>
              <p className="text-gold-400 text-[9px] font-semibold mb-0.5 leading-tight">{getPalaceName(key)}</p>
              {isLocked ? <Lock size={10} className="text-ivory/30 mt-0.5" /> : (
                <div className="flex flex-wrap justify-center gap-0.5">
                  {palace?.stars.map((s, si) => <span key={si} className="text-[8px] text-ivory/60 leading-none">{s}</span>)}
                  {palace?.sihua.map((s, si) => <span key={si} className={clsx('text-[8px] leading-none font-bold', SIHUA_COLORS[s])}>{s}</span>)}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Interpretation Panel */}
      {selected && (
        <div className="card-glass p-5 animate-fade-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gold-400 font-semibold">{getPalaceName(selected)}</h3>
            <button onClick={() => setSelected(null)} className="text-ivory/30 hover:text-ivory/60" aria-label="Close"><ChevronUp size={18} /></button>
          </div>
          {!isPremium && !FREE_PALACES.includes(selected) ? (
            <div className="text-center py-4">
              <Lock className="text-gold-400/40 mx-auto mb-2" size={28} />
              <p className="text-ivory/50 text-sm mb-3">{t('ziwei.premium_only')}</p>
              <button className="btn-gold text-sm py-2 px-4">{t('profile.upgrade')}</button>
            </div>
          ) : getInterpretation(selected) ? (
            <p className="text-ivory/70 text-sm leading-relaxed">{getInterpretation(selected)}</p>
          ) : (
            <p className="text-ivory/40 text-sm italic">
              {lang === 'en' ? 'Interpretation coming soon.' : lang === 'zh-CN' ? '解读即将推出。' : '解讀即將推出。'}
            </p>
          )}
          {/* Stars list — tap to see description */}
          {(!(!isPremium && !FREE_PALACES.includes(selected))) && (
            <div className="mt-4 space-y-2">
              <p className="text-gold-400/50 text-xs uppercase tracking-wider">{t('ziwei.stars_in_palace')}</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedPalace?.stars.map((s, i) => (
                  <button key={i} onClick={() => setSelectedStar(selectedStar === s ? null : s)}
                    className={clsx('text-xs px-2.5 py-1 rounded-full border transition-colors', selectedStar === s ? 'bg-gold-400/20 border-gold-400/60 text-gold-400' : 'bg-navy-700 border-gold-400/20 text-ivory/70 hover:text-ivory')}>
                    {s}
                  </button>
                ))}
                {selectedPalace?.sihua.map((s, i) => (
                  <span key={i} className={clsx('text-xs px-2 py-1 rounded-full bg-navy-700 border border-gold-400/20 font-bold', SIHUA_COLORS[s])}>{s}</span>
                ))}
              </div>
              {/* Star detail popup */}
              {selectedStar && (() => {
                const info = getStarInfo(selectedStar)
                if (!info) return null
                return (
                  <div className="bg-navy-950/60 border border-gold-400/20 rounded-xl p-4 mt-2 animate-fade-up">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gold-400 text-sm font-semibold">{info.label}</span>
                      <button onClick={() => setSelectedStar(null)} className="text-ivory/30 hover:text-ivory/60" aria-label="Close star"><X size={14} /></button>
                    </div>
                    <p className="text-ivory/50 text-xs mb-2">{info.nature}</p>
                    <p className="text-ivory/70 text-xs leading-relaxed">{info.desc}</p>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      )}

      {user && (
        <button onClick={handleSave} disabled={saved} className={clsx('w-full py-3 rounded-lg text-sm font-semibold transition-all', saved ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30' : 'btn-outline')}>
          {saved ? '✓ ' + t('ziwei.chart_saved') : t('ziwei.save_chart')}
        </button>
      )}
    </div>
  )
}
