// script.js - Dynamic Quiz Generator

// API endpoint for fetching trivia questions
const apiUrl = 'https://opentdb.com/api.php?amount=1&type=multiple';

// Index to keep track of the current question
let currentQuestionIndex = 0;

// Array to store fetched trivia questions
let questions = [];

// Function to fetch questions from the API
async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Save the fetched questions
        questions = data.results;
        // Display the first question
        displayQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

// Function to display the current question
function displayQuestion() {
    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];
    // Get HTML elements for question and options
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');

    // Display the question
    questionContainer.innerHTML = currentQuestion.question;

    // Create HTML for options
    const optionsHtml = currentQuestion.incorrect_answers.map(option =>
        `<button class="option" onclick="checkAnswer('${option}')">${option}</button>`
    );

    // Add the correct answer as an option
    optionsHtml.push(`<button class="option" onclick="checkAnswer('${currentQuestion.correct_answer}')">${currentQuestion.correct_answer}</button>`);

    // Display options
    optionsContainer.innerHTML = optionsHtml.join('');
}

// Function to check the selected answer
function checkAnswer(selectedAnswer) {
    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];
    // Get HTML elements for result and emoji rain
    const resultContainer = document.getElementById('result');
    const emojiRain = document.getElementById('emoji-rain');

    // Check if the selected answer is correct
    if (selectedAnswer === currentQuestion.correct_answer) {
        // Display correct result and trigger emoji rain
        resultContainer.textContent = 'Correct!';
        resultContainer.classList.add('correct-animation');
        createEmojiRain(emojiRain, 5, '🎉', '👍', '😊');
    } else {
        // Display incorrect result and trigger emoji rain
        resultContainer.innerHTML = `Incorrect. The correct answer is: <span style="color: #e74c3c;">${currentQuestion.correct_answer}</span>`;
        resultContainer.classList.add('incorrect-animation');
        createEmojiRain(emojiRain, 5, '❌', '😢');
    }
}

// Function to move to the next question
function nextQuestion() {
    // Move to the next question index
    currentQuestionIndex++;
    // Get HTML elements for result and emoji rain
    const resultContainer = document.getElementById('result');
    const emojiRain = document.getElementById('emoji-rain');

    // Clear previous result and emoji rain
    resultContainer.textContent = '';
    resultContainer.classList.remove('correct-animation', 'incorrect-animation');
    emojiRain.innerHTML = '';

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        // Display the next question
        displayQuestion();
    } else {
        // Display end of quiz message
        resultContainer.textContent = 'End of Quiz!';
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('question-container').innerHTML = '';
    }
}

// Initial fetch on page load
fetchQuestions();

// Function to show the about modal
function showAboutModal() {
    const aboutModal = document.getElementById('about-modal');
    aboutModal.style.display = 'flex';
}

// Function to hide the about modal
function hideAboutModal() {
    const aboutModal = document.getElementById('about-modal');
    aboutModal.style.display = 'none';
}

// Function to create emoji rain
function createEmojiRain(container, count, ...emojis) {
    container.innerHTML = emojis.map((emoji, index) =>
        `<div class="emoji ${index % 2 === 0 ? 'correct' : 'incorrect'}" style="top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw;">${emoji}</div>`
    ).join('');
}
