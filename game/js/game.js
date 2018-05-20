import Store from './scenes/Store.js';
import Area98_100 from './scenes/Area98_100.js'; import Area98_101 from './scenes/Area98_101.js'; import Area98_102 from './scenes/Area98_102.js';

import Area99_100 from './scenes/Area99_100.js'; import Area99_101 from './scenes/Area99_101.js'; import Area99_102 from './scenes/Area99_102.js';

import Area100_100 from './scenes/Area100_100.js'; import Area100_101 from './scenes/Area100_101.js'; import Area100_102 from './scenes/Area100_102.js'; import Area100_103 from './scenes/Area100_103.js'; import Area100_104 from './scenes/Area100_104.js'; import Area100_105 from './scenes/Area100_105.js';

import Area101_101 from './scenes/Area101_101.js'; import Area101_102 from './scenes/Area101_102.js'; import Area101_105 from './scenes/Area101_105.js';

import Area102_101 from './scenes/Area102_101.js';



var config = {
    type: Phaser.AUTO,
    width: 850,
    height: 750,
    scene: [Area98_100, Store,
        Area98_101, Area98_102,
        Area99_100, Area99_101, Area99_102,
        Area100_100, Area100_101, Area100_102, Area100_103, Area100_104, Area100_105,
        Area101_101, Area101_102, Area101_105,
        Area102_101,
    ],

};

var game = new Phaser.Game(config);