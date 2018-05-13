/*
	Run by using http-server -c-1 /Users/adrianj/Desktop/Phaser_RPG_Game
	Then go to http://localhost:8080 
*/

class Scene2 extends Phaser.Scene {
    constructor() {
        super({key:"Scene2"});
    }
    
    create() {
        this.text = this.add.text(200, 200, "Welcome to Scene2!", {font:"40px Impact"});

        this.input.keyboard.on('keyup', function(e) {
            if (e.key == "1") {
                this.scene.start("Scene1")
            }
        },this);
        
    }

    update() {
        // console.log("Scene2")
    }
}