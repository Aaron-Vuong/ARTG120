class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('sky', './assets/background.png');
        this.load.audio('CatMeow', './assets/CatMeow.mp3');
        this.load.audio('CoinSound', './assets/CoinSound.mp3');
        this.load.audio('DogBark', './assets/DogBark.mp3');
        this.load.audio('StartSound1', './assets/StartSound1.mp3');
        this.load.audio('StartSound2', './assets/StartSound2.mp3');
    }

    create() {
        this.opening = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);

        //menu text config
        let menuConfig = {
            fontFamily: 'GameFont',
            fontSize: '36px',
            backgroundColor: '#0a0da8',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 30, "Downpour", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Press Space to Play", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, "Avoid the animals!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, "Use <--> to Move", menuConfig).setOrigin(0.5);
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        this.opening.tilePositionX += 3;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

            game.settings = {
                cloudSpeed: 3,
                cloudSpeedOrig: 3,
                score: 0
            }
            this.sound.play('StartSound1');
            this.scene.start('playScene');
        }
    }
}