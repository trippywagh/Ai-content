class BeakerSimScreen {
    constructor() {
        this.selectedBeaker = null;
        this.beakerA = { radius: 3, height: 100 };
        this.beakerB = { radius: 15, height: 4 };
        this.init();
    }

    init() {
        this.getDOMElements();
        this.wireEvents();
        this.calculateVolumes();
        this.initializeWaterFill();
    }

    initializeWaterFill() {
        // Ensure water fill elements start empty
        if (this.waterA) {
            this.waterA.setAttribute('height', '0');
            this.waterA.setAttribute('y', '180'); // Bottom of beaker A
        }
        if (this.waterB) {
            this.waterB.setAttribute('height', '0');
            this.waterB.setAttribute('y', '70'); // Bottom of beaker B
        }
    }

    showPopup() {
        // Show the popup overlay
        this.popupOverlay.style.display = 'flex';
        // Hide simulation controls for wrong answers
        this.simControls.style.display = 'none';
        // Play audio for the popup message
        this.speakPopupMessage();
    }

    hidePopup() {
        // Hide the popup overlay
        this.popupOverlay.style.display = 'none';
        // Stop any ongoing speech
        this.stopSpeech();
    }

    speakPopupMessage() {
        // Get the audio element
        const audioElement = document.getElementById('popupAudio');
        
        if (audioElement) {
            // Show audio indicator
            this.audioIndicator.style.display = 'flex';
            
            // Set up audio event listeners
            audioElement.onended = () => {
                this.hideAudioIndicator();
                // Show second popup after audio finishes
                setTimeout(() => {
                    this.showSimulationPopup();
                }, 500);
            };
            
            audioElement.onerror = () => {
                this.hideAudioIndicator();
                console.log('Audio file not found or error occurred');
                // Show second popup even if audio fails
                setTimeout(() => {
                    this.showSimulationPopup();
                }, 500);
            };
            
            // Play the audio
            audioElement.currentTime = 0; // Reset to beginning
            audioElement.play().catch(error => {
                console.log('Audio playback failed:', error);
                this.hideAudioIndicator();
            });
            
            // Store reference to stop it later if needed
            this.currentAudio = audioElement;
        } else {
            // Hide audio indicator if audio element not found
            this.hideAudioIndicator();
        }
    }

    stopSpeech() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        this.hideAudioIndicator();
    }

    hideAudioIndicator() {
        if (this.audioIndicator) {
            this.audioIndicator.style.display = 'none';
        }
    }

    showSimulationPopup() {
        // Hide first popup
        this.hidePopup();
        // Show second popup
        this.simulationPopupOverlay.style.display = 'flex';
    }

    hideSimulationPopup() {
        // Hide second popup
        this.simulationPopupOverlay.style.display = 'none';
        // Show main simulation controls
        this.simControls.style.display = 'block';
    }

    getDOMElements() {
        // Selection buttons
        this.selectABtn = document.getElementById('selectA');
        this.selectBBtn = document.getElementById('selectB');
        this.selectEqualBtn = document.getElementById('selectEqual');
        
        // Simulation controls
        this.simControls = document.getElementById('simControls');
        this.fillBtn = document.getElementById('fillBtn');
        
        // Beaker elements
        this.beakerAElement = document.getElementById('beakerA');
        this.beakerBElement = document.getElementById('beakerB');
        
        // SVG water fill elements
        this.waterA = document.getElementById('waterFillA');
        this.waterB = document.getElementById('waterFillB');
        
        // Volume counters
        this.counterA = document.getElementById('counterA');
        this.counterB = document.getElementById('counterB');
        
        // Explanation
        this.explanation = document.getElementById('explanation');
        
        // Popup elements
        this.popupOverlay = document.getElementById('popupOverlay');
        this.popupCloseBtn = document.getElementById('popupCloseBtn');
        this.audioIndicator = document.getElementById('audioIndicator');
        
        // Second popup elements
        this.simulationPopupOverlay = document.getElementById('simulationPopupOverlay');
        this.simulationPopupCloseBtn = document.getElementById('simulationPopupCloseBtn');
        
        // Popup tap elements
        this.popupTapHandleA = document.getElementById('popupTapHandleA');
        this.popupTapHandleB = document.getElementById('popupTapHandleB');
        this.popupWaterA = document.getElementById('popupWaterFillA');
        this.popupWaterB = document.getElementById('popupWaterFillB');
        this.popupWaterDropsA = document.getElementById('waterDropsA');
        this.popupWaterDropsB = document.getElementById('waterDropsB');
        
        // Main tap elements
        this.tapA = document.getElementById('tapA');
        this.tapB = document.getElementById('tapB');
        this.tapHandleA = document.getElementById('tapHandleA');
        this.tapHandleB = document.getElementById('tapHandleB');
        this.tapStatusA = document.getElementById('tapStatusA');
        this.tapStatusB = document.getElementById('tapStatusB');
        
        // Debug logging
        console.log('Popup 2 elements found:', {
            simulationPopupOverlay: this.simulationPopupOverlay,
            simulationPopupCloseBtn: this.simulationPopupCloseBtn,
            popupTapHandleA: this.popupTapHandleA,
            popupTapHandleB: this.popupTapHandleB,
            popupWaterA: this.popupWaterA,
            popupWaterB: this.popupWaterB
        });
    }

    wireEvents() {
        // Selection buttons
        this.selectABtn.addEventListener('click', () => this.selectBeaker('A'));
        this.selectBBtn.addEventListener('click', () => this.selectBeaker('B'));
        this.selectEqualBtn.addEventListener('click', () => this.selectBeaker('equal'));
        
        // Popup close button
        this.popupCloseBtn.addEventListener('click', () => this.hidePopup());
        
        // Simulation popup close button
        this.simulationPopupCloseBtn.addEventListener('click', () => this.hideSimulationPopup());
        
        // Popup tap interactions
        this.popupTapHandleA.addEventListener('click', () => this.togglePopupTap('A'));
        this.popupTapHandleB.addEventListener('click', () => this.togglePopupTap('B'));
        
        // Main tap interactions
        this.tapHandleA.addEventListener('click', () => this.toggleTap('A'));
        this.tapHandleB.addEventListener('click', () => this.toggleTap('B'));
    }

    selectBeaker(choice) {
        // Remove previous selections
        this.selectABtn.classList.remove('selected');
        this.selectBBtn.classList.remove('selected');
        this.selectEqualBtn.classList.remove('selected');
        this.beakerAElement.classList.remove('selected');
        this.beakerBElement.classList.remove('selected');
        
        // Add selection to chosen option
        if (choice === 'A') {
            this.selectABtn.classList.add('selected');
            this.beakerAElement.classList.add('selected');
            this.selectedBeaker = 'A';
            // Show popup for wrong answer
            this.showPopup();
        } else if (choice === 'B') {
            this.selectBBtn.classList.add('selected');
            this.beakerBElement.classList.add('selected');
            this.selectedBeaker = 'B';
            // Show popup for wrong answer
            this.showPopup();
        } else if (choice === 'equal') {
            this.selectEqualBtn.classList.add('selected');
            this.selectedBeaker = 'equal';
            // Correct answer - show simulation controls
            this.simControls.style.display = 'block';
        }
    }

    calculateVolumes() {
        const volumeA = Math.PI * this.beakerA.radius ** 2 * this.beakerA.height;
        const volumeB = Math.PI * this.beakerB.radius ** 2 * this.beakerB.height;
        
        console.log(`Beaker A Volume: ${volumeA.toFixed(2)} cm³`);
        console.log(`Beaker B Volume: ${volumeB.toFixed(2)} cm³`);
        console.log(`Are they equal? ${Math.abs(volumeA - volumeB) < 0.01 ? 'YES!' : 'NO'}`);
        
        return { volumeA, volumeB };
    }

    toggleTap(tapId) {
        const tapHandle = tapId === 'A' ? this.tapHandleA : this.tapHandleB;
        const tapStatus = tapId === 'A' ? this.tapStatusA : this.tapStatusB;
        const isActive = tapHandle.classList.contains('active');
        
        if (isActive) {
            // Turn tap off
            tapHandle.classList.remove('active');
            tapStatus.textContent = 'OFF';
            tapStatus.classList.remove('active');
            this.stopWaterFlow(tapId);
        } else {
            // Turn tap on
            tapHandle.classList.add('active');
            tapStatus.textContent = 'ON';
            tapStatus.classList.add('active');
            this.startWaterFlow(tapId);
        }
    }

    startWaterFlow(tapId) {
        const waterElement = tapId === 'A' ? this.waterA : this.waterB;
        const counter = tapId === 'A' ? this.counterA : this.counterB;
        const volume = tapId === 'A' ? 
            Math.PI * this.beakerA.radius ** 2 * this.beakerA.height :
            Math.PI * this.beakerB.radius ** 2 * this.beakerB.height;
        
        // Show volume counter
        counter.style.opacity = '1';
        counter.classList.add('show');
        
        // Start water filling animation
        this.animateWaterFill(waterElement, volume, counter, tapId);
    }

    stopWaterFlow(tapId) {
        const waterElement = tapId === 'A' ? this.waterA : this.waterB;
        const counter = tapId === 'A' ? this.counterA : this.counterB;
        
        // Hide volume counter
        counter.style.opacity = '0';
        counter.classList.remove('show');
        
        // Stop water animation (keep current level)
        // Water level stays where it is when tap is turned off
    }

    checkBeakersFull() {
        // Check if both beakers are full
        const waterAHeight = parseFloat(this.waterA.getAttribute('height'));
        const waterBHeight = parseFloat(this.waterB.getAttribute('height'));
        
        const maxHeightA = 160; // Beaker A max height
        const maxHeightB = 60;  // Beaker B max height
        
        if (waterAHeight >= maxHeightA && waterBHeight >= maxHeightB) {
            // Both beakers are full, show explanation
            const { volumeA, volumeB } = this.calculateVolumes();
            const isEqual = Math.abs(volumeA - volumeB) < 0.01;
            
            setTimeout(() => {
                this.showExplanation(volumeA, volumeB, isEqual);
            }, 1000);
        }
    }

    animateWaterFill(waterElement, volume, counter, beakerId) {
        // For SVG water fill, we need to animate the fill height
        // The SVG water fill elements are positioned at the bottom and will grow upward
        
        // Calculate fill height based on volume and beaker dimensions
        let fillHeight;
        if (beakerId === 'A') {
            // Beaker A: r=3, h=100 - tall and slim
            fillHeight = Math.min(160, (volume / 2827.4) * 160); // 160 is the height of beaker A
        } else {
            // Beaker B: r=15, h=4 - short and wide  
            fillHeight = Math.min(60, (volume / 2827.4) * 60); // 60 is the height of beaker B
        }
        
        // Animate water filling by adjusting the y position and height
        setTimeout(() => {
            if (beakerId === 'A') {
                // For tall beaker, water fills from bottom up
                waterElement.setAttribute('y', 180 - fillHeight); // 180 = 20 + 160 - fillHeight
                waterElement.setAttribute('height', fillHeight);
            } else {
                // For wide beaker, water fills from bottom up
                waterElement.setAttribute('y', 70 - fillHeight); // 70 = 10 + 60 - fillHeight
                waterElement.setAttribute('height', fillHeight);
            }
            
            // Show and update volume counter
            counter.style.opacity = '1';
            counter.classList.add('show');
            
            let currentVolume = 0;
            const targetVolume = volume;
            const increment = targetVolume / 50; // 50 steps for smooth animation
            
            const updateCounter = () => {
                if (currentVolume < targetVolume) {
                    currentVolume += increment;
                    counter.textContent = `Volume: ${Math.min(currentVolume, targetVolume).toFixed(1)} cm³`;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = `Volume: ${targetVolume.toFixed(1)} cm³`;
                }
            };
            
            updateCounter();
        }, 100);
        
        // Check if beakers are full after animation
        setTimeout(() => {
            this.checkBeakersFull();
        }, 2500);
    }

    showExplanation(volumeA, volumeB, isEqual) {
        const { volumeA: vA, volumeB: vB } = this.calculateVolumes();
        
        let explanationText = '';
        let resultClass = '';
        
        if (isEqual) {
            explanationText = `
                <h3>🎯 Amazing Discovery!</h3>
                <p>You're absolutely right! Both beakers hold exactly the same amount of water!</p>
                <div class="volume-comparison">
                    <p><strong>Beaker A:</strong> V = π × (3)² × 100 = ${vA.toFixed(1)} cm³</p>
                    <p><strong>Beaker B:</strong> V = π × (15)² × 4 = ${vB.toFixed(1)} cm³</p>
                </div>
                <p><strong>Key Insight:</strong> Even though one beaker is tall and slim (r=3, h=100) and the other is short and wide (r=15, h=4), they have the same volume because:</p>
                <ul>
                    <li>Volume depends on both radius² and height</li>
                    <li>A bigger base (radius) can balance a shorter height</li>
                    <li>V = πr²h shows how these dimensions work together</li>
                </ul>
            `;
            resultClass = 'correct';
        } else {
            const larger = vA > vB ? 'A' : 'B';
            const smaller = vA > vB ? 'B' : 'A';
            const difference = Math.abs(vA - vB);
            
            explanationText = `
                <h3>🔍 Volume Analysis</h3>
                <p>Interesting! The beakers actually have different volumes:</p>
                <div class="volume-comparison">
                    <p><strong>Beaker A:</strong> V = π × (3)² × 100 = ${vA.toFixed(1)} cm³</p>
                    <p><strong>Beaker B:</strong> V = π × (15)² × 4 = ${vB.toFixed(1)} cm³</p>
                    <p><strong>Difference:</strong> ${difference.toFixed(1)} cm³</p>
                </div>
                <p><strong>Why?</strong> Even though Beaker B has a much larger radius (15 vs 3), its height is much smaller (4 vs 100). The volume formula V = πr²h shows that both dimensions matter!</p>
            `;
            resultClass = 'different';
        }
        
        this.explanation.innerHTML = explanationText;
        this.explanation.className = `explanation show ${resultClass}`;
        
        // Scroll to explanation
        this.explanation.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    togglePopupTap(tapId) {
        const tapHandle = tapId === 'A' ? this.popupTapHandleA : this.popupTapHandleB;
        const waterElement = tapId === 'A' ? this.popupWaterA : this.popupWaterB;
        
        // Toggle tap state
        if (tapHandle.classList.contains('active')) {
            // Turn off tap
            tapHandle.classList.remove('active');
            this.stopPopupWaterFlow(tapId);
        } else {
            // Turn on tap
            tapHandle.classList.add('active');
            this.startPopupWaterFlow(tapId);
        }
    }

    startPopupWaterFlow(tapId) {
        const waterElement = tapId === 'A' ? this.popupWaterA : this.popupWaterB;
        
        // Start water drops animation
        this.startWaterDrops(tapId);
        
        // Start water fill animation
        this.animatePopupWaterFill(tapId, waterElement);
    }

    stopPopupWaterFlow(tapId) {
        // Stop water drops animation
        this.stopWaterDrops(tapId);
        
        // Water level stays where it is
        console.log(`Popup tap ${tapId} turned off`);
    }

    startWaterDrops(tapId) {
        const dropsContainer = tapId === 'A' ? this.popupWaterDropsA : this.popupWaterDropsB;
        if (!dropsContainer) return;
        
        // Clear existing drops
        dropsContainer.innerHTML = '';
        
        // Create multiple water drops with staggered timing
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                if (this.isPopupTapActive(tapId)) {
                    this.createWaterDrop(dropsContainer, i);
                }
            }, i * 200); // Stagger drops by 200ms
        }
        
        // Continue creating drops while tap is active
        this.waterDropInterval = setInterval(() => {
            if (this.isPopupTapActive(tapId)) {
                this.createWaterDrop(dropsContainer, Math.random() * 5);
            } else {
                clearInterval(this.waterDropInterval);
            }
        }, 300);
    }

    stopWaterDrops(tapId) {
        if (this.waterDropInterval) {
            clearInterval(this.waterDropInterval);
        }
        
        const dropsContainer = tapId === 'A' ? this.popupWaterDropsA : this.popupWaterDropsB;
        if (dropsContainer) {
            // Fade out existing drops
            const drops = dropsContainer.querySelectorAll('.water-drop');
            drops.forEach(drop => {
                drop.style.animation = 'none';
                drop.style.opacity = '0';
                drop.style.transition = 'opacity 0.5s ease';
            });
            
            // Remove drops after fade
            setTimeout(() => {
                dropsContainer.innerHTML = '';
            }, 500);
        }
    }

    createWaterDrop(container, index) {
        const drop = document.createElement('div');
        drop.className = 'water-drop';
        drop.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(drop);
        
        // Remove drop after animation
        setTimeout(() => {
            if (drop.parentNode) {
                drop.remove();
            }
        }, 1000);
    }

    animatePopupWaterFill(tapId, waterElement) {
        if (!waterElement) return;
        
        // Get current water height
        let currentHeight = parseFloat(waterElement.getAttribute('height') || 0);
        const maxHeight = tapId === 'A' ? 160 : 60; // Height values from SVG
        const increment = maxHeight / 100; // 100 steps for smooth animation
        
        const animate = () => {
            if (currentHeight < maxHeight && this.isPopupTapActive(tapId)) {
                currentHeight += increment;
                
                if (tapId === 'A') {
                    // For tall beaker A - water fills from bottom up
                    waterElement.setAttribute('height', currentHeight);
                    waterElement.setAttribute('y', 180 - currentHeight); // Start from bottom (y=180) and grow up
                } else {
                    // For wide beaker B - water fills from bottom up
                    waterElement.setAttribute('height', currentHeight);
                    waterElement.setAttribute('y', 70 - currentHeight); // Start from bottom (y=70) and grow up
                }
                
                // Update volume counter
                this.updatePopupVolumeCounter(tapId, currentHeight, maxHeight);
                
                requestAnimationFrame(animate);
            } else if (currentHeight >= maxHeight) {
                // Beaker is full
                this.showPopupVolumeComplete(tapId);
            }
        };
        
        animate();
    }

    updatePopupVolumeCounter(tapId, currentHeight, maxHeight) {
        const beaker = tapId === 'A' ? this.beakerA : this.beakerB;
        const volume = this.calculateBeakerVolume(beaker.radius, currentHeight);
        
        // Find or create volume counter
        let counter = document.querySelector(`#popupBeaker${tapId} .popup-volume-counter`);
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'popup-volume-counter';
            counter.style.cssText = `
                position: absolute;
                top: ${tapId === 'A' ? '10px' : '10px'};
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 12px;
                    font-weight: bold;
                z-index: 10;
            `;
            document.querySelector(`#popupBeaker${tapId}`).appendChild(counter);
        }
        
        counter.textContent = `Volume: ${volume.toFixed(1)} cm³`;
        counter.style.opacity = '1';
    }

    showPopupVolumeComplete(tapId) {
        const beaker = tapId === 'A' ? this.beakerA : this.beakerB;
        const totalVolume = this.calculateBeakerVolume(beaker.radius, beaker.height);
        
        let counter = document.querySelector(`#popupBeaker${tapId} .popup-volume-counter`);
        if (counter) {
            counter.textContent = `FULL! ${totalVolume.toFixed(1)} cm³`;
            // Keep black background as per original design
            counter.style.background = 'rgba(0, 0, 0, 0.8)';
        }
        
        // Automatically turn off the tap when beaker is full
        this.autoStopTap(tapId);
    }

    autoStopTap(tapId) {
        const tapHandle = tapId === 'A' ? this.popupTapHandleA : this.popupTapHandleB;
        
        // Remove active state
        tapHandle.classList.remove('active');
        
        // Stop water drops
        this.stopWaterDrops(tapId);
        
        console.log(`Tap ${tapId} automatically stopped - beaker is full!`);
    }

    calculateBeakerVolume(radius, height) {
        return Math.PI * radius * radius * height;
    }

    isPopupTapActive(tapId) {
        const tapHandle = tapId === 'A' ? this.popupTapHandleA : this.popupTapHandleB;
        return tapHandle.classList.contains('active');
    }

    destroy() {
        // Clean up event listeners if needed
        if (this.selectABtn) this.selectABtn.removeEventListener('click', () => this.selectBeaker('A'));
        if (this.selectBBtn) this.selectBBtn.removeEventListener('click', () => this.selectBeaker('B'));
        if (this.selectEqualBtn) this.selectEqualBtn.removeEventListener('click', () => this.selectBeaker('equal'));
        if (this.fillBtn) this.fillBtn.removeEventListener('click', () => this.startWaterFill());
    }
}

