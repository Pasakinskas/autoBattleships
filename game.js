class Game {
    placeShip(x, y, size, direction, data) {
        // If id ask for player, I could set unique colors
        // game will check if player followed the rules, 
        // while picking the ship coords, and will place it
        let i = 0;
        while (i < size) {
            if (direction == "v") {
                data[x + i][y].setShipHere();
                data[x + i][y].setColor("white");
            }
            else if (direction == "h") {
                data[x][y + i].setShipHere();
                data[x][y + i].setColor("white");
            }
            i++;
        }
    }

    shootShip() {
        // if player decideShipShoot is true, square.setSquareShot();
        // player function uses logic to decide the coords, this one
        // actually places it, if conditions are met.
    }

    createPlayers(width, height) {
        const names = ["Mrello", "Andrello", "Simello"];
        this.players = names.map(name => {
            return new Player(name);
        });
 
        this.players.forEach((player) => {
            player.board = new Board(width, height);
        });
        // this.placeShip(2, 5, 2, "h", this.players[0].board.data);
    }

    start () {
        const boardWidth = 10;
        const boardHeight = 10;
        const graphics = new Graphics(15, 15, 1);
        const gridSize = graphics.getGridSize(boardWidth, boardHeight)

        this.createPlayers(boardWidth, boardHeight);
        graphics.initGraphics(gridSize[0], gridSize[1], this.players.length);

        graphics.drawBoard(this.players[0].board.data, 0, 0);
        graphics.drawBoard(this.players[1].board.data, Math.floor(1.25 * gridSize[0]), 0);
        graphics.drawBoard(this.players[2].board.data, Math.floor(2.5 * gridSize[0]), 0);
    }
}

var game = new Game();
game.start();
