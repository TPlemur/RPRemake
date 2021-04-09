
class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
        
    }

    preload(){
        this.load.image('starfield','assets/starfield.png');
        this.load.image('rocket','assets/rocket.png');
    }



    create(){
        //starfield background
        this.starfield = this.add.tileSprite(
            0,0,640,489, 'starfield').setOrigin(0,0);

        //place rocket
        this.p1Rocket = new Rocket(
            this, game.config.width/2, 
            game.config.height -borderUISize - borderPadding, 'rocket');

        //green UI background element
        this.add.rectangle(
            0,borderUISize + borderPadding,
             game.config.width, borderUISize*2,
             0x00ff00
             ).setOrigin(0,0);
            
        //white boarders     
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
    	this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
    	this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.keyboard.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.keyboard.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.keyboard.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.keyboard.R);
    }

    update(){
        this.starfield.tilePositionX -=3;
        this.p1Rocket.update();
    }


}