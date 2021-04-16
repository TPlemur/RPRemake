//Rocket.js
//Creates the Rocket class
//Thomas Price

class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, leftKey,rightKey,fireKey, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.movementSpeed = game.setting.spaceshipSpeed/1.5;
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket'); //add rocket sfx
        this.fireKey = fireKey;
        this.rightKey = rightKey;
        this.leftKey = leftKey;
        this.score = 0;
    }

    update(){

        //lock controls of rocket that has been fired resets rocket if it reaches the top
        if(this.isFiring){
            this.y -= this.movementSpeed;
            if(this.y < borderUISize*2){
                this.reset();
            }

        }
        //scan for inputs, move rocket accordingly or fire the rocket
        else{
            if(this.leftKey.isDown){
                this.x -= this.movementSpeed;
            }

            if(this.rightKey.isDown){
                this.x += this.movementSpeed
            }

            if(Phaser.Input.Keyboard.JustDown(this.fireKey)){
                this.isFiring = true;
                this.sfxRocket.play();
            }

            //limit rocket to on screen
            this.x =Phaser.Math.Clamp(this.x,
                borderUISize +borderPadding,
                game.config.width - borderPadding - borderUISize);
        }
    }

    //places rocket back on bottom row after having been fired
    reset() {
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }

}
