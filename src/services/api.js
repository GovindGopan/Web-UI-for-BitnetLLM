export async function fetchCompletion(messages) {
  try {
    const response = await fetch('http://localhost:8000/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });
    
    if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || "";
    } else {
        console.warn("Local backend returned error status:", response.status);
    }
  } catch (error) {
    console.warn("Local backend not reachable on 8000. Using mock response.");
  }
  
  // Fallback mock if backend is down
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`[Mock Response] I received ${messages.length} messages. This is a local test run with temp ${modelParams.temperature}.`);
    }, 1000);
  });
}
