window.Maps = {
    'DemoRoomNight': {
        src: 'images/Maps/Demo-Room-Night.png',
        collisionMapSrc: 'images/Maps/Demo-Room-Collision.png',
        gameObjects: {
            'Player': new Person({
                x: 27,
                y: 14,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[0,1]],
                    'idle-right': [[0,0]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0]],
                },
                currentAnimation: 'idle-left',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
            'Player2': new GameObject({
                x: 8,
                y: 15,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[0,1]],
                    'idle-right': [[0,0]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0]],
                },
                currentAnimation: 'idle-left',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
        }
    },

    'DemoRoomDay': {
        src: 'images/Maps/Demo-Room-Day.png',
        collisionMapSrc: 'images/Maps/Demo-Room-Collision.png',
        gameObjects: {
            'Player': new Person({
                x: 10,
                y: 15,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[0,1]],
                    'idle-right': [[0,0]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0]],
                },
                currentAnimation: 'idle-left',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
            'Player2': new GameObject({
                x: 4,
                y: 13,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[0,1]],
                    'idle-right': [[0,0]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0]],
                },
                currentAnimation: 'idle-left',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
        }
    },

    'Level01': {
        src: 'images/Maps/Level-01.png',
        collisionMapSrc: 'images/Maps/Level-01-Collision.png',
        gameObjects: {
            'Player': new Person({
                x: 1,
                y: 14,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[0,1]],
                    'idle-right': [[0,0]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0]],
                },
                currentAnimation: 'idle-left',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
            'Player2': new GameObject({
                x: 220,
                y: 14,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[0,1]],
                    'idle-right': [[0,0]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0]],
                },
                currentAnimation: 'idle-left',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
        },
        screenTransitions: [
            { destination: 'DemoRoomNight', }
        ]
    }
}