// ========== imports ==========
import './default.js';

// reference
const form = document.querySelector('.quiz-form');

// answer checker
let answerChecker = {
    // properties
    form: form,
    answers: ['b', 'a', 'c', 'a'],

    // methods
    getUserAnswers: function () {
        let checkedRadios = this.form.querySelectorAll('.input-radio:checked');
        let userAnswers = [];
        checkedRadios.forEach(function (checkedRadio) {
            userAnswers.push(checkedRadio.value);
        });
        
        return userAnswers;
    },

    checkUserAnswers: function (userAnswers) {
        
    }
};

// main
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const userAnswers = answerChecker.getUserAnswers();
    answerChecker.checkUserAnswers(userAnswers);
});