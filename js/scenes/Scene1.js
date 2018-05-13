/*
	Run by using http-server -c-1 /Users/adrianj/Google_Drive/Computer_programming/ClassWork/Hero_RPG_V4_JS
	Then go to http://localhost:8080 
*/

class Scene1 extends Phaser.Scene {
    constructor() {
        super({key:"Scene1"});
    }
    
    preload() {
        // Loads background images
        this.load.image('dark-background', 'assets/sprites/background-images/dark_background.png')
        this.load.image('background','assets/sprites/background-images/area_100_100.png');
        this.load.image('user-interface', 'assets/sprites/background-images/user_interface.png')

        // Characters
        this.load.image('hero', 'assets/sprites/characters/hero.png', 41, 55);
        this.load.image('goblin', 'assets/sprites/characters/goblin.png', 32, 32);

        // Status Bars
        this.load.image('statusBar100', 'assets/sprites/Status_Bars/Status_Bar100.png');
        this.load.image('statusBar0', 'assets/sprites/Status_Bars/Status_Bar0.png')

        this.load.image('scrollUp', 'assets/sprites/icons/scroll_up_button.gif');
        this.load.image('scrollDown', 'assets/sprites/icons/scroll_down_button.gif');

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
        this.image = this.add.image(850 / 2, 750 / 2, 'dark-background');
	    this.image1 = this.add.image(512 / 2, (480 / 2) + 30, 'background');
        this.image2 = this.add.image(325 / 2 + 520, 619 / 2, 'user-interface');
        this.scrollUp = this.add.image(465, 600, 'scrollUp')
        this.scrollDown = this.add.image(465, 640, 'scrollDown')
        
        this.hero = this.add.sprite(300, 300, 'hero');

        this.hero.name = "Hero";
        this.hero.power = 3;
        this.hero.defense = 3;
        this.hero.health = 15;
        this.hero.maxhealth = 15;

        //create hero and enemy health bar off screen
        this.statusBarHero0 = this.add.image(-30, - 40, 'statusBar0');
        this.statusBarEnemy0 = this.add.image(-30, - 80, 'statusBar0');

        this.statusBarHero100 = this.add.image(-30, - 40, 'statusBar100');
        this.statusBarEnemy100 = this.add.image(-30, - 80, 'statusBar100');


        // this.healthbar.cropEnabled = true;

        // shows hero levels on screen
        this.heroPowerLvText = this.add.text(670, 110, this.hero.power, {font:"24px Ariel", color:this.neon});
        
        this.heroDefenseLvText = this.add.text(670, 160, this.hero.defense, {font:"24px Ariel", color:"Blue"});

        this.heroHealthLvText = this.add.text(670, 220, this.hero.health, {font:"24px Ariel", color:"Red"});

        // Damage text
        this.heroDamageText = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"});
        this.enemyDamageText = this.add.text(-20, 20, "", {font:"18px 'Ariel Bold'", color:"Red"});

        // History Log
        this.historyTextHeading = this.add.text(20, 513, "History:", {font:"20px Ariel"});
        this.historyTextLine = this.add.text(10, 528, "-----------------------------------------------")
        this.historyTextLine1 = this.add.text(40, 545, "Line 1 of history log", {font:"16px Ariel Bold"});
        this.historyTextLine2 = this.add.text(40, 570, "Line 2 of history log", {font:"16px Ariel"});
        this.historyTextLine3 = this.add.text(40, 595, "Line 3 of history log", {font:"16px Ariel"});
        this.historyTextLine4 = this.add.text(40, 620, "Line 4 of history log", {font:"16px Ariel"});
        this.historyTextLine5 = this.add.text(40, 645, "Line 5 of history log", {font:"16px Ariel"});
        this.historyTextLine6 = this.add.text(40, 670, "Line 6 of history log", {font:"16px Ariel"});

        this.historyLineTextList = [];
        this.historyLineTextColor = [];

        this.goblin = this.add.sprite(100, 100, 'goblin').setInteractive(); // set interactive allows pointerover event

        this.goblin.text = this.add.text(20, 0, "", {font:"24px Ariel", color:"Red"});
        this.goblin.name = "Goblin";
        this.goblin.power = 1;
        this.goblin.defense = 2;
        this.goblin.health = 8;
        this.goblin.maxhealth = 8;
        
        // this.hero.anchor.setTo(0.5, 0.5);

        // // Sets scene border so player does not move off screen (Need to find a way that this works in Phaser3)
        // this.hero.setBounds(0, 0, 800, 600);

        // Moves player after releasing right keyboard button
        this.input.keyboard.on('keyup_RIGHT', function(event) {
            this.hero.x += 10;
        },this);

        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        
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
            console.log("Battle mode :", this.battleMode );

            console.log("x: ", event.x, " y: ", event.y);
            console.log("player position :", this.hero.x, this.hero.y)
            console.log("enemy position :", this.goblin.clickPosition)
            
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

        if (this.battleMode == false) {
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
        this.heroHealthLvText.setText(this.hero.health);

        // Updates history log

        this.historyTextLine1.setText(this.historyLineTextList[5]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[5]});
        this.historyTextLine2.setText(this.historyLineTextList[4]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[4]});;
        this.historyTextLine3.setText(this.historyLineTextList[3]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[3]});;
        this.historyTextLine4.setText(this.historyLineTextList[2]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[2]});;
        this.historyTextLine5.setText(this.historyLineTextList[1]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[1]});;
        this.historyTextLine6.setText(this.historyLineTextList[0]).setStyle({font:"16px Ariel Bold", color: this.historyLineTextColor[0]});;

    }
}