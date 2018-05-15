// Checks if enemy was clicked
function enemyClicked(mouseClickX, mouseClickY, goblin, gameScreen) {
    if (mouseClickX >= goblin.x - 15 && mouseClickX <= goblin.x + 15 && mouseClickY >= goblin.y - 15 && mouseClickY <= goblin.y + 15 ) {
        return true;
    }
    else if (mouseClickX < gameScreen && mouseClickX > 0 && mouseClickY < gameScreen && mouseClickY > 0){ // Prevents battle mode being changed by clicks outside game screen
        // this.battleMode = false;
        return false;
    }
}

export default enemyClicked;
