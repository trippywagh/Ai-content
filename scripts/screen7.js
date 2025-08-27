// Screen 7: Tower CSA Problem

class TowerCSAScreen {
    constructor() {
        this.ans = null;
        this.submit = null;
        this.hint = null;
        this.feedback = null;
        this.attempts = 0;
        this.init();
    }

    init() {
        this.yes = document.getElementById('ynYes');
        this.no = document.getElementById('ynNo');
        this.ynRow = document.getElementById('ynRow');
        this.nudger = document.getElementById('nudger');
        this.towerQ = document.getElementById('towerQ');
        this.ans = document.getElementById('towerAns');
        this.submit = document.getElementById('towerSubmit');
        this.hint = document.getElementById('towerHint');
        this.feedback = document.getElementById('towerFeedback');

        if (this.yes) this.yes.addEventListener('click', () => this.startQ());
        if (this.no) this.no.addEventListener('click', () => this.nudge());
        if (this.submit) this.submit.addEventListener('click', () => this.check());
        if (this.ans) this.ans.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.check(); });
    }

    startQ() {
        if (this.ynRow) this.ynRow.style.display = 'none';
        if (this.nudger) this.nudger.style.display = 'none';
        if (this.towerQ) this.towerQ.style.display = 'block';
        if (this.ans) this.ans.focus();
    }

    nudge() {
        if (this.nudger) this.nudger.style.display = 'block';
        setTimeout(() => this.startQ(), 1200);
    }

    check() {
        const r = 7, h = 72; // meters
        const correct = 2 * Math.PI * r * h; // CSA in m^2
        const val = parseFloat(this.ans.value);
        if (Number.isNaN(val)) {
            this.show('Please enter a number in m².', 'bad');
            return;
        }
        if (Math.abs(val - correct) < 0.5) {
            this.show(`Great! CSA = 2πrh = ${correct.toFixed(2)} m².`, 'good');
            return;
        }
        this.attempts += 1;
        if (this.attempts === 1) {
            this.hint.style.display = 'block';
            this.show('Not quite. Think curved surface only — use 2πrh.', 'bad');
        } else {
            this.show(`CSA = 2 × π × 7 × 72 ≈ ${correct.toFixed(2)} m².`, 'bad');
        }
    }

    show(msg, type) {
        this.feedback.textContent = msg;
        this.feedback.className = `feedback ${type}`;
    }

    destroy() {}
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TowerCSAScreen;
}
