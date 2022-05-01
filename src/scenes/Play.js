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
        this.load.image('spark', './assets/spark.png');
        this.load.audio('music', './assets/bgMusic.wav');
        this.load.spritesheet('Bun', './assets/BunSpritesheet.png', {frameWidth: 1200, frameHeight: 900, startFrame: 0, endFrame: 14});
    }
    create() {
        // Text configuration for the play scene.
        this.playConfig = {
            fontFamily: 'GameFont',
            fontSize: '40px',
            backgroundColor: '#0a0da8',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Set and play BG music.
        this.song = this.sound.add('music');
        this.song.setLoop(true);
        this.song.volume = 0.3;
        this.song.play();

        // Set scrolling background.
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);

        // GAME OVER flag
        this.gameOver = false;
        // Score text
        this.Score = this.add.text(borderUISize + borderPadding*45, borderUISize + borderPadding*2, 'Score: ' + 0, this.playConfig).setOrigin(0.5);

        // Available Keys
        // ------------------------------------------------------
        // SPACE : Used for Jump (Outdated)
        // LEFT/A : Used to go left
        // RIGHT/D : Used to go right
        // R : Used to restart play scene
        // M : Go to Menu at GameOver
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // Create an array of clouds to manually generate.
        this.cloudarr = new Array(4);
        this.cloudXArr = [game.config.width + borderUISize*14, 
            game.config.width + borderUISize*6, 
            game.config.width,
            game.config.width +  borderUISize*20];
        this.cloudYArr = [borderUISize*8, 
            borderUISize*7 + borderPadding*4, 
            borderUISize*9 + borderPadding*6, 
            borderUISize*9 + borderPadding*4];

        // Create clouds and set attributes.
        this.clouds = this.add.group({
            immovable: true,
            allowGravity: false
        });
        for (let i = 0; i < this.cloudarr.length; i++) {
            const _cloud1 = this.physics.add.sprite(this.cloudXArr[i], this.cloudYArr[i], 'cloud').setImmovable(true);
            _cloud1.body.setAllowGravity(false);
            this.clouds.add(_cloud1);
            this.cloud = new Cloud(this, game.config.width + borderUISize*14, borderUISize*8, 'cloud', 0, _cloud1).setOrigin(0,0);
            this.cloudarr[i] = this.cloud;
        }

        // Create the player with the reference to player sprite.
        this.player = new Player(this, game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'player', 0).setOrigin(0.5, 0.5);

        // Add colliders to both sprite and clouds.
        this.physics.add.collider(this.player.sprite, this.clouds);

        // Timed Events
        // ------------------------------------------------------
        // timedEvent : game.settings.cloudSpeed incrementation.
        // updateScore : Updates the score every second.
        // catGeneration : Generates a cat sprite under Obstacle.js.
        // dogGeneration : Generates a pug sprite under Obstacle.js.
        // coinGeneration : Generates a coin sprite under Obstacle.js.
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
        dogGeneration = this.time.addEvent({
            delay: 2500,
            callback: this.onDogGen,
            callbackScope: this,
            loop: true
        })
        coinGeneration = this.time.addEvent({
            delay: 3100,
            callback: this.onCoinGen,
            callbackScope: this,
            loop: true
        })
    }

    update() {

        this.sky.tilePositionX += 3;
        
        this.checkGameOver(this.player);

        if (this.gameOver) {
            this.displayEnd();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            game.settings.cloudSpeed = game.settings.cloudSpeedOrig;
            game.settings.score = 0;
            this.song.stop();
            this.sound.play('StartSound2');
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('StartSound2');
            this.scene.start("menuScene");
        }
        if (!this.gameOver) {
            this.player.update();
            for (let i = 0; i < this.cloudarr.length; i++) {
                (this.cloudarr[i]).update();
            }
        }

    }

    onEvent() {
        game.settings.cloudSpeed += 0.1;
    }

    updateScoreText() {
        game.settings.score += 100;
        this.Score.text = "Score: " + game.settings.score;
    }

    onCatGen() {
        this.obstacleSpawner('cat');
    }
    onDogGen() {
        this.obstacleSpawner('pug');
    }
    onCoinGen() {
        this.obstacleSpawner('coin');
    }

    checkGameOver(player) {
        if (player.sprite.y >= game.config.height) {
            this.gameOver = true;
        }
    }

    displayEnd() {
        this.playConfig.fontSize = 36;
        this.time.removeEvent(updateScore);
        this.time.removeEvent(catGeneration);
        this.time.removeEvent(dogGeneration);
        this.time.removeEvent(coinGeneration);
        this.time.removeEvent(timedEvent);
        this.song.stop();
        
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.playConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) to Menu', this.playConfig).setOrigin(0.5);
    }

    obstacleSpawner(filename) {
        this.new_obstacle = new Obstacle(this, 0, 0, filename, 0, this.player.sprite).setOrigin(0,0);
    }
}