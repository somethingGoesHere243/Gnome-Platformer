const utils = {
    cameraAdjustedCoords(x, y, cameraPerson) {
        let adjustedX = 0;
        let adjustedY = 0;
        if (cameraPerson.cameraType === 'static') {
            adjustedX = x + cameraPerson.cameraX;
            adjustedY = y + cameraPerson.cameraY;
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
    // Maybe not necessary
    // gridCoords(x, y) {
    //     return [16 * x - 7, 16 * y]
    // }
}