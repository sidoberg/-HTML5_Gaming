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
var Vkey;

const game = new Phaser.Game(config);

function preload() {
    this.load.image("player", "player.png");
    this.load.image("player_kick", "player_kick.png");
    this.load.image("player_walk1", "player_walk1.png");
    this.load.image("player_walk2", "player_walk2.png");
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

    this.input.keyboard.on("keydown_B", function (){
        
    })
    Vkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)

    this.anims.create({
        key : "playerWalk",
        frames : [
            {key : "player_walk1"},
            {key : "player_walk2"},
        ],
        frameRate : 8,
        repeat : -1
    });
    player.anims.play("playerWalk");
}


var isLeftDown  = false;
var isRightDown = false;
var isKickDown  = false;


function update(time, delta) {
    if(clickBoutonHaut){
        player.setScale(player.scaleX + 0.1, player.scaleY + 0.1);
    }
    if(clickBoutonBas){
        player.setScale(player.scaleX - 0.1, player.scaleY - 0.1);
    }

    if(isKickDown){
        player.setTexture("player_kick");
    }
    else if(isLeftDown){
        player.x -= 5;
        player.anims.play("playerWalk", true);
        player.setFlip(true, false);
    }
    else if(isRightDown){
        player.x += 5;
        player.anims.play("playerWalk", true);
        player.setFlip(false, false);
    }
    else{
        player.setTexture("player");
    }


    if(cursor.left.isDown){
        isLeftDown = true;
    }
    if(cursor.left.isUp){
        isLeftDown = false;
    }

    if(cursor.right.isDown){
        isRightDown = true;
    }
    if(cursor.right.isUp){
        isRightDown = false;
    }

    if(Vkey.isDown){
        isKickDown = true;
    }
    if(Vkey.isUp){
        isKickDown = false;
        
    }

     if(cursor.up.isDown){
        player.y -= 5;
    }
     if(cursor.down.isDown){
        player.y+= 5;
    }

}