export default class Ranger extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.walkAreaX, config.walkAreaY);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Ranger";
        this.power = 18;
        this.defense = 20;
        this.health = 28;
        this.maxhealth = 28;
        this.status = "Alive";
        this.respawnTime = 200;
        this.respawnTimer = 200;
        this.bounty = [70, 70, 90, 90, 100, 110, 120];
        this.attackRange = 200;
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