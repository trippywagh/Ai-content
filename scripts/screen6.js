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
        
        // Interactive playbook
        this.interactivePlaybook = null;

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
                
                // Initialize interactive playbook after popup is shown
                setTimeout(() => {
                    this.initializeInteractivePlaybook();
                }, 100);
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
        
        // Clean up interactive playbook
        if (this.interactivePlaybook) {
            this.interactivePlaybook.dispose();
            this.interactivePlaybook = null;
        }
        
        // Restore the AI companion bot to its original position
        const aiCompanion = document.getElementById('aiCompanion');
        if (aiCompanion) {
            aiCompanion.style.display = 'flex';
            aiCompanion.classList.remove('flying');
            aiCompanion.querySelector('.bot-status').textContent = "Ready to help! 🤖";
        }
    }
    
    initializeInteractivePlaybook() {
        try {
            console.log('Initializing interactive playbook...');
            this.interactivePlaybook = new InteractivePlaybook();
            console.log('Interactive playbook initialized successfully');
        } catch (error) {
            console.error('Error initializing interactive playbook:', error);
        }
    }

    destroy() {}
}

class InteractivePlaybook {
    constructor() {
        this.isCut = false;
        this.radius = 3;
        this.height = 8;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.setupControls();
        this.createCylinder();
        this.updateMeasurements();
    }
    
    setupControls() {
        const radiusSlider = document.getElementById('radiusSlider');
        const heightSlider = document.getElementById('heightSlider');
        const cutButton = document.getElementById('cutButton');
        const resetButton = document.getElementById('resetButton');
        
        if (radiusSlider) {
            radiusSlider.addEventListener('input', (e) => {
                this.radius = parseFloat(e.target.value);
                document.getElementById('radiusValue').textContent = this.radius;
                this.updateCylinder();
                this.updateMeasurements();
            });
        }
        
        if (heightSlider) {
            heightSlider.addEventListener('input', (e) => {
                this.height = parseFloat(e.target.value);
                document.getElementById('heightValue').textContent = this.height;
                this.updateCylinder();
                this.updateMeasurements();
            });
        }
        
        if (cutButton) {
            cutButton.addEventListener('click', () => {
                this.cutCylinder();
            });
        }
        
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetCylinder();
            });
        }
    }
    
    createCylinder() {
        const container = document.getElementById('cylinder3dContainer');
        if (!container) return;
        
        // Create beautiful 2D SVG cylinder
        container.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Definitions for gradients and patterns -->
                <defs>
                    <linearGradient id="cylinderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#2980b9;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1f4e79;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="cylinderShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2c3e50;stop-opacity:0.3" />
                        <stop offset="100%" style="stop-color:#2c3e50;stop-opacity:0.1" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                <!-- Main cylinder body -->
                <ellipse cx="150" cy="80" rx="60" ry="20" fill="url(#cylinderGradient)" stroke="#2c3e50" stroke-width="2" filter="url(#glow)"/>
                <ellipse cx="150" cy="170" rx="60" ry="20" fill="url(#cylinderGradient)" stroke="#2c3e50" stroke-width="2" filter="url(#glow)"/>
                
                <!-- Cylinder sides -->
                <path d="M 90 80 L 90 170" stroke="#2c3e50" stroke-width="3" fill="none"/>
                <path d="M 210 80 L 210 170" stroke="#2c3e50" stroke-width="3" fill="none"/>
                
                <!-- Top and bottom highlights -->
                <ellipse cx="150" cy="80" rx="55" ry="18" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
                <ellipse cx="150" cy="170" rx="55" ry="18" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
                
                <!-- Side shading -->
                <path d="M 90 80 Q 150 85 210 80 L 210 170 Q 150 175 90 170 Z" fill="url(#cylinderShadow)" opacity="0.3"/>
                
                <!-- Radius indicator -->
                <line x1="150" y1="80" x2="210" y2="80" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5,5"/>
                <text x="180" y="75" text-anchor="middle" fill="#e74c3c" font-size="12" font-weight="bold">r = ${this.radius} cm</text>
                
                <!-- Height indicator -->
                <line x1="220" y1="80" x2="220" y2="170" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5,5"/>
                <text x="225" y="125" text-anchor="middle" fill="#e74c3c" font-size="12" font-weight="bold" transform="rotate(90 225 125)">h = ${this.height} cm</text>
                
                <!-- Cutting line indicator (hidden initially) -->
                <line id="cutLine" x1="150" y1="60" x2="150" y2="190" stroke="#e74c3c" stroke-width="3" stroke-dasharray="10,5" opacity="0" style="pointer-events: none;">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
                </line>
                
                <!-- Cut button indicator -->
                <circle id="cutIndicator" cx="150" cy="125" r="8" fill="#e74c3c" opacity="0.7" style="cursor: pointer;">
                    <animate attributeName="r" values="8;10;8" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                <text x="150" y="130" text-anchor="middle" fill="white" font-size="10" font-weight="bold" style="pointer-events: none;">🔪</text>
            </svg>
        `;
        
        // Add click event to cut indicator
        const cutIndicator = container.querySelector('#cutIndicator');
        if (cutIndicator) {
            cutIndicator.addEventListener('click', () => this.cutCylinder());
        }
    }
    
    updateCylinder() {
        const container = document.getElementById('cylinder3dContainer');
        if (!container) return;
        
        // Update radius and height in the SVG
        const radiusText = container.querySelector('text');
        const heightText = container.querySelectorAll('text')[1];
        
        if (radiusText) {
            radiusText.textContent = `r = ${this.radius} cm`;
        }
        if (heightText) {
            heightText.textContent = `h = ${this.height} cm`;
        }
        
        // Update ellipse dimensions
        const ellipses = container.querySelectorAll('ellipse');
        const rx = Math.min(60, 20 + this.radius * 8); // Scale radius visually
        const ry = Math.min(20, 8 + this.radius * 2);
        
        ellipses.forEach((ellipse, index) => {
            ellipse.setAttribute('rx', rx);
            ellipse.setAttribute('ry', ry);
        });
        
        // Update side lines
        const sideLines = container.querySelectorAll('path');
        if (sideLines.length >= 2) {
            const leftX = 150 - rx;
            const rightX = 150 + rx;
            const topY = 80;
            const bottomY = 80 + this.height * 8; // Scale height visually
            
            // Update side lines
            sideLines[0].setAttribute('d', `M ${leftX} ${topY} L ${leftX} ${bottomY}`);
            sideLines[1].setAttribute('d', `M ${rightX} ${topY} L ${rightX} ${bottomY}`);
            
            // Update bottom ellipse position
            if (ellipses[1]) {
                ellipses[1].setAttribute('cy', bottomY);
            }
            
            // Update height indicator
            if (heightText) {
                heightText.setAttribute('y', (topY + bottomY) / 2);
            }
        }
    }
    
    cutCylinder() {
        if (this.isCut) return;
        
        this.isCut = true;
        document.getElementById('cutButton').disabled = true;
        document.getElementById('resetButton').disabled = false;
        
        // Animate cylinder cutting
        this.animateCut();
        
        // Show unrolled rectangle
        this.showUnrolledRectangle();
    }
    
    animateCut() {
        const container = document.getElementById('cylinder3dContainer');
        if (!container) return;
        
        // Show cutting line
        const cutLine = container.querySelector('#cutLine');
        if (cutLine) {
            cutLine.style.opacity = '1';
        }
        
        // Animate cylinder splitting
        const svg = container.querySelector('svg');
        if (svg) {
            svg.style.transition = 'all 1.5s ease-out';
            svg.style.transform = 'translateX(-50px) scale(0.8)';
            svg.style.opacity = '0.7';
        }
        
        // Hide cut indicator
        const cutIndicator = container.querySelector('#cutIndicator');
        if (cutIndicator) {
            cutIndicator.style.opacity = '0';
        }
    }
    
    showUnrolledRectangle() {
        const rectangle = document.getElementById('unrolledRectangle');
        if (!rectangle) return;
        
        // Calculate dimensions
        const length = 2 * Math.PI * this.radius;
        const height = this.height;
        const area = length * height;
        
        // Create beautiful rectangle visualization
        rectangle.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="rectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#e3f2fd;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#bbdefb;stop-opacity:1" />
                    </linearGradient>
                    <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e3f2fd" stroke-width="0.5"/>
                    </pattern>
                </defs>
                
                <!-- Rectangle background with grid -->
                <rect x="20" y="20" width="260" height="160" fill="url(#rectGradient)" stroke="#3498db" stroke-width="3" rx="8"/>
                <rect x="20" y="20" width="260" height="160" fill="url(#gridPattern)" opacity="0.3"/>
                
                <!-- Length measurement -->
                <line x1="20" y1="10" x2="280" y2="10" stroke="#e74c3c" stroke-width="2"/>
                <text x="150" y="8" text-anchor="middle" fill="#e74c3c" font-size="12" font-weight="bold">2πr = ${length.toFixed(2)} cm</text>
                
                <!-- Height measurement -->
                <line x1="10" y1="20" x2="10" y2="180" stroke="#e74c3c" stroke-width="2"/>
                <text x="8" y="100" text-anchor="middle" fill="#e74c3c" font-size="12" font-weight="bold" transform="rotate(-90 8 100)">h = ${height} cm</text>
                
                <!-- Area calculation -->
                <text x="150" y="110" text-anchor="middle" fill="#2c3e50" font-size="14" font-weight="bold">Area = ${area.toFixed(2)} cm²</text>
                
                <!-- Visual representation of the curved surface -->
                <path d="M 20 100 Q 150 80 280 100" stroke="#e67e22" stroke-width="3" fill="none" stroke-dasharray="8,4"/>
                <text x="150" y="85" text-anchor="middle" fill="#e67e22" font-size="11" font-weight="bold">Curved Surface</text>
                
                <!-- Mathematical formula -->
                <text x="150" y="140" text-anchor="middle" fill="#34495e" font-size="12" font-style="italic">CSA = 2πr × h = ${area.toFixed(2)} cm²</text>
            </svg>
        `;
        
        // Update measurements
        document.getElementById('lengthValue').textContent = `2πr = ${length.toFixed(2)} cm`;
        document.getElementById('rectHeightValue').textContent = `h = ${height} cm`;
        document.getElementById('areaValue').textContent = `CSA = ${area.toFixed(2)} cm²`;
    }
    
    resetCylinder() {
        if (!this.isCut) return;
        
        this.isCut = false;
        document.getElementById('cutButton').disabled = false;
        document.getElementById('resetButton').disabled = true;
        
        // Reset rectangle
        const rectangle = document.getElementById('unrolledRectangle');
        if (rectangle) {
            rectangle.innerHTML = `
                <div class="rectangle-placeholder">
                    <p>Click the 🔪 button on the cylinder to see the transformation!</p>
                </div>
            `;
        }
        
        // Animate cylinder back
        this.animateReset();
    }
    
    animateReset() {
        const container = document.getElementById('cylinder3dContainer');
        if (!container) return;
        
        // Reset cylinder position
        const svg = container.querySelector('svg');
        if (svg) {
            svg.style.transition = 'all 1s ease-in';
            svg.style.transform = 'translateX(0) scale(1)';
            svg.style.opacity = '1';
        }
        
        // Hide cutting line
        const cutLine = container.querySelector('#cutLine');
        if (cutLine) {
            cutLine.style.opacity = '0';
        }
        
        // Show cut indicator
        const cutIndicator = container.querySelector('#cutIndicator');
        if (cutIndicator) {
            cutIndicator.style.opacity = '0.7';
        }
    }
    
    updateMeasurements() {
        const length = 2 * Math.PI * this.radius;
        const area = length * this.height;
        
        document.getElementById('lengthValue').textContent = `2πr = ${length.toFixed(2)} cm`;
        document.getElementById('rectHeightValue').textContent = `h = ${this.height} cm`;
        document.getElementById('areaValue').textContent = `CSA = ${area.toFixed(2)} cm²`;
    }
    
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CylinderAdaptiveCheckScreen;
}
