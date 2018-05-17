export default class Shadow extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.walkAreaX, config.walkAreaY);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Shadow";
        this.power = 15;
        this.defense = 4;
        this.health = 1;
        this.maxhealth = 1;
        this.status = "Alive";
        this.width = 75;
        this.height = 70;
        this.respawnTime = 200;
        this.respawnTimer = 200;
        this.bounty = [35, 35, 40, 40, 45, 45, 50, 60, 70];
        this.attackRange = 100;
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