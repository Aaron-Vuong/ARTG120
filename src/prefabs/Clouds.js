class Cloud extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, sprite) {
        super(scene, x, y, texture, frame);

        this.speed = game.settings.cloudSpeed;
        this.sprite = sprite;

        // this.maxheight allows for smoother randomization of the Y value reset.
        this.maxheight = game.config.height - borderUISize*2 - borderPadding * 2;

        // Create particles that are the cloud texture.
        this.particles = this.scene.add.particles(texture);
        this.emitter = this.particles.createEmitter({
            x: 400,
            y: 300,
            speed: 200,
            lifespan: 500,
            blendMode: 'ADD',
            scale: {start: 0.5, end: 0},
            on: false
        });
    }

    update() {
        // Move clouds left
        this.sprite.setVelocityX(-game.settings.cloudSpeed * 100);
        if (this.maxheight <= game.config.height/2) {
            this.maxheight += borderUISize;
        }
        else if (this.maxheight >= game.config.height){
            this.maxheight -= borderUISize;
        }
        if (this.sprite.body.touching.up) {
            this.particles.emitParticleAt(this.sprite.x, this.sprite.y, 1);
        }
        
        // Wrap around screen
        if (this.sprite.x <= 0-this.width) {
            this.reset();
        }
    }

    reset() {
        // Randomize the Y value of the sprite on reset.
        this.sprite.y = Phaser.Math.Between(game.config.height/2, game.config.height - borderUISize*2 - borderPadding*2);
        this.sprite.x = game.config.width + borderUISize;
    }
}