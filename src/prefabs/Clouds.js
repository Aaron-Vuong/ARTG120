class Cloud extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame, sprite, particles) {
        super(scene, x, y, texture, frame);

        this.speed = game.settings.cloudSpeed;
        this.orig_y = y;
        this.sprite = sprite;
        this.maxheight = game.config.height - borderUISize*2 - borderPadding * 2;
        this.particles = particles;
    }

    update() {
        //move clouds left
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
        //wrap around screen
        if (this.sprite.x <= 0-this.width) {
            this.reset();
        }
    }

    reset() {
        this.sprite.y = Phaser.Math.Between(game.config.height/2, game.config.height - borderUISize*2 - borderPadding*2);
        this.sprite.x = game.config.width + borderUISize;
    }
}