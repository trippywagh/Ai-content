// Screen Sequence Configuration
// This file controls which screens are shown and in what order
// without affecting any design, logic, or HTML

const SCREEN_SEQUENCE = {
    // Screen 1: Name Introduction (always first)
    1: { 
        id: 1, 
        show: true, 
        nextScreen: 2,
        title: "Name Introduction"
    },
    
    // Screen 2: Intriguing Question
    2: { 
        id: 2, 
        show: true, 
        nextScreen: 3,
        title: "Intriguing Question"
    },
    
    // Screen 3: Video explanation for question
    3: { 
        id: 3, 
        show: true, 
        nextScreen: 4,
        title: "Question Explanation"
    },
    
    // Screen 4: Core concept video
    4: { 
        id: 4, 
        show: true, 
        nextScreen: 8, // Changed: goes to Screen 8
        title: "Core Concept"
    },
    
    // Screen 5: Cylinder Simulation (hidden from flow)
    5: { 
        id: 5, 
        show: false, 
        nextScreen: null,
        title: "Cylinder Simulation"
    },
    
    // Screen 6: Instant Check
    6: { 
        id: 6, 
        show: true, 
        nextScreen: 9, // Goes to Quiz
        title: "Instant Check"
    },
    
    // Screen 7: Qutub Minar question (hidden from flow)
    7: { 
        id: 7, 
        show: false, 
        nextScreen: null,
        title: "Qutub Minar Question"
    },
    
    // Screen 8: Beaker Volume Mystery (moved after Screen 4)
    8: { 
        id: 8, 
        show: true, 
        nextScreen: 6, // Goes to Screen 6
        title: "Beaker Volume Mystery"
    },
    
    // Quiz screens continue as before
    9: { 
        id: 9, 
        show: true, 
        nextScreen: 10,
        title: "Quiz Intro"
    },
    
    10: { 
        id: 10, 
        show: true, 
        nextScreen: 11,
        title: "Quiz Question 1"
    },
    
    11: { 
        id: 11, 
        show: true, 
        nextScreen: 12,
        title: "Quiz Question 2"
    },
    
    12: { 
        id: 12, 
        show: true, 
        nextScreen: 13,
        title: "Quiz Question 3"
    },
    
    13: { 
        id: 13, 
        show: true, 
        nextScreen: 14,
        title: "Quiz Question 4"
    },
    
    14: { 
        id: 14, 
        show: true, 
        nextScreen: 15,
        title: "Quiz Question 5"
    },
    
    15: { 
        id: 15, 
        show: true, 
        nextScreen: null, // End of quiz
        title: "Quiz Results"
    }
};

// Helper functions
function getNextScreen(currentScreen) {
    const screen = SCREEN_SEQUENCE[currentScreen];
    if (!screen || !screen.show) return null;
    
    let nextScreen = screen.nextScreen;
    
    // If next screen is hidden, find the next visible screen
    while (nextScreen && !SCREEN_SEQUENCE[nextScreen]?.show) {
        nextScreen = SCREEN_SEQUENCE[nextScreen]?.nextScreen;
    }
    
    return nextScreen;
}

function isScreenVisible(screenId) {
    return SCREEN_SEQUENCE[screenId]?.show || false;
}

function getTotalVisibleScreens() {
    return Object.values(SCREEN_SEQUENCE).filter(screen => screen.show).length;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SCREEN_SEQUENCE, getNextScreen, isScreenVisible, getTotalVisibleScreens };
} else {
    // Browser environment
    window.SCREEN_SEQUENCE = SCREEN_SEQUENCE;
    window.getNextScreen = getNextScreen;
    window.isScreenVisible = isScreenVisible;
    window.getTotalVisibleScreens = getTotalVisibleScreens;
}
