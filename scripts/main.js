// Main Application JavaScript - Manages screen navigation and loading

class MathAdventureApp {
    constructor() {
        this.currentScreen = 1;
        this.totalScreens = 8; // Updated to 8 screens
        this.screenInstances = {};
        this.init();
    }

    init() {
        // Create particles container
        this.createParticlesContainer();
        
        // Load the first screen directly (no fetch needed for local files)
        this.loadScreenDirectly(1);
        
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
    }

    getScreenHTML(screenNumber) {
        switch (screenNumber) {
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
                    <h1>🎯 Math Adventure: The Amazing Dabba Mystery! 🎯</h1>
                    
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
                        <h2>🤔 Intriguing Question!</h2>
                        <p>If I take the sticker on this dabba and peel it off, what shape will it become when spread flat?</p>
                    </div>
                    
                    <div class="options-section">
                        <div class="option" data-answer="square">
                            <div class="option-letter">A</div>
                            <div class="option-text">A square</div>
                        </div>
                        <div class="option" data-answer="rectangle">
                            <div class="option-letter">B</div>
                            <div class="option-text">A rectangle</div>
                        </div>
                        <div class="option" data-answer="circle">
                            <div class="option-letter">C</div>
                            <div class="option-text">A circle</div>
                        </div>
                        <div class="option" data-answer="something-else">
                            <div class="option-letter">D</div>
                            <div class="option-text">Something else</div>
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
                    <h1>🎥 Let’s Understand The Dabba Mystery!</h1>
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
                        <div class="cylinder" id="cyl">
                            <div class="cyl-side" id="cylSide"></div>
                            <div class="cyl-fill" id="cylFill"></div>
                            <div class="cyl-top" id="cylTop"></div>
                            <div class="cyl-bottom" id="cylBottom"></div>
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
                            <p>Look at these two laboratory beakers. They have very different shapes but might hold the same amount of water!</p>
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
                            <h3>🤔 Which beaker holds more water?</h3>
                            <div class="selection-options">
                                                            <button class="selection-btn" id="selectA">Beaker A (Tall & Slim)</button>
                            <button class="selection-btn" id="selectB">Beaker B (Short & Wide)</button>
                                <button class="selection-btn" id="selectEqual">They're Equal! 🎯</button>
                            </div>
                        </div>
                        
                        <div class="simulation-controls" id="simControls" style="display: none;">
                            <button class="fill-btn" id="fillBtn">🧪 Start Water Fill Simulation</button>
                        </div>
                        
                        <div class="explanation" id="explanation" style="display: none;">
                            <!-- Explanation will be populated by JS -->
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
        link.href = `styles/screen${screenNumber}.css`;
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
        script.src = `scripts/screen${screenNumber}.js`;
        
        // Initialize screen instance after script loads
        script.onload = () => {
            this.initializeScreen(screenNumber);
        };
        
        script.onerror = () => {
            console.error('Failed to load screen JavaScript');
            this.initializeScreen(screenNumber);
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
            case 1:
                if (typeof NameIntroScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new NameIntroScreen();
                }
                break;
            case 2:
                if (typeof DabbaQuestionScreen !== 'undefined') {
                    this.screenInstances[screenNumber] = new DabbaQuestionScreen();
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
    }

    previousScreen() {
        if (this.currentScreen > 1) {
            this.loadScreenDirectly(this.currentScreen - 1);
        }
    }

    nextScreen() {
        if (this.currentScreen < this.totalScreens) {
            this.loadScreenDirectly(this.currentScreen + 1);
        }
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
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MathAdventureApp();
});

// Make app globally accessible for navigation buttons
window.app = app;
