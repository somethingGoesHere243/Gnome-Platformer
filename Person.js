class Person extends GameObject {
    constructor(config) {
        super(config);
        
        this.direction = 'right';
        this.isWalking = false;

        this.directionUpdate = {
            'left': ['x', -2],
            'right': ['x', 2],
            'vertical': ['y', -1],
        }

        // Add timer to allow player to jump for a small period of time after leaving ground;
        this.coyoteTimer = 0;

        // Add way to track how camera should move relative to person
        this.cameraType = 'static';
        this.cameraX = 0;
        this.cameraY = 0;

    }

    update(state) {
        // Check if camera type should change
        if (this.hitbox.isColliding(this.x, this.y, this, [0,0,255,255])) {
            this.cameraType = 'horizontal';
            this.cameraX = (this.cameraX === 0) ? this.x : this.cameraX;
        } else if (this.hitbox.isColliding(this.x, this.y, this, [255,255,0,255])) {
            this.cameraType = 'vertical';
            this.cameraY = (this.cameraY === 0) ? this.y : this.cameraY;
        } else if (this.hitbox.isColliding(this.x, this.y, this, [255,0,255,255])) {
            this.cameraType = 'full';
            this.cameraX = (this.cameraX === 0) ? this.x : this.cameraX;
            this.cameraY = (this.cameraY === 0) ? this.y : this.cameraY;
        }
        
        // Reset or decrement coyote timer
        if (this.hitbox.canJump(this.x, this.y, this)) {
            this.coyoteTimer = 7;
        } else {
            this.coyoteTimer -= 1;
        }

        // Reset y-velocity if touching floor
        if (this.hitbox.canJump(this.x, this.y, this)) {
            this.directionUpdate['vertical'][1] = 0;
        } else {
            // Apply gravity if not on floor
            if (this.directionUpdate['vertical'][1] < 2) {
                this.directionUpdate['vertical'][1] += 0.4;
            } else if (this.directionUpdate['vertical'][1] >= -1) {
                this.directionUpdate['vertical'][1] += 0.2;
            } else {
                this.directionUpdate['vertical'][1] += 0.6;
            }  
        }

        // Check if player is attempting to jump
        if (state.isJumping && (this.hitbox.canJump(this.x, this.y, this) || this.coyoteTimer > 0)) {
            this.coyoteTimer = 0;
            this.directionUpdate['vertical'][1] = -7;
        }

        // Check if player is attempting to move left/right
        if (state.arrow) {
            this.direction = state.arrow;
            this.isWalking = true;
            this.sprite.currentAnimation = `walk-${this.direction}`
        } else {
            this.isWalking = false;
            this.sprite.currentAnimation = `idle-${this.direction}`
        }

        // Update horizontal position
        this.updatePosition(this.direction, state.map);
        
        // Update vertical position
        this.updatePosition('vertical', state.map);
        

        // Update sprite being drawn to canvas
        this.sprite.currentAnimationFrame += 0.25;
        if (this.sprite.currentAnimationFrame >= this.sprite.animations[this.sprite.currentAnimation].length) {
            this.sprite.currentAnimationFrame = 0;
        }
    }

    updatePosition(direction, map) {
        // Apply the requested position change to person
        let [axis, change] = this.directionUpdate[direction];
        if ((this.isWalking && axis === 'x') || (this.directionUpdate['vertical'][1] !== 0 && axis === 'y')) {
            this[axis] += Math.round(change);  
        }   

        // Check if object is about to enter a death barrier or leave bottom of screen
        if (this.hitbox.isColliding(this.x, this.y, this, [255,0,0,255], map) || this.y > 288) {
            // Reset position and velocity
            this.cameraType = 'static'
            this.cameraX = 0;
            this.cameraY = 0;
            this.x = this.initialX;
            this.y = this.initialY;
            this.directionUpdate['vertical'][1] = 0;
        }

        // Check if object is about to collide with a wall/barrier
        while (this.hitbox.isColliding(this.x, this.y, this, [0,0,0,255], map)) {
            // Move object out of wall/barrier 1 pixel at a time
            this[axis] -= Math.sign(change);
        }
         
    }
}