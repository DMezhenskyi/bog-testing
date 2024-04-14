import { Injectable, inject } from '@angular/core';
import { map, combineLatest, distinctUntilChanged } from 'rxjs';
import { TaxCalculatorService } from 'ui-kit';

import { CartService } from '../feature/cart/cart.service';
import { DiscountService } from './discount.service';

@Injectable({ providedIn: 'root' })
export class PriceService {
  #cart = inject(CartService);
  #taxCalculator = inject(TaxCalculatorService);
  #discount = inject(DiscountService);

  netTotal$ = this.#cart.items$.pipe(
    map((items) =>
      items.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0)
    ),
    distinctUntilChanged()
  );
  appliedVAT$ = this.netTotal$.pipe(
    map((price) => this.#taxCalculator.calculateVAT(price, 'at')),
    distinctUntilChanged()
  );
  grossTotal$ = combineLatest([this.netTotal$, this.appliedVAT$]).pipe(
    map(([vat, net]) => vat + net),
    distinctUntilChanged()
  );
  final$ = combineLatest([this.#discount.discount$, this.grossTotal$]).pipe(
    map(([discount, gross]) => (!discount ? gross : gross - discount.amount)),
    distinctUntilChanged()
  );
}
