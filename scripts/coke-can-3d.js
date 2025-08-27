// 3D Coke Can Asset using CSS 3D Transforms (Working Version)
class CokeCan3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.can = null;
        this.isAutoRotating = true;
        this.rotationX = 0;
        this.rotationY = 0;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.autoRotationSpeed = 1;
        
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.create3DCokeCan();
        this.setupControls();
        this.startAutoRotation();
    }

    create3DCokeCan() {
        // Clear container
        this.container.innerHTML = '';
        
        // Create 3D can container
        const canWrapper = document.createElement('div');
        canWrapper.className = 'can-3d-wrapper';
        canWrapper.style.cssText = `
            width: 100%;
            height: 100%;
            perspective: 1000px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Create the 3D can
        this.can = document.createElement('div');
        this.can.className = 'can-3d';
        this.can.style.cssText = `
            width: 120px;
            height: 200px;
            position: relative;
            transform-style: preserve-3d;
            transform: rotateX(10deg) rotateY(0deg);
            transition: transform 0.1s ease-out;
        `;
        
        // Create can body
        this.createCanBody();
        
        // Create can rims
        this.createCanRims();
        
        // Create can label
        this.createCanLabel();
        
        // Create pull tab
        this.createPullTab();
        
        canWrapper.appendChild(this.can);
        this.container.appendChild(canWrapper);
    }

    createCanBody() {
        // Main can body
        const body = document.createElement('div');
        body.className = 'can-body';
        body.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                #d32f2f 0%, 
                #f44336 20%, 
                #d32f2f 40%, 
                #f44336 60%, 
                #d32f2f 80%, 
                #f44336 100%);
            border-radius: 60px;
            border: 2px solid #b71c1c;
            box-shadow: 
                inset 0 0 20px rgba(255, 255, 255, 0.3),
                inset 0 0 40px rgba(0, 0, 0, 0.2),
                0 10px 20px rgba(0, 0, 0, 0.3);
        `;
        
        // Add metallic shine effect
        const shine = document.createElement('div');
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.3) 50%, 
                rgba(255, 255, 255, 0.1) 100%);
            border-radius: 60px;
            pointer-events: none;
        `;
        
        body.appendChild(shine);
        this.can.appendChild(body);
    }

    createCanRims() {
        // Top rim
        const topRim = document.createElement('div');
        topRim.className = 'can-rim top-rim';
        topRim.style.cssText = `
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 136px;
            height: 16px;
            background: linear-gradient(45deg, #9e9e9e, #e0e0e0, #9e9e9e);
            border-radius: 68px;
            border: 2px solid #757575;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        `;
        
        // Bottom rim
        const bottomRim = topRim.cloneNode(true);
        bottomRim.className = 'can-rim bottom-rim';
        bottomRim.style.top = 'auto';
        bottomRim.style.bottom = '-8px';
        bottomRim.style.boxShadow = '0 -2px 4px rgba(0, 0, 0, 0.3)';
        
        this.can.appendChild(topRim);
        this.can.appendChild(bottomRim);
    }

    createCanLabel() {
        // White label background
        const label = document.createElement('div');
        label.className = 'can-label';
        label.style.cssText = `
            position: absolute;
            top: 25px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 150px;
            background: linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%);
            border-radius: 50px;
            border: 1px solid #e0e0e0;
            overflow: hidden;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        `;
        
        // Coca-Cola logo
        const logo = document.createElement('div');
        logo.className = 'coke-logo';
        logo.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 30px;
            background: #d32f2f;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
            font-family: Arial, sans-serif;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        `;
        logo.textContent = 'COCA-COLA';
        
        // Red design elements
        const design = document.createElement('div');
        design.className = 'can-design';
        design.style.cssText = `
            position: absolute;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 80px;
            background: linear-gradient(90deg, 
                #d32f2f 0%, 
                #f44336 25%, 
                #ffffff 50%, 
                #f44336 75%, 
                #d32f2f 100%);
            border-radius: 40px;
            border: 1px solid #b71c1c;
        `;
        
        // Wave pattern
        const wavePattern = document.createElement('div');
        wavePattern.className = 'wave-pattern';
        wavePattern.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: 
                radial-gradient(ellipse 30px 20px at 50% 25%, transparent 0%, transparent 50%, #ffffff 50%, #ffffff 100%),
                radial-gradient(ellipse 30px 20px at 50% 75%, transparent 0%, transparent 50%, #ffffff 50%, #ffffff 100%);
            border-radius: 30px;
        `;
        
        design.appendChild(wavePattern);
        label.appendChild(logo);
        label.appendChild(design);
        this.can.appendChild(label);
    }

    createPullTab() {
        // Pull tab
        const pullTab = document.createElement('div');
        pullTab.className = 'pull-tab';
        pullTab.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            width: 18px;
            height: 12px;
            background: linear-gradient(45deg, #9e9e9e, #e0e0e0);
            border-radius: 9px;
            border: 1px solid #757575;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        `;
        
        // Tab ring
        const ring = document.createElement('div');
        ring.style.cssText = `
            position: absolute;
            top: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 10px;
            height: 8px;
            background: #757575;
            border-radius: 5px;
        `;
        
        pullTab.appendChild(ring);
        this.can.appendChild(pullTab);
    }

    setupControls() {
        // Mouse controls
        this.can.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseup', (e) => this.onMouseUp(e));
        
        // Touch controls for mobile
        this.can.addEventListener('touchstart', (e) => this.onTouchStart(e));
        document.addEventListener('touchmove', (e) => this.onTouchMove(e));
        document.addEventListener('touchend', (e) => this.onTouchEnd(e));
        
        // Hover to pause auto-rotation
        this.can.addEventListener('mouseenter', () => this.pauseAutoRotation());
        this.can.addEventListener('mouseleave', () => this.resumeAutoRotation());
        
        // Add interaction instructions
        this.addInteractionInstructions();
    }

    addInteractionInstructions() {
        const instructions = document.createElement('div');
        instructions.className = 'interaction-instructions';
        instructions.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 15px;
            font-size: 14px;
            text-align: center;
            max-width: 300px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 10;
        `;
        instructions.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong style="color: #74b9ff;">🎮 3D Controls:</strong>
            </div>
            <div style="font-size: 12px; line-height: 1.4;">
                <div>• <strong>Drag</strong> to rotate the can</div>
                <div>• <strong>Hover</strong> to pause auto-rotation</div>
                <div>• <strong>Move mouse</strong> to explore all angles</div>
            </div>
        `;
        
        this.container.appendChild(instructions);
    }

    onMouseDown(e) {
        e.preventDefault();
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        this.pauseAutoRotation();
    }

    onMouseMove(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.lastMouseX;
        const deltaY = e.clientY - this.lastMouseY;
        
        this.rotationY += deltaX * 0.5;
        this.rotationX += deltaY * 0.5;
        
        // Limit vertical rotation
        this.rotationX = Math.max(-45, Math.min(45, this.rotationX));
        
        this.updateCanRotation();
        
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
    }

    onMouseUp(e) {
        this.isDragging = false;
        this.resumeAutoRotation();
    }

    onTouchStart(e) {
        e.preventDefault();
        if (e.touches.length === 1) {
            this.isDragging = true;
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
            this.pauseAutoRotation();
        }
    }

    onTouchMove(e) {
        e.preventDefault();
        if (!this.isDragging || e.touches.length !== 1) return;
        
        const deltaX = e.touches[0].clientX - this.lastMouseX;
        const deltaY = e.touches[0].clientY - this.lastMouseY;
        
        this.rotationY += deltaX * 0.5;
        this.rotationX += deltaY * 0.5;
        
        // Limit vertical rotation
        this.rotationX = Math.max(-45, Math.min(45, this.rotationX));
        
        this.updateCanRotation();
        
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
    }

    onTouchEnd(e) {
        this.isDragging = false;
        this.resumeAutoRotation();
    }

    updateCanRotation() {
        if (this.can) {
            this.can.style.transform = `rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`;
        }
    }

    startAutoRotation() {
        this.isAutoRotating = true;
        this.autoRotate();
    }

    stopAutoRotation() {
        this.isAutoRotating = false;
    }

    pauseAutoRotation() {
        this.stopAutoRotation();
    }

    resumeAutoRotation() {
        if (!this.isDragging) {
            this.startAutoRotation();
        }
    }

    autoRotate() {
        if (!this.isAutoRotating) return;
        
        this.rotationY += this.autoRotationSpeed;
        this.updateCanRotation();
        
        requestAnimationFrame(() => this.autoRotate());
    }

    resetView() {
        this.rotationX = 10;
        this.rotationY = 0;
        this.updateCanRotation();
    }

    // Public methods for external control
    startAutoRotation() {
        this.isAutoRotating = true;
        this.autoRotate();
    }

    stopAutoRotation() {
        this.isAutoRotating = false;
    }

    // Cleanup method
    destroy() {
        this.stopAutoRotation();
        this.isDragging = false;
        
        // Remove event listeners
        if (this.can) {
            this.can.removeEventListener('mousedown', this.onMouseDown);
            this.can.removeEventListener('mouseenter', this.onMouseEnter);
            this.can.removeEventListener('mouseleave', this.onMouseLeave);
        }
        
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('touchstart', this.onTouchStart);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CokeCan3D;
}
