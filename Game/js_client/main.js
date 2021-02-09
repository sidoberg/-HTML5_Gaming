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


var player = null;
var clickBoutonHaut = false;
var clickBoutonBas = false;
var cursor = null;

const game = new Phaser.Game(config);

function preload() {
    this.load.image("player", "player.png");
    this.load.image("haut", "haut.png");
    this.load.image("bas", "bas.png");
}

function create() {
    var positionCameraCentreX = this.cameras.main.centerX;
    var positionCameraCentreY = this.cameras.main.centerY;
    player = this.add.sprite(positionCameraCentreX, positionCameraCentreY, "player");
    
    var down = this.add.sprite(50, 50, "bas").setInteractive();
    var top  = this.add.sprite(100, 50, "haut").setInteractive();
    
    

   down.on("pointerdown", function(){
        clickBoutonBas = true;
    });

   down.on("pointerup", function(){
        clickBoutonBas = false;
    });

    down.on("pointerout", function(){
        clickBoutonBas = false;
    });

    top.on("pointerdown", function(){
        clickBoutonHaut = true;
    });
 
    top.on("pointerup", function(){
        clickBoutonHaut = false;
    });
 
    top.on("pointerout", function(){
        clickBoutonHaut = false;
    });

    cursor = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
    if(clickBoutonHaut){
        player.setScale(player.scaleX + 0.1, player.scaleY + 0.1);
    }
    if(clickBoutonBas){
        player.setScale(player.scaleX - 0.1, player.scaleY - 0.1);
    }

    if(cursor.left.isDown){
        player.x -= 5;
    }

    else if(cursor.right.isDown){
        player.x += 5;
    }

    else if(cursor.up.isDown){
        player.y -= 5;
    }

    else if(cursor.down.isDown){
        player.y+= 5;
    }
}