import { InjectionToken, Pipe, PipeTransform, inject } from '@angular/core';
import { toNumberProperty } from '../../utils/type-coercion';
import { trimSlashes } from '../../utils/trim-str';

export const PRODUCT_BASE_URL = new InjectionToken<string | null>(
  'Product Url',
  {
    providedIn: 'root',
    factory: () => {
      console.warn(
        `Don't forget to provide your URL for PRODUCT_BASE_URL token`
      );
      return null;
    },
  }
);

@Pipe({
  name: 'productUrl',
  standalone: true,
})
export class ProductUrlPipe implements PipeTransform {
  private baseUrl = inject(PRODUCT_BASE_URL);

  transform(productId: string | number): string {
    const id = toNumberProperty(productId);
    if (!this.baseUrl) {
      throw new Error(`Base URL was not provided...`);
    }
    if (!id) {
      throw new Error(`Invalid product id... Provided: '${productId}'`);
    }
    return `${trimSlashes(this.baseUrl)}/product/${id}`;
  }
}
