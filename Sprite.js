class Sprite {
    constructor(config) {
        //Load spritesheet to be drawn later
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.image.isLoaded = true;
        }
        
        //Collect animations and relevant information
        this.animations = config.animations || {
            'idle': [[0,0]],
        }
        this.currentAnimation = config.currentAnimation || 'idle';
        this.currentAnimationFrame = 0;

        this.gameObject = config.gameObject;
    }

    draw(ctx, cameraPerson) {
        // Determine coordinates to draw object at based on cameraType
        const [drawX, drawY] = utils.cameraAdjustedCoords(this.gameObject.x, this.gameObject.y, cameraPerson);

        // Update currentAnimation if needed
        this.currentAnimation = this.gameObject.currentAnimation || this.currentAnimation;

        // Get spritesheet coords of desired sprite
        const [spritesheetX, spritesheetY] = this.animations[this.currentAnimation][Math.floor(this.currentAnimationFrame)];

        // Draw sprite if loaded
        if (this.image.isLoaded) {
            ctx.drawImage(this.image,
                spritesheetX * 32, spritesheetY * 32,
                32,32,
                drawX, drawY,
                32,32,
            );
        }
    }
}