const apiKey = "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";

let messages = [];
const chatContainer = document.getElementById("chat-container");
const toggleButton = document.getElementById("toggle-button");

toggleButton.addEventListener("click", toggleChat);

function toggleChat() {
  chatContainer.classList.toggle("hidden");
  toggleButton.textContent = chatContainer.classList.contains("hidden")
    ? "+"
    : "−";
}

function sendGPTMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.textContent = userInput;
  document.getElementById("messages").appendChild(userMessage);

  messages.push({ role: "user", content: userInput });

  document.getElementById("user-input").value = "";

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botResponse = data.choices[0].message.content.trim();

      const botMessage = document.createElement("div");
      botMessage.className = "message bot-message";

      if (botResponse.includes("```")) {
        const codeMessage = document.createElement("div");
        codeMessage.className = "message bot-message code-message";
        codeMessage.innerHTML = botResponse.replace(/```/g, "");
        botMessage.appendChild(codeMessage);
      } else {
        botMessage.textContent = botResponse;
      }

      document.getElementById("messages").appendChild(botMessage);

      messages.push({ role: "assistant", content: botResponse });

      document.getElementById("messages").scrollTop =
        document.getElementById("messages").scrollHeight;
    })
    .catch((error) => console.error("Error:", error));
}

let isDragging = false;
let offsetX, offsetY;

document.getElementById("chat-header").addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - chatContainer.getBoundingClientRect().left;
  offsetY = e.clientY - chatContainer.getBoundingClientRect().top;
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
  if (isDragging) {
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    const minLeft = 0;
    const maxLeft = window.innerWidth - chatContainer.offsetWidth;
    const minTop = 0;
    const maxTop = window.innerHeight - chatContainer.offsetHeight;

    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
    newTop = Math.max(minTop, Math.min(newTop, maxTop));

    chatContainer.style.left = `${newLeft}px`;
    chatContainer.style.top = `${newTop}px`;
  }
}

function onMouseUp() {
  isDragging = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

export default sendGPTMessage;
