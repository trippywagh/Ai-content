class SolveTogetherPopup {
    constructor(onCloseCallback = null) {
        this.popup = null;
        this.isOpen = false;
        this.onCloseCallback = onCloseCallback;
        this.init();
    }

    init() {
        // Create popup HTML (without bot inside)
        this.createPopupHTML();
        this.bindEvents();
    }

    createPopupHTML() {
        const popupHTML = `
            <div class="solve-together-popup" id="solveTogetherPopup" style="display: none;">
                <div class="popup-content">
                    <div class="popup-header">
                        <h3>Let's Solve This Together!</h3>
                        <button class="popup-close-btn" id="solvePopupCloseBtn">×</button>
                    </div>
                    
                    <div class="popup-body">
                        <div class="interactive-playbook">
                            <!-- Left Side - 3D Cylinder -->
                            <div class="cylinder-section">
                                <h4>🥤 3D Cylinder</h4>
                                <div id="cylinder3dContainer" class="cylinder-3d-container"></div>
                                <div class="parameter-controls">
                                    <div class="param-group">
                                        <label>Radius (r): <span id="radiusValue">3</span> cm</label>
                                        <input type="range" id="radiusSlider" min="1" max="10" value="3" step="0.5">
                                    </div>
                                    <div class="param-group">
                                        <label>Height (h): <span id="heightValue">8</span> cm</label>
                                        <input type="range" id="heightSlider" min="1" max="20" value="8" step="0.5">
                                    </div>
                                </div>
                                <div class="cut-controls">
                                    <button id="cutButton" class="cut-btn">🔪 Cut Open</button>
                                    <button id="resetButton" class="reset-btn" disabled>🔄 Reset</button>
                                </div>
                            </div>
                            
                            <!-- Right Side - Unrolled Rectangle -->
                            <div class="rectangle-section">
                                <h4>📏 Unrolled Surface</h4>
                                <div id="rectangleContainer" class="rectangle-container">
                                    <div id="unrolledRectangle" class="unrolled-rectangle">
                                        <div class="rectangle-placeholder">
                                            <p>Drag the cut button to see the transformation!</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="measurements">
                                    <div class="measurement">
                                        <span class="label">Length:</span>
                                        <span class="value" id="lengthValue">2πr = 18.85 cm</span>
                                    </div>
                                    <div class="measurement">
                                        <span class="label">Height:</span>
                                        <span class="value" id="rectHeightValue">h = 8 cm</span>
                                    </div>
                                    <div class="measurement">
                                        <span class="label">Area:</span>
                                        <span class="value" id="areaValue">CSA = 150.8 cm²</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="popup-footer">
                        <button class="btn-cta" id="continueAfterSolve">Continue</button>
                    </div>
                </div>
            </div>
        `;

        // Add to body
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // Get reference
        this.popup = document.getElementById('solveTogetherPopup');
    }

    bindEvents() {
        // Close button
        const closeBtn = document.getElementById('solvePopupCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log('Close button clicked');
                this.hide();
            });
        } else {
            console.error('Close button not found');
        }

        // Continue button
        const continueBtn = document.getElementById('continueAfterSolve');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                console.log('Continue button clicked');
                this.hide();
            });
        } else {
            console.error('Continue button not found');
        }
    }

    show() {
        if (this.popup) {
            this.popup.style.display = 'flex';
            this.isOpen = true;
            console.log('Showing solve together popup');
            
            // Initialize interactive playbook after popup is shown
            setTimeout(() => {
                this.initializeInteractivePlaybook();
            }, 100);
        }
    }

    hide() {
        if (this.popup) {
            this.popup.style.display = 'none';
            this.isOpen = false;
            console.log('Hiding solve together popup');
            
            // Clean up interactive playbook
            if (this.interactivePlaybook) {
                this.interactivePlaybook.dispose();
                this.interactivePlaybook = null;
            }
            
            // Call the callback to notify that popup is closed
            if (this.onCloseCallback) {
                this.onCloseCallback();
            }
        }
    }

    initializeInteractivePlaybook() {
        try {
            console.log('Initializing interactive playbook...');
            this.interactivePlaybook = new InteractivePlaybook();
            console.log('Interactive playbook initialized successfully');
        } catch (error) {
            console.error('Error initializing interactive playbook:', error);
        }
    }

    destroy() {
        if (this.popup) {
            this.popup.remove();
        }
    }
}
