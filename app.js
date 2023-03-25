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

let startTime = null;
let timerInterval = null;

saveBtn.addEventListener('click', () => {
    event.preventDefault();
    localStorage.setItem('memorizeText', memoryText.value);
    inputSection.classList.add('hidden');
    timerSection.classList.remove('hidden');
});

startBtn.addEventListener('click', () => {
    event.preventDefault();
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');
    userInput.classList.remove('hidden');
    userInput.focus();
    userInput.addEventListener('input', calculatePercentage);
});

stopBtn.addEventListener('click', () => {
    event.preventDefault();
    clearInterval(timerInterval);
    const totalTime = Math.floor((new Date() - startTime) / 1000);
    const percentage = calculatePercentage();
    percentCorrect.textContent = `Percentage correct: ${percentage}%`;
    timeToComplete.textContent = `Time to complete: ${totalTime} seconds`;
    statsSection.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    userInput.classList.add('hidden');
    userInput.removeEventListener('input', calculatePercentage);
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

