
async function testRegister() {
    const testData = {
        username: 'testuser_' + Date.now(),
        email: 'testuser_' + Date.now() + '@example.com',
        password: 'password123'
    };

    try {
        console.log('Attempting to register:', testData.email);
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testRegister();
