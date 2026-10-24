/**
 * Digital Logs - Payment Methods Configuration
 * 
 * Strict Compliance Rule:
 * Only display payment methods that are actually available and configured.
 * Do not show card logos (Visa, Mastercard, Verve) as active proof of payment
 * acceptance unless a compatible, working automated payment gateway is configured.
 * 
 * Initial manual settlement channel:
 * - Bank Transfer (Payrep MFB / Direct Nigerian Naira ₦)
 * - Payrep MFB (Central Settlement Desk)
 * - Digital Logs Naira Wallet (Account Balance)
 */

export interface PaymentMethodConfig {
  id: string;
  displayName: string;
  shortName?: string;
  logoPath: string;
  isActive: boolean;
  displayOrder: number;
  currency?: string;
  type: 'bank_transfer' | 'card' | 'wallet' | 'other';
  altText: string;
  description?: string;
  requiresGateway?: boolean;
  gatewayStatus?: 'operational' | 'pending_gateway' | 'inactive';
  notes?: string;
}

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  // 1. Bank Transfer (Active & Primary Manual Channel)
  {
    id: 'bank-transfer',
    displayName: 'Bank Transfer',
    shortName: 'Bank Transfer',
    logoPath: '/images/payments/bank-transfer.svg',
    isActive: true,
    displayOrder: 1,
    currency: 'NGN (₦)',
    type: 'bank_transfer',
    altText: 'Bank Transfer (Nigerian Naira ₦ Direct Settlement)',
    description: 'Instant manual transfer via customer online banking app to Payrep MFB.',
    requiresGateway: false,
    gatewayStatus: 'operational',
    notes: 'Verified manually by Digital Logs admin against Payrep MFB transaction memo.'
  },

  // 2. Payrep MFB (Official Corporate Settlement Bank)
  {
    id: 'payrep-mfb',
    displayName: 'Payrep MFB',
    shortName: 'Payrep MFB',
    logoPath: '/images/payments/payrep-mfb.svg',
    isActive: true,
    displayOrder: 2,
    currency: 'NGN (₦)',
    type: 'bank_transfer',
    altText: 'Payrep Microfinance Bank Official Account Settlement',
    description: 'Official Digital Logs corporate account (2091223616 - DIVINE ELOZINO MICHAEL).',
    requiresGateway: false,
    gatewayStatus: 'operational',
    notes: 'Direct MFB account with real-time push alerts and zero intermediary processing fee.'
  },

  // 3. Digital Logs Naira Wallet (Stored Ledger Balance)
  {
    id: 'digital-logs-wallet',
    displayName: 'Digital Logs Wallet',
    shortName: 'Naira Wallet',
    logoPath: '/images/payments/dl-wallet.svg',
    isActive: true,
    displayOrder: 3,
    currency: 'NGN (₦)',
    type: 'wallet',
    altText: 'Digital Logs Customer Naira Wallet Balance',
    description: 'Direct zero-delay checkout utilizing customer verified wallet funds.',
    requiresGateway: false,
    gatewayStatus: 'operational',
    notes: 'Instant 1-click deduction from customer verified deposit balance.'
  },

  // 4. Mastercard (Inactive until card gateway is configured and live)
  {
    id: 'mastercard',
    displayName: 'Mastercard',
    shortName: 'Mastercard',
    logoPath: '/images/payments/mastercard.svg',
    isActive: false, // Inactive by default per compliance requirements
    displayOrder: 4,
    currency: 'NGN / USD',
    type: 'card',
    altText: 'Mastercard Debit & Credit Cards (Pending Gateway)',
    description: 'Mastercard 3D-Secure card processing.',
    requiresGateway: true,
    gatewayStatus: 'pending_gateway',
    notes: 'Requires active PCI-DSS compliant payment gateway (e.g., Paystack/Flutterwave).'
  },

  // 5. Visa (Inactive until card gateway is configured and live)
  {
    id: 'visa',
    displayName: 'Visa',
    shortName: 'Visa',
    logoPath: '/images/payments/visa.svg',
    isActive: false, // Inactive by default per compliance requirements
    displayOrder: 5,
    currency: 'NGN / USD',
    type: 'card',
    altText: 'Visa Debit & Credit Cards (Pending Gateway)',
    description: 'Verified by Visa card processing.',
    requiresGateway: true,
    gatewayStatus: 'pending_gateway',
    notes: 'Requires active PCI-DSS compliant payment gateway.'
  },

  // 6. Verve (Inactive until card gateway is configured and live)
  {
    id: 'verve',
    displayName: 'Verve',
    shortName: 'Verve',
    logoPath: '/images/payments/verve.svg',
    isActive: false, // Inactive by default per compliance requirements
    displayOrder: 6,
    currency: 'NGN (₦)',
    type: 'card',
    altText: 'Verve Interswitch Nigeria Cards (Pending Gateway)',
    description: 'Verve card settlement across Nigerian banking institutions.',
    requiresGateway: true,
    gatewayStatus: 'pending_gateway',
    notes: 'Requires Interswitch / Paystack card gateway integration.'
  }
];

/**
 * Returns only the payment methods that are active and currently accepted.
 * Guarantees that card logos are never falsely presented as accepted payment
 * methods without an operational gateway.
 */
export const getActivePaymentMethods = (customList?: PaymentMethodConfig[]): PaymentMethodConfig[] => {
  const source = customList || PAYMENT_METHODS;
  return source
    .filter((method) => method.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

/**
 * Returns all configured payment methods for administrative audit and configuration.
 */
export const getAllPaymentMethods = (): PaymentMethodConfig[] => {
  return [...PAYMENT_METHODS].sort((a, b) => a.displayOrder - b.displayOrder);
};
