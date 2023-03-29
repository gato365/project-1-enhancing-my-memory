function updateTimer() {

    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


async function calculatePercentageCorrect() {
    const originalText = await localStorage.getItem('currentLine');
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


// Load JSON File
let e_data;
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        e_data = await response.json();
        return e_data;

    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}








const saveBtn = document.getElementById('save-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const userInput = document.getElementById('user-input');
const timer = document.getElementById('timer');
const inputSectionGroup = document.querySelector('.input-section-group');
const inputSectionNumbers = document.querySelector('.input-section-numbers');
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
// number and letter 
const labelLetters = document.getElementById('labelLetters');
const letters = document.getElementById('letters');
const continueBtn = document.getElementById('continue-btn');
const numOfLinesSelect = document.getElementById('num-of-lines');
const numbersLabel = document.getElementById('label-numbers');
const numbersSelect = document.getElementById('numbers');
const selectedInfo = document.getElementById('selected-info');



let startTime = null;
let timerInterval = null;

continueBtn.addEventListener('click', () => {
    startTime = new Date();

    inputSectionGroup.classList.add('hidden');
    inputSectionNumbers.classList.remove('hidden');


});


numOfLinesSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === '1') {
        numbersLabel.classList.remove('hidden');
        numbersSelect.classList.remove('hidden');
    } else {
        numbersLabel.classList.add('hidden');
        numbersSelect.classList.add('hidden');
    }
});

saveBtn.addEventListener('click', async () => {
    
    localStorage.setItem('selectedLetters', letters.value);
    localStorage.setItem('selectedNumbers', numbers.value);
    inputSectionGroup.classList.add('hidden');
    timerSection.classList.remove('hidden');
    inputSectionNumbers.classList.add('hidden');

    const e_data = await loadJSON('eman.json');
    const selectedNumber = numbers.value
    const selectedGroup = letters.value;
    const selectedSet = "set " + selectedNumber;

    const filteredData = e_data[selectedGroup][selectedSet];
    const dataString = filteredData.join(' - ');
    localStorage.setItem('currentLine', dataString);
});






startBtn.addEventListener('click', () => {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');
    userInput.classList.remove('hidden');
    userInput.focus();
    userInput.addEventListener('input', calculatePercentageCorrect());

    // Hide the text containers when the user starts typing
    textsContainer.classList.add('hidden');
    originalTextDisplay.classList.add('hidden');
    enteredTextDisplay.classList.add('hidden');

    selectedInfo.classList.remove('hidden');

    selectedInfo.textContent = `Selected Group: ${letters.value} - Selected Set: ${numbers.value}`;

    // Add event listener to update currentEnteredText as the user types
    userInput.addEventListener('input', () => {
        currentEnteredText.classList.remove('hidden');
        currentEnteredText.textContent = `Current Entered Text: ${userInput.value}`;
    });
});

stopBtn.addEventListener('click', async () => {
    clearInterval(timerInterval);
    const totalTime = Math.floor((new Date() - startTime) / 1000);
    const percentage = await calculatePercentageCorrect();
    percentCorrect.textContent = `Percentage correct: ${percentage}%`;
    timeToComplete.textContent = `Time to complete: ${totalTime} seconds`;
    statsSection.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    userInput.classList.add('hidden');
    // userInput.removeEventListener('input', calculatePercentageCorrect());
    userInput.removeEventListener('input', calculatePercentageCorrect); // Remove the parentheses from the function reference

    

    // currentEnteredText.textContent = '';
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
        enteredText: userInput.value,
        selectedLetters: localStorage.getItem('selectedLetters'),
        selectedNumbers: localStorage.getItem('selectedNumbers'),
        currentLine: localStorage.getItem('currentLine'),
    };


    localStorage.setItem('currentAttemptData', JSON.stringify(currentAttemptData));



    const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentAttemptData)
    });

    const result = await response.json();

    console.log(result);

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
    inputSectionGroup.classList.remove('hidden');
    timerSection.classList.add('hidden');
    
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
    const originalText = localStorage.getItem('currentLine');
    const enteredText = userInput.value;


    originalTextDisplay.textContent = `Original Text: ${originalText}`;
    enteredTextDisplay.textContent = `Entered Text: ${enteredText}`;

    textsContainer.classList.remove('hidden');
    originalTextDisplay.classList.remove('hidden');
    enteredTextDisplay.classList.remove('hidden');
});

// Set the background color to change to a random bright color every time the page is loaded
function randomBrightColor() {
    const randomColor = () => Math.floor(Math.random() * 256);
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  }
  
  document.body.style.backgroundColor = randomBrightColor();

  
updateTimeAndDate();

