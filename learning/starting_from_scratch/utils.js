function pad(number) {
    return number.toString().padStart(2, '0');
}

function calculatePercentageCorrect(originalText, enteredText) {
    let correctChars = 0;

    for (let i = 0; i < enteredText.length && i < originalText.length; i++) {
        if (enteredText[i] === originalText[i]) {
            correctChars++;
        }
    }

    let percentage = Math.floor((correctChars / originalText.length) * 100);

    if (enteredText.length > originalText.length) {
        percentage = percentage - 0.05 * (enteredText.length - originalText.length);
    }

    if (percentage < 0) {
        percentage = 0;
    } else if (percentage > 100) {
        percentage = 100;
    }

    return percentage;
}