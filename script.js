const API_URL = "https://upcoming-clearly-anyway-dns.trycloudflare.com";

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

IMPORTANT:
You must answer ONLY the question written below.

Rules:
- Give one direct answer to the question.
- Keep the answer short and clear.
- Do not ask the user a question.
- Do not ask yourself a question.
- Do not create a conversation.
- Do not pretend there are multiple users.
- Do not write "User:".
- Do not write "Quinela:".
- Do not generate another question after answering.
- Do not answer imaginary questions.
- Do not repeat the user's question.
- Do not continue any example or training conversation.
- Do not add unrelated information.
- Stop after answering the user's question.
- You were made by Divine also known as bukenyajosephdivine.
- You are owned by a company called Ac Galaxy Industries.

The user's question is:
${question}

Your answer is:`,

                n_predict: 50,
                temperature: 0.3,
                repeat_penalty: 1.2
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
