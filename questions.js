const quizQuestions = [
    {
        id: 1,
        question: "What does 'const' keyword do in JavaScript?",
        options: ["Creates a constant variable", "Creates a changeable variable", "Creates a function", "Creates an object"],
        correct: 0,
        category: "JavaScript",
        difficulty: "easy",
        hint: "Think about variables that cannot be reassigned"
    },
    {
        id: 2,
        question: "What is the output of: typeof null?",
        options: ["'null'", "'undefined'", "'object'", "'number'"],
        correct: 2,
        category: "JavaScript",
        difficulty: "medium",
        hint: "This is actually a JavaScript bug from the early days"
    },
    {
        id: 3,
        question: "Which method is used to add elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
        category: "JavaScript",
        difficulty: "easy",
        hint: "Think about pushing something into a stack"
    },
    {
        id: 4,
        question: "What is a closure in JavaScript?",
        options: ["A function inside another function", "A way to close browser", "A type of loop", "An error handling method"],
        correct: 0,
        category: "JavaScript",
        difficulty: "medium",
        hint: "Functions that remember their outer scope"
    },
    {
        id: 5,
        question: "What does '===' operator check in JavaScript?",
        options: ["Value only", "Type only", "Both value and type", "Neither"],
        correct: 2,
        category: "JavaScript",
        difficulty: "easy",
        hint: "Strict equality checks both..."
    },
    {
        id: 6,
        question: "What is the purpose of 'async/await' in JavaScript?",
        options: ["Handle asynchronous operations", "Create animations", "Debug code", "Compress files"],
        correct: 0,
        category: "JavaScript",
        difficulty: "medium",
        hint: "Makes asynchronous code look synchronous"
    },
    {
        id: 7,
        question: "Which of these is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correct: 2,
        category: "JavaScript",
        difficulty: "medium",
        hint: "JavaScript uses 'number' for all numeric values"
    },
    {
        id: 8,
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: ["Current object", "Previous function", "Global window", "Depends on context"],
        correct: 3,
        category: "JavaScript",
        difficulty: "hard",
        hint: "Context matters! It changes based on how function is called"
    },
    {
        id: 9,
        question: "What is the difference between 'let' and 'var'?",
        options: ["No difference", "Scope difference", "Speed difference", "Memory usage"],
        correct: 1,
        category: "JavaScript",
        difficulty: "medium",
        hint: "Block scope vs function scope"
    },
    {
        id: 10,
        question: "What does JSON stand for?",
        options: ["JavaScript Object Notation", "Java Standard Object Notation", "Just Simple Object Names", "JavaScript Oriented Network"],
        correct: 0,
        category: "JavaScript",
        difficulty: "easy",
        hint: "It's a data format based on JavaScript objects"
    },
    {
        id: 11,
        question: "Which method converts a string to uppercase?",
        options: ["toUpper()", "uppercase()", "toUpperCase()", "upper()"],
        correct: 2,
        category: "JavaScript",
        difficulty: "easy",
        hint: "Method name includes 'Case'"
    },
    {
        id: 12,
        question: "What is a Promise in JavaScript?",
        options: ["A guarantee", "An async operation result", "A variable type", "A loop structure"],
        correct: 1,
        category: "JavaScript",
        difficulty: "medium",
        hint: "Represents eventual completion of async operation"
    },
    {
        id: 13,
        question: "What does the 'map()' method do?",
        options: ["Creates a new array", "Filters array", "Sorts array", "Joins arrays"],
        correct: 0,
        category: "JavaScript",
        difficulty: "medium",
        hint: "Transforms each element and returns new array"
    },
    {
        id: 14,
        question: "What is the output of: 0.1 + 0.2 === 0.3?",
        options: ["true", "false", "undefined", "NaN"],
        correct: 1,
        category: "JavaScript",
        difficulty: "hard",
        hint: "Floating point precision issue"
    },
    {
        id: 15,
        question: "What is an arrow function in ES6?",
        options: ["() => {}", "function() {}", "def function:", "func() {}"],
        correct: 0,
        category: "JavaScript",
        difficulty: "easy",
        hint: "Uses arrow syntax"
    },
    {
        id: 16,
        question: "What does 'NaN' stand for?",
        options: ["Not a Number", "Null and Null", "No Available Name", "None and Nothing"],
        correct: 0,
        category: "JavaScript",
        difficulty: "easy",
        hint: "Result of invalid mathematical operation"
    },
    {
        id: 17,
        question: "Which method is used to remove the last element from an array?",
        options: ["delete()", "remove()", "pop()", "cut()"],
        correct: 2,
        category: "JavaScript",
        difficulty: "easy",
        hint: "Opposite of push()"
    },
    {
        id: 18,
        question: "What is event bubbling in JavaScript?",
        options: ["Event travels up the DOM", "Event travels down the DOM", "Event stays at target", "Event gets cancelled"],
        correct: 0,
        category: "JavaScript",
        difficulty: "medium",
        hint: "Like bubbles rising up through water"
    },
    {
        id: 19,
        question: "What does 'use strict' do?",
        options: ["Enforces stricter parsing", "Increases speed", "Enables ES6", "Disables errors"],
        correct: 0,
        category: "JavaScript",
        difficulty: "medium",
        hint: "Catches common coding mistakes"
    },
    {
        id: 20,
        question: "What is the spread operator in JavaScript?",
        options: ["...", "***", "+++", "###"],
        correct: 0,
        category: "JavaScript",
        difficulty: "medium",
        hint: "Three dots that spread elements"
    },

    {
        id: 21,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management"],
        correct: 0,
        category: "Web Dev",
        difficulty: "easy",
        hint: "Structure of web pages"
    },
    {
        id: 22,
        question: "Which CSS property changes text color?",
        options: ["text-color", "color", "font-color", "text-style"],
        correct: 1,
        category: "Web Dev",
        difficulty: "easy",
        hint: "Simple and direct property name"
    },
    {
        id: 23,
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interaction", "App Protocol Implementation"],
        correct: 0,
        category: "Web Dev",
        difficulty: "easy",
        hint: "How software components communicate"
    },
    {
        id: 24,
        question: "Which HTTP method is used to send data to server?",
        options: ["GET", "POST", "DELETE", "UPDATE"],
        correct: 1,
        category: "Web Dev",
        difficulty: "medium",
        hint: "Think about posting a letter"
    },
    {
        id: 25,
        question: "What is the box model in CSS?",
        options: ["Content, Padding, Border, Margin", "Width, Height, Color", "Div, Span, Section", "HTML, CSS, JS"],
        correct: 0,
        category: "Web Dev",
        difficulty: "medium",
        hint: "Four layers around content"
    },
    {
        id: 26,
        question: "What is REST API?",
        options: ["Representational State Transfer", "Remote System Technology", "Real Estate Software Tool", "Rapid External Service"],
        correct: 0,
        category: "Web Dev",
        difficulty: "medium",
        hint: "Architectural style for web services"
    },
    {
        id: 27,
        question: "Which framework is used for building user interfaces?",
        options: ["Django", "React", "Laravel", "Spring"],
        correct: 1,
        category: "Web Dev",
        difficulty: "easy",
        hint: "Developed by Facebook/Meta"
    },
    {
        id: 28,
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Solution", "Central Style Server"],
        correct: 0,
        category: "Web Dev",
        difficulty: "easy",
        hint: "Styles cascade from parent to child"
    },
    {
        id: 29,
        question: "What is responsive web design?",
        options: ["Fast loading website", "Website adapts to screen size", "Website with animations", "Website with database"],
        correct: 1,
        category: "Web Dev",
        difficulty: "easy",
        hint: "Works on all devices"
    },
    {
        id: 30,
        question: "Which company developed Node.js?",
        options: ["Google", "Facebook", "Ryan Dahl (individual)", "Microsoft"],
        correct: 2,
        category: "Web Dev",
        difficulty: "medium",
        hint: "Created by an individual developer"
    },
    {
        id: 31,
        question: "What is the purpose of Git?",
        options: ["Design tool", "Version control", "Database", "Testing framework"],
        correct: 1,
        category: "Web Dev",
        difficulty: "easy",
        hint: "Tracks code changes over time"
    },
    {
        id: 32,
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Management", "Digital Output Method", "Dynamic Online Module"],
        correct: 0,
        category: "Web Dev",
        difficulty: "easy",
        hint: "Tree structure of HTML document"
    },
    {
        id: 33,
        question: "Which is NOT a CSS framework?",
        options: ["Bootstrap", "Tailwind", "React", "Bulma"],
        correct: 2,
        category: "Web Dev",
        difficulty: "easy",
        hint: "React is a JavaScript library"
    },
    {
        id: 34,
        question: "What is AJAX used for?",
        options: ["Styling", "Asynchronous requests", "Database queries", "Server setup"],
        correct: 1,
        category: "Web Dev",
        difficulty: "medium",
        hint: "Updates page without reload"
    },
    {
        id: 35,
        question: "Which HTTP status code means 'Not Found'?",
        options: ["200", "404", "500", "301"],
        correct: 1,
        category: "Web Dev",
        difficulty: "easy",
        hint: "Most famous error code"
    },
    {
        id: 36,
        question: "Who is known as the father of computer science?",
        options: ["Bill Gates", "Steve Jobs", "Alan Turing", "Tim Berners-Lee"],
        correct: 2,
        category: "Technology",
        difficulty: "medium",
        hint: "Created the Turing test"
    },
    {
        id: 37,
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Cyber Processing Unit"],
        correct: 0,
        category: "Technology",
        difficulty: "easy",
        hint: "Brain of the computer"
    },
    {
        id: 38,
        question: "Which company owns GitHub?",
        options: ["Google", "Facebook", "Microsoft", "Amazon"],
        correct: 2,
        category: "Technology",
        difficulty: "medium",
        hint: "Acquired in 2018"
    },
    {
        id: 39,
        question: "What is the full form of AI?",
        options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Automatic Interaction"],
        correct: 1,
        category: "Technology",
        difficulty: "easy",
        hint: "Simulates human intelligence"
    },
    {
        id: 40,
        question: "Which programming language is known for AI/ML?",
        options: ["JavaScript", "Python", "C++", "Ruby"],
        correct: 1,
        category: "Technology",
        difficulty: "easy",
        hint: "Named after a snake"
    },
    {
        id: 41,
        question: "What does URL stand for?",
        options: ["Uniform Resource Locator", "Universal Reference Link", "Unique Resource Language", "User Request Location"],
        correct: 0,
        category: "Technology",
        difficulty: "easy",
        hint: "Web address"
    },
    {
        id: 42,
        question: "Which company created ChatGPT?",
        options: ["Google", "OpenAI", "Microsoft", "Meta"],
        correct: 1,
        category: "Technology",
        difficulty: "easy",
        hint: "AI research company"
    },
    {
        id: 43,
        question: "What is cloud computing?",
        options: ["Weather prediction", "Internet-based computing", "Gaming platform", "Mobile app"],
        correct: 1,
        category: "Technology",
        difficulty: "easy",
        hint: "Computing resources over internet"
    },
    {
        id: 44,
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Rapid Action Mode", "Remote Access Module", "Read And Modify"],
        correct: 0,
        category: "Technology",
        difficulty: "easy",
        hint: "Temporary storage in computer"
    },
    {
        id: 45,
        question: "Which is the most used search engine?",
        options: ["Bing", "Yahoo", "Google", "DuckDuckGo"],
        correct: 2,
        category: "Technology",
        difficulty: "easy",
        hint: "Founded by Larry Page and Sergey Brin"
    },
    {
        id: 46,
        question: "What is blockchain technology used for?",
        options: ["Video editing", "Cryptocurrency", "Gaming", "Music production"],
        correct: 1,
        category: "Technology",
        difficulty: "medium",
        hint: "Bitcoin uses this technology"
    },
    {
        id: 47,
        question: "Which company makes the iPhone?",
        options: ["Samsung", "Google", "Apple", "Microsoft"],
        correct: 2,
        category: "Technology",
        difficulty: "easy",
        hint: "Founded by Steve Jobs"
    },
    {
        id: 48,
        question: "What does VPN stand for?",
        options: ["Virtual Private Network", "Very Private Network", "Visual Program Node", "Verified Public Network"],
        correct: 0,
        category: "Technology",
        difficulty: "easy",
        hint: "Secures internet connection"
    },
    {
        id: 49,
        question: "Which programming language runs in web browsers?",
        options: ["Python", "Java", "JavaScript", "C#"],
        correct: 2,
        category: "Technology",
        difficulty: "easy",
        hint: "Not to be confused with Java"
    },
    {
        id: 50,
        question: "What is the purpose of a firewall?",
        options: ["Cool computer", "Security protection", "Speed boost", "Data storage"],
        correct: 1,
        category: "Technology",
        difficulty: "easy",
        hint: "Blocks unauthorized access"
    }
];
function getQuestionsByCategory(category) {
    if (category === 'all') return quizQuestions;
    return quizQuestions.filter(q => q.category === category);
}
function getQuestionsByDifficulty(difficulty) {
    if (difficulty === 'all') return quizQuestions;
    return quizQuestions.filter(q => q.difficulty === difficulty);
}
function getRandomQuestions(count, category = 'all', difficulty = 'all') {
    let filtered = quizQuestions;
    
    if (category !== 'all') {
        filtered = filtered.filter(q => q.category === category);
    }
    
    if (difficulty !== 'all') {
        filtered = filtered.filter(q => q.difficulty === difficulty);
    }
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}