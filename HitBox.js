class HitBox {
    constructor({x, y, width, height}) {
        // Creates an array of pixels which make up the edge of the objects hitbox and a cross through its middle;
        // [Potential bug if want to detect collision with another object which could fit inside of hitbox]
        
        this.hitBoxPixels = [];
        this.bottomHitBoxPixels = [];

        for (let currX=0; currX < width; currX++) {
            // Top edge
            this.hitBoxPixels.push([currX + x, y]);
            // Middle row
            this.hitBoxPixels.push([currX + x, y + Math.floor(height/2)]);
            // Bottom edge
            this.hitBoxPixels.push([currX + x, y + height - 1]);
            this.bottomHitBoxPixels.push([currX + x, y + height - 1]);
        }
        for (let currY=1; currY < height - 1; currY++) {
            // Left edge
            this.hitBoxPixels.push([x, currY + y]);
            // Middle column
            this.hitBoxPixels.push([x + Math.floor(width/2), currY + y]);
            // Right edge
            this.hitBoxPixels.push([x + width - 1, currY + y]);
        }

    }
    
    // Takes in current position of corresponding sprite and checks if hitbox will collide with any pixels of the given colour on collision map
    isColliding(x, y, cameraPerson, colorRGBA = [0, 0, 0, 255], map = null) {
        // Determine adjusted coordinates based on cameraType
        const [adjustedX, adjustedY] = utils.cameraAdjustedCoords(x, y, cameraPerson);

        let hasCollision = false;

        // Retrive canvas containing the collision map
        const collisionMap = document.getElementById('hidden-canvas');
        const ctx = collisionMap.getContext('2d');
        if (map) {
            // Draw collision map to canvas to ensure we consider the most recent positions of hitboxes 
            // (only important for wall collision as we push player object out of wall)
            map.drawCollisions(ctx, cameraPerson);
        }
        // For each pixel of hitbox, check if it overlaps a pixel of the given colour on collision map
        this.hitBoxPixels.forEach((pixel) => {
            if (!hasCollision) {
                const pixelData = [...ctx.getImageData(adjustedX + pixel[0], adjustedY + pixel[1], 1, 1 ).data];
                if (pixelData.join() === colorRGBA.join()) {           
                    hasCollision = true;
                }   
            }
        })
        return hasCollision;
    }

    // Specialisation of above function to check if hitbox is touching a floor
    isOnGround(object, cameraPerson, map = null) {
        // Determine adjusted coordinates based on cameraType
        const [adjustedX, adjustedY] = utils.cameraAdjustedCoords(object.x, object.y, cameraPerson);

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
        if (map && !hasCollision) {
            Object.values(map.gameObjects).forEach((gameObject) => {
                if (!hasCollision && gameObject !== object) {
                    hasCollision = utils.canJumpOffObject(object, gameObject, cameraPerson);
                }
            })
        }
        return hasCollision;
    }
}