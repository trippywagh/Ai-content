// Screen Transition Configuration
// Each screen can have a transition that shows when the screen loads

const screenTransitions = {
    // Screen 2: Show transition when screen loads
    2: {
        audioFile: 'audio/screen1-to-2-transition.mp3',
        text: 'Why don\'t you look at this intriguing problem first before we deep dive into the concept',
        botMessage: 'Ready for a fun challenge? 🤔',
        duration: 4000 // Estimated duration in ms for fallback timing
    },
    
    // Screen 4: Show transition when screen loads
    4: {
        audioFile: 'audio/screen3-to-4-transition.mp3',
        text: 'Come, now let\'s learn the area and volume concept in depth',
        botMessage: 'Let\'s dive deep into the concepts! 📚',
        duration: 4000 // Estimated duration in ms for fallback timing
    },
    
    // Screen 8: Show transition when simulation popup opens
    8: {
        audioFile: 'audio/screen8-simulation-transition.mp3',
        text: 'Here is an interesting hands on simulation for you to try !!',
        botMessage: 'Time for some hands-on learning! 🧪',
        duration: 4000 // Estimated duration in ms for fallback timing
    }
    
    // Future transitions can be added here:
    // 3: { ... },
    // 5: { ... },
    // etc.
};

// Function to get transition config for a specific screen
function getScreenTransitionConfig(screenNumber) {
    return screenTransitions[screenNumber] || null;
}

// Export for use in screen scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { screenTransitions, getScreenTransitionConfig };
} else {
    window.screenTransitions = screenTransitions;
    window.getScreenTransitionConfig = getScreenTransitionConfig;
}
