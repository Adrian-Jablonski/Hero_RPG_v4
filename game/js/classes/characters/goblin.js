class Goblin extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.walkAreaX, config.walkAreaY);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Goblin";
        this.power = 7;
        this.defense = 20;
        this.health = 25;
        this.maxhealth = 25;
        this.status = "Alive";
        this.respawnTime = 200;
        this.respawnTimer = 200;
        this.bounty = [5, 5, 6, 6, 8, 10];
        this.attackRange = 70;
        this.battleMode = false;
        this.speed = .5;
        this.x_y_whenClicked = ["", ""];
        this.damage = "";
        this.walkAreaX = config.walkAreaX;
        this.walkAreaY = config.walkAreaY;
        this.attackTime = 90;
        this.defenseBenefit = Math.round(this.defense * .2);
        this.defenseTimes = Math.round(this.defense / 4);
    }    
}

export default Goblin;