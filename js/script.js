// ========== imports ==========
import './default.js';

// ========== script ==========
// DOM reference
const root = document.documentElement;
const form = document.querySelector('.quiz-form');
const colorBtnWrapper = document.querySelector('.color-btn-wrapper');
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

// color theme picker
class ColorThemePicker {
    // properties
    constructor(colorBtnWrapper, clickedBtn) {
        this.colorBtnWrapper = colorBtnWrapper;
        this.clickedBtn = clickedBtn;
    }

    // methods
    changeTheme = function () {
        const newColor = this.clickedBtn.getAttribute('aria-label');
        const newColorCode = getComputedStyle(document.documentElement).getPropertyValue(`--${newColor}`);
        
        root.style.setProperty('--main', newColorCode);
    }

    reAssignActive = function () {
        const buttons = Array.from(this.colorBtnWrapper.querySelectorAll('button'));
        const currentActiveButton = buttons.find(function (button) {
            return button.classList.contains('color-btn--active');
        });
        currentActiveButton.classList.remove('color-btn--active');
        this.clickedBtn.classList.add('color-btn--active');
    } 
}

// main
const main = function () {
    // QuizChecker
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const quizChecker = new QuizChecker(form, resultPercentage);
        const answers = quizChecker.getAnswers();
        const userAnswers = quizChecker.getUserAnswers();
        const score = quizChecker.getUserScore(answers, userAnswers);

        // ScoreDisplayer
        const scoreDisplayer = new ScoreDisplayer(score, resultContainer, resultPercentage);
        scoreDisplayer.scrollUpToScore();
        scoreDisplayer.displayScore();

        // reset form
        form.reset();
    });

    // ColorThemePicker
    colorBtnWrapper.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (e.target.tagName === 'BUTTON') {
            const colorThemePicker = new ColorThemePicker(colorBtnWrapper, e.target);
            colorThemePicker.changeTheme();
            colorThemePicker.reAssignActive();
        };
    });

};

main();