//main.js
//Declairs global variables, and creates the phaser game object
//Thomas Price


let config= {
    type: Phaser.CANVAS,
    width:640,
    height: 480,
    scene: [Menu, Play],
}

//defining play area, and vars for placing objects
let game = new Phaser.Game(config);
let borderUISize = game.config.height /15;
let borderPadding = borderUISize /3;

 
//vars for keys
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyW, keyA, keyS, keyD;


/*Assignement Scorekeeping
done mods:
30 Simultaneous two-player mode
10 New title Screen
10 Parallax Starfield
10 Visible time remaining
20 particle emitter explosions
20 add time for successfull hits

target mods:
20 parabalic rockets

*/

//Class notes please ignore:
// start server at localhost:8000: "python3 -m http.server"   (in terminal)
// in blank index. html hit ! and slect the emmit thingy to autofill
//prof github rndmcnlly