window.onload = function () {
    quiz.init();
};

class Quiz {
    questions = [{
            q: "What does CSS stand for?",
            answers: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Complex Style System"],
            correctAnswerNum: 1,
        },
        {
            q: "What is the purpose of HTML?",
            answers: ["Styling the website", "Adding interactivity", "Defining the structure of a web page", "Creating databases"],
            correctAnswerNum: 2,
        },
        {
            q: "How can you optimize website performance?",
            answers: ['By reducing HTTP requests and file sizes', 'By adding large images for visual appeal', 'By minimizing the use of caching', 'By using complex animations'],
            correctAnswerNum: 0,
        },
        {
            q: "What is a Git used for in web development?",
            answers: ['Storing images and videos for a website', 'Managing databases', 'Running server-side scripts', 'Version control and collaboration', ],
            correctAnswerNum: 3,
        },
        {
            q: "What does the === operator do in JavaScript?",
            answers: ['Compares two values for equality without type conversion', 'Assigns a value to a variable', 'Checks if two values are equal, converting types if necessary', 'Performs a strict comparison of two values and their types'],
            correctAnswerNum: 3,
        },
        {
            q: "What is the purpose of the useState hook in React?",
            answers: ['It is used for making API calls', 'It provides access to browser cookies', 'It allows functional components to manage state', 'It connects React components to a Redux store'],
            correctAnswerNum: 2
        },
        // {
        //     q: 'What is the purpose of the setTimeout function in JavaScript?',
        //     answers: ['It creates a new thread for executing code', 'It delays the execution of a function by a specified time', 'It defines a CSS style timeout for animations', 'It sets a timeout for AJAX requests'],
        //     correctAnswerNum: 1,
        // },
        // {
        //     q: "Which keyword creates a constant in JavaScript?",
        //     answers: ["const", "let", "var", "constant"],
        //     correctAnswerNum: 0,
        // },
        // {
        //     q: "What tool does React use to compile JSX?",
        //     answers: ['JSX Compiler', 'ReactDOM', 'React Router', 'Babel'],
        //     correctAnswerNum: 3
        // },
        // {
        //     q: " Choose the correct HTML element to define important text.",
        //     answers: [`<strong>`, `<bold>`, `<em>`, `<important>`],
        //     correctAnswerNum: 0,
        // },
    ];

    currentQuestionIndex = -1;

    quizProgress = null;
    quizQuestionText = null;
    answerOptions = null;
    answer0 = null;
    answer1 = null;
    answer2 = null;
    answer3 = null;
    correctAnswerNum = null;

    userSelectedAnswer = null;
    userCorrectAnswersNum = 0;
    userWrongAnswersNum = 0;
    saveAnswerBtn = null;
    nextQuestionBtn = null;

    userPercentage = 0
    resultPopup = null;
    resultImage = null;
    resultMainText = null;
    resultPercentage = null;
    resultLevel = null;
    resultBtn = null;
    gameMode = true;

    init() {
        this.quizProgress = document.querySelector(".quiz-progress");
        this.quizQuestionText = document.querySelector(".quiz-question");
        this.answerOptions = document.querySelectorAll(".answer-option");
        this.answer0 = document.querySelector(".answer-text-0");
        this.answer1 = document.querySelector(".answer-text-1");
        this.answer2 = document.querySelector(".answer-text-2");
        this.answer3 = document.querySelector(".answer-text-3");
        this.saveAnswerBtn = document.querySelector(".btn-save-answer");
        this.nextQuestionBtn = document.querySelector(".btn-next-question");
        this.resultPopup = document.querySelector(".result-popup");
        this.resultImage = document.querySelector(".result-info");
        this.resultMainText = document.querySelector(".result-main-text");
        this.resultPercentage = document.querySelector(".result-percentage");
        this.resultLevel = document.querySelector(".result-level");
        this.resultBtn = document.querySelector(".result-btn");

        this.setNextQuestionData();

        this.saveAnswerBtn.addEventListener('click', this.saveAnswer);
        this.nextQuestionBtn.addEventListener('click', this.setNextQuestionData);

        this.answerOptions.forEach(option => option.addEventListener('click', () => this.selectAnswer(option)));
    };

    selectAnswer = (option) => {
        if (!this.gameMode) return;
        this.saveAnswerBtn.disabled = false;
        this.answerOptions.forEach(option => option.classList.remove('selected'));
        option.classList.add('selected');
        this.userSelectedAnswer = option.getAttribute('data-option');
    }

    saveAnswer = () => {
        if (!this.userSelectedAnswer) return console.log('You need to choose one of the options.');

        this.answerOptions[this.correctAnswerNum].classList.add("correct");

        if (this.userSelectedAnswer == this.correctAnswerNum) {
            this.userCorrectAnswersNum++;

        } else {
            this.answerOptions[this.userSelectedAnswer].classList.add("wrong");
            this.userWrongAnswersNum++;
        }

        this.saveUserStats();
        this.saveAnswerBtn.disabled = true;
        this.nextQuestionBtn.disabled = false;
        this.gameMode = false;

    };

    saveUserStats = () => {
        document.querySelector(".correct-answers-num").textContent = this.userCorrectAnswersNum;
        document.querySelector(".wrong-answers-num").textContent = this.userWrongAnswersNum;
    };

    setNextQuestionData = () => {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showQuizResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        this.quizProgress.textContent = `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
        this.quizQuestionText.textContent = question.q;
        this.answer0.textContent = question.answers[0];
        this.answer1.textContent = question.answers[1];
        this.answer2.textContent = question.answers[2];
        this.answer3.textContent = question.answers[3];

        this.correctAnswerNum = question.correctAnswerNum;
        this.answerOptions.forEach(option => option.classList.remove("correct", "wrong", "selected"));
        this.userSelectedAnswer = null;
        this.saveAnswerBtn.disabled = true;
        this.nextQuestionBtn.disabled = true;
        this.gameMode = true;
    };

    showQuizResults = () => {
        this.resultPopup.classList.add("result-popup-active");
        this.userPercentage = Math.round((this.userCorrectAnswersNum / this.questions.length) * 100);

        let resultText = ''
        let resultType = '';

        if (this.userPercentage >= 71) {
            resultText = "Excellent!"
            resultType = "high";
            this.resultImage.classList.add("high");

        } else if (this.userPercentage >= 41) {
            resultText = "Not Bad!"
            resultType = "medium";
            this.resultImage.classList.add("medium");
        } else {
            resultText = "You Failed!"
            resultType = "low";
            this.resultImage.classList.add("low");
        }

        this.resultMainText.innerHTML = resultText;
        this.resultLevel.innerHTML = resultType;
        this.resultPercentage.innerHTML = this.userPercentage + "%";
    };
};

const quiz = new Quiz();