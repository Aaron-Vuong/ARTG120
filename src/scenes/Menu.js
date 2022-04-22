class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('sky', './assets/sky.png');
    }

    create() {
        this.opening = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);

        //menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "Sky Box", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Press Space to Play", menuConfig).setOrigin(0.5);
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        //this.timePassed = this.clock.getElapsed().toFixed(0);

        /*if(this.timePassed / 100) {
            this.cloudSpeed += 1;
        }*/

        this.opening.tilePositionX -= 3;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

            game.settings = {
                cloudSpeed: 3
            }
            this.scene.start('playScene');
        }
    }
}