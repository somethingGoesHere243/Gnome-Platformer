class Enemy extends GameObject {
    constructor(config) {
        super(config);

        this.path = config.path;
        this.currentPathIndex = 0;

        this.currentAnimation = this.path[0][0];

        this.frameCounter = 0;
    }

    isGoingToCollide(state) {
        let isColliding = false;
        // Check for collision with sufficiently close objects
        Object.values(state.map.gameObjects).forEach(obj => {
            // Ensure object isnt the player and that it is close enough for collision to occur
            if (obj !== this && !(obj instanceof Person) && !isColliding && Math.abs(obj.x - this.x) < 128 && Math.abs(obj.y - this.y) < 128){
                isColliding = utils.objectsAreColliding(obj, this, state.cameraPerson);
            }
        })
        // Also check if about to collide with wall/barrier
        return isColliding || this.hitbox.isColliding(this.x, this.y, state.cameraPerson, [0, 0, 0, 255], state.map)
    }

    update(state) {
        // Check if enemy is attempting to walk
        if (this.currentAnimation === 'walk-left') {
            // Check if enemy is about to collide with wall or another object
            this.x -= 2;
            if (this.isGoingToCollide(state)) {
                this.x += 2;
            }   
        } else if (this.currentAnimation === 'walk-right') {
            // Check if enemy is about to collide with wall or another object
            this.x += 2;
            if (this.isGoingToCollide(state)) {
                this.x -= 2;
            }
        }

        // Update frame counter
        this.frameCounter += 1;

        // If needed update current animation and path index
        if (this.frameCounter > this.path[this.currentPathIndex][1]) {
            this.currentPathIndex += 1;
            // Reset index once reach the end of path
            if (this.currentPathIndex === this.path.length) {
                this.currentPathIndex = 0;
            }
            this.currentAnimation = this.path[this.currentPathIndex][0];
            this.sprite.currentAnimationFrame = 0;
            this.frameCounter = 0;
        }

        // Update sprite being drawn to canvas
        this.sprite.currentAnimationFrame += 0.25;
        if (this.sprite.currentAnimationFrame >= this.sprite.animations[this.sprite.currentAnimation].length) {
            this.sprite.currentAnimationFrame = 0;
        }
    }
}