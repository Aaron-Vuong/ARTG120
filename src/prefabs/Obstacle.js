class Obstacle extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame, speed, playersprite) {
        super(scene, x, y, texture, frame);

        // Get the textureData which is necessary to get the texture width.
        let textureData = this.scene.textures.get(texture).getSourceImage();
        this.player = playersprite;

        // Create and set values for the physics sprite owned by this class.
        this.sprite = this.scene.physics.add.sprite(Phaser.Math.Between(textureData.width, game.config.width - textureData.width), 0, texture);
        this.scene.physics.add.collider(this.sprite);
        this.sprite.body.setAngularVelocity(Phaser.Math.Between(-200, 200));
        this.sprite.body.setAllowGravity(true);

        this.speed = speed;

        // Create a particle emitter emitting sparks and modify the
        // blendMode based on the type of obstacle.
        this.sparks = this.scene.add.particles('spark');
        this.spark_emitter = this.sparks.createEmitter({
            x: 400,
            y: 300,
            speed: 200,
            lifespan: 500,
            scale: {start: 0.5, end: 0},
            on: false
        });
        if (texture.key == 'cat' || texture.key == 'pug') {
            this.spark_emitter.blendMode = 'MULTIPLY';
        }
        else {
            this.spark_emitter.blendMode = 'SCREEN';
        }

        // Call this.hitObstacle if the player and obstacle overlap.
        this.scene.physics.add.overlap(this.scene.player.sprite, this.sprite, this.hitObstacle, null, this);
    }

    update() {
        if (this.sprite.y == game.config.height) {
            this.sprite.destroy();
        }
    }

    hitObstacle (player, obstacle) {
        if (obstacle.texture.key == 'pug') {
            this.sparks.emitParticleAt(this.sprite.x, this.sprite.y, 10);
            game.settings.score -= 200;
            this.scene.sound.play('DogBark');
        }
        else if (obstacle.texture.key == 'cat') {
            this.sparks.emitParticleAt(this.sprite.x, this.sprite.y, 10);
            game.settings.score -= 200;
            this.scene.sound.play('CatMeow');
        }
        else if (obstacle.texture.key == 'coin') {
            this.sparks.emitParticleAt(this.sprite.x, this.sprite.y, 10);
            game.settings.score += 200;
            this.scene.sound.play('CoinSound');
        }
        this.scene.Score.text = "Score: " + game.settings.score;
        obstacle.destroy();
    }
}