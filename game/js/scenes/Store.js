import BaseScene from '/js/utilities/basescene.js';
import sceneImports from '../utilities/imports.js'; // Imports all images

import area from '/assets/sprites/background-images/Store.png';

// Load character objects
import Hero from '../classes/characters/hero.js'; 

export default class Store extends BaseScene {
    constructor() {
        super("Store");
    }

    preload() {
        super.preload('Store', area);
    }

    create() {
        var sceneBorders = {x: [400, 500], y: [0, 460]}; // Scene dimensions
        var areaChanges = {
            northChange : "",
            eastChange : "", 
            southChange : "", 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : "", 
            eastChange : "",
            southChange : "", 
            westChange : ""
        };

        var Enemy1 = "None";
        var Enemy2 = "None";
        var Enemy3 = "None";
        var Enemy4 = "None";

        super.create('Store', sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

        this.storeIntroText = this.add.text(50, 50, "Welcome to the Store", {font:"30px Ariel", color:"grey"});
            this.storeIntroText2 = this.add.text(50, 80, "Select number to buy item", {font:"25px Ariel", color:"grey"});
            this.storeLine1Text = this.add.text(50, 130, "1. Healing Potion (15 coins)", {font:"20px Ariel", color:this.neon});
            this.storeExitText = this.add.text(50, 400, "9. Exit", {font:"20px Ariel", color:"red"});

        this.input.keyboard.on('keyup', function(e) {
            if (e.key == "9") {
                this.scene.start("Area98_100", {hero : this.hero, areaChangeType : "East"});
            }
            else if (e.key == "1") {
                this.hero.items.healingPotion += 1;
                this.hero.coins -= 15;
            }
        },this);
    }   
}