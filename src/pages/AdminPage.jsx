import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from '../lib/store'
import i18n from '../i18n'
import { Trash2, ToggleLeft, ToggleRight, Plus, Lock } from 'lucide-react'
import clsx from 'clsx'

const ADMIN_PASSWORD = 'admin1234'
const fmt = (cents) => `$${(cents / 100).toFixed(0)}`

const MOCK_USERS = [
  { id: 'u1', name: 'Demo User', email: 'demo@starchart.app', tier: 'free', joinedAt: '2026-03-01' },
  { id: 'u2', name: 'Premium User', email: 'premium@starchart.app', tier: 'premium', joinedAt: '2026-01-15' },
  { id: 'u3', name: 'Alice Chan', email: 'alice@example.com', tier: 'premium', joinedAt: '2026-04-20' },
  { id: 'u4', name: 'Bob Lee', email: 'bob@example.com', tier: 'free', joinedAt: '2026-05-10' },
]

const TABS = ['news', 'shop', 'users']

function NewPostForm({ onSave, onCancel }) {
  const { t } = useTranslation()
  const cats = ['astrology', 'tarot', 'platform', 'promotion']
  const [form, setForm] = useState({
    title_en: '', title_zhTW: '', title_zhCN: '',
    body_en: '', body_zhTW: '', body_zhCN: '',
    category: 'astrology', featuredImage: '📰'
  })
  const emojis = ['📰', '✨', '🌕', '☀️', '☿', '⭐', '🌟', '🃏', '☯️']

  const handleSave = () => {
    if (!form.title_en && !form.title_zhTW) return
    onSave({
      id: `n${Date.now()}`,
      slug: `post-${Date.now()}`,
      publishedAt: new Date().toISOString().slice(0, 10),
      ...form
    })
  }

  return (
    <div className="card-glass p-5 space-y-4 animate-fade-up">
      <h3 className="text-gold-400 font-semibold text-sm">{t('admin.new_post')}</h3>
      <div className="space-y-3">
        <input className="input-field text-sm" placeholder="Title (EN)" value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
        <input className="input-field text-sm" placeholder="標題 (zh-TW)" value={form.title_zhTW} onChange={e => setForm({ ...form, title_zhTW: e.target.value })} />
        <input className="input-field text-sm" placeholder="标题 (zh-CN)" value={form.title_zhCN} onChange={e => setForm({ ...form, title_zhCN: e.target.value })} />
        <textarea className="input-field text-sm h-20 resize-none" placeholder="Body (EN)" value={form.body_en} onChange={e => setForm({ ...form, body_en: e.target.value })} />
        <textarea className="input-field text-sm h-20 resize-none" placeholder="內容 (zh-TW)" value={form.body_zhTW} onChange={e => setForm({ ...form, body_zhTW: e.target.value })} />
        <textarea className="input-field text-sm h-20 resize-none" placeholder="内容 (zh-CN)" value={form.body_zhCN} onChange={e => setForm({ ...form, body_zhCN: e.target.value })} />
        <div className="flex gap-3">
          <select className="input-field text-sm flex-1" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex gap-1 flex-wrap">
            {emojis.map(em => (
              <button key={em} onClick={() => setForm({ ...form, featuredImage: em })}
                className={clsx('w-8 h-8 rounded-lg text-lg', form.featuredImage === em ? 'bg-gold-400/30 border border-gold-400' : 'bg-navy-700')}>
                {em}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={handleSave} className="btn-gold text-sm py-2 px-4">{t('common.save')}</button>
        <button onClick={onCancel} className="btn-outline text-sm py-2 px-4">{t('common.cancel')}</button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const { t } = useTranslation()
  const { posts, addPost, deletePost, products, toggleProduct } = useStore()
  const lang = i18n.language
  const [unlocked, setUnlocked] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab] = useState('news')
  const [showNewPost, setShowNewPost] = useState(false)

  const getLocalName = (p) => lang === 'zh-CN' ? p.name_zhCN : lang === 'en' ? p.name_en : p.name_zhTW
  const getPostTitle = (p) => lang === 'zh-CN' ? p.title_zhCN : lang === 'en' ? p.title_en : p.title_zhTW

  const handleUnlock = () => {
    if (pw === ADMIN_PASSWORD) { setUnlocked(true); setPwError(false) }
    else setPwError(true)
  }

  const handleAddPost = (post) => {
    addPost(post)
    setShowNewPost(false)
  }

  if (!unlocked) return (
    <div className="page-container flex flex-col items-center justify-center min-h-[70vh] gap-6">
      <div className="text-5xl animate-float">🔐</div>
      <h1 className="font-display text-2xl text-gold-400">{t('admin.title')}</h1>
      <div className="card-glass p-6 w-full max-w-xs space-y-4">
        <p className="text-ivory/50 text-sm text-center">{t('admin.password_prompt')}</p>
        <input type="password" className="input-field" placeholder={t('admin.password')} value={pw}
          onChange={e => { setPw(e.target.value); setPwError(false) }}
          onKeyDown={e => e.key === 'Enter' && handleUnlock()} />
        {pwError && <p className="text-red-400 text-xs text-center">{t('admin.wrong_password')}</p>}
        <button onClick={handleUnlock} className="btn-gold w-full flex items-center justify-center gap-2">
          <Lock size={16} /> {t('admin.unlock')}
        </button>
      </div>
      <p className="text-ivory/20 text-xs">{t('admin.demo_hint')}</p>
    </div>
  )

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between pt-2">
        <h1 className="section-title">{t('admin.title')}</h1>
        <span className="text-xs bg-gold-400/10 text-gold-400/60 px-2 py-1 rounded-full">{t('admin.mock_reset_hint')}</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map(tb => (
          <button key={tb} onClick={() => setTab(tb)}
            className={clsx('px-4 py-2 rounded-full text-xs font-semibold transition-colors', tab === tb ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-ivory/50 hover:text-ivory')}>
            {t(`admin.tab_${tb}`)}
          </button>
        ))}
      </div>

      {/* News Tab */}
      {tab === 'news' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-ivory/50 text-xs">{posts.length} {t('admin.posts_count')}</p>
            <button onClick={() => setShowNewPost(!showNewPost)} className="btn-gold text-xs py-1.5 px-3 flex items-center gap-1">
              <Plus size={12} /> {t('admin.new_post')}
            </button>
          </div>
          {showNewPost && <NewPostForm onSave={handleAddPost} onCancel={() => setShowNewPost(false)} />}
          <div className="space-y-2">
            {posts.map(post => (
              <div key={post.id} className="card-glass p-4 flex items-center gap-3">
                <span className="text-2xl">{post.featuredImage}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-ivory/80 text-sm font-medium truncate">{getPostTitle(post)}</p>
                  <p className="text-ivory/30 text-xs">{post.category} · {post.publishedAt}</p>
                </div>
                <button onClick={() => deletePost(post.id)} className="text-red-400/50 hover:text-red-400 shrink-0" aria-label="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shop Tab */}
      {tab === 'shop' && (
        <div className="space-y-2">
          {products.map(product => (
            <div key={product.id} className="card-glass p-4 flex items-center gap-3">
              <span className="text-2xl">{product.images[0]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-ivory/80 text-sm font-medium truncate">{getLocalName(product)}</p>
                <p className="text-ivory/30 text-xs">{product.type} · {fmt(product.price)}</p>
              </div>
              <button onClick={() => toggleProduct(product.id)} className={clsx('flex items-center gap-1 text-xs px-3 py-1 rounded-full', product.active ? 'bg-emerald-400/20 text-emerald-400' : 'bg-navy-700 text-ivory/40')}>
                {product.active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                {product.active ? t('admin.active') : t('admin.inactive')}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div className="space-y-2">
          {MOCK_USERS.map(u => (
            <div key={u.id} className="card-glass p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-navy-900 text-sm font-bold shrink-0">
                {u.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-ivory/80 text-sm font-medium">{u.name}</p>
                <p className="text-ivory/30 text-xs truncate">{u.email}</p>
              </div>
              <span className={clsx('text-xs px-2 py-1 rounded-full', u.tier === 'premium' ? 'bg-gold-400/20 text-gold-400' : 'bg-navy-700 text-ivory/40')}>
                {u.tier === 'premium' ? t('profile.premium') : t('profile.free')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
