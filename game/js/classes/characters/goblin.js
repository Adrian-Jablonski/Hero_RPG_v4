class Goblin extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Goblin";
        this.power = 1;
        this.defense = 2;
        this.health = 8;
        this.maxhealth = 8;
        this.status = "Alive";
        this.respawnTimer = 200;
        this.bounty = [5, 5, 6, 6, 8, 10];
        this.attackRange = 70;
        this.battleMode = false;

    }    
}

export default Goblin;