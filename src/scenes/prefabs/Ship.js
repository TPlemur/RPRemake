class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing
        this.movementSpeed = 2;
    }

    update(){
        this.x += this.movementSpeed;
        if(this.x<this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width +50;
        this.alpha = 1;

    }

}