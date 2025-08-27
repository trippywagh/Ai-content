// Screen 3: Dabba Explainer Video

class DabbaExplainerScreen {
    constructor() {
        this.video = null;
        this.overlay = null;
        this.replayBtn = null;
        this.nextBtn = null;
        this.init();
    }

    init() {
        this.video = document.getElementById('explainerVideo');
        this.overlay = document.getElementById('explainerOverlay');
        this.replayBtn = document.getElementById('replayExplainerBtn');
        this.nextBtn = document.getElementById('nextAfterExplainer');

        this.setVideoSource();
        this.wireEvents();
    }

    setVideoSource() {
        // Default local path (replace with your file if different)
        this.video.src = 'videos/dabba-explainer.mp4';
        // Or hosted URL:
        // this.video.src = 'https://your-cdn/dabba-explainer.mp4';
    }

    wireEvents() {
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.play());
        }
        if (this.replayBtn) {
            this.replayBtn.addEventListener('click', () => this.replay());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.goNext());
        }

        this.video.addEventListener('play', () => {
            if (this.overlay) this.overlay.style.display = 'none';
        });
        this.video.addEventListener('pause', () => {
            if (!this.video.ended && this.overlay) this.overlay.style.display = 'flex';
        });
        this.video.addEventListener('ended', () => {
            if (this.overlay) this.overlay.style.display = 'flex';
            if (this.nextBtn) this.nextBtn.style.display = 'inline-block';
        });
        this.video.addEventListener('error', (e) => {
            console.error('Explainer video error', e, this.video?.error);
            alert('Could not load explainer video. Check videos/dabba-explainer.mp4');
        });
    }

    play() {
        const p = this.video.play();
        if (p && p.catch) p.catch(() => {});
    }

    replay() {
        this.video.currentTime = 0;
        this.play();
    }

    goNext() {
        if (window.app && typeof window.app.loadScreenDirectly === 'function') {
            window.app.loadScreenDirectly(4); // placeholder for next screen
        }
    }

    destroy() {}
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DabbaExplainerScreen;
}
