var trivia = {
    q1 : {
        question: "What temperature is the same in Fahrenheit and Celcius?",
        choices: ["0","112","-40","-52"],
        answer: "-40"
    },
    q2 : {
        question: "Which two planets are most similar in size diameter wise?",
        choices: ["Mars and Mercury", "Venus and Earth", "Uranus and Neptune", "Jupiter and Saturn"],
        answer: "Venus and Earth"
    },
    q3 : {
        question: "What virus was the first vaccine devopled for",
        choices: ["Rabies", "Cholera", "Smallpox","Yellow Fever"],
        answer: "Smallpox"
    },
    q4 : {
        question: "Which element is most abundant in Earth's atmosphere",
        choices: ["Oxygen", "Nitrogen", "Argon", "Hydrogen"],
        answer: "Nitrogen"
    },
    q5 : {
        question: "Which Apollo mission first landed on the Moon?",
        choices: ["11", "13", "5", "7"],
        answer: "11"
    },
    q6 : {
        question: "Ganymede is a moon of which planet?",
        choices: ["Saturn", "Jupiter", "Uranus", "Mars"],
        answer: "Jupiter"
    },
    q7 : {
        question: "How many moons does Neptune have?",
        choices: ["4", "16", "9", "13"],
        answer: "13"
    },
    q8 : {
        question: "Which part of the electromagnetic spectrum has the shortest wavelength?",
        choices: ["Radio Waves", "X-rays", " Microwaves", "Gamma rays"],
        answer: "Gamma rays"
    },
    q9 : {
        question: "What is the Atomic Symbol for Silver?",
        choices: ["Si", "Ag", "Au", "Sr"],
        answer: "Au"
    },
    q10 : {
        question: "How many questions does this quiz have?",
        choices: ["10", "11", "9", "12"],
        answer: "10"
    },
    intervalTime: 0,
    difficulty: 15,
    time : 0,
    options : [],
    currentQuestion: Math.floor(Math.random()*11),
    questionsAsked: [],
    answer : "",
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    choices: document.getElementById("choices"),
    right : document.getElementById("right"),
    wrong: document.getElementById("wrong"),
    gameover: document.getElementById("end"),
    question: document.getElementById("question"),
    qtxt: document.getElementById("qtxt"),
    choice1 : document.getElementById("choice1"),
    choice2 : document.getElementById("choice2"),
    choice3 : document.getElementById("choice3"),
    choice4 : document.getElementById("choice4"),
    choice1txt : document.getElementById("choice1text"),
    choice2txt : document.getElementById("choice2text"),
    choice3txt : document.getElementById("choice3text"),
    choice4txt : document.getElementById("choice4text"),
    timer: document.getElementById("timer"),
    playGame: function() {
        if (trivia.questionsAsked.length >= 10) {
            trivia.endGame();
        }
        else {
            trivia.getOptions();
            trivia.chooseQuestion();
            trivia.loadQuestion(trivia["q"+String(trivia.currentQuestion)]);
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
        trivia.clearScreen();
    },
    chooseQuestion: function() {
        while (trivia.questionsAsked.indexOf(trivia.currentQuestion) >= 0) {
            trivia.currentQuestion = Math.floor(Math.random()*10)+1;
        }
        trivia.questionsAsked.push(trivia.currentQuestion);
    },
    loadQuestion: function(Question) {
        trivia.choices.style.display = "block";
        trivia.answer = Question.answer;
        trivia.qtxt.textContent = Question.question;
        trivia.choice1txt.textContent = Question.choices[trivia.options[0]];
        trivia.choice2txt.textContent = Question.choices[trivia.options[1]];
        trivia.choice3txt.textContent = Question.choices[trivia.options[2]];
        trivia.choice4txt.textContent = Question.choices[trivia.options[3]];
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
        trivia.qtxt.textContent = "Correct!";
        trivia.right.textContent = "Winner";
        setTimeout(trivia.playGame,5000);
    },
    wrongChoice: function(x) {
        trivia.choices.style.display = "none";
        trivia.wrong.style.display = "block";
        trivia.qtxt.textContent = x;
        trivia.wrong.textContent = "The Correct Answer was: " + trivia.answer;
        setTimeout(trivia.playGame,5000);
    },
    clearScreen: function() {
        trivia.wrong.style.display = "none";
        trivia.right.style.display = "none";
        trivia.gameover.style.display = "none";
        trivia.choices.style.display = "none"
    },
    endGame: function() {
        trivia.qtxt.textContent = "Trivia Night is Over. Here is how you did:"
        trivia.clearScreen();
        trivia.gameover.style.display = "block";
    }
}

trivia.choice1.addEventListener("click", function() {
    trivia.chooseAnswer(trivia.choice1txt.textContent);
});

trivia.choice2.addEventListener("click", function() {
    trivia.chooseAnswer(trivia.choice2txt.textContent);
});

trivia.choice3.addEventListener("click", function() {
    trivia.chooseAnswer(trivia.choice3txt.textContent);
});

trivia.choice4.addEventListener("click", function() {
    trivia.chooseAnswer(trivia.choice4txt.textContent);
});

document.getElementById("btn-begin").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
    trivia.timer.textContent = trivia.difficulty;
    trivia.playGame();
});