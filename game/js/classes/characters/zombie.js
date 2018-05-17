export default class Zombie extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.walkAreaX, config.walkAreaY);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Zombie";
        this.power = 20;
        this.defense = 25;
        this.health = 30;
        this.maxhealth = 30;
        this.status = "Alive";
        this.respawnTime = 200;
        this.respawnTimer = 200;
        this.bounty = [100, 100, 150, 150, 200, 250];
        this.attackRange = 60;
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