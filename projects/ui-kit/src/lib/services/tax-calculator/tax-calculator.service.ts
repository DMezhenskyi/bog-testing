import { Inject, Injectable, InjectionToken, inject } from '@angular/core';

export interface Country {
  [key: string]: {
    name: string;
    vat: number;
  };
}

export const COUNTRIES = new InjectionToken<Country>('countries', {
  providedIn: 'root',
  factory: () =>
    Object.freeze({
      ge: { name: 'Georgia', vat: 18 },
      ua: { name: 'Ukraine', vat: 20 },
      at: { name: 'Austria', vat: 20 },
      uk: { name: 'United Kingdom', vat: 20 },
      pl: { name: 'Poland', vat: 23 },
      ir: { name: 'Whatever Country', vat: 25 },
    })
});

@Injectable({
  providedIn: 'root',
})
export class TaxCalculatorService {


  countries = inject(COUNTRIES);

  calculateVAT(price: number, countryKey: string, isB2B = false) {
    if (!this.countries[countryKey]) {
      throw new Error(`This country isn't supported...`);
    }
    if (price < 0) {
      throw new Error(`The price can not be a negative number...`);
    }
    if (isB2B) {
      return 0;
    }
    return (price / 100) * this.countries[countryKey].vat;
  }
}
