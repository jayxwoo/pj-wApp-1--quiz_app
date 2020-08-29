// ========== imports ==========
import './default.js';

// ========== script ==========
// DOM reference
const form = document.querySelector('.quiz-form');
const resultContainer = document.querySelector('.result-container');
const resultPercentage = document.querySelector('.result-percentage');

// quiz checker
class QuizChecker {
    // properties
    constructor(form, resultPercentage) {
        this.form = form;
    }

    // methods
    getAnswers = function () {
        let answers = [];
        this.form.querySelectorAll('.question').forEach((question) => {
            answers.push(question.getAttribute('data-answer'));
        });

        return answers;
    }

    getUserAnswers = function () {
        let userAnswers = []
        let checkedRadios = this.form.querySelectorAll('.input-radio:checked');
        checkedRadios.forEach((checkedRadio) => {
            userAnswers.push(checkedRadio.value.trim().toLowerCase());
        });
        
        return userAnswers;
    }

    getUserScore = function (answers, userAnswers) {
        let score = 0;
        userAnswers.forEach((userAnswer, index) => {
            if (userAnswer === answers[index]) {
                score += 100 * (1/answers.length);
            };
        });

        return score;
    }
};

// score displayer
class ScoreDisplayer {
    // properties
    constructor(score, resultContainer, resultPercentage) {
        this.score = score;
        this.resultContainer = resultContainer;
        this.resultPercentage = resultPercentage;
    }

    // methods
    scrollUpToScore = function () {
        this.resultContainer.scrollIntoView();
    }

    displayScore = function () {
        let i = 0;
        const timer = setInterval(() => {
            this.resultPercentage.textContent = i;
            i++;

            if (i > this.score) {
                clearInterval(timer);
            };
        }, 20);
    }
}

// main
const main = function () {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // quizChecker
        const quizChecker = new QuizChecker(form, resultPercentage);
        const answers = quizChecker.getAnswers();
        const userAnswers = quizChecker.getUserAnswers();
        const score = quizChecker.getUserScore(answers, userAnswers);

        // scoreDisplayer
        const scoreDisplayer = new ScoreDisplayer(score, resultContainer, resultPercentage);
        scoreDisplayer.scrollUpToScore();
        scoreDisplayer.displayScore();

        form.reset();
    });
};

main();