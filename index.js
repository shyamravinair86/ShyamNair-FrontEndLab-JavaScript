//questions for the quiz
let questions = [
    new Question("Inside which HTML element do we put the JavaScript?", ["<javascript>", "<js>", "<script>", "<scripting>"], "<script>"),
    new Question("Which is the correct way to write a comment in JavaScript?", ["{# ... #}", "<!--- .... ---!>", "// ....", "\\ ...."], "// ...."),
    new Question("How can you detect the application name of the client’s browser?", ["navigator.appName", "navigator.browserName", "browser.name", "None of this"], "navigator.appName")
];

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice_entered) {
    return this.answer === choice_entered;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.question_index = 0;
}

Quiz.prototype.questionByIndex = function () {
    return this.questions[this.question_index]
}

Quiz.prototype.updateScore = function (answer) {
    let currentQuestion = this.questionByIndex();
    if (currentQuestion.isCorrectAnswer(answer)) {
        this.score += 1;
    }
    this.question_index += 1;
}

Quiz.prototype.isQuizEnded = function () {
    return this.question_index === questions.length;
}

let obj = new Quiz(questions);

function loadQuestions() {
    if (obj.isQuizEnded()) {
        displayScore();
    } else {
        let q1 = document.getElementById('question');
        q1.innerText = obj.questionByIndex().text;
        let choices = obj.questionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            let sp1 = document.getElementById('choice' + i);
            sp1.innerText = choices[i];
            let btn = document.getElementById('btn' + i);
            const choice = choices[i];
            btn.onclick = () => {
                //alert('Button Clicked');
                obj.updateScore(choice);
                loadQuestions();
            };
            updateProgress();
        }


    }
}

function displayScore() {
    let quiz = document.getElementById('quiz');
    let res = "<h1>Result</h1>"
    res += "<h2>" + " Your Score is: " + obj.score + "<br>" + " Marks percentage is: " + (obj.score / questions.length * 100) + "%" + "</h2>";
    quiz.innerHTML = res;
}

function updateProgress() {
    let prog = document.getElementById("progress");
    prog.innerText = "Question " + (obj.question_index + 1) + " of " + obj.questions.length;
}

loadQuestions();