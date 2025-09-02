// Bot Transition Overlay System
// Shows bot transitions as overlays on top of loaded screens

class BotTransitionOverlay {
    constructor() {
        this.isTransitioning = false;
        this.audio = null;
        this.speechSynthesis = window.speechSynthesis;
    }

    // Show transition overlay on current screen
    async showTransition(config) {
        if (this.isTransitioning) {
            console.log('Transition already in progress, skipping...');
            return;
        }

        console.log('BotTransitionOverlay.showTransition called with config:', config);
        this.isTransitioning = true;

        try {
            // Step 1: Create overlay
            console.log('Step 1: Creating overlay...');
            this.createOverlay();
            await this.delay(300);
            
            // Step 2: Bot smoothly transitions to center
            console.log('Step 2: Bot transitioning to center...');
            await this.moveBotToCenter(config);
            
            // Step 3: Show text cloud and start audio
            console.log('Step 3: Showing text cloud and starting audio...');
            await this.showTextCloudAndAudio(config);
            
            // Step 4: Hide text cloud immediately after audio starts (only bot image visible during pulsating)
            console.log('Step 4: Hiding text cloud, keeping only bot image...');
            await this.hideTextCloud();
            
            // Step 5: Wait 0.5 seconds after audio
            console.log('Step 5: Waiting 0.5 seconds after audio...');
            await this.delay(500);
            
            // Step 6: Bot smoothly transitions back to original position
            console.log('Step 6: Bot transitioning back to original position...');
            await this.moveBotBackToOriginal();
            
            // Step 7: Hide overlay
            console.log('Step 7: Hiding overlay...');
            this.hideOverlay();
            
            this.isTransitioning = false;
            console.log('Transition completed!');
            
        } catch (error) {
            console.error('Error during transition:', error);
            this.cleanup();
            this.isTransitioning = false;
        }
    }

    // Create overlay that covers the entire screen
    createOverlay() {
        // Remove existing overlay if any
        this.removeOverlay();
        
        const overlay = document.createElement('div');
        overlay.id = 'botTransitionOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.4);
            z-index: 9999;
            pointer-events: auto;
            opacity: 1;
        `;
        
        document.body.appendChild(overlay);
        this.overlay = overlay;
        
        console.log('Overlay created and added to DOM');
    }

    // Step 2: Move bot smoothly to center
    async moveBotToCenter(config) {
        return new Promise((resolve) => {
            console.log('moveBotToCenter called');
            
            const bot = document.getElementById('aiCompanion');
            const botStatus = document.querySelector('.bot-status');
            
            if (!bot || !botStatus) {
                console.error('Bot elements not found');
                resolve();
                return;
            }

            // Store original position and state (get computed styles to get actual values)
            const computedStyle = window.getComputedStyle(bot);
            this.originalBotState = {
                position: computedStyle.position,
                bottom: computedStyle.bottom,
                right: computedStyle.right,
                transform: computedStyle.transform,
                zIndex: computedStyle.zIndex,
                statusText: botStatus.textContent,
                statusDisplay: botStatus.style.display
            };

            console.log('Original bot state:', this.originalBotState);

            // Hide the status text during transition
            botStatus.style.display = 'none';

            // Use GSAP for smooth transition to center with 50% scale increase
            gsap.to(bot, {
                duration: 1.5,
                position: 'fixed',
                bottom: 'auto',
                right: 'auto',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1.3)',
                zIndex: 10000,
                ease: "power2.inOut",
                onComplete: () => {
                    // Remove the speaking class to prevent CSS animation conflicts
                    bot.classList.remove('speaking');
                    
                    // Force maintain the scale immediately
                    gsap.set(bot, { 
                        transform: 'translate(-50%, -50%) scale(1.3)',
                        clearProps: "none"
                    });
                    
                    // Create our own pulsing animation using GSAP that maintains the 30% scale
                    this.speakingAnimation = gsap.to(bot, {
                        scale: 1.4, // Pulse between 1.3 and 1.4 (30% to 40% bigger)
                        duration: 0.6,
                        ease: "power2.inOut",
                        yoyo: true,
                        repeat: -1,
                        transformOrigin: "center center"
                    });
                    
                    // Set up a continuous check to maintain scale during speaking
                    this.scaleMaintenanceInterval = setInterval(() => {
                        const currentTransform = bot.style.transform;
                        if (!currentTransform.includes('scale(1.3)') && !currentTransform.includes('scale(1.4)')) {
                            gsap.set(bot, { 
                                transform: 'translate(-50%, -50%) scale(1.3)',
                                clearProps: "none"
                            });
                        }
                    }, 100);
                    
                    resolve();
                }
            });
        });
    }

    // Step 3: Show text cloud and start audio
    async showTextCloudAndAudio(config) {
        return new Promise((resolve) => {
            console.log('showTextCloudAndAudio called');
            
            // Create text cloud
            this.createTextCloud(config.text);
            
            // Start audio/TTS
            this.useTTSFallback(config.text, resolve);
        });
    }

    // Create text cloud that displays what bot is saying
    createTextCloud(text) {
        console.log('Creating text cloud with text:', text);
        
        // Remove existing text cloud
        this.removeTextCloud();
        
        const textCloud = document.createElement('div');
        textCloud.id = 'botTextCloud';
        textCloud.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) translateY(160px);
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            color: #1e293b;
            padding: 24px 32px;
            border-radius: 24px;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            max-width: 520px;
            min-width: 300px;
            z-index: 10001;
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid #e2e8f0;
            box-shadow: 
                0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                0 10px 10px -5px rgba(0, 0, 0, 0.04),
                0 0 0 1px rgba(59, 130, 246, 0.1);
            font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.5;
            letter-spacing: -0.01em;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        `;
        
        // Add content without triangle arrows
        textCloud.innerHTML = `
            <div style="font-size: 18px; color: #1e293b; font-weight: 600;">
                ${text}
            </div>
        `;
        
        document.body.appendChild(textCloud);
        this.textCloud = textCloud;
        
        // Fade in the text cloud
        setTimeout(() => {
            textCloud.style.opacity = '1';
                                    textCloud.style.transform = 'translate(-50%, -50%) translateY(140px)';
        }, 100);
        
        console.log('Text cloud created and added to DOM');
    }

    // Use TTS as fallback
    useTTSFallback(text, onComplete) {
        console.log('useTTSFallback called with text:', text);
        
        if (!this.speechSynthesis) {
            console.warn('Speech synthesis not available');
            // Still call onComplete after a delay to continue the flow
            setTimeout(onComplete, 2000);
            return;
        }

        // Cancel any ongoing speech
        this.speechSynthesis.cancel();

        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;

        // Set up event listeners
        utterance.onend = () => {
            console.log('TTS completed');
            onComplete();
        };

        utterance.onerror = (error) => {
            console.warn('TTS error:', error);
            // Still call onComplete to continue the flow
            onComplete();
        };

        // Speak the text
        console.log('Starting TTS speech...');
        this.speechSynthesis.speak(utterance);
        
        // Fallback timeout in case TTS doesn't work
        setTimeout(() => {
            console.log('TTS timeout fallback');
            onComplete();
        }, 5000);
    }

    // Step 5: Hide text cloud
    async hideTextCloud() {
        return new Promise((resolve) => {
            console.log('hideTextCloud called');
            
            if (this.textCloud) {
                this.textCloud.style.opacity = '0';
                this.textCloud.style.transform = 'translate(-50%, -50%) translateY(100px)';
                
                setTimeout(() => {
                    this.removeTextCloud();
                    resolve();
                }, 500);
            } else {
                resolve();
            }
        });
    }

    // Step 6: Move bot back to original position
    async moveBotBackToOriginal() {
        return new Promise((resolve) => {
            console.log('moveBotBackToOriginal called');
            
            const bot = document.getElementById('aiCompanion');
            const botStatus = document.querySelector('.bot-status');
            
            if (!bot || !botStatus || !this.originalBotState) {
                resolve();
                return;
            }

            // Stop the GSAP speaking animation
            if (this.speakingAnimation) {
                this.speakingAnimation.kill();
                this.speakingAnimation = null;
            }
            
            // Clear the scale maintenance interval
            if (this.scaleMaintenanceInterval) {
                clearInterval(this.scaleMaintenanceInterval);
                this.scaleMaintenanceInterval = null;
            }

            console.log('Restoring bot to original state:', this.originalBotState);

            // Use GSAP for smooth return transition
            gsap.to(bot, {
                duration: 1.5,
                position: this.originalBotState.position,
                bottom: this.originalBotState.bottom,
                right: this.originalBotState.right,
                top: 'auto',
                left: 'auto',
                scale: 1, // Reset scale to 1
                transform: 'none', // Clear current transform
                zIndex: this.originalBotState.zIndex,
                ease: "power2.inOut",
                onComplete: () => {
                    // Restore original status text
                    botStatus.textContent = this.originalBotState.statusText;
                    botStatus.style.display = this.originalBotState.statusDisplay;
                    
                    this.originalBotState = null;
                    resolve();
                }
            });
        });
    }

    // Step 7: Hide overlay
    hideOverlay() {
        console.log('hideOverlay called');
        this.removeOverlay();
    }

    // Remove text cloud
    removeTextCloud() {
        const textCloud = document.getElementById('botTextCloud');
        if (textCloud) {
            textCloud.remove();
        }
        this.textCloud = null;
    }

    // Remove overlay
    removeOverlay() {
        const overlay = document.getElementById('botTransitionOverlay');
        if (overlay) {
            overlay.remove();
        }
        this.overlay = null;
    }

    // Utility delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Cleanup method for error handling
    cleanup() {
        console.log('Cleaning up transition...');
        this.removeTextCloud();
        this.removeOverlay();
        
        // Stop the GSAP speaking animation
        if (this.speakingAnimation) {
            this.speakingAnimation.kill();
            this.speakingAnimation = null;
        }
        
        // Clear scale maintenance interval
        if (this.scaleMaintenanceInterval) {
            clearInterval(this.scaleMaintenanceInterval);
            this.scaleMaintenanceInterval = null;
        }
        
        const bot = document.getElementById('aiCompanion');
        const botStatus = document.querySelector('.bot-status');
        
        if (bot) {
            bot.classList.remove('speaking');
        }
        
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }
    }

    // Clean up method
    destroy() {
        this.cleanup();
        this.isTransitioning = false;
    }
}

// Export for use in screen scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BotTransitionOverlay;
} else {
    window.BotTransitionOverlay = BotTransitionOverlay;
}
