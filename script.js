async function sendMessage(){

let box = document.getElementById("message");
let chat = document.getElementById("chat");

let question = box.value.trim();

if(!question) return;


chat.innerHTML += `
<div class="user">${question}</div>
`;

box.value="";


let response = await fetch(
"https://speaker-smart-tunnel-connectivity.trycloudflare.com",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:
`<|system|>
You are Quinela, a helpful AI assistant.
Give short, clear answers.
Do not repeat words.
Do not introduce yourself unless asked.
Keep answers under 50 words.
</s>

<|user|>
${question}
</s>

<|assistant|>`,

n_predict:60,

temperature:0.3,

repeat_penalty:1.2

})

});


let data = await response.json();


chat.innerHTML += `
<div class="ai">${data.content}</div>
`;

chat.scrollTop = chat.scrollHeight;

}
