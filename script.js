let currentQuestion = 0;
let score = 0;
let timeLeft = 1200; 
let timer;
let quizStarted = false;
let selectedAnswer = null;
let userAnswers = [];


const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');

const homepage = document.getElementById('homepage');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');


document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
homeBtn.addEventListener('click', goHome);


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        if (targetId === 'homepage') {
            goHome();
        } else if (targetId === 'quiz-section' && !quizStarted) {
            startQuiz();
        } else if (targetId === 'results-section' && quizStarted) {
            
            return;
        }
    });
});


function initializeQuiz() {
    showSection('homepage');
    resetQuizData();
}


function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    timeLeft = 1200; 
    
    showSection('quiz-section');
    startTimer();
    showQuestion();
    updateProgress();
}


function startTimer() {
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        
        if (timeLeft <= 300) {
            timerDisplay.classList.add('warning');
        }
        
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerHTML = `â±ï¸ ${minutes}:${seconds.toString().padStart(2, '0')}`;
}


function showQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    questionText.textContent = question.question;
    
    
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    nextBtn.classList.add('hidden');
    
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
    
    
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    
    
    document.querySelector('.question-container').style.animation = 'none';
    setTimeout(() => {
        document.querySelector('.question-container').style.animation = 'fadeInUp 0.5s ease';
    }, 10);
}


function selectAnswer(answerIndex, buttonElement) {
   
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    
    buttonElement.classList.add('selected');
    selectedAnswer = answerIndex;
    
    
    userAnswers[currentQuestion] = answerIndex;
    
    
    nextBtn.classList.remove('hidden');
    
    
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correct;
    if (isCorrect) {
        score++;
    }
    
   
    setTimeout(() => {
        showAnswerFeedback();
    }, 500);
}


function showAnswerFeedback() {
    const question = quizQuestions[currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach((button, index) => {
        if (index === question.correct) {
            button.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correct) {
            button.classList.add('incorrect');
        }
        
       
        button.disabled = true;
    });
}


function nextQuestion() {
    currentQuestion++;
    updateProgress();
    
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}


function updateProgress() {
    const progress = (currentQuestion / quizQuestions.length) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
    
    
    const style = document.createElement('style');
    style.textContent = `
        .progress-bar::after {
            width: ${progress}%;
        }
    `;
    document.head.appendChild(style);
}


function endQuiz() {
    clearInterval(timer);
    quizStarted = false;
    showResults();
}


function showResults() {
    showSection('results-section');
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const wrongAnswers = quizQuestions.length - score;
    
   
    document.getElementById('final-score').textContent = `${score}/${quizQuestions.length}`;
    document.getElementById('correct-answers').textContent = score;
    document.getElementById('wrong-answers').textContent = wrongAnswers;
    document.getElementById('percentage').textContent = `${percentage}%`;
    
    
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'Excellent! You\'re a quiz master! ðŸŒŸ';
        emoji = 'ðŸ†';
    } else if (percentage >= 80) {
        message = 'Great job! You did really well! ðŸ‘';
        emoji = 'ðŸŽ‰';
    } else if (percentage >= 70) {
        message = 'Good work! Keep it up! ðŸ‘';
        emoji = 'ðŸ˜Š';
    } else if (percentage >= 60) {
        message = 'Not bad! There\'s room for improvement! ðŸ’ª';
        emoji = 'ðŸ¤”';
    } else {
        message = 'Keep practicing! You\'ll do better next time! ðŸ“š';
        emoji = 'ðŸ˜…';
    }
    
    document.getElementById('score-message').textContent = message;
    document.getElementById('result-emoji').textContent = emoji;
}


function restartQuiz() {
    resetQuizData();
    startQuiz();
}


function goHome() {
    if (timer) {
        clearInterval(timer);
    }
    resetQuizData();
    showSection('homepage');
}


function resetQuizData() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 1200;
    quizStarted = false;
    selectedAnswer = null;
    userAnswers = [];
    
    if (timer) {
        clearInterval(timer);
    }
    
    
    timerDisplay.classList.remove('warning');
    timerDisplay.innerHTML = 'â±ï¸ 20:00';
    
   
    progressBar.style.setProperty('--progress', '0%');
    
    
    nextBtn.classList.add('hidden');
}


function showSection(sectionId) {
    
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    
    document.getElementById(sectionId).classList.remove('hidden');
}


document.addEventListener('keydown', function(e) {
    if (!quizStarted || currentQuestion >= quizQuestions.length) return;
    
    
    if (e.key >= '1' && e.key <= '4') {
        const answerIndex = parseInt(e.key) - 1;
        const buttons = document.querySelectorAll('.option-btn');
        if (buttons[answerIndex] && !buttons[answerIndex].disabled) {
            selectAnswer(answerIndex, buttons[answerIndex]);
        }
    }
    
   
    if (e.key === 'Enter' && !nextBtn.classList.contains('hidden')) {
        nextQuestion();
    }
    
    
    if (e.key === 'Escape') {
        if (confirm('Are you sure you want to quit the quiz?')) {
            goHome();
        }
    }
});


window.addEventListener('beforeunload', function(e) {
    if (quizStarted && currentQuestion < quizQuestions.length) {
        e.preventDefault();
        e.returnValue = 'Your quiz progress will be lost. Are you sure you want to leave?';
        return e.returnValue;
    }
});


function saveProgress() {
    if (quizStarted) {
        const progress = {
            currentQuestion,
            score,
            timeLeft,
            userAnswers
        };
        localStorage.setItem('quizProgress', JSON.stringify(progress));
    }
}


function loadProgress() {
    const saved = localStorage.getItem('quizProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        return progress;
    }
    return null;
}


function preloadNextQuestion() {
    if (currentQuestion + 1 < quizQuestions.length) {
        
    }
}


function smoothScrollTo(element) {
    element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

