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
            
            // Activate the overlay when loading section becomes visible
            const overlay = document.getElementById('botOverlay');
            if (overlay) {
                overlay.classList.add('active');
            }
        }
    }

    proceedToNextScreen() {
        console.log('proceedToNextScreen called');
        console.log('window.app:', window.app);
        console.log('typeof window.app.loadScreenDirectly:', typeof window.app?.loadScreenDirectly);
        
        // Start bot introduction sequence
        this.startBotIntroduction();
        
        // Navigation is now handled dynamically when bot introduction completes
        // No need for fixed timeout - the bot will trigger navigation when done
    }

    startBotIntroduction() {
        const bot = document.getElementById('aiCompanion');
        if (!bot) return;
        
        // Show bot and add introduction class
        bot.style.opacity = '1';
        bot.classList.add('introducing');
        
        // Update bot message with student's name
        const studentName = localStorage.getItem('studentName') || 'there';
        const botStatus = bot.querySelector('.bot-status');
        if (botStatus) {
            botStatus.textContent = `Hey ${studentName}, I will be your personal companion throughout this learning journey! 🤖`;
        }
        
        // Sure-shot animation sequence with exact positioning
        // Step 1: Position at center and appear
        gsap.set(bot, {
            bottom: '50%',
            right: '50%',
            transform: 'translate(50%, 50%)',
            scale: 0,
            opacity: 0
        });
        
        // Step 2: Scale up at center
        gsap.to(bot, {
            duration: 0.8,
            scale: 1.3,
            opacity: 1,
            ease: "back.out(1.7)",
            onComplete: () => {
                // Bot is now visible at center - start reading the message
                this.readBotMessage(studentName);
            }
        });
    }
    
    readBotMessage(studentName) {
        const message = `Hey ${studentName}, I will be your personal companion throughout this learning journey!`;
        
        // Try to play custom audio file first (if available)
        const customAudio = new Audio('audio/bot-introduction.mp3'); // Placeholder path
        
        customAudio.addEventListener('canplaythrough', () => {
            // Custom audio is available - play it
            customAudio.play();
            
            // Start transition when audio ends
            customAudio.addEventListener('ended', () => {
                this.startBotTransition();
            });
            
            // Fallback: if audio fails, use text-to-speech
            customAudio.addEventListener('error', () => {
                console.log('Custom audio failed, using text-to-speech fallback');
                this.useTextToSpeechFallback(message);
            });
        });
        
        customAudio.addEventListener('error', () => {
            // Custom audio not available - use text-to-speech fallback
            console.log('Custom audio not found, using text-to-speech fallback');
            this.useTextToSpeechFallback(message);
        });
    }
    
    useTextToSpeechFallback(message) {
        // Fallback: Use browser's text-to-speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            utterance.volume = 0.8;
            
            // Start transition when speech ends
            utterance.onend = () => {
                this.startBotTransition();
            };
            
            speechSynthesis.speak(utterance);
        } else {
            // No text-to-speech available - wait 3 seconds then transition
            console.log('No text-to-speech available, waiting 3 seconds');
            setTimeout(() => {
                this.startBotTransition();
            }, 3000);
        }
    }
    
    startBotTransition() {
        const bot = document.getElementById('aiCompanion');
        const overlay = document.getElementById('botOverlay');
        if (!bot || !overlay) return;
        
        // Remove the overlay when bot starts moving
        overlay.classList.remove('active');
        
        // Step 3: Move to final position with snap to exact coordinates
        gsap.to(bot, {
            duration: 2.5,
            bottom: '30px',
            right: '135px',
            scale: 1,
            ease: "power2.inOut",
            snap: {
                bottom: 1,  // Snap to exact pixel values
                right: 1
            },
            onComplete: () => {
                // Final cleanup
                bot.classList.remove('introducing');
                const botStatus = bot.querySelector('.bot-status');
                if (botStatus) {
                    botStatus.textContent = 'Ready to help! 🤖';
                }
                
                // Force exact final position - no rounding errors
                bot.style.position = 'fixed';
                bot.style.bottom = '30px';
                bot.style.right = '135px';
                bot.style.opacity = '1';
                bot.style.transform = 'none';
                bot.style.transition = 'opacity 0.3s ease';
                
                // Double-check position with getBoundingClientRect
                const rect = bot.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                const actualRight = windowWidth - rect.right;
                
                console.log('Bot final position check:');
                console.log('Target right:', 135);
                console.log('Actual right:', Math.round(actualRight));
                console.log('Target bottom:', 30);
                console.log('Actual bottom:', Math.round(rect.bottom));
                
                // If still off, force it one more time
                if (Math.abs(actualRight - 135) > 1 || Math.abs(rect.bottom - 30) > 1) {
                    console.log('Position correction needed, forcing exact position...');
                    bot.style.right = '135px';
                    bot.style.bottom = '30px';
                }
                
                // Bot introduction complete - wait 1 second then navigate to next screen
                setTimeout(() => {
                    this.navigateToNextScreen();
                }, 1000);
            }
        });
    }
    
    navigateToNextScreen() {
        console.log('Bot introduction complete, navigating to Screen 2...');
        if (window.app && typeof window.app.loadScreenDirectly === 'function') {
            try {
                window.app.loadScreenDirectly(2);
                console.log('loadScreenDirectly(2) called successfully');
            } catch (error) {
                console.error('Error calling loadScreenDirectly:', error);
            }
        } else {
            console.error('App not found or loadScreenDirectly method not available');
            // Fallback: show error message
            this.showFeedback('Navigation failed. Please use the Next button.', 'error');
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
