
class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
        
    }

    preload(){
        this.load.image('starfield','assets/starfield.png');
        this.load.image('rocket','assets/rocket.png');
        this.load.image('spaceship','assets/spaceship.png');
    }



    create(){
        //starfield background
        this.starfield = this.add.tileSprite(
            0,0,640,489, 'starfield').setOrigin(0,0);

        //place rocket
        this.p1Rocket = new Rocket(
            this, game.config.width/2, 
            game.config.height -borderUISize - borderPadding, 'rocket');

                    //place ships
        this.ship1 = new Ship(
            this, 200, 
            200, 'spaceship');

        this.ship2 = new Ship(
            this, 400, 
            400, 'spaceship');

         this.ship3 = new Ship(
            this, 600, 
            300, 'spaceship');

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


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.R);
    }

    update(){
        this.starfield.tilePositionX -=3;
        this.p1Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

        this.checkCollision(this.p1Rocket, this.ship1);
        this.checkCollision(this.p1Rocket, this.ship2);
        this.checkCollision(this.p1Rocket, this.ship3);


    }

    checkCollision(rocket, ship) {
        if(    rocket.x + rocket.width > ship.x 
            && rocket.x < ship.x + ship.width 
            && rocket.y + rocket.height > ship.y 
            && rocket.y < ship.y+ship.height){
                this.alpha = 0; 
                rocket.reset();
                ship.reset();
            }

    }


}