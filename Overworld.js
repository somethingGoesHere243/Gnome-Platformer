class OverWorld {
    constructor(element) {
        this.element = element;
        // Get canvas to draw all visible game elements
        this.canvas = element.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Get hidden canvas to draw collision map
        this.hiddenCanvas = this.element.querySelector('#hidden-canvas');
        this.hiddenCtx = this.hiddenCanvas.getContext('2d', {willReadFrequently: true});

        // Set properties to be used later
        this.map = null;
        this.isTransitioning = false;
    }

    startGameLoop() {
        // step function to be called on each frame for which game is running
        const step = () => {
            
            // Clear both canvases
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.hiddenCtx.clearRect(0, 0, this.hiddenCanvas.width, this.hiddenCanvas.height);

            // Establish Playable character
            const player = this.map.gameObjects['Player']

            // Draw collision map to hidden canvas
            this.map.drawCollisions(this.hiddenCtx, player);

            // Draw map to visible canvas
            this.map.draw(this.ctx, player);

            // Draw each GameObject to canvas (only if collision map has been loaded)
            if (this.map.collisionMap.isLoaded) {
                Object.values(this.map.gameObjects).forEach((gameObject) => {
                    gameObject.update({
                        arrow: this.directionInput.direction,
                        cameraPerson: player,
                        isJumping: this.directionInput.isJumping,
                        map : this.map,
                    });
                    gameObject.sprite.draw(this.ctx, player);
                }) 
            }

            // Check if player has entered a screen transition area
            if (this.map.screenTransitions !== null) {
                this.map.screenTransitions.forEach((transition) => {
                    const destination = transition.destination;
                    const transitionColor = transition.transitionColor || [0,255,0,255];
                    if (player.hitbox.isColliding(player.x, player.y, player, transitionColor, this.map) && !this.isTransitioning) {
                        // Fade to black
                        this.isTransitioning = true;
                        const fadeDiv = document.createElement('div');
                        fadeDiv.classList.add('screen-transition');
                        this.element.appendChild(fadeDiv);
                        document.addEventListener('animationend', () => {
                            // Switch to new map
                            this.map = new OverWorldMap(window.Maps[destination]);
                            // Fade back to seeing map
                            fadeDiv.classList.add('fade-out');
                            // Remove new element after transition
                            document.addEventListener('animationend', () => {
                                fadeDiv.remove();
                                this.isTransitioning = false;
                            }, {once: true})
                        }, {once: true})
                    }
                })
            }   
            
            requestAnimationFrame(step);
        }
        step()
    }

    // Called when page loads to start above game loop and hook up player controls
    init() {
        // Add player controls
        this.directionInput = new DirectionInput;
        this.directionInput.init();

        // Select the starting map
        this.map = new OverWorldMap(window.Maps['Level01'])

        this.startGameLoop()
        
    }
}