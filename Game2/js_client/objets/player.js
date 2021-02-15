var player = {
    aPlayer : null,

    initialiserPlayer : function (){
      this.aPlayer = jeu.scene.add.sprite(100, 100, "player").play("playerWalk");
    },

     genererPlayerAnimations : function() {
        jeu.scene.anims.create({
            key : "playerWalk",
            frames : jeu.scene.anims.generateFrameNames("player", {prefix: "zombie_walk", start:1, end:2}),
            frameRate: 5,
            repeat : -1
        });
    
    }
}

