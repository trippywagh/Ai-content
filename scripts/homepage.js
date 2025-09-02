// Homepage JavaScript - Handles concept card interactions and navigation

class HomepageScreen {
    constructor() {
        this.init();
    }

    init() {
        console.log('Homepage screen initialized');
        this.wireEvents();
        this.startAnimations();
    }

    wireEvents() {
        // Handle concept card clicks
        const conceptCards = document.querySelectorAll('.concept-card');
        conceptCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleConceptClick(e);
            });
        });

        // Add hover effects for available cards
        const availableCards = document.querySelectorAll('.concept-card.available');
        availableCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }

    handleConceptClick(event) {
        const card = event.currentTarget;
        const concept = card.dataset.concept;
        
        // Only allow clicks on available concepts
        if (!card.classList.contains('available')) {
            this.showLockedMessage(card);
            return;
        }

        // Handle right circular cylinder (start learning)
        if (concept === 'right-circular-cylinder') {
            this.startCylinderLearning();
        }
        // Handle completed concepts (revisit)
        else if (card.classList.contains('completed')) {
            this.showRevisitMessage(card, concept);
        }
    }

    showLockedMessage(card) {
        // Create a temporary message overlay
        const message = document.createElement('div');
        message.className = 'locked-message';
        message.innerHTML = `
            <div class="message-content">
                <div class="message-icon">🔒</div>
                <p>This concept is coming soon!</p>
                <p>Complete the current concepts to unlock more.</p>
            </div>
        `;
        
        // Style the message
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            animation: messageAppear 0.3s ease;
        `;

        // Add animation keyframes
        if (!document.getElementById('messageAnimation')) {
            const style = document.createElement('style');
            style.id = 'messageAnimation';
            style.textContent = `
                @keyframes messageAppear {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(message);

        // Remove message after 2 seconds
        setTimeout(() => {
            message.style.animation = 'messageAppear 0.3s ease reverse';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 2000);
    }

    showRevisitMessage(card, concept) {
        // Create a temporary message overlay for completed concepts
        const message = document.createElement('div');
        message.className = 'revisit-message';
        message.innerHTML = `
            <div class="message-content">
                <div class="message-icon">✅</div>
                <p>This concept is already completed!</p>
                <p>You can revisit it anytime to refresh your knowledge.</p>
                <div class="message-buttons">
                    <button class="revisit-btn" onclick="this.parentElement.parentElement.parentElement.remove()">Maybe Later</button>
                    <button class="revisit-btn primary" onclick="this.parentElement.parentElement.parentElement.remove()">Revisit Now</button>
                </div>
            </div>
        `;
        
        // Style the message
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            animation: messageAppear 0.3s ease;
            max-width: 400px;
        `;

        // Add button styles
        const style = document.createElement('style');
        style.textContent = `
            .message-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 20px;
            }
            .revisit-btn {
                padding: 10px 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .revisit-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.5);
            }
            .revisit-btn.primary {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.6);
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(message);

        // Remove message after 5 seconds if not interacted with
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'messageAppear 0.3s ease reverse';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 300);
            }
        }, 5000);
    }

    startCylinderLearning() {
        console.log('Starting Right Circular Cylinder learning journey...');
        
        // Add a nice transition effect
        const container = document.querySelector('.homepage-container');
        container.style.animation = 'fadeOut 0.5s ease forwards';
        
        // Add fade out animation
        if (!document.getElementById('fadeAnimation')) {
            const style = document.createElement('style');
            style.id = 'fadeAnimation';
            style.textContent = `
                @keyframes fadeOut {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.95); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Navigate to screen 1 after animation
        setTimeout(() => {
            if (window.app) {
                window.app.loadScreenDirectly(1);
            }
        }, 500);
    }

    addHoverEffect(card) {
        // Add a subtle glow effect
        card.style.boxShadow = '0 15px 40px rgba(72, 187, 120, 0.4)';
        card.style.transform = 'translateY(-8px) scale(1.02)';
        
        // Add a pulse effect to the start button
        const startButton = card.querySelector('.start-button');
        if (startButton) {
            startButton.style.animation = 'pulse 1s ease infinite';
        }
    }

    removeHoverEffect(card) {
        // Remove hover effects
        card.style.boxShadow = '';
        card.style.transform = '';
        
        // Remove pulse effect from start button
        const startButton = card.querySelector('.start-button');
        if (startButton) {
            startButton.style.animation = '';
        }
    }

    startAnimations() {
        // Add staggered animation to concept cards
        const cards = document.querySelectorAll('.concept-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100 + 500); // Stagger the animations
        });

        // Add pulse animation to the start button
        if (!document.getElementById('pulseAnimation')) {
            const style = document.createElement('style');
            style.id = 'pulseAnimation';
            style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    destroy() {
        // Clean up event listeners and animations
        const conceptCards = document.querySelectorAll('.concept-card');
        conceptCards.forEach(card => {
            card.removeEventListener('click', this.handleConceptClick);
            card.removeEventListener('mouseenter', this.addHoverEffect);
            card.removeEventListener('mouseleave', this.removeHoverEffect);
        });
    }
}

// Make the class globally available
window.HomepageScreen = HomepageScreen;
