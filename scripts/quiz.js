window.onload(() => {
    quiz.init();
});

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
        {
            q: 'What is the purpose of the setTimeout function in JavaScript?',
            answers: ['It creates a new thread for executing code', 'It delays the execution of a function by a specified time', 'It defines a CSS style timeout for animations', 'It sets a timeout for AJAX requests'],
            correctAnswerNum: 1,
        },
        {
            q: "Which keyword creates a constant in JavaScript?",
            answers: ["const", "let", "var", "constant"],
            correctAnswerNum: 0,
        },
        {
            q: "What tool does React use to compile JSX?",
            answers: ['JSX Compiler', 'ReactDOM', 'React Router', 'Babel'],
            correctAnswerNum: 3
        },
        {
            q: " Choose the correct HTML element to define important text.",
            answers: ['<strong>', '<bold>', '<em>', '<important>'],
            correctAnswerNum: 0,
        },
    ]

    init() {}
};

const quiz = new Quiz();