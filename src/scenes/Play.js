class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('cloud', './assets/cloud.png');
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);

        //add cloud platforms
        this.cloud1 = new Cloud(this, game.config.width + borderUISize*6, borderUISize*4, 'cloud', 0).setOrigin(0,0);
        this.cloud2 = new Cloud(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'cloud', 0).setOrigin(0,0);
        this.cloud3 = new Cloud(this, game.config.width, borderUISize*6 + borderPadding*4, 'cloud', 0).setOrigin(0,0);

        let playConfig = {
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

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'THIS IS A PLAY SCENE', playConfig).setOrigin(0.5);
    }

    update() {

        this.sky.tilePositionX -= 3;
    }
}