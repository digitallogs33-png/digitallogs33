import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickOrderModal } from './components/QuickOrderModal';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderLookupPage } from './pages/OrderLookupPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';
import { FAQPage } from './pages/FAQPage';
import { AuthPages } from './pages/AuthPages';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { AddFundsPage } from './pages/AddFundsPage';
import {
  PrivacyPolicyPage,
  TermsPage,
  RefundPolicyPage,
  DeliveryPolicyPage
} from './pages/policies/PolicyPages';

const MainLayout: React.FC = () => {
  const { activePage } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'order-lookup':
        return <OrderLookupPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'blog-detail':
        return <BlogPostDetailPage />;
      case 'faq':
        return <FAQPage />;
      case 'login':
        return <AuthPages initialMode="login" />;
      case 'register':
        return <AuthPages initialMode="register" />;
      case 'dashboard':
        return <DashboardPage />;
      case 'add-funds':
        return <AddFundsPage />;
      case 'admin':
        return <AdminPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'refund':
        return <RefundPolicyPage />;
      case 'delivery':
        return <DeliveryPolicyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-8">
        {renderActivePage()}
      </main>
      <Footer />
      <CartDrawer />
      <QuickOrderModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
