// start server at localhost:8000: "python3 -m http.server"   (in terminal)
// in blank index. html hit ! and slect the emmit thingy to autofill

console.log("ping");

let config= {
    type: Phaser.CANVAS,
    width:640,
    height: 480,

}

let game = new Phaser.Game(config);

