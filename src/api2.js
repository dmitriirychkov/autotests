const baseUrl = 'https://reqres.in/api';
;(async () => {
try {
const response = await fetch(`${baseUrl}/users`) // Promise
const data = await response.json() // .blob() .text()
console.log('status', response.status) // response.headers
console.log('data', data)
} catch (error) {
console.error('Не получилось получить список юзеров', error)
}
})()