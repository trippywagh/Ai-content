// Screen 4: Cylinder Concept Explainer

class CylinderConceptScreen {
    constructor() {
        this.video = null;
        this.overlay = null;
        this.replayBtn = null;
        this.nextBtn = null;
        this.popupShown = false;
        this.pauseTime = 16; // Pause at 16 seconds
        this.init();
    }

    init() {
        this.video = document.getElementById('conceptVideo');
        this.overlay = document.getElementById('conceptOverlay');
        this.replayBtn = document.getElementById('replayConceptBtn');
        this.nextBtn = document.getElementById('nextAfterConcept');

        this.setVideoSource();
        this.wireEvents();
    }

    setVideoSource() {
        // Default local path
        this.video.src = 'videos/cylinder-concept.mp4';
        // Or hosted URL:
        // this.video.src = 'https://your-cdn/cylinder-concept.mp4';
    }

    wireEvents() {
        if (this.overlay) this.overlay.addEventListener('click', () => this.play());
        if (this.replayBtn) this.replayBtn.addEventListener('click', () => this.replay());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.goNext());

        this.video.addEventListener('play', () => { if (this.overlay) this.overlay.style.display = 'none'; });
        this.video.addEventListener('pause', () => { if (!this.video.ended && this.overlay) this.overlay.style.display = 'flex'; });
        this.video.addEventListener('ended', () => { if (this.overlay) this.overlay.style.display = 'flex'; if (this.nextBtn) this.nextBtn.style.display = 'inline-block'; });
        this.video.addEventListener('error', (e) => {
            console.error('Concept video error', e, this.video?.error);
            alert('Could not load concept video. Check videos/cylinder-concept.mp4');
        });
        
        // Add timeupdate listener for popup trigger
        this.video.addEventListener('timeupdate', () => this.checkForPopup());
    }

    checkForPopup() {
        if (!this.popupShown && this.video.currentTime >= this.pauseTime) {
            this.popupShown = true;
            this.video.pause();
            this.showCylinderQuestionPopup();
        }
    }

    showCylinderQuestionPopup() {
        // Create popup overlay
        const popupOverlay = document.createElement('div');
        popupOverlay.id = 'cylinderQuestionPopup';
        popupOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
        `;

        popupContent.innerHTML = `
            <h2 style="margin: 0 0 30px 0; color: #1e293b; font-size: 2rem; font-weight: 700;">
                🤔 Quick Check!
            </h2>
            <p style="margin: 0 0 30px 0; color: #475569; font-size: 1.2rem; font-weight: 600;">
                Which of these are right circular cylinders?
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 30px;">
                <!-- Option 1 -->
                <div style="text-align: center;">
                    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #f59e0b, #d97706); border-radius: 10px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);">
                        📦
                    </div>
                    <p style="margin: 0 0 15px 0; color: #1e293b; font-weight: 600;">Option 1</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="option-btn" data-option="1" data-answer="no" style="padding: 8px 16px; border: 2px solid #10b981; background: white; color: #10b981; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Yes</button>
                        <button class="option-btn" data-option="1" data-answer="no" style="padding: 8px 16px; border: 2px solid #ef4444; background: white; color: #ef4444; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">No</button>
                    </div>
                </div>

                <!-- Option 2 -->
                <div style="text-align: center;">
                    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #3b82f6, #1d4ed8); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);">
                        🥤
                    </div>
                    <p style="margin: 0 0 15px 0; color: #1e293b; font-weight: 600;">Option 2</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="option-btn" data-option="2" data-answer="yes" style="padding: 8px 16px; border: 2px solid #10b981; background: white; color: #10b981; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Yes</button>
                        <button class="option-btn" data-option="2" data-answer="no" style="padding: 8px 16px; border: 2px solid #ef4444; background: white; color: #ef4444; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">No</button>
                    </div>
                </div>

                <!-- Option 3 -->
                <div style="text-align: center;">
                    <div style="width: 120px; height: 120px; background: linear-gradient(45deg, #8b5cf6, #7c3aed); border-radius: 5px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);">
                        📱
                    </div>
                    <p style="margin: 0 0 15px 0; color: #1e293b; font-weight: 600;">Option 3</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="option-btn" data-option="3" data-answer="no" style="padding: 8px 16px; border: 2px solid #10b981; background: white; color: #10b981; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Yes</button>
                        <button class="option-btn" data-option="3" data-answer="no" style="padding: 8px 16px; border: 2px solid #ef4444; background: white; color: #ef4444; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">No</button>
                    </div>
                </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
                <button id="closePopupBtn" style="padding: 15px 30px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 25px; font-size: 1.1rem; font-weight: 600; cursor: pointer; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    Continue Video ▶️
                </button>
            </div>
        `;

        popupOverlay.appendChild(popupContent);
        document.body.appendChild(popupOverlay);

        // Add event listeners
        this.addPopupEventListeners(popupOverlay);
    }

    addPopupEventListeners(popupOverlay) {
        const optionBtns = popupOverlay.querySelectorAll('.option-btn');
        const closeBtn = popupOverlay.querySelector('#closePopupBtn');

        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const option = e.target.dataset.option;
                const answer = e.target.dataset.answer;
                const isYes = e.target.textContent === 'Yes';
                
                // Check if this is a wrong "Yes" answer (options 1 or 3)
                if (isYes && (option === '1' || option === '3')) {
                    this.showHintPopup(option, popupOverlay, 'wrong_yes');
                    return;
                }
                
                // Check if this is a wrong "No" answer (option 2)
                if (!isYes && option === '2') {
                    this.showHintPopup(option, popupOverlay, 'wrong_no');
                    return;
                }
                
                // Visual feedback for correct answers
                e.target.style.background = isYes ? '#10b981' : '#ef4444';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.05)';
                
                // Disable all buttons for this option
                const optionGroup = popupOverlay.querySelectorAll(`[data-option="${option}"]`);
                optionGroup.forEach(b => {
                    b.disabled = true;
                    b.style.opacity = '0.6';
                });

                console.log(`Option ${option}: ${isYes ? 'Yes' : 'No'} (Correct: ${answer === 'yes' ? 'Yes' : 'No'})`);
            });
        });

        closeBtn.addEventListener('click', () => {
            this.closePopup(popupOverlay);
        });

        // Close on overlay click
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                this.closePopup(popupOverlay);
            }
        });
    }

    showHintPopup(wrongOption, mainPopup, hintType) {
        // Create hint popup overlay
        const hintOverlay = document.createElement('div');
        hintOverlay.id = 'hintPopup';
        hintOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        // Determine hint content based on type
        let hintMessage, hintIcon, hintColor;
        if (hintType === 'wrong_yes') {
            hintMessage = "Remember, curved side should be perpendicular to both the bases.";
            hintIcon = "💡";
            hintColor = "#f59e0b";
        } else if (hintType === 'wrong_no') {
            hintMessage = "Look at the image carefully and try again.";
            hintIcon = "👀";
            hintColor = "#3b82f6";
        }

        // Create hint popup content
        const hintContent = document.createElement('div');
        hintContent.style.cssText = `
            background: linear-gradient(135deg, ${hintType === 'wrong_yes' ? '#fef3c7, #fde68a' : '#dbeafe, #bfdbfe'});
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            text-align: center;
            border: 3px solid ${hintColor};
        `;

        hintContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 20px;">${hintIcon}</div>
            <h3 style="margin: 0 0 20px 0; color: ${hintType === 'wrong_yes' ? '#92400e' : '#1e40af'}; font-size: 1.5rem; font-weight: 700;">
                Hint!
            </h3>
            <p style="margin: 0 0 30px 0; color: ${hintType === 'wrong_yes' ? '#78350f' : '#1e3a8a'}; font-size: 1.1rem; line-height: 1.6; font-weight: 600;">
                ${hintMessage}
            </p>
            <div style="display: flex; justify-content: center;">
                <button id="retryOptionBtn" style="padding: 12px 25px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    Try Again 🔄
                </button>
            </div>
        `;

        hintOverlay.appendChild(hintContent);
        document.body.appendChild(hintOverlay);

        // Add event listeners for hint popup
        const retryBtn = hintOverlay.querySelector('#retryOptionBtn');

        retryBtn.addEventListener('click', () => {
            this.retryOption(wrongOption, mainPopup, hintOverlay);
        });

        // Close on overlay click
        hintOverlay.addEventListener('click', (e) => {
            if (e.target === hintOverlay) {
                hintOverlay.remove();
            }
        });
    }

    retryOption(option, mainPopup, hintOverlay) {
        // Remove hint popup
        hintOverlay.remove();
        
        // Re-enable buttons for the specific option
        const optionGroup = mainPopup.querySelectorAll(`[data-option="${option}"]`);
        optionGroup.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.background = btn.textContent === 'Yes' ? 'white' : 'white';
            btn.style.color = btn.textContent === 'Yes' ? '#10b981' : '#ef4444';
            btn.style.transform = 'scale(1)';
        });
    }

    closePopup(popupOverlay) {
        popupOverlay.remove();
        // Resume video from where it was paused
        this.video.play();
    }

    play() { const p = this.video.play(); if (p && p.catch) p.catch(() => {}); }
    replay() { 
        this.popupShown = false; // Reset popup state on replay
        this.video.currentTime = 0; 
        this.play(); 
    }

    goNext() {
        if (window.app && typeof window.app.loadScreenDirectly === 'function') {
            // Use config to get next screen (should be Screen 8)
            const nextScreen = window.getNextScreen ? window.getNextScreen(4) : 8;
            window.app.loadScreenDirectly(nextScreen);
        }
    }

    destroy() {}
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CylinderConceptScreen;
}
