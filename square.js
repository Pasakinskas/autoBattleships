class Square {
    constructor (x, y, color, shipHere, squareShot, neighbors) {
        this.x = x;
        this.y = y;
        this.color = null;
        this.shipHere = false;
        this.squareShot = false;
        this.neighbors = null;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setSquareShot() {
        this.squareShot = true;
        this.color = "grey";
    }

    setShipHere() {
        this.shipHere = true;
    }
}