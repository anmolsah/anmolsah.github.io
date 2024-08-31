function startCounter() {
    var targetNumberInput = document.getElementById('number');
    var targetNumber = parseInt(targetNumberInput.value);
    var counterElement = document.getElementById('current');

    // Validating the input
    if (isNaN(targetNumber) || targetNumber < 1 || targetNumber > 99999) {
        alert('Please enter a number between 1 and 99999');
        return;
    }

    // Start counter
    counterElement.textContent = "0";
    var interval = setInterval(function() {
        var counterValue = parseInt(counterElement.textContent);
        if (counterValue === targetNumber) {
            clearInterval(interval);
        } else {
            counterElement.textContent = (counterValue + 1).toString().padStart(5, '0');
        }
    }, 1000);
}

// Attach event listener to the button
var startButton = document.getElementById("startButton");
startButton.addEventListener("click", startCounter);
