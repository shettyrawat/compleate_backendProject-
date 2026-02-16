async function testEndpoint() {
    try {
        const response = await fetch('http://localhost:5000/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Hello! can you answer general questions?" })
        });
        const data = await response.json();
        console.log("Response Status:", response.status);
        console.log("Response Data:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Endpoint Test Error:", e.message);
    }
}
testEndpoint();
