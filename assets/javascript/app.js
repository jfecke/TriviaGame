var trivia = {
    q1 : {
        question: "Which is the correct placeholder option?",
        choices: ["Option 1","Option 2","Option 3","Option 4"],
        answer: "Option 3"
    },
    q2 : {
        question: "",
        choices: [],
        answer: ""
    },
    q3 : {
        question: "",
        choices: [],
        answer: ""
    },
    q4 : {
        question: "",
        choices: [],
        answer: ""
    },
    q5 : {
        question: "",
        choices: [],
        answer: ""
    },
    q6 : {
        question: "",
        choices: [],
        answer: ""
    },
    q7 : {
        question: "",
        choices: [],
        answer: ""
    },
    q8 : {
        question: "",
        choices: [],
        answer: ""
    },
    q9 : {
        question: "",
        choices: [],
        answer: ""
    },
    q10 : {
        question: "",
        choices: [],
        answer: ""
    },
    intervalTime: 0,
    difficulty: 20,
    time : 0,
    tracker: 1,
    options : [],
    answer : "",
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    choices: document.getElementById("choices"),
    right : document.getElementById("right"),
    wrong: document.getElementById("wrong"),
    gameover: document.getElementById("end"),
    question: document.getElementById("question"),
    choice1 : document.getElementById("choice1"),
    choice2 : document.getElementById("choice2"),
    choice3 : document.getElementById("choice3"),
    choice4 : document.getElementById("choice4"),
    timer: document.getElementById("timer"),
    playGame: function() {
        if (trivia.tracker > 10) {
            trivia.endGame();
        }
        else {
            trivia.getOptions();
            trivia.loadQuestion(trivia["q"+String(trivia.tracker)]);
            trivia.startTimer();          
        }
    },
    getOptions: function() {
        trivia.options = [];
        var choice = 0;
        while (trivia.options.length < 4) {
            choice = Math.floor(Math.random()*4);
            if (trivia.options.indexOf(choice) < 0) {
                trivia.options.push(choice)
            }          
        }
        trivia.setScreen();
    },
    loadQuestion: function(currentQuestion) {
        trivia.answer = currentQuestion.answer;
        trivia.question.textContent = currentQuestion.question;
        trivia.choice1.textContent = currentQuestion.choices[trivia.options[0]];
        trivia.choice2.textContent = currentQuestion.choices[trivia.options[1]];
        trivia.choice3.textContent = currentQuestion.choices[trivia.options[2]];
        trivia.choice4.textContent = currentQuestion.choices[trivia.options[3]];
    },
    startTimer: function() {
        trivia.time = trivia.difficulty;
        trivia.intervalTime = setInterval(trivia.countDown, 1000)
    },
    countDown: function() {
        trivia.timer.textContent = trivia.time;
        trivia.time--;
        if (trivia.time < 0) {
            clearInterval(trivia.intervalTime);
            setTimeout(function() {
                trivia.unanswered++;
                trivia.wrongChoice("Out of Time!");
            }, 10)
            
        }   
    },
    chooseAnswer: function(x) {
        clearInterval(trivia.intervalTime);
        if (x == trivia.answer) {
            trivia.correct++;
            trivia.rightChoice();
        }
        else {
            trivia.incorrect++;
            trivia.wrongChoice("Incorrect!")
        }
    },
    rightChoice: function() {
        trivia.choices.style.display = "none";
        trivia.right.style.display = "block";
        trivia.question.textContent = "Correct!";
        trivia.right.textContent = "Winner";
        // trivia.tracker++;
        setTimeout(trivia.playGame,5000);
    },
    wrongChoice: function(x) {
        trivia.choices.style.display = "none";
        trivia.wrong.style.display = "block";
        trivia.question.textContent = x;
        trivia.wrong.textContent = "The Correct Answer was: " + trivia.answer;
        // trivia.tracker++;
        setTimeout(trivia.playGame,5000);
    },
    setScreen: function() {
        trivia.wrong.style.display = "none";
        trivia.right.style.display = "none";
        trivia.gameover.style.display = "none";
        trivia.choices.style.display = "block"
    },
    endGame: function() {
        trivia.question.textContent = "Trivia Night is Over. Here is how you did:"

    }
}

trivia.choice1.addEventListener("click", function() {
    trivia.chooseAnswer(this.textContent);
});

trivia.choice2.addEventListener("click", function() {
    trivia.chooseAnswer(this.textContent);
});

trivia.choice3.addEventListener("click", function() {
    trivia.chooseAnswer(this.textContent);
});

trivia.choice4.addEventListener("click", function() {
    trivia.chooseAnswer(this.textContent);
});

document.getElementById("btn-begin").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
    trivia.timer.textContent = trivia.difficulty;
    trivia.playGame();
});