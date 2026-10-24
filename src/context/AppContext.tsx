import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  Order,
  CartItem,
  SiteSettings,
  BlogPost,
  FAQItem,
  User,
  Currency,
  OrderStatus,
  DepositRequest,
  DepositStatus,
  WalletTransaction,
  UserWallet
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_BLOGS,
  INITIAL_FAQS,
  INITIAL_DEPOSITS,
  INITIAL_WALLETS,
  INITIAL_WALLET_TRANSACTIONS
} from '../data/initialData';
import { PaymentMethodConfig, PAYMENT_METHODS } from '../config/paymentMethods';

interface NavigationParams {
  productId?: string;
  blogId?: string;
  categoryId?: string;
  orderId?: string;
}

interface AppContextType {
  // Store Data
  products: Product[];
  categories: Category[];
  orders: Order[];
  blogs: BlogPost[];
  faqs: FAQItem[];
  siteSettings: SiteSettings;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => void;

  // Currency
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceNGN: number, targetCurrency?: Currency) => string;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartTotalNGN: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: CartItem[];
    totalNGN: number;
    paymentMethod: 'bank_transfer' | 'whatsapp_direct' | 'telegram_direct' | 'wallet_balance';
    paymentReference?: string;
    specialInstructions?: string;
    targetAccountUrl?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, adminNotes?: string) => void;
  submitPaymentProof: (orderId: string, reference: string, notes?: string) => boolean;

  // Add Funds & Wallet System
  deposits: DepositRequest[];
  wallets: Record<string, UserWallet>;
  walletTransactions: WalletTransaction[];
  currentUserWallet: UserWallet;
  getUserWallet: (email?: string) => UserWallet;
  createDepositRequest: (amountNGN: number, paymentReference?: string, notes?: string) => { success: boolean; deposit?: DepositRequest; error?: string };
  submitDepositProof: (depositId: string, paymentReference: string, notes?: string) => boolean;
  cancelDepositRequest: (depositId: string) => boolean;
  approveDepositRequest: (depositId: string, adminNotes?: string) => { success: boolean; message: string };
  rejectDepositRequest: (depositId: string, reason: string) => { success: boolean; message: string };
  payWithWallet: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: CartItem[];
    totalNGN: number;
    specialInstructions?: string;
    targetAccountUrl?: string;
  }) => { success: boolean; order?: Order; error?: string };

  // Navigation & Page State
  activePage: string;
  selectedProductId: string | null;
  selectedBlogId: string | null;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  navigateTo: (page: string, params?: NavigationParams) => void;

  // Quick Order
  quickOrderProduct: Product | null;
  setQuickOrderProduct: (product: Product | null) => void;

  // User Auth
  currentUser: User | null;
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;

  // Admin Auth & Management
  isAdmin: boolean;
  adminLogin: (passcode: string) => boolean;
  adminLogout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  resetAllToDefault: () => void;

  // Payment Methods
  paymentMethods: PaymentMethodConfig[];
  activePaymentMethods: PaymentMethodConfig[];
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethodConfig>) => void;
  resetPaymentMethods: () => void;

  // Toast notifications
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'dl_settings_v1',
  CATEGORIES: 'dl_categories_v1',
  PRODUCTS: 'dl_products_v1',
  ORDERS: 'dl_orders_v1',
  CART: 'dl_cart_v1',
  USER: 'dl_user_v1',
  ADMIN: 'dl_is_admin_v1',
  CURRENCY: 'dl_currency_v1',
  DEPOSITS: 'dl_deposits_v1',
  WALLETS: 'dl_wallets_v1',
  WALLET_TRANSACTIONS: 'dl_wallet_transactions_v1',
  PAYMENT_METHODS: 'dl_payment_methods_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State initialization with localStorage fallback
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [deposits, setDeposits] = useState<DepositRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEPOSITS);
      return saved ? JSON.parse(saved) : INITIAL_DEPOSITS;
    } catch {
      return INITIAL_DEPOSITS;
    }
  });

  const [wallets, setWallets] = useState<Record<string, UserWallet>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WALLETS);
      return saved ? JSON.parse(saved) : INITIAL_WALLETS;
    } catch {
      return INITIAL_WALLETS;
    }
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WALLET_TRANSACTIONS);
      return saved ? JSON.parse(saved) : INITIAL_WALLET_TRANSACTIONS;
    } catch {
      return INITIAL_WALLET_TRANSACTIONS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map((p) => {
          const initialMatch = INITIAL_PRODUCTS.find((ip) => ip.id === p.id);
          if (initialMatch && (!p.image || p.image.includes('/src/assets/images'))) {
            return { ...p, image: initialMatch.image };
          }
          return p;
        });
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        return parsed.map((o) => ({
          ...o,
          items: o.items.map((item) => {
            const initialMatch = INITIAL_PRODUCTS.find((ip) => ip.id === item.productId);
            if (initialMatch && (!item.productImage || item.productImage.includes('/src/assets/images'))) {
              return { ...item, productImage: initialMatch.image };
            }
            return item;
          })
        }));
      }
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        return parsed.map((item) => {
          const initialMatch = INITIAL_PRODUCTS.find((ip) => ip.id === item.productId);
          if (initialMatch && (!item.productImage || item.productImage.includes('/src/assets/images'))) {
            return {
              ...item,
              productImage: initialMatch.image
            };
          }
          return item;
        });
      }
      return [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      return (saved === 'USD' ? 'USD' : 'NGN') as Currency;
    } catch {
      return 'NGN';
    }
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
      return saved ? JSON.parse(saved) : PAYMENT_METHODS;
    } catch {
      return PAYMENT_METHODS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN) === 'true';
    } catch {
      return false;
    }
  });

  const [blogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [faqs] = useState<FAQItem[]>(INITIAL_FAQS);

  // App UI state
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Auto-sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(paymentMethods));
    } catch (e) {
      console.error('Failed to sync payment methods to localStorage', e);
    }
  }, [paymentMethods]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN, isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEPOSITS, JSON.stringify(deposits));
  }, [deposits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WALLETS, JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WALLET_TRANSACTIONS, JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  // Toast handler
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    showToast(`Currency changed to ${c === 'NGN' ? 'Nigerian Naira (₦)' : 'US Dollar ($)'}`, 'info');
  };

  // Price formatter with Tabular Numeral support
  const formatPrice = (priceNGN: number, targetCurrency: Currency = currency): string => {
    if (targetCurrency === 'USD') {
      const rate = siteSettings.usdExchangeRate > 0 ? siteSettings.usdExchangeRate : 1450;
      const usdValue = priceNGN / rate;
      return `$ ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `₦ ${priceNGN.toLocaleString('en-NG')}`;
  };

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.productId === item.productId && ci.packageId === item.packageId
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        return next;
      }
      return [...prev, item];
    });
    showToast(`Added "${item.productTitle}" to cart`, 'success');
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalNGN = cart.reduce((acc, item) => acc + item.priceNGN * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Orders
  const createOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: CartItem[];
    totalNGN: number;
    paymentMethod: 'bank_transfer' | 'whatsapp_direct' | 'telegram_direct' | 'wallet_balance';
    paymentReference?: string;
    specialInstructions?: string;
    targetAccountUrl?: string;
  }): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `DL-${randomSuffix}`;
    const rate = siteSettings.usdExchangeRate > 0 ? siteSettings.usdExchangeRate : 1450;
    const totalInCurrency = currency === 'USD' ? orderData.totalNGN / rate : orderData.totalNGN;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      items: orderData.items,
      totalNGN: orderData.totalNGN,
      currency: currency,
      exchangeRateUsed: rate,
      totalInCurrency: totalInCurrency,
      status: 'pending',
      paymentMethod: orderData.paymentMethod,
      paymentReference: orderData.paymentReference || '',
      specialInstructions: orderData.specialInstructions,
      targetAccountUrl: orderData.targetAccountUrl,
      adminNotes: 'Order received. Awaiting bank transfer confirmation.'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, adminNotes?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status,
            adminNotes: adminNotes !== undefined ? adminNotes : order.adminNotes
          };
        }
        return order;
      })
    );
    showToast(`Order ${orderId} updated to ${status.replace('_', ' ').toUpperCase()}`, 'success');
  };

  const submitPaymentProof = (orderId: string, reference: string, notes?: string): boolean => {
    let found = false;
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          found = true;
          return {
            ...order,
            status: 'under_review',
            paymentReference: reference,
            paymentProofNotes: notes || order.paymentProofNotes,
            adminNotes: `Payment proof submitted by customer with ref: ${reference}. Awaiting admin bank verification.`
          };
        }
        return order;
      })
    );

    if (found) {
      showToast('Payment proof submitted! We will verify and process your order shortly.', 'success');
      return true;
    } else {
      showToast('Order reference not found. Please double-check the Order ID.', 'error');
      return false;
    }
  };

  // Add Funds & Wallet Operations
  const getUserWallet = (email?: string): UserWallet => {
    const targetEmail = (email || currentUser?.email || 'guest@digitallogs.net').toLowerCase().trim();
    if (wallets[targetEmail]) {
      return wallets[targetEmail];
    }
    return {
      userId: currentUser?.id || `usr-${Date.now()}`,
      userEmail: targetEmail,
      balanceNGN: 0,
      currency: 'NGN',
      totalDepositedNGN: 0,
      totalSpentNGN: 0,
      lastUpdated: new Date().toISOString()
    };
  };

  const currentUserWallet = getUserWallet(currentUser?.email);

  const createDepositRequest = (
    amountNGN: number,
    paymentReference?: string,
    notes?: string
  ): { success: boolean; deposit?: DepositRequest; error?: string } => {
    if (!currentUser) {
      showToast('Please sign in or register to add funds to your wallet.', 'error');
      return { success: false, error: 'Authentication required' };
    }

    const min = siteSettings.minDepositNGN || 2000;
    const max = siteSettings.maxDepositNGN || 2000000;

    if (isNaN(amountNGN) || amountNGN <= 0) {
      showToast('Please enter a valid positive deposit amount.', 'error');
      return { success: false, error: 'Invalid deposit amount' };
    }

    if (amountNGN < min) {
      showToast(`Minimum deposit amount is ₦${min.toLocaleString('en-NG')}.`, 'error');
      return { success: false, error: `Minimum deposit is ₦${min.toLocaleString('en-NG')}` };
    }

    if (amountNGN > max) {
      showToast(`Maximum deposit limit per transaction is ₦${max.toLocaleString('en-NG')}.`, 'error');
      return { success: false, error: `Maximum deposit limit is ₦${max.toLocaleString('en-NG')}` };
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const depositId = `DL-DEP-${randomSuffix}`;

    const newDeposit: DepositRequest = {
      id: depositId,
      depositReference: depositId,
      userId: currentUser.id,
      userEmail: currentUser.email.toLowerCase().trim(),
      userName: currentUser.name,
      userPhone: currentUser.phone,
      amountNGN,
      status: paymentReference && paymentReference.trim().length > 0 ? 'under_review' : 'pending',
      paymentMethod: 'bank_transfer',
      bankName: siteSettings.bankName,
      accountNumber: siteSettings.bankAccountNumber,
      accountName: siteSettings.bankAccountName,
      paymentReference: paymentReference?.trim() || '',
      paymentProofNotes: notes?.trim() || '',
      adminNotes: 'Deposit initialized. Awaiting customer bank transfer and transaction reference.',
      createdAt: new Date().toISOString()
    };

    setDeposits((prev) => [newDeposit, ...prev]);
    showToast(`Deposit request ${depositId} created for ₦${amountNGN.toLocaleString('en-NG')}`, 'success');
    return { success: true, deposit: newDeposit };
  };

  const submitDepositProof = (depositId: string, reference: string, notes?: string): boolean => {
    let found = false;
    setDeposits((prev) =>
      prev.map((dep) => {
        if (dep.id === depositId) {
          found = true;
          return {
            ...dep,
            status: 'under_review',
            paymentReference: reference.trim(),
            paymentProofNotes: notes?.trim() || dep.paymentProofNotes,
            adminNotes: `Payment reference "${reference.trim()}" submitted by customer. Awaiting admin bank statement reconciliation.`
          };
        }
        return dep;
      })
    );

    if (found) {
      showToast('Payment reference submitted! Verification usually takes 5-15 minutes.', 'success');
      return true;
    } else {
      showToast('Deposit record not found. Please verify the Reference ID.', 'error');
      return false;
    }
  };

  const cancelDepositRequest = (depositId: string): boolean => {
    let cancelled = false;
    setDeposits((prev) =>
      prev.map((dep) => {
        if (dep.id === depositId && (dep.status === 'pending' || dep.status === 'under_review')) {
          cancelled = true;
          return {
            ...dep,
            status: 'cancelled',
            adminNotes: 'Deposit request cancelled by user prior to admin verification.'
          };
        }
        return dep;
      })
    );
    if (cancelled) {
      showToast(`Deposit request ${depositId} has been cancelled.`, 'info');
      return true;
    }
    return false;
  };

  // Atomic & Idempotent Approval
  const approveDepositRequest = (
    depositId: string,
    adminNotes?: string
  ): { success: boolean; message: string } => {
    const deposit = deposits.find((d) => d.id === depositId);
    if (!deposit) {
      return { success: false, message: 'Deposit request not found.' };
    }
    if (deposit.status === 'approved') {
      return { success: false, message: 'Deposit has already been approved and credited. Duplicate credit blocked.' };
    }
    if (deposit.status === 'cancelled') {
      return { success: false, message: 'Cannot approve a cancelled deposit request.' };
    }

    const email = deposit.userEmail.toLowerCase().trim();
    const currentWallet = wallets[email] || {
      userId: deposit.userId,
      userEmail: email,
      balanceNGN: 0,
      currency: 'NGN',
      totalDepositedNGN: 0,
      totalSpentNGN: 0,
      lastUpdated: new Date().toISOString()
    };

    const balanceBefore = currentWallet.balanceNGN;
    const balanceAfter = balanceBefore + deposit.amountNGN;
    const txId = `WTX-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    const newTx: WalletTransaction = {
      id: txId,
      userId: deposit.userId,
      userEmail: email,
      type: 'deposit_credit',
      amountNGN: deposit.amountNGN,
      balanceBeforeNGN: balanceBefore,
      balanceAfterNGN: balanceAfter,
      referenceId: deposit.id,
      description: `Bank Transfer Deposit via Payrep MFB (Ref: ${deposit.paymentReference || deposit.depositReference})`,
      createdAt: new Date().toISOString()
    };

    const updatedWallet: UserWallet = {
      ...currentWallet,
      balanceNGN: balanceAfter,
      totalDepositedNGN: currentWallet.totalDepositedNGN + deposit.amountNGN,
      lastUpdated: new Date().toISOString()
    };

    // Update wallet
    setWallets((prev) => ({
      ...prev,
      [email]: updatedWallet
    }));

    // Append to immutable ledger
    setWalletTransactions((prev) => [newTx, ...prev]);

    // Update deposit request status
    setDeposits((prev) =>
      prev.map((d) =>
        d.id === depositId
          ? {
              ...d,
              status: 'approved',
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'Administrator',
              ledgerTransactionId: txId,
              adminNotes: adminNotes || d.adminNotes || 'Bank transfer verified in Payrep MFB account. Wallet balance credited.'
            }
          : d
      )
    );

    showToast(`Approved deposit ${deposit.id}! Credited ₦${deposit.amountNGN.toLocaleString('en-NG')} to ${deposit.userName}.`, 'success');
    return { success: true, message: `Wallet successfully credited with ₦${deposit.amountNGN.toLocaleString('en-NG')}.` };
  };

  const rejectDepositRequest = (
    depositId: string,
    reason: string
  ): { success: boolean; message: string } => {
    if (!reason || !reason.trim()) {
      showToast('A mandatory rejection reason is required.', 'error');
      return { success: false, message: 'Rejection reason is required.' };
    }

    let found = false;
    setDeposits((prev) =>
      prev.map((d) => {
        if (d.id === depositId) {
          found = true;
          return {
            ...d,
            status: 'rejected',
            rejectionReason: reason.trim(),
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Administrator',
            adminNotes: `Deposit rejected: ${reason.trim()}`
          };
        }
        return d;
      })
    );

    if (found) {
      showToast(`Deposit request ${depositId} has been marked as rejected.`, 'info');
      return { success: true, message: 'Deposit request rejected.' };
    }
    return { success: false, message: 'Deposit request not found.' };
  };

  const payWithWallet = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: CartItem[];
    totalNGN: number;
    specialInstructions?: string;
    targetAccountUrl?: string;
  }): { success: boolean; order?: Order; error?: string } => {
    const email = (currentUser?.email || orderData.customerEmail).toLowerCase().trim();
    const currentWallet = wallets[email] || {
      userId: currentUser?.id || `usr-${Date.now()}`,
      userEmail: email,
      balanceNGN: 0,
      currency: 'NGN',
      totalDepositedNGN: 0,
      totalSpentNGN: 0,
      lastUpdated: new Date().toISOString()
    };

    if (currentWallet.balanceNGN < orderData.totalNGN) {
      const deficit = orderData.totalNGN - currentWallet.balanceNGN;
      showToast(`Insufficient wallet balance. You need ₦${deficit.toLocaleString('en-NG')} more.`, 'error');
      return { success: false, error: 'Insufficient wallet balance' };
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `DL-${randomSuffix}`;
    const rate = siteSettings.usdExchangeRate > 0 ? siteSettings.usdExchangeRate : 1450;
    const totalInCurrency = currency === 'USD' ? orderData.totalNGN / rate : orderData.totalNGN;

    const balanceBefore = currentWallet.balanceNGN;
    const balanceAfter = balanceBefore - orderData.totalNGN;
    const txId = `WTX-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    const newTx: WalletTransaction = {
      id: txId,
      userId: currentWallet.userId,
      userEmail: email,
      type: 'purchase_debit',
      amountNGN: orderData.totalNGN,
      balanceBeforeNGN: balanceBefore,
      balanceAfterNGN: balanceAfter,
      referenceId: orderId,
      description: `Service Purchase for Order ${orderId} (${orderData.items.length} items)`,
      createdAt: new Date().toISOString()
    };

    const updatedWallet: UserWallet = {
      ...currentWallet,
      balanceNGN: balanceAfter,
      totalSpentNGN: currentWallet.totalSpentNGN + orderData.totalNGN,
      lastUpdated: new Date().toISOString()
    };

    setWallets((prev) => ({
      ...prev,
      [email]: updatedWallet
    }));

    setWalletTransactions((prev) => [newTx, ...prev]);

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      items: orderData.items,
      totalNGN: orderData.totalNGN,
      currency: currency,
      exchangeRateUsed: rate,
      totalInCurrency: totalInCurrency,
      status: 'paid',
      paymentMethod: 'wallet_balance',
      paymentReference: txId,
      specialInstructions: orderData.specialInstructions,
      targetAccountUrl: orderData.targetAccountUrl,
      adminNotes: `Payment debited from verified wallet balance. Tx ID: ${txId}. In queue for fulfillment.`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    showToast(`Order ${orderId} paid instantly using your wallet balance!`, 'success');
    return { success: true, order: newOrder };
  };

  // Navigation router

  const navigateTo = (page: string, params?: NavigationParams) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.blogId) {
      setSelectedBlogId(params.blogId);
    }
    if (params?.categoryId) {
      setActiveCategory(params.categoryId);
    }
    if (params?.orderId) {
      const order = orders.find((o) => o.id === params.orderId);
      if (order) setCurrentOrder(order);
    }
  };

  // Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer'): boolean => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: role,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    if (role === 'admin') {
      setIsAdmin(true);
    }
    showToast(`Welcome back, ${user.name}!`, 'success');
    return true;
  };

  const register = (name: string, email: string, phone: string): boolean => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    showToast(`Account created successfully! Welcome, ${name}.`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    showToast('Signed out successfully.', 'info');
  };

  // Admin Controls
  const adminLogin = (passcode: string): boolean => {
    // Master admin passcode
    if (passcode.trim() === 'admin123' || passcode.trim() === '1082058717') {
      setIsAdmin(true);
      showToast('Administrator privileges unlocked.', 'success');
      return true;
    }
    showToast('Invalid administrator passcode. Use "admin123" for testing.', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    showToast('Logged out of Admin Panel.', 'info');
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings saved successfully.', 'success');
  };

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const id = `prod-custom-${Date.now()}`;
    const newProd: Product = { ...productData, id };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Added product "${newProd.title}"`, 'success');
  };

  const updateProduct = (id: string, productUpdates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productUpdates } : p))
    );
    showToast('Product updated successfully.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed.', 'info');
  };

  // Categories CRUD
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const id = `cat-${Date.now()}`;
    const newCat: Category = { ...categoryData, id };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added`, 'success');
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Category updated.', 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category deleted.', 'info');
  };

  const activePaymentMethods = paymentMethods
    .filter((method) => method.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const updatePaymentMethod = (id: string, updates: Partial<PaymentMethodConfig>) => {
    setPaymentMethods((prev) =>
      prev.map((method) => (method.id === id ? { ...method, ...updates } : method))
    );
    showToast('Payment method configuration updated.', 'success');
  };

  const resetPaymentMethods = () => {
    setPaymentMethods(PAYMENT_METHODS);
    try {
      localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(PAYMENT_METHODS));
    } catch {}
    showToast('Payment methods reset to default configuration.', 'info');
  };

  const resetAllToDefault = () => {
    setSiteSettings(INITIAL_SETTINGS);
    setCategories(INITIAL_CATEGORIES);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setDeposits(INITIAL_DEPOSITS);
    setWallets(INITIAL_WALLETS);
    setWalletTransactions(INITIAL_WALLET_TRANSACTIONS);
    setPaymentMethods(PAYMENT_METHODS);
    setCart([]);
    localStorage.clear();
    showToast('System configuration reset to default seed.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        orders,
        blogs,
        faqs,
        siteSettings,
        updateSiteSettings,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalNGN,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        currentOrder,
        setCurrentOrder,
        createOrder,
        updateOrderStatus,
        submitPaymentProof,
        deposits,
        wallets,
        walletTransactions,
        currentUserWallet,
        getUserWallet,
        createDepositRequest,
        submitDepositProof,
        cancelDepositRequest,
        approveDepositRequest,
        rejectDepositRequest,
        payWithWallet,
        activePage,
        selectedProductId,
        selectedBlogId,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        navigateTo,
        quickOrderProduct,
        setQuickOrderProduct,
        currentUser,
        login,
        register,
        logout,
        isAdmin,
        adminLogin,
        adminLogout,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        paymentMethods,
        activePaymentMethods,
        updatePaymentMethod,
        resetPaymentMethods,
        resetAllToDefault,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
