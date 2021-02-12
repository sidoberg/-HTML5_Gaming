var config ={
    type  : Phaser.AUTO,
    width : 800,
    height: 600,
    scene : {
        preload: preload,
        create : create,
        update : update,
    },
    physics : {
        default : "arcade",
        arcade : {
            gravity : {y : 500}
        },
    },
}

const game = new Phaser.Game(config);



function preload() {
    this.load.image("spritesheet", "spritesheet_tiles.png");
    this.load.tilemapTiledJSON("mapgame", "mapGame.json");
}

function create() {
    this.tilemap = this.make.tilemap({key: 'mapgame'});
    this.tileset = this.tilemap.addTilesetImage("spritesheet_tiles", "spritesheet");

    this.yopLayer = this.tilemap.createStaticLayer("top", this.tileset, 0, 0);
    this.worldLayer = this.tilemap.createStaticLayer("world", this.tileset, 0, 0);
    this.downLayer = this.tilemap.createStaticLayer("bot", this.tileset, 0, 0);
    
}



function genererAnimations() {
  
}

function update(time, delta) {

}




