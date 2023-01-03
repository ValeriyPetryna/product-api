// used *as const* feature to avoid enum problems

export const INVOICE_STATUS = {
  CREATED: 'CREATED',
  PAID: 'PAID',
} as const;

export type InvoiceStatus = keyof typeof INVOICE_STATUS;
