import Scene1 from './scenes/Scene1.js';
import Scene2 from './scenes/Scene2.js';

var config = {
    type: Phaser.AUTO,
    width: 850,
    height: 750,
    scene: [ Scene1, Scene2 ]
};

var game = new Phaser.Game(config);