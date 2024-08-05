class Person extends GameObject {
    constructor(config) {
        super(config);
        
        this.direction = 'right';

        this.directionUpdate = {
            'x': ['x', 0],
            'y': ['y', -1],
        }

        // Add timer to allow player to jump for a small period of time after leaving ground;
        this.coyoteTimer = 0;

        // Add way to track how camera should move relative to person
        this.cameraType = 'static';
        this.cameraX = 0;
        this.cameraY = 0;

        // Add event listener for dash movement
        this.dashShiftLeft = new KeyPressListener('ShiftLeft', () => { this.dash() });
        this.dashShiftRight = new KeyPressListener('ShiftRight', () => { this.dash() });

        // Add boolean to check if player is allowed to dash
        this.canDash = true;
        this.framesSinceLastDash = 0;
    }

    dash() {
        if (this.canDash) {
            // Increase horizontal speed
            if (this.direction === 'right') {
                this.directionUpdate['x'][1] = 20;
            } else if (this.direction === 'left') {
                this.directionUpdate['x'][1] = -20;
            }
            // Prevent player from dashing again until touching ground
            this.canDash = false;
            // Reser frames since last dash counter
            this.framesSinceLastDash = 0;
        } 
    }

    update(state) {
        // Check if camera type should change
        if (this.hitbox.isColliding(this.x, this.y, this, [255,255,255,255])) {
            this.cameraType = 'static';
        } else if (this.hitbox.isColliding(this.x, this.y, this, [0,0,255,255])) {
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

        // Increment frames since last dash
        this.framesSinceLastDash += 1;
        
        // Reset or decrement coyote timer
        if (this.hitbox.canJump(this, this, state.map)) {
            this.coyoteTimer = 7;
        } else {
            this.coyoteTimer -= 1;
        }

        // Reset y-velocity and ability to dash if touching floor
        if (this.hitbox.canJump(this, this, state.map)) {
            this.directionUpdate['y'][1] = 0;
            // Check a suitable amount of time has passed since previous dash
            if (this.framesSinceLastDash >= 30) {
                this.canDash = true;
            } 
        } else {
            // Apply gravity if not on floor
            if (this.directionUpdate['y'][1] < 2) {
                this.directionUpdate['y'][1] += 0.4;
            } else if (this.directionUpdate['y'][1] >= -1) {
                this.directionUpdate['y'][1] += 0.2;
            } else {
                this.directionUpdate['y'][1] += 0.6;
            }  
        }

        // Check if player is attempting to jump
        if (state.isJumping && (this.hitbox.canJump(this, this, state.map) || this.coyoteTimer > 0)) {
            this.coyoteTimer = 0;
            this.directionUpdate['y'][1] = -7;
        }

        // Check if player is attempting to move left/right
        if (state.arrow) {
            this.direction = state.arrow;
            this.sprite.currentAnimation = `walk-${this.direction}`
            // Give player horizontal velocity and apply deceleration if needed
            if (this.direction === 'right') {
                this.directionUpdate['x'][1] = Math.max(2, 0.9 * this.directionUpdate['x'][1]);
            } else if (this.direction === 'left') {
                this.directionUpdate['x'][1] = Math.min(-2, 0.9 * this.directionUpdate['x'][1]);
            }
        } else {
            this.directionUpdate['x'][1] = 0.8 * this.directionUpdate['x'][1];
            this.sprite.currentAnimation = `idle-${this.direction}`;
        }

        // Update horizontal position
        this.updatePosition('x', state.map);
        
        // Update vertical position
        this.updatePosition('y', state.map);
        

        // Update sprite being drawn to canvas
        this.sprite.currentAnimationFrame += 0.25;
        if (this.sprite.currentAnimationFrame >= this.sprite.animations[this.sprite.currentAnimation].length) {
            this.sprite.currentAnimationFrame = 0;
        }
    }

    updatePosition(direction, map) {
        // Apply the requested position change to person
        let [axis, change] = this.directionUpdate[direction];
        this[axis] += Math.round(change);   

        // Check if person is about to enter a death barrier or leave bottom of screen
        if (this.hitbox.isColliding(this.x, this.y, this, [255,0,0,255], map) || this.y > 288) {
            // Reset position and velocity
            this.cameraType = 'static'
            this.cameraX = 0;
            this.cameraY = 0;
            this.x = this.initialX;
            this.y = this.initialY;
            this.directionUpdate['y'][1] = 0;
        }

        // Check if person is about to collide with a wall/barrier
        while (this.hitbox.isColliding(this.x, this.y, this, [0,0,0,255], map)) {
            // Move person out of wall/barrier 1 pixel at a time
            this[axis] -= Math.sign(change);
        }

        // Check if person is about to collide with another GameObject
        Object.values(map.gameObjects).forEach(obj => {
            if (obj !== this) {
                while (utils.objectsAreColliding(this, obj, this)) {
                    // If object is pushable and player approaches from side push it away from player
                    if (obj.isPushable && axis === 'x') {
                        this.directionUpdate['x'][1] = 0;
                        // If object is about to collide with wall don't allow pushing
                        if (obj.hitbox.isColliding(obj.x + Math.sign(change), obj.y, this, [0,0,0,255], map)) {
                            this[axis] -= Math.sign(change);
                        } else {
                            obj.x += Math.sign(change);
                        }
                    } else {
                        this[axis] -= Math.sign(change);
                    }
                }
            }
        });
         
    }
}