const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
// console.log(document.body.querySelector('script[data]').getAttribute('level'));
// const level = JSON.parse(document.body.querySelector('script[data]').getAttribute('level'));
// console.log(level);

const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level');

const url = 'https://opentdb.com/api.php?amount=10&difficulty=' + level + '&type=multiple';


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch(
    url
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&rsquo;/g, "'").replace(/&shy;/g, "-").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&iacute;/g, "í").replace(/&aacute;/g, "á").replace(/&oacute;/g, "ó").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "� ").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "ë").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "ë").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "ë").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "ë").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü"),
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index+1)] = choice.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&rsquo;/g, "'").replace(/&shy;/g, "-").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&iacute;/g, "í").replace(/&aacute;/g, "á").replace(/&oacute;/g, "ó").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "� ").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "ë").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "ë").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&euml;/g, "ë").replace(/&Uuml;/g, "Ü").replace(/&ntilde;/g, "ñ").replace(/&uuml;/g, "ü")
            
            })
            return formattedQuestion;

        })
        console.log(questions);
    // questions = loadedQuestions;
        
    startGame();
    })
    .catch((err) => {
        console.error(err);
    });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('/end?level=' + level);
    }
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + '/' +  MAX_QUESTIONS;
    progressBarFull.style.width = ((questionCounter / MAX_QUESTIONS) * 100)+ "%";

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach((choice) => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        

        const classtoApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if (classtoApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classtoApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classtoApply);
            getNewQuestion();
        }, 1000);
        
        


        
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

