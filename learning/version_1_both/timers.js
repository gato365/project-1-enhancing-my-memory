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
    // Update the overall time only if numOfLines is not equal to 1
    if (selectedOption !== '1') {
        overallTimeDisplay.textContent = overallTimerDisplay.textContent;
    }

    // Update individual times
    individualTimesList.innerHTML = ""; // Clear the list

    // Assuming you have an array of individual times called 'individualTimes'
    individualTimes.forEach(time => {
        const listItem = document.createElement("li");
        listItem.textContent = time; // Format the time if needed
        individualTimesList.appendChild(listItem);
    });
}

function reset(resetTimersOnly, resetIndividualTimerDisplay = false) {
    // Reset the overall timer
    clearInterval(overallInterval);
    overallTime = 0;
    overallTimerDisplay.textContent = '00:00:00';

    // Reset the individual timers
    rows.forEach(row => {
        const startBtn = row.querySelector('.start');
        const stopBtn = row.querySelector('.stop');
        const timerDisplay = row.querySelector('.timer');

        clearInterval(row.interval);
        row.elapsedTime = 0;
        timerDisplay.textContent = '00:00:00';
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    // Clear the individualTimes array
    individualTimes.length = 0;


    if (!resetTimersOnly) {
        // Hide part-4a and part-4b
        part4a.classList.add('hidden');
        part4b.classList.add('hidden');
    }

    if (resetIndividualTimerDisplay) {
        individualTimerDisplay.textContent = '00:00:00';
    }
}
