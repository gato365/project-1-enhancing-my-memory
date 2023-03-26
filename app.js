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
        percentage = percentage - 0.05 * (enteredText.length - originalText.length);
        // percentage = Math.floor(percentage); // Round down to the nearest integer after taking 10% off.
    }

    // Ensure the percentage stays within the range of 0 to 100.
    if (percentage < 0) {
        percentage = 0;
    } else if (percentage > 100) {
        percentage = 100;
    }



    // Return the percentage
    return percentage;
}
function updateTimeAndDate() {
    const currentTimeDate = new Date();
    const formattedTimeDate = currentTimeDate.toLocaleString();
    document.getElementById('time-date').textContent = formattedTimeDate;
}

async function loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching JSON:', error);
    }
  }

  loadJSON('your-json-file-url.json');

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
const textsContainer = document.getElementById('texts-container');
const originalTextDisplay = document.getElementById('original-text');
const enteredTextDisplay = document.getElementById('entered-text');
const currentEnteredText = document.getElementById('current-entered');



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
    textsContainer.classList.add('hidden');
    originalTextDisplay.classList.add('hidden');
    enteredTextDisplay.classList.add('hidden');
  
    // Add event listener to update currentEnteredText as the user types
    userInput.addEventListener('input', () => {
      currentEnteredText.classList.remove('hidden');
      currentEnteredText.textContent = `Current Entered Text: ${userInput.value}`;
    });
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
    currentEnteredText.textContent = '';
    // Show the "Play Again" button
    playAgainBtn.classList.remove('hidden');
    // Show the "Try Again" button
    tryAgainBtn.classList.remove('hidden');
    // Show the "Show Original and Entered Texts" button
    showTextsBtn.classList.remove('hidden');



    // Save the percentage to localStorage
    const currentAttemptData = {
        percentage: percentage,
        time: totalTime,
        memorizeText: localStorage.getItem('memorizeText'),
        enteredText: userInput.value
    };


    localStorage.setItem('currentAttemptData', JSON.stringify(currentAttemptData));

});


// Add this event listener for the "Play Again" button
playAgainBtn.addEventListener('click', () => {
    // Reset the user input, timer, and stats
    userInput.value = '';
    timer.textContent = '0:00';
    percentCorrect.textContent = '';
    timeToComplete.textContent = '';
    currentEnteredText.textContent = '';

    // Hide the stats section and "Play Again" button, show the input section
    statsSection.classList.add('hidden');
    playAgainBtn.classList.add('hidden');
    tryAgainBtn.classList.add('hidden');
    inputSection.classList.remove('hidden');
    timerSection.classList.add('hidden');
    memoryText.value = '';
    startBtn.classList.remove('hidden');
});

// Add this event listener for the "Try Again" button
tryAgainBtn.addEventListener('click', () => {
    // Reset the user input and timer
    userInput.value = '';
    timer.textContent = '0:00';
    currentEnteredText.textContent = '';

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

    textsContainer.classList.remove('hidden');
    originalTextDisplay.classList.remove('hidden');
    enteredTextDisplay.classList.remove('hidden');
});


updateTimeAndDate();

