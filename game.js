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

    createPlayers(board) {
        this.players = [];
        let player1 = new Player("Mrello");
        let player2 = new Player("Andrello");
        let player3 = new Player("Simello");
        this.players.push(player1, player2, player3);
        this.players.forEach((player) => {
            player.board = board.createSquareArray();
        });

    }

    fetchSquare(player, x, y) {
        if (player.board[x] && player.board[x][y])
            return player.board[x][y];
        else
            return null;
    }
  
    getSquareNeighbors(square, player) {
        let squareNeighbors = [];
        let x = square.x;
        let y = square.y;
        if (x + 1 < player.board.width) {
            squareNeighbors.push(this.fetchSquare(player, x + 1, y));
            this.fetchSquare(player, x + 1, y).setColor("red");
        }
        if (x !== 0) {
            squareNeighbors.push(this.fetchSquare(player, x - 1, y));
                this.fetchSquare(player, x - 1, y).setColor("red");
        }
        // if (y !== 0) {
        //     squareNeighbors.push(this.fetchSquare(player, x, y - 1));
        //         this.fetchSquare(player, x, y - 1).setColor("red");
        // }
        // if (y + 1 < this.height) {
        //     squareNeighbors.push(this.fetchSquare(player, x, y + 1));
        // }
    return squareNeighbors;
    }

    start () {
        let board = new Board(15, 15);
        let graphics = new Graphics(14, 14, 1);
        
        this.createPlayers(board);
        graphics.initGraphics(board.width, board.height, this.players.length);
        console.log(this.getSquareNeighbors(this.fetchSquare(this.players[0], 5, 5), this.players[0]));
        this.fetchSquare(this.players[0], 5, 5).setColor("pink");
        graphics.drawBoard(this.players[0].board, 0, 0);
        graphics.drawBoard(this.players[1].board, 250, 0);
        graphics.drawBoard(this.players[2].board, 500, 0);

        // this.placeShip(2, 5, 3, "h", this.myBoard);
        // this.placeShip(4, 5, 2, "h", this.enemyBoard);
        // this.placeShip(7, 2, 3, "v", this.myBoard);
        // this.placeShip(1, 4, 2, "v", this.enemyBoard);
    }

}

var game = new Game();
game.start();
