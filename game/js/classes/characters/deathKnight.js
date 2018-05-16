class DeathKnight extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.walkAreaX, config.walkAreaY);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Death Knight";
        this.power = 10;
        this.defense = 10;
        this.health = 20;
        this.maxhealth = 20;
        this.status = "Alive";
        this.respawnTime = 400;
        this.respawnTimer = 400;
        this.bounty = [20, 20, 25, 25, 30, 40];
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

export default DeathKnight;