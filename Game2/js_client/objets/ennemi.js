var ennemiTemplate = {
    createEnnemiAdventurer : function(posX, posY, range){
        var ennemi = {
            aEnnemi    : null,
        
           initEnnemiAdventurer : function (){
                this.aEnnemi = jeu.scene.physics.add.sprite(posX, posY, "ennemi", "adventurer_stand");
                this.aEnnemi.setOrigin(0.5, 1);
                this.genererDeplacementEnnemi();
                this.genereCollide();
            },
            genererDeplacementEnnemi : function(){
                this.aEnnemi.anims.play("adventurerWalk");
        
                var tween = jeu.scene.tweens.add({
                    targets : this.aEnnemi,
                    x : posX + range,
                    ease : "Linear",
                    duration : 1000 * range / 100,
                    yoyo : true,
                    repeat : -1,
                    onStart : function(){},
                    onComplete : function(){},
                    onYoyo : function(tween){tween.targets[0].flipX = !tween.targets[0].flipX},
                    onRepeat : function(tween){tween.targets[0].flipX = !tween.targets[0].flipX},
                });
            },
            genereCollide : function(){
                jeu.scene.physics.add.collider(this.aEnnemi, jeu.world.worldLayer);
                jeu.scene.physics.add.overlap(jeu.player.aPlayer,this.aEnnemi, this.attackEnnemi);
            },
            attackEnnemi : function(player, ennemi){
                if(jeu.player.isJumping){
                    jeu.scene.sound.play("kill");
                    ennemi.destroy();
                }
                else{
                    jeu.world.killPlayer();
                }
            },
        }
        return ennemi;
    },
    genererEnnemiAnimations : function() {
        jeu.scene.anims.create({
            key : "adventurerWalk",
            frames : game.anims.generateFrameNames("ennemi", {prefix: "adventurer_swim", start:1, end:2}),
            frameRate: 5,
            repeat : -1
        });
    },
}


