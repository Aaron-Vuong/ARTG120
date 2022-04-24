class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, sprite) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 160;
        this.isGrounded = true;
        this.sprite = sprite;
    }

    update() {
        if(keyLEFT.isDown) {
            this.sprite.setVelocityX(-(this.moveSpeed));
        } else if (keyRIGHT.isDown) {
            this.sprite.setVelocityX((this.moveSpeed));
        }
        else {
            this.sprite.setVelocityX(0);
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.isGrounded) {
            this.sprite.setVelocity(100, -300);
        }
    }

}