class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, leftKey,rightKey,fireKey, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.movementSpeed = 2;
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket'); //add rocket sfx
        this.fireKey = fireKey;
        this.rightKey = rightKey;
        this.leftKey = leftKey;
        this.score = 0;
    }

    update(){
        if(this.isFiring){
            this.y -= this.movementSpeed;
            if(this.y < borderUISize*2){
                this.reset();
            }

        }
        else{
            if(this.leftKey.isDown){
                this.x -= this.movementSpeed;
                console.log('ex');
            }

            if(this.rightKey.isDown){
                this.x += this.movementSpeed
            }

            if(Phaser.Input.Keyboard.JustDown(this.fireKey)){
                this.isFiring = true;
                this.sfxRocket.play();
            }

            this.x =Phaser.Math.Clamp(this.x,
                borderUISize +borderPadding,
                game.config.width - borderPadding - borderUISize);
        }
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }

}
