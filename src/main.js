let config = {
    type: Phaser.CANVAS,
    width: 640, 
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300}
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