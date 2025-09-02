// Screen Transition Component
// Handles bot voice transitions between screens

class ScreenTransition {
    constructor() {
        this.isTransitioning = false;
        this.audio = null;
        this.speechSynthesis = window.speechSynthesis;
    }

    // Main method to show transition between screens
    async showTransition(fromScreen, toScreen, onComplete) {
        console.log('ScreenTransition.showTransition called with:', fromScreen, toScreen);
        
        if (this.isTransitioning) {
            console.log('Transition already in progress, skipping...');
            return;
        }

        const config = window.getTransitionConfig ? window.getTransitionConfig(fromScreen, toScreen) : null;
        console.log('Transition config:', config);
        
        if (!config) {
            console.log(`No transition config found for ${fromScreen}-${toScreen}, proceeding directly`);
            if (onComplete) onComplete();
            return;
        }

        this.isTransitioning = true;
        console.log(`Showing transition from screen ${fromScreen} to screen ${toScreen}`);

        try {
            // Show bot transition
            console.log('Showing bot transition...');
            await this.showBotTransition(config);
            
            // Play audio or use TTS
            console.log('Playing audio...');
            await this.playAudio(config);
            
            // Wait 0.5 seconds after audio completes
            console.log('Waiting 0.5 seconds...');
            await this.delay(500);
            
            // Hide bot transition
            console.log('Hiding bot transition...');
            this.hideBotTransition();
            
            // Complete transition
            this.isTransitioning = false;
            console.log('Transition completed!');
            if (onComplete) onComplete();
            
        } catch (error) {
            console.error('Error during transition:', error);
            this.hideBotTransition();
            this.isTransitioning = false;
            if (onComplete) onComplete();
        }
    }

    // Show bot in center with message
    async showBotTransition(config) {
        return new Promise((resolve) => {
            console.log('showBotTransition called with config:', config);
            const bot = document.getElementById('aiCompanion');
            const botStatus = document.querySelector('.bot-status');
            
            console.log('Bot element:', bot);
            console.log('Bot status element:', botStatus);
            
            if (!bot || !botStatus) {
                console.error('Bot elements not found');
                resolve();
                return;
            }

            // Store original position and state
            this.originalBotState = {
                position: bot.style.position,
                bottom: bot.style.bottom,
                right: bot.style.right,
                transform: bot.style.transform,
                zIndex: bot.style.zIndex,
                statusText: botStatus.textContent,
                statusDisplay: botStatus.style.display
            };

            // Move bot to center of screen
            bot.style.position = 'fixed';
            bot.style.bottom = 'auto';
            bot.style.right = 'auto';
            bot.style.top = '50%';
            bot.style.left = '50%';
            bot.style.transform = 'translate(-50%, -50%)';
            bot.style.zIndex = '10000';

            // Update bot message
            botStatus.textContent = config.botMessage;
            botStatus.style.display = 'block';

            // Add transition animation
            bot.style.transition = 'all 0.5s ease';
            
            // Add speaking animation
            bot.classList.add('speaking');

            // Resolve after animation
            setTimeout(resolve, 500);
        });
    }

    // Play audio or use TTS fallback
    async playAudio(config) {
        return new Promise((resolve) => {
            // Try to play custom audio first
            this.playCustomAudio(config.audioFile, config.text, resolve);
        });
    }

    // Play custom audio file with TTS fallback
    playCustomAudio(audioFile, fallbackText, onComplete) {
        console.log('playCustomAudio called with:', audioFile, fallbackText);
        
        // For testing, let's force TTS fallback to see if the transition works
        console.log('Forcing TTS fallback for testing...');
        this.useTTSFallback(fallbackText, onComplete);
        return;
        
        // Create audio element
        this.audio = new Audio(audioFile);
        
        // Set up audio event listeners
        this.audio.onloadeddata = () => {
            console.log('Audio loaded successfully');
        };

        this.audio.oncanplaythrough = () => {
            console.log('Audio ready to play');
            this.audio.play().catch((error) => {
                console.warn('Failed to play audio, using TTS fallback:', error);
                this.useTTSFallback(fallbackText, onComplete);
            });
        };

        this.audio.onended = () => {
            console.log('Audio playback completed');
            onComplete();
        };

        this.audio.onerror = (error) => {
            console.warn('Audio failed to load, using TTS fallback:', error);
            this.useTTSFallback(fallbackText, onComplete);
        };

        // Load the audio
        this.audio.load();
    }

    // Use TTS as fallback
    useTTSFallback(text, onComplete) {
        console.log('useTTSFallback called with text:', text);
        
        if (!this.speechSynthesis) {
            console.warn('Speech synthesis not available');
            onComplete();
            return;
        }

        // Cancel any ongoing speech
        this.speechSynthesis.cancel();

        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;

        // Set up event listeners
        utterance.onend = () => {
            console.log('TTS completed');
            onComplete();
        };

        utterance.onerror = (error) => {
            console.warn('TTS error:', error);
            onComplete();
        };

        // Speak the text
        console.log('Starting TTS speech...');
        this.speechSynthesis.speak(utterance);
    }

    // Hide bot transition and return to original position
    hideBotTransition() {
        const bot = document.getElementById('aiCompanion');
        const botStatus = document.querySelector('.bot-status');
        
        if (!bot || !botStatus || !this.originalBotState) return;

        // Remove speaking animation
        bot.classList.remove('speaking');

        // Restore original position and state
        bot.style.position = this.originalBotState.position;
        bot.style.bottom = this.originalBotState.bottom;
        bot.style.right = this.originalBotState.right;
        bot.style.transform = this.originalBotState.transform;
        bot.style.zIndex = this.originalBotState.zIndex;
        bot.style.top = 'auto';
        bot.style.left = 'auto';

        // Restore original status text
        botStatus.textContent = this.originalBotState.statusText;
        botStatus.style.display = this.originalBotState.statusDisplay;

        // Clean up
        this.originalBotState = null;
    }

    // Utility delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Clean up method
    destroy() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }
        this.isTransitioning = false;
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScreenTransition;
} else {
    window.ScreenTransition = ScreenTransition;
}
