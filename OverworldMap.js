class OverWorldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.screenTransitions = config.screenTransitions || null;
        
        // Load map to be drawn later
        this.map = new Image();
        this.map.src = config.src;
        this.map.onload = () => {
            this.map.isLoaded = true;
        };
        // Load collision map to be drawn later
        this.collisionMap = new Image();
        this.collisionMap.src = config.collisionMapSrc;
        this.collisionMap.onload = () => {
            this.collisionMap.isLoaded = true;
        }
    }

    // Draws collision map to canvas with its position adjusted to match current camera type
    drawCollisions(ctx, cameraPerson) {
        if (this.collisionMap.isLoaded) {
            if (cameraPerson.cameraType === 'static') {
                ctx.drawImage(this.collisionMap, 0, 0);
            } else if (cameraPerson.cameraType === 'horizontal') {
                ctx.drawImage(this.collisionMap, cameraPerson.cameraX - cameraPerson.x, 0);
            } else if (cameraPerson.cameraType === 'vertical') {
                ctx.drawImage(this.collisionMap, 0, cameraPerson.cameraY - cameraPerson.y);
            } else {
                ctx.drawImage(this.collisionMap, cameraPerson.cameraX - cameraPerson.x, cameraPerson.cameraY - cameraPerson.y);
            }  
        }
    }

    // Draws map to canvas with its position adjusted to match current camera type
    draw(ctx, cameraPerson) {
        if (this.map.isLoaded) {
            if (cameraPerson.cameraType === 'static') {
                ctx.drawImage(this.map, 0, 0);
            } else if (cameraPerson.cameraType === 'horizontal') {
                ctx.drawImage(this.map, cameraPerson.cameraX - cameraPerson.x, 0);
            } else if (cameraPerson.cameraType === 'vertical') {
                ctx.drawImage(this.map, 0, cameraPerson.cameraY - cameraPerson.y);
            } else {
                ctx.drawImage(this.map, cameraPerson.cameraX - cameraPerson.x, cameraPerson.cameraY - cameraPerson.y);
            }
        }
    }
}