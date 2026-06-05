import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Sparkles, Star, ShoppingBag, ChevronRight } from 'lucide-react'
import { POSTS, PRODUCTS } from '../data/mockData'
import { useStore } from '../lib/store'
import i18n from '../i18n'

export default function HomePage() {
  const { t } = useTranslation()
  const { user } = useStore()
  const lang = i18n.language

  const getName = (item) => lang === 'zh-CN' ? item.name_zhCN : lang === 'en' ? item.name_en : item.name_zhTW
  const getTitle = (post) => lang === 'zh-CN' ? post.title_zhCN : lang === 'en' ? post.title_en : post.title_zhTW

  return (
    <div className="page-container space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 border border-gold-400/20 p-6 text-center animate-fade-up">
        <div className="absolute inset-0 bg-star-pattern opacity-40" />
        <div className="relative">
          <div className="text-5xl mb-3 animate-float">✨</div>
          <h1 className="font-display text-3xl text-gold-400 mb-1">{t('app_name')}</h1>
          <p className="text-ivory/50 text-sm mb-6">{t('tagline')}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/readings/ziwei" className="btn-gold text-sm py-2.5 px-5 flex items-center gap-2">
              <Star size={16} /> {t('home.quick_ziwei')}
            </Link>
            <Link to="/readings/tarot" className="btn-outline text-sm py-2.5 px-5 flex items-center gap-2">
              <Sparkles size={16} /> {t('home.daily_card')}
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Tarot Quick */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">{t('home.daily_card')}</h2>
          <Link to="/readings/tarot/daily" className="text-gold-400/60 text-sm flex items-center gap-1">{t('news.read_more')} <ChevronRight size={14} /></Link>
        </div>
        <Link to="/readings/tarot/daily" className="card-glass p-5 flex items-center gap-4 hover:border-gold-400/30 transition-colors block">
          <div className="text-5xl animate-float">🃏</div>
          <div>
            <p className="text-gold-400 font-semibold mb-1">{t('home.draw_card')}</p>
            <p className="text-ivory/50 text-sm">{lang === 'zh-TW' ? '每日一牌為您揭示今日方向' : lang === 'zh-CN' ? '每日一牌为您揭示今日方向' : 'Your daily card reveals today\'s guidance'}</p>
          </div>
          <ChevronRight className="ml-auto text-gold-400/40" size={20} />
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">{t('home.featured')}</h2>
          <Link to="/shop" className="text-gold-400/60 text-sm flex items-center gap-1"><ShoppingBag size={14} /> {t('nav.shop')}</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.slice(0, 2).map(p => (
            <Link key={p.id} to={`/shop/${p.id}`} className="card-glass p-4 hover:border-gold-400/30 transition-colors">
              <div className="text-3xl mb-2">{p.images[0]}</div>
              <p className="text-ivory/90 text-sm font-medium leading-snug mb-1">{getName(p)}</p>
              <p className="text-gold-400 font-semibold text-sm">${(p.price / 100).toFixed(0)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">{t('home.latest_news')}</h2>
          <Link to="/news" className="text-gold-400/60 text-sm flex items-center gap-1">{t('news.read_more')} <ChevronRight size={14} /></Link>
        </div>
        <div className="space-y-3">
          {POSTS.slice(0, 2).map(post => (
            <Link key={post.id} to={`/news/${post.slug}`} className="card-glass p-4 flex items-start gap-3 hover:border-gold-400/30 transition-colors block">
              <span className="text-2xl">{post.featuredImage}</span>
              <div className="flex-1 min-w-0">
                <span className="text-gold-400/60 text-xs uppercase tracking-wider">{t(`news.categories.${post.category}`)}</span>
                <p className="text-ivory/80 text-sm font-medium mt-0.5 leading-snug line-clamp-2">{getTitle(post)}</p>
              </div>
              <ChevronRight className="text-gold-400/30 mt-1 shrink-0" size={16} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
