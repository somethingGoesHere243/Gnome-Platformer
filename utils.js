const utils = {
    // Determines the coordinates to draw a sprite at, based on the current type and position of the camera
    cameraAdjustedCoords(x, y, cameraPerson) {
        let adjustedX = 0;
        let adjustedY = 0;
        if (cameraPerson.cameraType === 'static') {
            adjustedX = x;
            adjustedY = y;
        } else if (cameraPerson.cameraType === 'horizontal') {
            adjustedX = x - cameraPerson.x + cameraPerson.cameraX;
            adjustedY = y;
        } else if (cameraPerson.cameraType === 'vertical') {
            adjustedX = x;
            adjustedY = y - cameraPerson.y + cameraPerson.cameraY;
        } else {
            adjustedX = x - cameraPerson.x + cameraPerson.cameraX;
            adjustedY = y - cameraPerson.y + cameraPerson.cameraY;
        }
        return [adjustedX, adjustedY];
    },
    
    // Determines if the hitboxes of 2 gameObjects are colliding
    objectsAreColliding(obj1, obj2, cameraPerson) {
        // Get adjusted x,y coordinates based on cameraType
        const [obj1X, obj1Y] = utils.cameraAdjustedCoords(obj1.x, obj1.y, cameraPerson);
        const [obj2X, obj2Y] = utils.cameraAdjustedCoords(obj2.x, obj2.y, cameraPerson);

        // Get list of pixels in both hitboxes
        const hitbox1Pixels = obj1.hitbox.hitBoxPixels;
        const hitbox2Pixels = obj2.hitbox.hitBoxPixels;

        let hasCollision = false;

        hitbox1Pixels.forEach(pixel1 => {
            if (!hasCollision) {
                // Get position of pixel on canvas
                const adjustedPixel = [pixel1[0] + obj1X, pixel1[1] + obj1Y]
                // Check if there is a pixel in hitbox2 with the same position
                const expectedPixel2 = [adjustedPixel[0] - obj2X, adjustedPixel[1] - obj2Y]
                hitbox2Pixels.forEach( pixel2 => {
                    if (pixel2[0] === expectedPixel2[0] && pixel2[1] === expectedPixel2[1]) {
                        hasCollision = true;
                    }
                })
            }})
        return hasCollision;
    },

    // Determines if obj1 is directly on top of obj2
    canJumpOffObject(obj1, obj2, cameraPerson) {
        // Get adjusted x,y coordinates based on cameraType
        const [obj1X, obj1Y] = utils.cameraAdjustedCoords(obj1.x, obj1.y, cameraPerson);
        const [obj2X, obj2Y] = utils.cameraAdjustedCoords(obj2.x, obj2.y, cameraPerson);

        // Get list of pixels in both hitboxes (only bottom pixels for obj1)
        const hitbox1Pixels = obj1.hitbox.bottomHitBoxPixels;
        const hitbox2BottomPixels = obj2.hitbox.hitBoxPixels;

        let hasCollision = false;

        hitbox1Pixels.forEach(pixel1 => {
            if (!hasCollision) {
                // Get position of pixel on canvas
                const adjustedPixel = [pixel1[0] + obj1X, pixel1[1] + obj1Y];
                // Check if there is a pixel in hitbox2 with the same position
                const expectedPixel2 = [adjustedPixel[0] - obj2X, adjustedPixel[1] - obj2Y + 1];
                hitbox2BottomPixels.forEach( pixel2 => {
                    if (pixel2[0] === expectedPixel2[0] && pixel2[1] === expectedPixel2[1]) {
                        hasCollision = true;
                    }
                })
            }})
        return hasCollision;
    }
}