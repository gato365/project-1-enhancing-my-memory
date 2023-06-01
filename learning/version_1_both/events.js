
const individualTimes = []; // Add this line at the beginning of your script

// Buttons
const continue1Btn = document.getElementById('continue-1-btn');
const continue2Btn = document.getElementById('continue-2-btn');
const continue3Btn = document.getElementById('continue-3-btn');
const stopBtna = document.getElementById('overall-stop-btn-a');
const stopBtnb = document.getElementById('overall-stop-btn-b');
const playAgainBtn = document.getElementById('play-again-btn');
const selectAgainBtn = document.getElementById('select-again-btn');
const showResultsBtn = document.getElementById('show-results-btn');

// Divs
const part1 = document.getElementById('part-1');
const part2 = document.getElementById('part-2');
const part3 = document.getElementById('part-3');
const part4a = document.getElementById('part-4a');
const part4b = document.getElementById('part-4b');
const part5 = document.getElementById('part-5');

// Selects
const numOfLines = document.getElementById('num-of-lines');
const numbersSelect = document.getElementById('numbers');
const labelNumbers = document.getElementById('label-numbers');
const letters = document.getElementById('letters');
const results = document.getElementById('results');
const labelLetters = document.getElementById('label-letters');
const set5 = document.getElementById('set-5');
const selectedGroupSet = document.getElementById('selected-group-set');
const calculateSinglePercentageBtn = document.getElementById('calculate-single-percentage-btn');
const rows = document.querySelectorAll('.row:not(:first-child)');
const overallTimerDisplay = document.getElementById('overall-timer');
const individualTimerDisplay = document.getElementById('individual-timer');
const overallTimeDisplay = document.getElementById("overallTime");
const individualTimesList = document.getElementById("individualTimes");


const calculateAllPercentagesBtn = document.getElementById("calculate-all-percentages-btn");


let overallTime = 0;
let overallInterval;
let startTime;
let selectedOption = null;
const allLines = [];
let dataString;




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

    selectedOption = event.target.value;


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

    // If there is a value in the number of lines select
    if (selectedOption === '1') {
        part4b.classList.remove('hidden');
    } else {
        part4a.classList.remove('hidden');
    }
    // Load in e
    e_data = await loadJSON(' ../../public/eman.json');
    // Get the selected number and group

    if (selectedOption === '1') {
        const selectedNumber = numbersSelect.value;
        const selectedGroup = letters.value;
        const selectedSet = "set " + selectedNumber;

        // Filter JSON data
        const filteredData = e_data[selectedGroup][selectedSet];
        dataString = filteredData.join(' - ');
        console.log(dataString);
        selectedGroupSet.textContent = `Group ${selectedGroup} - Set ${selectedNumber}`;
    } else {
        //     const selectedGroup = letters.value;
        //     Object.keys(e_data[selectedGroup]).forEach(set => {
        //         allLines.push(e_data[selectedGroup][set]);
        //     });
        //     console.log(allLines);
        // }



        const selectedGroup = letters.value;
        allLines.length = 0; // Clear the allLines array
        Object.keys(e_data[selectedGroup]).forEach(set => {
            allLines.push(e_data[selectedGroup][set]);
        });
        console.log(allLines);

        // Create input elements for each set
        const allInputsContainer = document.getElementById("all-inputs-container");
        allInputsContainer.innerHTML = ""; // Clear the container
        allLines.forEach((set, index) => {
            const inputElement = document.createElement("textarea");
            inputElement.id = `input-set-${index}`;
            inputElement.placeholder = `Enter text for Set ${index + 1}`;
            allInputsContainer.appendChild(inputElement);
        });
    }

    // Begin Timer
    startTime = Date.now() - overallTime;
    overallInterval = setInterval(updateTime, 1000);
    if (selectedOption === '1') {
        reset(true); // Reset only the timers
    }


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
        // Clear the timer
        individualTimerDisplay.textContent = "00:00:00";
        elapsedTime = 0;
    });

    stopBtn.disabled = true;
});




// Create ecent listener for show results that makes part 4 hidden and part 5 display
calculateSinglePercentageBtn.addEventListener('click', () => {
    const originalText = dataString; // This is the string created from the filteredData array.
    const enteredText = document.getElementById('single-input').value; // Assuming you have an input with the ID 'single-input'.

    const percentageCorrect = calculatePercentageCorrect(originalText, enteredText);
    console.log(`Percentage correct for single input: ${percentageCorrect} %`);
    document.getElementById('single-percentage').textContent = `Percentage Correct: ${percentageCorrect}%`;



    // Create a new JSON object and add the time and percentage correct
    const resultData = {
        date: dateString,
        time: individualTimerDisplay.textContent,
        percentageCorrect: percentageCorrect
    };

    console.log(resultData);

});





// Create event listener for calculate all percentages
calculateAllPercentagesBtn.addEventListener("click", () => {
    const originalTexts = allLines;
    const enteredTexts = allLines.map((_, index) => {
        return document.getElementById(`input-set-${index}`).value;
    });

    const percentageCorrectArray = calculatePercentageCorrectAll(originalTexts, enteredTexts);
    console.log(percentageCorrectArray); // Log the array of percentage correct values for each set

    // Display the percentage correct for each set
    const allPercentagesContainer = document.getElementById("all-percentages-container");
    allPercentagesContainer.innerHTML = ""; // Clear the container
    percentageCorrectArray.forEach((percentage, index) => {
        const percentageElement = document.createElement("p");
        percentageElement.textContent = `Percentage Correct for Set ${index + 1}: ${percentage}%`;
        allPercentagesContainer.appendChild(percentageElement);
    });
});


// Create event listener for stop that makes part 4 hidden and part 5 display
stopBtna.addEventListener('click', () => {

    part4a.classList.add('hidden');


    // Remove Hidden
    part5.classList.remove('hidden');

    // Stop the overall timer
    clearInterval(overallInterval);

});



// Create event listener for stop that makes part 4 hidden and part 5 display
stopBtnb.addEventListener('click', () => {
    // Add Hidden
    part4b.classList.add('hidden');
    // Remove Hidden
    part5.classList.remove('hidden');

    // Clear the overall timer
    clearInterval(individualTimerDisplay);


    // Clear the input
    document.getElementById('single-input').value = ''; // Clear the input
    // Clear the percentage
    document.getElementById('single-percentage').textContent = ''; // Clear the percentage
    // Clear the timer
    individualTimerDisplay.textContent = "00:00:00";




});

// Create event listener for play again that displays part 3 and hides part 5
playAgainBtn.addEventListener('click', () => {
    // Add Hidden
    part5.classList.add('hidden');
    // Remove Hidden
    part3.classList.remove('hidden');

    // Reset timers
    reset(false, true);



});
// Create event listener for select again that displays part 1 and hides part 5
selectAgainBtn.addEventListener('click', () => {
    // Add Hidden
    part5.classList.add('hidden');
    // Remove Hidden
    part1.classList.remove('hidden');
    // Reset timers
    reset(false, true);




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

