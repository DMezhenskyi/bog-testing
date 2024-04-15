import { COUNTRIES, TaxCalculatorService } from './tax-calculator.service';
import { TestBed } from '@angular/core/testing';

describe('TaxCalculatorService', () => {
  let service: TaxCalculatorService;
  beforeEach(() => {
    // SETUP
    TestBed.configureTestingModule({
      providers: [
        {
          provide: COUNTRIES,
          useValue: {
            ge: { name: 'Georgia', vat: 18 },
          },
        },
      ],
    });
    service = TestBed.inject(TaxCalculatorService);
  });
  it(`should properly calculate VAT for a given country`, () => {
    // ACTION
    const result = service.calculateVAT(100, 'ge');

    // ASSERTION
    expect(result).toBe(18);
  });
  it(`should return 0 if isB2B flag is true`, () => {
    // ACTION
    const result = service.calculateVAT(100, 'ge', true);
    
    // ASSERTION
    expect(result).toBe(0);
  });
  describe(`TaxCalculatorService: Error Handling`, () => {
    it(`should throw error if country isn't supported`, () => {
      expect(() => service.calculateVAT(100, 'ir')).toThrow(/isn't supported/i);
    });
    it(`should throw error if price is negative number`, () => {
      expect(() => service.calculateVAT(-100, 'ge')).toThrow(
        /can not be a negative number/i
      );
    });
  });
});
