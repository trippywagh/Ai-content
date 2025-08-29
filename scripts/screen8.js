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
    }

    wireEvents() {
        // Selection buttons
        this.selectABtn.addEventListener('click', () => this.selectBeaker('A'));
        this.selectBBtn.addEventListener('click', () => this.selectBeaker('B'));
        this.selectEqualBtn.addEventListener('click', () => this.selectBeaker('equal'));
        
        // Fill button
        this.fillBtn.addEventListener('click', () => this.startWaterFill());
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
        } else if (choice === 'B') {
            this.selectBBtn.classList.add('selected');
            this.beakerBElement.classList.add('selected');
            this.selectedBeaker = 'B';
        } else if (choice === 'equal') {
            this.selectEqualBtn.classList.add('selected');
            this.selectedBeaker = 'equal';
        }
        
        // Show simulation controls
        this.simControls.style.display = 'block';
        this.fillBtn.disabled = false;
        this.fillBtn.textContent = '🧪 Start Water Fill Simulation';
    }

    calculateVolumes() {
        const volumeA = Math.PI * this.beakerA.radius ** 2 * this.beakerA.height;
        const volumeB = Math.PI * this.beakerB.radius ** 2 * this.beakerB.height;
        
        console.log(`Beaker A Volume: ${volumeA.toFixed(2)} cm³`);
        console.log(`Beaker B Volume: ${volumeB.toFixed(2)} cm³`);
        console.log(`Are they equal? ${Math.abs(volumeA - volumeB) < 0.01 ? 'YES!' : 'NO'}`);
        
        return { volumeA, volumeB };
    }

    startWaterFill() {
        if (!this.selectedBeaker) return;
        
        const { volumeA, volumeB } = this.calculateVolumes();
        const isEqual = Math.abs(volumeA - volumeB) < 0.01;
        
        // Reset water levels for SVG elements
        this.waterA.setAttribute('height', '0');
        this.waterA.setAttribute('y', '180'); // Reset to bottom of beaker A
        this.waterB.setAttribute('height', '0');
        this.waterB.setAttribute('y', '70'); // Reset to bottom of beaker B
        
        this.counterA.style.opacity = '0';
        this.counterB.style.opacity = '0';
        
        // Start filling animation
        this.animateWaterFill(this.waterA, volumeA, this.counterA, 'A');
        this.animateWaterFill(this.waterB, volumeB, this.counterB, 'B');
        
        // Show explanation after animation
        setTimeout(() => {
            this.showExplanation(volumeA, volumeB, isEqual);
        }, 2500);
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

    destroy() {
        // Clean up event listeners if needed
        if (this.selectABtn) this.selectABtn.removeEventListener('click', () => this.selectBeaker('A'));
        if (this.selectBBtn) this.selectBBtn.removeEventListener('click', () => this.selectBeaker('B'));
        if (this.selectEqualBtn) this.selectEqualBtn.removeEventListener('click', () => this.selectBeaker('equal'));
        if (this.fillBtn) this.fillBtn.removeEventListener('click', () => this.startWaterFill());
    }
}

