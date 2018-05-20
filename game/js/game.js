import Area98_100 from './scenes/Area98_100.js';
import Area99_100 from './scenes/Area99_100.js';
import Area100_100 from './scenes/Area100_100.js';
import Area100_101 from './scenes/Area100_101.js';
import Store from './scenes/Store.js';


var config = {
    type: Phaser.AUTO,
    width: 850,
    height: 750,
    scene: [Area98_100, Store, Area100_100, Area99_100, Area100_101],

};

var game = new Phaser.Game(config);