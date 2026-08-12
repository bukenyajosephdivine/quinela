const API_URL = "https://clear-affiliated-jump-census.trycloudflare.com";

async function sendMessage() {

    const input = document.getElementById("message");
    const chat = document.getElementById("chat");

    const question = input.value.trim();

    if (!question) return;

    chat.innerHTML += `
        <div class="user">${question}</div>
    `;

    input.value = "";

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch(`${API_URL}/completion`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: `You are Quinela, a helpful AI assistant.

Answer the user's question directly.

Keep your answer short and clear.
Do not create a conversation.
Do not write User:.
Do not write Quinela:.
Do not repeat the question.

Question:
${question}

Answer:`,

                n_predict: 60,
                temperature: 0.3,
                repeat_penalty: 1.2
            })
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        console.log("Quinela:", data);

        let answer = data.content;

        if (!answer) {
            throw new Error("No answer received.");
        }

        answer = answer.trim();

        answer = answer.replace(/^Quinela:\s*/i, "");
        answer = answer.replace(/^User:\s*/i, "");

        if (answer.includes("User:")) {
            answer = answer.split("User:")[0];
        }

        if (answer.includes("Quinela:")) {
            answer = answer.split("Quinela:")[0];
        }

        answer = answer.trim();

        chat.innerHTML += `
            <div class="ai">${answer}</div>
        `;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        console.error("Quinela error:", error);

        chat.innerHTML += `
            <div class="ai">
                Quinela is currently unavailable. Please try again.
            </div>
        `;

        chat.scrollTop = chat.scrollHeight;
    }
}
