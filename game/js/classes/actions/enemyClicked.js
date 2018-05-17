// Checks if enemy was clicked
function enemyClicked(mouseClickX, mouseClickY, enemy, gameScreen) {
    if (mouseClickX >= enemy.x - (enemy.width / 2) && mouseClickX <= enemy.x + (enemy.width / 2) && mouseClickY >= enemy.y - (enemy.height / 2) && mouseClickY <= enemy.y + (enemy.height / 2) ) {
        return true;
    }
    else if (mouseClickX < gameScreen && mouseClickX > 0 && mouseClickY < gameScreen && mouseClickY > 0){ // Prevents battle mode being changed by clicks outside game screen
        // this.battleMode = false;
        return false;
    }
}

export default enemyClicked;
