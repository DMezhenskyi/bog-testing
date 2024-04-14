import { trimSlashes } from './trim-str';

describe('TrimStr Util Function', () => {
  it('should trim slashes from the end of the string', () => {
    expect(trimSlashes('https://test.com///')).toBe('https://test.com');
  });
  it('should trim slashes from the beginning of the string', () => {
    expect(trimSlashes('//https://test.com')).toBe('https://test.com');
  });
  it('should throw an error if param is not a string', () => {
    expect(() => trimSlashes(100)).toThrow(/invalid/i);
    expect(() => trimSlashes({})).toThrow(/invalid/i);
    expect(() => trimSlashes(null)).toThrow(/invalid/i);
  });
});
