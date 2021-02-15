var world = {
    
    tilemap   : null,
    tileset   : null,
    yopLayer  : null,
    worldLayer: null,
    downLayer : null,

    initialiserWorld : function(){
        this.tilemap    = jeu.scene.make.tilemap({key: 'mapgame'});
        this.tileset    = this.tilemap.addTilesetImage("spritesheet_tiles", "spritesheet");
        this.yopLayer   = this.tilemap.createStaticLayer("top", this.tileset, 0, 0);
        this.worldLayer = this.tilemap.createStaticLayer("world", this.tileset, 0, 0);
        this.downLayer  = this.tilemap.createStaticLayer("bot", this.tileset, 0, 0);
    }
}

