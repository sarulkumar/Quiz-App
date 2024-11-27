const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswerIndex: 2 },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswerIndex: 1 },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], correctAnswerIndex: 0 },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswerIndex: 3 },
  { question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswerIndex: 2 },
  { question: "What is the currency of Japan?", options: ["Yen", "Dollar", "Euro", "Pound"], correctAnswerIndex: 0 },
  { question: "What is the tallest mountain in the world?", options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"], correctAnswerIndex: 1 },
  { question: "Who was the first president of the United States?", options: ["Lincoln", "Washington", "Jefferson", "Adams"], correctAnswerIndex: 1 },
  { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Osmium", "Ozone", "Oganesson"], correctAnswerIndex: 0 },
  { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Platinum", "Iron"], correctAnswerIndex: 1 }
];

let currentQuestionIndex = 0;
let score = 0;
let username = "";

// Start Quiz
function startQuiz() {
  username = document.getElementById("username").value;
  if (!username) {
    alert("Please enter your name to start the quiz!");
    return;
  }
  document.getElementById("intro-screen").style.display = 'none';
  document.getElementById("quiz-container").style.display = 'block';
  loadQuestion();
}

// Load Question
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-text").textContent = question.question;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = '';  // Clear previous options
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    button.onclick = () => handleAnswer(index);
    optionsContainer.appendChild(button);
  });

  document.getElementById("feedback-container").style.display = 'none';
  document.getElementById("next-button").style.display = 'none';
  document.getElementById("previous-button").style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
  updateProgressBar();
}

// Handle Answer
function handleAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  const correctIndex = question.correctAnswerIndex;
  const feedbackContainer = document.getElementById("feedback-container");

  // Reset button styles
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(button => {
    button.classList.remove("correct", "incorrect");
  });

  // Check answer
  if (selectedIndex === correctIndex) {
    score++;
    feedbackContainer.textContent = "Correct!";
    feedbackContainer.className = 'correct';
  } else {
    feedbackContainer.textContent = `Incorrect! The correct answer is: ${question.options[correctIndex]}`;
    feedbackContainer.className = 'incorrect';
    // Mark the selected answer as incorrect and add red border
    buttons[selectedIndex].classList.add('incorrect');
    // Mark the correct answer with green background and tick
    buttons[correctIndex].classList.add('correct');
  }

  feedbackContainer.style.display = 'block';
  buttons.forEach(button => button.disabled = true);

  document.getElementById("next-button").style.display = 'block';
}

// Go to next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Go to previous question
function previousQuestion() {
  currentQuestionIndex--;
  loadQuestion();
}

// Show result
function showResult() {
  document.getElementById("quiz-container").style.display = 'none';
  const resultScreen = document.getElementById("result-screen");
  resultScreen.style.display = 'block';

  document.getElementById("final-score").textContent = `${score} out of 10`;

  if (score >= 8) {
    document.getElementById("result-text").textContent = "Pass!";
    document.getElementById("result-text").classList.add('pass');
  } else {
    document.getElementById("result-text").textContent = "Fail!";
    document.getElementById("result-text").classList.add('fail');
  }

  resultScreen.style.animation = 'fadeIn 2s ease-in-out';
}

// Restart quiz
function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("result-screen").style.display = 'none';
  document.getElementById("intro-screen").style.display = 'block';
}

// Update Progress Bar
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}
