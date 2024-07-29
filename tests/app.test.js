import { nameIsValid, fullTrim, getTotal } from '../src/app';

describe('nameIsValid function', () => {
  test('returns true for valid names', () => {
    expect(nameIsValid('john')).toBe(true);
    expect(nameIsValid('alice')).toBe(true);
  });

  test('returns false for invalid names', () => {
    expect(nameIsValid('')).toBe(false);
    expect(nameIsValid('a')).toBe(false);
    expect(nameIsValid('John')).toBe(false);
    expect(nameIsValid('john doe')).toBe(false);
  });

  test('returns false for non-string inputs', () => {
    expect(nameIsValid(null)).toBe(false);
    expect(nameIsValid(undefined)).toBe(false);
    expect(nameIsValid(123)).toBe(false);
  });
});

describe('fullTrim function', () => {
  test('removes all whitespace from a string', () => {
    expect(fullTrim('  hello  world  ')).toBe('helloworld');
  });

  test('returns an empty string for whitespace-only input', () => {
    expect(fullTrim('   ')).toBe('');
  });

  test('handles null and undefined inputs', () => {
    expect(fullTrim(null)).toBe('');
    expect(fullTrim(undefined)).toBe('');
  });
});

describe('getTotal function', () => {
  test.each([
    [[], 0, 0],
    [[{ price: 10, quantity: 10 }], 0, 100],
    [[{ price: 10, quantity: 1 }], 0, 10],
    [[{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }], 0, 100],
    [[{ price: 10, quantity: 10 }], 10, 90],
    [[{ price: 10, quantity: 10 }], 50, 50],
  ])('calculates total correctly for items %j with discount %i', (items, discount, expected) => {
    expect(getTotal(items, discount)).toBe(expected);
  });

  test('throws error for invalid discount', () => {
    expect(() => getTotal([], -10)).toThrow('Процент скидки не может быть отрицательным');
    expect(() => getTotal([], 110)).toThrow('Процент скидки не может быть больше 100');
    expect(() => getTotal([], 'invalid')).toThrow('Скидка должна быть числом');
  });

  test('handles empty input', () => {
    expect(getTotal()).toBe(0);
  });
});