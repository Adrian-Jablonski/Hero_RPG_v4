import BaseScene from '/js/utilities/basescene.js';
import sceneImports from '../utilities/imports.js'; // Imports all images

import area from '/assets/sprites/background-images/area_100_100.png';

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
        super.preload('area100_100', area);
    }

    create() {
        var sceneBorders = {x: [40, 480], y: [40, 460]}; // Scene dimensions
        var areaChanges = {
            northChange : [sceneBorders.x[0], sceneBorders.x[1], sceneBorders.y[0] - 30, sceneBorders.y[0] + 30], 
            eastChange : "", 
            southChange : "", 
            westChange : [sceneBorders.x[0] - 30, sceneBorders.x[0] + 30, 220, 275]
        }; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : "Area100_101", 
            eastChange : "",
            southChange : "", 
            westChange : "Area99_100"
        };

        var Enemy1 = {class: Ranger, name: "ranger", walkAreaX: [100, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: DeathKnight, name: "deathKnight", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Ranger, name: "ranger", walkAreaX: [100, 200], walkAreaY: [350, 450], x: 150, y: 350}
        var Enemy4 = {class: Wizard, name: "wizard", walkAreaX: [300, 400], walkAreaY: [50, 170], x: 350, y: 100}

        super.create('area100_100', sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);
    }   
}