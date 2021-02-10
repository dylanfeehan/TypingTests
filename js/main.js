window.addEventListener('load', init); // runs the init function upon loading of the window

// Globals

//Available Levels
const levels = {
  easy: 10,
  medium: 3,  
  hard: 2
}
//Default level is easy
let currentLevel = levels.easy; 


let time = currentLevel; // time is continuously decremented
let score = 0; 
let isPlaying;
let highscore;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');
const displayLevel = document.querySelector('#display-level');


let timerStart = 150;
let timerEnd = 160;
let wpm = 100;
let secondsPassed = 100;
let isPaused = false;
let counterPaused = false;



const words = [
  'if',
  'elif',
  'else',
  'function',
  'int',
  'double',
  'boolean',
  'String',
  'for',
  'while',
  'break',
  'case',
  'javascript',
  'python',
  'java',
  'i++',
  'HTML',
  'CSS',
  'return',
  'this',
  '{}', 
  '[]',
  'let', 
  'const',
  '()'
];


//this function happens when a button is pressed: 
function setLevel(level) {
  if (currentLevel !== level){
      currentWord.innerHTML = '';
      //reset highschore because change in difficulty
      sessionStorage['highscore'] = 0;
      highscoreDisplay.innerHTML = 0;

      isPlaying = true;
      currentLevel = level;  // setting currentLevel to the different level

      //displaying the change in level atop the screen
      if (level === 1) {
        displayLevel.innerHTML = "Setting difficulty to hard";
      } else if (level === 5){
        displayLevel.innerHTML = "Setting difficulty to medium";
      } else {
        displayLevel.innerHTML = "Setting difficulty to easy.. coward";
      }
      score = -1; // setting score back to low
      highscore = 0; //setting highscore back to 0
      seconds.innerHTML = currentLevel; // changing the display of seconds. 
      
      startMatch(); // look more into what this does
    }
}


// Initialize Game
function init() {

  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);

}

// Start match
function startMatch() {
  if (score === 0) {
    timerStart = Date.now();
  }

    
  if (matchWords()) {
    counterPaused = false;
    isPaused = false;
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    
    wordInput.value = '';
    score++;
    
    if (currentLevel === 1) {
      displayLevel.innerHTML = "Playing Hard";
    } else if (currentLevel === 5){
      displayLevel.innerHTML = "Playing Medium";
    } else {
      displayLevel.innerHTML = "Playing Easy";
    }
  }

  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  if (sessionStorage['highscore'] >= 0) {
    highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
  console.log(words[randIndex]);

}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0 && counterPaused == false) {
    // Game is over
    timerEnd = Date.now();
    isPlaying = false;
    isPaused = true;
    counterPaused = true; ///
    
    secondsPassed = (timerEnd - timerStart) / 1000;
    wpm = score / (secondsPassed / 60);
    
    

  }
  
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPaused) {
    if (!isPlaying && time === 0) {

      message.innerHTML = 'Game Over!!!';
  
      
      message.innerHTML = 'Game Over!!! WPM: ';
      
      score = -1;
    }
  }
  if(isPaused) { // aka ELSE {}

      message.innerHTML = `WPM: ${wpm.toFixed(1)}`;  
      score = -1;

  }
}

// console.log(`Score: ${score}, high score: ${highscore}`)
// if (score > highscore){
//     highscoreDisplay.innerHTML = score;
// }