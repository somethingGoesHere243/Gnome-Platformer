// An event listeners for specific keys on keyboard
// Used only for events where are key is not intended to be held

class KeyPressListener {
    constructor(keycode, callback) {
        let keySafe = true;
        this.keycode = keycode;
        this.callback = callback;
        
        this.keyDownFunction = (key) => {
            if (key.code === this.keycode) {
                keySafe = false;
                this.callback();
            }
        }
        this.keyUpFunction = (key) => {
            if (key.code === this.keycode) {
                keySafe = true;
            }
        }

        document.addEventListener('keydown', this.keyDownFunction);
        document.addEventListener('keyup', this.keyUpFunction);
    }

    // Removes the event listeners added above
    unbind() {
        document.removeEventListener('keydown', this.keyDownFunction);
        document.removeEventListener('keyup', this.keyUpFunction);
    }
    
}