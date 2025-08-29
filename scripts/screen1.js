// Screen 1: Name Introduction Video Screen JavaScript

class NameIntroScreen {
    constructor() {
        this.video = null;
        this.videoOverlay = null;
        this.nameInputSection = null;
        this.micButton = null;
        this.nameTextInput = null;
        this.continueBtn = null;
        this.nameDisplay = null;
        this.studentName = null;
        this.loadingSection = null;
        this.recognition = null;
        this.studentNameValue = '';
        
        this.init();
    }

    init() {
        // Get DOM elements
        this.video = document.getElementById('introVideo');
        this.videoOverlay = document.getElementById('videoOverlay');
        this.nameInputSection = document.getElementById('nameInputSection');
        this.micButton = document.getElementById('micButton');
        this.nameTextInput = document.getElementById('nameTextInput');
        this.continueBtn = document.getElementById('continueBtn');
        this.nameDisplay = document.getElementById('nameDisplay');
        this.studentName = document.getElementById('studentName');
        this.loadingSection = document.getElementById('loadingSection');
        
        // Setup video
        this.setupVideo();
        
        // Setup voice recognition
        this.setupVoiceRecognition();
        
        // Add event listeners
        this.addEventListeners();
        
        // Set video source (you can change this to your video file)
        this.setVideoSource();
    }

    setVideoSource() {
        // Option 1: Local video file (place your video in a 'videos' folder)
        this.video.src = 'videos/intro-video.mp4';
        
        // Option 2: Hosted video URL
        // this.video.src = 'https://your-video-hosting-url.com/intro-video.mp4';
        
        // Option 3: YouTube embed (you'll need to modify the HTML for this)
        // For now, we'll use a placeholder
        //this.video.src = 'data:video/mp4;base64,PLACEHOLDER';
        
        // If you have a video file, uncomment one of the options above
        // and remove the placeholder line
    }

    setupVideo() {
        if (!this.video) {
            console.error('Video element not found!');
            return;
        }
        
        console.log('Setting up video with source:', this.video.src);
        
        // Video event listeners
        this.video.addEventListener('loadstart', () => {
            console.log('Video load started');
        });
        
        this.video.addEventListener('loadeddata', () => {
            console.log('Video data loaded');
        });
        
        this.video.addEventListener('canplay', () => {
            console.log('Video can play');
        });
        
        this.video.addEventListener('play', () => {
            console.log('Video started playing');
            if (this.videoOverlay) {
                this.videoOverlay.style.display = 'none';
            }
        });
        
        this.video.addEventListener('ended', () => {
            console.log('Video ended');
            this.showNameInput();
        });
        
        this.video.addEventListener('pause', () => {
            console.log('Video paused');
            if (!this.video.ended && this.videoOverlay) {
                this.videoOverlay.style.display = 'flex';
            }
        });
        
        this.video.addEventListener('error', (e) => {
            console.error('Video error:', e);
            console.error('Video error details:', this.video.error);
            this.showFeedback('Video failed to load. Please check the file path.', 'error');
        });
        
        // Video overlay click to play
        if (this.videoOverlay) {
            this.videoOverlay.addEventListener('click', () => {
                console.log('Video overlay clicked, attempting to play video');
                this.playVideo();
            });
        } else {
            console.error('Video overlay not found!');
        }
    }

    playVideo() {
        if (!this.video) {
            console.error('No video element to play');
            return;
        }
        
        console.log('Attempting to play video...');
        console.log('Video readyState:', this.video.readyState);
        console.log('Video networkState:', this.video.networkState);
        
        // Check if video is ready to play
        if (this.video.readyState >= 2) { // HAVE_CURRENT_DATA
            const playPromise = this.video.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Video playing successfully');
                    })
                    .catch(error => {
                        console.error('Error playing video:', error);
                        this.showFeedback('Could not play video. Please try again.', 'error');
                    });
            }
        } else {
            console.log('Video not ready, waiting for data...');
            this.video.addEventListener('canplay', () => {
                console.log('Video now ready, attempting to play...');
                this.video.play().catch(error => {
                    console.error('Error playing video after ready:', error);
                });
            }, { once: true });
        }
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = () => {
                this.micButton.classList.add('recording');
                this.micButton.querySelector('.mic-text').textContent = 'Listening... Speak now!';
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.handleVoiceInput(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.micButton.classList.remove('recording');
                this.micButton.querySelector('.mic-text').textContent = 'Click to speak your name';
                
                if (event.error === 'no-speech') {
                    this.showFeedback('No speech detected. Please try again!', 'error');
                } else if (event.error === 'audio-capture') {
                    this.showFeedback('Microphone not available. Please type your name instead.', 'error');
                } else {
                    this.showFeedback('Voice recognition error. Please try again or type your name.', 'error');
                }
            };

            this.recognition.onend = () => {
                this.micButton.classList.remove('recording');
                this.micButton.querySelector('.mic-text').textContent = 'Click to speak your name';
            };
        } else {
            // Fallback for browsers without speech recognition
            this.micButton.style.display = 'none';
            this.showFeedback('Voice input not supported in your browser. Please type your name.', 'info');
        }
    }

    addEventListeners() {
        // Mic button click
        if (this.micButton) {
            this.micButton.addEventListener('click', () => {
                if (this.recognition) {
                    this.recognition.start();
                }
            });
        }
        
        // Text input
        if (this.nameTextInput) {
            this.nameTextInput.addEventListener('input', (e) => {
                this.studentNameValue = e.target.value.trim();
                this.updateContinueButton();
            });
            
            this.nameTextInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && this.studentNameValue) {
                    this.handleNameSubmission();
                }
            });
        }
        
        // Continue button
        if (this.continueBtn) {
            this.continueBtn.addEventListener('click', () => {
                this.handleNameSubmission();
            });
        }
    }

    handleVoiceInput(transcript) {
        // Clean up the transcript
        this.studentNameValue = transcript.trim()
            .replace(/^my name is/i, '')
            .replace(/^i am/i, '')
            .replace(/^i'm/i, '')
            .replace(/^call me/i, '')
            .trim();
        
        // Capitalize first letter
        if (this.studentNameValue) {
            this.studentNameValue = this.studentNameValue.charAt(0).toUpperCase() + 
                                   this.studentNameValue.slice(1).toLowerCase();
        }
        
        // Update the text input
        if (this.nameTextInput) {
            this.nameTextInput.value = this.studentNameValue;
        }
        
        // Show the name and enable continue
        this.showStudentName();
        this.updateContinueButton();
        
        // Show success feedback
        this.showFeedback(`Great! I heard "${this.studentNameValue}"! 🎉`, 'success');
    }

    handleNameSubmission() {
        if (!this.studentNameValue) {
            this.showFeedback('Please enter your name to continue!', 'error');
            return;
        }
        
        // Store the name (you can use localStorage or pass it to the next screen)
        localStorage.setItem('studentName', this.studentNameValue);
        
        // Show loading
        this.showLoading();
        
        // Simulate loading time (you can remove this in production)
        setTimeout(() => {
            this.proceedToNextScreen();
        }, 1500);
    }

    showNameInput() {
        if (this.nameInputSection) {
            this.nameInputSection.style.display = 'block';
            
            // Add entrance animation
            this.nameInputSection.style.opacity = '0';
            this.nameInputSection.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                this.nameInputSection.style.transition = 'all 0.5s ease';
                this.nameInputSection.style.opacity = '1';
                this.nameInputSection.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    showStudentName() {
        if (this.nameDisplay && this.studentName) {
            this.studentName.textContent = this.studentNameValue;
            this.nameDisplay.style.display = 'block';
            
            // Add entrance animation
            this.nameDisplay.style.opacity = '0';
            this.nameDisplay.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                this.nameDisplay.style.transition = 'all 0.3s ease';
                this.nameDisplay.style.opacity = '1';
                this.nameDisplay.style.transform = 'scale(1)';
            }, 100);
        }
    }

    updateContinueButton() {
        if (this.continueBtn) {
            if (this.studentNameValue && this.studentNameValue.length > 0) {
                this.continueBtn.style.display = 'inline-block';
            } else {
                this.continueBtn.style.display = 'none';
            }
        }
    }

    showLoading() {
        if (this.loadingSection) {
            this.loadingSection.style.display = 'block';
            this.nameInputSection.style.display = 'none';
        }
    }

    proceedToNextScreen() {
        console.log('proceedToNextScreen called');
        console.log('window.app:', window.app);
        console.log('typeof window.app.loadScreenDirectly:', typeof window.app?.loadScreenDirectly);
        
        // Navigate to the next screen (dabba question)
        if (window.app && typeof window.app.loadScreenDirectly === 'function') {
            console.log('App found, scheduling navigation to Screen 2 in 1.5 seconds...');
            // Show loading for 1.5 seconds as requested
            setTimeout(() => {
                console.log('Timeout completed, calling loadScreenDirectly(2)...');
                try {
                    window.app.loadScreenDirectly(2);
                    console.log('loadScreenDirectly(2) called successfully');
                } catch (error) {
                    console.error('Error calling loadScreenDirectly:', error);
                }
            }, 1500);
        } else {
            console.error('App not found or loadScreenDirectly method not available');
            console.log('Waiting for app to be available...');
            
            // Wait for app to be available
            const waitForApp = setInterval(() => {
                if (window.app && typeof window.app.loadScreenDirectly === 'function') {
                    console.log('App now available, proceeding with navigation...');
                    clearInterval(waitForApp);
                    
                    // Show loading for 1.5 seconds as requested
                    setTimeout(() => {
                        console.log('Timeout completed, calling loadScreenDirectly(2)...');
                        try {
                            window.app.loadScreenDirectly(2);
                            console.log('loadScreenDirectly(2) called successfully');
                        } catch (error) {
                            console.error('Error calling loadScreenDirectly:', error);
                        }
                    }, 1500);
                }
            }, 100);
            
            // Fallback: if app doesn't become available within 10 seconds, show error
            setTimeout(() => {
                clearInterval(waitForApp);
                console.error('App not available after 10 seconds, showing error');
                this.showFeedback('Navigation failed. Please use the Next button.', 'error');
            }, 10000);
        }
    }

    showFeedback(message, type) {
        // Create a temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = `feedback-temp ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00b894' : type === 'error' ? '#e17055' : '#74b9ff'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-weight: bold;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        // Remove after 3 seconds
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 3000);
    }

    // Method to clean up when leaving screen
    destroy() {
        if (this.recognition) {
            this.recognition.abort();
        }
        
        // Remove any temporary feedback elements
        const tempFeedbacks = document.querySelectorAll('.feedback-temp');
        tempFeedbacks.forEach(feedback => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        });
    }
}

// Add CSS animations for feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NameIntroScreen;
}
