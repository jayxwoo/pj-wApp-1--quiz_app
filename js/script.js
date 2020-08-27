// ========== imports ==========
import './default.js';

// reference
const form = document.querySelector('.quiz-form');

// answer checker
let answerChecker = {
    // properties
    form: form,
    answers: ['b', 'a', 'c', 'a'],
    userAnswers: [],

    // methods
    getUserAnswers: function () {
        let checkedRadios = this.form.querySelectorAll('.input-radio:checked');
        let userAnswers = [];
        checkedRadios.forEach((checkedRadio) => {
            this.userAnswers.push(checkedRadio.value.trim().toLowerCase());
        });
        
        return this.userAnswers;
    },

    checkUserAnswers: function (userAnswers) {
        let score = 0;
        userAnswers.forEach((userAnswer, index) => {
            if (userAnswer === this.answers[index]) {
                score += 100 * (1/this.answers.length);
            };
        });
        console.log(score);
    }
};

// main
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const userAnswers = answerChecker.getUserAnswers();
    answerChecker.checkUserAnswers(userAnswers);
});