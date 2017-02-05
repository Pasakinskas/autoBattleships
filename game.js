class Game {
    placeShip(x, y, size, direction, board) {
        let i = 0;
        while (i < size) {
            if (direction == "v") {
                board[x + i][y].setShipHere();
            }
            else if (direction == "h") {
                board[x][y + i].setShipHere();
            }
            i++;
        }
    }

    shootShip() {
        // if player decideShipShoot is true, square.setSquareShot();
    }


    initPlayers() {
        this.players = [];
        let player1 = new Player("Mrello");
        let player2 = new Player("Andrello");
        let player3 = new Player("Simello");
        this.players.push(player1, player2, player3);
    }

    start () {
        this.initPlayers();
        let board = new Board(15, 15);
        let graphics = new Graphics(14, 14, 1);
        let singleGridWidth = (board.width * (graphics.cellWidth + graphics.spcBetweenSquares) + graphics.spcBetweenSquares);
        let singleGridLength = (board.height * (graphics.cellHeight + graphics.spcBetweenSquares) + graphics.spcBetweenSquares);
        graphics.initGraphics((singleGridWidth * this.players.length + 0.5 * singleGridWidth), singleGridLength);
        this.players.forEach((player) => {
            player.board = board.createSquareArray();
            });
        graphics.drawBoard(this.players[0].board, 0, 0);
        graphics.drawBoard(this.players[1].board, Math.floor(1.25 * singleGridWidth), 0);
        graphics.drawBoard(this.players[2].board, Math.floor(2.5 * singleGridWidth), 0);
        // this.placeShip(2, 5, 3, "h", this.myBoard);
        // this.placeShip(4, 5, 2, "h", this.enemyBoard);
        // this.placeShip(7, 2, 3, "v", this.myBoard);
        // this.placeShip(1, 4, 2, "v", this.enemyBoard);
    }

}

var game = new Game();
game.start();
