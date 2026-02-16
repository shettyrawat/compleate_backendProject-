const testLogin = async () => {
    try {
        console.log('Testing login...');
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                identifier: 'test@example.com',
                password: 'password123'
            })
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Login successful:', data);
        } else {
            console.error('Login failed:', data);
        }
    } catch (error) {
        console.error('Network error:', error.message);
    }
};

testLogin();
