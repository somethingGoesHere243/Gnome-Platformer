// An event listeners for specific keys on keyboard
// Used only for events where our key is not intended to be held

class KeyPressListener {
    constructor(keycode, callback) {
        let keySafe = true;
        this.keycode = keycode;
        this.callback = callback;
        
        // When key is initially pressed call the callback function 
        this.keyDownFunction = (key) => {
            if (key.code === this.keycode && keySafe) {
                keySafe = false;
                this.callback();
            }
        }

        // When key is released reset keySafe to allow callback to occur again on next key press
        this.keyUpFunction = (key) => {
            if (key.code === this.keycode) {
                keySafe = true;
            }
        }

        // Add event listeners
        document.addEventListener('keydown', this.keyDownFunction);
        document.addEventListener('keyup', this.keyUpFunction);
    }

    // Removes the event listeners added above
    unbind() {
        document.removeEventListener('keydown', this.keyDownFunction);
        document.removeEventListener('keyup', this.keyUpFunction);
    }
    
}