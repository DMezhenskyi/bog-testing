import { Injectable } from '@angular/core';

export interface Country {
  [key: string]: {
    name: string;
    vat: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TaxCalculatorService {
  readonly countries: Country = Object.freeze({
    ge: { name: 'Georgia', vat: 18 },
    ua: { name: 'Ukraine', vat: 20 },
    at: { name: 'Austria', vat: 20 },
    uk: { name: 'United Kingdom', vat: 20 },
    pl: { name: 'Poland', vat: 23 },
  });

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
