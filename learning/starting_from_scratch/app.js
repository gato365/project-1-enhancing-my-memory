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

function pad(number) {
    return number.toString().padStart(2, '0');
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    overallTimerDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2,
        "0")}:${seconds.toString().padStart(2, "0")}`;
}

// New function to update the results
function updateResults() {
    // Update the overall time
    overallTimeDisplay.textContent = overallTimerDisplay.textContent; // Use the timer display value or any other variable holding the overall time

    // Update individual times
    individualTimesList.innerHTML = ""; // Clear the list

    // Assuming you have an array of individual times called 'individualTimes'
    individualTimes.forEach(time => {
        const listItem = document.createElement("li");
        listItem.textContent = time; // Format the time if needed
        individualTimesList.appendChild(listItem);
    });
}

const individualTimes = []; // Add this line at the beginning of your script

// Buttons
const continue1Btn = document.getElementById('continue-1-btn');
const continue2Btn = document.getElementById('continue-2-btn');
const continue3Btn = document.getElementById('continue-3-btn');
const stopBtn = document.getElementById('overall-stop-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const selectAgainBtn = document.getElementById('select-again-btn');
const showResultsBtn = document.getElementById('show-results-btn');
// Divs
const part1 = document.getElementById('part-1');
const part2 = document.getElementById('part-2');
const part3 = document.getElementById('part-3');
const part4 = document.getElementById('part-4');
const part5 = document.getElementById('part-5');


const numOfLines = document.getElementById('num-of-lines');
const numbersSelect = document.getElementById('numbers');
const labelNumbers = document.getElementById('label-numbers');
const letters = document.getElementById('letters');
const results = document.getElementById('results');
const labelLetters = document.getElementById('label-letters');




const rows = document.querySelectorAll('.row:not(:first-child)');
const overallTimerDisplay = document.getElementById('overall-timer');
const overallTimeDisplay = document.getElementById("overallTime");
const individualTimesList = document.getElementById("individualTimes");

let overallTime = 0;
let overallInterval;
let startTime;



// Create event listener for continue 1 that makes part 1 hidden and part 2 display
continue1Btn.addEventListener('click', () => {
    // Add Hidden
    part1.classList.add('hidden');
    // Remove Hidden
    part2.classList.remove('hidden');
});
// Create event listener for continue 2 that makes part 2 hidden and part 3 display
continue2Btn.addEventListener('click', (event) => {
    // Add Hidden
    part2.classList.add('hidden');
    // Remove Hidden
    part3.classList.remove('hidden');



});

// Create event listener for select for number of lines
numOfLines.addEventListener('change', (event) => {
   
    const selectedOption = event.target.value;


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



// Create event listener for continue 3 that makes part 3 hidden and part 4 display
continue3Btn.addEventListener('click', async () => {

    // Add Hidden
    part3.classList.add('hidden');
    // Remove Hidden
    part4.classList.remove('hidden');


    // Load in e
    e_data = await loadJSON(' ../../public/eman.json');
    // Get the selected number and group
    const selectedNumber = numbersSelect.value
    const selectedGroup = letters.value;
    const selectedSet = "set " + selectedNumber;

    // Filter JSON data
    const filteredData = e_data[selectedGroup][selectedSet];
    const dataString = filteredData.join(' - ');
    console.log(dataString);


    

    // Begin Timer
    startTime = Date.now() - overallTime;
    interval = setInterval(updateTime, 1000);
});




rows.forEach(row => {
    const startBtn = row.querySelector('.start');
    const stopBtn = row.querySelector('.stop');
    const timerDisplay = row.querySelector('.timer');
    let startTime;
    let elapsedTime = 0;
    let interval;

    function updateTime() {
        elapsedTime = Date.now() - startTime;

        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

        timerDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2,
            "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    startBtn.addEventListener('click', () => {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 1000);

        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(interval);
        individualTimes.push(timerDisplay.textContent); // Save the elapsed time in the individualTimes array
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    stopBtn.disabled = true;
});









// Create event listener for stop that makes part 4 hidden and part 5 display
stopBtn.addEventListener('click', () => {
    // Add Hidden
    part4.classList.add('hidden');
    // Remove Hidden
    part5.classList.remove('hidden');

    // Stop the overall timer
    clearInterval(overallInterval);

});

// Create event listener for play again that displays part 3 and hides part 5
playAgainBtn.addEventListener('click', () => {
    // Add Hidden
    part5.classList.add('hidden');
    // Remove Hidden
    part3.classList.remove('hidden');



});
// Create event listener for select again that displays part 1 and hides part 5
selectAgainBtn.addEventListener('click', () => {
    // Add Hidden
    part5.classList.add('hidden');
    // Remove Hidden
    part1.classList.remove('hidden');

});
// Create event listener for show results that displays part 5 and hides part 4
showResultsBtn.addEventListener("click", () => {
    if (results.classList.contains("hidden")) {
        updateResults(); // Update the results before showing them
        results.classList.remove("hidden");
        showResultsBtn.textContent = "Hide Results";
    } else {
        results.classList.add("hidden");
        showResultsBtn.textContent = "Show Results";
    }
});