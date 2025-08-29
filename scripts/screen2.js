// Screen 2: Dabba Question Screen JavaScript

class DabbaQuestionScreen {
    constructor() {
        this.feedback = null;
        this.rectangle = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.controls = null;
        this.selectedOption = null;
        this.init();
    }

    init() {
        // Get DOM elements
        this.feedback = document.getElementById('feedback');
        this.rectangle = document.getElementById('rectangle');
        
        // Initialize 3D Coke can
        this.init3DCokeCan();
        
        // Add event listeners for multiple choice options
        this.addEventListeners();
    }

    init3DCokeCan() {
        console.log('Initializing 3D scene with Three.js');
        
        // Wait a bit for the DOM to be ready
        setTimeout(() => {
            try {
                const canContainer = document.querySelector('.can-container');
                if (canContainer) {
                    console.log('Can container found, setting up Three.js');
                    
                    // Keep the same container structure but add 3D container
                    canContainer.innerHTML = '<div id="3d-container" style="width: 100%; height: 100%; position: relative;"></div>';
                    
                    // Initialize Three.js scene
                    this.setupThreeJS();
                    
                    // Load the 3D model
                    this.load3DModel();
                    
                    // Start rendering loop
                    this.animate();
                } else {
                    console.error('Can container not found');
                    this.createFallbackCan();
                }
            } catch (error) {
                console.error('Error initializing 3D scene:', error);
                // Fallback to CSS can if 3D fails
                this.createFallbackCan();
            }
        }, 100);
    }

    setupThreeJS() {
        console.log('Setting up Three.js scene');
        
        // Check if Three.js is available
        if (typeof THREE === 'undefined') {
            console.error('Three.js not loaded!');
            this.createFallbackCan();
            return;
        }
        
        console.log('Three.js is available:', THREE);
        
        const container = document.getElementById('3d-container');
        console.log('3D container found:', container);
        
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 5);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);
        
        // Add lights
        this.setupLights();
        
        // Add controls
        this.setupControls();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point light for highlights
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }

    setupControls() {
        // Orbit controls for mouse/touch interaction
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 2.0;
        
        // Pause auto-rotation on user interaction
        this.controls.addEventListener('start', () => {
            this.controls.autoRotate = false;
        });
        
        // Resume auto-rotation after user stops interacting
        this.controls.addEventListener('end', () => {
            setTimeout(() => {
                this.controls.autoRotate = true;
            }, 2000);
        });
    }

    load3DModel() {
        const loader = new THREE.GLTFLoader();
        
        // Load your .glb file
        const modelPath = 'models/dabba-model.glb';
        console.log('Loading 3D model from:', modelPath);
        
        loader.load(
            modelPath,
            (gltf) => {
                console.log('3D model loaded successfully!', gltf);
                this.model = gltf.scene;
                
                // Center and scale the model
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                console.log('Model dimensions:', size);
                console.log('Model center:', center);
                
                // Center the model
                this.model.position.sub(center);
                
                // Scale to fit in view
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3 / maxDim;
                this.model.scale.setScalar(scale);
                
                console.log('Model scaled by:', scale);
                
                // Add shadows
                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        // Improve material quality
                        if (child.material) {
                            child.material.roughness = 0.3;
                            child.material.metalness = 0.1;
                        }
                    }
                });
                
                this.scene.add(this.model);
                console.log('Model added to scene');
                
                // Position camera to see the model
                this.camera.position.set(0, 0, 4);
                this.controls.target.set(0, 0, 0);
                this.controls.update();
                
                console.log('3D model loaded successfully!');
            },
            (progress) => {
                console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Error loading 3D model:', error);
                console.error('Error details:', {
                    message: error.message,
                    type: error.type,
                    target: error.target
                });
                // Fallback to CSS can
                this.createFallbackCan();
            }
        );
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Render scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onWindowResize() {
        const container = document.getElementById('3d-container');
        if (container && this.camera && this.renderer) {
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(container.clientWidth, container.clientHeight);
        }
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

        // Ensure feedback is visible on small screens
        try {
            this.feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {
            // Older browsers fallback
            const rect = this.feedback.getBoundingClientRect();
            window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'smooth' });
        }

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
        // Clean up Three.js resources
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.controls) {
            this.controls.dispose();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', () => this.onWindowResize());
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DabbaQuestionScreen;
}
