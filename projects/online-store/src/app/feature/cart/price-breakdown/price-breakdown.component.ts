import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PriceService } from '../../../core/price.service';
import { DiscountService } from '../../../core/discount.service';

@Component({
  selector: 'app-price-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-breakdown.component.html',
  styleUrls: ['./price-breakdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceBreakdownComponent {
  price = inject(PriceService);
  discount = inject(DiscountService);
}
