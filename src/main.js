// start server at localhost:8000: "python3 -m http.server"   (in terminal)
// in blank index. html hit ! and slect the emmit thingy to autofill
//prof github rndmcnlly


let config= {
    type: Phaser.CANVAS,
    width:640,
    height: 480,
    scene: [Menu, Play],

}

let game = new Phaser.Game(config);

let borderUISize = game.config.height /15;
let borderPadding = borderUISize /3;


//vars

let keyLEFT, keyRIGHT, keyF, keyR;
