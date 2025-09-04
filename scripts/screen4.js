// Screen 4: Cylinder Concept Explainer

class CylinderConceptScreen {
    constructor() {
        this.video = null;
        this.overlay = null;
        this.replayBtn = null;
        this.nextBtn = null;
        this.popupShown = false;
        this.popup2Shown = false;
        this.pauseTime = 15; // Pause at 15 seconds
        this.pauseTime2 = 79; // Pause at 79 seconds
        this.init();
    }

    init() {
        this.video = document.getElementById('conceptVideo');
        this.overlay = document.getElementById('conceptOverlay');
        this.replayBtn = document.getElementById('replayConceptBtn');
        this.nextBtn = document.getElementById('nextAfterConcept');

        this.setVideoSource();
        this.wireEvents();
        this.initChatbot();
    }

    setVideoSource() {
        // Default local path
        this.video.src = 'videos/cylinder-concept.mp4';
        // Or hosted URL:
        // this.video.src = 'https://your-cdn/cylinder-concept.mp4';
    }

    wireEvents() {
        if (this.overlay) this.overlay.addEventListener('click', () => this.play());
        if (this.replayBtn) this.replayBtn.addEventListener('click', () => this.replay());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.goNext());

        this.video.addEventListener('play', () => { if (this.overlay) this.overlay.style.display = 'none'; });
        this.video.addEventListener('pause', () => { if (!this.video.ended && this.overlay) this.overlay.style.display = 'flex'; });
        this.video.addEventListener('ended', () => { if (this.overlay) this.overlay.style.display = 'flex'; if (this.nextBtn) this.nextBtn.style.display = 'inline-block'; });
        this.video.addEventListener('error', (e) => {
            console.error('Concept video error', e, this.video?.error);
            alert('Could not load concept video. Check videos/cylinder-concept.mp4');
        });
        
        // Add timeupdate listener for popup trigger
        this.video.addEventListener('timeupdate', () => this.checkForPopup());
    }

    checkForPopup() {
        // Check for first popup (15 seconds)
        if (!this.popupShown && this.video.currentTime >= this.pauseTime) {
            this.popupShown = true;
            this.video.pause();
            this.showCylinderQuestionPopup();
        }
        
        // Check for second popup (79 seconds)
        if (!this.popup2Shown && this.video.currentTime >= this.pauseTime2) {
            this.popup2Shown = true;
            this.video.pause();
            this.showSimulationPopup();
        }
    }

    showCylinderQuestionPopup() {
        // Create popup overlay
        const popupOverlay = document.createElement('div');
        popupOverlay.id = 'cylinderQuestionPopup';
        popupOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
        `;

        popupContent.innerHTML = `
            <h2 style="margin: 0 0 30px 0; color: #1e293b; font-size: 2rem; font-weight: 700;">
                <img src="images/thinking-robot.png" alt="Thinking Robot" style="width: 35px; height: 35px; vertical-align: middle; margin-right: 10px;"> Quick Check!
            </h2>
            <p style="margin: 0 0 30px 0; color: #475569; font-size: 1.2rem; font-weight: 600;">
                Which of these are right circular cylinders?
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 30px;">
                <!-- Option 1 -->
                <div style="text-align: center;">
                    <div style="width: 180px; height: 180px; background: white; border: 2px solid #e2e8f0; border-radius: 10px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 8px 25px rgba(59, 130, 246, 0.3)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.1)'">
                        <div id="option1Image" style="width: 100%; height: 100%; position: relative;"></div>
                        <div id="option1Placeholder" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.05); color: #64748b;">
                            📦
                        </div>
                    </div>
                    <p style="margin: 0 0 15px 0; color: #1e293b; font-weight: 600;">Option 1</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="option-btn" data-option="1" data-answer="no" style="padding: 8px 16px; border: 2px solid #10b981; background: white; color: #10b981; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Yes</button>
                        <button class="option-btn" data-option="1" data-answer="no" style="padding: 8px 16px; border: 2px solid #ef4444; background: white; color: #ef4444; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">No</button>
                    </div>
                </div>

                <!-- Option 2 -->
                <div style="text-align: center;">
                    <div style="width: 180px; height: 180px; background: white; border: 2px solid #e2e8f0; border-radius: 10px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 8px 25px rgba(59, 130, 246, 0.3)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.1)'">
                        <div id="option2Image" style="width: 100%; height: 100%; position: relative;"></div>
                        <div id="option2Placeholder" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.05); color: #64748b;">
                            🥤
                        </div>
                    </div>
                    <p style="margin: 0 0 15px 0; color: #1e293b; font-weight: 600;">Option 2</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="option-btn" data-option="2" data-answer="yes" style="padding: 8px 16px; border: 2px solid #10b981; background: white; color: #10b981; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Yes</button>
                        <button class="option-btn" data-option="2" data-answer="no" style="padding: 8px 16px; border: 2px solid #ef4444; background: white; color: #ef4444; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">No</button>
                    </div>
                </div>

                <!-- Option 3 -->
                <div style="text-align: center;">
                    <div style="width: 180px; height: 180px; background: white; border: 2px solid #e2e8f0; border-radius: 5px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); position: relative; overflow: hidden; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 8px 25px rgba(59, 130, 246, 0.3)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.1)'">
                        <div id="option3Image" style="width: 100%; height: 100%; position: relative;"></div>
                        <div id="option3Placeholder" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.05); color: #64748b;">
                            📱
                        </div>
                    </div>
                    <p style="margin: 0 0 15px 0; color: #1e293b; font-weight: 600;">Option 3</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="option-btn" data-option="3" data-answer="no" style="padding: 8px 16px; border: 2px solid #10b981; background: white; color: #10b981; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Yes</button>
                        <button class="option-btn" data-option="3" data-answer="no" style="padding: 8px 16px; border: 2px solid #ef4444; background: white; color: #ef4444; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">No</button>
                    </div>
                </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
                <button id="closePopupBtn" style="padding: 15px 30px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 25px; font-size: 1.1rem; font-weight: 600; cursor: pointer; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    Continue Video ▶️
                </button>
            </div>
        `;

        popupOverlay.appendChild(popupContent);
        document.body.appendChild(popupOverlay);

        // Add event listeners
        this.addPopupEventListeners(popupOverlay);
        
        // Load images if available
        this.loadOptionImages(popupOverlay);
    }

    addPopupEventListeners(popupOverlay) {
        const optionBtns = popupOverlay.querySelectorAll('.option-btn');
        const closeBtn = popupOverlay.querySelector('#closePopupBtn');

        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const option = e.target.dataset.option;
                const answer = e.target.dataset.answer;
                const isYes = e.target.textContent === 'Yes';
                
                // Check if this is a wrong "Yes" answer (options 1 or 3)
                if (isYes && (option === '1' || option === '3')) {
                    this.showHintPopup(option, popupOverlay, 'wrong_yes');
                    return;
                }
                
                // Check if this is a wrong "No" answer (option 2)
                if (!isYes && option === '2') {
                    this.showHintPopup(option, popupOverlay, 'wrong_no');
                    return;
                }
                
                // Visual feedback for correct answers
                e.target.style.background = isYes ? '#10b981' : '#ef4444';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.05)';
                
                // Disable all buttons for this option
                const optionGroup = popupOverlay.querySelectorAll(`[data-option="${option}"]`);
                optionGroup.forEach(b => {
                    b.disabled = true;
                    b.style.opacity = '0.6';
                });

                console.log(`Option ${option}: ${isYes ? 'Yes' : 'No'} (Correct: ${answer === 'yes' ? 'Yes' : 'No'})`);
            });
        });

        closeBtn.addEventListener('click', () => {
            this.closePopup(popupOverlay);
        });

        // Close on overlay click
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                this.closePopup(popupOverlay);
            }
        });
    }

    showHintPopup(wrongOption, mainPopup, hintType) {
        // Create hint popup overlay
        const hintOverlay = document.createElement('div');
        hintOverlay.id = 'hintPopup';
        hintOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        // Determine hint content based on type
        let hintMessage, hintIcon, hintColor;
        if (hintType === 'wrong_yes') {
            hintMessage = "Remember, curved side should be perpendicular to both the bases.";
            hintIcon = "💡";
            hintColor = "#f59e0b";
        } else if (hintType === 'wrong_no') {
            hintMessage = "Look at the image carefully and try again.";
            hintIcon = "👀";
            hintColor = "#3b82f6";
        }

        // Create hint popup content
        const hintContent = document.createElement('div');
        hintContent.style.cssText = `
            background: linear-gradient(135deg, ${hintType === 'wrong_yes' ? '#fef3c7, #fde68a' : '#dbeafe, #bfdbfe'});
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            text-align: center;
            border: 3px solid ${hintColor};
        `;

        hintContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 20px;">${hintIcon}</div>
            <h3 style="margin: 0 0 20px 0; color: ${hintType === 'wrong_yes' ? '#92400e' : '#1e40af'}; font-size: 1.5rem; font-weight: 700;">
                Hint!
            </h3>
            <p style="margin: 0 0 30px 0; color: ${hintType === 'wrong_yes' ? '#78350f' : '#1e3a8a'}; font-size: 1.1rem; line-height: 1.6; font-weight: 600;">
                ${hintMessage}
            </p>
            <div style="display: flex; justify-content: center;">
                <button id="retryOptionBtn" style="padding: 12px 25px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    Try Again 🔄
                </button>
            </div>
        `;

        hintOverlay.appendChild(hintContent);
        document.body.appendChild(hintOverlay);

        // Add event listeners for hint popup
        const retryBtn = hintOverlay.querySelector('#retryOptionBtn');

        retryBtn.addEventListener('click', () => {
            this.retryOption(wrongOption, mainPopup, hintOverlay);
        });

        // Close on overlay click
        hintOverlay.addEventListener('click', (e) => {
            if (e.target === hintOverlay) {
                hintOverlay.remove();
            }
        });
    }

    retryOption(option, mainPopup, hintOverlay) {
        // Remove hint popup
        hintOverlay.remove();
        
        // Re-enable buttons for the specific option
        const optionGroup = mainPopup.querySelectorAll(`[data-option="${option}"]`);
        optionGroup.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.background = btn.textContent === 'Yes' ? 'white' : 'white';
            btn.style.color = btn.textContent === 'Yes' ? '#10b981' : '#ef4444';
            btn.style.transform = 'scale(1)';
        });
    }

    loadOptionImages(popupOverlay) {
        // GLB model paths - you can update these with your actual GLB file paths
        const modelPaths = {
            option1: 'models/option1-3d-model.glb', // Replace with your GLB path
            option2: 'models/option2-3d-model.glb', // Replace with your GLB path
            option3: 'models/option3-3d-model.glb'  // Replace with your GLB path
        };

        // Load 3D models for each option
        this.load3DModel(popupOverlay, 'option1', modelPaths.option1);
        this.load3DModel(popupOverlay, 'option2', modelPaths.option2);
        this.load3DModel(popupOverlay, 'option3', modelPaths.option3);
    }

    load3DModel(popupOverlay, optionId, modelPath) {
        const container = popupOverlay.querySelector(`#${optionId}Image`);
        const placeholder = popupOverlay.querySelector(`#${optionId}Placeholder`);
        
        if (!container || !modelPath) {
            console.log(`${optionId} container not found or no model path provided`);
            return;
        }

        // Create Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(180, 180); // Updated to match new container size
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Add improved lighting for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Increased intensity and white color
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Increased intensity
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        
        // Add additional fill light for better illumination
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-5, 0, 5);
        scene.add(fillLight);
        
        // Set camera position with 20% zoom (closer to model)
        camera.position.z = 2.4; // 20% closer than default (3 * 0.8 = 2.4)
        
        // Add orbit controls for mouse interaction
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = false;
        
        // Load GLB model
        const loader = new THREE.GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                const model = gltf.scene;
                
                // Scale and position the model
                model.scale.setScalar(1);
                model.position.set(0, 0, 0);
                
                // Enable shadows
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                
                scene.add(model);
                
                // Hide placeholder and show 3D model
                placeholder.style.display = 'none';
                container.appendChild(renderer.domElement);
                
                // Animation loop
                const animate = () => {
                    requestAnimationFrame(animate);
                    
                    // Update controls
                    controls.update();
                    
                    // Only auto-rotate if not being interacted with
                    if (model && !controls.enabled) {
                        model.rotation.y += 0.01;
                    }
                    
                    renderer.render(scene, camera);
                };
                animate();
                
                console.log(`${optionId} 3D model loaded successfully`);
            },
            (progress) => {
                console.log(`${optionId} loading progress:`, (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error(`Error loading ${optionId} 3D model:`, error);
                console.log(`${optionId} 3D model not found, using placeholder`);
            }
        );
    }

    showSimulationPopup() {
        // Create popup overlay
        const popupOverlay = document.createElement('div');
        popupOverlay.id = 'simulationPopup';
        popupOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Comic Sans MS', cursive, sans-serif;
            overflow-y: auto;
            padding: 20px;
        `;

        // Create popup content with simulation
        const popupContent = document.createElement('div');
        popupContent.style.cssText = `
            background: rgba(255, 255, 255, 0.95);
            border-radius: 25px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            text-align: center;
        `;

        // Add the complete simulation HTML
        popupContent.innerHTML = `
            <h1 style="color: #4a90e2; font-size: 2.2em; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);">🎯 Cloth Coverage Simulation</h1>
            
            <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 20px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #4a90e2;">
                <div style="font-size: 1.2em; color: #2d3436; margin-bottom: 15px;">
                    <strong>Problem:</strong> Imagine this to be a Qutub Minar.
                </div>
                <div style="margin: 20px 0; display: flex; justify-content: center;">
                    <div style="position: relative; width: 120px; height: 200px; border: 3px solid #4a90e2; background: linear-gradient(135deg, #74b9ff, #0984e3); margin: 0 20px;">
                        <div style="position: relative; width: 100%; height: 100%;">
                            <div style="position: absolute; height: 100%; width: 0; left: -25px; top: 0; border-left: none; border-right: 2px solid #e17055; background: #e17055;">
                                <div style="position: absolute; left: -3px; width: 8px; height: 2px; background: #e17055; top: 0;"></div>
                                <div style="position: absolute; left: -3px; width: 8px; height: 2px; background: #e17055; bottom: 0;"></div>
                                <div style="position: absolute; left: -35px; top: 50%; transform: translateY(-50%); background: #e17055; color: white; padding: 2px 5px; border-radius: 5px; font-size: 0.8em; white-space: nowrap;">h = 72 m</div>
                            </div>
                            <div style="position: absolute; width: 50%; height: 0; bottom: -25px; left: 0; border-top: none; border-bottom: 2px solid #e17055; background: #e17055;">
                                <div style="position: absolute; top: -3px; height: 8px; width: 2px; background: #e17055; left: 0;"></div>
                                <div style="position: absolute; top: -3px; height: 8px; width: 2px; background: #e17055; right: 0;"></div>
                                <div style="position: absolute; left: 50%; bottom: -35px; transform: translateX(-50%); background: #e17055; color: white; padding: 2px 5px; border-radius: 5px; font-size: 0.8em; white-space: nowrap;">r = 7 m</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%; height: 8px; background: #ddd; border-radius: 4px; margin: 20px 0; overflow: hidden;">
                <div id="progressFill" style="height: 100%; background: linear-gradient(90deg, #00b894, #00cec9); border-radius: 4px; transition: width 0.5s ease; width: 33.33%;"></div>
            </div>

            <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: #4a90e2; transform: scale(1.2);" id="step1Dot"></div>
                <div style="width: 12px; height: 12px; border-radius: 50%; background: #ddd;" id="step2Dot"></div>
                <div style="width: 12px; height: 12px; border-radius: 50%; background: #ddd;" id="step3Dot"></div>
            </div>

            <!-- Step 1: Select Parts -->
            <div id="step1" style="display: block; margin: 30px 0;">
                <h2 style="color: #e17055; margin-bottom: 20px; font-size: 1.5em; font-weight: bold;">Step 1: Which parts need cloth?</h2>
                <div style="margin: 20px auto; max-width: 200px; height: 300px; display: flex; justify-content: center; align-items: center; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); overflow: hidden;">
                    <img src="images/qutub-minar.png" alt="Qutub Minar" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>
                <p style="margin: 20px 0; color: #2d3436; font-size: 1.1em;">
                    Select all the sides of the Qutub Minar that need to be covered with cloth:
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
                    <div class="part-option" data-part="curved" style="background: #fff; border: 3px solid #ddd; border-radius: 15px; padding: 20px; cursor: pointer; transition: all 0.3s ease;">
                        <div style="font-size: 2em; margin-bottom: 10px;">🔄</div>
                        <div style="font-weight: bold; font-size: 1.1em;">Curved Surface</div>
                    </div>
                    <div class="part-option" data-part="top" style="background: #fff; border: 3px solid #ddd; border-radius: 15px; padding: 20px; cursor: pointer; transition: all 0.3s ease;">
                        <div style="font-size: 2em; margin-bottom: 10px;">⭕</div>
                        <div style="font-weight: bold; font-size: 1.1em;">Top Circular Base</div>
                    </div>
                    <div class="part-option" data-part="bottom" style="background: #fff; border: 3px solid #ddd; border-radius: 15px; padding: 20px; cursor: pointer; transition: all 0.3s ease;">
                        <div style="font-size: 2em; margin-bottom: 10px;">⭕</div>
                        <div style="font-weight: bold; font-size: 1.1em;">Bottom Circular Base</div>
                    </div>
                </div>
                <div id="step1Feedback" style="margin: 20px 0; padding: 15px; border-radius: 10px; font-weight: bold; display: none;"></div>
                <button id="checkStep1" style="padding: 15px 25px; border: none; border-radius: 25px; font-size: 1.1em; font-family: inherit; cursor: pointer; transition: all 0.3s ease; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 10px; background: linear-gradient(45deg, #00b894, #00cec9); color: white;" disabled>Check Selection</button>
            </div>

            <!-- Step 2: Enter Formulas -->
            <div id="step2" style="display: none; margin: 30px 0;">
                <h2 style="color: #e17055; margin-bottom: 20px; font-size: 1.5em; font-weight: bold;">Step 2: Fill in the formulas</h2>
                <p style="margin: 20px 0; color: #2d3436; font-size: 1.1em;">
                    Now calculate the area for each part that needs cloth. Fill in the values:
                </p>
                <div style="background: #fff; border: 2px solid #4a90e2; border-radius: 10px; padding: 20px; margin: 20px 0;">
                    <div style="margin: 15px 0; display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
                        <div style="font-weight: bold; color: #4a90e2; min-width: 120px;">Curved Surface Area:</div>
                        <span>2πrh = 2 × (22/7) ×</span>
                        <input type="number" id="csaRadius" placeholder="r" style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; text-align: center; width: 80px;">
                        <span>×</span>
                        <input type="number" id="csaHeight" placeholder="h" style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; text-align: center; width: 80px;">
                        <span>=</span>
                        <input type="number" id="csaResult" placeholder="Result" style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; text-align: center; width: 80px;">
                    </div>
                    <div style="margin: 15px 0; display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
                        <div style="font-weight: bold; color: #4a90e2; min-width: 120px;">Top Base Area:</div>
                        <span>πr² = (22/7) ×</span>
                        <input type="number" id="topRadius" placeholder="r" style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; text-align: center; width: 80px;">
                        <span>² =</span>
                        <input type="number" id="topResult" placeholder="Result" style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; text-align: center; width: 80px;">
                    </div>
                    <div style="margin: 15px 0; display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
                        <div style="font-weight: bold; color: #4a90e2; min-width: 120px;">Total Cloth Area:</div>
                        <input type="number" id="csaFinal" placeholder="CSA" readonly style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; text-align: center; width: 80px;">
                        <span>+</span>
                        <input type="number" id="topFinal" placeholder="Top Area" readonly style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; text-align: center; width: 80px;">
                        <span>=</span>
                        <input type="number" id="totalResult" placeholder="Total" style="padding: 8px 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 1.1em; text-align: center; width: 80px;">
                    </div>
                </div>
                <div id="step2Feedback" style="margin: 20px 0; padding: 15px; border-radius: 10px; font-weight: bold; display: none;"></div>
                <button id="checkStep2" style="padding: 15px 25px; border: none; border-radius: 25px; font-size: 1.1em; font-family: inherit; cursor: pointer; transition: all 0.3s ease; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 10px; background: linear-gradient(45deg, #00b894, #00cec9); color: white;" disabled>Check Calculation</button>
            </div>

            <!-- Step 3: Final Answer -->
            <div id="step3" style="display: none; margin: 30px 0;">
                <h2 style="color: #e17055; margin-bottom: 20px; font-size: 1.5em; font-weight: bold;">Step 3: Final Answer</h2>
                <p style="margin: 20px 0; color: #2d3436; font-size: 1.1em;">
                    Enter the total area of cloth required (rounded to nearest whole number):
                </p>
                <div style="font-size: 1.3em; margin: 20px 0;">
                    Total Cloth Area = <input type="number" id="finalAnswer" placeholder="Enter answer" style="font-size: 1.2em; padding: 10px; border: 2px solid #4a90e2; border-radius: 5px; text-align: center; width: 150px;"> m²
                </div>
                <div id="step3Feedback" style="margin: 20px 0; padding: 15px; border-radius: 10px; font-weight: bold; display: none;"></div>
                <button id="checkFinal" style="padding: 15px 25px; border: none; border-radius: 25px; font-size: 1.1em; font-family: inherit; cursor: pointer; transition: all 0.3s ease; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 10px; background: linear-gradient(45deg, #00b894, #00cec9); color: white;" disabled>Submit Answer</button>
            </div>

            <div style="margin-top: 30px;">
                <button id="resetSimulation" style="padding: 15px 25px; border: none; border-radius: 25px; font-size: 1.1em; font-family: inherit; cursor: pointer; transition: all 0.3s ease; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 10px; background: linear-gradient(45deg, #fdcb6e, #e17055); color: white;">🔄 Reset Simulation</button>
            </div>
        `;

        popupOverlay.appendChild(popupContent);
        document.body.appendChild(popupOverlay);

        // Initialize the simulation
        this.initializeSimulation();
    }

    initializeSimulation() {
        this.currentStep = 1;
        this.selectedParts = [];
        this.correctAnswers = {
            parts: ['curved', 'top'], // Curved surface and top base need cloth
            csa: 3168, // 2 × (22/7) × 7 × 72 = 3168
            topArea: 154, // (22/7) × 7² = 154
            total: 3322 // 3168 + 154 = 3322
        };

        // Step 1: Part selection
        this.setupStep1();
        
        // Step 2: Formula calculation
        this.setupStep2();
        
        // Step 3: Final answer
        this.setupStep3();
        
        // Reset button
        this.setupResetButton();
    }

    setupStep1() {
        const partOptions = document.querySelectorAll('.part-option');
        const checkBtn = document.getElementById('checkStep1');
        
        partOptions.forEach(option => {
            option.addEventListener('click', () => {
                const part = option.dataset.part;
                if (this.selectedParts.includes(part)) {
                    this.selectedParts = this.selectedParts.filter(p => p !== part);
                    option.style.background = '#fff';
                    option.style.borderColor = '#ddd';
                } else {
                    this.selectedParts.push(part);
                    option.style.background = '#e3f2fd';
                    option.style.borderColor = '#2196f3';
                }
                
                // Enable check button if at least one part is selected
                checkBtn.disabled = this.selectedParts.length === 0;
            });
        });

        checkBtn.addEventListener('click', () => {
            this.checkStep1();
        });
    }

    checkStep1() {
        const feedback = document.getElementById('step1Feedback');
        const correctParts = this.correctAnswers.parts;
        const isCorrect = correctParts.every(part => this.selectedParts.includes(part)) && 
                         this.selectedParts.length === correctParts.length;

        if (isCorrect) {
            feedback.innerHTML = '✅ Correct! You selected the right parts that need cloth.';
            feedback.style.background = '#d4edda';
            feedback.style.color = '#155724';
            feedback.style.border = '1px solid #c3e6cb';
            feedback.style.display = 'block';
            
            setTimeout(() => {
                this.showStep2();
            }, 1500);
        } else {
            feedback.innerHTML = '❌ Not quite right. Remember: we need cloth for the curved surface and the top base (since the bottom is on the ground).';
            feedback.style.background = '#f8d7da';
            feedback.style.color = '#721c24';
            feedback.style.border = '1px solid #f5c6cb';
            feedback.style.display = 'block';
        }
    }

    showStep2() {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        document.getElementById('step2Dot').style.background = '#4a90e2';
        document.getElementById('step2Dot').style.transform = 'scale(1.2)';
        document.getElementById('progressFill').style.width = '66.66%';
    }

    setupStep2() {
        const checkBtn = document.getElementById('checkStep2');
        const inputs = ['csaRadius', 'csaHeight', 'topRadius'];
        
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            input.addEventListener('input', () => {
                this.updateStep2Button();
                this.autoCalculate();
            });
        });

        checkBtn.addEventListener('click', () => {
            this.checkStep2();
        });
    }

    updateStep2Button() {
        const checkBtn = document.getElementById('checkStep2');
        const requiredInputs = ['csaRadius', 'csaHeight', 'topRadius'];
        const allFilled = requiredInputs.every(id => {
            const input = document.getElementById(id);
            return input.value.trim() !== '';
        });
        checkBtn.disabled = !allFilled;
    }

    autoCalculate() {
        const csaRadius = parseFloat(document.getElementById('csaRadius').value) || 0;
        const csaHeight = parseFloat(document.getElementById('csaHeight').value) || 0;
        const topRadius = parseFloat(document.getElementById('topRadius').value) || 0;
        
        if (csaRadius > 0 && csaHeight > 0) {
            const csaResult = 2 * (22/7) * csaRadius * csaHeight;
            document.getElementById('csaResult').value = Math.round(csaResult);
            document.getElementById('csaFinal').value = Math.round(csaResult);
        }
        
        if (topRadius > 0) {
            const topResult = (22/7) * topRadius * topRadius;
            document.getElementById('topResult').value = Math.round(topResult);
            document.getElementById('topFinal').value = Math.round(topResult);
        }
        
        // Auto-calculate total
        const csaFinal = parseFloat(document.getElementById('csaFinal').value) || 0;
        const topFinal = parseFloat(document.getElementById('topFinal').value) || 0;
        if (csaFinal > 0 && topFinal > 0) {
            document.getElementById('totalResult').value = Math.round(csaFinal + topFinal);
        }
    }

    checkStep2() {
        const feedback = document.getElementById('step2Feedback');
        const csaResult = parseFloat(document.getElementById('csaResult').value);
        const topResult = parseFloat(document.getElementById('topResult').value);
        const totalResult = parseFloat(document.getElementById('totalResult').value);
        
        const csaCorrect = Math.abs(csaResult - this.correctAnswers.csa) <= 5;
        const topCorrect = Math.abs(topResult - this.correctAnswers.topArea) <= 5;
        const totalCorrect = Math.abs(totalResult - this.correctAnswers.total) <= 5;
        
        if (csaCorrect && topCorrect && totalCorrect) {
            feedback.innerHTML = '✅ Excellent! Your calculations are correct.';
            feedback.style.background = '#d4edda';
            feedback.style.color = '#155724';
            feedback.style.border = '1px solid #c3e6cb';
            feedback.style.display = 'block';
            
            setTimeout(() => {
                this.showStep3();
            }, 1500);
        } else {
            let message = '❌ Some calculations need adjustment:';
            if (!csaCorrect) message += '<br>• Curved Surface Area should be around 3168 m²';
            if (!topCorrect) message += '<br>• Top Base Area should be around 154 m²';
            if (!totalCorrect) message += '<br>• Total should be around 3322 m²';
            
            feedback.innerHTML = message;
            feedback.style.background = '#f8d7da';
            feedback.style.color = '#721c24';
            feedback.style.border = '1px solid #f5c6cb';
            feedback.style.display = 'block';
        }
    }

    showStep3() {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
        document.getElementById('step3Dot').style.background = '#4a90e2';
        document.getElementById('step3Dot').style.transform = 'scale(1.2)';
        document.getElementById('progressFill').style.width = '100%';
    }

    setupStep3() {
        const finalInput = document.getElementById('finalAnswer');
        const checkBtn = document.getElementById('checkFinal');
        
        finalInput.addEventListener('input', () => {
            checkBtn.disabled = finalInput.value.trim() === '';
        });

        checkBtn.addEventListener('click', () => {
            this.checkStep3();
        });
    }

    checkStep3() {
        const feedback = document.getElementById('step3Feedback');
        const userAnswer = parseFloat(document.getElementById('finalAnswer').value);
        const correctAnswer = this.correctAnswers.total;
        
        if (Math.abs(userAnswer - correctAnswer) <= 5) {
            feedback.innerHTML = '🎉 Congratulations! You have successfully completed the cylinder cloth simulation!';
            feedback.style.background = '#d4edda';
            feedback.style.color = '#155724';
            feedback.style.border = '1px solid #c3e6cb';
            feedback.style.display = 'block';
            
            // Add continue video button
            setTimeout(() => {
                feedback.innerHTML += `
                    <div style="margin: 20px 0;">
                        <button id="continueVideoBtn" style="padding: 15px 25px; border: none; border-radius: 25px; font-size: 1.1em; font-family: inherit; cursor: pointer; transition: all 0.3s ease; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 10px; background: linear-gradient(45deg, #00b894, #00cec9); color: white;">Continue Video</button>
                    </div>
                `;
                
                document.getElementById('continueVideoBtn').addEventListener('click', () => {
                    this.closeSimulationPopup();
                });
            }, 2000);
        } else {
            feedback.innerHTML = `❌ Close! The correct answer is ${correctAnswer} m². Try again!`;
            feedback.style.background = '#f8d7da';
            feedback.style.color = '#721c24';
            feedback.style.border = '1px solid #f5c6cb';
            feedback.style.display = 'block';
        }
    }

    setupResetButton() {
        const resetBtn = document.getElementById('resetSimulation');
        resetBtn.addEventListener('click', () => {
            this.resetSimulation();
        });
    }

    resetSimulation() {
        // Reset all variables
        this.currentStep = 1;
        this.selectedParts = [];
        
        // Reset UI
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        
        // Reset progress
        document.getElementById('progressFill').style.width = '33.33%';
        document.getElementById('step1Dot').style.background = '#4a90e2';
        document.getElementById('step1Dot').style.transform = 'scale(1.2)';
        document.getElementById('step2Dot').style.background = '#ddd';
        document.getElementById('step2Dot').style.transform = 'scale(1)';
        document.getElementById('step3Dot').style.background = '#ddd';
        document.getElementById('step3Dot').style.transform = 'scale(1)';
        
        // Reset part selections
        document.querySelectorAll('.part-option').forEach(option => {
            option.style.background = '#fff';
            option.style.borderColor = '#ddd';
        });
        
        // Reset inputs
        document.getElementById('csaRadius').value = '';
        document.getElementById('csaHeight').value = '';
        document.getElementById('csaResult').value = '';
        document.getElementById('topRadius').value = '';
        document.getElementById('topResult').value = '';
        document.getElementById('csaFinal').value = '';
        document.getElementById('topFinal').value = '';
        document.getElementById('totalResult').value = '';
        document.getElementById('finalAnswer').value = '';
        
        // Reset feedback
        document.getElementById('step1Feedback').style.display = 'none';
        document.getElementById('step2Feedback').style.display = 'none';
        document.getElementById('step3Feedback').style.display = 'none';
        
        // Reset buttons
        document.getElementById('checkStep1').disabled = true;
        document.getElementById('checkStep2').disabled = true;
        document.getElementById('checkFinal').disabled = true;
    }

    closeSimulationPopup() {
        const popup = document.getElementById('simulationPopup');
        if (popup) {
            popup.remove();
        }
        // Resume video from where it was paused
        this.video.play();
    }

    closePopup(popupOverlay) {
        popupOverlay.remove();
        // Resume video from where it was paused
        this.video.play();
    }

    play() { const p = this.video.play(); if (p && p.catch) p.catch(() => {}); }
    replay() { 
        this.popupShown = false; // Reset popup state on replay
        this.popup2Shown = false; // Reset popup2 state on replay
        this.video.currentTime = 0; 
        this.play(); 
    }

    goNext() {
        if (window.app && typeof window.app.loadScreenDirectly === 'function') {
            // Use config to get next screen (should be Screen 8)
            const nextScreen = window.getNextScreen ? window.getNextScreen(4) : 8;
            window.app.loadScreenDirectly(nextScreen);
        }
    }

    destroy() {
        // Remove chatbot event listeners when leaving screen
        this.removeChatbotEvents();
    }

    // Screen 4 Chatbot Methods
    initChatbot() {
        this.chatbotModal = document.getElementById('screen4ChatbotModal');
        this.closeChatbot = document.getElementById('screen4CloseChatbot');
        this.voiceButton = document.getElementById('screen4VoiceButton');
        this.voiceStatus = document.getElementById('screen4VoiceStatus');
        this.chatMessages = document.getElementById('screen4ChatMessages');
        this.isRecording = false;
        
        this.setupChatbotEvents();
    }

    setupChatbotEvents() {
        // Bot click to open chatbot
        const aiCompanion = document.getElementById('aiCompanion');
        if (aiCompanion) {
            aiCompanion.addEventListener('click', () => this.openChatbot());
        }
        
        // Close chatbot
        if (this.closeChatbot) {
            this.closeChatbot.addEventListener('click', () => this.closeChatbotModal());
        }
        
        // Voice button
        if (this.voiceButton) {
            this.voiceButton.addEventListener('click', () => this.toggleVoiceRecording());
        }
        
        // Close on modal background click
        if (this.chatbotModal) {
            this.chatbotModal.addEventListener('click', (e) => {
                if (e.target === this.chatbotModal) {
                    this.closeChatbotModal();
                }
            });
        }
    }

    removeChatbotEvents() {
        // Remove event listeners to prevent conflicts
        const aiCompanion = document.getElementById('aiCompanion');
        if (aiCompanion) {
            aiCompanion.removeEventListener('click', () => this.openChatbot());
        }
    }

    openChatbot() {
        if (this.chatbotModal) {
            this.chatbotModal.classList.add('active');
            // Update bot status
            const botStatus = document.querySelector('.bot-status');
            if (botStatus) {
                botStatus.textContent = 'Chatting... 💬';
            }
        }
    }

    closeChatbotModal() {
        if (this.chatbotModal) {
            this.chatbotModal.classList.remove('active');
            // Reset bot status
            const botStatus = document.querySelector('.bot-status');
            if (botStatus) {
                botStatus.textContent = 'Ready to help! 🤖';
            }
        }
    }

    toggleVoiceRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        this.isRecording = true;
        if (this.voiceButton) {
            this.voiceButton.classList.add('recording');
            this.voiceButton.innerHTML = '🛑 Stop Recording';
        }
        if (this.voiceStatus) {
            this.voiceStatus.style.display = 'block';
            this.voiceStatus.textContent = 'Listening... Take your time to speak!';
        }
        
        // Wait for user to finish speaking (5 seconds)
        setTimeout(() => {
            this.stopRecording();
        }, 5000);
    }

    stopRecording() {
        this.isRecording = false;
        if (this.voiceButton) {
            this.voiceButton.classList.remove('recording');
            this.voiceButton.innerHTML = '🎤 Start Speaking';
        }
        if (this.voiceStatus) {
            this.voiceStatus.style.display = 'none';
        }
        
        // Add user message
        this.addMessage('user', 'Hi Allie, can you provide more examples for right circular cylinder used in everyday life');
        
        // Add thinking message
        this.addThinkingMessage();
        
        // Add bot response after 3 second delay
        setTimeout(() => {
            this.removeThinkingMessage();
            this.addMessageLineByLine('bot', 'Soda cans and drink bottles: Most cans and many plastic or glass bottles are shaped as right circular cylinders.\n\nBatteries: Standard AA, AAA, C, and D batteries are cylindrical.\n\nPipes and tubes: Plumbing pipes, cardboard tubes (like those inside paper towels or toilet paper rolls), and PVC pipes are all examples of cylinders.\n\nFood containers: Canned goods, oatmeal canisters, and Pringles cans are classic examples.\n\nCandles: Many pillar candles are shaped as right circular cylinders.\n\nStorage containers: Some canisters for kitchen storage, like for flour or sugar, are cylindrical.\n\nPencils and pens: The main body of most standard pencils and pens is a long, thin cylinder.');
        }, 3000);
    }

    addThinkingMessage() {
        if (!this.chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot thinking-message-container';
        messageDiv.id = 'screen4ThinkingMessage';
        
        // Create avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = 'AI';
        
        // Create thinking content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'message-label';
        labelDiv.textContent = 'AI Math Companion';
        
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'screen4-thinking-message';
        thinkingDiv.innerHTML = 'Thinking<span class="screen4-thinking-dots"><span class="screen4-thinking-dot"></span><span class="screen4-thinking-dot"></span><span class="screen4-thinking-dot"></span></span>';
        
        contentDiv.appendChild(labelDiv);
        contentDiv.appendChild(thinkingDiv);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    removeThinkingMessage() {
        const thinkingMessage = document.getElementById('screen4ThinkingMessage');
        if (thinkingMessage) {
            thinkingMessage.remove();
        }
    }

    addMessage(sender, content) {
        if (!this.chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        // Create avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'user' ? 'You' : 'AI';
        
        // Create content with label
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'message-label';
        labelDiv.textContent = sender === 'user' ? 'You' : 'AI Math Companion';
        
        const textDiv = document.createElement('div');
        textDiv.innerHTML = content.replace(/\n/g, '<br>');
        
        contentDiv.appendChild(labelDiv);
        contentDiv.appendChild(textDiv);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    addMessageLineByLine(sender, content) {
        if (!this.chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        // Create avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'user' ? 'You' : 'AI';
        
        // Create content with label
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'message-label';
        labelDiv.textContent = sender === 'user' ? 'You' : 'AI Math Companion';
        
        const textDiv = document.createElement('div');
        textDiv.innerHTML = ''; // Start empty
        
        contentDiv.appendChild(labelDiv);
        contentDiv.appendChild(textDiv);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Split content into lines and show one by one
        const lines = content.split('\n\n');
        let currentLineIndex = 0;
        
        const showNextLine = () => {
            if (currentLineIndex < lines.length) {
                const currentContent = lines.slice(0, currentLineIndex + 1).join('<br><br>');
                textDiv.innerHTML = currentContent;
                
                // Scroll to bottom
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                
                currentLineIndex++;
                // Show next line after 1.5 seconds
                setTimeout(showNextLine, 1500);
            }
        };
        
        // Start showing lines after a short delay
        setTimeout(showNextLine, 500);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CylinderConceptScreen;
}
