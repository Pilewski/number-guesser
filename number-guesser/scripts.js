//Variable declarations for the buttons
var guessButton = document.querySelector('#guessbtn');
var clearButton = document.querySelector('#clearbtn');
var resetButton = document.querySelector('#resetbtn');
var rangeButton = document.querySelector('#rangebtn');
//Default range values
var minRange = 1;
var maxRange = 100;
//Variable declarations for changing form fields
var outputText = document.getElementById('output');
var guessField = document.getElementById('guess');
var minField = document.getElementById('input-min');
var maxField = document.getElementById('input-max');
//
// establishes a random number and disables reset button
window.onload = function() {
  document.getElementById('resetbtn').disabled = true;
  randomNumber = Math.floor(Math.random() * 100 + 1);
};
// GUESS BUTTON EVENTS
guessButton.addEventListener('click', function userGuess() {
  var guess = guessField.value;
  var guessInt = parseInt(guess);
  //ERROR MESSAGES
  //Checks to see whether value of guess input is a number (i.e. blank or e)
  if (isNaN(guessInt)) {
    return outputText.innerText = "ERROR: GUESS IS NOT A NUMBER";
  }
  // Checks whether the guess is inside of the range
  // Default min is 1 and max is 100
  if (guessInt < minRange || guessInt > maxRange) {
    return outputText.innerText = "ERROR: GUESS IS NOT IN RANGE OF "+ minRange +" AND "+ maxRange;
  }
  // where the magic happens (i.e. where numbers are guessed)
  if (guessInt === randomNumber) {
      outputText.innerText = "Your guess ("+ guess +") was correct!";
      winnerRangeChange();
   } else if (guessInt > randomNumber) {
      outputText.innerText = "Your guess ("+ guess +") was too high!";
   } else if (guessInt < randomNumber){
      outputText.innerText = "Your guess ("+ guess +") was too low!";
   }
});
//Correct answer changes the range
function winnerRangeChange() {
  //changes range of acceptable values
  minRange = minRange - 10;
  maxRange = maxRange + 10;
  //changes values in input fields
  minField.value = parseInt(minField.value) - 10;
  maxField.value = parseInt(maxField.value) + 10;
  //resets randomNumber with proper range
  randomNumber = Math.floor(Math.random() * (maxRange-minRange)  + minRange);
}
//RANGE BUTTON EVENTS
rangeButton.addEventListener('click', function() {
  //Sets range values
  minRange = parseInt(minField.value);
  maxRange = parseInt(maxField.value);
  //Sets random number according to new range values
  randomNumber = Math.floor(Math.random() * (maxRange-minRange)  + minRange);
});
//CLEAR BUTTON FUNCTIONALITY
//Once a key is released AND one of the following conditions are met the clear button will be enabled
window.addEventListener('keyup', function enableBtn() {
  //if ANY form is NOT empty
  if ((guessField.value != '') || (minField.value != '') || (maxField.value != '')) {
    // enable clear button
    document.getElementById('clearbtn').disabled = false;
    };
  }
);
//Once a key is pressed AND one of the following conditions are met the clear button will be disabled
window.addEventListener('keyup', function diableBtn() {
  //if all input forms are empty
  if ((guessField.value == '') && (minField.value == '') && (maxField.value == '')) {
    // disable clear button
    document.getElementById('clearbtn').disabled = true;
    };
  }
);
//What happens once the clear button is clicked
clearButton.addEventListener('click', function() {
    guessField.value = ''; minField.value = ''; maxField.value = '';
    //When clear is pressed, disables clear and enables reset
    document.getElementById('clearbtn').disabled = true;
    document.getElementById('resetbtn').disabled = false;
  })
//RESET BUTTON FUNCTIONALITY
window.addEventListener('keyup', function enableBtn() {
  //if ANY form is NOT empty
  if ((guessField.value != '') || (minField.value != '') || (maxField.value != '')) {
    // enable clear button
    document.getElementById('resetbtn').disabled = false;
    };
  }
);
//The page is reloaded once the reset button is clicked
resetButton.addEventListener('click', function() {
  location.reload();
});
