//Play.js
//Creates and populates the playspace
//Thomas Price


class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload(){
        //load sprites
        this.load.image('starfield','assets/starfieldTransBackground.png');
        this.load.image('rocket','assets/rocket.png');
        this.load.image('spaceship','assets/spaceship.png');
        this.load.image('exParticle','assets/exparticle.png');
        this.load.spritesheet('explosion','./assets/explosion.png',{frameWidth: 64, fameHeight: 32, startFrame: 0, endFrame: 9 });
    }



    create(){

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        //starfield background
        this.starfield = this.add.tileSprite(
            0,0,640,489, 'starfield').setOrigin(0,0);

        this.starfieldFast = this.add.tileSprite(
            0,0,640,489, 'starfield').setOrigin(0,0);

        this.starfieldSlow = this.add.tileSprite(
            0,0,640,489, 'starfield').setOrigin(0,0);

        this.starfieldFast.tilePositionY -= 200;
        this.starfieldSlow.tilePositionY -= 260;

        //place p1 rocket
        this.p1Rocket = new Rocket(
            this, game.config.width/2, 
            game.config.height -borderUISize - borderPadding, 'rocket',keyLEFT,keyRIGHT,keyUP).setOrigin(0);

        //place p2 rocket
        if(game.setting.twoplayer){
            this.p2Rocket = new Rocket(
                this, game.config.width/2, 
                game.config.height -borderUISize - borderPadding, 'rocket',keyA,keyD,keyW).setOrigin(0);
        }

        //place ships
        this.ship1 = new Ship(
            this, 250, 200, 
            'spaceship').setOrigin(0);

        this.ship2 = new Ship(
            this, 400, 150, 
            'spaceship').setOrigin(0);

         this.ship3 = new Ship(
            this, 700, 250, 
            'spaceship').setOrigin(0);

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

        //explosion animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{start: 0, end: 9, first: 0}),
            framerate: 30
        });

        //score configs
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //display the scores
        if(game.setting.twoplayer){
            this.scoreLeft = this.add.text(
                borderUISize + borderPadding, 
                borderUISize + borderPadding*2, 
                this.p2Rocket.score, 
                scoreConfig
                );
        }
        this.scoreRight = this.add.text(
            game.config.width -borderUISize - borderPadding, 
            borderUISize + borderPadding*2, 
            this.p1Rocket.score, 
            scoreConfig
        ).setOrigin(1,0);
        
        //game end flag
        this.gameOver = false;

        //gameclock
        scoreConfig.fixedWidth = 0;
        this.Clock = this.time.delayedCall(game.setting.gameTimer,()=>{
            //end of game display text
            this.add.text(game.config.width/2, game.config.height/2,'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press <- for Menu or -> to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true; // changes state to stop movement
        }, null, this);

        //display text for timer
        this.timeLeft = this.add.text(
            game.config.width/2 , 
            borderUISize + borderPadding*2, 
            'time:' + this.Clock.getProgress(), 
            scoreConfig).setOrigin(0.5,0);
            
        
    }

    update(){
        
        //update the clock
        this.timeLeft.text = 
            Math.trunc(
            game.setting.gameTimer*(1-this.Clock.getProgress()) //coundown in miliseconds
            /1000 // coundown in seconds
            ).toString().padStart(3,"0"); // add zeros to fill width
            


        //restart if game over
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.restart();
        }

        //restart if game over
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene');
        }

        //run ships and rockets
        if(!this.gameOver){

            //move starfield backgrounds
            this.starfield.tilePositionX -= 2 + game.setting.spaceshipSpeed/3;
            this.starfieldFast.tilePositionX -= 3 + game.setting.spaceshipSpeed/3;
            this.starfieldSlow.tilePositionX -= 1 + game.setting.spaceshipSpeed/3;


            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            if(game.setting.twoplayer){
                this.p2Rocket.update();
            }
        };

        //handle collsisions 
        this.checkCollision(this.p1Rocket, this.ship1);
        this.checkCollision(this.p1Rocket, this.ship2);
        this.checkCollision(this.p1Rocket, this.ship3);
        if(game.setting.twoplayer){
            this.checkCollision(this.p2Rocket, this.ship1);
            this.checkCollision(this.p2Rocket, this.ship2);
            this.checkCollision(this.p2Rocket, this.ship3);
        }



    }



    //what happens when a ship sollision happens
    shipExplode(ship,rocket){
        ship.alpha = 0;

        //do the explosion thing
        var particles = this.add.particles('exParticle');
        particles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.5, end: 3 },
            //tint: { start: 0xff945e, end: 0xff945e },
            speed: 30,
            blendMode: 'ADD',
            frequency: 5,
            maxParticles: 5,
            x: ship.x + 40,
            y: ship.y + 20
        });

        //play the animation and reset the objects
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', ()=>{
            ship.reset();
            ship.alpha =1;
            boom.destroy();
        });

        //sound and score update
        this.sound.play('sfx_explosion');
        rocket.score += ship.points;
        this.scoreRight.text = this.p1Rocket.score;
        if(game.setting.twoplayer){
            this.scoreLeft.text = this.p2Rocket.score;
        }

    }


    //adds time to to clock acording to game.setting.timePerHit 
    addTime(){
        //scoreConfig
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //make the base clock time correct
        game.setting.gameTimer = game.setting.gameTimer //base clock time
        - game.setting.gameTimer*this.Clock.getProgress() // subtract off current progress
        + game.setting.timePerHit // add back the new bonus
        //remove the old clock
        this.Clock.remove(false);
        //create new clock with new time
        this.Clock = this.time.delayedCall(
            game.setting.gameTimer
        ,()=>{//end of game display text
            this.add.text(game.config.width/2, game.config.height/2,'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press <- for Menu or -> to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true; // changes state to stop movement
        }, null, this);
        //make the base clock time correct
        game.setting.gameTimer = game.setting.gameTimer //base clock time
        - game.setting.gameTimer*this.Clock.getProgress() // subtract off current progress
        + game.setting.timePerHit // add back the new bonus
    }


    //collision checking for ships
    checkCollision(rocket, ship) {
        if( rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y){
                this.alpha = 0; 
                rocket.reset();
                this.shipExplode(ship,rocket);
                this.addTime();
            }

    }


}