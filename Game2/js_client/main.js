var jeu = {
    scene : null,
    world : world,
    player: player,
    cursor: null,
    ennemiTemplate: ennemiTemplate, 
}

function preload() {
    jeu.scene = this;

    jeu.scene.load.image("spritesheet", "spritesheet.png");
    jeu.scene.load.tilemapTiledJSON("mapgame", "mapGame.json");
    jeu.scene.load.atlas( "player",  "playerZombi.png", "zombiPlayerAtlas.json");
    jeu.scene.load.atlas("ennemi", "ennemiAdventurer.png", "ennemiAdventurerAtlas.json");
    jeu.scene.load.image("spark", "particle.png");
    jeu.scene.load.audio("gemmeSounds", "gemmeSounds.ogg");
    jeu.scene.load.image("validation", "yellow_boxCheckmark.png");
    jeu.scene.load.image("panel", "yellow_panel.png");

    jeu.world.gameOver = false;
    jeu.player.isAlive = true;
}


function create() {
    jeu.world.initialiserWorld();
    jeu.player.initialiserPlayer();
    jeu.player.genererPlayerAnimations();
    jeu.ennemiTemplate.genererEnnemiAnimations();
    jeu.ennemiTemplate.createEnnemiAdventurer(jeu.world.debutEnnemi.x, jeu.world.debutEnnemi.y, 100).initEnnemiAdventurer();
    jeu.ennemiTemplate.createEnnemiAdventurer(jeu.world.debutEnnemi2.x, jeu.world.debutEnnemi2.y, 150).initEnnemiAdventurer();
    jeu.ennemiTemplate.createEnnemiAdventurer(jeu.world.debutEnnemi3.x, jeu.world.debutEnnemi3.y, 100).initEnnemiAdventurer();

    jeu.world.gererCollider();
    jeu.cursor = jeu.scene.input.keyboard.createCursorKeys();
    jeu.world.gererCamera();
    
}


function update(time, delta) {
    jeu.player.gererDeplacement();
    ajusterTailleEcran();
}

function ajusterTailleEcran(){
    var canvas        = document.querySelector("canvas");
    var fenetreWidth  = window.innerWidth;
    var fenetreHeight = window.innerHeight;
    var fenetreRatio  = fenetreWidth / fenetreHeight;
    var configJeu     = config.width / config.height;

    if(fenetreRatio < configJeu){
        canvas.style.width  = fenetreWidth + "px";
        canvas.style.height = (fenetreWidth / configJeu) + "px";
    }
    else{
        canvas.style.width  = (fenetreHeight * configJeu) + "px";
        canvas.style.height = fenetreHeight + "px";
    }
}