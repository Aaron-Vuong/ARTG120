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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "THIS IS A GAME NAME", menuConfig).setOrigin(0.5);

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {

        this.opening.tilePositionX -= 3;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}