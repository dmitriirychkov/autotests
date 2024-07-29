import { nameIsValid, fullTrim, getTotal } from '../src/app'; // Импортируем функции nameIsValid, fullTrim и getTotal из файла ../src/app.js

describe('nameIsValid function', () => { // Группируем тесты для функции nameIsValid
  test('returns true for valid names', () => { // Тест проверяет, что функция возвращает true для валидных имен
    expect(nameIsValid('danil')).toBe(true);
    expect(nameIsValid('dmitrii')).toBe(true);
  });

  test('returns false for invalid names', () => {   // Тест проверяет, что функция возвращает false для невалидных имен
    expect(nameIsValid('')).toBe(false);
    expect(nameIsValid('a')).toBe(false);
    expect(nameIsValid('Dmitrii')).toBe(false);
    expect(nameIsValid('Dmitrii Rychkov')).toBe(false);
  });

  test('returns false for non-string inputs', () => { // Тест проверяет, что функция возвращает false для нестроковых входных данных
    expect(nameIsValid(null)).toBe(false);
    expect(nameIsValid(undefined)).toBe(false);
    expect(nameIsValid(123)).toBe(false);
  });
});

describe('fullTrim function', () => { // Группируем тесты для функции fullTrim
  test('removes all whitespace from a string', () => { // Тест проверяет, что функция удаляет все пробелы из строки
    expect(fullTrim('  hello  world  ')).toBe('helloworld');
  });

  test('returns an empty string for whitespace-only input', () => { // Тест проверяет, что функция возвращает пустую строку для ввода, состоящего только из пробелов
    expect(fullTrim('   ')).toBe('');
  });

  test('handles null and undefined inputs', () => { // Тест проверяет обработку null и undefined входных данных
    expect(fullTrim(null)).toBe('');
    expect(fullTrim(undefined)).toBe('');
  });
});

describe('getTotal function', () => { // Группируем тесты для функции getTotal
  test.each([ // Параметризированный тест с набором входных данных и ожидаемых результатов
    [[], 0, 0],
    [[{ price: 10, quantity: 10 }], 0, 100],
    [[{ price: 10, quantity: 1 }], 0, 10],
    [[{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }], 0, 100],
    [[{ price: 10, quantity: 10 }], 10, 90],
    [[{ price: 10, quantity: 10 }], 50, 50],
  ])('calculates total correctly for items %j with discount %i', (items, discount, expected) => { // Тест проверяет правильность расчета общей суммы для различных комбинаций товаров и скидок
    expect(getTotal(items, discount)).toBe(expected);
  });

  test('throws error for invalid discount', () => { // Тест проверяет, что функция выбрасывает ошибку для некорректных значений скидки
    expect(() => getTotal([], -10)).toThrow('Процент скидки не может быть отрицательным');
    expect(() => getTotal([], 110)).toThrow('Процент скидки не может быть больше 100');
    expect(() => getTotal([], 'invalid')).toThrow('Скидка должна быть числом');
  });

  test('handles empty input', () => { // Тест проверяет обработку пустого ввода
    expect(getTotal()).toBe(0);
  });
});