let selectedCategory = 'all';
let selectedDifficulty = 'all';
let questionCount = 20;
let hintsEnabled = true;
let soundEnabled = true;
let bookmarkedQuestions = [];
let quizHistory = [];
let currentQuestions = [];
let startTime = 0;
let hintUsed = false;
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('quiz-theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('quiz-theme', theme);
});

document.getElementById('category-select').addEventListener('change', (e) => {
    selectedCategory = e.target.value;
});

document.getElementById('difficulty-select').addEventListener('change', (e) => {
    selectedDifficulty = e.target.value;
});

document.getElementById('question-count').addEventListener('change', (e) => {
    questionCount = parseInt(e.target.value);
});

document.getElementById('hints-enabled').addEventListener('change', (e) => {
    hintsEnabled = e.target.checked;
});

document.getElementById('sound-enabled').addEventListener('change', (e) => {
    soundEnabled = e.target.checked;
});
const originalStartQuiz = startQuiz;
startQuiz = function() {
    
    currentQuestions = getFilteredQuestions();
    
    if (currentQuestions.length === 0) {
        alert('No questions available for selected filters!');
        return;
    }
    
    
    if (questionCount > currentQuestions.length) {
        questionCount = currentQuestions.length;
    }
    
    currentQuestions = currentQuestions.slice(0, questionCount);
    
   
    timeLeft = questionCount * 30;
    
    startTime = Date.now();
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    bookmarkedQuestions = [];
    
    showSection('quiz-section');
    startTimer();
    showEnhancedQuestion();
    updateProgress();
};
function getFilteredQuestions() {
    let filtered = [...quizQuestions];
    
    if (selectedCategory !== 'all') {
        filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
        filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    
    // Shuffle questions
    return filtered.sort(() => 0.5 - Math.random());
}

// Enhanced Show Question
function showEnhancedQuestion() {
    if (currentQuestion >= currentQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = currentQuestions[currentQuestion];
    questionText.textContent = question.question;
    
    // Update badges
    document.getElementById('category-badge').textContent = question.category;
    const difficultyBadge = document.getElementById('difficulty-badge');
    difficultyBadge.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
    difficultyBadge.className = `difficulty-badge ${question.difficulty}`;
    
    // Clear previous
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    hintUsed = false;
    nextBtn.classList.add('hidden');
    document.getElementById('explanation-section').classList.add('hidden');
    
    // Show/hide hint section
    const hintSection = document.getElementById('hint-section');
    if (hintsEnabled) {
        hintSection.classList.remove('hidden');
        document.getElementById('show-hint-btn').disabled = false;
        document.getElementById('hint-text').classList.add('hidden');
    } else {
        hintSection.classList.add('hidden');
    }
    
    // Create options
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.addEventListener('click', () => selectEnhancedAnswer(index, button));
        optionsContainer.appendChild(button);
    });
    
    // Update counter
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${currentQuestions.length}`;
    
    // Update bookmark button
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkedQuestions.includes(currentQuestion)) {
        bookmarkBtn.classList.add('bookmarked');
    } else {
        bookmarkBtn.classList.remove('bookmarked');
    }
    
    // Show/hide navigation buttons
    document.getElementById('prev-btn').classList.toggle('hidden', currentQuestion === 0);
    
    // Animation
    document.querySelector('.question-container').style.animation = 'none';
    setTimeout(() => {
        document.querySelector('.question-container').style.animation = 'fadeInUp 0.5s ease';
    }, 10);
}

// Enhanced Answer Selection
function selectEnhancedAnswer(answerIndex, buttonElement) {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    buttonElement.classList.add('selected');
    selectedAnswer = answerIndex;
    userAnswers[currentQuestion] = answerIndex;
    
    const question = currentQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    if (isCorrect) {
        score++;
        playSound('correct');
        buttonElement.classList.add('sound-effect');
    } else {
        playSound('wrong');
        buttonElement.classList.add('sound-effect-wrong');
    }
    
    setTimeout(() => {
        showAnswerFeedback();
        showExplanation();
    }, 500);
    
    // Show next or submit button
    if (currentQuestion < currentQuestions.length - 1) {
        nextBtn.classList.remove('hidden');
    } else {
        document.getElementById('submit-quiz-btn').classList.remove('hidden');
    }
}

// Show Explanation
function showExplanation() {
    const explanationSection = document.getElementById('explanation-section');
    const explanationText = document.getElementById('explanation-text');
    const question = currentQuestions[currentQuestion];
    
    // Generate explanation based on correct answer
    const correctOption = question.options[question.correct];
    explanationText.textContent = `The correct answer is: ${correctOption}`;
    
    explanationSection.classList.remove('hidden');
}

// Hint System
document.getElementById('show-hint-btn').addEventListener('click', () => {
    const question = currentQuestions[currentQuestion];
    const hintText = document.getElementById('hint-text');
    hintText.textContent = question.hint || "No hint available for this question.";
    hintText.classList.remove('hidden');
    document.getElementById('show-hint-btn').disabled = true;
    hintUsed = true;
});

// Bookmark System
document.getElementById('bookmark-btn').addEventListener('click', () => {
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const index = bookmarkedQuestions.indexOf(currentQuestion);
    
    if (index > -1) {
        bookmarkedQuestions.splice(index, 1);
        bookmarkBtn.classList.remove('bookmarked');
    } else {
        bookmarkedQuestions.push(currentQuestion);
        bookmarkBtn.classList.add('bookmarked');
    }
});

// Previous Question
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateProgress();
        showEnhancedQuestion();
    }
});

// Submit Quiz
document.getElementById('submit-quiz-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to submit the quiz?')) {
        endQuiz();
    }
});

// Enhanced Results
const originalShowResults = showResults;
showResults = function() {
    showSection('results-section');
    
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const percentage = Math.round((score / currentQuestions.length) * 100);
    const wrongAnswers = currentQuestions.length - score;
    
    // Update basic stats
    document.getElementById('final-score').textContent = `${score}/${currentQuestions.length}`;
    document.getElementById('correct-answers').textContent = score;
    document.getElementById('wrong-answers').textContent = wrongAnswers;
    document.getElementById('percentage').textContent = `${percentage}%`;
    
    // Time taken
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    document.getElementById('time-taken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Message and emoji
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'Outstanding! You\'re a tech wizard! 🌟';
        emoji = '🏆';
    } else if (percentage >= 80) {
        message = 'Excellent work! Keep it up! 👏';
        emoji = '🎉';
    } else if (percentage >= 70) {
        message = 'Good job! You\'re getting there! 👍';
        emoji = '😊';
    } else if (percentage >= 60) {
        message = 'Not bad! Room for improvement! 💪';
        emoji = '🤔';
    } else {
        message = 'Keep learning! Practice makes perfect! 📚';
        emoji = '😅';
    }
    
    document.getElementById('score-message').textContent = message;
    document.getElementById('result-emoji').textContent = emoji;
    
    // Category breakdown
    showCategoryBreakdown();
    
    // Bookmarked questions
    showBookmarkedQuestions();
    
    // Save to history
    saveToHistory(percentage, timeTaken);
};

// Category Breakdown
function showCategoryBreakdown() {
    const categoryStats = {};
    
    currentQuestions.forEach((q, index) => {
        if (!categoryStats[q.category]) {
            categoryStats[q.category] = { correct: 0, total: 0 };
        }
        categoryStats[q.category].total++;
        if (userAnswers[index] === q.correct) {
            categoryStats[q.category].correct++;
        }
    });
    
    const container = document.getElementById('category-stats');
    container.innerHTML = '';
    
    Object.keys(categoryStats).forEach(category => {
        const stat = categoryStats[category];
        const percentage = Math.round((stat.correct / stat.total) * 100);
        
        const item = document.createElement('div');
        item.className = 'category-stat-item';
        item.innerHTML = `
            <strong>${category}</strong>
            <span>${stat.correct}/${stat.total} (${percentage}%)</span>
        `;
        container.appendChild(item);
    });
}

// Show Bookmarked Questions
function showBookmarkedQuestions() {
    if (bookmarkedQuestions.length === 0) {
        document.getElementById('bookmarked-questions').classList.add('hidden');
        return;
    }
    
    document.getElementById('bookmarked-questions').classList.remove('hidden');
    const container = document.getElementById('bookmarked-list');
    container.innerHTML = '';
    
    bookmarkedQuestions.forEach(index => {
        const question = currentQuestions[index];
        const item = document.createElement('div');
        item.className = 'bookmarked-item';
        item.innerHTML = `
            <strong>Q${index + 1}:</strong> ${question.question}
        `;
        container.appendChild(item);
    });
}

// Save to History
function saveToHistory(percentage, timeTaken) {
    const historyItem = {
        date: new Date().toLocaleString(),
        score: score,
        total: currentQuestions.length,
        percentage: percentage,
        timeTaken: timeTaken,
        category: selectedCategory,
        difficulty: selectedDifficulty
    };
    
    quizHistory.unshift(historyItem);
    if (quizHistory.length > 10) {
        quizHistory = quizHistory.slice(0, 10);
    }
    
    localStorage.setItem('quiz-history', JSON.stringify(quizHistory));
}

// Load History
function loadHistory() {
    const saved = localStorage.getItem('quiz-history');
    if (saved) {
        quizHistory = JSON.parse(saved);
    }
}

// Show History
function showHistory() {
    showSection('history');
    const container = document.getElementById('history-container');
    
    if (quizHistory.length === 0) {
        container.innerHTML = '<p class="no-history">No quiz history yet. Start a quiz to see your progress!</p>';
        return;
    }
    
    container.innerHTML = '';
    quizHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-item-header">
                <span class="history-date">${item.date}</span>
                <span class="history-score">${item.score}/${item.total}</span>
            </div>
            <p><strong>Category:</strong> ${item.category} | <strong>Difficulty:</strong> ${item.difficulty}</p>
            <p><strong>Score:</strong> ${item.percentage}% | <strong>Time:</strong> ${Math.floor(item.timeTaken / 60)}:${(item.timeTaken % 60).toString().padStart(2, '0')}</p>
        `;
        container.appendChild(div);
    });
}
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        if (targetId === 'history') {
            showHistory();
        }
    });
});
function playSound(type) {
    if (!soundEnabled) return;
    
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    } else {
        oscillator.frequency.value = 200;
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}


document.getElementById('review-btn').addEventListener('click', () => {
    alert('Review feature coming soon!');
});
loadHistory();
showQuestion = showEnhancedQuestion;
selectAnswer = selectEnhancedAnswer;