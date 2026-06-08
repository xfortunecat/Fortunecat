import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './i18n'
import './styles/globals.css'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ReadingsPage from './pages/ReadingsPage'
import { ZiweiInputPage, ZiweiChartPage } from './pages/ZiweiPages'
import { TarotSelectorPage, TarotDailyPage, TarotSpreadPage } from './pages/TarotPages'
import { ShopPage, ProductPage, CartPage, CheckoutPage, OrdersPage } from './pages/ShopPages'
import { NewsPage, NewsArticlePage } from './pages/NewsPages'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import AdminPage from './pages/AdminPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/readings" element={<ReadingsPage />} />
          <Route path="/readings/ziwei" element={<ZiweiInputPage />} />
          <Route path="/readings/ziwei/chart" element={<ZiweiChartPage />} />
          <Route path="/readings/tarot" element={<TarotSelectorPage />} />
          <Route path="/readings/tarot/daily" element={<TarotDailyPage />} />
          <Route path="/readings/tarot/spread" element={<TarotSpreadPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/cart" element={<CartPage />} />
          <Route path="/shop/checkout" element={<CheckoutPage />} />
          <Route path="/shop/orders" element={<OrdersPage />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsArticlePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
)
