// Main Application JavaScript - Manages screen navigation and loading

class MathAdventureApp {
    constructor() {
        this.currentScreen = 'homepage'; // Start with homepage
        // Use config to determine total screens dynamically
        this.totalScreens = window.getTotalVisibleScreens ? window.getTotalVisibleScreens() : 15;
        this.screenInstances = {};
        this.init();
    }

    init() {
        // Create particles container
        this.createParticlesContainer();
        
        // Initialize navigation panel
        this.initNavigationPanel();
        
        // Load the homepage first
        this.loadScreenDirectly('homepage');
        
        // Setup navigation
        this.setupNavigation();
        
        // Create floating particles
        this.createParticles();
    }

    createParticlesContainer() {
        const particlesDiv = document.createElement('div');
        particlesDiv.id = 'particles';
        particlesDiv.className = 'particles';
        document.body.appendChild(particlesDiv);
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

    loadScreenDirectly(screenNumber) {
        try {
            // Hide loading screen
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            
            // Update body class for homepage
            if (screenNumber === 'homepage') {
                document.body.classList.add('homepage');
            } else {
                document.body.classList.remove('homepage');
            }
            
            // Load screen HTML directly based on screen number
            this.loadScreenHTML(screenNumber);
            
            // Load screen-specific CSS
            this.loadScreenCSS(screenNumber);
            
            // Load 3D Coke can script for screen 2
            if (screenNumber === 2) {
                this.load3DCokeCanScript();
            }
            
            // Load and initialize screen JavaScript
            this.loadScreenJS(screenNumber);
            
            // Update current screen
            this.currentScreen = screenNumber;
            
            // Show new screen
            this.showScreen(screenNumber);
            
            // Update navigation
            this.updateNavigation();
            
        } catch (error) {
            console.error('Error loading screen:', error);
            this.showErrorScreen();
        }
    }

    load3DCokeCanScript() {
        // Remove existing 3D script if any
        const existingScript = document.getElementById('coke-can-3d-script');
        if (existingScript) {
            existingScript.remove();
        }
        
        // Add 3D Coke can script
        const script = document.createElement('script');
        script.id = 'coke-can-3d-script';
        script.src = 'scripts/coke-can-3d.js';
        document.head.appendChild(script);
    }

    loadScreenHTML(screenNumber) {
        const container = document.querySelector('.container');
        
        // Define screen HTML content directly
        const screenContent = this.getScreenHTML(screenNumber);
        container.innerHTML = screenContent;
        
        // Initialize quiz if it's a quiz screen
        if (screenNumber >= 9 && screenNumber <= 15) {
            setTimeout(() => {
                if (window.initializeQuizForScreen) {
                    window.initializeQuizForScreen(`screen${screenNumber}`);
                }
            }, 100);
        }
    }

    getScreenHTML(screenNumber) {
        switch (screenNumber) {
            case 'homepage':
                return `
                <div class="screen active" id="homepage">
                    <div class="homepage-container">
                        <!-- Header Section -->
                        <div class="homepage-header">
                            <h1 class="main-title">🎯 Surface Area & Volume Playbook</h1>
                            <p class="subtitle">See the hidden math in every shape around you!</p>
                            <div class="welcome-animation">
                                <div class="floating-shapes">
                                    <div class="shape shape-1">📦</div>
                                    <div class="shape shape-2">🥤</div>
                                    <div class="shape shape-3">🏀</div>
                                    <div class="shape shape-4">🔺</div>
                                </div>
                            </div>
                        </div>

                        <!-- Learning Progress -->
                        <div class="progress-section">
                            <h2>📚 Your Learning Journey</h2>
                            <div class="overall-progress">
                                <div class="progress-stats">
                                    <div class="stat">
                                        <span class="stat-number">5</span>
                                        <span class="stat-label">Completed</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-number">13</span>
                                        <span class="stat-label">Total Concepts</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-number">38%</span>
                                        <span class="stat-label">Progress</span>
                                    </div>
                                </div>
                                <div class="progress-bar-container">
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill" style="width: 38%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Concept Cards Grid -->
                        <div class="concepts-grid">
                            <!-- Concept 1: What are solids, surface area, and volume (COMPLETED) -->
                            <div class="concept-card completed available" data-concept="solids-basics">
                                <div class="card-icon">✅</div>
                                <h3>What are solids, surface area, and volume</h3>
                                <p>Learn the fundamentals of 3D shapes and measurements</p>
                                <div class="card-status completed-status">Completed!</div>
                                <div class="start-button">Revisit</div>
                            </div>

                            <!-- Concept 2: Units, capacity vs volume (COMPLETED) -->
                            <div class="concept-card completed available" data-concept="units-capacity">
                                <div class="card-icon">✅</div>
                                <h3>Units, capacity vs volume</h3>
                                <p>Understand the difference between capacity and volume</p>
                                <div class="card-status completed-status">Completed!</div>
                                <div class="start-button">Revisit</div>
                            </div>

                            <!-- Concept 3: Cuboid basics (COMPLETED) -->
                            <div class="concept-card completed available" data-concept="cuboid-basics">
                                <div class="card-icon">✅</div>
                                <h3>Cuboid basics</h3>
                                <p>Master the rectangular box and its properties</p>
                                <div class="card-status completed-status">Completed!</div>
                                <div class="start-button">Revisit</div>
                            </div>

                            <!-- Concept 4: Cube as a special cuboid (COMPLETED) -->
                            <div class="concept-card completed available" data-concept="cube-special">
                                <div class="card-icon">✅</div>
                                <h3>Cube as a special cuboid</h3>
                                <p>Discover why cubes are special rectangular boxes</p>
                                <div class="card-status completed-status">Completed!</div>
                                <div class="start-button">Revisit</div>
                            </div>

                            <!-- Concept 5: "Uniform cross-section" rule (COMPLETED) -->
                            <div class="concept-card completed available" data-concept="uniform-cross-section">
                                <div class="card-icon">✅</div>
                                <h3>"Uniform cross-section" rule</h3>
                                <p>Learn about shapes with consistent cross-sections</p>
                                <div class="card-status completed-status">Completed!</div>
                                <div class="start-button">Revisit</div>
                            </div>

                            <!-- Concept 6: Right circular cylinder (AVAILABLE TO START) -->
                            <div class="concept-card available" data-concept="right-circular-cylinder">
                                <div class="card-icon">🎯</div>
                                <h3>Right circular cylinder</h3>
                                <p>Explore the amazing world of cylinders and their properties</p>
                                <div class="card-status available-status">Ready to Learn</div>
                                <div class="start-button">Start Learning</div>
                            </div>

                            <!-- Concept 7: Hollow cylinder -->
                            <div class="concept-card locked" data-concept="hollow-cylinder">
                                <div class="card-icon">🔒</div>
                                <h3>Hollow cylinder</h3>
                                <p>Understand cylinders with empty interiors</p>
                                <div class="card-status">Coming Soon</div>
                            </div>

                            <!-- Concept 8: Right circular cone and slant height -->
                            <div class="concept-card locked" data-concept="cone-slant">
                                <div class="card-icon">🔒</div>
                                <h3>Right circular cone and slant height</h3>
                                <p>Master the cone shape and its special measurements</p>
                                <div class="card-status">Coming Soon</div>
                            </div>

                            <!-- Concept 9: Sphere -->
                            <div class="concept-card locked" data-concept="sphere">
                                <div class="card-icon">🔒</div>
                                <h3>Sphere</h3>
                                <p>Discover the perfect round shape</p>
                                <div class="card-status">Coming Soon</div>
                            </div>

                            <!-- Concept 10: Hemisphere and spherical shells -->
                            <div class="concept-card locked" data-concept="hemisphere-shells">
                                <div class="card-icon">🔒</div>
                                <h3>Hemisphere and spherical shells</h3>
                                <p>Explore half-spheres and hollow spheres</p>
                                <div class="card-status">Coming Soon</div>
                            </div>

                            <!-- Concept 11: Composite solids -->
                            <div class="concept-card locked" data-concept="composite-solids">
                                <div class="card-icon">🔒</div>
                                <h3>Composite solids</h3>
                                <p>Combine different shapes to create complex objects</p>
                                <div class="card-status">Coming Soon</div>
                            </div>

                            <!-- Concept 12: Pouring and conservation of volume -->
                            <div class="concept-card locked" data-concept="pouring-conservation">
                                <div class="card-icon">🔒</div>
                                <h3>Pouring and conservation of volume</h3>
                                <p>Learn how volume is conserved when pouring liquids</p>
                                <div class="card-status">Coming Soon</div>
                            </div>

                            <!-- Concept 13: Rate of flow and cross-section -->
                            <div class="concept-card locked" data-concept="rate-flow-cross-section">
                                <div class="card-icon">🔒</div>
                                <h3>Rate of flow and cross-section</h3>
                                <p>Understand how shape affects liquid flow rates</p>
                                <div class="card-status">Coming Soon</div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="homepage-footer">
                            <p>🌟 Ready to become a math master? Choose a concept to begin your adventure!</p>
                        </div>
                    </div>
                </div>`;
            case 1:
                return `
                <div class="screen active" id="screen1">
                    <h1>🎯 Welcome to Math Adventure! 🎯</h1>
                    
                    <div class="video-container">
                        <video id="introVideo" controls preload="auto">
                            <!-- Video source will be set dynamically -->
                            <source src="" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        
                        <!-- Video overlay with play button -->
                        <div class="video-overlay" id="videoOverlay">
                            <div class="play-button">▶️</div>
                            <p>Click to start your adventure!</p>
                        </div>
                    </div>
                    
                    <div class="name-input-section" id="nameInputSection" style="display: none;">
                        <h2>🎤 What's your name, young mathematician?</h2>
                        <p>Tell me your name so we can begin our journey together!</p>
                        
                        <div class="voice-input-container">
                            <div class="mic-button" id="micButton">
                                <div class="mic-icon">🎤</div>
                                <div class="mic-text">Click to speak your name</div>
                            </div>
                            
                            <div class="name-display" id="nameDisplay" style="display: none;">
                                <span>Hello, </span>
                                <span class="student-name" id="studentName"></span>
                                <span>! 👋</span>
                            </div>
                            
                            <div class="input-actions">
                                <input type="text" id="nameTextInput" placeholder="Or type your name here..." maxlength="30">
                                <button class="btn btn-primary" id="continueBtn" style="display: none;">Continue to Math Adventure! 🚀</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="loading-section" id="loadingSection" style="display: none;">
                        <div class="loading-spinner"></div>
                        <p>Preparing your personalized math adventure...</p>
                    </div>
                </div>`;
            case 2:
                return `
                <div class="screen active" id="screen2">
                    <h1>🎯 Math Adventure: The Amazing Coke Can Mystery! 🎯</h1>
                    
                    <div class="can-container">
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
                    </div>
                    
                    <div class="question">
                        <h2><img src="images/thinking-robot.png" alt="Thinking Robot" style="width: 40px; height: 40px; vertical-align: middle; margin-right: 10px;"> Intriguing Question!</h2>
                        <p>If you cut the Coke can open from top to bottom and spread it out, what shape will it be?</p>
                    </div>
                    
                    <!-- Voice Answer Button -->
                    <div class="voice-answer-section">
                        <div class="voice-answer-button" id="voiceAnswerButton">
                            <div class="microphone-icon">🎤</div>
                            <div class="voice-text">Click to speak your answer</div>
                        </div>
                        <div class="voice-status" id="voiceStatus" style="display: none;">
                            <span class="microphone-icon">🎤</span>
                            <span class="status-text">Listening...</span>
                        </div>
                    </div>
                    
                    <div class="feedback" id="feedback"></div>
                    
                    <div class="animation-container" id="animationContainer">
                        <div class="rectangle" id="rectangle">
                            Rectangle: 2πr × h
                        </div>
                    </div>
                </div>`;
            case 3:
                return `
                <div class="screen active" id="screen3">
                    <h1>🎥 Let’s Understand The Coke Can Mystery!</h1>
                    <div class="video-container">
                        <video id="explainerVideo" controls preload="auto">
                            <source src="" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="video-overlay" id="explainerOverlay">
                            <div class="play-button">▶️</div>
                            <p>Tap to play the explainer</p>
                        </div>
                    </div>
                    <div class="caption">We’ll see why peeling the label gives a rectangle and how its size is 2πr × h.</div>
                    <div class="controls-row">
                        <button class="small-btn" id="replayExplainerBtn">Replay</button>
                        <button class="small-btn" id="nextAfterExplainer" style="display:none;">Next ➜</button>
                    </div>
                </div>`;
            case 4:
                return `
                <div class="screen active" id="screen4">
                    <h1>📐 Right Circular Cylinder — The Big Idea</h1>
                    <div class="video-container">
                        <video id="conceptVideo" controls preload="auto">
                            <source src="" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="video-overlay" id="conceptOverlay">
                            <div class="play-button">▶️</div>
                            <p>Tap to play the concept explainer</p>
                        </div>
                    </div>
                    <div class="caption">Understand cylinders: curved surface unrolls to rectangle (2πr × h), plus two circles of radius r.</div>
                    <div class="controls-row">
                        <button class="small-btn" id="replayConceptBtn">Replay</button>
                        <button class="small-btn" id="nextAfterConcept" style="display:none;">Next ➜</button>
                    </div>
                </div>`;
            case 5:
                return `
                <div class="screen active" id="screen5">
                    <h1>🧪 Play Zone: Explore Cylinders!</h1>
                    <div class="sim-layout">
                        <div class="panel controls">
                            <h3>Controls</h3>
                            <div class="slider-row">
                                <label>Radius (r)</label>
                                <input id="rSlider" type="range" min="1" max="10" step="0.5" value="4">
                                <div class="value" id="rVal">4.0 cm</div>
                            </div>
                            <div class="slider-row">
                                <label>Height (h)</label>
                                <input id="hSlider" type="range" min="1" max="20" step="0.5" value="10">
                                <div class="value" id="hVal">10.0 cm</div>
                            </div>
                            <div class="toggles">
                                <button class="toggle-btn" id="btnLabel">Show Unwrapped Label</button>
                                <button class="toggle-btn" id="btnFill">Fill with Water</button>
                                <button class="toggle-btn active" id="btnTopBottom">Show top + bottom</button>
                            </div>
                            <div class="hint" id="hint"></div>
                        </div>

                        <div class="panel results">
                            <h3>Live Formulas</h3>
                            <div class="stat"><div class="label">CSA (2πrh)</div><div class="num" id="csa">—</div></div>
                            <div class="stat"><div class="label">TSA (2πrh + 2πr²)</div><div class="num" id="tsa">—</div></div>
                            <div class="stat"><div class="label">Volume (πr²h)</div><div class="num" id="volume">—</div></div>
                            <div class="stat"><div class="label">Capacity</div><div class="num" id="capacity">—</div></div>
                        </div>
                    </div>

                    <div class="panel viz">
                        <div class="cylinder-container" id="cyl">
                            <svg id="cylinderSVG" width="400" height="300" viewBox="0 0 400 300">
                                <!-- Water gradient definition -->
                                <defs>
                                    <linearGradient id="waterGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                        <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.8"/>
                                        <stop offset="100%" style="stop-color:#0099cc;stop-opacity:0.6"/>
                                    </linearGradient>
                                    
                                    <!-- Clip path for cylinder water fill -->
                                    <clipPath id="cylinderClip">
                                        <path d="M 140 80 Q 200 60 260 80 L 260 220 Q 200 240 140 220 Z"/>
                                    </clipPath>
                                </defs>
                                
                                <!-- Cylinder outline (hollow) -->
                                <ellipse id="cylTop" cx="200" cy="80" rx="60" ry="20" fill="none" stroke="#333" stroke-width="2" opacity="0.8"/>
                                <ellipse id="cylBottom" cx="200" cy="220" rx="60" ry="20" fill="none" stroke="#333" stroke-width="2" opacity="0.8"/>
                                
                                <!-- Cylinder side lines -->
                                <line id="cylSideLeft" x1="140" y1="80" x2="140" y2="220" stroke="#333" stroke-width="2" opacity="0.8"/>
                                <line id="cylSideRight" x1="260" y1="80" x2="260" y2="220" stroke="#333" stroke-width="2" opacity="0.8"/>
                                
                                <!-- Water fill with gradient and clip path (initially empty) -->
                                <rect id="cylFill" x="140" y="220" width="120" height="0" fill="url(#waterGradient)" clip-path="url(#cylinderClip)"/>
                                
                                <!-- Water surface at top (initially hidden) -->
                                <ellipse id="waterSurface" cx="200" cy="80" rx="60" ry="20" fill="url(#waterGradient)" opacity="0.9" style="display: none;"/>
                                
                                <!-- Dimensions labels -->
                                <text id="radiusLabel" x="270" y="150" font-size="12" fill="#666">r</text>
                                <line id="radiusLine" x1="260" y1="150" x2="290" y2="150" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
                                
                                <text id="heightLabel" x="210" y="240" font-size="12" fill="#666">h</text>
                                <line id="heightLine" x1="210" y1="220" x2="210" y2="240" stroke="#666" stroke-width="1" stroke-dasharray="3,3"/>
                            </svg>
                        </div>
                        <div class="unwrapped-label" id="unwrap"></div>
                    </div>
                </div>`;
            case 6:
                return `
                <div class="screen active" id="screen6">
                    <h1>✅ Instant Check</h1>
                    <div class="quiz">
                        <div class="card">
                            <div class="card-head"><div class="badge">1</div><h3>Curved Surface Area Calculation</h3></div>
                            <div class="q-box"><strong>Question:</strong> If a cylinder has radius = 7 cm and height = 10 cm, what is its Curved Surface Area (CSA)?<br/><small>Round your answer to 2 decimal places.</small></div>
                            <div class="row">
                                <input class="input" id="q1Input" type="number" step="0.01" placeholder="Enter CSA in cm²">
                                <button class="btn-cta" id="q1Submit">Check Answer</button>
                            </div>
                            <div class="notice" id="q1Notice">⚠️ Not quite right. Let me give you a hint!</div>
                            <div class="hint-card" id="q1Hint"><strong>Hint:</strong> CSA = 2πrh. Remember π ≈ 3.14159 and CSA is the curved surface only, not including top and bottom (that would be TSA).<div style="margin-top:10px;"><button class="btn-ghost" id="q1TryAgain">Try Again</button></div></div>
                            <div class="feedback" id="q1Feedback"></div>
                        </div>

                        <div class="card">
                            <div class="card-head"><div class="badge alt">2</div><h3>Total Surface Area Concept</h3></div>
                            <div class="q-box"><strong>Question:</strong> The Total Surface Area (TSA) of a cylinder includes which surfaces?</div>
                            <div class="options">
                                <label><input type="radio" name="q2" value="side-only"> Side (curved surface) only</label>
                                <label><input type="radio" name="q2" value="top-bottom-only"> Top and bottom circles only</label>
                                <label><input type="radio" name="q2" value="side-top-bottom"> Side + top + bottom (all surfaces)</label>
                            </div>
                            <button class="btn-cta" id="q2Submit">Submit</button>
                            <div class="feedback" id="q2Feedback"></div>
                            <div class="alert-box" id="q2Alert">❌ Not quite! Let me show you visually.</div>
                            <div class="viz-help" id="q2Viz">
                                <div class="mini-cylinder">
                                    <div class="mini-top"></div>
                                    <div class="mini-bottom"></div>
                                    <div class="mini-outline"></div>
                                </div>
                                <div class="viz-caption">TSA = All highlighted surfaces</div>
                                <div class="q2-try"><button class="btn-ghost" id="q2TryAgain">Try Again</button></div>
                            </div>
                            <div class="actions" id="ctaRow">
                                <button class="btn-ghost" id="goDeeper">Go Deeper</button>
                                <button class="btn-cta" id="moveAhead">Move Ahead</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            case 7:
                return `
                <div class="screen active" id="screen7">
                    <h1>🕌 Tower Cover Problem</h1>
                    <div class="tower-wrap">
                        <div class="narration">“You’ve seen the Qutub Minar. Imagine we want to put a cover on this tall tower. What part do you think we need to measure first?”</div>
                        <div class="tower-scene">
                            <div class="sky"></div>
                            <div class="ground"></div>
                            <img class="qutub-img" src="images/qutub-minar.jpg" alt="Qutub Minar (reference)" onerror="this.style.display='none'">
                            <div class="tower">
                                <div class="tower-body"></div>
                                <div class="tower-top"></div>
                                <div class="cloth-hint"></div>
                            </div>
                        </div>
                        <div class="yn-row" id="ynRow">
                            <span>Shall we solve this together?</span>
                            <button id="ynYes" class="btn-cta">Yes!</button>
                            <button id="ynNo" class="btn-ghost">Not sure</button>
                        </div>
                        <div id="nudger" class="hint-card" style="display:none;">No worries — it’s just the curved surface! We’ll use CSA = 2πrh. Try it once.</div>
                        <div id="towerQ" style="display:none;">
                            <div class="q-box"><strong>Question:</strong> The tower is roughly cylindrical. Workers need cloth to cover only the curved surface (ignore the dome). If radius r = 7 m and height h = 72 m, how much cloth area is needed?</div>
                            <div class="row">
                                <input id="towerAns" class="input" type="number" step="0.01" placeholder="Area in m²">
                                <button id="towerSubmit" class="btn-cta">Check</button>
                            </div>
                            <div id="towerHint" class="hint-card"><strong>Hint:</strong> Use CSA = 2πrh. Only curved surface — no top or bottom.</div>
                            <div id="towerFeedback" class="feedback"></div>
                        </div>
                    </div>
                </div>`;
            case 8:
                return `
                <div class="screen active" id="screen8">
                    <div class="beaker-sim">
                        <div class="scene-intro">
                            <h2>🧪 Beaker Volume Mystery</h2>
                            <p>Look at these two laboratory beakers. Which one can hold more water?</p>
                        </div>
                        
                        <div class="beaker-container">
                            <div class="beaker" id="beakerA">
                                <div class="beaker-label">Beaker A</div>
                                <div class="beaker-visual">
                                    <div class="beaker-svg-container">
                                        <svg width="60" height="200" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <!-- Main beaker body - tall and slim -->
                                            <rect x="10" y="20" width="40" height="160" fill="none" stroke="#000000" stroke-width="2" rx="5"/>
                                            
                                            <!-- Beaker rim with slight flare -->
                                            <path d="M 8 20 L 52 20 L 50 15 L 10 15 Z" fill="none" stroke="#000000" stroke-width="2"/>
                                            
                                            <!-- Pouring spout on left side -->
                                            <path d="M 8 20 L 5 25 L 8 30 L 10 25 Z" fill="none" stroke="#000000" stroke-width="2"/>
                                            
                                            <!-- Graduation marks -->
                                            <line x1="45" y1="30" x2="50" y2="30" stroke="#000000" stroke-width="1"/>
                                            <line x1="45" y1="50" x2="50" y2="50" stroke="#000000" stroke-width="1"/>
                                            <line x1="45" y1="70" x2="50" y2="70" stroke="#000000" stroke-width="1"/>
                                            <line x1="45" y1="90" x2="50" y2="90" stroke="#000000" stroke-width="1"/>
                                            <line x1="45" y1="110" x2="50" y2="110" stroke="#000000" stroke-width="1"/>
                                            <line x1="45" y1="130" x2="50" y2="130" stroke="#000000" stroke-width="1"/>
                                            <line x1="45" y1="150" x2="50" y2="150" stroke="#000000" stroke-width="1"/>
                                            <line x1="45" y1="170" x2="50" y2="170" stroke="#000000" stroke-width="1"/>
                                            
                                            <!-- Water fill area - matches beaker shape exactly -->
                                            <defs>
                                                <clipPath id="beakerAClip">
                                                    <rect x="10" y="20" width="40" height="160" rx="5"/>
                                                </clipPath>
                                            </defs>
                                            
                                            <!-- Water fill container - starts empty (height=0) -->
                                            <rect x="10" y="180" width="40" height="0" fill="url(#waterGradient)" rx="5" clip-path="url(#beakerAClip)" class="water-fill" id="waterFillA"/>
                                            
                                            <!-- Water gradient definition -->
                                            <defs>
                                                <linearGradient id="waterGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                                    <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.8"/>
                                                    <stop offset="100%" style="stop-color:#0099cc;stop-opacity:0.6"/>
                                                </linearGradient>
                                            </defs>
                                            
                                            <!-- Base support -->
                                            <rect x="20" y="195" width="20" height="5" fill="none" stroke="#000000" stroke-width="1"/>
                                        </svg>
                                    </div>
                                    <div class="volume-counter" id="counterA"></div>
                                </div>
                                <div class="beaker-params">
                                    <div class="param-row">
                                        <span>Radius:</span>
                                        <span class="param-value">3 cm</span>
                                    </div>
                                    <div class="param-row">
                                        <span>Height:</span>
                                        <span class="param-value">100 cm</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="beaker" id="beakerB">
                                <div class="beaker-label">Beaker B</div>
                                <div class="beaker-visual">
                                    <div class="beaker-svg-container">
                                        <svg width="300" height="80" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <!-- Main beaker body - short and wide -->
                                            <rect x="20" y="10" width="260" height="60" fill="none" stroke="#000000" stroke-width="2" rx="5"/>
                                            
                                            <!-- Beaker rim with slight flare -->
                                            <path d="M 15 10 L 285 10 L 280 5 L 20 5 Z" fill="none" stroke="#000000" stroke-width="2"/>
                                            
                                            <!-- Pouring spout on left side -->
                                            <path d="M 15 10 L 10 15 L 15 20 L 20 15 Z" fill="none" stroke="#000000" stroke-width="2"/>
                                            
                                            <!-- Graduation marks -->
                                            <line x1="30" y1="15" x2="30" y2="25" stroke="#000000" stroke-width="1"/>
                                            <line x1="60" y1="15" x2="60" y2="25" stroke="#000000" stroke-width="1"/>
                                            <line x1="90" y1="15" x2="90" y2="25" stroke="#000000" stroke-width="1"/>
                                            <line x1="120" y1="15" x2="120" y2="25" stroke="#000000" stroke-width="1"/>
                                            <line x1="150" y1="15" x2="150" y2="25" stroke="#000000" stroke-width="1"/>
                                            <line x1="180" y1="15" x2="180" y2="25" stroke="#000000" stroke-width="1"/>
                                            <line x1="210" y1="15" x2="210" y2="25" stroke="#000000" stroke-width="1"/>
                                            <line x1="240" y1="15" x2="240" y2="25" stroke="#000000" stroke-width="1"/>
                                            <line x1="270" y1="15" x2="270" y2="25" stroke="#000000" stroke-width="1"/>
                                            
                                            <!-- Water fill area - matches beaker shape exactly -->
                                            <defs>
                                                <clipPath id="beakerBClip">
                                                    <rect x="20" y="10" width="260" height="60" rx="5"/>
                                                </clipPath>
                                            </defs>
                                            
                                            <!-- Water fill container - starts empty (height=0) -->
                                            <rect x="20" y="70" width="260" height="0" fill="url(#waterGradient)" rx="5" clip-path="url(#beakerBClip)" class="water-fill" id="waterFillB"/>
                                            
                                            <!-- Water gradient definition -->
                                            <defs>
                                                <linearGradient id="waterGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                                    <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.6"/>
                                                    <stop offset="100%" style="stop-color:#0099cc;stop-opacity:0.8"/>
                                                </linearGradient>
                                            </defs>
                                            
                                            <!-- Base support -->
                                            <rect x="30" y="75" width="240" height="5" fill="none" stroke="#000000" stroke-width="1"/>
                                        </svg>
                                    </div>
                                    <div class="volume-counter" id="counterB"></div>
                                </div>
                                <div class="beaker-params">
                                    <div class="param-row">
                                        <span>Radius:</span>
                                        <span class="param-value">15 cm</span>
                                    </div>
                                    <div class="param-row">
                                        <span>Height:</span>
                                        <span class="param-value">4 cm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="selection-section">
                            <h3><img src="images/thinking-robot.png" alt="Thinking Robot" style="width: 30px; height: 30px; vertical-align: middle; margin-right: 8px;"> Which beaker holds more water?</h3>
                            <div class="selection-options">
                                                            <button class="selection-btn" id="selectA">Beaker A (Tall & Slim)</button>
                            <button class="selection-btn" id="selectB">Beaker B (Short & Wide)</button>
                                <button class="selection-btn" id="selectEqual">They're Equal! 🎯</button>
                            </div>
                        </div>
                        

                        
                        <div class="explanation" id="explanation" style="display: none;">
                            <!-- Explanation will be populated by JS -->
                        </div>
                        
                        <!-- Success banner for correct answer -->
                        <div class="success-banner" id="successBanner" style="display: none;">
                            <div class="success-content">
                                <h3>🎉 Excellent! You're absolutely correct!</h3>
                                <p>Both beakers hold exactly the same amount of water!</p>
                                <button class="simulation-btn" id="openSimulationBtn">🧪 Try the Simulation!</button>
                            </div>
                        </div>
                        
                        <!-- Popup for wrong answers -->
                        <div class="popup-overlay" id="popupOverlay" style="display: none;">
                            <div class="popup-content">
                                <div class="popup-header">
                                    <h3><img src="images/thinking-robot.png" alt="Thinking Robot" style="width: 30px; height: 30px; vertical-align: middle; margin-right: 8px;"> Let's Think About This!</h3>
                                    <div class="audio-indicator" id="audioIndicator" style="display: none;">
                                        <span class="audio-icon">🔊</span>
                                        <span class="audio-text">Audio Playing...</span>
                                    </div>
                                </div>
                                <div class="popup-body">
                                    <p>This is wrong! Let's try it by doing it yourself.</p>
                                    <p>We will go through it together in the simulation.</p>
                                </div>
                                <div class="popup-footer">
                                    <button class="popup-btn" id="popupCloseBtn">Got it!</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Audio element for popup message -->
                        <audio id="popupAudio" preload="auto">
                            <source src="audio/popup-message.mp3" type="audio/mpeg">
                            <source src="audio/popup-message.wav" type="audio/wav">
                            Your browser does not support the audio element.
                        </audio>
                        
                        <!-- Second popup for beaker simulation -->
                        <div class="simulation-popup-overlay" id="simulationPopupOverlay" style="display: none;">
                            <div class="simulation-popup-content">
                                <div class="simulation-popup-header">
                                    <div class="popup-close-btn" id="simulationPopupCloseBtn">×</div>
                                    <h3>🧪 Let's Experiment with the Beakers!</h3>
                                    <p>Use the taps above each beaker to control water flow</p>
                                </div>
                                
                                <div class="simulation-popup-body">
                                    <div class="popup-beaker-container">
                                        <div class="popup-beaker" id="popupBeakerA">
                                            <div class="popup-tap" id="popupTapA">
                                                <div class="popup-tap-handle" id="popupTapHandleA">🔧</div>
                                                <div class="popup-tap-spout"></div>
                                                <div class="water-drops" id="waterDropsA"></div>
                                            </div>
                                            <div class="popup-beaker-visual">
                                                <svg width="60" height="200" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <!-- Main beaker body - tall and slim -->
                                                    <rect x="10" y="20" width="40" height="160" fill="none" stroke="#000000" stroke-width="2" rx="5"/>
                                                    
                                                    <!-- Beaker rim with slight flare -->
                                                    <path d="M 8 20 L 52 20 L 50 15 L 10 15 Z" fill="none" stroke="#000000" stroke-width="2"/>
                                                    
                                                    <!-- Pouring spout on left side -->
                                                    <path d="M 8 20 L 5 25 L 8 30 L 10 25 Z" fill="none" stroke="#000000" stroke-width="2"/>
                                                    
                                                    <!-- Graduation marks -->
                                                    <line x1="45" y1="30" x2="50" y2="30" stroke="#000000" stroke-width="1"/>
                                                    <line x1="45" y1="50" x2="50" y2="50" stroke="#000000" stroke-width="1"/>
                                                    <line x1="45" y1="70" x2="50" y2="70" stroke="#000000" stroke-width="1"/>
                                                    <line x1="45" y1="90" x2="50" y2="90" stroke="#000000" stroke-width="1"/>
                                                    <line x1="45" y1="110" x2="50" y2="110" stroke="#000000" stroke-width="1"/>
                                                    <line x1="45" y1="130" x2="50" y2="130" stroke="#000000" stroke-width="1"/>
                                                    <line x1="45" y1="150" x2="50" y2="150" stroke="#000000" stroke-width="1"/>
                                                    <line x1="45" y1="170" x2="50" y2="170" stroke="#000000" stroke-width="1"/>
                                                    
                                                    <!-- Water fill area - matches beaker shape exactly -->
                                                    <defs>
                                                        <clipPath id="popupBeakerAClip">
                                                            <rect x="10" y="20" width="40" height="160" rx="5"/>
                                                        </clipPath>
                                                    </defs>
                                                    
                                                    <!-- Water fill container - starts empty (height=0) -->
                                                    <rect x="10" y="20" width="40" height="0" fill="url(#popupWaterGradient)" rx="5" clip-path="url(#popupBeakerAClip)" class="popup-water-fill" id="popupWaterFillA"/>
                                                    
                                                    <!-- Water gradient definition -->
                                                    <defs>
                                                        <linearGradient id="popupWaterGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                                            <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.8"/>
                                                            <stop offset="100%" style="stop-color:#0099cc;stop-opacity:0.6"/>
                                                        </linearGradient>
                                                    </defs>
                                                    
                                                    <!-- Base support -->
                                                    <rect x="20" y="195" width="20" height="5" fill="none" stroke="#000000" stroke-width="1"/>
                                                </svg>
                                            </div>
                                            <div class="popup-beaker-label">Beaker A</div>
                                            <div class="popup-beaker-params">
                                                <div class="param-row">
                                                    <span>Radius:</span>
                                                    <span class="param-value">3 cm</span>
                                                </div>
                                                <div class="param-row">
                                                    <span>Height:</span>
                                                    <span class="param-value">100 cm</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="popup-beaker" id="popupBeakerB">
                                            <div class="popup-tap" id="popupTapB">
                                                <div class="popup-tap-handle" id="popupTapHandleB">🔧</div>
                                                <div class="popup-tap-spout"></div>
                                                <div class="water-drops" id="waterDropsB"></div>
                                            </div>
                                            <div class="popup-beaker-visual">
                                                <svg width="300" height="80" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <!-- Main beaker body - short and wide -->
                                                    <rect x="20" y="10" width="260" height="60" fill="none" stroke="#000000" stroke-width="2" rx="5"/>
                                                    
                                                    <!-- Beaker rim with slight flare -->
                                                    <path d="M 15 10 L 285 10 L 280 5 L 20 5 Z" fill="none" stroke="#000000" stroke-width="2"/>
                                                    
                                                    <!-- Pouring spout on left side -->
                                                    <path d="M 15 10 L 10 15 L 15 20 L 20 15 Z" fill="none" stroke="#000000" stroke-width="2"/>
                                                    
                                                    <!-- Graduation marks -->
                                                    <line x1="30" y1="15" x2="30" y2="25" stroke="#000000" stroke-width="1"/>
                                                    <line x1="60" y1="15" x2="60" y2="25" stroke="#000000" stroke-width="1"/>
                                                    <line x1="90" y1="15" x2="90" y2="25" stroke="#000000" stroke-width="1"/>
                                                    <line x1="120" y1="15" x2="120" y2="25" stroke="#000000" stroke-width="1"/>
                                                    <line x1="150" y1="15" x2="150" y2="25" stroke="#000000" stroke-width="1"/>
                                                    <line x1="180" y1="15" x2="180" y2="25" stroke="#000000" stroke-width="1"/>
                                                    <line x1="210" y1="15" x2="210" y2="25" stroke="#000000" stroke-width="1"/>
                                                    <line x1="240" y1="15" x2="240" y2="25" stroke="#000000" stroke-width="1"/>
                                                    <line x1="270" y1="15" x2="270" y2="25" stroke="#000000" stroke-width="1"/>
                                                    
                                                    <!-- Water fill area - matches beaker shape exactly -->
                                                    <defs>
                                                        <clipPath id="popupBeakerBClip">
                                                            <rect x="20" y="10" width="260" height="60" rx="5"/>
                                                        </clipPath>
                                                    </defs>
                                                    
                                                    <!-- Water fill container - starts empty (height=0) -->
                                                    <rect x="20" y="10" width="260" height="0" fill="url(#popupWaterGradient)" rx="5" clip-path="url(#popupBeakerBClip)" class="popup-water-fill" id="popupWaterFillB"/>
                                                    
                                                    <!-- Water gradient definition -->
                                                    <defs>
                                                        <linearGradient id="popupWaterGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                                            <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.6"/>
                                                            <stop offset="100%" style="stop-color:#0099cc;stop-opacity:0.8"/>
                                                        </linearGradient>
                                                    </defs>
                                                    
                                                    <!-- Base support -->
                                                    <rect x="30" y="75" width="240" height="5" fill="none" stroke="#000000" stroke-width="1"/>
                                                </svg>
                                            </div>
                                            <div class="popup-beaker-label">Beaker B</div>
                                            <div class="popup-beaker-params">
                                                <div class="param-row">
                                                    <span>Radius:</span>
                                                    <span class="param-value">15 cm</span>
                                                </div>
                                                <div class="param-row">
                                                    <span>Height:</span>
                                                    <span class="param-value">4 cm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="simulation-popup-footer">
                                    <p class="popup-instruction">💡 Tap the handles above each beaker to control water flow!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            case 9:
                // Quiz Introduction Screen
                return `
                <div class="screen active" id="screen9">
                    <div class="quiz-intro">
                        <div class="quiz-intro-content">
                            <h1>🎯 Quiz Time!</h1>
                            <p>Great job learning about right circular cylinders!</p>
                            <p>Now let's test your knowledge with 5 questions.</p>
                            
                            <div class="countdown-timer">
                                <div class="timer-circle">
                                    <svg width="120" height="120" viewBox="0 0 120 120">
                                        <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" stroke-width="8"/>
                                        <circle cx="60" cy="60" r="54" fill="none" stroke="#4CAF50" stroke-width="8" 
                                                stroke-dasharray="339.292" stroke-dashoffset="339.292" id="timerProgress"/>
                                    </svg>
                                    <div class="timer-text">
                                        <span id="timerCount">5</span>
                                    </div>
                                </div>
                                <p class="timer-label">Quiz starts in...</p>
                            </div>
                            
                            <div class="quiz-rules">
                                <h3>📋 Quiz Rules:</h3>
                                <ul>
                                    <li>5 questions total</li>
                                    <li>One question per screen</li>
                                    <li>No answer reveal until the end</li>
                                    <li>Take your time to think!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
            case 10:
                // Quiz Question 1
                return `
                <div class="screen active" id="screen10">
                    <div class="quiz-question">
                        <div class="question-header">
                            <span class="question-number">Question 1 of 5</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 20%"></div>
                            </div>
                        </div>
                        
                        <div class="question-content">
                            <h2>🧮 Cylinder in a Cube</h2>
                            <div class="question-text">
                                <p>A cylindrical pole perfectly fits inside a cube so that it touches all faces of the cube.</p>
                                <p>If the cube's side is 10 cm, what's the volume of the cylinder?</p>
                            </div>
                            
                            <div class="answer-options">
                                <button class="answer-btn" data-answer="A">a) 1000 cm³</button>
                                <button class="answer-btn" data-answer="B">b) 500 π cm³</button>
                                <button class="answer-btn" data-answer="C">c) 250 π cm³</button>
                                <button class="answer-btn" data-answer="D">d) 750 π cm³</button>
                            </div>
                        </div>
                        
                        <div class="question-navigation">
                            <!-- Navigation handled automatically -->
                        </div>
                    </div>
                </div>`;
            case 11:
                // Quiz Question 2
                return `
                <div class="screen active" id="screen11">
                    <div class="quiz-question">
                        <div class="question-header">
                            <span class="question-number">Question 2 of 5</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 40%"></div>
                            </div>
                        </div>
                        
                        <div class="question-content">
                            <h2>💧 Water Tank Transfer</h2>
                            <div class="question-text">
                                <p>A water tank is shaped like a cylinder and is completely full.</p>
                                <p>If you pour all the water into another tank of the same radius but twice the height, what will happen?</p>
                            </div>
                            
                            <div class="answer-options">
                                <button class="answer-btn" data-answer="A">a) The second tank will still be full</button>
                                <button class="answer-btn" data-answer="B">b) The water will fill exactly half the second tank</button>
                                <button class="answer-btn" data-answer="C">c) The water will fill exactly one-fourth of the second tank</button>
                                <button class="answer-btn" data-answer="D">d) The second tank will overflow</button>
                            </div>
                        </div>
                        
                        <div class="question-navigation">
                            <!-- Navigation handled automatically -->
                        </div>
                    </div>
                </div>`;
            case 12:
                // Quiz Question 3
                return `
                <div class="screen active" id="screen12">
                    <div class="quiz-question">
                        <div class="question-header">
                            <span class="question-number">Question 3 of 5</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 60%"></div>
                            </div>
                        </div>
                        
                        <div class="question-content">
                            <h2>🔍 Surface Area Components</h2>
                            <div class="question-text">
                                <p>Which of these is not part of the surface area of a closed cylinder?</p>
                            </div>
                            
                            <div class="answer-options">
                                <button class="answer-btn" data-answer="A">a) Top circle</button>
                                <button class="answer-btn" data-answer="B">b) Bottom circle</button>
                                <button class="answer-btn" data-answer="C">c) Curved surface</button>
                                <button class="answer-btn" data-answer="D">d) Diagonal face</button>
                            </div>
                        </div>
                        
                        <div class="question-navigation">
                            <!-- Navigation handled automatically -->
                        </div>
                    </div>
                </div>`;
            case 13:
                // Quiz Question 4
                return `
                <div class="screen active" id="screen13">
                    <div class="quiz-question">
                        <div class="question-header">
                            <span class="question-number">Question 4 of 5</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 80%"></div>
                            </div>
                        </div>
                        
                        <div class="question-content">
                            <h2>📏 Curved Surface Area Calculation</h2>
                            <div class="question-text">
                                <p>A cylinder has a radius of 7 cm and a height of 10 cm.</p>
                                <p>What is its curved surface area? (Use π = 3.14)</p>
                            </div>
                            
                            <div class="input-answer-section">
                                <input type="number" id="question4Input" class="answer-input" placeholder="Enter your answer" step="0.1" min="0">
                                <span class="unit-label">cm²</span>
                                <button class="submit-answer-btn" data-question="4">Submit Answer</button>
                            </div>
                        </div>
                        
                        <div class="question-navigation">
                            <!-- Navigation handled automatically -->
                        </div>
                    </div>
                </div>`;
            case 14:
                // Quiz Question 5
                return `
                <div class="screen active" id="screen14">
                    <div class="quiz-question">
                        <div class="question-header">
                            <span class="question-number">Question 5 of 5</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 100%"></div>
                            </div>
                        </div>
                        
                        <div class="question-content">
                            <h2>🥫 Tin Can Surface Area</h2>
                            <div class="question-text">
                                <p>A tin can has radius 3.5 cm and height 14 cm.</p>
                                <p>Find its total surface area. (Use π = 3.14)</p>
                            </div>
                            
                            <div class="input-answer-section">
                                <input type="number" id="question5Input" class="answer-input" placeholder="Enter your answer" step="0.1" min="0">
                                <span class="unit-label">cm²</span>
                                <button class="submit-answer-btn" data-question="5">Submit Answer</button>
                            </div>
                        </div>
                        
                        <div class="question-navigation">
                            <!-- Navigation handled automatically -->
                        </div>
                    </div>
                </div>`;
            case 15:
                // Quiz Results Screen
                return `
                <div class="screen active" id="screen15">
                    <div class="quiz-results">
                        <div class="results-header">
                            <h1>🎉 Quiz Complete!</h1>
                            <p>Great job completing the quiz!</p>
                        </div>
                        
                        <div class="results-summary">
                            <div class="score-display">
                                <div class="score-circle">
                                    <span id="finalScore">0</span>
                                    <span class="score-label">/5</span>
                                </div>
                                <h3 id="scoreMessage">Loading...</h3>
                            </div>
                            
                            <div class="performance-breakdown">
                                <h4>📊 Performance Breakdown:</h4>
                                <div id="questionResults"></div>
                            </div>
                            
                            <div class="strength-areas">
                                <h4>💪 Your Strengths:</h4>
                                <div id="strengthAreas"></div>
                            </div>
                            
                            <div class="improvement-areas">
                                <h4>📚 Areas to Improve:</h4>
                                <div id="improvementAreas"></div>
                            </div>
                        </div>
                        
                        <div class="results-actions">
                            <button class="btn btn-primary" id="reviewAnswersBtn">Review Answers</button>
                            <button class="btn btn-secondary" id="retakeQuizBtn">Retake Quiz</button>
                            <button class="btn btn-success" id="continueLearningBtn">Continue Learning</button>
                        </div>
                    </div>
                </div>`;
            // Add more cases as we create more screens
            default:
                return '<div class="screen"><h1>Screen not implemented yet</h1></div>';
        }
    }

    loadScreenCSS(screenNumber) {
        // Remove existing screen-specific CSS
        const existingLink = document.getElementById('screen-css');
        if (existingLink) {
            existingLink.remove();
        }
        
        // Add new screen-specific CSS
        const link = document.createElement('link');
        link.id = 'screen-css';
        link.rel = 'stylesheet';
        
        // Homepage uses homepage.css
        if (screenNumber === 'homepage') {
            link.href = `styles/homepage.css?v=${Date.now()}`;
        }
        // Quiz screens use quiz.css
        else if (screenNumber >= 9 && screenNumber <= 15) {
            link.href = `styles/quiz.css?v=${Date.now()}`;
        } else {
            link.href = `styles/screen${screenNumber}.css?v=${Date.now()}`;
        }
        
        document.head.appendChild(link);
    }

    loadScreenJS(screenNumber) {
        // Remove existing screen script
        const existingScript = document.getElementById('screen-script');
        if (existingScript) {
            existingScript.remove();
        }
        
        // Add new screen script
        const script = document.createElement('script');
        script.id = 'screen-script';
        
        // Homepage uses homepage.js
        if (screenNumber === 'homepage') {
            script.src = `scripts/homepage.js?v=${Date.now()}`;
        }
        // Quiz screens use quiz.js
        else if (screenNumber >= 9 && screenNumber <= 15) {
            script.src = `scripts/quiz.js?v=${Date.now()}`;
        } else {
            script.src = `scripts/screen${screenNumber}.js?v=${Date.now()}`;
        }
        
        // Initialize screen instance after script loads
        script.onload = () => {
            this.initializeScreen(screenNumber);
            // Initialize quiz for quiz screens
            if (screenNumber >= 9 && screenNumber <= 15 && window.initializeQuizForScreen) {
                setTimeout(() => {
                    window.initializeQuizForScreen(screenNumber);
                }, 100);
            }
        };
        
        script.onerror = () => {
            console.error('Failed to load screen JavaScript');
            this.initializeScreen(screenNumber);
            // Initialize quiz for quiz screens even on error
            if (screenNumber >= 9 && screenNumber <= 15 && window.initializeQuizForScreen) {
                setTimeout(() => {
                    window.initializeQuizForScreen(screenNumber);
                }, 100);
            }
        };
        
        document.head.appendChild(script);
    }

    initializeScreen(screenNumber) {
        // Clean up previous screen instance
        if (this.screenInstances[this.currentScreen]) {
            this.screenInstances[this.currentScreen].destroy();
        }
        
        // Initialize new screen based on screen number
        switch (screenNumber) {
            case 'homepage':
                if (typeof HomepageScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new HomepageScreen();
                }
                break;
            case 1:
                if (typeof NameIntroScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new NameIntroScreen();
                }
                break;
            case 2:
                if (typeof DabbaQuestionScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new DabbaQuestionScreen();
                    // Trigger transition for Screen 2
                    this.triggerScreenTransition(2);
                }
                break;
            case 3:
                if (typeof DabbaExplainerScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new DabbaExplainerScreen();
                }
                break;
            case 4:
                if (typeof CylinderConceptScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new CylinderConceptScreen();
                    // Trigger transition for Screen 4
                    this.triggerScreenTransition(4);
                }
                break;
            case 5:
                if (typeof CylinderSimScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new CylinderSimScreen();
                }
                break;
            case 6:
                if (typeof CylinderAdaptiveCheckScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new CylinderAdaptiveCheckScreen();
                }
                break;
            case 7:
                if (typeof TowerCSAScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new TowerCSAScreen();
                }
                break;
            case 8:
                if (typeof BeakerSimScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new BeakerSimScreen();
                }
                break;
            case 'summary':
                // Concept Summary Screen - load dynamically
                this.loadSummaryScreen();
                return; // Exit early since we're handling this specially
            case 9:
                // Quiz Introduction Screen - no special initialization needed
                break;
            case 10:
                // Quiz Question 1 - no special initialization needed
                break;
            case 11:
                // Quiz Question 2 - no special initialization needed
                break;
            case 12:
                // Quiz Question 3 - no special initialization needed
                break;
            case 13:
                // Quiz Question 4 - no special initialization needed
                break;
            case 14:
                // Quiz Question 5 - no special initialization needed
                break;
            case 15:
                // Quiz Results Screen - no special initialization needed
                break;
            // Add more cases as we create more screens
            default:
                console.log('Screen not implemented yet');
        }
    }

    hideCurrentScreen() {
        const currentScreenElement = document.querySelector('.screen.active');
        if (currentScreenElement) {
            currentScreenElement.classList.remove('active');
        }
    }

    showScreen(screenNumber) {
        const screenElement = document.getElementById(`screen${screenNumber}`);
        if (screenElement) {
            screenElement.classList.add('active');
        }
    }

    setupNavigation() {
        const navigation = document.createElement('div');
        navigation.className = 'navigation';
        navigation.innerHTML = `
            <button class="nav-btn" id="prevBtn" onclick="app.previousScreen()">← Previous</button>
            <span id="screenIndicator">Screen 1 of ${this.totalScreens}</span>
            <button class="nav-btn" id="nextBtn" onclick="app.nextScreen()">Next →</button>
        `;
        document.body.appendChild(navigation);
        
        // Initially hide previous button
        document.getElementById('prevBtn').style.display = 'none';
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicator = document.getElementById('screenIndicator');
        
        if (!prevBtn || !nextBtn || !indicator) return;
        
        // Update indicator
        indicator.textContent = `Screen ${this.currentScreen} of ${this.totalScreens}`;
        
        // Show/hide navigation buttons
        prevBtn.style.display = this.currentScreen === 1 ? 'none' : 'inline-block';
        nextBtn.style.display = this.currentScreen === this.totalScreens ? 'none' : 'inline-block';
        
        // Update active state
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        if (indicator) indicator.classList.add('active');
        
        // Update left navigation panel (only if not on homepage)
        if (this.currentScreen !== 'homepage') {
            this.updateNavigationState(this.currentScreen);
            // Ensure panel is open when first landing on screen 1
            this.ensureNavigationPanelOpen();
            // Show navigation panel when leaving homepage
            this.showNavigationPanelOnOtherScreens();
        }
    }

    previousScreen() {
        // Find the previous visible screen
        let prevScreen = this.currentScreen - 1;
        while (prevScreen >= 1 && window.isScreenVisible && !window.isScreenVisible(prevScreen)) {
            prevScreen--;
        }
        if (prevScreen >= 1) {
            this.loadScreenDirectly(prevScreen);
        }
    }

    nextScreen() {
        console.log('nextScreen() called, currentScreen:', this.currentScreen);
        
        // Use config to get the next visible screen
        const nextScreen = window.getNextScreen ? window.getNextScreen(this.currentScreen) : this.currentScreen + 1;
        console.log('nextScreen:', nextScreen);
        
        if (nextScreen) {
            // Load screen directly - transitions will be handled by individual screens
            this.loadScreenDirectly(nextScreen);
        }
    }

    loadScreenDirectly(screenNumber) {
        console.log('loadScreenDirectly() called with screen:', screenNumber);
        
        if (screenNumber === 'summary') {
            this.loadSummaryScreen();
            return;
        }
        
        if (screenNumber === 'homepage') {
            this.loadHomepageScreen();
            return;
        }
        
        // Load regular numbered screens
        this.hideCurrentScreen();
        
        // Load screen HTML
        this.loadScreenHTML(screenNumber);
        
        // Load screen CSS
        this.loadScreenCSS(screenNumber);
        
        // Load screen JavaScript
        this.loadScreenJS(screenNumber);
        
        // Update current screen
        this.currentScreen = screenNumber;
        
        // Update navigation
        this.updateNavigation();
        
        // Show the new screen
        this.showScreen(screenNumber);
    }

    loadHomepageScreen() {
        const container = document.querySelector('.container');
        if (!container) return;
        
        container.innerHTML = this.getScreenHTML('homepage');
        
        // Load homepage CSS and JS
        this.loadScreenCSS('homepage');
        this.loadScreenJS('homepage');
        
        this.currentScreen = 'homepage';
        this.initializeScreen('homepage');
        
        // Explicitly hide navigation panel on homepage
        this.hideNavigationPanelOnHomepage();
    }

    loadScreenHTML(screenNumber) {
        const container = document.querySelector('.container');
        if (!container) return;
        
        container.innerHTML = this.getScreenHTML(screenNumber);
    }

    showErrorScreen() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <h1>😔 Oops! Something went wrong!</h1>
            <p>We couldn't load the screen. Please refresh the page and try again.</p>
            <button class="btn btn-primary" onclick="location.reload()">Refresh Page</button>
        `;
    }

    // Method to add new screens dynamically
    addScreen(screenNumber, screenData) {
        this.totalScreens = Math.max(this.totalScreens, screenNumber);
        // This method can be used to dynamically add new screens
    }

    // Summary Screen Methods
    loadSummaryScreen() {
        console.log('loadSummaryScreen() called');
        const container = document.querySelector('.container');
        
        if (!container) {
            console.error('Container not found');
            return;
        }
        
        console.log('Fetching summary screen HTML...');
        
        // Fetch the summary screen HTML
        fetch('screens/screen-summary.html')
            .then(response => {
                console.log('Fetch response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                console.log('HTML loaded, length:', html.length);
                console.log('HTML preview:', html.substring(0, 200));
                
                container.innerHTML = html;
                console.log('HTML inserted into container');
                
                // Load summary screen CSS
                console.log('Loading summary CSS...');
                this.loadSummaryCSS();
                
                // Load and initialize summary screen JavaScript
                console.log('Loading summary JavaScript...');
                this.loadSummaryJS();
                
                // Update current screen
                this.currentScreen = 'summary';
                console.log('Current screen updated to:', this.currentScreen);
                
                // Update navigation
                this.updateNavigation();
                
                // Trigger summary-specific bot transition after screen is fully loaded
                setTimeout(() => {
                    this.triggerSummaryTransition();
                }, 500);
                
                // Debug: Check if content is visible
                setTimeout(() => {
                    const summaryContent = document.querySelector('.summary-container');
                    console.log('Summary content element:', summaryContent);
                    if (summaryContent) {
                        console.log('Summary content visible:', summaryContent.offsetWidth > 0 && summaryContent.offsetHeight > 0);
                        console.log('Summary content dimensions:', summaryContent.offsetWidth, 'x', summaryContent.offsetHeight);
                    }
                }, 500);
            })
            .catch(error => {
                console.error('Error loading summary screen:', error);
                console.error('Error details:', {
                    message: error.message,
                    stack: error.stack
                });
                this.showErrorScreen();
            });
    }

    loadSummaryCSS() {
        console.log('loadSummaryCSS() called');
        
        // Remove existing summary CSS if any
        const existingCSS = document.getElementById('summary-screen-css');
        if (existingCSS) {
            existingCSS.remove();
        }
        
        // Add summary screen CSS
        const link = document.createElement('link');
        link.id = 'summary-screen-css';
        link.rel = 'stylesheet';
        link.href = 'styles/screen-summary.css';
        
        // Add error handling for CSS loading
        link.onerror = () => {
            console.error('Failed to load summary CSS:', link.href);
        };
        
        link.onload = () => {
            console.log('Summary CSS loaded successfully');
        };
        
        document.head.appendChild(link);
        console.log('Summary CSS link added to head');
    }

    loadSummaryJS() {
        console.log('loadSummaryJS() called');
        
        // Remove existing summary JS if any
        const existingJS = document.getElementById('summary-screen-js');
        if (existingJS) {
            existingJS.remove();
        }
        
        // Add summary screen JavaScript
        const script = document.createElement('script');
        script.id = 'summary-screen-js';
        script.src = 'scripts/screen-summary.js';
        
        // Add error handling for JS loading
        script.onerror = () => {
            console.error('Failed to load summary JavaScript:', script.src);
        };
        
        // Initialize summary screen when script loads
        script.onload = () => {
            console.log('Summary JavaScript loaded successfully');
            if (window.SummaryScreen) {
                console.log('SummaryScreen class found, creating instance...');
                window.summaryScreenInstance = new window.SummaryScreen();
                console.log('SummaryScreen instance created');
            } else {
                console.error('SummaryScreen class not found in window object');
            }
        };
        
        document.head.appendChild(script);
        console.log('Summary JavaScript script added to head');
    }

    // ===== NAVIGATION PANEL METHODS =====

    initNavigationPanel() {
        console.log('Initializing navigation panel...');
        this.populateNavigationList();
        this.setupNavigationClickHandlers();
        this.setupToggleButton();
        // Don't update navigation state here - it will be updated when screen 1 loads
    }

    populateNavigationList() {
        const navList = document.getElementById('navList');
        if (!navList) {
            console.error('Navigation list not found');
            return;
        }

        navList.innerHTML = ''; // Clear existing items

        // Get visible screens in order
        const visibleScreens = this.getVisibleScreensInOrder();
        
        visibleScreens.forEach((screen, index) => {
            const navItem = document.createElement('div');
            navItem.className = 'nav-item';
            navItem.dataset.screen = screen.id;
            navItem.dataset.type = this.getScreenType(screen.id);
            navItem.textContent = screen.title;
            
            // Add click handler
            navItem.addEventListener('click', () => {
                this.navigateToScreen(screen.id);
            });
            
            navList.appendChild(navItem);
        });

        console.log(`Navigation populated with ${visibleScreens.length} screens`);
    }

    getVisibleScreensInOrder() {
        const screens = [];
        const sequence = window.SCREEN_SEQUENCE || {};
        
        // Start from screen 1 and follow the sequence
        let currentScreen = 1;
        const visited = new Set();
        
        while (currentScreen && !visited.has(currentScreen)) {
            visited.add(currentScreen);
            const screen = sequence[currentScreen];
            
            if (screen && screen.show) {
                screens.push(screen);
            }
            
            currentScreen = screen?.nextScreen;
        }
        
        return screens;
    }

    getScreenType(screenId) {
        // Determine screen type based on screen ID
        if (screenId === 'homepage') return 'homepage';
        if (screenId === 'summary') return 'summary';
        if (screenId >= 9 && screenId <= 15) return 'quiz';
        if (screenId === 2 || screenId === 6 || screenId === 8) return 'interactive';
        return 'video';
    }

    updateNavigationState(currentScreen) {
        const navItems = document.querySelectorAll('.nav-item');
        const visibleScreens = this.getVisibleScreensInOrder();
        const currentIndex = visibleScreens.findIndex(screen => screen.id == currentScreen);
        
        navItems.forEach((item, index) => {
            // Remove all state classes
            item.classList.remove('completed', 'current', 'upcoming', 'locked');
            
            if (index < currentIndex) {
                // Completed screens
                item.classList.add('completed');
            } else if (index === currentIndex) {
                // Current screen
                item.classList.add('current');
            } else {
                // Upcoming screens
                item.classList.add('upcoming');
            }
        });

        // Update progress bar
        this.updateProgressBar(currentIndex, visibleScreens.length);
    }

    updateProgressBar(currentIndex, totalScreens) {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            const progress = ((currentIndex + 1) / totalScreens) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    setupNavigationClickHandlers() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const screenId = e.currentTarget.dataset.screen;
                this.navigateToScreen(screenId);
            });
        });
    }

    navigateToScreen(screenId) {
        const visibleScreens = this.getVisibleScreensInOrder();
        const targetIndex = visibleScreens.findIndex(screen => screen.id == screenId);
        const currentIndex = visibleScreens.findIndex(screen => screen.id == this.currentScreen);
        
        // Only allow navigation to completed screens or current screen
        if (targetIndex <= currentIndex) {
            console.log(`Navigating to screen ${screenId}`);
            this.loadScreenDirectly(screenId);
        } else {
            console.log(`Cannot navigate to screen ${screenId} - not yet unlocked`);
        }
    }

    setupToggleButton() {
        const toggleBtn = document.getElementById('navToggleBtn');
        const navPanel = document.getElementById('navigationPanel');
        
        if (!toggleBtn || !navPanel) {
            console.error('Toggle button or navigation panel not found');
            return;
        }

        // Check if panel is collapsed from localStorage
        const isCollapsed = localStorage.getItem('navPanelCollapsed') === 'true';
        if (isCollapsed) {
            navPanel.classList.add('collapsed');
        }

        toggleBtn.addEventListener('click', () => {
            const isCurrentlyCollapsed = navPanel.classList.contains('collapsed');
            
            if (isCurrentlyCollapsed) {
                // Expand panel
                navPanel.classList.remove('collapsed');
                localStorage.setItem('navPanelCollapsed', 'false');
                console.log('Navigation panel expanded');
            } else {
                // Collapse panel
                navPanel.classList.add('collapsed');
                localStorage.setItem('navPanelCollapsed', 'true');
                console.log('Navigation panel collapsed');
            }
        });
    }

    // Method to ensure navigation panel is open when landing on screen 1 from homepage
    ensureNavigationPanelOpen() {
        const navPanel = document.getElementById('navigationPanel');
        if (navPanel && this.currentScreen === 1) {
            // Always open the panel when coming from homepage to screen 1
            navPanel.classList.remove('collapsed');
            localStorage.setItem('navPanelCollapsed', 'false');
            console.log('Navigation panel opened when starting learning from homepage');
        }
    }

    // Method to explicitly hide navigation panel on homepage
    hideNavigationPanelOnHomepage() {
        const navPanel = document.getElementById('navigationPanel');
        if (navPanel) {
            navPanel.style.display = 'none';
            navPanel.style.visibility = 'hidden';
            navPanel.style.opacity = '0';
            console.log('Navigation panel hidden on homepage');
        }
    }

    // Method to show navigation panel on other screens
    showNavigationPanelOnOtherScreens() {
        const navPanel = document.getElementById('navigationPanel');
        if (navPanel) {
            navPanel.style.display = '';
            navPanel.style.visibility = '';
            navPanel.style.opacity = '';
            console.log('Navigation panel shown on other screens');
        }
    }

    // Trigger screen transition if configured
    triggerScreenTransition(screenNumber) {
        console.log('triggerScreenTransition called for screen:', screenNumber);
        
        const transitionConfig = window.getScreenTransitionConfig ? window.getScreenTransitionConfig(screenNumber) : null;
        console.log('Transition config for screen', screenNumber, ':', transitionConfig);
        
        if (transitionConfig) {
            console.log('Creating transition overlay for screen', screenNumber);
            // Create transition overlay instance
            const transitionOverlay = new BotTransitionOverlay();
            // Show transition after a short delay to ensure screen is fully loaded
            setTimeout(() => {
                transitionOverlay.showTransition(transitionConfig);
            }, 500);
        }
    }

    // Trigger summary-specific transition
    triggerSummaryTransition() {
        console.log('triggerSummaryTransition called');
        
        const transitionConfig = window.getScreenTransitionConfig ? window.getScreenTransitionConfig('summary') : null;
        console.log('Summary transition config:', transitionConfig);
        
        if (transitionConfig) {
            console.log('Creating summary transition overlay');
            // Create summary-specific transition overlay instance
            const summaryTransition = new SummaryBotTransition();
            // Show transition after a short delay to ensure screen is fully loaded
            setTimeout(() => {
                summaryTransition.showTransition(transitionConfig);
            }, 500);
        }
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MathAdventureApp();
    // Make app globally accessible for navigation buttons
    window.app = app;
});
