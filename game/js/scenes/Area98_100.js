import BaseScene from '/js/utilities/basescene.js';
import sceneImports from '../utilities/imports.js'; // Imports all images

import area from '/assets/sprites/background-images/area_98_100.png';

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

export default class Area98_100 extends BaseScene {
    constructor() {
        super("Area98_100");
    }

    preload() {
        super.preload('area98_100', area);
    }

    create() {
        var sceneBorders = {x: [90, 500], y: [125, 460]}; // Scene dimensions
        var areaChanges = {
            northChange : [170, 286, sceneBorders.y[0] - 30, sceneBorders.y[0] + 30],
            eastChange : [sceneBorders.x[1] - 30, sceneBorders.x[1] + 30, sceneBorders.y[0], sceneBorders.y[1]], 
            southChange : "", 
            westChange : ""
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : "Store", 
            eastChange : "Area99_100",
            southChange : "", 
            westChange : ""
        };

        var Enemy1 = {class: Goblin, name: "goblin", walkAreaX: [100, 200], walkAreaY: [150, 300], x: 180, y: 200};
        var Enemy2 = {class: Goblin, name: "goblin", walkAreaX: [300, 450], walkAreaY: [250, 450], x: 350, y: 280};
        var Enemy3 = "None";
        var Enemy4 = "None";

        super.create('area98_100', sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);
    }   
}