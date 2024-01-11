const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const inputScore = document.getElementById('inputScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const levelInput = document.getElementById('inputLevel');

const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');
//sets highscore into local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;



console.log(highScores);
console.log(mostRecentScore);

//sets the final score values

finalScore.innerText = mostRecentScore;
inputScore.value = mostRecentScore;
inputLevel.value = level;

