// Quiz Module JavaScript

class QuizManager {
    constructor() {
        console.log('QuizManager initialized!');
        this.currentQuestion = 1;
        this.totalQuestions = 5;
        this.answers = {};
        this.correctAnswers = {
            1: 'C', // c) 250 π cm³ - Correct
            2: 'B', // b) The water will fill exactly half the second tank - Correct
            3: 'D', // d) Diagonal face - Correct
            4: 439.6, // 439.6 cm² - Correct (input-based)
            5: 385    // 385 cm² - Correct (input-based)
        };
        this.questionTexts = {
            1: "Cylinder in a Cube",
            2: "Water Tank Transfer",
            3: "Surface Area Components",
            4: "Curved Surface Area Calculation",
            5: "Tin Can Surface Area"
        };
        // Store instance globally for debugging
        window.currentQuizManager = this;
        
        // Restore answers from localStorage if available
        this.restoreAnswersFromStorage();
        
        this.init();
        
        // Debug the initial state
        this.debugQuizState();
    }

    init() {
        this.setupEventListeners();
        this.startCountdown();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        // Answer button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-btn')) {
                console.log('Answer button clicked:', e.target.dataset.answer);
                this.handleAnswerClick(e.target);
            }
            
            // Submit answer button clicks (for input questions)
            if (e.target.classList.contains('submit-answer-btn')) {
                console.log('Submit button clicked for question:', e.target.dataset.question);
                this.handleInputAnswer(e.target);
            }
            
            // Results screen buttons
            if (e.target.id === 'reviewAnswersBtn') {
                this.reviewAnswers();
            }
            if (e.target.id === 'retakeQuizBtn') {
                this.retakeQuiz();
            }
            if (e.target.id === 'continueLearningBtn') {
                this.continueLearning();
            }
        });
        console.log('Event listeners set up successfully');
    }

    startCountdown() {
        console.log('Starting countdown timer...');
        const timerCount = document.getElementById('timerCount');
        const timerProgress = document.getElementById('timerProgress');
        
        if (!timerCount || !timerProgress) {
            console.error('Timer elements not found!', { timerCount, timerProgress });
            return;
        }
        
        console.log('Timer elements found, starting countdown...');
        let countdown = 5;
        const totalCircumference = 339.292; // 2 * π * 54
        
        // Initialize progress circle
        timerProgress.style.strokeDashoffset = totalCircumference;
        console.log('Progress circle initialized');
        
        const countdownInterval = setInterval(() => {
            countdown--;
            timerCount.textContent = countdown;
            console.log(`Countdown: ${countdown}`);
            
            // Update progress circle - fill it up as time decreases
            const progress = ((5 - countdown) / 5) * totalCircumference;
            timerProgress.style.strokeDashoffset = totalCircumference - progress;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                console.log('Countdown finished, starting quiz...');
                this.startQuiz();
            }
        }, 1000);
    }

    startQuiz() {
        console.log('Starting quiz, navigating to first question...');
        // Auto-navigate to first question
        if (window.app) {
            console.log('Window.app found, loading screen 10...');
            window.app.loadScreenDirectly(10);
        } else {
            console.error('Window.app not found!');
        }
    }

    handleAnswerClick(selectedButton) {
        const questionNumber = this.getCurrentQuestionNumber();
        const selectedAnswer = selectedButton.dataset.answer;
        
        console.log(`Question ${questionNumber} answered: ${selectedAnswer}`);
        console.log('QuizManager instance:', this);
        console.log('Answers before:', this.answers);
        
        // Clear previous selections
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select current answer
        selectedButton.classList.add('selected');
        
        // Store answer
        this.answers[questionNumber] = selectedAnswer;
        console.log('Answers after:', this.answers);
        console.log('Stored answer for question', questionNumber, ':', this.answers[questionNumber]);
        
        // Save to localStorage as backup
        this.saveAnswersToStorage();
        
        // Immediately navigate to next question (like real online exams)
        this.nextQuestion();
    }

    handleInputAnswer(submitButton) {
        const questionNumber = parseInt(submitButton.dataset.question);
        const inputElement = document.getElementById(`question${questionNumber}Input`);
        
        if (!inputElement || !inputElement.value.trim()) {
            alert('Please enter an answer before submitting.');
            return;
        }
        
        const inputValue = parseFloat(inputElement.value);
        if (isNaN(inputValue) || inputValue < 0) {
            alert('Please enter a valid positive number.');
            return;
        }
        
        console.log(`Question ${questionNumber} input answered: ${inputValue}`);
        console.log('QuizManager instance:', this);
        console.log('Answers before:', this.answers);
        
        // Store answer
        this.answers[questionNumber] = inputValue;
        console.log('Answers after:', this.answers);
        console.log('Stored answer for question', questionNumber, ':', this.answers[questionNumber]);
        
        // Save to localStorage as backup
        this.saveAnswersToStorage();
        
        // Disable input and button to prevent multiple submissions
        inputElement.disabled = true;
        submitButton.disabled = true;
        submitButton.textContent = 'Answer Submitted ✓';
        submitButton.style.background = '#4CAF50';
        
        // Navigate to next question after a brief moment
        setTimeout(() => {
            this.nextQuestion();
        }, 1000);
    }

    getCurrentQuestionNumber() {
        const questionNumberElement = document.querySelector('.question-number');
        if (questionNumberElement) {
            const text = questionNumberElement.textContent;
            const match = text.match(/Question (\d+) of \d+/);
            const questionNumber = match ? parseInt(match[1]) : 1;
            console.log(`Current question number: ${questionNumber}`);
            return questionNumber;
        }
        console.log('Question number element not found, defaulting to 1');
        return 1;
    }

    nextQuestion() {
        const currentQuestion = this.getCurrentQuestionNumber();
        console.log(`Moving from question ${currentQuestion} to next...`);
        console.log('Current answers stored:', this.answers);
        
        if (currentQuestion < this.totalQuestions) {
            // Go to next question
            console.log(`Going to question ${currentQuestion + 1}`);
            if (window.app) {
                // Add smooth transition animation
                const currentScreen = document.querySelector('.screen.active');
                if (currentScreen) {
                    currentScreen.classList.add('slide-out-left');
                    setTimeout(() => {
                        // Store the current quiz manager instance before navigation
                        window.currentQuizManager = this;
                        console.log('Storing QuizManager before navigation:', this);
                        console.log('Stored answers before navigation:', this.answers);
                        window.app.loadScreenDirectly(9 + currentQuestion + 1);
                    }, 300);
                } else {
                    // Store the current quiz manager instance before navigation
                    window.currentQuizManager = this;
                    console.log('Storing QuizManager before navigation:', this);
                    console.log('Stored answers before navigation:', this.answers);
                    window.app.loadScreenDirectly(9 + currentQuestion + 1);
                }
            } else {
                console.error('Window.app not found!');
            }
        } else {
            // Quiz complete - show results
            console.log('Quiz complete, showing results...');
            console.log('Final answers before results:', this.answers);
            if (window.app) {
                // Add smooth transition animation
                const currentScreen = document.querySelector('.screen.active');
                if (currentScreen) {
                    currentScreen.classList.add('slide-out-left');
                    setTimeout(() => {
                        // Store the current quiz manager instance before navigation
                        window.currentQuizManager = this;
                        console.log('Storing QuizManager before results:', this);
                        console.log('Final stored answers:', this.answers);
                        window.app.loadScreenDirectly(15);
                        this.showResults();
                    }, 300);
                } else {
                    // Store the current quiz manager instance before navigation
                    window.currentQuizManager = this;
                    console.log('Storing QuizManager before results:', this);
                    console.log('Final stored answers:', this.answers);
                    window.app.loadScreenDirectly(15);
                    this.showResults();
                }
            } else {
                console.error('Window.app not found!');
            }
        }
    }

    showResults() {
        const score = this.calculateScore();
        const scoreElement = document.getElementById('finalScore');
        const messageElement = document.getElementById('scoreMessage');
        const resultsElement = document.getElementById('questionResults');
        const strengthsElement = document.getElementById('strengthAreas');
        const improvementsElement = document.getElementById('improvementAreas');
        
        if (scoreElement) scoreElement.textContent = score;
        if (messageElement) messageElement.textContent = this.getScoreMessage(score);
        if (resultsElement) resultsElement.innerHTML = this.generateQuestionResults();
        if (strengthsElement) strengthsElement.innerHTML = this.generateStrengths();
        if (improvementsElement) improvementsElement.innerHTML = this.generateImprovements();
    }

    calculateScore() {
        console.log('Calculating score...');
        console.log('All answers:', this.answers);
        console.log('Correct answers:', this.correctAnswers);
        
        let correct = 0;
        for (let i = 1; i <= this.totalQuestions; i++) {
            const userAnswer = this.answers[i];
            const correctAnswer = this.correctAnswers[i];
            
            console.log(`Question ${i}: User answer: ${userAnswer}, Correct: ${correctAnswer}`);
            
            if (userAnswer === undefined) {
                console.log(`Question ${i}: No answer provided`);
                continue; // Skip unanswered questions
            }
            
            if (i <= 3) {
                // MCQ questions (1-3)
                if (userAnswer === correctAnswer) {
                    console.log(`Question ${i}: Correct!`);
                    correct++;
                } else {
                    console.log(`Question ${i}: Incorrect`);
                }
            } else {
                // Input-based questions (4-5) - allow some tolerance for rounding
                const tolerance = 0.1;
                if (Math.abs(userAnswer - correctAnswer) <= tolerance) {
                    console.log(`Question ${i}: Correct!`);
                    correct++;
                } else {
                    console.log(`Question ${i}: Incorrect`);
                }
            }
        }
        
        console.log(`Final score: ${correct}/${this.totalQuestions}`);
        return correct;
    }

    getScoreMessage(score) {
        if (score === 5) return "🎉 Perfect! You're a cylinder expert!";
        if (score === 4) return "🌟 Excellent! You really understand cylinders!";
        if (score === 3) return "👍 Good job! You have a solid foundation!";
        if (score === 2) return "📚 Not bad! Keep practicing!";
        if (score === 1) return "💪 You're getting there! Don't give up!";
        return "📖 Let's review the basics together!";
    }

    generateQuestionResults() {
        let html = '';
        for (let i = 1; i <= this.totalQuestions; i++) {
            const userAnswer = this.answers[i] || 'Not answered';
            const correctAnswer = this.correctAnswers[i];
            
            let isCorrect = false;
            if (i <= 3) {
                // MCQ questions
                isCorrect = userAnswer === correctAnswer;
            } else {
                // Input-based questions - allow tolerance
                const tolerance = 0.1;
                isCorrect = Math.abs(userAnswer - correctAnswer) <= tolerance;
            }
            
            const status = isCorrect ? '✅' : '❌';
            const color = isCorrect ? '#4CAF50' : '#f44336';
            
            html += `
                <div style="margin-bottom: 15px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <strong style="color: #FFD700;">Question ${i}: ${this.questionTexts[i]}</strong>
                        <span style="font-size: 1.5rem;">${status}</span>
                    </div>
                    <div style="color: #e0e0e0; font-size: 0.9rem;">
                        <div>Your answer: <span style="color: ${color};">${userAnswer}</span></div>
                        <div>Correct answer: <span style="color: #4CAF50;">${correctAnswer}</span></div>
                    </div>
                </div>
            `;
        }
        return html;
    }

    generateStrengths() {
        const strengths = [];
        for (let i = 1; i <= this.totalQuestions; i++) {
            let isCorrect = false;
            if (i <= 3) {
                // MCQ questions
                isCorrect = this.answers[i] === this.correctAnswers[i];
            } else {
                // Input-based questions - allow tolerance
                const tolerance = 0.1;
                isCorrect = Math.abs(this.answers[i] - this.correctAnswers[i]) <= tolerance;
            }
            
            if (isCorrect) {
                strengths.push(this.questionTexts[i]);
            }
        }
        
        if (strengths.length === 0) {
            return '<p style="color: #e0e0e0; font-style: italic;">Keep practicing to discover your strengths!</p>';
        }
        
        return strengths.map(strength => 
            `<div style="color: #4CAF50; margin-bottom: 8px;">✓ ${strength}</div>`
        ).join('');
    }

    generateImprovements() {
        const improvements = [];
        for (let i = 1; i <= this.totalQuestions; i++) {
            let isCorrect = false;
            if (i <= 3) {
                // MCQ questions
                isCorrect = this.answers[i] === this.correctAnswers[i];
            } else {
                // Input-based questions - allow tolerance
                const tolerance = 0.1;
                isCorrect = Math.abs(this.answers[i] - this.correctAnswers[i]) <= tolerance;
            }
            
            if (!isCorrect) {
                improvements.push(this.questionTexts[i]);
            }
        }
        
        if (improvements.length === 0) {
            return '<p style="color: #4CAF50; font-style: italic;">Perfect! No areas need improvement!</p>';
        }
        
        return improvements.map(improvement => 
            `<div style="color: #ff9800; margin-bottom: 8px;">📚 ${improvement}</div>`
        ).join('');
    }

    reviewAnswers() {
        // This could navigate to a detailed review screen
        alert('Review functionality will be implemented in the next version!');
    }

    retakeQuiz() {
        // Reset quiz state and start over
        this.answers = {};
        this.currentQuestion = 1;
        
        if (window.app) {
            window.app.loadScreenDirectly(9); // Back to quiz intro
        }
    }

    continueLearning() {
        // This could navigate to additional learning resources
        alert('Continue learning functionality will be implemented in the next version!');
    }
    
    // Debug method to check quiz state
    debugQuizState() {
        console.log('=== QUIZ DEBUG STATE ===');
        console.log('Current Question:', this.currentQuestion);
        console.log('Total Questions:', this.totalQuestions);
        console.log('All Answers:', this.answers);
        console.log('Correct Answers:', this.correctAnswers);
        console.log('Question Texts:', this.questionTexts);
        console.log('Quiz Manager Instance:', this);
        console.log('Global Quiz Manager:', window.currentQuizManager);
        console.log('========================');
    }
    
    // Method to restore answers from localStorage as backup
    restoreAnswersFromStorage() {
        const storedAnswers = localStorage.getItem('quizAnswers');
        if (storedAnswers) {
            try {
                const parsed = JSON.parse(storedAnswers);
                this.answers = { ...this.answers, ...parsed };
                console.log('Restored answers from storage:', this.answers);
            } catch (e) {
                console.error('Failed to parse stored answers:', e);
            }
        }
    }
    
    // Method to save answers to localStorage as backup
    saveAnswersToStorage() {
        localStorage.setItem('quizAnswers', JSON.stringify(this.answers));
        console.log('Saved answers to storage:', this.answers);
    }
}

// Initialize quiz when quiz screens are loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a quiz screen
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen && (currentScreen.id === 'screen9' || 
                         currentScreen.id.startsWith('screen1') || 
                         currentScreen.id === 'screen15')) {
        new QuizManager();
    }
});

// Also initialize when screen changes (for dynamic loading)
function initializeQuizForScreen(screenId) {
    console.log(`Initializing quiz for screen: ${screenId}`);
    if (screenId === 9 || 
        (screenId >= 10 && screenId <= 15)) {
        console.log('This is a quiz screen, checking QuizManager...');
        
        // Only create new QuizManager if one doesn't exist
        if (!window.currentQuizManager) {
            console.log('No QuizManager found, creating new one...');
            window.currentQuizManager = new QuizManager();
        } else {
            console.log('QuizManager already exists, reusing it...');
            // Update current question based on screen
            if (screenId === 9) {
                window.currentQuizManager.currentQuestion = 0; // Intro screen
            } else if (screenId >= 10 && screenId <= 14) {
                window.currentQuizManager.currentQuestion = screenId - 9;
            } else if (screenId === 15) {
                window.currentQuizManager.currentQuestion = 6; // Results screen
            }
            
            // Debug the current state
            window.currentQuizManager.debugQuizState();
        }
    } else {
        console.log('This is not a quiz screen');
    }
}

// Make it globally accessible
window.initializeQuizForScreen = initializeQuizForScreen;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizManager;
}
