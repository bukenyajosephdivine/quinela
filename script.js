const API_URL = "https://recipes-gateway-precipitation-conduct.trycloudflare.com";

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
                prompt: `You are Quinela, a helpful AI assistant.
Answer only the user's current question.
Give a short, direct and clear answer.
Do not continue or create a conversation.
Do not write "User:" or "Quinela:".
Do not repeat the question.
Do not invent dialogue.

${question}

Quinela:`,

                n_predict: 60,
                temperature: 0.3,
                repeat_penalty: 1.2
                stop: ["User:", "Quinela:"]
            })
        });

        const data = await response.json();

        console.log(data);

        // llama.cpp normally returns the answer here
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
