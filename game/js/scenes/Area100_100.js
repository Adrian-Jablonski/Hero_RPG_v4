import BaseScene from '/js/utilities/basescene.js';
import sceneImports from '../utilities/imports.js'; // Imports all images

import area100_100 from '/assets/sprites/background-images/area_100_100.png';

// Load character objects
import Hero from '../classes/characters/hero.js'; 
import Goblin from '../classes/characters/goblin.js';
import DeathKnight from '../classes/characters/deathKnight.js';
import Shadow from '../classes/characters/shadow.js';
import Wizard from '../classes/characters/wizard.js';
import Ranger from '../classes/characters/ranger.js';
import Zombie from '../classes/characters/zombie.js';
import Dragon from '../classes/characters/dragon.js';

// actions
import enemyClicked from '../classes/actions/enemyClicked.js'
import attackStance from '../classes/actions/attackStance.js'

export default class Area100_100 extends BaseScene {
    constructor() {
        super("Area100_100");
    }
    
    preload() {
        super.preload('area100_100', area100_100)
    }
    
    create() {
        // Min and max x and y values for scene
        this.sceneX = [40, 480];
        this.sceneY = [40, 460];
        this.gameScreen = 515   // Width and height of game screen

        this.mouseClicked = false;
        // this.battleMode = false;
        this.attackTimer = 200;
        this.enemyFighting = "";
        this.deadEnemyList = [];

        // Renders images and sprites to screen
        this.background1 = this.add.image(850 / 2, 700 / 2, 'dark-background');
	    this.areaBackground = this.add.image(512 / 2, (480 / 2) + 30, 'area100_100');
        this.ui = this.add.image(325 / 2 + 520, 619 / 2, 'user-interface');
        this.scrollUp = this.add.image(465, 570, 'scrollUp');
        this.scrollDown = this.add.image(465, 610, 'scrollDown');
        this.radioButton = this.add.image(552, 530, 'radioButton');
        this.healingPotionPic = this.add.image(547, 325, 'healingPotionPic').setInteractive();

        // http://www.html5gamedevs.com/topic/32411-extending-phasergameobjectssprite-es6/

        // Creates characters 
        this.hero = new Hero({
            key: 'hero',
            scene: this,
            x: 100,
            y: 200,
        });

        this.goblin = new Goblin({
            key: 'goblin',
            scene: this,
            walkAreaX : [100, 200],
            walkAreaY : [100, 300],
            x: 150,
            y: 150,
        }).setInteractive(); // set interactive allows pointerover event

        this.shadow = new Shadow({
            key: 'shadow',
            scene: this,
            walkAreaX : [100, 200],
            walkAreaY : [300, 400],
            x: 150,
            y: 350,
        }).setInteractive(); // set interactive allows pointerover event

        this.deathKnight = new DeathKnight({
            key: 'deathKnight',
            scene: this,
            walkAreaX : [300, 400],
            walkAreaY : [200, 400],
            x: 350,
            y: 250,
        }).setInteractive(); // set interactive allows pointerover event

        this.wizard = new Wizard({
            key: 'wizard',
            scene: this,
            walkAreaX : [300, 400],
            walkAreaY : [50, 170],
            x: 350,
            y: 100,
        }).setInteractive();

        this.enemies = [this.goblin, this.deathKnight, this.wizard, this.shadow];
        // this.enemies = [this.goblin];

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

        // Inventory
        this.healingPotionText = this.add.text(705, 317, `${this.hero.healingPotion}`, {font:"20px Ariel", color:"Red"})

        // Damage text
        this.heroDamageText = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"});
        this.enemyDamageText = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"});

        // History Log
        this.historyTextHeading = this.add.text(20, 513, "History:", {font:"20px Ariel"});
        this.historyTextLine = this.add.text(10, 528, "-----------------------------------------------")
        this.historyTextLine1 = this.add.text(20, 545, "", {font:"14px 'Ariel Bold'"});
        this.historyTextLine2 = this.add.text(20, 570, "", {font:"14px Ariel"});
        this.historyTextLine3 = this.add.text(20, 595, "", {font:"14px Ariel"});
        this.historyTextLine4 = this.add.text(20, 620, "", {font:"14px Ariel"});
        this.historyTextLine5 = this.add.text(20, 645, "", {font:"14px Ariel"});
        this.historyTextLine6 = this.add.text(20, 670, "", {font:"14px Ariel"});

        this.historyLogCount = this.add.text(440, 635, "0 / 0", {font:"12px Ariel"});

        this.coinText = this.add.text(705, 578, `${this.hero.coins}`, {color:"Yellow"})

        this.historyLineTextList = [];
        this.historyLineTextColor = [];
        this.historyTextScroll = 0;

        for (var i = 0; i < this.enemies.length; i ++) {
            this.enemies[i].text = this.add.text(20, 0, "", {font:"24px Ariel", color:"Red"}); // Hover text
        }
        this.healingPotionPic.text = this.add.text(20, 0, "", {font:"24px Ariel", color:"Red"});

        // // Sets scene border so player does not move off screen (Need to find a way that this works in Phaser3)
        // this.hero.setBounds(0, 0, 800, 600);

        // Moves player after releasing right keyboard button
        this.input.keyboard.on('keyup_RIGHT', function(event) {
            this.hero.x += 10;
        },this);

        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        
        // Handles click events
        
        this.input.on('pointerdown', function(event) {

            for (var i = 0; i < this.enemies.length; i ++) {
                this.enemies[i].clickPosition = [this.enemies[i].x, this.enemies[i].y];
            }

            // Moves player to click location
            console.log(this.attackTimer);
            this.mouseClickX = event.x;
            this.mouseClickY = event.y;
            this.mouseClicked = true;
            // stores enemy position on click
            // this.goblin.clickPosition = [this.goblin.x, this.goblin.y];

            // checks if enemy was clicked on
            for (var i = 0; i < this.enemies.length; i ++) {
                if (enemyClicked(this.mouseClickX, this.mouseClickY, this.enemies[i], this.gameScreen) == true) {
                    this.attackEnemy = true;
                    this.enemyFighting = this.enemies[i];
                    console.log(this.enemyFighting);
                    break; // breaks out of loop so that else if does not run and prevent attacking the enemy that was clicked on
                }
                else if (enemyClicked(this.mouseClickX, this.mouseClickY, this.enemies[i], this.gameScreen) == false){
                    this.attackEnemy = false;
                    this.hero.battleMode = false;
                }
            }
            // if (enemyClicked(this.mouseClickX, this.mouseClickY, this.goblin, this.gameScreen) == true) {
            //     this.attackEnemy = true;
            // }
            // else if (enemyClicked(this.mouseClickX, this.mouseClickY, this.goblin, this.gameScreen) == false){
            //     this.attackEnemy = false;
            //     this.hero.battleMode = false;
            // }

            console.log("x: ", event.x, " y: ", event.y);
            //console.log("player position :", this.hero.x, this.hero.y);
            // console.log("enemy position :", this.goblin.clickPosition);

            // Controls history text buttons
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
            if (attackStance(this.mouseClickX, this.mouseClickY) == "Aggressive") {
                this.radioButton.x = 552;
                this.radioButton.y = 530;
                this.hero.attackStance = "Aggressive";
                this.hero.powerLvAdj = this.hero.power + 3;
                this.hero.defenseLvAdj = this.hero.defense - 3;
            }
            else if (attackStance(this.mouseClickX, this.mouseClickY) == "Defensive") {
                this.radioButton.x = 692;
                this.radioButton.y = 530;
                this.hero.attackStance = "Defensive";
                this.hero.powerLvAdj = this.hero.power - 3;
                this.hero.defenseLvAdj = this.hero.defense + 3;
            }
            else if (attackStance(this.mouseClickX, this.mouseClickY) == "Normal") {
                this.radioButton.x = 552;
                this.radioButton.y = 572;
                this.hero.attackStance = "Normal";
                this.hero.powerLvAdj = this.hero.power;
                this.hero.defenseLvAdj = this.hero.defense;
            }
            console.log(this.hero.attackStance);

            // healing potion
            if (this.mouseClickX >= 538 && this.mouseClickX <= 558 && this.mouseClickY >= 315 && this.mouseClickY <= 342) {
                if (this.hero.healingPotion > 0) {
                    this.hero.health = Math.min(this.hero.maxhealth, (this.hero.health + 10));
                    this.hero.healingPotion -= 1;
                    this.historyLineTextList.unshift(`Hero drinks a healing potion`);
                    this.historyLineTextColor.unshift("White");
                    if (this.hero.battleMode == true) {
                        this.hero.frozen = true;
                    }
                    
                }
            }

        },this);

        // Changes scenes
        this.input.keyboard.on('keyup', function(e) {
            if (e.key == "2") {
                this.scene.start("Area99_100")
            }
        },this);

        this.timer = 0;
        this.changeDirTimer = 120;
        this.randNumb = Math.floor(Math.random() * 4);
    }

}