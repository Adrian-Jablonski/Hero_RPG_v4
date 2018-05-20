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

var currArea = [98, 100]
import area from '/assets/sprites/background-images/area_98_100.png';

export default class Area98_100 extends BaseScene {
    constructor() {
        super(`Area${currArea[0]}_${currArea[1]}`);
    }

    preload() {
        super.preload(`area${currArea[0]}_${currArea[1]}`, area);
    }

    create() {
        var sceneBorders = {x: [90, 480], y: [125, 465]}; // Scene dimensions
        var areaChanges = {
            northChange : [170, 286, sceneBorders.y[0] - 30, sceneBorders.y[0] + 30],
            eastChange : [sceneBorders.x[1] - 30, sceneBorders.x[1] + 30, sceneBorders.y[0], sceneBorders.y[1]], 
            southChange : "", 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : "Store", 
            eastChange : `Area${currArea[0] + 1}_${currArea[1]}`,
            southChange : "", 
            westChange : ""
        };

        var Enemy1 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [150, 300], x: 180, y: 200};
        var Enemy2 = {class: Goblin, name: "goblin", walkAreaX: [300, 450], walkAreaY: [250, 450], x: 350, y: 280};
        var Enemy3 = "None";
        var Enemy4 = "None";

        super.create(`area${currArea[0]}_${currArea[1]}`, sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);
    }   
}