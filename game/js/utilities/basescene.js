import {Scene} from 'phaser';
import sceneImports from '../utilities/imports.js'; // Imports all images
// import backgroundImage from '/assets/sprites/background-images/dark_background.png';
// import area100_100 from '/assets/sprites/background-images/area_100_100.png';

// import userInterface from '/assets/sprites/background-images/user_interface.png';
//  // Characters
// import heroImage from '/assets/sprites/characters/hero.png';
// import goblin from '/assets/sprites/characters/goblin.png';
// import deathKnight from '/assets/sprites/characters/deathKnight.png';
// import shadow from '/assets/sprites/characters/shadow.png';
// import wizard from '/assets/sprites/characters/wizard.png';
// import ranger from '/assets/sprites/characters/ranger.png';
// import zombie from '/assets/sprites/characters/zombie.png';
// import dragon from '/assets/sprites/characters/dragon.png';

// Load character objects
import Hero from '../classes/characters/hero.js'; 
import Goblin from '../classes/characters/goblin.js';
import DeathKnight from '../classes/characters/deathKnight.js';
import Shadow from '../classes/characters/shadow.js';
import Wizard from '../classes/characters/wizard.js';
import Ranger from '../classes/characters/ranger.js';
import Zombie from '../classes/characters/zombie.js';
import Dragon from '../classes/characters/dragon.js';

 // Status Bars
// import statusBar100 from '/assets/sprites/Status_Bars/Status_Bar100.png';
// import statusBar0 from '/assets/sprites/Status_Bars/Status_Bar0.png';

// import scrollUp from '/assets/sprites/icons/scroll_up_button.gif';
// import scrollDown from '/assets/sprites/icons/scroll_down_button.gif';

// import radioButton from '/assets/sprites/icons/radiobutton_circle.png';

// import healingPotionPic from '/assets/sprites/icons/healing_potion.png';

// actions
import enemyClicked from '../classes/actions/enemyClicked.js'
import attackStance from '../classes/actions/attackStance.js'

export default class BaseScene extends Scene {
    constructor(key) {
        super({ key });
        this.key = key;
    }

    preload(areaString, area) {
        // Loads background images
        this.load.image('dark-background', sceneImports.backgroundImage);
        // ################################ Changes for each scene
        this.load.image(areaString, area); 
        // ################################
        this.load.image('user-interface', sceneImports.userInterface)

        // Characters
        this.load.image('hero', sceneImports.heroImage, 41, 55);
        this.load.image('goblin', sceneImports.goblin, 32, 32);
        this.load.image('deathKnight', sceneImports.deathKnight);
        this.load.image('shadow', sceneImports.shadow);
        this.load.image('wizard', sceneImports.wizard);
        this.load.image('ranger', sceneImports.ranger);
        this.load.image('zombie', sceneImports.zombie);
        this.load.image('dragon', sceneImports.dragon);

        // Status Bars
        this.load.image('statusBar100', sceneImports.statusBar100);
        this.load.image('statusBar0', sceneImports.statusBar0)

        this.load.image('scrollUp', sceneImports.scrollUp);
        this.load.image('scrollDown', sceneImports.scrollDown);

        this.load.image('radioButton', sceneImports.radioButton);

        this.load.image('healingPotionPic', sceneImports.healingPotionPic);

        // Colors 
        this.neon = "#39FF14"

    }

    update(delta) {
        // this.timer += 1
        // console.log(this.timer)
        //Checks if enemy is within range of attacking
        if (this.attackEnemy == true || (this.enemyFighting.battleMode == true && this.attackEnemy == true)) {
            // Has hero chasing enemy 
            this.mouseClickX = this.enemyFighting.x;
            this.mouseClickY = this.enemyFighting.y;
            // console.log("herox: ", this.hero.x) 
            // console.log(this.goblin.x - this.hero.attackRange);
            if (this.hero.x >= this.enemyFighting.x - (this.hero.attackRange + (this.enemyFighting.width / 2)) && this.hero.x <= this.enemyFighting.x + (this.hero.attackRange + (this.enemyFighting.width / 2)) && this.hero.y >= this.enemyFighting.y - (this.hero.attackRange + (this.enemyFighting.height / 2)) && this.hero.y <= this.enemyFighting.y + (this.hero.attackRange + (this.enemyFighting.height / 2))) { // Sets attack range to include enemies width and height
                this.hero.battleMode = true;
            }
            // checks if hero is within enemies range
            if (this.enemyFighting.x >= this.hero.x - this.enemyFighting.attackRange && this.enemyFighting.x <= this.hero.x + this.enemyFighting.attackRange && this.enemyFighting.y >= this.hero.y - this.enemyFighting.attackRange && this.enemyFighting.y <= this.hero.y + this.enemyFighting.attackRange) {
                this.enemyFighting.battleMode = true;
            }
        }

        // Moves player to mouse click
        if (this.mouseClicked == true && this.mouseClickX <= this.sceneX[1] + 10 && this.mouseClickX >= this.sceneX[0] - 10 && this.mouseClickY < this.sceneY[1] + 10 && this.mouseClickY > this.sceneY[0] - 10) {
            // Prevents hero from standing on enemy during battle
            if (this.attackEnemy == false) {
                var adjX = 0;
                var adjY = 0;
            }
            else {
                var adjX = this.enemyFighting.width / 2;
                var adjY = this.enemyFighting.height / 2;
            }
            if (this.hero.x < this.mouseClickX - adjX) {
                this.hero.x++;
            }
            if (this.hero.x > this.mouseClickX + adjX) {
                this.hero.x--;
            }
            if (this.hero.y < this.mouseClickY - adjY) {
                this.hero.y++;
            }
            if (this.hero.y > this.mouseClickY + adjY) {
                this.hero.y--;
            }
            if (this.hero.x == this.mouseClickX && this.hero.y == this.mouseClickY) {
                this.mouseClicked = false;
            }   
        }
        
        // Enemy movement
        if (this.changeDirTimer <= 0) {
            this.randNumb = Math.floor(Math.random() * 4);
            this.changeDirTimer = 240;
        }

        this.changeDirTimer -= 1;
        // console.log(this.battleMode);

        for (var i = 0; i < this.enemies.length; i ++) {
            if (this.enemies[i].battleMode == false && this.enemies[i].status == "Alive") {
                if (this.randNumb == 0 && this.enemies[i].x < this.enemies[i].walkAreaX[1]) {
                    this.enemies[i].x += this.enemies[i].speed;
                }
                else if (this.randNumb == 1 && this.enemies[i].x > this.enemies[i].walkAreaX[0]) {
                    this.enemies[i].x -= this.enemies[i].speed;
                }
                else if (this.randNumb == 2 && this.enemies[i].y < this.enemies[i].walkAreaY[1]) {
                    this.enemies[i].y += this.enemies[i].speed;
                }
                else if (this.randNumb == 3 && this.enemies[i].y > this.enemies[i].walkAreaY[0]) {
                    this.enemies[i].y -= this.enemies[i].speed;
                }
            }
        }

        // Enemy follows hero when hero runs away
        if (this.enemyFighting.battleMode == true && this.enemyFighting.status == "Alive") {
            if (this.enemyFighting.x + (this.enemyFighting.width + 10) < this.hero.x) {
                this.enemyFighting.x += this.enemyFighting.speed;
            }
            else if (this.enemyFighting.x - (this.enemyFighting.width + 10) > this.hero.x) {
                this.enemyFighting.x -= this.enemyFighting.speed;
            }
            if (this.enemyFighting.y + (this.enemyFighting.height + 10) < this.hero.y) {
                this.enemyFighting.y += this.enemyFighting.speed;
            }
            else if (this.enemyFighting.y - (this.enemyFighting.height + 10) > this.hero.y) {
                this.enemyFighting.y -= this.enemyFighting.speed;
            }
            // disables goblin battle mode once hero runs away too far
            if (this.hero.battleMode == false) {
                if (Math.abs(this.enemyFighting.x - this.hero.x) > this.enemyFighting.attackRange + 20) {
                    this.enemyFighting.battleMode = false;
                    this.enemyFighting = "";
                }
                else if (Math.abs(this.enemyFighting.y - this.hero.y) > this.enemyFighting.attackRange + 20) {
                    this.enemyFighting.battleMode = false;
                    this.enemyFighting = "";
                }
                else if (this.enemyFighting.x < this.enemyFighting.walkAreaX[0] || this. enemyFighting.x > this.enemyFighting.walkAreaX[1]) {
                    this.enemyFighting.battleMode = false;
                    this.enemyFighting = "";
                }
                else if (this.enemyFighting.y < this.enemyFighting.walkAreaY[0] || this.enemyFighting.y > this.enemyFighting.walkAreaY[1]) {
                    this.enemyFighting.battleMode = false;
                    this.enemyFighting = "";
                }
            }
            
        }

        // Updates when hero and enemy leave battle mode
        for (var i = 0; i < this.enemies.length; i ++) { 
            if (this.hero.battleMode == false && this.enemies[i].battleMode == false) {
                // hides status bars
                this.statusBarHero100.y = -40;
                this.statusBarEnemy100.y= -40;
                this.statusBarHero0.y = -40;
                this.statusBarEnemy0.y = -40;
                // Clears damage text
                this.heroDamageText.y = -50;
                this.enemyDamageText.y = -50;
                this.enemyAttackPower = "";
                this.attackPower = "";
    
                this.attackTimer = 200;
            }
        }
        
            if (this.hero.battleMode == true || this.enemyFighting.battleMode == true) {
                this.attackTimer -= 1;

                // Changes status bar when taking damage
                this.statusBarHero0.x = this.hero.x;
                this.statusBarHero0.y = this.hero.y - 30;
                this.statusBarHero100.x = this.hero.x - (((this.hero.maxhealth - this.hero.health ) * (23 / this.hero.maxhealth))/2); // Formula prevents the green bar from centering as it shrinks
                this.statusBarHero100.y = this.hero.y - 30;
                this.statusBarHero100.displayWidth =  (this.hero.health / this.hero.maxhealth) * 23;

                this.statusBarEnemy0.x = this.enemyFighting.x;
                this.statusBarEnemy0.y = this.enemyFighting.y - 30;
                this.statusBarEnemy100.x = this.enemyFighting.x - (((this.enemyFighting.maxhealth - this.enemyFighting.health ) * (23 / this.enemyFighting.maxhealth))/2);
                this.statusBarEnemy100.y = this.enemyFighting.y - 30;
                this.statusBarEnemy100.displayWidth =  (this.enemyFighting.health / this.enemyFighting.maxhealth) * 23;

                if (this.attackTimer == this.hero.attackTime && this.hero.battleMode == true) {
                
                    if (this.hero.frozen == false) {
                        var count = 0;
                        // Hero special attack
                        var specialAttackNumb = Math.floor(Math.random() * (1/this.hero.specialAttackPerc));
                        // console.log(specialAttackNumb);
                        this.attackPower = Math.floor(Math.random() * (this.hero.powerLvAdj + 1));
                        console.log(`${count}: Power ${this.attackPower} - Defense Benefit ${Math.max(this.hero.powerLvAdj - this.enemyFighting.defenseBenefit, 1)} -  Defense Times ${this.enemyFighting.defenseTimes}`)
                        while (this.attackPower > Math.max(this.hero.powerLvAdj - this.enemyFighting.defenseBenefit, 1) && count < this.enemyFighting.defenseTimes){
                            this.attackPower = Math.floor(Math.random() * (this.hero.powerLvAdj + 1));
                            this.attackPower = Math.min(this.attackPower, this.enemyFighting.health);
                            console.log(this.enemyFighting.health)
                            console.log(`${count}: Power ${this.attackPower} - Defense Benefit ${Math.max(this.hero.powerLvAdj - this.enemyFighting.defenseBenefit, 1)} -  Defense Times ${this.enemyFighting.defenseTimes}`)
                            count += 1;
                            
                        }
                        this.attackPower = Math.min(this.attackPower, this.enemyFighting.health);
                            
                        if (specialAttackNumb == 0) {
                            this.attackPower = this.attackPower = Math.min(this.attackPower * 2, this.enemyFighting.health);
                            this.historyLineTextList.unshift(`SPECIAL ATTACK: Hero does ${this.attackPower} damage to ${this.enemyFighting.name}`);
                        }
                        else {
                            this.historyLineTextList.unshift(`Hero does ${this.attackPower} damage to ${this.enemyFighting.name}`);
                            
                        }

                        // console.log("Hero attacks goblin :", this.attackPower);
                        this.enemyFighting.health -= this.attackPower;
                        // Sets attack number color
                        if (this.attackPower == 0) {
                            this.damageColor = "blue"
                        }
                        else {
                            this.damageColor = "red"
                        }
                        this.historyLineTextColor.unshift(this.neon);

                        // Experience points
                        if (this.hero.attackStance == "Aggressive") {
                            this.hero.powerExp += Math.round(this.attackPower * 3.7);
                            this.hero.healthExp += Math.round(this.attackPower * 1.5);
                            this.hero.powerStanceBonus = 3;
                        }
                        else if (this.hero.attackStance == "Defensive") {
                            this.hero.defenseExp += Math.round(this.attackPower * 3.7);
                            this.hero.healthExp += Math.round(this.attackPower * 1.5);
                        }
                        else if (this.hero.attackStance == "Normal") {
                            this.hero.powerExp += Math.round(this.attackPower * 1.5);
                            this.hero.defenseExp += Math.round(this.attackPower * 1.5);
                            this.hero.healthExp += Math.round(this.attackPower * 2.0);
                        }
                    }
                    if (this.hero.frozen == true) {
                        this.hero.frozen = false;
                    }
                }
                if (this.attackTimer == this.enemyFighting.attackTime && this.enemyFighting.battleMode == true) {
                    var count = 0;
                    // console.log(`${count}: Power ${this.enemyAttackPower} - Defense Benefit ${Math.max(this.goblin.power - this.hero.defenseBenefit, 1)} -  Defense Times ${this.hero.defenseTimes}`)
                    this.enemyAttackPower = Math.floor(Math.random() * (this.enemyFighting.power + 1));
                    while (this.enemyAttackPower > Math.max(this.enemyFighting.power - this.hero.defenseBenefit, 1) && count < this.hero.defenseTimes){
                        this.enemyAttackPower = Math.floor(Math.random() * (this.enemyFighting.power + 1));
                        this.enemyAttackPower = Math.min(this.enemyAttackPower, this.hero.health);
                        // console.log(`${count}: Power ${this.enemyAttackPower} - Defense Benefit ${Math.max(this.goblin.power - this.hero.defenseBenefit, 1)} -  Defense Times ${this.hero.defenseTimes}`)
                        count += 1;
                    }
                    
                    this.enemyAttackPower = Math.min(this.enemyAttackPower, this.hero.health);
                    this.hero.health -= this.enemyAttackPower;
                    // Sets attack number color
                    if (this.enemyAttackPower == 0) {
                        this.enemyDamageColor = "blue"
                    }
                    else {
                        this.enemyDamageColor = "red"
                    }
                    this.historyLineTextList.unshift(`${this.enemyFighting.name} does ${this.enemyAttackPower} damage to Hero`);
                    this.historyLineTextColor.unshift("Red");
                }

                // Shows damage above characters head
                this.heroDamageText.x = this.hero.x - 5;
                this.heroDamageText.y = this.hero.y - 55;
                this.heroDamageText.setText(this.enemyAttackPower).setStyle({font:"18px Ariel Bold", color: this.enemyDamageColor});

                this.enemyDamageText.x = this.enemyFighting.x - 5;
                this.enemyDamageText.y = this.enemyFighting.y - 55;
                this.enemyDamageText.setText(this.attackPower).setStyle({font:"18px Ariel Bold", color: this.damageColor});;

                if (this.attackTimer <= 0) {
                    this.attackTimer =  200;
                }
            }

        // Character death
        if ((this.enemyFighting.health <= 0 || this.hero.health <= 0) && this.enemyFighting.battleMode == true) {
            if (this.enemyFighting.health <= 0) {
                if (this.enemyFighting.status == "Alive") { // Prevents loop that would happen until enemy respawn
                    var enemyBounty = this.enemyFighting.bounty[Math.floor(Math.random() * this.enemyFighting.bounty.length)];
                    this.hero.coins += enemyBounty;
                    this.historyLineTextList.unshift(`${this.enemyFighting.name} dead. You received ${enemyBounty} coins`);
                    this.historyLineTextColor.unshift("Yellow");
                    this.mouseClicked = false;
                    this.deadEnemyList.push(this.enemyFighting);
                }
                this.enemyFighting.status = "Dead";
                this.enemyFighting.y = -50;

                // Bounty drop
            }
            else if (this.hero.health <= 0) {
                this.hero.x = 300;
                this.hero.y = 300;
                this.hero.health = this.hero.maxhealth;
                this.mouseClickX = 300;
                this.mouseClickY = 300;
                this.mouseClicked = false;
            }
            this.hero.battleMode = false;
            this.enemyFighting.battleMode = false;
            this.attackEnemy = false;
            
        }

        // Enemy respawn
        try {
            if (this.deadEnemyList.length > 0) {
                for (var i = 0; i < this.deadEnemyList.length; i++) {
                    this.deadEnemyList[i].respawnTimer -= 1;
                    if (this.deadEnemyList[i].respawnTimer <= 0) {
                        this.deadEnemyList[i].status = "Alive";
                        this.deadEnemyList[i].x = Math.floor(Math.random()*((this.deadEnemyList[i].walkAreaX[1] - 10)-(this.deadEnemyList[i].walkAreaX[0] + 10)+1)+(this.deadEnemyList[i].walkAreaX[0] + 10));
                        this.deadEnemyList[i].y = Math.floor(Math.random()*((this.deadEnemyList[i].walkAreaY[1] - 10)-(this.deadEnemyList[i].walkAreaY[0] + 10)+1)+(this.deadEnemyList[i].walkAreaY[0] + 10));;
                        this.deadEnemyList[i].respawnTimer = this.deadEnemyList[i].respawnTime;
                        this.deadEnemyList[i].health = this.deadEnemyList[i].maxhealth;
                        var index = this.deadEnemyList.indexOf(this.deadEnemyList[i]);
                        this.deadEnemyList.splice(index, 1);
                        
                    }
                }
                // if (this.enemyFighting.status == "Dead") {
                //     this.enemyFighting.respawnTimer -= 1;
                    
                // }
            }
        }
        catch(err) {
            console.log(err);
        }

        
        
        
        // Leveling up
        if (this.hero.powerExp >= this.hero.nextPowerLevelExp) {
            this.hero.power += 1;
            this.hero.nextPowerLevelExp = Math.round(((25 + (this.hero.power + 1)) * (this.hero.power + 1) / 1.13767) * this.hero.power);
            this.powerLvAdj += 1;
        }
        if (this.hero.defenseExp >= this.hero.nextDefenseLevelExp) {
            this.hero.defense += 1;
            this.hero.nextDefenseLevelExp = Math.round(((25 + (this.hero.defense + 1)) * (this.hero.defense + 1) / 1.13767) * this.hero.defense);
            this.hero.defenseBenefit = Math.round(this.hero.defense * .2);
            this.hero.defenseTimes = Math.round(this.hero.defense / 4);
            this.defenseLvAdj += 1;
        }
        if (this.hero.healthExp >= this.hero.nextHealthLevelExp) {
            this.hero.health += 1;
            this.hero.nextHealthLevelExp = Math.round(((25 + (this.hero.health + 1)) * (this.hero.health + 1) / 1.13767) * this.hero.health);
        }


        // Mouse over enemy
        for (var i = 0; i < this.enemies.length; i ++) {
            this.enemies[i].on('pointerover', function(pointer) {
                // this.text.setText(this.attack);
                this.text.setText(`Attack ${this.name}. (Power: ${this.power} Defense: ${this.defense} Health: ${this.health})`);
            })
            this.enemies[i].on('pointerout', function(pointer) {
                this.text.setText('');
            })
        }
        this.healingPotionPic.on('pointerover', function(pointer) {
            this.text.setText(`Click to drink healing potion`);
        })
        this.healingPotionPic.on('pointerout', function(pointer) {
            this.text.setText('')
        })

        // Updates hero levels on screen

        this.heroPowerLvText.setText(this.hero.power);
        this.heroDefenseLvText.setText(this.hero.defense);
        this.heroHealthLvText.setText(`${this.hero.health} / ${this.hero.maxhealth}`);

        this.heroPowerExpText.setText(`Current Exp: ${this.hero.powerExp}        Next Level: ${this.hero.nextPowerLevelExp}`);
        this.heroDefenseExpText.setText(`Current Exp: ${this.hero.defenseExp}        Next Level: ${this.hero.nextDefenseLevelExp}`);
        this.heroHealthExpText.setText(`Current Exp: ${this.hero.healthExp}        Next Level: ${this.hero.nextHealthLevelExp}`);

        // Updates history log

        this.historyTextLine1.setText(this.historyLineTextList[this.historyTextScroll + 5]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 5]});
        this.historyTextLine2.setText(this.historyLineTextList[this.historyTextScroll + 4]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 4]});
        this.historyTextLine3.setText(this.historyLineTextList[this.historyTextScroll + 3]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 3]});
        this.historyTextLine4.setText(this.historyLineTextList[this.historyTextScroll + 2]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 2]});
        this.historyTextLine5.setText(this.historyLineTextList[this.historyTextScroll + 1]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll + 1]});
        this.historyTextLine6.setText(this.historyLineTextList[this.historyTextScroll]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[this.historyTextScroll]});

        this.historyLogCount.setText(`${this.historyLineTextList.length - this.historyTextScroll} / ${this.historyLineTextList.length}`);

        this.coinText.setText(`${this.hero.coins}`);

        this.healingPotionText.setText(`${this.hero.healingPotion}`)
        
    }
}