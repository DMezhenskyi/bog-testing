import { Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, defer, map, switchMap, timer } from 'rxjs';
import { Discount } from '../feature/cart/cart.model';

@Injectable({ providedIn: 'root' })
export class DiscountService {
  #discount = new BehaviorSubject<null | Discount>(null);

  discount$ = this.#discount.asObservable();
  expired$ = this.discount$.pipe(
    switchMap((discount) =>
      discount && discount.validUntil ? timer(discount.validUntil) : NEVER
    )
  );
  remaining$ = this.discount$.pipe(
    switchMap((discount) =>
      discount?.validUntil
        ? defer(() => timer(0, 1000)).pipe(
            map(() => discount.validUntil!.getTime() - new Date().getTime())
          )
        : NEVER
    )
  );

  constructor() {
    this.expired$.subscribe(() => this.withdraw());
  }

  apply(discount: Discount) {
    this.#discount.next(discount);
  }
  withdraw() {
    this.#discount.next(null);
  }
  hasApplied() {
    return !!this.#discount.getValue();
  }
}
