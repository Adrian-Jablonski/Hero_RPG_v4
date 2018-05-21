import Store from './scenes/Store.js';
import Area98_100 from './scenes/Area98_100.js'; import Area98_101 from './scenes/Area98_101.js'; import Area98_102 from './scenes/Area98_102.js'; import Area98_103 from './scenes/Area98_103.js'; import Area98_104 from './scenes/Area98_104.js'; import Area98_105 from './scenes/Area98_105.js'; import Area98_106 from './scenes/Area98_106.js'; import Area98_107 from './scenes/Area98_107.js';

import Area99_100 from './scenes/Area99_100.js'; import Area99_101 from './scenes/Area99_101.js'; import Area99_102 from './scenes/Area99_102.js'; import Area99_103 from './scenes/Area99_103.js'; import Area99_104 from './scenes/Area99_104.js'; import Area99_105 from './scenes/Area99_105.js'; import Area99_106 from './scenes/Area99_106.js'; import Area99_107 from './scenes/Area99_107.js';

import Area100_100 from './scenes/Area100_100.js'; import Area100_101 from './scenes/Area100_101.js'; import Area100_102 from './scenes/Area100_102.js'; import Area100_103 from './scenes/Area100_103.js'; import Area100_104 from './scenes/Area100_104.js'; import Area100_105 from './scenes/Area100_105.js'; import Area100_106 from './scenes/Area100_106.js'; import Area100_107 from './scenes/Area100_107.js'; import Area100_108 from './scenes/Area100_108.js';

import Area101_101 from './scenes/Area101_101.js'; import Area101_102 from './scenes/Area101_102.js'; import Area101_105 from './scenes/Area101_105.js'; import Area101_106 from './scenes/Area101_106.js'; import Area101_107 from './scenes/Area101_107.js'; import Area101_108 from './scenes/Area101_108.js'; import Area101_111 from './scenes/Area101_111.js';

import Area102_101 from './scenes/Area102_101.js'; import Area102_105 from './scenes/Area102_105.js'; import Area102_106 from './scenes/Area102_106.js';
import Area102_107 from './scenes/Area102_107.js'; import Area102_108 from './scenes/Area102_108.js';
import Area102_111 from './scenes/Area102_111.js';

import Area103_106 from './scenes/Area103_106.js'; import Area103_107 from './scenes/Area103_107.js'; import Area103_108 from './scenes/Area103_108.js'; import Area103_111 from './scenes/Area103_111.js';

import Area104_107 from './scenes/Area104_107.js'; import Area104_108 from './scenes/Area104_108.js'; import Area104_110 from './scenes/Area104_110.js'; import Area104_111 from './scenes/Area104_111.js';

import Area105_108 from './scenes/Area105_108.js'; import Area105_109 from './scenes/Area105_109.js'; import Area105_110 from './scenes/Area105_110.js'; import Area105_111 from './scenes/Area105_111.js';

import Area106_110 from './scenes/Area106_110.js'; import Area106_111 from './scenes/Area106_111.js';

import Area107_110 from './scenes/Area107_110.js';

import Area108_110 from './scenes/Area108_110.js';

var config = {
    type: Phaser.AUTO,
    width: 850,
    height: 750,
    scene: [Area98_100, Store,
        Area98_101, Area98_102, Area98_103, Area98_104,Area98_105,Area98_106, Area98_107, 
        Area99_100, Area99_101, Area99_102, Area99_103, Area99_104, Area99_105, Area99_106, Area99_107,
        Area100_100, Area100_101, Area100_102, Area100_103, Area100_104, Area100_105, Area100_106, Area100_107, Area100_108,
        Area101_101, Area101_102, Area101_105, Area101_106, Area101_107, Area101_108, Area101_111,
        Area102_101, Area102_105, Area102_106, Area102_107, Area102_108, Area102_111,
        Area103_106, Area103_107, Area103_108, Area103_111,
        Area104_107, Area104_108, Area104_110, Area104_111,
        Area105_108, Area105_109, Area105_110, Area105_111, 
        Area106_110, Area106_111,
        Area107_110,
        Area108_110,
    ],

};

var game = new Phaser.Game(config);