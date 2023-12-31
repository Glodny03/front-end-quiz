// Initialize the quiz once the window has loaded
window.onload = function () {
    quiz.init();
};

// Class representing the quiz
class Quiz {
    // Variable to store the index of the current question
    currentQuestionIndex = -1;

    // Quiz interface elements
    quizProgress = null;
    quizProgressBar = null;
    quizQuestionText = null;
    answerOptions = null;
    answer0 = null;
    answer1 = null;
    answer2 = null;
    answer3 = null;
    correctAnswerNum = null;

    // User's selected answer, correct and wrong answers counters, buttons and mode indicators
    userSelectedAnswer = null;
    userCorrectAnswersNum = 0;
    userWrongAnswersNum = 0;
    saveAnswerBtn = null;
    nextQuestionBtn = null;

    // User's quiz result data
    userPercentage = 0;
    resultPopup = null;
    resultImage = null;
    resultMainText = null;
    resultPercentage = null;
    resultLevel = null;
    resultBtn = null;
    gameMode = true;

    // Initialize the quiz interface, fetch questions, and set up event listeners
    async init() {
        // Fetch questions from the JSON file
        const response = await fetch('../data/questions.json');
        this.questions = await response.json();

        this.quizProgress = document.querySelector(".quiz-progress");
        this.quizProgressBar = document.querySelector(".progress-bar");
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


        this.saveAnswerBtn.addEventListener('click', this.saveAnswer);
        this.nextQuestionBtn.addEventListener('click', this.setNextQuestionData);
        this.resultBtn.addEventListener('click', this.restartQuiz);
        this.answerOptions.forEach(option => option.addEventListener('click', () => this.selectAnswer(option)));

        this.setNextQuestionData();
    };

    // Handle the user's selection of an answer option
    selectAnswer = (option) => {
        if (!this.gameMode) return;
        // Enable the save answer button and update selected option apperance
        this.saveAnswerBtn.disabled = false;
        this.answerOptions.forEach(option => option.classList.remove("selected"));
        option.classList.add("selected");
        this.userSelectedAnswer = option.getAttribute("data-option");
    };

    // Save the user's answer and update statistics
    saveAnswer = () => {
        if (!this.userSelectedAnswer) return console.log("You need to choose one of the options.");

        // Mark the correct answer and update counters
        this.answerOptions[this.correctAnswerNum].classList.add("correct");
        if (this.userSelectedAnswer == this.correctAnswerNum) {
            this.userCorrectAnswersNum++;
        } else {
            this.answerOptions[this.userSelectedAnswer].classList.add("wrong");
            this.userWrongAnswersNum++;
        };

        // Update user stats, disable buttons, and switch game mode
        this.setUserStats();
        this.saveAnswerBtn.disabled = true;
        this.nextQuestionBtn.disabled = false;
        this.gameMode = false;
    };

    // Update user's statistics on the interface
    setUserStats = () => {
        document.querySelector(".correct-answers-num").textContent = this.userCorrectAnswersNum;
        document.querySelector(".wrong-answers-num").textContent = this.userWrongAnswersNum;
    };

    // Set up data for the next question
    setNextQuestionData = () => {
        // Increment question index and show results if all questions are answered
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length) return this.showQuizResults();

        // Retrieve question data and update interface elements
        const question = this.questions[this.currentQuestionIndex];
        this.quizProgress.textContent = `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
        this.quizProgressBar.style.width = `${(this.currentQuestionIndex) / this.questions.length * 100}%`;
        console.log(`${(this.currentQuestionIndex + 1) / this.questions.length * 100}%`);
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

    // Restart the quiz and reset user data
    restartQuiz = () => {
        // Hide result popup and reset result image classes
        this.resultPopup.classList.remove("result-popup-active");
        setTimeout(() => {
            this.resultImage.classList.remove("low", "medium", "high");
        }, 800);

        // Reset question index and user statistics
        this.currentQuestionIndex = -1;
        this.userCorrectAnswersNum = 0;
        this.userWrongAnswersNum = 0;
        this.setUserStats();

        // Set up data for the first question
        this.setNextQuestionData();
    };

    // Display quiz results based on user's performance
    showQuizResults = () => {
        // Show result popup and calculate user's percentage score
        this.resultPopup.classList.add("result-popup-active");
        this.userPercentage = Math.round((this.userCorrectAnswersNum / this.questions.length) * 100);

        // Determine result text and level based on user's percentage score
        let resultText = "";
        let resultType = "";
        if (this.userPercentage >= 71) {
            resultText = "Excellent!";
            resultType = "high";
            this.resultImage.classList.add("high");
        } else if (this.userPercentage >= 41) {
            resultText = "Not Bad!";
            resultType = "medium";
            this.resultImage.classList.add("medium");
        } else {
            resultText = "You Failed!";
            resultType = "low";
            this.resultImage.classList.add("low");
        };

        // Update result popup content with calculated data
        this.resultMainText.innerHTML = resultText;
        this.resultLevel.innerHTML = resultType;
        this.resultPercentage.innerHTML = this.userPercentage + "%";
    };
};

// Create an instance of the Quiz class to start the quiz
const quiz = new Quiz();