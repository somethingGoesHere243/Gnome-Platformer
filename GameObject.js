class GameObject {
    constructor(config) {
        //Set x and y coords to line up with tile based maps;
        this.x = config.x * 16;
        this.y = config.y * 16;

        // Set initial x and y to be used as spawn location
        this.initialX = this.x;
        this.initialY = this.y;

        // Create sprite with corresponding spritesheet and animations
        this.sprite = new Sprite({
            animations: config.animations || {'idle': [[0,0]]},
            currentAnimation: config.currentAnimation || 'idle',
            src: config.src,
            gameObject: this,
        }); 

        // Create the objects hitbox
        this.hitbox = new HitBox(config.hitbox)

        // Retrieve information about any specific properties of object
        this.isPlatform = config.isPlatform || false;
    }

    update() {
        
    }
}