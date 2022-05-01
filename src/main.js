// Creative Tilt
// ------------------------------------------------------
// Technically Interesting: The usage of physics sprites in conjunction with particles,
// animation, and randomized spawning in classes and getting to know all the systems that 
// Phaser offers and adding that together was an interesting challenge. 

// Visual Style: The font is handmade and implemented by Margarita. The visual style is
// cohesive and the sounds are very fitting. The achievement looks really good.

let config = {
    type: Phaser.CANVAS,
    width: 640, 
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true
        }
    },
    scene: [Menu, Play] 
}

let game = new Phaser.Game(config); 

// UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Keyboard Variables
let keyLEFT, keyRIGHT, keySPACE, keyR, keyA, keyD, keyM;

// Timer Events
let timedEvent, updateScore, catGeneration, dogGeneration, coinGeneration;