import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductUrlPipe } from 'ui-kit';

@Component({
  standalone: true,
  imports: [FormsModule, ProductUrlPipe],
  template: ` <p class="element-description">
      This is pipe which takes a product id and returns the link to the product
      as a string
    </p>
    <div class="showcase">
      <h5>Type product ID in the input...</h5>
      <div class="state">
        <label>
          Product Id:
          <input [(ngModel)]="productId" type="text" />
        </label>
        <p style="margin-top: 10px;">
          Product URL: <b>{{ productId | productUrl }}</b>
        </p>
      </div>
    </div>`,
})
export class DemoProductLinkerComponent {
  productId = 1;
}
