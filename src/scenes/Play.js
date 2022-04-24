class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('sky', './assets/sky.png');
        this.load.image('player', './assets/Bunny.png');
        this.load.image('cloud', './assets/cloud.png');
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);
        this.clouds = this.add.group();
        const _cloud1 = this.physics.add.sprite(game.config.width + borderUISize*14, borderUISize*8, 'cloud');
        const _cloud2 = this.physics.add.sprite(game.config.width + borderUISize*6, borderUISize*7 + borderPadding*4, 'cloud');
        const _cloud3 = this.physics.add.sprite(game.config.width, borderUISize*9 + borderPadding*6, 'cloud');
        const _cloud4 = this.physics.add.sprite(game.config.width +  borderUISize*20, borderUISize*9 + borderPadding*4, 'cloud');
        _cloud1.setCollideWorldBounds(true);
        _cloud1.setVelocity(100, 0);
        _cloud2.setCollideWorldBounds(true);
        _cloud2.setVelocity(100, 0);
        _cloud3.setCollideWorldBounds(true);
        _cloud3.setVelocity(100, 0);
        _cloud4.setCollideWorldBounds(true);
        _cloud4.setVelocity(100, 0);
        this.clouds.add(_cloud1);
        this.clouds.add(_cloud2);
        this.clouds.add(_cloud3);
        this.clouds.add(_cloud4);
        this.cloud1 = new Cloud(this, game.config.width + borderUISize*14, borderUISize*8, 'cloud', 0).setOrigin(0,0);
        this.cloud2 = new Cloud(this, game.config.width + borderUISize*6, borderUISize*7 + borderPadding*4, 'cloud', 0).setOrigin(0,0);
        this.cloud3 = new Cloud(this, game.config.width, borderUISize*9 + borderPadding*6, 'cloud', 0).setOrigin(0,0);
        this.cloud4 = new Cloud(this, game.config.width +  borderUISize*20, borderUISize*9 + borderPadding*4, 'cloud', 0).setOrigin(0,0);

        this.sprites = this.add.group();
        const sprite = this.physics.add.sprite(game.config.width/2, 50, 'player');
        sprite.setCollideWorldBounds(true);
        sprite.setVelocity(0, 0);
        this.physics.add.collider(this.sprites, this.clouds);
        this.sprites.add(sprite);
        this.player = new Player(this, game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'player', 0, sprite).setOrigin(0.5, 0);
        this.player.scale = 0.1;
        sprite.scale = 0.1;

        //add cloud platforms
        this.cloud1 = new Cloud(this, game.config.width + borderUISize*14, borderUISize*8, 'cloud', 0).setOrigin(0,0);
        this.cloud2 = new Cloud(this, game.config.width + borderUISize*6, borderUISize*7 + borderPadding*4, 'cloud', 0).setOrigin(0,0);
        this.cloud3 = new Cloud(this, game.config.width, borderUISize*9 + borderPadding*6, 'cloud', 0).setOrigin(0,0);
        this.cloud4 = new Cloud(this, game.config.width +  borderUISize*20, borderUISize*9 + borderPadding*4, 'cloud', 0).setOrigin(0,0);

        //timer
        timedEvent = this.time.addEvent({
            delay: 2500,
            callback: this.onEvent,
            callbackScope: this,
            loop: true
        }) 

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

        this.add.text(borderUISize + borderPadding*45, borderUISize + borderPadding*2, 'Score: ', playConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {

        this.sky.tilePositionX -= 3;

        console.log(game.settings.cloudSpeed);
        
        this.player.update();
        this.cloud1.update();
        this.cloud2.update();
        this.cloud3.update();
        this.cloud4.update();

    }

    onEvent() {
        game.settings.cloudSpeed += 0.25;
        console.log(game.settings.cloudSpeed);
    }
}