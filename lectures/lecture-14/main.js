const timeDisplay = document.querySelector('#time-display'); // Displays the time
const startButton = document.querySelector('#start-button'); // Starts the timer
const pauseButton = document.querySelector('#pause-button'); // Pauses the timer
const resetButton = document.querySelector('#reset-button'); // Resets the timer

/**
 * Update the content in the #time-display element to reflect the current time
 * @param {*} value Time in milliseconds
 */
function updateDisplay(value) {
    timeDisplay.innerText = (value/1000).toFixed(2);
}

// Step 0: Download index.html and main.js from Files -> Lecture Handouts -> Lecture-14-Stopwatch  (do not peek at the solution) and call updateDisplay(0); to initiate the display at 0 
updateDisplay(0); 
// Step 1: Display and update the current timestamp
// Step 2: Display (and update) the number of seconds since loading the page
// Step 3: Display (and update) the number of seconds since pressing the "start" button
// Step 4: Disable the "start" button when it is clicked
// Step 5: Make the "reset" button stop and reset the timer
// Step 6: Make the "pause" button pause the timer (and re-enable the "start" button)
// When the "start" button is clicked, the "pause" button should be disabled
// Step 7 (optional): Add more precision to the timer
// Update the updateDisplay() function to set timeDisplay.innerText = (value/1000).toFixed(2);

let timeoutID; 
function step() {
    const now = Date.now(); 
    const elapsed = now - startTimestamp; 
    updateDisplay(elapsed); 
    timeoutID = requestAnimationFrame(step); 
}

let totalElapsed = 0; 
let startTimestamp; 
function startTimer() {
    startTimestamp = Date.now(); 
    step(); 
    startButton.setAttribute('disabled', 'true'); 
}

function pauseTimer() {
    const now = Date.now(); 
    const elapsed = now - startTimestamp; 
    totalElapsed += elapsed; 
    cancelAnimationFrame(timeoutID); 
}

startButton.addEventListener('click', startTimer); 
pauseButton.addEventListener