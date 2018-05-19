export default class Wizard extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.walkAreaX, config.walkAreaY);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Wizard";
        this.power = 20;
        this.defense = 15;
        this.health = 22;
        this.maxhealth = 22;
        this.status = "Alive";
        this.width = 40;
        this.height = 52;
        this.respawnTime = 800;
        this.respawnTimer = 800;
        this.bounty = [60, 60, 60, 70, 70, 80, 80, 90];
        this.attackRange = 150;
        this.battleMode = false;
        this.speed = .5;
        this.x_y_whenClicked = ["", ""];
        this.damage = "";
        this.walkAreaX = config.walkAreaX;
        this.walkAreaY = config.walkAreaY;
        this.attackTime = 90;
        this.defenseBenefit = Math.round(this.defense * .2);
        this.defenseTimes = Math.round(this.defense / 4);
        this.specialAttackPerc = .25;
    }    
}