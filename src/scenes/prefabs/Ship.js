//Ship.js
//Creates the enemy Ship class
//Thomas Price

class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        this.movementSpeed = -1 * game.setting.spaceshipSpeed;
        this.points = 5;
    }

    //moves the ship with constant velocity
    update(){
        this.x += this.movementSpeed;
        if(this.x< -this.width){
            this.x = game.config.width;
        }
    }

    //moves ship back to the right side of the screen
    reset() {
        this.x = game.config.width +50;
        this.alpha = 1;

    }

}