class GameObject {
    constructor(config) {
        //Set x and y coords to line up with tile based maps;
        this.initialX = config.x * 16 -7;
        this.x = this.initialX;
        this.initialY = config.y * 16;
        this.y = this.initialY;
        this.direction = config.direction || 'right';

        this.sprite = new Sprite({
            animations: config.animations,
            currentAnimation: config.currentAnimation,
            src: config.src,
            gameObject: this,
        }); 
        this.hitbox = new HitBox(config.hitbox)
    }

    update() {
        
    }
}