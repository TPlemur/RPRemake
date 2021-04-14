

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.audio('sfx_select','assets/blip_select12.wav');
        this.load.audio('sfx_explosion','assets/doomerShoot.ogg');
        this.load.audio('sfx_rocket','assets/rocket_shot.wav');
        this.load.image('rocket','assets/rocket.png');
    }
    create(){

        //menu text configuration
        let menuConfig = {
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

        //static menu text
        this.add.text(game.config.width / 2, borderUISize + borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize + borderPadding*4, 'P1/Menu: arrow keys, P2 WASD', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        //create game settings
        game.setting = {
            twoplayer: false,
            spaceshipSpeed: 3,
            gameTimer: 60000
        }

        //menu changable menu options text
        this.gametime = this.add.text((game.config.width)/5 + borderUISize/2, 
            game.config.height / 2 + borderUISize+ borderPadding*5, 'time\n' + game.setting.gameTimer/1000 + 's',menuConfig).setOrigin(0.5);
       this.numplays = this.add.text(2*(game.config.width)/5 + borderUISize/2, 
            game.config.height / 2 + borderUISize+ borderPadding*5, 'players\n1P',menuConfig).setOrigin(0.5);
        this.gamespeed = this.add.text(3*(game.config.width)/5 + borderUISize/2,
            game.config.height / 2 + borderUISize+ borderPadding*5, 'speed\n' + game.setting.spaceshipSpeed,menuConfig).setOrigin(0.5);
        this.add.text(4*(game.config.width)/5 + borderUISize/2,
            game.config.height / 2 + borderUISize+ borderPadding*5, 'play',menuConfig).setOrigin(0.5);


        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // places the cursor and traks which position it is in
        this.menuOption = 0;
        this.cursor = this.add.sprite((game.config.width)/5 + borderUISize/2,400,'rocket').setOrigin(0.5);

    }

    update(){

        //move cursor left, if there is an option to the left
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.menuOption > 0){
            this.menuOption -=1;
            this.cursor.x -=game.config.width/5;
            this.sound.play('sfx_select');
        }

        //move cursor right if there is an option to the right
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.menuOption < 3){
            this.menuOption +=1;
            this.cursor.x +=game.config.width/5;
            this.sound.play('sfx_select');
        }

        //increment options
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            //increment time
            if(this.menuOption == 0 && game.setting.gameTimer < 120000){
                game.setting.gameTimer +=15000
                this.sound.play('sfx_select');
                this.gametime.text = 'time\n' + game.setting.gameTimer/1000 + 's';
            }
            //toggle 2player
            if(this.menuOption == 1){
                this.sound.play('sfx_select');
                if(game.setting.twoplayer){
                game.setting.twoplayer = false;
                this.numplays.text ='players\n1P';
                }
                else{
                    game.setting.twoplayer = true;
                    this.numplays.text ='players\n2P';  
                }
            }
            // increment ship speed
            if(this.menuOption == 2 && game.setting.spaceshipSpeed < 10){
                this.sound.play('sfx_select');
                game.setting.spaceshipSpeed +=1;
                this.gamespeed.text = 'speed\n' + game.setting.spaceshipSpeed;
            }
            //start the game
            if(this.menuOption == 3){
                this.sound.play('sfx_select');
                this.scene.start('playScene');
            }
        }
        //decrement options
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            //decrement time
            if(this.menuOption == 0 && game.setting.gameTimer > 15000){
                game.setting.gameTimer -=15000
                this.sound.play('sfx_select');
                this.gametime.text = 'time\n' + game.setting.gameTimer/1000 + 's';
            }
            //toggle 2player
            if(this.menuOption == 1){
                this.sound.play('sfx_select');
                if(game.setting.twoplayer){
                game.setting.twoplayer = false;
                this.numplays.text ='players\n1P';
                }
                else{
                    game.setting.twoplayer = true;
                    this.numplays.text ='players\n2P';  
                }
            }
            //decrement ship speed
            if(this.menuOption == 2 && game.setting.spaceshipSpeed > 1){
                this.sound.play('sfx_select');
                game.setting.spaceshipSpeed -=1;
                this.gamespeed.text = 'speed\n' + game.setting.spaceshipSpeed;
            }
            //start the game
            if(this.menuOption == 3){
                this.sound.play('sfx_select');
                this.scene.start('playScene');
            }
        }

    }


}
