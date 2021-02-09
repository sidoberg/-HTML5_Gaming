var config ={
    type  : Phaser.AUTO,
    width : 800,
    height: 600,
    scene : {
        preload: preload,
        create : create,
        update : update,
    },
}

const game = new Phaser.Game(config);

function preload() {
    this.load.image("player", "player.png");
}

function create() {
    this.add.sprite(50, 50, "player");
}

function update(time, delta) {
    
}