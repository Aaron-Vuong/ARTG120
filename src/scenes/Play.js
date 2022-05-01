class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('sky', './assets/background.png');
        this.load.image('player', './assets/Bunny.png');
        this.load.image('cloud', './assets/cloud.png');
        this.load.image('cat', './assets/Cat.png');
        this.load.image('pug', './assets/Pug.png');
        this.load.image('coin', './assets/coin.png');
        this.load.audio('music', './assets/bgMusic.wav');
        this.load.spritesheet('Bun', './assets/BunSpritesheet.png', {frameWidth: 1200, frameHeight: 900, startFrame: 0, endFrame: 14});
    }

    create() {
        this.anims.create({
            key: 'Bunny',
            frames: this.anims.generateFrameNumbers('Bun', {start: 0, end: 14, first: 0}),
            frameRate: 30,
            repeat: -1
        });

        let value = 10;
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
        const sprite = this.physics.add.sprite(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, 'Bunny');
        sprite.setBounce(1, 1);
        // sprite.body.setAllowGravity(false);
        // sprite.body.setAccelerationY(100);

        this.sprites.add(sprite);

        // Add colliders to both sprite and clouds
        this.physics.add.collider(this.sprites, this.clouds);

        // Create the player with the reference to player sprite
        this.player = new Player(this, game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Bunny', 0, sprite).setOrigin(0.5, 0);
        //this.player.play('Bunny');
        this.player.scale = 0.08;
        sprite.scale = 0.08;
       

        // add cloud platforms
        this.cloud1 = new Cloud(this, game.config.width + borderUISize*14, borderUISize*8, 'cloud', 0, _cloud1).setOrigin(0,0);
        this.cloud2 = new Cloud(this, game.config.width + borderUISize*6, borderUISize*7 + borderPadding*4, 'cloud', 0, _cloud2).setOrigin(0,0);
        this.cloud3 = new Cloud(this, game.config.width, borderUISize*9 + borderPadding*6, 'cloud', 0, _cloud3).setOrigin(0,0);
        this.cloud4 = new Cloud(this, game.config.width + borderUISize*20, borderUISize*9 + borderPadding*4, 'cloud', 0, _cloud4).setOrigin(0,0);

        this.obstacles = this.physics.add.group();

        //timer
        timedEvent = this.time.addEvent({
            delay: 500,
            callback: this.onEvent,
            callbackScope: this,
            loop: true
        }) 
        updateScore = this.time.addEvent({
            delay: 1000,
            callback: this.updateScoreText,
            callbackScope: this,
            loop: true
        }) 
        catGeneration = this.time.addEvent({
            delay: 2000,
            callback: this.onCatGen,
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
        this.Score = this.add.text(borderUISize + borderPadding*45, borderUISize + borderPadding*2, 'Score: ' + 0, playConfig).setOrigin(0.5);

        // Define keys that are used
        //   SPACE: Used for Jump (Outdated)
        //   LEFT/A: Used to go left
        //   RIGHT/D: Used to go right
        //   R: Used to restart play scene
        //   M: Go to Menu at GameOver
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        //play background music
        this.song = this.sound.add('music');
        this.song.setLoop(true);
        this.song.volume = 0.3;
        this.song.play();
    }

    update() {

        this.sky.tilePositionX += 3;
        
        this.checkGameOver(this.player);


        this.elapsed = timedEvent.getElapsedSeconds();
        if (this.gameOver) {
            this.time.removeEvent(updateScore);
            this.time.removeEvent(catGeneration);
            this.time.removeEvent(timedEvent);
            this.song.stop();
            this.displayEnd();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            game.settings.cloudSpeed = game.settings.cloudSpeedOrig;
            game.settings.score = 0;
            this.song.stop();
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
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
    }

    updateScoreText() {
        game.settings.score += 1;
        this.Score.text = "Score: " + game.settings.score*100;
    }

    onCatGen() {
        this.obstacleSpawner('cat');
        this.obstacleSpawner('pug');
        this.obstacleSpawner('coin');
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

        timedEvent.remove();
        
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', playConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) to Menu', playConfig).setOrigin(0.5);
    }

    obstacleSpawner(filename) {
        let texture = this.textures.get(filename).getSourceImage();
        const _obstacle = this.physics.add.sprite(Phaser.Math.Between(texture.width, game.config.width - texture.width), 0, filename);
        this.physics.add.collider(_obstacle);
        _obstacle.body.setAngularVelocity(Phaser.Math.Between(-200, 200));
        _obstacle.body.setAllowGravity(true);
//        this.obstacle = new Obstacle(this, 0, 0, filename, 0, _obstacle).setOrigin(0,0);

        this.obstacles.add(_obstacle);
        this.physics.add.overlap(this.player.sprite, this.obstacles, this.hitObstacle, null, this);
        
    }

    hitObstacle (player, obstacle) {
        game.settings.score += 2;
        this.Score.text = "Score: " + game.settings.score*100;
        obstacle.destroy();
    }
}