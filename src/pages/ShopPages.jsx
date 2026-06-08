import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/mockData'
import { useStore } from '../lib/store'
import i18n from '../i18n'
import { ShoppingCart, Plus, Minus, Trash2, Tag, CreditCard } from 'lucide-react'
import clsx from 'clsx'

const fmt = (cents) => `$${(cents / 100).toFixed(0)}`

function useProductName(p) {
  const lang = i18n.language
  return lang === 'zh-CN' ? p.name_zhCN : lang === 'en' ? p.name_en : p.name_zhTW
}
function useProductDesc(p) {
  const lang = i18n.language
  return lang === 'zh-CN' ? p.description_zhCN : lang === 'en' ? p.description_en : p.description_zhTW
}

// ── Shop Listing ──────────────────────────────────────────────────────────────
export function ShopPage() {
  const { t } = useTranslation()
  const { addToCart } = useStore()
  const [filter, setFilter] = useState('all')
  const [toast, setToast] = useState(null)

  const handleAdd = (p) => {
    addToCart(p)
    setToast(p.id)
    setTimeout(() => setToast(null), 1500)
  }

  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.type === filter)

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between pt-2">
        <h1 className="section-title">{t('shop.title')}</h1>
        <Link to="/shop/cart" className="relative p-2 text-gold-400">
          <ShoppingCart size={22} />
        </Link>
      </div>

      <div className="flex gap-2">
        {['all', 'digital', 'physical'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={clsx('px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              filter === f ? 'bg-gold-400 text-navy-900' : 'bg-navy-800 text-ivory/50 hover:text-ivory')}>
            {t(`shop.${f === 'all' ? 'title' : f}`).split(' ')[0]}
            {f === 'all' ? '' : f === 'digital' ? ` ${t('shop.digital')}` : ` ${t('shop.physical')}`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(p => {
          const name = useProductName(p)
          const desc = useProductDesc(p)
          return (
            <div key={p.id} className="card-glass p-4 flex flex-col animate-fade-up">
              <Link to={`/shop/${p.id}`}>
                <div className="text-4xl mb-2 text-center">{p.images[0]}</div>
                <p className="text-ivory/90 text-sm font-medium leading-snug mb-1">{name}</p>
                <p className="text-ivory/40 text-xs line-clamp-2 mb-2">{desc}</p>
              </Link>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-gold-400 font-semibold">{fmt(p.price)}</span>
                <button onClick={() => handleAdd(p)} className={clsx('text-xs px-3 py-1.5 rounded-lg font-medium transition-all', toast === p.id ? 'bg-emerald-400/20 text-emerald-400' : 'bg-gold-400/20 text-gold-400 hover:bg-gold-400 hover:text-navy-900')}>
                  {toast === p.id ? '✓' : t('shop.add_to_cart')}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Product Detail ────────────────────────────────────────────────────────────
export function ProductPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { addToCart } = useStore()
  const navigate = useNavigate()
  const product = PRODUCTS.find(p => p.id === id)
  const [added, setAdded] = useState(false)

  if (!product) return <div className="page-container"><p className="text-ivory/40">{t('common.error')}</p></div>

  const name = useProductName(product)
  const desc = useProductDesc(product)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="page-container space-y-6">
      <button onClick={() => navigate(-1)} className="text-gold-400/60 text-sm flex items-center gap-1">‹ {t('common.back')}</button>
      <div className="card-glass p-6 space-y-4 animate-fade-up">
        <div className="text-6xl text-center py-4">{product.images[0]}</div>
        <div>
          <span className="text-xs bg-gold-400/10 text-gold-400/60 px-2 py-0.5 rounded-full">{product.type === 'digital' ? t('shop.digital') : t('shop.physical')}</span>
          <h1 className="font-display text-xl text-ivory mt-2">{name}</h1>
          <p className="text-2xl font-bold text-gold-400 mt-1">{fmt(product.price)}</p>
        </div>
        <p className="text-ivory/60 text-sm leading-relaxed">{desc}</p>
        {product.stock !== undefined && (
          <p className="text-xs text-emerald-400">✓ {t('shop.in_stock')} ({product.stock})</p>
        )}
        <button onClick={handleAdd} className={clsx('btn-gold w-full flex items-center justify-center gap-2', added && 'bg-emerald-400 hover:bg-emerald-400')}>
          {added ? '✓ Added!' : <><ShoppingCart size={16} /> {t('shop.add_to_cart')}</>}
        </button>
        <Link to="/shop/cart" className="btn-outline w-full flex items-center justify-center gap-2 text-sm">
          {t('shop.cart')}
        </Link>
      </div>
    </div>
  )
}

// ── Cart ──────────────────────────────────────────────────────────────────────
export function CartPage() {
  const { t } = useTranslation()
  const { cart, removeFromCart, updateQty, cartTotal } = useStore()
  const navigate = useNavigate()

  if (cart.length === 0) return (
    <div className="page-container flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-5xl">🛒</div>
      <p className="text-ivory/40">{t('shop.empty_cart')}</p>
      <Link to="/shop" className="btn-gold">{t('shop.title')}</Link>
    </div>
  )

  return (
    <div className="page-container space-y-6">
      <h1 className="section-title pt-2">{t('shop.cart')}</h1>
      <div className="space-y-3">
        {cart.map(item => {
          const name = i18n.language === 'zh-CN' ? item.name_zhCN : i18n.language === 'en' ? item.name_en : item.name_zhTW
          return (
            <div key={item.id} className="card-glass p-4 flex items-center gap-3">
              <span className="text-3xl">{item.images[0]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-ivory/80 text-sm font-medium leading-snug">{name}</p>
                <p className="text-gold-400 text-sm">{fmt(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full bg-navy-700 flex items-center justify-center text-ivory/60 hover:text-ivory"><Minus size={10} /></button>
                <span className="text-ivory/80 text-sm w-4 text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full bg-navy-700 flex items-center justify-center text-ivory/60 hover:text-ivory"><Plus size={10} /></button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-400/50 hover:text-red-400 ml-1"><Trash2 size={16} /></button>
            </div>
          )
        })}
      </div>
      <div className="card-glass p-4 flex items-center justify-between">
        <span className="text-ivory/60">{t('shop.total')}</span>
        <span className="text-gold-400 font-bold text-lg">{fmt(cartTotal())}</span>
      </div>
      <button onClick={() => navigate('/shop/checkout')} className="btn-gold w-full flex items-center justify-center gap-2">
        <CreditCard size={16} /> {t('shop.checkout')}
      </button>
    </div>
  )
}

// ── Checkout ──────────────────────────────────────────────────────────────────
export function CheckoutPage() {
  const { t } = useTranslation()
  const { cart, cartTotal, clearCart, addOrder, user } = useStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const handlePromo = () => {
    if (promo.toUpperCase() === 'SUMMER2026') setPromoApplied(true)
  }

  const discount = promoApplied ? Math.round(cartTotal() * 0.2) : 0
  const finalTotal = cartTotal() - discount

  const handlePay = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    addOrder({ id: `ORD-${Date.now()}`, items: [...cart], total: finalTotal, status: 'paid', createdAt: new Date().toISOString() })
    clearCart()
    setDone(true)
    setLoading(false)
  }

  if (done) return (
    <div className="page-container flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center">
      <div className="text-6xl animate-float">✨</div>
      <h2 className="font-display text-2xl text-gold-400">{t('shop.order_complete')}</h2>
      <p className="text-ivory/50 text-sm">{t('shop.order_complete_thanks')}</p>
      <Link to="/" className="btn-gold mt-2">{t('shop.back_home')}</Link>
    </div>
  )

  return (
    <div className="page-container space-y-6">
      <h1 className="section-title pt-2">{t('shop.checkout')}</h1>
      <div className="card-glass p-5 space-y-3">
        <h3 className="text-gold-400/70 text-xs uppercase tracking-wider">{t('shop.order_summary')}</h3>
        {cart.map(item => {
          const name = i18n.language === 'zh-CN' ? item.name_zhCN : i18n.language === 'en' ? item.name_en : item.name_zhTW
          return (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-ivory/60">{name} × {item.qty}</span>
              <span className="text-ivory/80">{fmt(item.price * item.qty)}</span>
            </div>
          )
        })}
        {promoApplied && <div className="flex justify-between text-sm text-emerald-400"><span>SUMMER2026 (-20%)</span><span>-{fmt(discount)}</span></div>}
        <div className="border-t border-gold-400/10 pt-3 flex justify-between font-semibold">
          <span className="text-ivory">{t('shop.total')}</span>
          <span className="text-gold-400">{fmt(finalTotal)}</span>
        </div>
      </div>

      <div className="card-glass p-5 space-y-3">
        <h3 className="text-gold-400/70 text-xs uppercase tracking-wider">{t('shop.promo_code')}</h3>
        <div className="flex gap-2">
          <input className="input-field flex-1" placeholder="e.g. SUMMER2026" value={promo} onChange={e => setPromo(e.target.value)} />
          <button onClick={handlePromo} className="btn-outline text-sm px-4 py-2 whitespace-nowrap">{t('shop.apply')}</button>
        </div>
        {promoApplied && <p className="text-emerald-400 text-xs">✓ 20% discount applied!</p>}
      </div>

      <div className="card-glass p-5 space-y-4">
        <h3 className="text-gold-400/70 text-xs uppercase tracking-wider">{t('shop.payment')}</h3>
        <div className="bg-navy-950/50 border border-gold-400/10 rounded-lg p-4 text-center">
          <CreditCard className="text-gold-400/40 mx-auto mb-2" size={28} />
          <p className="text-ivory/40 text-xs">{t('shop.stripe_note')}</p>
          <p className="text-ivory/20 text-xs mt-1">Use any card: 4242 4242 4242 4242</p>
        </div>
        <button onClick={handlePay} disabled={loading || cart.length === 0} className="btn-gold w-full flex items-center justify-center gap-2">
          {loading ? <><span className="animate-spin">✦</span> Processing...</> : <><CreditCard size={16} /> Pay {fmt(finalTotal)}</>}
        </button>
      </div>
    </div>
  )
}

// ── Orders ────────────────────────────────────────────────────────────────────
export function OrdersPage() {
  const { t } = useTranslation()
  const { orders } = useStore()

  if (orders.length === 0) return (
    <div className="page-container flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-5xl">📦</div>
      <p className="text-ivory/40">{t('common.loading').replace('...', '')} — no orders yet</p>
      <Link to="/shop" className="btn-gold">{t('shop.title')}</Link>
    </div>
  )

  return (
    <div className="page-container space-y-4">
      <h1 className="section-title pt-2">{t('shop.orders')}</h1>
      {orders.map(order => (
        <div key={order.id} className="card-glass p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-ivory/80 font-mono text-xs">{order.id}</p>
              <p className="text-ivory/40 text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={clsx('text-xs px-2 py-1 rounded-full', order.status === 'paid' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-gold-400/20 text-gold-400')}>
              {t(`shop.order_status.${order.status}`)}
            </span>
          </div>
          <div className="border-t border-gold-400/10 pt-2 flex justify-between text-sm">
            <span className="text-ivory/50">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
            <span className="text-gold-400 font-semibold">{fmt(order.total)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
