class Player {
    constructor(name, board, shootingHistory) {
        this.name = name;
        this.board = null;
        this.shootingHistory = {};
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
        // ship in the first, or last row
        // later, add mouse hover, for player interaction

    }

    decideFireSpot(players) {
        let victim = players[Utilities.randinteger(players.length)];
        while (victim === this) {
            victim = players[Utilities.randinteger(players.length)];
        }

        const possibleTargets = victim.board.squareList
            .filter(square => this.shootingHistory[victim.name].indexOf(square) === -1);
        const square = possibleTargets[Utilities.randinteger(possibleTargets.length)];

        console.log(this.name, " shot ", victim.name, " at ", square.x, square.y);
        this.shootingHistory[victim.name].push(square);
        return square;
    }
}