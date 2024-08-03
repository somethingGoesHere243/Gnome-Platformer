class DirectionInput {
    constructor() {
        // Track directions being held and order in which they were initially pressed
        this.heldDirections = [];
        this.isJumping = false;

        this.map = {
            'ArrowLeft': 'left',
            'KeyA': 'left',
            'ArrowRight': 'right',
            'KeyD': 'right',
            'ArrowUp': 'up',
            'KeyW': 'up',
            'Space': 'up',
        }
    }

    // Returns the direction which was pressed most recently
    get direction() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener('keydown', (key) => {
            // Check if player is attempting to jump
            if (this.map[key.code] === 'up') {
                this.isJumping = true;
            } 
            // Check if player is pressing a valid direction key, and add this direction to list held directions
            else if (this.heldDirections.indexOf(this.map[key.code]) === -1) {
                this.heldDirections.unshift(this.map[key.code]);
            } 
        })
        document.addEventListener('keyup', (key) => {
            const index = this.heldDirections.indexOf(this.map[key.code]);
            // Check if player is no longer attempting to jump
            if (this.map[key.code] === 'up') {
                this.isJumping = false;
            } 
            // Remove key from list of held keys if no longer being held
            else if (index > -1) {
                this.heldDirections.splice(index, 1);
            } 
        })
    }
}