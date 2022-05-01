class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.moveSpeed = 160;
        this.isGrounded = true;

        // Physics Sprite Setup
        this.sprite = this.scene.physics.add.sprite(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*2, 'player').setOrigin(0.5,0.5);
        this.sprite.setBounce(1, 1);
        this.scale = 0.1;
        this.sprite.scale = 0.1;
        this.scene.anims.create({
            key: 'Bunny',
            frames: this.anims.generateFrameNumbers('Bun', {start: 0, end: 14, first: 0}),
            frameRate: 30
        });
        // Animation Setup
        this.bounce = this.scene.add.sprite(this.sprite.x, this.sprite.y, 'Bun').setOrigin(0, 0);
        this.bounce.scale = 0.1;
        this.bounce.alpha = 0;
    }

    update() {
        this.bounceHandler();
        if(keyLEFT.isDown || keyA.isDown) {
            this.sprite.setVelocityX(-(this.moveSpeed));
        } else if (keyRIGHT.isDown || keyD.isDown) {
            this.sprite.setVelocityX(this.moveSpeed);
        }
        else {
            this.sprite.setVelocityX(0);
        }
    }

    bounceHandler() {
        this.bounce.setX( this.sprite.x - 100/2);
        this.bounce.setY( this.sprite.y - 100/2);
        if (this.sprite.body.touching.down) {
            this.sprite.alpha = 0;
            this.bounce.alpha = 1;
            this.bounce.anims.play('Bunny');
        }
        
        this.bounce.on('animationcomplete', function(){
            this.bounce.setTexture('player', 0);
            this.bounce.alpha = 0;
            this.sprite.alpha = 1;
        }, this);
    }
}