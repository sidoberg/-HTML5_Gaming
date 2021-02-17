var world = {
    tilemap      : null,
    tileset      : null,
    topLayer     : null,
    worldLayer   : null,
    downLayer    : null,
    overlapLayer : null,
    positionDebut: null,
    score        : 0,
    scoreText    : null,
    mortText     : null,
    gameOver     : false,

    initialiserWorld : function(){
        this.tilemap       = jeu.scene.make.tilemap({key : 'mapgame'});
        this.tileset       = this.tilemap.addTilesetImage("spritesheet", "spritesheet");
        this.topLayer      = this.tilemap.createStaticLayer("top", this.tileset, 0, 0);
        this.worldLayer    = this.tilemap.createStaticLayer("world", this.tileset, 0, 0);
        this.downLayer     = this.tilemap.createStaticLayer("bot", this.tileset, 0, 0);
        this.overlapLayer  = this.tilemap.createDynamicLayer("overlap", this.tileset, 0, 0);
        this.positionDebut = this.tilemap.findObject("Objets", obj =>  obj.name === "debut");
        

        this.worldLayer.setCollisionByProperty({Collides : true});
       
        jeu.scene.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);

        var policeTitre = {
            fontSize : "36px",
            color : "red",
            fontFamily: "Shadows Into Light Two",
    
        }
        this.scoreText =  jeu.scene.add.text(16, 16, "Score : 0", policeTitre);
        this.scoreText.setScrollFactor(0);
    },

    gererCollider : function(){
        this.overlapLayer.setTileIndexCallback(56, this.collectGemme, this);    //gemmeBleu
        this.overlapLayer.setTileIndexCallback(59, this.collectGemme, this);    //gemmeRouge
        this.overlapLayer.setTileIndexCallback(81, this.killPlayer, this);    //pique
        jeu.scene.physics.add.collider(jeu.player.aPlayer, this.worldLayer);
        jeu.scene.physics.add.overlap(jeu.player.aPlayer, this.overlapLayer);
        
    },
    gererCamera : function(){
        jeu.scene.cameras.main.startFollow(jeu.player.aPlayer);
        jeu.scene.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    },
    collectGemme : function(player, tile){
        jeu.scene.sound.play("gemmeSounds");
        this.genererParticules(tile.getCenterX(), tile.getCenterY());
        this.addScoreGemme(tile.properties.item);
        this.scoreText.setText("Score : " + this.score);
        this.overlapLayer.removeTileAt(tile.x, tile.y).destroy();
    },
    addScoreGemme : function(item){
        if(item === "gemmeRouge" ){
            this.score += 1;
        }else if(item === "gemmeBleu"){
            this.score += 2;
        }
    },
    genererParticules : function(posX, posY){
        var particules = jeu.scene.add.particles("spark");

        var configParticules = {
            x        : posX,
            y        : posY,
            speed    : 200,
            lifeSpan : {min  : 100, max: 300},
            scale    : {start: 0.1, end: 0.1},
            BlendMode: "ADD",
        }
        var emitter = particules.createEmitter(configParticules);

        // var emitter = particules.createEmitter();
        // emitter.setPosition(posX, posY);
        // emitter.setScale(0.1);
        // emitter.setSpeed(100);
        // emitter.setBlendMode(Phaser.BlendModes.ADD);

        jeu.scene.time.delayedCall(300, function(){
            particules.destroy();
        })
    },
    killPlayer : function(){
        if(!this.gameOver){
            this.gameOver = true;
            jeu.player.killPlayer();
            jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x, jeu.scene.cameras.main.midPoint.y, "panel").setScale(5, 3);
            var restartBouton = jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x, jeu.scene.cameras.main.midPoint.y+100, "validation").setInteractive();
            restartBouton.on("pointerup", function(){
                jeu.scene.scene.restart();
            });

            var policeTitre = {
                fontSize : "36px",
                color : "red",
                fontFamily: "Shadows Into Light Two",
        
            }
            this.mortText = jeu.scene.add.text(jeu.scene.cameras.main.midPoint.x-110, jeu.scene.cameras.main.midPoint.y-100, "Game Over \n restart Game", policeTitre);
        }

    },

}

