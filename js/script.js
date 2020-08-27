// ========== imports ==========
import './default.js';

// reference
const form = document.querySelector('.quiz-form');
const resultPercentage = document.querySelector('.result-percentage');

// answer checker class
class AnswerChecker {
    // properties
    constructor(form) {
        this.form = form;
    }

    // methods
    getAnswers = function () {
        let answers = [];
        this.form.querySelectorAll('.question').forEach((question) => {
            answers.push(question.getAttribute('data-answer'));
        })
        return answers;
    };

    getUserAnswers = function () {
        let userAnswers = []
        let checkedRadios = this.form.querySelectorAll('.input-radio:checked');
        checkedRadios.forEach((checkedRadio) => {
            userAnswers.push(checkedRadio.value.trim().toLowerCase());
        });
        
        return userAnswers;
    };

    getUserScore = function (answers, userAnswers) {
        let score = 0;
        userAnswers.forEach((userAnswer, index) => {
            if (userAnswer === answers[index]) {
                score += 100 * (1/answers.length);
            };
        });
        return score;
    };
};

// score displayer
class ScoreDisplayer {
    // properties
    constructor(score) {
        this.score = score;
    }

    // methods
    displayScore = function () {
        resultPercentage.textContent = this.score;
    };
}

// main
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const answerChecker = new AnswerChecker(form);
    const answers = answerChecker.getAnswers();
    const userAnswers = answerChecker.getUserAnswers();
    const score = answerChecker.getUserScore(answers, userAnswers);
    
    const scoreDisplayer = new ScoreDisplayer(score);
    scoreDisplayer.displayScore();

    form.reset();
});