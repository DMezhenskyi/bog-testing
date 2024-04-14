export interface CartItem<T> {
  quantity: number;
  item: T;
}
export interface Discount {
  name: string;
  amount: number;
  validUntil?: Date;
}
