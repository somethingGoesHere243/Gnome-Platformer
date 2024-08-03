class HitBox {
    constructor({x, y, width, height}) {
        // Creates an array of pixels which make up the edge of the objects hitbox;
        // [Potential bug if want to detect collision with another object which could fit inside of hitbox]
        
        this.hitBoxPixels = [];
        this.bottomHitBoxPixels = [];

        for (let currX=0; currX < width; currX++) {
            // Top edge
            this.hitBoxPixels.push([currX + x, y]);
            // Bottom edge
            this.hitBoxPixels.push([currX + x, y + height - 1]);
            this.bottomHitBoxPixels.push([currX + x, y + height - 1]);
        }
        for (let currY=1; currY < height - 1; currY++) {
            // Left edge
            this.hitBoxPixels.push([x, currY + y]);
            // Right edge
            this.hitBoxPixels.push([x + width - 1, currY + y]);
        }

    }
    
    isColliding(x, y, cameraPerson, colorRGBA = [0, 0, 0, 255], map = null) {
        // Takes in current position of corresponding sprite and checks if hitbox will collide with any pixels of the given on collision map

        // offsetX and offsetY are used to account for the player being stationary relative to the camera

        // Determine adjusted coordinates based on cameraType
        const [adjustedX, adjustedY] = utils.cameraAdjustedCoords(x, y, cameraPerson);

        let hasCollision = false;
        const collisionMap = document.getElementById('hidden-canvas');
        const ctx = collisionMap.getContext('2d');
        if (map) {
            map.drawCollisions(ctx, cameraPerson);
        }
        this.hitBoxPixels.forEach((pixel) => {
            if (!hasCollision) {
                const pixelData = [...ctx.getImageData(adjustedX + pixel[0], adjustedY + pixel[1], 1, 1 ).data];
                // console.log(pixelData.join()===colorRGBA.join());
                // console.log(colorRGBA.join());
                if (pixelData.join() === colorRGBA.join()) {           
                    hasCollision = true;
                }   
            }
        })
        return hasCollision;
    }

    canJump(x, y, cameraPerson) {
        // Specialisation of above function to check if hitbox is touching a floor

        // Determine adjusted coordinates based on cameraType
        const [adjustedX, adjustedY] = utils.cameraAdjustedCoords(x, y, cameraPerson);

        let hasCollision = false;
        const collisionMap = document.getElementById('hidden-canvas');
        const ctx = collisionMap.getContext('2d');
        this.bottomHitBoxPixels.forEach((pixel) => {
            if (!hasCollision) {
                // Check pixel data directly under hitbox instead of what is colliding with hitbox
                const pixelData = [...ctx.getImageData(adjustedX + pixel[0], adjustedY + pixel[1] + 1, 1, 1 ).data];
                if (pixelData.join()==='0,0,0,255') {                
                hasCollision = true;
                }   
            }
        })
        return hasCollision;
    }
}