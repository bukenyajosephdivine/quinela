```javascript
const API_URL = "https://rest-greatest-lawn-prep.trycloudflare.com";

async function sendMessage() {

    const input = document.getElementById("message");
    const chat = document.getElementById("chat");

    const question = input.value.trim();

    if (!question) return;

    chat.innerHTML += `
        <div class="user">${question}</div>
    `;

    input.value = "";

    try {

        const response = await fetch(`${API_URL}/completion`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                prompt: `You are Quinela, a helpful and intelligent AI assistant.

Answer ONLY the user's current question.

Rules:
- Give a short, direct answer.
- Use 1 to 4 sentences.
- Do not continue a previous conversation.
- Do not write "User:".
- Do not write "Quinela:".
- Do not create imaginary dialogue.
- Do not repeat the question.
- Do not add unrelated information.

Question:
${question}

Answer:`,

                n_predict: 80,
                temperature: 0.2,
                repeat_penalty: 1.2,
                stop: ["User:", "Quinela:"]

            })
        });

        const data = await response.json();

        console.log(data);

        const answer = data.content;

        chat.innerHTML += `
            <div class="ai">${answer || "I couldn't generate a response."}</div>
        `;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        console.error(error);

        chat.innerHTML += `
            <div class="ai">
                Connection error. Quinela couldn't reach her AI.
            </div>
        `;
    }
}
```
