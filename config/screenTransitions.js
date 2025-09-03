// Screen Transition Configuration
// Each screen can have a transition that shows when the screen loads

const screenTransitions = {
    // Screen 2: Show transition when screen loads
    2: {
        audioFile: 'audio/screen1-to-2-transition.mp3',
        text: 'Ready! for your first puzzle? Look at the Coke Can. It\'s a cylinder in real. But imagine if we could unwrap it and lay it flat on the table… <br> What shape do you think the curved part becomes?',
        botMessage: 'Ready for a fun challenge? <img src="images/thinking-robot.png" alt="Thinking Robot" style="width: 25px; height: 25px; vertical-align: middle; margin-left: 5px;">',
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
        text: 'Here is an hands on interesting simualtion for you to try on.. Go ahead and turn the tap ON !!',
        botMessage: 'Time for some hands-on learning! 🧪',
        duration: 4000 // Estimated duration in ms for fallback timing
    },
    
    // Summary Screen: Show transition when summary screen loads
    'summary': {
        audioFile: 'audio/summary-transition.mp3',
        text: 'Looks like both questions tripped you up. No worries, it is totally normal to have a few bumps! I recommend going through a quick refresher to brush up on the key ideas. Once you do, you will be ready to tackle the questions with confidence!',
        botMessage: 'Time to review what we learned! 📚',
        duration: 3000 // Estimated duration in ms for fallback timing
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
