// Screen Summary: Concept Summary JavaScript

class SummaryScreen {
    constructor() {
        this.init();
    }

    init() {
        console.log('SummaryScreen initialized');
        this.wireEvents();
        this.addInteractiveExamples();
    }

    wireEvents() {
        // Wire the Continue button
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.continueToQuiz();
            });
            console.log('Continue button wired');
        } else {
            console.error('Continue button not found');
        }
    }

    addInteractiveExamples() {
        // Add global functions for the onclick handlers
        window.showCSAExample = () => this.showCSAExample();
        window.showTSAExample = () => this.showTSAExample();
        window.showVolumeExample = () => this.showVolumeExample();
    }

    showCSAExample() {
        this.showExamplePopup(
            'Curved Surface Area (CSA)',
            'When you unwrap a cylinder, the curved side becomes a rectangle!',
            'The length of this rectangle is 2πr (circumference of the base) and the height is h (height of the cylinder).',
            '🔄'
        );
    }

    showTSAExample() {
        this.showExamplePopup(
            'Total Surface Area (TSA)',
            'TSA includes the curved side PLUS the top and bottom circles!',
            'So we add: Curved side (2πrh) + Top circle (πr²) + Bottom circle (πr²) = 2πrh + 2πr²',
            '📦'
        );
    }

    showVolumeExample() {
        this.showExamplePopup(
            'Volume',
            'Volume tells us how much space is inside the cylinder!',
            'Think of it like how much water a water bottle can hold, or how much dal fits in a tiffin box.',
            '💧'
        );
    }

    showExamplePopup(title, subtitle, description, icon) {
        // Remove existing popup if any
        const existingPopup = document.querySelector('.example-popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create popup
        const popup = document.createElement('div');
        popup.className = 'example-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            border: 3px solid #3b82f6;
        `;

        popup.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 15px;">${icon}</div>
            <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 1.5rem; font-weight: 700;">${title}</h3>
            <p style="margin: 0 0 15px 0; color: #3b82f6; font-weight: 600; font-size: 1.1rem;">${subtitle}</p>
            <p style="margin: 0 0 20px 0; color: #475569; line-height: 1.6;">${description}</p>
            <button onclick="this.parentElement.remove()" style="background: #3b82f6; color: white; border: none; padding: 12px 25px; border-radius: 25px; font-weight: 600; cursor: pointer;">
                Got it! 👍
            </button>
        `;

        document.body.appendChild(popup);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.remove();
            }
        }, 5000);
    }

    continueToQuiz() {
        console.log('Continuing to quiz...');
        
        // Add button click effect
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                continueBtn.style.transform = 'scale(1)';
            }, 150);
        }

        // Navigate to quiz using the app's navigation
        if (window.app && window.app.nextScreen) {
            window.app.nextScreen();
        } else {
            console.error('App navigation not available');
            // Fallback: try to navigate directly
            this.navigateToQuiz();
        }
    }

    navigateToQuiz() {
        console.log('Attempting direct navigation to quiz...');
        
        // Try to find the next screen from config
        if (window.getNextScreen && window.getNextScreen('summary')) {
            const nextScreen = window.getNextScreen('summary');
            console.log('Next screen from config:', nextScreen);
            
            if (window.app && window.app.loadScreen) {
                window.app.loadScreen(nextScreen);
            }
        } else {
            console.error('Navigation config not available');
            // Show a message to the user
            this.showNavigationMessage();
        }
    }

    showNavigationMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
        `;
        message.innerHTML = `
            <h3>Navigation Issue</h3>
            <p>Please use the navigation buttons to continue.</p>
            <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 8px 16px; border-radius: 5px; border: none; background: #10b981; color: white; cursor: pointer;">OK</button>
        `;
        document.body.appendChild(message);
    }

    destroy() {
        console.log('SummaryScreen destroyed');
        // Clean up any event listeners if needed
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SummaryScreen;
}

// Make it globally available
window.SummaryScreen = SummaryScreen;
