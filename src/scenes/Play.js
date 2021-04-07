
class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
        
    }
    create(){
        this.add.text(20,20,"ping");
        //green UI background element
        this.add.rectangle(
            0,borderUISize + borderPadding,
             game.config.width, borderUISize*2,
             0x00ff00
             ).setOrigin(0,0);
    }


}