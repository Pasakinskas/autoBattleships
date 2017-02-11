class Game {
    createPlayers(width, height) {
        const names = ["Mrello", "Andrello", "Simello"];
        this.players = names.map(name => {
            return new Player(name);
        });
 
        this.players.forEach((player) => {
            player.board = new Board(width, height);
        });
    }

    placeShipByCoords(x, y, size, direction, data) {
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

    placeShipBySquare(square, size, direction, data) {
        let x = square.x;
        let y = square.y;
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

    makeMove() {
        let coords = this.players[0].pickRandSquare();
        this.placeShipBySquare(coords, 2, "h", this.players[0].board.data);
    }

    drawPlayers(graphics, gridSize) {
        let i = 0;
        let z = 0;
        for (const player of this.players) {
            graphics.drawBoard(this.players[i].board.data, Math.floor(z * gridSize[0]), 0);
            i++;
            z += 1.25;
        }
    }

    start () {
        const boardWidth = 10;
        const boardHeight = 10;
        const graphics = new Graphics(15, 15, 2);
        const gridSize = graphics.getGridSize(boardWidth, boardHeight);

        this.createPlayers(boardWidth, boardHeight);
        graphics.initGraphics(gridSize[0], gridSize[1], this.players.length);

        this.makeMove();
        this.drawPlayers(graphics, gridSize);
    }
}

var game = new Game();
game.start();
