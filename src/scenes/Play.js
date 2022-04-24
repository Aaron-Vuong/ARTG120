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

        // Create clouds and set attributes
        this.clouds = this.add.group({
            immovable: true,
            allowGravity: false
        });
        const _cloud1 = this.physics.add.sprite(game.config.width + borderUISize*14, borderUISize*8, 'cloud').setImmovable(true);
        const _cloud2 = this.physics.add.sprite(game.config.width + borderUISize*6, borderUISize*7 + borderPadding*4, 'cloud').setImmovable(true);
        const _cloud3 = this.physics.add.sprite(game.config.width, borderUISize*9 + borderPadding*6, 'cloud').setImmovable(true);
        const _cloud4 = this.physics.add.sprite(game.config.width +  borderUISize*20, borderUISize*9 + borderPadding*4, 'cloud').setImmovable(true);
        _cloud1.body.setAllowGravity(false);
        _cloud2.body.setAllowGravity(false);
        _cloud3.body.setAllowGravity(false);
        _cloud4.body.setAllowGravity(false);
        this.clouds.add(_cloud1);
        this.clouds.add(_cloud2);
        this.clouds.add(_cloud3);
        this.clouds.add(_cloud4);

        // Create sprite and set attributes
        this.sprites = this.add.group();
        const sprite = this.physics.add.sprite(game.config.width/2, 50, 'player');
        sprite.setBounce(1, 1);
        this.sprites.add(sprite);

        // Add colliders to both sprite and clouds
        this.physics.add.collider(this.sprites, this.clouds);

        // Create the player with the reference to player sprite
        this.player = new Player(this, game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'player', 0, sprite).setOrigin(0.5, 0);
        this.player.scale = 0.1;
        sprite.scale = 0.1;

        // add cloud platforms
        this.cloud1 = new Cloud(this, game.config.width + borderUISize*14, borderUISize*8, 'cloud', 0, _cloud1).setOrigin(0,0);
        this.cloud2 = new Cloud(this, game.config.width + borderUISize*6, borderUISize*7 + borderPadding*4, 'cloud', 0, _cloud2).setOrigin(0,0);
        this.cloud3 = new Cloud(this, game.config.width, borderUISize*9 + borderPadding*6, 'cloud', 0, _cloud3).setOrigin(0,0);
        this.cloud4 = new Cloud(this, game.config.width + borderUISize*20, borderUISize*9 + borderPadding*4, 'cloud', 0, _cloud4).setOrigin(0,0);

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

        // GAME OVER flag
        this.gameOver = false;

        // Score text
        this.Score = this.add.text(borderUISize + borderPadding*45, borderUISize + borderPadding*2, 'Score: ' + game.settings.cloudSpeed, playConfig).setOrigin(0.5);

        // Define keys that are used
        //   SPACE: Used for Jump (Outdated)
        //   LEFT: Used to go left or to go to Menu at GameOver
        //   RIGHT: Used to go right
        //   R: Used to restart play scene
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {

        this.sky.tilePositionX -= 3;

        // console.log(game.settings.cloudSpeed);
        
        this.checkGameOver(this.player);

        if (this.gameOver) {
            this.displayEnd();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.time.now = 0;
            game.settings.cloudSpeed = game.settings.cloudSpeedOrig;
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if (!this.gameOver) {
            this.player.update();
            this.cloud1.update();
            this.cloud2.update();
            this.cloud3.update();
            this.cloud4.update();           
        }
    }

    onEvent() {
        game.settings.cloudSpeed += 0.25;
        this.Score.text = "Score: " + game.settings.cloudSpeed; 
        // console.log(game.settings.cloudSpeed);
    }

    checkGameOver(player) {
        if (player.sprite.y >= game.config.height) {
            this.gameOver = true;
        }
    }

    displayEnd() {
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
        
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', playConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', playConfig).setOrigin(0.5);
    }
}