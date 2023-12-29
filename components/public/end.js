const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const inputScore = document.getElementById('inputScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');


const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;



console.log(highScores);
console.log(mostRecentScore);

finalScore.innerText = mostRecentScore;
inputScore.value = mostRecentScore;


// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.value;
// });

// saveHighScore = (e) => {
//     e.preventDefault();

//     const score = {
//         score: mostRecentScore,
//         name: username.value,
//     };
//     highScores.push(score);
//     highScores.sort((a, b) => b.score - a.score);
//     highScores.splice(5);

//     localStorage.setItem('highScores', JSON.stringify(highScores));
//     window.location.assign('/');
// };