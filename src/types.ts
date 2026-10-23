export type Currency = 'NGN' | 'USD';

export type OrderStatus = 'pending' | 'under_review' | 'paid' | 'delivered' | 'rejected' | 'refunded';

export interface ProductPackageOption {
  id: string;
  name: string;
  priceNGN: number;
  duration?: string;
  description?: string;
  deliverables?: string[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  shortDescription: string;
  description: string;
  priceNGN: number; // Base price in NGN
  duration?: string; // e.g. "30 Days", "7 Days", "One-Time Delivery"
  inStock: boolean;
  featured?: boolean;
  image: string;
  packages?: ProductPackageOption[];
  features: string[];
  requirementsNote?: string;
  deliveryMethod: string; // e.g. "Direct Email / Telegram Access Voucher"
  licenseType: string; // e.g. "Authorized Enterprise Sub-Seat"
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  productCount?: number;
}

export interface CartItem {
  productId: string;
  productTitle: string;
  productImage: string;
  packageId?: string;
  packageName?: string;
  priceNGN: number;
  quantity: number;
  category: string;
}

export interface Order {
  id: string; // e.g. "DL-93821"
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  totalNGN: number;
  currency: Currency;
  exchangeRateUsed: number;
  totalInCurrency: number;
  status: OrderStatus;
  paymentMethod: 'bank_transfer' | 'whatsapp_direct' | 'telegram_direct';
  paymentReference?: string;
  paymentProofUrl?: string;
  paymentProofNotes?: string;
  adminNotes?: string;
  targetAccountUrl?: string;
  specialInstructions?: string;
}

export interface SiteSettings {
  brandName: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  telegramUrl: string;
  telegramHandle: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  paymentReferenceId: string;
  usdExchangeRate: number; // e.g. 1 USD = 1450 NGN
  announcementText: string;
  supportEmail: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Payment' | 'Subscriptions' | 'Marketing Services' | 'Ordering';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}
