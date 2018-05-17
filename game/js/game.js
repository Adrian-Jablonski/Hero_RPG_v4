import Area100_100 from './scenes/Area100_100.js';
import Area99_100 from './scenes/Area99_100.js';

var config = {
    type: Phaser.AUTO,
    width: 850,
    height: 750,
    scene: [ Area100_100, Area99_100 ],

};

var game = new Phaser.Game(config);