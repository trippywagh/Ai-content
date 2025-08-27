// Screen 6: Adaptive Check

class CylinderAdaptiveCheckScreen {
    constructor() {
        this.state = {
            q1Attempts: 0,
            q1Done: false,
            q2Done: false,
            weakSpots: JSON.parse(localStorage.getItem('weakSpots') || '[]'),
        };
        this.init();
    }

    init() {
        // Q1 elements
        this.q1Input = document.getElementById('q1Input');
        this.q1Submit = document.getElementById('q1Submit');
        this.q1Feedback = document.getElementById('q1Feedback');
        this.q1Notice = document.getElementById('q1Notice');
        this.q1Hint = document.getElementById('q1Hint');
        this.q1TryAgain = document.getElementById('q1TryAgain');

        // Q2 elements
        this.q2Options = document.querySelectorAll('[name="q2"]');
        this.q2Submit = document.getElementById('q2Submit');
        this.q2Feedback = document.getElementById('q2Feedback');
        // Removed individual surface chips UI; use only visual help block
        this.surfaceSide = { classList: { add() {}, remove() {} } };
        this.surfaceTop = { classList: { add() {}, remove() {} } };
        this.surfaceBottom = { classList: { add() {}, remove() {} } };
        this.q2Alert = document.getElementById('q2Alert');
        this.q2Viz = document.getElementById('q2Viz');
        this.q2TryAgain = document.getElementById('q2TryAgain');

        // CTA
        this.deeperBtn = document.getElementById('goDeeper');
        this.aheadBtn = document.getElementById('moveAhead');

        // Wire
        if (this.q1Submit) this.q1Submit.addEventListener('click', () => this.handleQ1());
        if (this.q1TryAgain) this.q1TryAgain.addEventListener('click', () => {
            this.q1Input.focus();
        });
        if (this.q2Submit) this.q2Submit.addEventListener('click', () => this.handleQ2());
        if (this.q2TryAgain) this.q2TryAgain.addEventListener('click', () => this.resetQ2Help());
        if (this.deeperBtn) this.deeperBtn.addEventListener('click', () => this.goDeeper());
        if (this.aheadBtn) this.aheadBtn.addEventListener('click', () => this.moveAhead());
    }

    handleQ1() {
        const pi = Math.PI;
        // Base question: r=7, h=10, CSA = 2πrh
        const correct = 2 * pi * 7 * 10; // ≈ 439.82 cm^2
        const val = parseFloat(this.q1Input.value);
        if (Number.isNaN(val)) {
            this.setQ1Feedback('Please enter a number (in cm²).', 'bad');
            return;
        }

        if (Math.abs(val - correct) < 0.5) {
            this.setQ1Feedback('Great job! ✅', 'good');
            this.state.q1Done = true;
            this.offerNextOrDeeper();
            return;
        }

        this.state.q1Attempts += 1;
        if (this.state.q1Attempts === 1) {
            // First wrong: offer hint but do not reveal answer
            this.setQ1Feedback('', 'bad');
            this.q1Notice.style.display = 'block';
            this.q1Hint.style.display = 'block';
        } else if (this.state.q1Attempts === 2) {
            // Second wrong: give worked step and easier retry
            const worked = 'Worked out: CSA = 2 × π × 7 × 10 ≈ 439.8 cm².';
            this.q1Notice.style.display = 'none';
            this.q1Hint.style.display = 'none';
            this.setQ1Feedback(worked + ' Try an easier one: r = 5 cm, h = 4 cm. What is CSA?', 'bad');
            // Change the check to easier set
            this.handleQ1 = () => {
                const correctEasy = 2 * Math.PI * 5 * 4; // ≈ 125.66
                const val2 = parseFloat(this.q1Input.value);
                if (Number.isNaN(val2)) {
                    this.setQ1Feedback('Please enter a number (in cm²).', 'bad');
                    return;
                }
                if (Math.abs(val2 - correctEasy) < 0.5) {
                    this.setQ1Feedback('Well done! You got it ✅', 'good');
                    this.state.q1Done = true;
                    this.offerNextOrDeeper();
                } else {
                    this.setQ1Feedback('Almost there! Remember CSA = 2πrh. Try once more.', 'bad');
                    this.logWeakSpot('cylinder_csa');
                }
            };
        } else {
            // Multiple wrongs
            this.setQ1Feedback('We will revisit this later. Moving on for now.', 'bad');
            this.logWeakSpot('cylinder_csa');
        }
    }

    handleQ2() {
        let selected = null;
        this.q2Options.forEach(opt => { if (opt.checked) selected = opt.value; });
        if (!selected) {
            this.setQ2Feedback('Please choose an option.', 'bad');
            return;
        }
        // Correct: side + top + bottom
        if (selected === 'side-top-bottom') {
            this.setQ2Feedback('Correct! TSA includes side + top + bottom. ✅', 'good');
            this.clearHighlights();
            this.state.q2Done = true;
            this.offerNextOrDeeper();
            return;
        }
        // Wrong choices -> highlight missing parts
        this.clearHighlights();
        if (selected === 'side-only') {
            this.setQ2Feedback('', 'bad');
            this.q2Alert.style.display = 'block';
            this.q2Viz.style.display = 'block';
            this.surfaceTop.classList.add('highlight');
            this.surfaceBottom.classList.add('highlight');
        } else if (selected === 'top-bottom-only') {
            this.setQ2Feedback('', 'bad');
            this.q2Alert.style.display = 'block';
            this.q2Viz.style.display = 'block';
            this.surfaceSide.classList.add('highlight');
        }
        this.logWeakSpot('cylinder_tsa_concept');
    }

    setQ1Feedback(msg, type) {
        this.q1Feedback.textContent = msg;
        this.q1Feedback.className = `feedback ${type}`;
    }

    setQ2Feedback(msg, type) {
        this.q2Feedback.textContent = msg;
        this.q2Feedback.className = `feedback ${type}`;
    }

    clearHighlights() {
        [this.surfaceSide, this.surfaceTop, this.surfaceBottom].forEach(el => el.classList.remove('highlight'));
        this.resetQ2Help();
    }

    resetQ2Help() {
        if (this.q2Alert) this.q2Alert.style.display = 'none';
        if (this.q2Viz) this.q2Viz.style.display = 'none';
    }

    offerNextOrDeeper() {
        if (this.state.q1Done && this.state.q2Done) {
            const name = localStorage.getItem('studentName') || 'superstar';
            this.q2Feedback.textContent = `Awesome, ${name}! Choose your path: Go Deeper or Move Ahead.`;
            this.q2Feedback.className = 'feedback good';
            document.getElementById('ctaRow').style.display = 'flex';
        }
    }

    goDeeper() {
        // Challenge problem could be another screen; for now just log and nudge
        alert('Challenge coming up next!');
    }

    moveAhead() {
        if (window.app && typeof window.app.loadScreenDirectly === 'function') {
            window.app.loadScreenDirectly(7); // placeholder next
        }
    }

    logWeakSpot(key) {
        if (!this.state.weakSpots.includes(key)) {
            this.state.weakSpots.push(key);
            localStorage.setItem('weakSpots', JSON.stringify(this.state.weakSpots));
        }
    }

    destroy() {}
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CylinderAdaptiveCheckScreen;
}
