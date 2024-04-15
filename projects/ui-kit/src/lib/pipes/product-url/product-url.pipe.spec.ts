import { TestBed } from '@angular/core/testing';
import { PRODUCT_BASE_URL, ProductUrlPipe } from './product-url.pipe';

describe('ProductUrlPipe', () => {

  it('should throw an error if base Url is not provided', () => {
    const { pipe } = setup('');
    expect(() => pipe.transform(1)).toThrow(/URL was not provided/i);
  });

  it('should throw an error if id is not provided', () => {
    const { pipe } = setup('https://test.com');
    expect(() => pipe.transform('')).toThrow(/Invalid product id/i);
  });

  it('should return a valid product URL', () => {
    const { pipe } = setup('https://test.com');
    const result = pipe.transform(1);
    expect(result).toBe('https://test.com/product/1');
  });
  
  it('should properly handle forward slashes', () => {
    const { pipe } = setup('https://test.com');
    expect(pipe.transform(1)).toBe('https://test.com/product/1');
  });
});

function setup(baseUrl: string) {
  TestBed.configureTestingModule({
    providers: [
      ProductUrlPipe,
      {
        provide: PRODUCT_BASE_URL,
        useValue: baseUrl,
      },
    ],
  });
  const pipe = TestBed.inject(ProductUrlPipe);

  return { pipe };
}
