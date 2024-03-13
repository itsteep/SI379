/**
 * Cache a fetch() request in localStorage and return the cached data if it's not expired.
 * Useful if you are doing live editing refreshes and don't want to query the API every time.
 * 
 * @param {string} url The URL to fetch
 * @param {*} options The options to pass to fetch()
 * @param {number} cacheDuration The maximum age to use for cached data, in milliseconds
 * @returns A Promise that resolves to a Response object
 */
function fetchWithCache(url, options = {}, cacheDuration = 1000 * 60 * 60) { // Default cache duration is 1 hour
    // Utility function to create a Response object from data (like fetch() would)
    function getResponseObject(data) {
        return new Response(new Blob([JSON.stringify(data)]));
    }

    const cachedData = localStorage.getItem(url); // Check if we have cached data for this URL

    if (cachedData) { // If we do...
        const { timestamp, data } = JSON.parse(cachedData); // Parse the data from the cache
        // Note: This uses destructuring syntax. It's equivalent to:
        // const parsedCachedData = JSON.parse(cachedData);
        // const timestamp = parsedCachedData.timestamp;
        // const data = parsedCachedData.data;

        if (Date.now() - timestamp < cacheDuration) { //...and it's not expired,
            return Promise.resolve(getResponseObject(data)); // Return a promise whose value is the stored data
        } else { // it has expired, so remove it
            localStorage.removeItem(url);
        }
    }

    // If we don't have cached data or it's expired, fetch it from the network
    return fetch(url, options)
        .then((response) => response.json()) // Parse the JSON data from the response
        .then((data) => {
            localStorage.setItem(url, JSON.stringify({ // Store the data in localStorage with a timestamp
                timestamp: Date.now(),
                data
            }));
            return getResponseObject(data);
        });
}

/**
 * A function to randomly shuffle the items in an array and return a copy of the shuffled array.
 * Based on: https://stackoverflow.com/a/12646864
 * 
 * @param {Array} array An array of any type
 * @returns A shuffled copy of the array
 */
function shuffleArray(array) {
    const shuffledArray = array.slice(); // Copy the array

    // Shuffle the copy of the array using https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) { // For each index,
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements i and j
    }
    return shuffledArray; // Return the shuffled copy
} 

// sought help from ChatGPT but still unable to get it to work 

// score becomes "NaN" after selecting a correct answer 

function fetchQuestions() {
    const apiUrl = 'https://the-trivia-api.com/v2/questions/?timestamp=' + Date.now();
    fetchWithCache(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            if (!Array.isArray(data) || data.length < 10) {
                throw new Error('Questions array is not valid');
            }
            const questions = data.slice(0, 10);
            questions.forEach(question => {
                displayQuestion(question);
            });
        })
        .catch(error => console.error('Could not fetch questions', error));
}

function displayQuestion(questionData) {
    const questionContainer = document.getElementById('question-container');

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <p>${questionData.question.text}</p>
        <ul>
            ${createAnswerList(questionData.correctAnswer, questionData.incorrectAnswers)}
        </ul>
    `;

    questionContainer.appendChild(questionElement);
}

function createAnswerList(correctAnswer, incorrectAnswers) {
    const allAnswers = [correctAnswer, ...(Array.isArray(incorrectAnswers) ? incorrectAnswers : [])];
    const shuffledAnswers = shuffleArray(allAnswers);

    return shuffledAnswers.map(answer => `
        <li>
            <button class="answer-button ${answer === correctAnswer ? 'correct' : ''}" onclick="checkAnswer(this)">${answer}</button>
        </li>
    `).join('');
}

function checkAnswer(selectedAnswerElement) {
    const selectedAnswer = selectedAnswerElement.textContent;
    const correctElement = selectedAnswerElement.parentNode.querySelector('.correct');
    const correctAnswer = correctElement ? correctElement.textContent : '';

    const scoreContainer = document.getElementById('score-container');
    const correctAnswersElement = document.getElementById('correct-answers');
    const totalQuestionsElement = document.getElementById('total-questions');

    const answerButtons = selectedAnswerElement.parentNode.parentNode.querySelectorAll('.answer-button');

    if (selectedAnswer === correctAnswer) {
        selectedAnswerElement.classList.add('correct');
        correctAnswersElement.textContent = parseInt(correctAnswersElement.textContent) + 1;
        scoreContainer.textContent = parseInt(scoreContainer.textContent) + 1; 
        selectedAnswerElement.innerHTML += '✔️';
    } else {
        selectedAnswerElement.parentNode.parentNode.querySelector('.correct').classList.add('correct');
        selectedAnswerElement.classList.add('incorrect');
        selectedAnswerElement.innerHTML += '❌';

        const correctButton = selectedAnswerElement.parentNode.parentNode.querySelector('.correct');
        correctButton.innerHTML += '👈';
    }

    answerButtons.forEach(button => {
        button.disabled = true;
    });

    totalQuestionsElement.textContent = parseInt(totalQuestionsElement.textContent) + 1;

    answerButtons.forEach(button => {
        button.onclick = null;
    });
}

fetchQuestions();
