// Authentication and Theme Management

// User Data
let currentUser = null;

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const signinBtn = document.getElementById('signin-btn');
const signinModal = document.getElementById('signin-modal');
const closeModal = document.querySelector('.close-modal');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const showSignup = document.getElementById('show-signup');
const showSignin = document.getElementById('show-signin');

const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const userProfile = document.getElementById('user-profile');

// ======================
// THEME MANAGEMENT
// ======================

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('quiz-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    } else {
        themeToggle.querySelector('.theme-icon').textContent = '🌙';
    }
}

// Toggle Theme
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Update icon
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('quiz-theme', isDark ? 'dark' : 'light');
    
    // Animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ======================
// AUTHENTICATION
// ======================

// Load User Session
function loadUserSession() {
    const savedUser = localStorage.getItem('quiz-user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
    if (currentUser) {
        signinBtn.textContent = `👤 ${currentUser.username}`;
        signinBtn.classList.add('logged-in');
    } else {
        signinBtn.textContent = '👤 Sign In';
        signinBtn.classList.remove('logged-in');
    }
}

// Open Modal
signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (currentUser) {
        // Show profile if logged in
        showProfileView();
    } else {
        // Show signin form
        showSigninView();
    }
    
    signinModal.classList.remove('hidden');
});

// Close Modal
closeModal.addEventListener('click', () => {
    signinModal.classList.add('hidden');
});

// Close on outside click
signinModal.addEventListener('click', (e) => {
    if (e.target === signinModal) {
        signinModal.classList.add('hidden');
    }
});

// Switch to Signup
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signinForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

// Switch to Signin
showSignin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    signinForm.classList.remove('hidden');
});

// View Functions
function showSigninView() {
    signinForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    userProfile.classList.add('hidden');
}

function showProfileView() {
    signinForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    userProfile.classList.remove('hidden');
    updateProfileDisplay();
}

// Login Handler
loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please enter both username and password!');
        return;
    }
    
    // Get stored users
    const users = JSON.parse(localStorage.getItem('quiz-users') || '{}');
    
    // Check if user exists
    if (users[username] && users[username].password === password) {
        currentUser = {
            username: username,
            email: users[username].email,
            quizzes: users[username].quizzes || []
        };
        
        localStorage.setItem('quiz-user', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        
        // Show success message
        alert(`Welcome back, ${username}! 🎉`);
        signinModal.classList.add('hidden');
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        alert('Invalid username or password! 😞');
    }
});

// Signup Handler
signupBtn.addEventListener('click', () => {
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    
    // Validation
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields!');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('quiz-users') || '{}');
    
    // Check if username already exists
    if (users[username]) {
        alert('Username already exists! Please choose another one.');
        return;
    }
    
    // Create new user
    users[username] = {
        email: email,
        password: password,
        quizzes: [],
        createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('quiz-users', JSON.stringify(users));
    
    // Auto login
    currentUser = {
        username: username,
        email: email,
        quizzes: []
    };
    
    localStorage.setItem('quiz-user', JSON.stringify(currentUser));
    updateUIForLoggedInUser();
    
    // Show success
    alert(`Account created successfully! Welcome ${username}! 🎉`);
    signinModal.classList.add('hidden');
    
    // Clear form
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-confirm').value = '';
});

// Logout Handler
logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('quiz-user');
        updateUIForLoggedInUser();
        signinModal.classList.add('hidden');
        alert('Logged out successfully! 👋');
    }
});

// Update Profile Display
function updateProfileDisplay() {
    if (!currentUser) return;
    
    document.getElementById('profile-username').textContent = currentUser.username;
    document.getElementById('profile-email').textContent = currentUser.email;
    
    // Calculate stats
    const quizzes = currentUser.quizzes || [];
    document.getElementById('total-quizzes').textContent = quizzes.length;
    
    if (quizzes.length > 0) {
        const avgScore = quizzes.reduce((sum, quiz) => sum + quiz.percentage, 0) / quizzes.length;
        document.getElementById('avg-score').textContent = Math.round(avgScore) + '%';
    } else {
        document.getElementById('avg-score').textContent = '0%';
    }
}

// Save Quiz Result to User Profile
function saveQuizToProfile(quizData) {
    if (!currentUser) return;
    
    // Add quiz to user's history
    if (!currentUser.quizzes) {
        currentUser.quizzes = [];
    }
    
    currentUser.quizzes.push({
        date: new Date().toISOString(),
        score: quizData.score,
        total: quizData.total,
        percentage: quizData.percentage,
        category: quizData.category,
        difficulty: quizData.difficulty
    });
    
    // Keep only last 20 quizzes
    if (currentUser.quizzes.length > 20) {
        currentUser.quizzes = currentUser.quizzes.slice(-20);
    }
    
    // Update localStorage
    localStorage.setItem('quiz-user', JSON.stringify(currentUser));
    
    // Update users database
    const users = JSON.parse(localStorage.getItem('quiz-users') || '{}');
    if (users[currentUser.username]) {
        users[currentUser.username].quizzes = currentUser.quizzes;
        localStorage.setItem('quiz-users', JSON.stringify(users));
    }
}

// Export function for use in other scripts
window.saveQuizToProfile = saveQuizToProfile;

// Initialize
loadTheme();
loadUserSession();

// Keyboard shortcut for theme toggle (Ctrl/Cmd + K)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
});