// Function to create a pushable box at the given x,y coordinates
const createPushBox = (xCoord, yCoord) => {
    return new PushBox({
            x: xCoord,
            y: yCoord,
            src: 'images/Objects/Push-Box.png',
            hitbox: {
                //x, y relative to top-left corner of 32x32 sprite image
                x: 0,
                y: 0,
                width: 32,
                height: 32,
            },
        })
}

// Function to create a platform at the given x,y coordinates
const createPlatform = (xCoord, yCoord) => {
    return new GameObject({
            x: xCoord,
            y: yCoord,
            src: 'images/Objects/Platform.png',
            hitbox: {
                //x, y relative to top-left corner of 32x32 sprite image
                x: 0,
                y: 0,
                width: 16,
                height: 1,
            },
            isPlatform: true,
        })
}

//Function to create a goblin at the given coordinates with the given path
const createGoblin = (xCoord, yCoord, givenPath) => {
    return new Enemy({
        x: xCoord,
        y: yCoord,
        src: 'images/Characters/Goblin.png',
        animations: {
            'idle-left': [[1,2]],
            'idle-right': [[0,2]],
            'walk-left': [[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1]],
            'walk-right': [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0]],
        },
        currentAnimation: 'idle-right',
        hitbox: {
            //x, y relative to top-left corner of 32x32 sprite image
            x: 12,
            y: 11,
            width: 8,
            height: 21,
        },
        path: givenPath,
    })
}


// Object containing all maps in the game
window.Maps = {
    'DemoRoomNight': {
        src: 'images/Maps/Demo-Room-Night.png',
        collisionMapSrc: 'images/Maps/Demo-Room-Collision.png',
        gameObjects: {
            'NPC1': new GameObject({
                x: 8,
                y: 15,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-right': [[0,2]],
                },
                currentAnimation: 'idle-right',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
            'Player': new Person({
                x: 27,
                y: 14,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[1,2]],
                    'idle-right': [[0,2]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0]],
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
            'NPC1': new GameObject({
                x: 4,
                y: 13,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-right': [[0,2]],
                },
                currentAnimation: 'idle-right',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
            'Player': new Person({
                x: 10,
                y: 15,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[1,2]],
                    'idle-right': [[0,2]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0]],
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
            'Platform1': createPlatform(26,16),
            'Platform2': createPlatform(27,16),
            'Platform3': createPlatform(31,16),
            'Platform4': createPlatform(32,16),
            'Platform5': createPlatform(33,16),
            'Platform6': createPlatform(31,12),
            'Platform7': createPlatform(32,12),
            'Platform8': createPlatform(33,12),
            'PushBox': createPushBox(117,12),
            'Goblin1': createGoblin(65, 14, [
                // [Action/animation, number of frames],
                ['walk-left', 30],
                ['idle-left', 30],
                ['idle-right', 30],
                ['walk-right', 30],
                ['idle-right', 30],
                ['idle-left', 30],
            ]),
            'Goblin2': createGoblin(75, 14, [
                // [Action/animation, number of frames],
                ['walk-left', 30],
                ['idle-left', 10],
                ['idle-right', 20],
                ['walk-right', 30],
                ['idle-right', 10],
                ['idle-left', 20],
            ]),
            'NPC1': new GameObject({
                x: 220,
                y: 14,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-right': [[0,2]],
                },
                currentAnimation: 'idle-right',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 11,
                    height: 20,
                }
            }),
            'Player': new Person({
                x: 1,
                y: 14,
                src: 'images/Characters/Gnome.png',
                animations: {
                    'idle-left': [[1,2]],
                    'idle-right': [[0,2]],
                    'walk-left': [[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1]],
                    'walk-right': [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0]],
                },
                currentAnimation: 'idle-left',
                hitbox: {
                    //x, y relative to top-left corner of 32x32 sprite image
                    x: 10,
                    y: 12,
                    width: 10,
                    height: 20,
                },
            }),
        },
        screenTransitions: [
            { destination: 'DemoRoomNight', }
        ]
    }
}