import { Drink } from './types';

export const AVAILABLE_CASH = [100, 500, 1000, 5000, 10000] as const;

export const DRINKS: Drink[] = [
  { id: 'cola', name: '콜라', price: 1100, stock: 1 },
  { id: 'water', name: '물', price: 600, stock: 5 },
  { id: 'coffee', name: '커피', price: 700, stock: 2 },
]; 