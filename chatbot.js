const questionBank = [
  {
    keywords: ["html", "semantic", "structure"],
    answer: "For this site, semantic HTML means using header, nav, main, section, article, table, form, and footer where they make sense."
  },
  {
    keywords: ["css", "style", "design"],
    answer: "The main CSS file controls the dark theme, spacing, typography, cards, tables, forms, and responsive layout."
  },
  {
    keywords: ["table", "data", "log"],
    answer: "The Project Log page uses a real table with a caption, column headers, and row headers. It tracks project ideas, status, main skills, and target period."
  },
  {
    keywords: ["form", "feedback", "contact"],
    answer: "The Feedback page has visible labels, fieldsets, legends, required fields, and a submit button. It is a static mock form, so it does not actually send messages."
  },
  {
    keywords: ["github", "pages", "publish"],
    answer: "GitHub Pages publishes the static files online. The important part is keeping index.html in the root folder and making sure the links are relative and working."
  },
  {
    keywords: ["accessibility", "skip", "keyboard"],
    answer: "Accessibility features include a skip link, visible labels, keyboard focus styles, fieldsets, legends, and readable contrast."
  }
];

const chatWindow = document.querySelector("#chat-window");
const chatForm = document.querySelector("#chat-form");
const userInput = document.querySelector("#user-question");

function addMessage(text, sender) {
  const message = document.createElement("p");
  message.classList.add("chat-message", sender);
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function findAnswer(question) {
  const cleanedQuestion = question.toLowerCase();
  const match = questionBank.find((item) =>
    item.keywords.some((keyword) => cleanedQuestion.includes(keyword))
  );

  if (match) {
    return match.answer;
  }

  return "I do not have that answer in my question bank yet. Try asking about HTML, CSS, the table, the form, GitHub Pages, or accessibility.";
}

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const question = userInput.value.trim();
  if (question === "") {
    addMessage("Please type a question first.", "bot");
    return;
  }

  addMessage(question, "user");
  addMessage(findAnswer(question), "bot");
  userInput.value = "";
  userInput.focus();
});

addMessage("Hi, I am the project helper bot. Ask me about HTML, CSS, tables, forms, GitHub Pages, or accessibility.", "bot");
