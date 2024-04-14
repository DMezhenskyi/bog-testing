import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from 'ui-kit';

import { CartService } from '../cart.service';
import { Item } from '../../courses/courses.model';
import { CartItem } from '../cart.model';
import { UserInfoComponent } from '../user-info/user-info.component';
import { PriceBreakdownComponent } from '../price-breakdown/price-breakdown.component';
import { OrderService } from '../../../core/order.service';
import { PriceService } from '../../../core/price.service';
import { DiscountService } from '../../../core/discount.service';

@Component({
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent,
    CommonModule,
    UserInfoComponent,
    PriceBreakdownComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cart = inject(CartService);
  order = inject(OrderService);
  price = inject(PriceService);
  discount = inject(DiscountService);
  destroyRef = inject(DestroyRef);

  @ViewChild(UserInfoComponent) userInfo?: UserInfoComponent;

  ngOnInit() {
    this.price.grossTotal$
      .pipe(debounceTime(0), takeUntilDestroyed(this.destroyRef))
      .subscribe((price) => {
        if (price > 1000) {
          !this.discount.hasApplied() &&
            this.discount.apply({
              name: 'DECODED_FRONTEND',
              amount: 50,
              validUntil: new Date(Date.now() + 1000 * 60), // applied for 5 mins
            });
        } else {
          this.discount.withdraw();
        }
      });
  }

  amountIncrement(item: CartItem<Item>) {
    this.cart.increment(item.item);
  }

  amountDecrement(item: CartItem<Item>) {
    this.cart.decrement(item.item);
  }

  checkout() {
    this.order.checkout(this.userInfo!.form.getRawValue());
  }
}
