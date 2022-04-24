class Cloud extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame, sprite) {
        super(scene, x, y, texture, frame);

        this.speed = game.settings.cloudSpeed;
        this.orig_y = y;
        this.sprite = sprite;
    }

    update() {
        //move clouds left
        this.sprite.setVelocityX(-game.settings.cloudSpeed * 100);
        if (this.orig_y != this.sprite.y) {
            this.sprite.y = this.orig_y;
        }
        //wrap around screen
        if(this.sprite.x <= 0-this.width) {
            this.reset();
        }
    }

    reset() {
        this.sprite.x = game.config.width + borderUISize;
    }
}