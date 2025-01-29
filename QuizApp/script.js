const questions = [
    {
        question: "Which country has the highest number of official languages?",
        answers: [
            {text: "India", correct: false},
            {text: "South Africa", correct: true},
            {text: "Switzerland", correct: false},
            {text: "Canada", correct: false}
        ]
    },
    {
        question: "What is the most consumed fruit in the world?",
        answers: [
            {text: "Apple", correct: false},
            {text: "Banana", correct: true},
            {text: "Orange", correct: false},
            {text: "Grapes", correct: false}
        ]
    },
    {
        question: "Which country was the first to grant women the right to vote?",
        answers: [
            {text: "United States", correct: false},
            {text: "New Zealand", correct: true},
            {text: "United Kingdom", correct: false},
            {text: "Canada", correct: false}
        ]
    },
    {
        question: "What is the only food that never spoils?",
        answers: [
            {text: "Rice", correct: false},
            {text: "Honey", correct: true},
            {text: "Salt", correct: false},
            {text: "Sugar", correct: false}
        ]
    },
    {
        question: "Which animal has the largest eyes in the world?",
        answers: [
            {text: "Elephant", correct: false},
            {text: "Squid", correct: true},
            {text: "Whale", correct: false},
            {text: "Ostrich", correct: false}
        ]
    },
    {
        question: "What is the rarest blood type in the world?",
        answers: [
            {text: "O-", correct: false},
            {text: "AB-", correct: true},
            {text: "A-", correct: false},
            {text: "B-", correct: false}
        ]
    },
    {
        question: "Who invented the first practical telephone?",
        answers: [
            {text: "Nikola Tesla", correct: false},
            {text: "Thomas Edison", correct: false},
            {text: "Alexander Graham Bell", correct: true},
            {text: "Michael Faraday", correct: false}
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            {text: "Amazon River", correct: true},
            {text: "Nile River", correct: false},
            {text: "Yangtze River", correct: false},
            {text: "Mississippi River", correct: false}
        ]
    },
    {
        question: "Which planet is the hottest in our solar system?",
        answers: [
            {text: "Venus", correct: true},
            {text: "Mercury", correct: false},
            {text: "Mars", correct: false},
            {text: "Jupiter", correct: false}
        ]
    },
    {
        question: "Who is credited with the discovery of penicillin?",
        answers: [
            {text: "Louis Pasteur", correct: false},
            {text: "Alexander Fleming", correct: true},
            {text: "Marie Curie", correct: false},
            {text: "Isaac Newton", correct: false}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionsIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    nextButton.disabled = false; // Ensure button isn't disabled when resetting
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionsIndex++;
    if (currentQuestionsIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionsIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();


