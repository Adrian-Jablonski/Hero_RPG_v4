

var mouseClick = this.input.on('pointerup', function(event) {
    this.mouseClickX = event.x;
    this.mouseClickY = event.y;
    this.mouseClicked = true;

    console.log("x: ", event.x, " y: ", event.y);
    console.log("player position :", this.player.x, this.player.y)
    
},this);

module.exports = {
    mouseClick : mouseClick
}