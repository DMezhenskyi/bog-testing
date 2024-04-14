import { Injectable, inject } from '@angular/core';
import { CartService } from '../feature/cart/cart.service';
import { DiscountService } from './discount.service';
import { PriceService } from './price.service';
import { BehaviorSubject, map, withLatestFrom } from 'rxjs';
import { Order, UserInfo } from './models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  #cart = inject(CartService);
  #discount = inject(DiscountService);
  #price = inject(PriceService);

  #state = new BehaviorSubject<null | Order>(null);

  order$ = this.#state.asObservable().pipe(
    withLatestFrom(
      this.#cart.items$,
      this.#price.final$,
      this.#price.netTotal$,
      this.#price.appliedVAT$,
      this.#discount.discount$
    ),
    map(([_, items, finalPrice, netPrice, tax, discount]) => ({
      items,
      price: {
        finalPrice,
        netPrice,
        tax,
        discount,
      },
    }))
  );

  checkout(userInfo: UserInfo) {
    this.order$.subscribe((order) => {
      console.log('Checking out', {
        order,
        userInfo,
      });
    });
  }
}
