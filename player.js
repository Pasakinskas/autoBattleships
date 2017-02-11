class Player {
    constructor(name, board, shootingHistory) {
        this.name = name;
        this.board = null;
        this.shootingHistory = [];
    }

    pickRandSquare() {
        let square = this.board.data[Utilities.randinteger(this.board.width)]
        [Utilities.randinteger(this.board.height)];
        if (square.shipHere == false) {
            return square;
        }
    }

    decideShipSpot() {
        // must check for neighbors, 10% chance of placing
        // ship in the first, or last square
        // later, add mouse hover, for player interaction

    }

    decideFireSpot() {}
}