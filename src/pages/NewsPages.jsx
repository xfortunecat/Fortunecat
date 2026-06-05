import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { POSTS } from '../data/mockData'
import i18n from '../i18n'
import clsx from 'clsx'

export function NewsPage() {
  const { t } = useTranslation()
  const [cat, setCat] = useState('all')
  const lang = i18n.language
  const categories = ['all', 'astrology', 'tarot', 'platform', 'promotion']
  const filtered = cat === 'all' ? POSTS : POSTS.filter(p => p.category === cat)

  return (
    <div className="page-container space-y-6">
      <h1 className="section-title pt-2">{t('news.title')}</h1>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={clsx('px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0',
              cat === c ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-ivory/50 hover:text-ivory')}>
            {t(`news.categories.${c}`)}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filtered.map(post => {
          const title = lang === 'zh-CN' ? post.title_zhCN : lang === 'en' ? post.title_en : post.title_zhTW
          const body = lang === 'zh-CN' ? post.body_zhCN : lang === 'en' ? post.body_en : post.body_zhTW
          return (
            <Link key={post.id} to={`/news/${post.slug}`} className="card-glass p-5 block hover:border-gold-400/30 transition-colors animate-fade-up">
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{post.featuredImage}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gold-400/60 text-xs uppercase tracking-wider">{t(`news.categories.${post.category}`)}</span>
                    <span className="text-ivory/20 text-xs">{post.publishedAt}</span>
                  </div>
                  <h3 className="text-ivory/90 font-semibold text-sm leading-snug mb-1">{title}</h3>
                  <p className="text-ivory/40 text-xs line-clamp-2 leading-relaxed">{body}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function NewsArticlePage() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const navigate = useNavigate()
  const lang = i18n.language
  const post = POSTS.find(p => p.slug === slug)

  if (!post) return <div className="page-container"><p className="text-ivory/40">{t('common.error')}</p></div>

  const title = lang === 'zh-CN' ? post.title_zhCN : lang === 'en' ? post.title_en : post.title_zhTW
  const body = lang === 'zh-CN' ? post.body_zhCN : lang === 'en' ? post.body_en : post.body_zhTW

  return (
    <div className="page-container space-y-6">
      <button onClick={() => navigate(-1)} className="text-gold-400/60 text-sm">‹ {t('common.back')}</button>
      <article className="card-glass p-6 space-y-4 animate-fade-up">
        <div className="text-5xl text-center py-2">{post.featuredImage}</div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gold-400/60 text-xs uppercase tracking-wider">{t(`news.categories.${post.category}`)}</span>
            <span className="text-ivory/20 text-xs">{post.publishedAt}</span>
          </div>
          <h1 className="font-display text-xl text-ivory leading-snug">{title}</h1>
        </div>
        <div className="border-t border-gold-400/10 pt-4">
          <p className="text-ivory/70 text-sm leading-relaxed">{body}</p>
          <p className="text-ivory/30 text-xs mt-4 italic">
            {lang === 'en' ? 'Full article available with Premium membership.' : lang === 'zh-CN' ? '完整文章需尊享会员资格。' : '完整文章需尊享會員資格。'}
          </p>
        </div>
      </article>
    </div>
  )
}
