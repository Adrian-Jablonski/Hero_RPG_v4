export default class Dragon extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.walkAreaX, config.walkAreaY);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Dragon";
        this.power = 50;
        this.defense = 50;
        this.health = 50;
        this.maxhealth = 50;
        this.status = "Alive";
        this.width = 100;
        this.height = 83;
        this.respawnTime = 800;
        this.respawnTimer = 800;
        this.bounty = [400, 500, 700, 800];
        this.attackRange = 220;
        this.battleMode = false;
        this.speed = .3;
        this.x_y_whenClicked = ["", ""];
        this.damage = "";
        this.walkAreaX = config.walkAreaX;
        this.walkAreaY = config.walkAreaY;
        this.attackTime = 90;
        this.defenseBenefit = Math.round(this.defense * .2);
        this.defenseTimes = Math.round(this.defense / 4);
        this.specialAttackPerc = .33;
    }    
}