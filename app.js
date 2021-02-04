const config = {
    width: 1000,
    height: 700,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 450}
        },

    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}


var game = new Phaser.Game(config)
let dude
let cursors

function preload() {
    this.load.image('dude', 'images/dude.png')
}

function create() {
    console.log(this)
    dude = this.physics.add.image(200, 200, 'dude')
    dude.body.collideWorldBounds = true;

    cursors = this.input.keyboard.createCursorKeys()
}

function update() {
    dude.setVelocityX(0)

    if(cursors.up.isDown){
        dude.setVelocity(0, -300)
    }
    if(cursors.down.isDown){
        dude.setVelocity(0, 300)
    }
    if(cursors.right.isDown){
        dude.setVelocity(1000, 0)
    }
    if(cursors.left.isDown){
        dude.setVelocity(-1000, 0)
    }
}