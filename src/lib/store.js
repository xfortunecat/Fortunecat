import { create } from 'zustand'
import { MOCK_NOTIFICATIONS } from '../data/mockData'

export const useStore = create((set, get) => ({
  // ── Auth ──
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false, cart: [] }),
  updateUser: (data) => set((s) => ({ user: { ...s.user, ...data } })),

  // ── Cart ──
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

  // ── Notifications ──
  notifications: MOCK_NOTIFICATIONS,
  markRead: (id) => set((s) => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),
  markAllRead: () => set((s) => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) })),
  unreadCount: () => get().notifications.filter(n => !n.read).length,

  // ── Orders ──
  orders: [],
  addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),

  // ── Saved Charts ──
  savedCharts: [],
  saveChart: (chart) => set((s) => ({ savedCharts: [chart, ...s.savedCharts] })),
}))
