import { CartItem, Discount } from '../feature/cart/cart.model';
import { Item } from '../feature/courses/courses.model';
export interface NetworkErrorStatus {
  status: 'error';
  error: string;
}
export interface NetworkSuccessStatus<T> {
  status: 'success';
  data: T;
}

export interface NetworkLoadingStatus {
  status: 'loading';
}
export type NetworkStatus<T = any> =
  | NetworkLoadingStatus
  | NetworkSuccessStatus<T>
  | NetworkErrorStatus;

export interface Order {
  items: CartItem<Item>[];
  price: {
    finalPrice: number;
    netPrice: number;
    tax: number;
    discount: Discount;
  };
}
export interface UserInfo {
  displayName: string;
  email: string;
}
