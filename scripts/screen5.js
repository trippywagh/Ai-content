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
        this.elements.side = document.getElementById('cylSide');
        this.elements.top = document.getElementById('cylTop');
        this.elements.bottom = document.getElementById('cylBottom');
        this.elements.fill = document.getElementById('cylFill');
        this.elements.unwrap = document.getElementById('unwrap');

        // Wire events
        this.wireControls();

        // Initial render
        this.updateAll();

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

        // Update visualization scale
        // Base side width maps from r to width (diameter -> width scale)
        const baseWidth = 20 + r * 10; // px, simple mapping
        const baseHeight = 40 + h * 10; // px

        this.elements.cyl.style.width = `${baseWidth}px`;
        this.elements.cyl.style.height = `${baseHeight}px`;

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
            this.elements.fill.style.height = '0%';
            return;
        }
        // Fill proportionally to height (for demo we fill to 70%)
        const level = 70; // percent; could be interactive later
        this.elements.fill.style.height = `${level}%`;
    }

    updateUnwrap() {
        this.elements.unwrap.classList.toggle('show', this.showLabel);
    }

    destroy() {}
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CylinderSimScreen;
}
