```javascript
const API_URL = "https://rest-greatest-lawn-prep.trycloudflare.com";

async function sendMessage() {

    const input = document.getElementById("message");
    const chat = document.getElementById("chat");

    if (!input || !chat) {
        console.error("Message input or chat element was not found.");
        return;
    }

    const question = input.value.trim();

    if (question === "") {
        return;
    }

    // Show user message
    chat.innerHTML += `
        <div class="user">${question}</div>
    `;

    input.value = "";

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch(API_URL + "/completion", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                prompt:
`You are Quinela, a helpful AI assistant.

Answer the user's question directly.

Keep your answer short and clear.
Do not create a conversation.
Do not write User:.
Do not write Quinela:.
Do not repeat the question.

Question: ${question}

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

        console.log("AI response:", data);

        let answer = data.content;

        if (typeof answer !== "string" || answer.trim() === "") {
            throw new Error("No answer received from the AI.");
        }

        answer = answer.trim();

        // Remove unwanted conversation labels
        answer = answer.replace(/^Quinela:\s*/i, "");
        answer = answer.replace(/^User:\s*/i, "");

        // Stop anything after a new fake conversation
        const userIndex = answer.indexOf("User:");
        const quinelaIndex = answer.indexOf("Quinela:");

        if (userIndex !== -1) {
            answer = answer.substring(0, userIndex);
        }

        if (quinelaIndex !== -1) {
            answer = answer.substring(0, quinelaIndex);
        }

        answer = answer.trim();

        if (answer === "") {
            answer = "I couldn't generate a response.";
        }

        // Display AI answer
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
```
