const url: string = 'https://reqres.in';

(async(): Promise<void> => {
    const responce: Response = await fetch(input: `${url}/api/users`, init:{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value: {
            "name": "Dmitrii",
            "job": "leader"
        });
    });
    console.log('response.status', responce.status)

    const data = await Response.json()
    console.log('user', data)
});