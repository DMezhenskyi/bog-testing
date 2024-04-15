import { TestBed } from '@angular/core/testing';
import { PRODUCT_BASE_URL, ProductUrlPipe } from './product-url.pipe';

describe('ProductUrlPipe', () => {
  it('should throw an error if base Url is not provided', () => {
    // SETUP
    TestBed.configureTestingModule({
      providers: [
        ProductUrlPipe,
        {
          provide: PRODUCT_BASE_URL,
          useValue: '',
        },
      ],
    });
    // ACTION
    const pipe = TestBed.inject(ProductUrlPipe);

    // ASSERTION
    expect(() => pipe.transform(1)).toThrow(/URL was not provided/i);
  });

  it('should throw an error if id is not provided', () => {
    TestBed.configureTestingModule({
      providers: [
        ProductUrlPipe,
        {
          provide: PRODUCT_BASE_URL,
          useValue: 'https://test.com',
        },
      ],
    });
    const pipe = TestBed.inject(ProductUrlPipe);
    expect(() => pipe.transform('')).toThrow(/Invalid product id/i);
  });

  it('should return a valid product URL', () => {
    TestBed.configureTestingModule({
      providers: [
        ProductUrlPipe,
        {
          provide: PRODUCT_BASE_URL,
          useValue: 'https://test.com',
        },
      ],
    });
    const pipe = TestBed.inject(ProductUrlPipe);
    const result = pipe.transform(1);
    expect(result).toBe('https://test.com/product/1');
  });
  
  it('should properly handle forward slashes', () => {
    TestBed.configureTestingModule({
      providers: [
        ProductUrlPipe,
        {
          provide: PRODUCT_BASE_URL,
          useValue: 'https://test.com/',
        },
      ],
    });
    const pipe = TestBed.inject(ProductUrlPipe);

    const result = pipe.transform(1);

    expect(result).toBe('https://test.com/product/1');
  });
});
