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
  paymentMethod: 'bank_transfer' | 'whatsapp_direct' | 'telegram_direct' | 'wallet_balance';
  paymentReference?: string;
  paymentProofUrl?: string;
  paymentProofNotes?: string;
  adminNotes?: string;
  targetAccountUrl?: string;
  specialInstructions?: string;
}

export type DepositStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'cancelled';

export interface DepositRequest {
  id: string; // e.g. "DL-DEP-84912"
  depositReference: string; // narration / memo code to match bank transfer
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  amountNGN: number;
  status: DepositStatus;
  paymentMethod: 'bank_transfer';
  bankName: string;
  accountNumber: string;
  accountName: string;
  paymentReference: string; // Customer-provided bank transaction ref
  paymentProofNotes?: string;
  adminNotes?: string;
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  ledgerTransactionId?: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  userEmail: string;
  type: 'deposit_credit' | 'purchase_debit' | 'refund_credit' | 'admin_adjustment';
  amountNGN: number;
  balanceBeforeNGN: number;
  balanceAfterNGN: number;
  referenceId: string; // deposit ID or order ID
  description: string;
  createdAt: string;
}

export interface UserWallet {
  userId: string;
  userEmail: string;
  balanceNGN: number;
  currency: 'NGN';
  totalDepositedNGN: number;
  totalSpentNGN: number;
  lastUpdated: string;
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
  minDepositNGN: number; // Minimum deposit in NGN
  maxDepositNGN: number; // Maximum deposit in NGN
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

