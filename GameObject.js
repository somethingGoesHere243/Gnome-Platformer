class GameObject {
    constructor(config) {
        //Set x and y coords to line up with tile based maps;
        this.x = config.x * 16;
        this.y = config.y * 16;

        // Set initial x and y to be used as spawn location
        this.initialX = this.x;
        this.initialY = this.y;

        // Retrieve direction which object is currently facing
        this.direction = config.direction || 'right';

        // Create sprite with corresponding spritesheet and animations
        this.sprite = new Sprite({
            animations: config.animations,
            currentAnimation: config.currentAnimation,
            src: config.src,
            gameObject: this,
        }); 

        // Create the objects hitbox
        this.hitbox = new HitBox(config.hitbox)

        // Flag to check if object is pushable
        this.isPushable = config.isPushable || false;
    }

    update() {
        
    }
}