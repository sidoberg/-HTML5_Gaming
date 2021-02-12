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

var player          = null;
var clickBoutonHaut = false;
var clickBoutonBas  = false;
var cursor          = null;
var Vkey;
var boutonDown;
var boutonTop;
var isLeftDown      = false;
var isRightDown     = false;
var isKickDown      = false;
var isReadyToKick   = true;

const game = new Phaser.Game(config);

function preload() {
    this.load.image("castle", "backgroundCastles.png");
    this.load.image("player", "player.png");
    this.load.image("player_kick", "player_kick.png");
    this.load.image("player_walk1", "player_walk1.png");
    this.load.image("player_walk2", "player_walk2.png");
    this.load.image("haut", "haut.png");
    this.load.image("bas", "bas.png");
    this.load.image("zombie", "zombie_walk1.png");

    this.load.audio("ready", "ready.ogg");
    this.load.audio("kick", "kick.ogg");
}

function create() {
    this.sound.play("ready");
    var positionCameraCentreX = this.cameras.main.centerX;
    var positionCameraCentreY = this.cameras.main.centerY;
    this.add.sprite(positionCameraCentreX, positionCameraCentreY, "castle");
    player     = this.add.sprite(positionCameraCentreX, positionCameraCentreY, "player");
    zombie     = this.add.sprite(500, positionCameraCentreY, "zombie");
    boutonDown = this.add.sprite(50, 50, "bas").setInteractive();
    boutonTop  = this.add.sprite(100, 50, "haut").setInteractive();
    cursor     = this.input.keyboard.createCursorKeys();
    Vkey       = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    zoomPlayer();

    var policeTitre = {
        fontSize : "16px",
        color : "red",
        fontFamily: 'Hanalei',

    }
    this.add.text(positionCameraCentreX, 30, "salut tout le monde", policeTitre)

    zombie.flipX = true;
    var tween = this.tweens.add({
        targets : zombie,
        x : 700,
        ease : "Linear",
        Duration : 300,
        yoyo : true,
        repeat : -1,
        onStart : function(){},
        onComplete : function(){},
        onYoyo : function(){zombie.flipX = !zombie.flipX},
        onRepeat : function(){zombie.flipX = !zombie.flipX },
    });

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

function update(time, delta) {
    updateZoomPlayer();
    deplacementPlayer();
}

function zoomPlayer(){
    boutonDown.on("pointerdown", function(){
        clickBoutonBas = true;
    });

    boutonDown.on("pointerup", function(){
        clickBoutonBas = false;
    });

    boutonDown.on("pointerout", function(){
        clickBoutonBas = false;
    });

    boutonTop.on("pointerdown", function(){
        clickBoutonHaut = true;
    });
 
    boutonTop.on("pointerup", function(){
        clickBoutonHaut = false;
    });
 
    boutonTop.on("pointerout", function(){
        clickBoutonHaut = false;
    });
}

function updateZoomPlayer(){
    if(clickBoutonHaut){
        player.setScale(player.scaleX + 0.1, player.scaleY + 0.1);
    }
    if(clickBoutonBas){
        player.setScale(player.scaleX - 0.1, player.scaleY - 0.1);
    }
}

function deplacementPlayer() {
    if(isKickDown && isReadyToKick){
        player.setTexture("player_kick");
        game.sound.play("kick");
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

    if(Vkey.isDown && isReadyToKick){
        isKickDown = true;
    }
    if(Vkey.isUp){
        isKickDown = false;
        isReadyToKick = true;
        
    }

     if(cursor.up.isDown){
        player.y -= 5;
    }
     if(cursor.down.isDown){
        player.y+= 5;
    }

}
