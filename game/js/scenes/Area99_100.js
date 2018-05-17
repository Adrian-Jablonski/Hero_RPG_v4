var area = "area99_100"

import BaseScene from '/js/utilities/basescene.js';
import sceneImports from '../utilities/imports.js';  // Imports all images

import area99_100 from '/assets/sprites/background-images/area_99_100.png';

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
        super.preload('area99_100', area99_100)
    }

    create() {
        super.create('area99_100');

        // Changes scenes
        this.input.keyboard.on('keyup', function(e) {
            if (e.key == "1") {
                this.scene.start("Area100_100")
            }
        },this);
    }
}