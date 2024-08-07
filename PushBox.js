class PushBox extends GameObject {
    constructor(config) {
        super(config);
    }

    update(state) {
        // Get coordinates which box would be drawn at
        const [cameraAdjustedX, cameraAdjustedY] = utils.cameraAdjustedCoords(this.x, this.y, state.cameraPerson)
        // Apply gravity if not touching the ground (only if on screen)
        if (!this.hitbox.isOnGround(this, state.cameraPerson, state.map) && cameraAdjustedX > 0 && cameraAdjustedX < 512 && cameraAdjustedY > 0 && cameraAdjustedY < 288) {
            this.y += 2;
        }
    }
}