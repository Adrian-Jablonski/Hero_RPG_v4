// Updates attack stance
function attackStance(mouseClickX, mouseClickY) {
    if (mouseClickX >= 540 && mouseClickX <=565 && mouseClickY >= 522 && mouseClickY <= 545) {
        return "Aggressive";
    }
    else if (mouseClickX >= 682 && mouseClickX <= 707 && mouseClickY >= 522 && mouseClickY <= 545) {
        return "Defensive";
    }
    else if (mouseClickX >= 540 && mouseClickX <=565 && mouseClickY >= 564 && mouseClickY <= 591) {
        return "Normal";
    }
}

export default attackStance;
