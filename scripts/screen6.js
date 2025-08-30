// Screen 6: Adaptive Check

class CylinderAdaptiveCheckScreen {
    constructor() {
        this.state = {
            q1Attempts: 0,
            q1Done: false,
            q2Done: false,
            weakSpots: JSON.parse(localStorage.getItem('weakSpots') || '[]'),
        };
        this.init();
    }

    init() {
        // Q1 elements
        this.q1Input = document.getElementById('q1Input');
        this.q1Submit = document.getElementById('q1Submit');
        this.q1Feedback = document.getElementById('q1Feedback');
        this.q1Notice = document.getElementById('q1Notice');
        this.q1Hint = document.getElementById('q1Hint');
        this.q1TryAgain = document.getElementById('q1TryAgain');

        // Q2 elements
        this.q2Options = document.querySelectorAll('[name="q2"]');
        this.q2Submit = document.getElementById('q2Submit');
        this.q2Feedback = document.getElementById('q2Feedback');
        // Removed individual surface chips UI; use only visual help block
        this.surfaceSide = { classList: { add() {}, remove() {} } };
        this.surfaceTop = { classList: { add() {}, remove() {} } };
        this.surfaceBottom = { classList: { add() {}, remove() {} } };
        this.q2Alert = document.getElementById('q2Alert');
        this.q2Viz = document.getElementById('q2Viz');
        this.q2TryAgain = document.getElementById('q2TryAgain');

        // CTA
        this.deeperBtn = document.getElementById('goDeeper');
        this.aheadBtn = document.getElementById('moveAhead');

        // Popup elements
        this.solveTogetherPopup = document.getElementById('solveTogetherPopup');
        this.solvePopupCloseBtn = document.getElementById('solvePopupCloseBtn');
        this.continueAfterSolve = document.getElementById('continueAfterSolve');

        // Wire
        if (this.q1Submit) this.q1Submit.addEventListener('click', () => this.handleQ1());
        if (this.q1TryAgain) this.q1TryAgain.addEventListener('click', () => {
            this.q1Input.focus();
        });
        if (this.q2Submit) this.q2Submit.addEventListener('click', () => this.handleQ2());
        if (this.q2TryAgain) this.q2TryAgain.addEventListener('click', () => this.resetQ2Help());
        if (this.deeperBtn) this.deeperBtn.addEventListener('click', () => this.goDeeper());
        if (this.aheadBtn) this.aheadBtn.addEventListener('click', () => this.moveAhead());
        
        // Popup event handlers
        if (this.solvePopupCloseBtn) this.solvePopupCloseBtn.addEventListener('click', () => this.hideSolveTogetherPopup());
        if (this.continueAfterSolve) this.continueAfterSolve.addEventListener('click', () => this.hideSolveTogetherPopup());
    }

    handleQ1() {
        const pi = Math.PI;
        // Base question: r=7, h=10, CSA = 2πrh
        const correct = 2 * pi * 7 * 10; // ≈ 439.82 cm^2
        const val = parseFloat(this.q1Input.value);
        if (Number.isNaN(val)) {
            this.setQ1Feedback('Please enter a number (in cm²).', 'bad');
            return;
        }

        if (Math.abs(val - correct) < 0.5) {
            this.setQ1Feedback('Great job! ✅', 'good');
            this.state.q1Done = true;
            this.offerNextOrDeeper();
            return;
        }

        this.state.q1Attempts += 1;
        if (this.state.q1Attempts === 1) {
            // First wrong: bot flies to hint container, speaks, then returns
            this.setQ1Feedback('', 'bad');
            this.q1Notice.style.display = 'block';
            this.q1Hint.style.display = 'block';
            this.showBotHintInteraction();
        } else if (this.state.q1Attempts === 2) {
            // Second wrong: show popup to solve together
            this.q1Notice.style.display = 'none';
            this.q1Hint.style.display = 'none';
            this.showSolveTogetherPopup();
        } else {
            // Multiple wrongs
            this.setQ1Feedback('We will revisit this later. Moving on for now.', 'bad');
            this.logWeakSpot('cylinder_csa');
        }
    }

    handleQ2() {
        let selected = null;
        this.q2Options.forEach(opt => { if (opt.checked) selected = opt.value; });
        if (!selected) {
            this.setQ2Feedback('Please choose an option.', 'bad');
            return;
        }
        // Correct: side + top + bottom
        if (selected === 'side-top-bottom') {
            this.setQ2Feedback('Correct! TSA includes side + top + bottom. ✅', 'good');
            this.clearHighlights();
            this.state.q2Done = true;
            this.offerNextOrDeeper();
            return;
        }
        // Wrong choices -> highlight missing parts
        this.clearHighlights();
        if (selected === 'side-only') {
            this.setQ2Feedback('', 'bad');
            this.q2Alert.style.display = 'block';
            this.q2Viz.style.display = 'block';
            this.surfaceTop.classList.add('highlight');
            this.surfaceBottom.classList.add('highlight');
        } else if (selected === 'top-bottom-only') {
            this.setQ2Feedback('', 'bad');
            this.q2Alert.style.display = 'block';
            this.q2Viz.style.display = 'block';
            this.surfaceSide.classList.add('highlight');
        }
        this.logWeakSpot('cylinder_tsa_concept');
    }

    setQ1Feedback(msg, type) {
        this.q1Feedback.textContent = msg;
        this.q1Feedback.className = `feedback ${type}`;
    }

    setQ2Feedback(msg, type) {
        this.q2Feedback.textContent = msg;
        this.q2Feedback.className = `feedback ${type}`;
    }

    clearHighlights() {
        [this.surfaceSide, this.surfaceTop, this.surfaceBottom].forEach(el => el.classList.remove('highlight'));
        this.resetQ2Help();
    }

    resetQ2Help() {
        if (this.q2Alert) this.q2Alert.style.display = 'none';
        if (this.q2Viz) this.q2Viz.style.display = 'none';
    }

    offerNextOrDeeper() {
        if (this.state.q1Done && this.state.q2Done) {
            const name = localStorage.getItem('studentName') || 'superstar';
            this.q2Feedback.textContent = `Awesome, ${name}! Choose your path: Go Deeper or Move Ahead.`;
            this.q2Feedback.className = 'feedback good';
            document.getElementById('ctaRow').style.display = 'flex';
        }
    }

    goDeeper() {
        // Challenge problem could be another screen; for now just log and nudge
        alert('Challenge coming up next!');
    }

    moveAhead() {
        if (window.app && typeof window.app.loadScreenDirectly === 'function') {
            window.app.loadScreenDirectly(7); // placeholder next
        }
    }

    logWeakSpot(key) {
        if (!this.state.weakSpots.includes(key)) {
            this.state.weakSpots.push(key);
            localStorage.setItem('weakSpots', JSON.stringify(this.state.weakSpots));
        }
    }
    
    showBotHintInteraction() {
        // Get the AI companion bot
        const aiCompanion = document.getElementById('aiCompanion');
        
        if (!aiCompanion) {
            console.error('AI companion not found');
            return;
        }
        
        // Step 1: Bot flies to hint container area
        aiCompanion.classList.add('flying-to-hint');
        aiCompanion.querySelector('.bot-status').textContent = "Let me give you a hint! 🤖";
        
        // Step 2: Play hint audio
        this.playHintAudio();
        
        // Step 3: After speaking, bot flies back to original position
        setTimeout(() => {
            aiCompanion.classList.remove('flying-to-hint');
            aiCompanion.classList.add('returning-to-position');
            
            setTimeout(() => {
                aiCompanion.classList.remove('returning-to-position');
                aiCompanion.querySelector('.bot-status').textContent = "Ready to help! 🤖";
            }, 1000); // Return animation duration
        }, 2000); // Wait for hint audio to finish
    }
    
    showSolveTogetherPopup() {
        // Get the AI companion bot
        const aiCompanion = document.getElementById('aiCompanion');
        const popupBot = document.getElementById('popupBot');
        
        if (!aiCompanion) {
            console.error('AI companion not found');
            return;
        }
        
        // Step 1: Bot flies to center of screen
        aiCompanion.classList.add('flying');
        aiCompanion.querySelector('.bot-status').textContent = "Let me help here! 🤖";
        
        // Step 2: Play audio (placeholder for now)
        this.playBotAudio();
        
        // Step 3: After flying animation, show popup with bot
        setTimeout(() => {
            // Hide the flying bot
            aiCompanion.style.display = 'none';
            
            // Show popup with bot inside
            if (this.solveTogetherPopup) {
                this.solveTogetherPopup.style.display = 'flex';
                console.log('Showing solve together popup with AI companion');
            }
        }, 2000); // Wait for 2-second simple flying animation
    }
    
    playHintAudio() {
        // Placeholder for audio - you can add actual audio file later
        console.log('Playing bot hint audio: "Hey there, let me give you a hint."');
        
        // For now, we'll use speech synthesis as a fallback
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance("Hey there, let me give you a hint.");
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        }
    }
    
    playBotAudio() {
        // Placeholder for audio - you can add actual audio file later
        console.log('Playing bot audio: "Let me help here!"');
        
        // For now, we'll use speech synthesis as a fallback
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance("Let me help here!");
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        }
    }
    
    hideSolveTogetherPopup() {
        // Hide the popup overlay
        if (this.solveTogetherPopup) {
            this.solveTogetherPopup.style.display = 'none';
            console.log('Hiding solve together popup');
        }
        
        // Restore the AI companion bot to its original position
        const aiCompanion = document.getElementById('aiCompanion');
        if (aiCompanion) {
            aiCompanion.style.display = 'flex';
            aiCompanion.classList.remove('flying');
            aiCompanion.querySelector('.bot-status').textContent = "Ready to help! 🤖";
        }
    }

    destroy() {}
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CylinderAdaptiveCheckScreen;
}
