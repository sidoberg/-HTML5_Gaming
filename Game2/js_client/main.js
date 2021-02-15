var jeu = {
    scene : null,
    world : world,
    player: player,
}

function preload() {
    jeu.scene = this;

    jeu.scene.load.image("spritesheet", "spritesheet_tiles.png");
    jeu.scene.load.tilemapTiledJSON("mapgame", "mapGame.json");
    jeu.scene.load.atlas("player", "playerZombi.png", "zombiPlayerAtlas.json");
}


function create() {
    jeu.world.initialiserWorld();
    jeu.player.initialiserPlayer();
    jeu.player.genererPlayerAnimations();
    jeu.player.aPlayer.anims.play("playerWalk");
}




function update(time, delta) {
    
}




