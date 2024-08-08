
document.addEventListener('DOMContentLoaded', () => {
   
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}


// Creating questions
let quiz =new Quiz([

    new Question("What does 'var' declare in JavaScript?", ["variable", "function", "constant", "object"], "variable"),

    new Question("Which of the following is used to define a function in JavaScript?", ["def", "function", "func", "define"], "function"),

    new Question("What method is used to convert a value to a string in JavaScript?", ["toString()", "parseInt()", "stringify()", "convert()"], "toString()"),

    new Question("How do you access the third element of an array in JavaScript?", ["array[2]", "array[3]", "array.get(3)", "array(2)"], "array[2]"),

    new Question("Which keyword is used to create a constant in JavaScript?", ["const", "let", "var", "static"], "const")


])


function displayQuestions() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        let choices = quiz.getQuestionIndex().choices;
        for (let index = 0; index < choices.length; index++) {
            let choiceElement = document.getElementById("choice" + index);
            choiceElement.innerHTML = choices[index];

            guess("btn" + index, choices[index]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestions();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

function showScores() {
    let quizEndHtml = `
    <div class="end">
        <h1>Score board</h1>
        <h2 id="score">You scored : ${quiz.score} of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="index.html">Try Once Again</a>
        </div>
    </div>    
    `;

    let quizElement = document.getElementsByClassName("container")[0];
    quizElement.innerHTML = quizEndHtml;
}




displayQuestions();


let timeInMin=0.5*quiz.questions.length;

let quizTime=timeInMin*60;

let count= document.getElementById("countdown");

function startCounting() {
    
    let Timer= setInterval(() => {
        if (quizTime<=0) {
            clearInterval(Timer);
            showScores();
        } else {
            quizTime--;
            
            let sec=Math.floor(quizTime%60);
            let min=Math.floor(quizTime/60);
            if(sec==0){
                quiz.questionIndex++;
                displayQuestions();
            }

             tempMin=String(min).padStart(2,0);
             tempSec=String(sec).padStart(2,0);
            count.innerHTML=`TIME ${tempMin}:${tempSec}`;
        }
        
    },1000);

}

startCounting();


})
