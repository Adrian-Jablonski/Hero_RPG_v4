export default class Hero extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.name = "Hero";
        this.power = 2;
        this.defense = 3;
        this.health = 10;
        this.maxhealth = 10;
        this.speed = 1;
        this.powerExp = Math.round((25 + (this.power)) * (this.power) / 1.13767) * (this.power - 1);
        this.defenseExp = Math.round((25 + (this.defense)) * (this.defense) / 1.13767) * (this.defense - 1);
        this.healthExp = Math.round((25 + (this.health)) * (this.health) / 1.13767) * (this.health - 1);
        this.nextHealthLevelExp = Math.round(((25 + (this.health + 1)) * (this.health + 1) / 1.13767) * this.health);
        this.nextPowerLevelExp = Math.round(((25 + (this.power + 1)) * (this.power + 1) / 1.13767) * this.power);
        this.nextDefenseLevelExp = Math.round(((25 + (this.defense + 1)) * (this.defense + 1) / 1.13767) * this.defense);
        this.coins = 100;
        this.attackRange = 50;
        this.battleMode = false;
        this.attackTime = 190;
        this.items = {
            "healingPotion" : 2
        }
        // this.healingPotion = 2;
        this.frozen = false;
        this.healing = false;
        this.specialAttackPerc = .2;
        this.attackStance = "Aggressive";
        this.powerLvAdj = this.power + 3; // With stance bonuses
        this.defenseLvAdj = this.defense - 3;
        this.defenseBenefit = Math.round(this.defenseLvAdj * .2);
        this.defenseTimes = Math.round(this.defenseLvAdj / 4);

    }    
}