class SlideGestureDetector {
    constructor(threshold = 30) {
        this.threshold = threshold; // Minimum slide distance to trigger an event
        this.startY = null;
        this.lastY = null;

        this.slideUpCallbacks = [];
        this.slideDownCallbacks = [];

        // Bind event handlers
        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handlePointerUp = this.handlePointerUp.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);

        // Attach events
        this.attached = false;

        this.moving = false;
    }

    // Attach event listeners
    attachEvents() {
        if (!this.attached) {
            canvas.addEventListener("pointerdown", this.handlePointerDown);
            canvas.addEventListener("pointerup", this.handlePointerUp);
            canvas.addEventListener("pointermove", this.handlePointerMove);
            this.attached = true;
        }
    }

    // Detach event listeners
    detachEvents() {
        canvas.removeEventListener("pointerdown", this.handlePointerDown);
        canvas.removeEventListener("pointerup", this.handlePointerUp);
        canvas.removeEventListener("pointermove", this.handlePointerMove);
    }

    handlePointerMove(event) {
        if (!this.moving) return;

        if (event.clientY - this.lastY > this.threshold) {
            this.emitSlideDown();
            this.startY = event.clientY;
        } else if (this.lastY - event.clientY > this.threshold) {
            this.emitSlideUp();
            this.startY = event.clientY;
        }

        this.lastY = event.clientY;
    }

    // Handle pointer down
    handlePointerDown(event) {
        this.moving = true;
        this.startY = event.clientY;
        this.lastY = event.clientY;
    }

    // Handle pointer up
    handlePointerUp(event) {
        this.moving = false;
    }

    // Register a callback for slide up
    onSlideUp(callback) {
        if (typeof callback === "function") {
            this.attachEvents();
            this.slideUpCallbacks.push(callback);
        } else {
            console.warn("onSlideUp expects a function as a callback.");
        }
    }

    // Register a callback for slide down
    onSlideDown(callback) {
        if (typeof callback === "function") {
            this.attachEvents();
            this.slideDownCallbacks.push(callback);
        } else {
            console.warn("onSlideDown expects a function as a callback.");
        }
    }

    // Trigger slide up callbacks
    emitSlideUp() {
        this.slideUpCallbacks.forEach((callback) => callback());
    }

    // Trigger slide down callbacks
    emitSlideDown() {
        this.slideDownCallbacks.forEach((callback) => callback());
    }
}

const slideGestureDetector = new SlideGestureDetector();
