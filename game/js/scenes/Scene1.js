/*
	Run by using http-server -c-1 /Users/adrianj/Google_Drive/Computer_programming/ClassWork/Hero_RPG_V4_JS/game
	Then go to http://localhost:8080 
*/

import backgroundImage from '/assets/sprites/background-images/dark_background.png';
import background from '/assets/sprites/background-images/area_100_100.png';

import userInterface from '/assets/sprites/background-images/user_interface.png';
 // Characters
import heroImage from '/assets/sprites/characters/hero.png';
import goblin from '/assets/sprites/characters/goblin.png';

 // Status Bars
import statusBar100 from '/assets/sprites/Status_Bars/Status_Bar100.png';
import statusBar0 from '/assets/sprites/Status_Bars/Status_Bar0.png';

import scrollUp from '/assets/sprites/icons/scroll_up_button.gif';
import scrollDown from '/assets/sprites/icons/scroll_down_button.gif';

import radioButton from '/assets/sprites/icons/radiobutton_circle.png';


import Hero from '../classes/characters/hero.js'        

class Scene1 extends Phaser.Scene {
    constructor() {
        super({key:"Scene1"});
    }
    
    preload() {
        // Loads background images
        this.load.image('dark-background', backgroundImage);
        this.load.image('background',background);
        this.load.image('user-interface', userInterface)

        // Characters
        this.load.image('hero', heroImage, 41, 55);
        this.load.image('goblin', goblin, 32, 32);

        // Status Bars
        this.load.image('statusBar100', statusBar100);
        this.load.image('statusBar0', statusBar0)

        this.load.image('scrollUp', scrollUp);
        this.load.image('scrollDown', scrollDown);

        this.load.image('radioButton', radioButton);

        // Colors 
        this.neon = "#39FF14"

    }
    
    create() {
        // Min and max x and y values for scene
        this.sceneX = [40, 480];
        this.sceneY = [40, 460];

        this.mouseClicked = false;
        this.battleMode = false;
        this.attackTimer = 200;

        // Renders images and sprites to screen
        this.image = this.add.image(850 / 2, 700 / 2, 'dark-background');
	    this.image1 = this.add.image(512 / 2, (480 / 2) + 30, 'background');
        this.image2 = this.add.image(325 / 2 + 520, 619 / 2, 'user-interface');
        this.scrollUp = this.add.image(465, 570, 'scrollUp');
        this.scrollDown = this.add.image(465, 610, 'scrollDown');
        this.radioButton = this.add.image(552, 530, 'radioButton');

        // this.hero = this.add.sprite(300, 300, 'hero');

        // // Hero character
        // this.hero.name = "Hero";
        // this.hero.power = 3;
        // this.hero.defense = 3;
        // this.hero.health = 15;
        // this.hero.maxhealth = 15;
        // this.hero.powerExp = 0;
        // this.hero.defenseExp = 0;
        // this.hero.healthExp = 0;
        // this.hero.attackStance = "Aggressive";

        // http://www.html5gamedevs.com/topic/32411-extending-phasergameobjectssprite-es6/
        this.hero = new Hero({
            scene: this,
            x: 300,
            y: 300,
            key: 'hero',
        })


        //create hero and enemy health bar off screen
        this.statusBarHero0 = this.add.image(-30, - 40, 'statusBar0');
        this.statusBarEnemy0 = this.add.image(-30, - 80, 'statusBar0');

        this.statusBarHero100 = this.add.image(-30, - 40, 'statusBar100');
        this.statusBarEnemy100 = this.add.image(-30, - 80, 'statusBar100');


        // this.healthbar.cropEnabled = true;

        // shows hero levels on screen
        this.heroPowerLvText = this.add.text(650, 112, this.hero.power, {font:"20px Ariel", color:this.neon});

        this.heroDefenseLvText = this.add.text(650, 162, this.hero.defense, {font:"20px Ariel", color:"Blue"});

        this.heroHealthLvText = this.add.text(650, 222, this.hero.health, {font:"20px Ariel", color:"Red"});

        // Shows current and next lv hero Exp on screen
        this.heroPowerExpText = this.add.text(545, 135, `Current Exp: ${this.hero.powerExp}        Next Level: ${this.hero.nextPowerLevelExp}`, {font:"14px Ariel", color:this.neon});
        
        this.heroDefenseExpText = this.add.text(545, 190, `Current Exp: ${this.hero.defenseExp}        Next Level: ${this.hero.nextDefenseLevelExp}`, {font:"14px Ariel", color:"Blue"});

        this.heroHealthExpText = this.add.text(545, 245, `Current Exp: ${this.hero.healthExp}        Next Level: ${this.hero.nextHealthLevelExp}`, {font:"14px Ariel", color:"Red"});

        // Damage text
        this.heroDamageText = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"});
        this.enemyDamageText = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"});

        // History Log
        this.historyTextHeading = this.add.text(20, 513, "History:", {font:"20px Ariel"});
        this.historyTextLine = this.add.text(10, 528, "-----------------------------------------------")
        this.historyTextLine1 = this.add.text(30, 545, "", {font:"16px 'Ariel Bold'"});
        this.historyTextLine2 = this.add.text(30, 570, "", {font:"16px Ariel"});
        this.historyTextLine3 = this.add.text(30, 595, "", {font:"16px Ariel"});
        this.historyTextLine4 = this.add.text(30, 620, "", {font:"16px Ariel"});
        this.historyTextLine5 = this.add.text(30, 645, "", {font:"16px Ariel"});
        this.historyTextLine6 = this.add.text(30, 670, "", {font:"16px Ariel"});

        this.historyLogCount = this.add.text(440, 635, "0 / 0", {font:"12px Ariel"});


        this.historyLineTextList = [];
        this.historyLineTextColor = [];
        this.historyTextScroll = 0;

        this.goblin = this.add.sprite(100, 300, 'goblin').setInteractive(); // set interactive allows pointerover event

        this.goblin.text = this.add.text(20, 0, "", {font:"24px Ariel", color:"Red"});
        this.goblin.name = "Goblin";
        this.goblin.power = 1;
        this.goblin.defense = 2;
        this.goblin.health = 8;
        this.goblin.maxhealth = 8;
        this.goblin.status = "Alive";
        this.goblin.respawnTimer = 200;
        
        // this.hero.anchor.setTo(0.5, 0.5);

        // // Sets scene border so player does not move off screen (Need to find a way that this works in Phaser3)
        // this.hero.setBounds(0, 0, 800, 600);

        // Moves player after releasing right keyboard button
        this.input.keyboard.on('keyup_RIGHT', function(event) {
            this.hero.x += 10;
        },this);

        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        
        // Handles click events
        this.input.on('pointerdown', function(event) {
            // Moves player to click location
            this.mouseClickX = event.x;
            this.mouseClickY = event.y;
            this.mouseClicked = true;
            // stores enemy position on click
            this.goblin.clickPosition = [this.goblin.x, this.goblin.y];

            // checks if enemy was clicked on
            if (this.mouseClickX >= this.goblin.x - 15 && this.mouseClickX <= this.goblin.x + 15 && this.mouseClickY >= this.goblin.y - 15 && this.mouseClickY <= this.goblin.y + 15 ) {
                this.battleMode = true;
            }
            else {
                this.battleMode = false;
            }
            // console.log("Battle mode :", this.battleMode );

            console.log("x: ", event.x, " y: ", event.y);
            //console.log("player position :", this.hero.x, this.hero.y);
            // console.log("enemy position :", this.goblin.clickPosition);

            if (this.mouseClickX >= 446 && this.mouseClickX <=485 && this.mouseClickY >= 558 && this.mouseClickY <= 590) {
                if (this.historyLineTextList.length > 6 && this.historyTextScroll < this.historyLineTextList.length - 5) {
                    this.historyTextScroll += 1
                }
            }

            if (this.mouseClickX >= 446 && this.mouseClickX <=485 && this.mouseClickY >= 598 && this.mouseClickY <= 630) {
                if (this.historyLineTextList.length > 6 && this.historyTextScroll > 0) {
                    this.historyTextScroll -= 1
                }
            }

            // Attack stance button
            if (this.mouseClickX >= 540 && this.mouseClickX <=565 && this.mouseClickY >= 522 && this.mouseClickY <= 545) {
                this.radioButton.x = 552;
                this.radioButton.y = 530;
                this.hero.attackStance = "Aggressive";
            }
            else if (this.mouseClickX >= 682 && this.mouseClickX <= 707 && this.mouseClickY >= 522 && this.mouseClickY <= 545) {
                this.radioButton.x = 692;
                this.radioButton.y = 530;
                this.hero.attackStance = "Defensive";
            }
            else if (this.mouseClickX >= 540 && this.mouseClickX <=565 && this.mouseClickY >= 564 && this.mouseClickY <= 591) {
                this.radioButton.x = 552;
                this.radioButton.y = 572;
                this.hero.attackStance = "Normal";
            }
            console.log(this.hero.attackStance);


        },this);

        // Changes scenes
        this.input.keyboard.on('keyup', function(e) {
            if (e.key == "2") {
                this.scene.start("Scene2")
            }
        },this);

        this.timer = 0;
        this.changeDirTimer = 120;
        this.randNumb = Math.floor(Math.random() * 4);
    }

    update(delta) {
        // this.timer += 1
        // console.log(this.timer)
        // Moves player left while holding left key
        if(this.key_LEFT.isDown) {
            this.hero.x--;
            main();
        }

        // Moves player to mouse click
        if (this.mouseClicked == true && this.mouseClickX < this.sceneX[1] && this.mouseClickX > this.sceneX[0] && this.mouseClickY < this.sceneY[1] && this.mouseClickY > this.sceneY[0]) {
            // Prevents hero from standing on enemy during battle
            if (this.battleMode == false) {
                var adjX = 0;
                var adjY = 0;
            }
            else {
                var adjX = 32;
                var adjY = 32;
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

        if (this.battleMode == false && this.goblin.status == "Alive") {
            if (this.randNumb == 0 && this.goblin.x < this.sceneX[1]) {
                this.goblin.x += .5;
            }
            else if (this.randNumb == 1 && this.goblin.x > this.sceneX[0]) {
                this.goblin.x -= .5;
            }
            else if (this.randNumb == 2 && this.goblin.y < this.sceneY[1]) {
                this.goblin.y += .5;
            }
            else if (this.randNumb == 3 && this.goblin.y > this.sceneY[0]) {
                this.goblin.y -= .5;
            }
        }

        if (this.battleMode == false) {
            // hides status bars
            this.statusBarHero100.y = -40;
            this.statusBarEnemy100.y= -40;
            this.statusBarHero0.y = -40;
            this.statusBarEnemy0.y = -40;
            this.heroDamageText.y = -50;
            this.enemyDamageText.y = -50;
        }

        if (this.battleMode == true) {
            this.attackTimer -= 1;

            // Changes status bar when taking damage
            this.statusBarHero0.x = this.hero.x;
            this.statusBarHero0.y = this.hero.y - 30;
            this.statusBarHero100.x = this.hero.x - (((this.hero.maxhealth - this.hero.health ) * (23 / this.hero.maxhealth))/2); // Formula prevents the green bar from centering as it shrinks
            this.statusBarHero100.y = this.hero.y - 30;
            this.statusBarHero100.displayWidth =  (this.hero.health / this.hero.maxhealth) * 23;

            this.statusBarEnemy0.x = this.goblin.x;
            this.statusBarEnemy0.y = this.goblin.y - 30;
            this.statusBarEnemy100.x = this.goblin.x - (((this.goblin.maxhealth - this.goblin.health ) * (23 / this.goblin.maxhealth))/2);
            this.statusBarEnemy100.y = this.goblin.y - 30;
            this.statusBarEnemy100.displayWidth =  (this.goblin.health / this.goblin.maxhealth) * 23;

            if (this.attackTimer == 190) {
                this.attackPower = Math.floor(Math.random() * (this.hero.power + 1));
                this.attackPower = Math.min(this.attackPower, this.goblin.health);
                // console.log("Hero attacks goblin :", this.attackPower);
                this.goblin.health -= this.attackPower;
                // Sets attack number color
                if (this.attackPower == 0) {
                    this.damageColor = "blue"
                }
                else {
                    this.damageColor = "red"
                }
                this.historyLineTextList.unshift(`Hero does ${this.attackPower} damage to ${this.goblin.name}`);
                this.historyLineTextColor.unshift(this.neon);

                // Experience points
                if (this.hero.attackStance == "Aggressive") {
                    this.hero.powerExp += Math.round(this.attackPower * 3.7);
                    this.hero.healthExp += Math.round(this.attackPower * 1.5);
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
            if (this.attackTimer == 90) {
                this.enemyAttackPower = Math.floor(Math.random() * (this.goblin.power + 1));
                this.enemyAttackPower = Math.min(this.enemyAttackPower, this.hero.health);
                this.hero.health -= this.enemyAttackPower;
                // Sets attack number color
                if (this.enemyAttackPower == 0) {
                    this.enemyDamageColor = "blue"
                }
                else {
                    this.enemyDamageColor = "red"
                }
                this.historyLineTextList.unshift(`${this.goblin.name} does ${this.enemyAttackPower} damage to Hero`);
                this.historyLineTextColor.unshift("Red");
            }

            // Shows damage above characters head
            this.heroDamageText.x = this.hero.x - 5;
            this.heroDamageText.y = this.hero.y - 55;
            this.heroDamageText.setText(this.enemyAttackPower).setStyle({font:"18px Ariel Bold", color: this.enemyDamageColor});

            this.enemyDamageText.x = this.goblin.x - 5;
            this.enemyDamageText.y = this.goblin.y - 55;
            this.enemyDamageText.setText(this.attackPower).setStyle({font:"18px Ariel Bold", color: this.damageColor});;

            if (this.attackTimer <= 0) {
                this.attackTimer =  200;
            }
        }

        // Character death
        if (this.goblin.health <= 0 || this.hero.health <= 0) {
            if (this.goblin.health <= 0) {
                this.goblin.status = "Dead";
                this.goblin.y = -50;
            }
            else if (this.hero.health <= 0) {
                this.hero.x = 300;
                this.hero.y = 300;
                this.hero.health = this.hero.maxhealth
            }
            this.battleMode = false;
        }

        // Enemy respawn
        if (this.goblin.status == "Dead") {
            this.goblin.respawnTimer -= 1;
            if (this.goblin.respawnTimer <= 0) {
                this.goblin.status = "Alive";
                this.goblin.x = 100;
                this.goblin.y = 300;
                this.goblin.respawnTimer = 200;
                this.goblin.health = this.goblin.maxhealth;
            }
        }
        
        // Leveling up
        if (this.hero.powerExp >= this.hero.nextPowerLevelExp) {
            this.hero.power += 1;
            this.hero.nextPowerLevelExp = Math.round(((25 + (this.hero.power + 1)) * (this.hero.power + 1) / 1.13767) * this.hero.power);
        }
        if (this.hero.defenseExp >= this.hero.nextDefenseLevelExp) {
            this.hero.defense += 1;
            this.hero.nextDefenseLevelExp = Math.round(((25 + (this.hero.defense + 1)) * (this.hero.defense + 1) / 1.13767) * this.hero.defense);
            
        }
        if (this.hero.healthExp >= this.hero.nextHealthLevelExp) {
            this.hero.health += 1;
            this.hero.nextHealthLevelExp = Math.round(((25 + (this.hero.health + 1)) * (this.hero.health + 1) / 1.13767) * this.hero.health);
        }


        // Mouse over enemy
        
        this.goblin.on('pointerover', function(pointer) {
            // this.text.setText(this.attack);
            this.text.setText(`Attack ${this.name}. (Power: ${this.power} Defense: ${this.defense} Health: ${this.health})`);
        })
        this.goblin.on('pointerout', function(pointer) {
            this.text.setText("");
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

        this.historyLogCount.setText(`${this.historyLineTextList.length - this.historyTextScroll} / ${this.historyLineTextList.length}`)
        
    }
}

export default Scene1;