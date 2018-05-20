import BaseScene from '/js/utilities/basescene.js';
import sceneImports from '../utilities/imports.js'; // Imports all images

// Load character objects
import Hero from '../classes/characters/hero.js'; 
import Goblin from '../classes/characters/goblin.js';
import DeathKnight from '../classes/characters/deathKnight.js';
import Shadow from '../classes/characters/shadow.js';
import Wizard from '../classes/characters/wizard.js';
import Ranger from '../classes/characters/ranger.js';
import Zombie from '../classes/characters/zombie.js';
import Dragon from '../classes/characters/dragon.js';

var currArea = [100, 100];
import area from '/assets/sprites/background-images/area_100_100.png';

export default class Area100_100 extends BaseScene {
    constructor() {
        super(`Area${currArea[0]}_${currArea[1]}`);
    }

    preload() {
        super.preload(`area${currArea[0]}_${currArea[1]}`, area);
    }

    create() {
        var sceneBorders = {x: [40, 465], y: [20, 467]}; // Scene dimensions
        var areaChanges = {
            northChange : [sceneBorders.x[0], sceneBorders.x[1], sceneBorders.y[0] - 30, sceneBorders.y[0] + 30], 
            eastChange : "", 
            southChange : "", 
            westChange : [sceneBorders.x[0] - 30, sceneBorders.x[0] + 30, 220, 275]
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : `Area${currArea[0]}_${currArea[1] + 1}`, 
            eastChange : "",
            southChange : "", 
            westChange : `Area${currArea[0] - 1}_${currArea[1]}`
        };

        var Enemy1 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: Goblin, name: "goblin", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [350, 450], x: 150, y: 350}
        var Enemy4 = {class: Goblin, name: "goblin", walkAreaX: [300, 400], walkAreaY: [50, 170], x: 350, y: 100}

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);
    }   
}