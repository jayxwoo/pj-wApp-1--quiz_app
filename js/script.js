// ========== imports ==========
import './default.js';

// reference
const form = document.querySelector('.quiz-form');
const resultPercentage = document.querySelector('.result-percentage');

// quiz checker class
const quizChecker = {
    // properties
        form: form,

    // methods
    getAnswers: function () {
        let answers = [];
        this.form.querySelectorAll('.question').forEach((question) => {
            answers.push(question.getAttribute('data-answer'));
        })
        return answers;
    },

    getUserAnswers: function () {
        let userAnswers = []
        let checkedRadios = this.form.querySelectorAll('.input-radio:checked');
        checkedRadios.forEach((checkedRadio) => {
            userAnswers.push(checkedRadio.value.trim().toLowerCase());
        });
        
        return userAnswers;
    },

    getUserScore: function (answers, userAnswers) {
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
const scoreDisplayer = {
    // properties

    // methods

};

// main
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const answers = quizChecker.getAnswers();
    const userAnswers = quizChecker.getUserAnswers();
    const score = quizChecker.getUserScore(answers, userAnswers);

    console.log(score);

    form.reset();
});