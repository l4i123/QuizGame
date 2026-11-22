// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

// Array of questions
const quizQuestions = [
  {
    question: "Коя е столицата на Австралия?",
    answers: [
      { text: "Сидни", correct: false },
      { text: "Мелбърн", correct: false },
      { text: "Канбера", correct: true },
      { text: "Бризбейн", correct: false }
    ],
  },
  {
    question: "Коя е столицата на Канада?",
    answers: [
      { text: "Торонто", correct: false },
      { text: "Ванкувър", correct: false },
      { text: "Монреал", correct: false },
      { text: "Отава", correct: true }
    ],
  },
  {
    question: "Коя е столицата на Бразилия?",
    answers: [
      { text: "Рио де Жанейро", correct: false },
      { text: "Сао Пауло", correct: false },
      { text: "Бразилия", correct: true },
      { text: "Салвадор", correct: false }
    ],
  },
  {
    question: "Коя е столицата на Япония?",
    answers: [
      { text: "Осака", correct: false },
      { text: "Токио", correct: true },
      { text: "Киото", correct: false },
      { text: "Йокохама", correct: false }
    ],
  },
  {
    question: "Коя е столицата на Швейцария?",
    answers: [
      { text: "Цюрих", correct: false },
      { text: "Женева", correct: false },
      { text: "Базел", correct: false },
      { text: "Берн", correct: true }
    ],
  },
  {
    question: "Коя е столицата на Турция?",
    answers: [
      { text: "Истанбул", correct: false },
      { text: "Анкара", correct: true },
      { text: "Измир", correct: false },
      { text: "Анталия", correct: false }
    ],
  },
  {
    question: "Коя е столицата на Норвегия?",
    answers: [
      { text: "Осло", correct: true },
      { text: "Берген", correct: false },
      { text: "Стокхолм", correct: false },
      { text: "Хелзинки", correct: false }
    ],
  },
  {
    question: "Коя е столицата на Аржентина?",
    answers: [
      { text: "Сантяго", correct: false },
      { text: "Монтевидео", correct: false },
      { text: "Буенос Айрес", correct: true },
      { text: "Лима", correct: false }
    ],
  },
  {
    question: "Коя е столицата на Египет?",
    answers: [
      { text: "Александрия", correct: false },
      { text: "Кайро", correct: true },
      { text: "Гиза", correct: false },
      { text: "Луксор", correct: false }
    ],
  },
  {
    question: "Коя е столицата на Южна Корея?",
    answers: [
      { text: "Пусан", correct: false },
      { text: "Инчон", correct: false }, 
      { text: "Сеул", correct: true }, 
      { text: "Тегу", correct: false }
    ],
  }
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false; 

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startBtn.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    progressBar.style.width = "0%";

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercentage = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercentage + "%";

    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.append(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;
    const selectedButton = event.currentTarget;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    Array.from(answersContainer.children).forEach((button) => {
        button.disabled = true;

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    const completedPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = completedPercentage + "%";

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            quizScreen.classList.remove("active");
            resultScreen.classList.add("active");
            finalScoreSpan.textContent = score;
            maxScoreSpan.textContent = quizQuestions.length;

            if (score === quizQuestions.length) {
                resultMessage.textContent = "Отличен резултат!";
            } else if (score >= quizQuestions.length / 2) {
                resultMessage.textContent = "Добър резултат!";
            } else {
                resultMessage.textContent = "Опитай отново!";
            }
        }
    }, 1000);
}

function restartQuiz() {
    startQuiz();
}