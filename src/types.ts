export type PaymentMethod = 'CASH' | 'CARD';

export type CashType = 100 | 500 | 1000 | 5000;

export interface Drink {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface VendingMachineState {
  insertedMoney: number;
  selectedDrink: Drink | null;
  paymentMethod: PaymentMethod | null;
  purchaseStatus: 'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR';
  message: string;
  walletAmount: number;
} 