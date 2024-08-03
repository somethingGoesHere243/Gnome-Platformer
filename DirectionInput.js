class DirectionInput {
    constructor() {
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

    get direction() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener('keydown', (key) => {
            if (this.map[key.code] === 'up') {
                this.isJumping = true;
            } else if (this.heldDirections.indexOf(this.map[key.code]) === -1) {
                this.heldDirections.unshift(this.map[key.code]);
            } 
        })
        document.addEventListener('keyup', (key) => {
            const index = this.heldDirections.indexOf(this.map[key.code]);
            if (this.map[key.code] === 'up') {
                this.isJumping = false;
            } else if (index > -1) {
                this.heldDirections.splice(index, 1);
            } 
        })
    }
}