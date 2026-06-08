import { create } from 'zustand'
import { MOCK_NOTIFICATIONS, POSTS, PRODUCTS } from '../data/mockData'

const loadNotifPrefs = () => {
  try { return JSON.parse(localStorage.getItem('notifPrefs') || 'null') } catch { return null }
}

export const useStore = create((set, get) => ({
  // ── Auth ──────────────────────────────────────────────────────────────────
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({
    user: null,
    isAuthenticated: false,
    cart: [],
    orders: [],
    savedCharts: [],
    readingHistory: [],
  }),
  updateUser: (data) => set((s) => ({ user: { ...s.user, ...data } })),

  // ── Cart ──────────────────────────────────────────────────────────────────
  cart: [],
  addToCart: (product) => set((s) => {
    const existing = s.cart.find(i => i.id === product.id)
    if (existing) return { cart: s.cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) }
    return { cart: [...s.cart, { ...product, qty: 1 }] }
  }),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter(i => i.id !== id) })),
  updateQty: (id, qty) => set((s) => ({
    cart: qty < 1 ? s.cart.filter(i => i.id !== id) : s.cart.map(i => i.id === id ? { ...i, qty } : i)
  })),
  clearCart: () => set({ cart: [] }),
  cartTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),

  // ── Notifications ─────────────────────────────────────────────────────────
  notifications: MOCK_NOTIFICATIONS,
  markRead: (id) => set((s) => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),
  markAllRead: () => set((s) => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) })),
  unreadCount: () => get().notifications.filter(n => !n.read).length,

  // ── Notification Preferences ──────────────────────────────────────────────
  notifPrefs: loadNotifPrefs() || { dailyCard: true, newArticle: true, promotions: true, orders: true },
  setNotifPref: (key, val) => set((s) => {
    const prefs = { ...s.notifPrefs, [key]: val }
    try { localStorage.setItem('notifPrefs', JSON.stringify(prefs)) } catch {}
    return { notifPrefs: prefs }
  }),

  // ── Orders ────────────────────────────────────────────────────────────────
  orders: [],
  addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),

  // ── Saved Charts ──────────────────────────────────────────────────────────
  savedCharts: [],
  saveChart: (chart) => set((s) => ({ savedCharts: [chart, ...s.savedCharts] })),

  // ── Reading History ───────────────────────────────────────────────────────
  readingHistory: [],
  addReadingHistory: (entry) => set((s) => ({ readingHistory: [entry, ...s.readingHistory].slice(0, 50) })),
  clearReadingHistory: () => set({ readingHistory: [] }),

  // ── Admin: Posts & Products ───────────────────────────────────────────────
  posts: POSTS,
  addPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
  deletePost: (id) => set((s) => ({ posts: s.posts.filter(p => p.id !== id) })),

  products: PRODUCTS,
  toggleProduct: (id) => set((s) => ({
    products: s.products.map(p => p.id === id ? { ...p, active: !p.active } : p)
  })),
}))
