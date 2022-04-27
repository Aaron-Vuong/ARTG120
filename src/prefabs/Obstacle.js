class Obstacle extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame, speed, sprite) {
        super(scene, x, y, texture, frame);

        this.sprite = sprite;
        this.speed = speed;
    }

    update() {
        this.sprite.setVelocityY(-this.speed * 100);
        if (this.sprite.y == game.config.height) {
            this.sprite.destroy();
        }
    }
}