import { isNumber, toBooleanProperty } from './type-coercion';

describe('TypeCoercion Helper Function', () => {
  describe(`isNumber Function`, () => {
    it(`should treat integer 100 as a number`, () => {
      const result = isNumber(100);
      expect(result).toBe(true);
    });
    it(`should treat string '100' as a number`, () => {
      const result = isNumber('100');
      expect(result).toBe(true);
    });
    it(`should treat string '' as NOT a number`, () => {
      expect(isNumber('')).toBe(false);
    });
    it(`should treat string '100abc' as NOT a number`, () => {
      expect(isNumber('100abc')).toBe(false);
    });
    it(`should treat string {} as NOT a number`, () => {
      expect(isNumber({})).toBe(false);
    });
  });
  describe(`toBooleanProperty Function`, () => {
    it(`should coerce 'false' to boolean false`, () => {
      expect(toBooleanProperty('false')).toBe(false);
    });
    it(`should coerce '' to boolean true`, () => {
      expect(toBooleanProperty('')).toBe(true);
    });
    it(`should coerce null to boolean false`, () => {
      expect(toBooleanProperty(null)).toBe(false);
    });
  });
});
