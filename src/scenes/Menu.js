

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

        //menu text
        this.add.text(game.config.width / 2, borderUISize + borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize + borderPadding*4, 'use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        //removed for testing pruposes this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        //create game settings
        game.setting = {
            twoplayer: false,
            spaceshipSpeed: 3,
            gameTimer: 60000
        }

        //menu options setup
        this.gametime = this.add.text((game.config.width)/5 + borderUISize/2, 
            game.config.height / 2 + borderUISize+ borderPadding*5, 'time\n' + game.setting.gameTimer/1000 + 's',menuConfig).setOrigin(0.5);
        this.add.text(2*(game.config.width)/5 + borderUISize/2, 
            game.config.height / 2 + borderUISize+ borderPadding*5, 'players\n1P\n2P',menuConfig).setOrigin(0.5);
        this.gamespeed = this.add.text(3*(game.config.width)/5 + borderUISize/2,
            game.config.height / 2 + borderUISize+ borderPadding*5, 'speed\n' + game.setting.spaceshipSpeed,menuConfig).setOrigin(0.5);
        this.add.text(4*(game.config.width)/5 + borderUISize/2,
            game.config.height / 2 + borderUISize+ borderPadding*5, 'play',menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


        this.menuOption = 0;
        this.cursor = this.add.sprite((game.config.width)/5 + borderUISize/2,400,'rocket').setOrigin(0.5);

    }

    update(){

        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.menuOption > 0){
            this.menuOption -=1;
            this.cursor.x -=game.config.width/5;
            console.log(this.menuOption);
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.menuOption < 3){
            this.menuOption +=1;
            this.cursor.x +=game.config.width/5;
            console.log(this.menuOption);
        }

        //increment options
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            if(this.menuOption == 0 && game.setting.gameTimer < 120000){
                game.setting.gameTimer +=15000
                this.gametime.text = 'time\n' + game.setting.gameTimer/1000 + 's';
            }
            if(this.menuOption == 2 && game.setting.spaceshipSpeed < 8){
                game.setting.spaceshipSpeed +=1;
                this.gamespeed.text = 'speed\n' + game.setting.spaceshipSpeed;
            }
            if(this.menuOption == 3){
                this.sound.play('sfx_select');
                this.scene.start('playScene');
            }
        }
        //decrement options
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            if(this.menuOption == 0 && game.setting.gameTimer > 15000){
                game.setting.gameTimer -=15000
                this.gametime.text = 'time\n' + game.setting.gameTimer/1000 + 's';
            }
            if(this.menuOption == 2 && game.setting.spaceshipSpeed > 1){
                game.setting.spaceshipSpeed -=1;
                this.gamespeed.text = 'speed\n' + game.setting.spaceshipSpeed;
            }
            if(this.menuOption == 3){
                this.sound.play('sfx_select');
                this.scene.start('playScene');
            }
        }

    }


}
