const fetch = require('node-fetch'); // Импортируем библиотеку node-fetch для выполнения http-запроса

const BASE_URL = 'https://bookstore.demoqa.com/Account/v1'; // Определяем базовый URL для API

async function createUser(username, password) { // !!! Асинхронная функция для создания пользователя
  const response = await fetch(`${BASE_URL}/User`, { // Отправляет POST-запрос на endpoint /User
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/9.3.2'
    },
    body: JSON.stringify({ userName: username, password: password }) // Отправляет данные пользователя в JSON-формате
  });
  return response; // Возвращает ответ от сервера
}

async function generateToken(username, password) { // !!! Асинхронная функция для генерации токена
  const response = await fetch(`${BASE_URL}/GenerateToken`, { // Отправляет POST-запрос на endpoint /GenerateToken
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/9.3.2'
    },
    body: JSON.stringify({ userName: username, password: password })
  }); // Отправляет учетные данные пользователя в JSON-формате
  return response; // Возвращает ответ от сервера
}

describe('Bookstore API Tests', () => { // Описывает набор тестов для API букстора
  const validUsername = 'testuser' + Math.floor(Math.random() * 10000); // Генерирует случайное имя пользователя
  const validPassword = 'Test@123'; // Устанавливает валидный пароль
  const invalidPassword = 'weakpassword'; // Устанавливает невалидный пароль

  test('1. Успешное создание пользователя', async () => { // Тест на успешное создание пользователя
    const response = await createUser(validUsername, validPassword);
    const data = await response.json();
    expect(response.status).toBe(201); // Проверяет, что статус ответа 201 (Created)
    expect(data).toHaveProperty('userID'); // Проверяет наличие userID в ответе
    expect(data.username).toBe(validUsername); // Проверяет, что возвращенное имя пользователя соответствует отправленному
  });

  test('2. Создание пользователя с ошибкой, логин уже используется', async () => { // Тест на попытку создания пользователя с существующим логином
    const response = await createUser(validUsername, validPassword);
    expect(response.status).toBe(406); // Проверяет, что статус ответа 406 (Not Acceptable)
    const data = await response.json();
    expect(data.message).toContain('User exists!'); // Проверяет, что сообщение об ошибке содержит "Пользователь существует!"
  });

  test('3. Создание пользователя с ошибкой, пароль не подходит', async () => { // Тест на попытку создания пользователя с невалидным паролем
    const response = await createUser('newuser' + Math.floor(Math.random() * 10000), invalidPassword);
    expect(response.status).toBe(400); // Проверяет, что статус ответа 400 (Bad Request)
    const data = await response.json();
    expect(data.message).toContain('Passwords must have at least one non alphanumeric character'); // Проверяет, что сообщение об ошибке содержит информацию о требованиях к паролю
  });

  test('4. Успешная генерация токена', async () => { // Тест на успешную генерацию токена
    const response = await generateToken(validUsername, validPassword);
    expect(response.status).toBe(200); // Проверяет, что статус ответа 200 (OK)
    const data = await response.json();
    expect(data).toHaveProperty('token');  // Проверяет наличие токена в ответе
    expect(data.status).toBe('Success'); // Проверяет, что статус в ответе "Успех"
  });

  test('5. Генерация токена с ошибкой', async () => { // Тест на попытку генерации токена с неверным паролем
    const response = await generateToken(validUsername, 'wrongpassword');
    expect(response.status).toBe(200); // Проверяет, что статус ответа 200 (API возвращает 200 даже при неудаче)
    const data = await response.json();
    expect(data.status).toBe('Failed'); // Проверяет, что статус в ответе "Неуспешный"
  });
});