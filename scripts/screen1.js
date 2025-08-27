// Screen 1: Can Question Screen JavaScript

class CanQuestionScreen {
    constructor() {
        this.feedback = null;
        this.rectangle = null;
        this.cokeCan3D = null;
        this.selectedOption = null;
        this.init();
    }

    init() {
        // Create floating particles
        this.createParticles();
        
        // Get DOM elements
        this.feedback = document.getElementById('feedback');
        this.rectangle = document.getElementById('rectangle');
        
        // Initialize 3D Coke can
        this.init3DCokeCan();
        
        // Add event listeners for multiple choice options
        this.addEventListeners();
    }

    init3DCokeCan() {
        // Wait a bit for the DOM to be ready
        setTimeout(() => {
            try {
                // Create 3D container
                const canContainer = document.querySelector('.can-container');
                if (canContainer) {
                    // Clear existing content
                    canContainer.innerHTML = '<div id="coke-can-3d" style="width: 100%; height: 100%;"></div>';
                    
                    // Initialize 3D Coke can
                    this.cokeCan3D = new CokeCan3D('coke-can-3d');
                    
                    // Start with auto-rotation
                    setTimeout(() => {
                        if (this.cokeCan3D) {
                            this.cokeCan3D.startAutoRotation();
                        }
                    }, 1000);
                }
            } catch (error) {
                console.error('Error initializing 3D Coke can:', error);
                // Fallback to CSS can if 3D fails
                this.createFallbackCan();
            }
        }, 100);
    }

    createFallbackCan() {
        const canContainer = document.querySelector('.can-container');
        if (canContainer) {
            canContainer.innerHTML = `
                <div class="can">
                    <div class="can-top"></div>
                    <div class="can-bottom"></div>
                    <div class="can-label">
                        <div class="coke-logo"></div>
                        <div class="can-design">
                            <div class="wave-pattern"></div>
                        </div>
                    </div>
                    <div class="pull-tab"></div>
                </div>
            `;
        }
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    addEventListeners() {
        // Add click listeners to all options
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.selectOption(option);
            });
        });

        // Add 3D can interaction hints
        this.add3DInteractionHints();
    }

    selectOption(selectedOption) {
        // Remove previous selection
        const allOptions = document.querySelectorAll('.option');
        allOptions.forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
        });

        // Add selection class
        selectedOption.classList.add('selected');
        
        // Get the answer
        const answer = selectedOption.getAttribute('data-answer');
        this.selectedOption = answer;
        
        // Check the answer
        this.checkAnswer(answer);
    }

    add3DInteractionHints() {
        const canContainer = document.querySelector('.can-container');
        if (canContainer) {
            // Add interaction instructions
            const instructions = document.createElement('div');
            instructions.className = 'interaction-hints';
            instructions.innerHTML = `
                <div class="hint-text">
                    <p>🎮 <strong>3D Controls:</strong></p>
                    <p>• <strong>Drag</strong> to rotate the dabba</p>
                    <p>• <strong>Scroll</strong> to zoom in/out</p>
                    <p>• <strong>Hover</strong> to pause auto-rotation</p>
                </div>
            `;
            canContainer.appendChild(instructions);
        }
    }

    checkAnswer(answer) {
        let message = '';
        let type = '';
        let isCorrect = false;

        switch (answer) {
            case 'rectangle':
                message = '🎉 Perfect! You got it right! When you peel the sticker off a cylindrical dabba and spread it flat, it becomes a rectangle! 🌟';
                type = 'correct';
                isCorrect = true;
                break;
            case 'square':
                message = 'Close! Think about the shape - a cylinder has height and circumference. When flattened, what does that make? 🤔';
                type = 'incorrect';
                break;
            case 'circle':
                message = 'Good thinking! But remember, we\'re peeling off the sticker (the label) and spreading it flat, not the top or bottom! 🔍';
                type = 'incorrect';
                break;
            case 'something-else':
                message = 'Interesting choice! But let\'s think about this - when you unroll a cylinder\'s label, what shape do you get? 📐';
                type = 'incorrect';
                break;
            default:
                message = 'Please select an option! 🎯';
                type = 'incorrect';
                break;
        }

        // Show feedback
        this.showFeedback(message, type);

        // If correct, show the answer and stop auto-rotation
        if (isCorrect) {
            // Stop auto-rotation and let user explore the 3D can
            if (this.cokeCan3D) {
                this.cokeCan3D.stopAutoRotation();
            }
            
            // Mark the correct option
            const correctOption = document.querySelector('[data-answer="rectangle"]');
            if (correctOption) {
                correctOption.classList.add('correct');
            }
            
            // Show the rectangle answer after a delay
            setTimeout(() => {
                this.showRectangle();
            }, 2000);
        } else {
            // Mark the selected option as incorrect
            const selectedOption = document.querySelector('.option.selected');
            if (selectedOption) {
                selectedOption.classList.add('incorrect');
            }
        }
    }

    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${type} show`;
        
        setTimeout(() => {
            this.feedback.classList.remove('show');
        }, 5000);
    }

    showRectangle() {
        this.rectangle.classList.add('show');
        
        // Add some celebration effects
        setTimeout(() => {
            this.rectangle.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                this.rectangle.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
        }, 500);
    }

    // Method to clean up when leaving screen
    destroy() {
        // Clean up 3D can
        if (this.cokeCan3D) {
            this.cokeCan3D.destroy();
        }
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanQuestionScreen;
}
