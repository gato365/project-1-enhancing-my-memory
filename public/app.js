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


// Set the background color to change to a random bright color every time the page is loaded
function randomBrightColor() {
    const randomColor = () => Math.floor(Math.random() * 256);
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
}







const beginBtn = document.getElementById('begin-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const showTextsBtn = document.getElementById('show-texts-btn');
const continueBtn = document.getElementById('continue-btn');

const userInput = document.getElementById('user-input');
const inputSelectGroup = document.querySelector('.input-select-group');
const inputSelectSet = document.querySelector('.input-select-set');

const timer = document.getElementById('timer');
const inputNumbers = document.querySelector('.input-numbers');
const timeToComplete = document.getElementById('time-to-complete');
const viewStats = document.querySelector('.view-stats');
const percentCorrect = document.getElementById('percent-correct');

const textsContainer = document.getElementById('texts-container');
const originalTextDisplay = document.getElementById('original-text');
const enteredTextDisplay = document.getElementById('entered-text');
const currentEnteredText = document.getElementById('current-entered');

const lettersSelect = document.getElementById('letters');
const labelLetters = document.getElementById('label-Letters');
const numbersSelect = document.getElementById('numbers');
const labelNumbers = document.getElementById('label-numbers');
const numOfLinesSelect = document.getElementById('num-of-lines');
const selectedInfo = document.getElementById('selected-info');



let startTime = null;
let timerInterval = null;

// 1. Continue button: Begin App (Page 1)
continueBtn.addEventListener('click', () => {
    // Set the start time
    startTime = new Date();

    // Add
    inputSelectGroup.classList.add('hidden');
    // Remove
    inputSelectSet.classList.remove('hidden');


});

// 2. Select number of lines: 1 or All Sets (Page 2)
numOfLinesSelect.addEventListener('change', (event) => {
    console.log('1');
    const selectedOption = event.target.value;



    //const selectedValue = numOfLinesSelect.value;
    //console.log('Selected value:', selectedValue);

    if (selectedOption === '1') {

        // Remove
        labelNumbers.classList.remove('hidden');
        numbersSelect.classList.remove('hidden');

    } else {
        // Add
        labelNumbers.classList.add('hidden');
        numbersSelect.classList.add('hidden');


    }
});

// 3. Begin button: Gets relevant Information (Page 2)
beginBtn.addEventListener('click', async () => {

    // Store the selected options in local storage
    localStorage.setItem('selectedLetters', lettersSelect.value);
    localStorage.setItem('selectedNumbers', numbersSelect.value);



    // Remove
    inputNumbers.classList.remove('hidden');

    // Add
    inputSelectSet.classList.add('hidden');
    inputSelectGroup.classList.add('hidden');


    // Load JSON file
    const e_data = await loadJSON('eman.json');
    const selectedNumber = numbersSelect.value
    const selectedGroup = letters.value;
    const selectedSet = "set " + selectedNumber;

    // Filter JSON data
    const filteredData = e_data[selectedGroup][selectedSet];
    const dataString = filteredData.join(' - ');
    localStorage.setItem('currentLine', dataString);
});

// 4. Start button: Starts the timer and begins test  (Page 3)
startBtn.addEventListener('click', () => {
    // Set the start time
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);

    // Add
    startBtn.classList.add('hidden');
    textsContainer.classList.add('hidden');
    originalTextDisplay.classList.add('hidden');
    enteredTextDisplay.classList.add('hidden');
    
    // Remove
    stopBtn.classList.remove('hidden');
    userInput.classList.remove('hidden');
    selectedInfo.classList.remove('hidden');
    
    // Focus on the input field and  calculate percentage correct
    userInput.focus();
    userInput.addEventListener('input', calculatePercentageCorrect());

    // Display the selected group and set
    selectedInfo.textContent = `Selected Group: ${lettersSelect.value} - Selected Set: ${numbersSelect.value}`;

    // Add event listener to update currentEnteredText as the user types
    userInput.addEventListener('input', () => {
        currentEnteredText.classList.remove('hidden');
        currentEnteredText.textContent = `Current Entered Text: ${userInput.value}`;
    });
});

// 5. Stop button: Stops the timer and shows the stats (Page 4)
stopBtn.addEventListener('click', async () => {
    clearInterval(timerInterval);


    const totalTime = Math.floor((new Date() - startTime) / 1000);
    const percentage = await calculatePercentageCorrect();
    percentCorrect.textContent = `Percentage correct: ${percentage}%`;
    timeToComplete.textContent = `Time to complete: ${totalTime} seconds`;
    viewStats.classList.remove('hidden');
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

// 6. Add this event listener for the "Play Again" button (Page 5)
playAgainBtn.addEventListener('click', () => {
    // Reset the user input, timer, and stats
    userInput.value = '';
    timer.textContent = '0:00';
    percentCorrect.textContent = '';
    timeToComplete.textContent = '';
    currentEnteredText.textContent = '';

    // Hide the stats section and "Play Again" button, show the input section
    viewStats.classList.add('hidden');
    playAgainBtn.classList.add('hidden');
    tryAgainBtn.classList.add('hidden');
    inputSelectGroup.classList.remove('hidden');
    inputNumbers.classList.add('hidden');

    startBtn.classList.remove('hidden');
});

// 7. Add this event listener for the "Try Again" button (Page 5)
tryAgainBtn.addEventListener('click', () => {
    // Reset the user input and timer
    userInput.value = '';
    timer.textContent = '0:00';
    currentEnteredText.textContent = '';

    // Hide the stats section and "Try Again" button, show the timer section and "start" button
    viewStats.classList.add('hidden');
    tryAgainBtn.classList.add('hidden');
    inputNumbers.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
});

// 8. Add this event listener for the "Show Original and Entered Texts" button (Page 5)
showTextsBtn.addEventListener('click', () => {
    const originalText = localStorage.getItem('currentLine');
    const enteredText = userInput.value;


    originalTextDisplay.textContent = `Original Text: ${originalText}`;
    enteredTextDisplay.textContent = `Entered Text: ${enteredText}`;

    textsContainer.classList.remove('hidden');
    originalTextDisplay.classList.remove('hidden');
    enteredTextDisplay.classList.remove('hidden');
});


document.body.style.backgroundColor = randomBrightColor();


updateTimeAndDate();

