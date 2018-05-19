// var area = "area99_100"

import BaseScene from '/js/utilities/basescene.js';
import sceneImports from '../utilities/imports.js';  // Imports all images

import area from '/assets/sprites/background-images/area_99_100.png';

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

export default class Area99_100 extends BaseScene {
    constructor() {
        super("Area99_100");
    }
    
    preload() {
        super.preload('area99_100', area);
    }

    create() {
        var sceneBorders = {x: [0, 480], y: [0, 460]}; // Scene dimensions
        var areaChanges = {
            northChange : "", 
            eastChange : [sceneBorders.x[1] - 30, sceneBorders.x[1] + 30, 220, 275], 
            southChange : "", 
            westChange : ""}; // Defines part of scene where the user transitions to other scene
        var areaChangeTo = {
            northChange : "", 
            eastChange : "Area100_100",
            southChange : "", 
            westChange : ""};

        var Enemy1 = {class: Dragon, name: "dragon", walkAreaX: [100, 200], walkAreaY: [100, 300], x: 150, y: 150}
        var Enemy2 = {class: Ranger, name: "ranger", walkAreaX: [300, 400], walkAreaY: [200, 400], x: 350, y: 250}
        var Enemy3 = {class: Zombie, name: "zombie", walkAreaX: [60, 160], walkAreaY: [350, 450], x: 150, y: 350}
        var Enemy4 = {class: Wizard, name: "wizard", walkAreaX: [300, 400], walkAreaY: [50, 170], x: 350, y: 100}

        super.create('area99_100', sceneBorders, areaChanges, areaChangeTo, Enemy1, Enemy2, Enemy3, Enemy4);

    }
}