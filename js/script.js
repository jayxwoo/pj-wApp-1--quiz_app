// ========== imports ==========
import './default.js';

// reference
const form = document.querySelector('.quiz-form');

// answer checker
let answerChecker = {
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

    checkUserAnswers: function (answers, userAnswers) {
        let score = 0;
        userAnswers.forEach((userAnswer, index) => {
            if (userAnswer === answers[index]) {
                score += 100 * (1/answers.length);
            };
        });
        console.log(score);
    }
};

// main
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const answers = answerChecker.getAnswers();
    const userAnswers = answerChecker.getUserAnswers();
    answerChecker.checkUserAnswers(answers, userAnswers);
});