const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const inputScore = document.getElementById('inputScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const form = document.getElementById('formSubmit');

const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');

form.action = `/highscores?level=${level}`;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;



console.log(highScores);
console.log(mostRecentScore);

finalScore.innerText = mostRecentScore;
inputScore.value = mostRecentScore;

