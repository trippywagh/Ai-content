// Screen 5: Interactive Cylinder Simulation

class CylinderSimScreen {
    constructor() {
        this.radius = 4; // cm
        this.height = 10; // cm
        this.showTopBottom = true;
        this.showLabel = false;
        this.fillWater = false;
        this.elements = {};
        this.init();
    }

    init() {
        // Controls
        this.elements.rSlider = document.getElementById('rSlider');
        this.elements.hSlider = document.getElementById('hSlider');
        this.elements.rVal = document.getElementById('rVal');
        this.elements.hVal = document.getElementById('hVal');
        this.elements.btnLabel = document.getElementById('btnLabel');
        this.elements.btnFill = document.getElementById('btnFill');
        this.elements.btnTopBottom = document.getElementById('btnTopBottom');
        this.elements.hint = document.getElementById('hint');

        // Results
        this.elements.csa = document.getElementById('csa');
        this.elements.tsa = document.getElementById('tsa');
        this.elements.volume = document.getElementById('volume');
        this.elements.capacity = document.getElementById('capacity');

        // Viz
        this.elements.cyl = document.getElementById('cyl');
        this.elements.svg = document.getElementById('cylinderSVG');
        this.elements.top = document.getElementById('cylTop');
        this.elements.bottom = document.getElementById('cylBottom');
        this.elements.sideLeft = document.getElementById('cylSideLeft');
        this.elements.sideRight = document.getElementById('cylSideRight');
        this.elements.fill = document.getElementById('cylFill');
        this.elements.waterSurface = document.getElementById('waterSurface');
        this.elements.radiusLabel = document.getElementById('radiusLabel');
        this.elements.radiusLine = document.getElementById('radiusLine');
        this.elements.heightLabel = document.getElementById('heightLabel');
        this.elements.heightLine = document.getElementById('heightLine');
        this.elements.unwrap = document.getElementById('unwrap');

        // Wire events
        this.wireControls();

        // Initial render
        this.updateAll();
        
        // Ensure water fill is properly initialized
        this.initializeWaterFill();

        // Nudge after first render
        setTimeout(() => {
            if (this.elements.hint) {
                this.elements.hint.textContent = 'Try doubling r while keeping h same. What happens to CSA vs Volume?';
            }
        }, 600);
    }

    wireControls() {
        this.elements.rSlider.addEventListener('input', (e) => {
            this.radius = parseFloat(e.target.value);
            this.updateAll();
        });
        this.elements.hSlider.addEventListener('input', (e) => {
            this.height = parseFloat(e.target.value);
            this.updateAll();
        });

        this.elements.btnLabel.addEventListener('click', () => {
            this.showLabel = !this.showLabel;
            this.elements.btnLabel.classList.toggle('active', this.showLabel);
            this.updateUnwrap();
        });
        this.elements.btnFill.addEventListener('click', () => {
            this.fillWater = !this.fillWater;
            this.elements.btnFill.classList.toggle('active', this.fillWater);
            this.updateFill();
        });
        this.elements.btnTopBottom.addEventListener('click', () => {
            this.showTopBottom = !this.showTopBottom;
            this.elements.btnTopBottom.classList.toggle('active', this.showTopBottom);
            this.updateEnds();
        });
    }

    updateAll() {
        // Update labels
        this.elements.rVal.textContent = `${this.radius.toFixed(1)} cm`;
        this.elements.hVal.textContent = `${this.height.toFixed(1)} cm`;

        // Update formulas
        const pi = Math.PI;
        const r = this.radius;
        const h = this.height;
        const csa = 2 * pi * r * h; // cm^2
        const tsa = 2 * pi * r * h + 2 * pi * r * r; // cm^2
        const vol = pi * r * r * h; // cm^3
        const liters = vol / 1000; // 1000 cm^3 = 1 L

        this.elements.csa.textContent = `${csa.toFixed(1)} cm²`;
        this.elements.tsa.textContent = `${tsa.toFixed(1)} cm²`;
        this.elements.volume.textContent = `${vol.toFixed(1)} cm³`;
        this.elements.capacity.textContent = `${liters.toFixed(2)} L`;

        // Update SVG cylinder dimensions - actually scale the cylinder size
        const scale = 8; // pixels per cm for better visibility
        const radiusPx = r * scale;
        const heightPx = h * scale;
        
        // Keep cylinder centered but scale its actual size
        const centerX = 200;
        const centerY = 150;
        const topY = centerY - heightPx/2;
        const bottomY = centerY + heightPx/2;
        
        console.log('Scaling cylinder:', { r, h, radiusPx, heightPx, topY, bottomY });
        
        // Update top and bottom ellipses - scale the actual radius
        this.elements.top.setAttribute('cx', centerX);
        this.elements.top.setAttribute('cy', topY);
        this.elements.top.setAttribute('rx', radiusPx);
        this.elements.top.setAttribute('ry', radiusPx * 0.25); // Slight perspective
        
        this.elements.bottom.setAttribute('cx', centerX);
        this.elements.bottom.setAttribute('cy', bottomY);
        this.elements.bottom.setAttribute('rx', radiusPx);
        this.elements.bottom.setAttribute('ry', radiusPx * 0.25);
        
        // Update side lines - scale the actual width and height
        this.elements.sideLeft.setAttribute('x1', centerX - radiusPx);
        this.elements.sideLeft.setAttribute('y1', topY);
        this.elements.sideLeft.setAttribute('x2', centerX - radiusPx);
        this.elements.sideLeft.setAttribute('y2', bottomY);
        
        this.elements.sideRight.setAttribute('x1', centerX + radiusPx);
        this.elements.sideRight.setAttribute('y1', topY);
        this.elements.sideRight.setAttribute('x2', centerX + radiusPx);
        this.elements.sideRight.setAttribute('y2', bottomY);
        
        // Update water fill dimensions - scale with cylinder
        this.elements.fill.setAttribute('x', centerX - radiusPx);
        this.elements.fill.setAttribute('width', radiusPx * 2);
        
        // Update dimension labels and lines - position relative to scaled cylinder
        this.elements.radiusLabel.setAttribute('x', centerX + radiusPx + 15);
        this.elements.radiusLabel.setAttribute('y', centerY);
        this.elements.radiusLine.setAttribute('x1', centerX + radiusPx);
        this.elements.radiusLine.setAttribute('x2', centerX + radiusPx + 20);
        this.elements.radiusLine.setAttribute('y1', centerY);
        this.elements.radiusLine.setAttribute('y2', centerY);
        
        this.elements.heightLabel.setAttribute('x', centerX + 15);
        this.elements.heightLabel.setAttribute('y', bottomY + 20);
        this.elements.heightLine.setAttribute('x1', centerX);
        this.elements.heightLine.setAttribute('y1', bottomY);
        this.elements.heightLine.setAttribute('x2', centerX);
        this.elements.heightLine.setAttribute('y2', bottomY + 20);

        // Unwrapped rectangle size = (2πr) x h
        const unwrapW = 2 * Math.PI * r * 10; // scale 10 px per cm
        const unwrapH = h * 10;
        this.elements.unwrap.style.width = `${unwrapW}px`;
        this.elements.unwrap.style.height = `${unwrapH}px`;

        // Update dependent visual subparts
        this.updateEnds();
        this.updateFill();
        this.updateUnwrap();
    }

    updateEnds() {
        this.elements.top.style.display = this.showTopBottom ? 'block' : 'none';
        this.elements.bottom.style.display = this.showTopBottom ? 'block' : 'none';
    }

    updateFill() {
        if (!this.fillWater) {
            // Hide water completely
            this.elements.fill.style.display = 'none';
            this.elements.waterSurface.style.display = 'none';
            return;
        }
        
        // Show water fill
        this.elements.fill.style.display = 'block';
        this.elements.waterSurface.style.display = 'block';
        
        // Get current cylinder dimensions
        const centerX = 200;
        const centerY = 150;
        const scale = 8;
        const radiusPx = this.radius * scale;
        const heightPx = this.height * scale;
        const topY = centerY - heightPx/2;
        const bottomY = centerY + heightPx/2;
        
        console.log('Water fill:', { radiusPx, heightPx, topY, bottomY, fillWater: this.fillWater });
        
        // Animate water filling from bottom to top (like Screen 8)
        this.animateWaterFill(topY, bottomY, radiusPx);
    }
    
    animateWaterFill(topY, bottomY, radiusPx) {
        // Start with empty water
        this.elements.fill.setAttribute('height', '0');
        this.elements.fill.setAttribute('y', bottomY);
        
        // Animate water filling to the top
        setTimeout(() => {
            // Water fills from bottom to top
            this.elements.fill.setAttribute('y', topY);
            this.elements.fill.setAttribute('height', bottomY - topY);
            
            // Update water surface position to match the top
            this.elements.waterSurface.setAttribute('cy', topY);
            this.elements.waterSurface.setAttribute('rx', radiusPx);
            this.elements.waterSurface.setAttribute('ry', radiusPx * 0.25);
            
            console.log('Water animation complete:', {
                fillY: topY,
                fillHeight: bottomY - topY,
                surfaceY: topY
            });
        }, 100);
    }

    updateUnwrap() {
        this.elements.unwrap.classList.toggle('show', this.showLabel);
    }
    
    initializeWaterFill() {
        // Initialize water fill with current dimensions
        const centerX = 200;
        const centerY = 150;
        const scale = 8;
        const radiusPx = this.radius * scale;
        const heightPx = this.height * scale;
        const topY = centerY - heightPx/2;
        const bottomY = centerY + heightPx/2;
        
        // Set initial water fill dimensions (empty)
        this.elements.fill.setAttribute('x', centerX - radiusPx);
        this.elements.fill.setAttribute('y', bottomY);
        this.elements.fill.setAttribute('width', radiusPx * 2);
        this.elements.fill.setAttribute('height', 0); // Start empty
        
        // Set initial water surface position
        this.elements.waterSurface.setAttribute('cx', centerX);
        this.elements.waterSurface.setAttribute('cy', topY);
        this.elements.waterSurface.setAttribute('rx', radiusPx);
        this.elements.waterSurface.setAttribute('ry', radiusPx * 0.25);
        
        console.log('Water fill initialized:', { radiusPx, heightPx, topY, bottomY });
    }

    destroy() {}
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CylinderSimScreen;
}
