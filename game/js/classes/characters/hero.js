class Hero {
    constructor() {
        this.name = "Hero";
        this.power = 3;
        this.defense = 1;
        this.health = 15;
        this.maxhealth = 15;
        this.powerExp = Math.round((25 + (this.power)) * (this.power) / 1.13767) * (this.power - 1);
        this.defenseExp = Math.round((25 + (this.defense)) * (this.defense) / 1.13767) * (this.defense - 1);
        this.healthExp = Math.round((25 + (this.health)) * (this.health) / 1.13767) * (this.health - 1);
        this.attackStance = "Aggressive";
        this.nextHealthLevelExp = Math.round(((25 + (this.health + 1)) * (this.health + 1) / 1.13767) * this.health);
        this.nextPowerLevelExp = Math.round(((25 + (this.power + 1)) * (this.power + 1) / 1.13767) * this.power);
        this.nextDefenseLevelExp = Math.round(((25 + (this.defense + 1)) * (this.defense + 1) / 1.13767) * this.defense);
        this.coins = 100;
        this.attackRange = 70;
        this.battleMode = false;
    }
    
}

export default Hero;