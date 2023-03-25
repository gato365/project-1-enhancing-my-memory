const memoryText = document.getElementById('memory-text');
const saveBtn = document.getElementById('save-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const userInput = document.getElementById('user-input');
const timer = document.getElementById('timer');
const inputSection = document.querySelector('.input-section');
const timerSection = document.querySelector('.timer-section');
const statsSection = document.querySelector('.stats-section');
const percentCorrect = document.getElementById('percent-correct');
const timeToComplete = document.getElementById('time-to-complete');
// Add this line to the top of your JavaScript file to get the "Play Again" button element
const playAgainBtn = document.getElementById('play-again-btn');
// Add this line to the top of your JavaScript file to get the "Try Again" button element
const tryAgainBtn = document.getElementById('try-again-btn');
// Add these lines at the top of your JavaScript file to get the new elements
const showTextsBtn = document.getElementById('show-texts-btn');
const originalTextDisplay = document.getElementById('original-text');
const enteredTextDisplay = document.getElementById('entered-text');


let startTime = null;
let timerInterval = null;

saveBtn.addEventListener('click', () => {
    localStorage.setItem('memorizeText', memoryText.value);
    inputSection.classList.add('hidden');
    timerSection.classList.remove('hidden');
});

startBtn.addEventListener('click', () => {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');
    userInput.classList.remove('hidden');
    userInput.focus();
    userInput.addEventListener('input', calculatePercentage);

        // Hide the text containers when the user starts typing
        originalTextDisplay.classList.add('hidden');
        enteredTextDisplay.classList.add('hidden');
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    const totalTime = Math.floor((new Date() - startTime) / 1000);
    const percentage = calculatePercentage();
    percentCorrect.textContent = `Percentage correct: ${percentage}%`;
    timeToComplete.textContent = `Time to complete: ${totalTime} seconds`;
    statsSection.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    userInput.classList.add('hidden');
    userInput.removeEventListener('input', calculatePercentage);
    // Show the "Play Again" button
    playAgainBtn.classList.remove('hidden');
    // Show the "Try Again" button
    tryAgainBtn.classList.remove('hidden');
});


// Add this event listener for the "Play Again" button
playAgainBtn.addEventListener('click', () => {
    // Reset the user input, timer, and stats
    userInput.value = '';
    timer.textContent = '0:00';
    percentCorrect.textContent = '';
    timeToComplete.textContent = '';
  
    // Hide the stats section and "Play Again" button, show the input section
    statsSection.classList.add('hidden');
    playAgainBtn.classList.add('hidden');
    inputSection.classList.remove('hidden');
    timerSection.classList.add('hidden');
    memoryText.value = '';
  });

// Add this event listener for the "Try Again" button
tryAgainBtn.addEventListener('click', () => {
    // Reset the user input and timer
    userInput.value = '';
    timer.textContent = '0:00';
  
    // Hide the stats section and "Try Again" button, show the timer section and "start" button
    statsSection.classList.add('hidden');
    tryAgainBtn.classList.add('hidden');
    timerSection.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
  });


// Add this event listener for the "Show Original and Entered Texts" button
showTextsBtn.addEventListener('click', () => {
    const originalText = localStorage.getItem('memorizeText');
    const enteredText = userInput.value;
  
    originalTextDisplay.textContent = `Original Text: ${originalText}`;
    enteredTextDisplay.textContent = `Entered Text: ${enteredText}`;
  
    originalTextDisplay.classList.toggle('hidden');
    enteredTextDisplay.classList.toggle('hidden');
  });

function updateTimer() {

    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


function calculatePercentage() {
    const originalText = localStorage.getItem('memorizeText');
    const enteredText = userInput.value;
    let correctChars = 0;

    for (let i = 0; i < enteredText.length && i < originalText.length; i++) {
        if (enteredText[i] === originalText[i]) {
            correctChars++;
        }
    }

    let percentage = Math.floor((correctChars / originalText.length) * 100);

    // If the entered text is longer than the original text, take 10% off the percentage.
    if (enteredText.length > originalText.length) {
        percentage *= 0.9;
        percentage = Math.floor(percentage); // Round down to the nearest integer after taking 10% off.
    }

    // Ensure the percentage stays within the range of 0 to 100.
    if (percentage < 0) {
        percentage = 0;
    } else if (percentage > 100) {
        percentage = 100;
    }

    return percentage;
}
function updateTimeAndDate() {
    const currentTimeDate = new Date();
    const formattedTimeDate = currentTimeDate.toLocaleString();
    document.getElementById('time-date').textContent = formattedTimeDate;
  }
  
  updateTimeAndDate();
  
