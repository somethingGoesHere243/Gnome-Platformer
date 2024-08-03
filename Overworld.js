class OverWorld {
    constructor(element) {
        this.element = element;
        // Get canvas to draw all visible game elements
        this.canvas = element.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Get hidden canvas to draw collision map
        this.hiddenCanvas = this.element.querySelector('#hidden-canvas');
        this.hiddenCtx = this.hiddenCanvas.getContext('2d', {willReadFrequently: true});

        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            
            // Clear both canvases
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.hiddenCtx.clearRect(0, 0, this.hiddenCanvas.width, this.hiddenCanvas.height);

            // Establish camera person
            const cameraPerson = this.map.gameObjects['Player']

            // Draw collision map to hidden canvas
            this.map.drawCollisions(this.hiddenCtx, cameraPerson);

            // Draw map to visible canvas
            this.map.draw(this.ctx, cameraPerson);

            // Draw each GameObject to canvas
            Object.values(this.map.gameObjects).forEach((gameObject) => {
                gameObject.update({
                    arrow: this.directionInput.direction,
                    isJumping: this.directionInput.isJumping,
                    map : this.map,
                });
                gameObject.sprite.draw(this.ctx, cameraPerson);
            }) 
            
            requestAnimationFrame(step);
        }
        step()
    }

    init() {

        this.directionInput = new DirectionInput;
        this.directionInput.init();

        this.map = new OverWorldMap(window.Maps['Level01'])

        this.startGameLoop()
        
    }
}