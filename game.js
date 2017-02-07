class Game {
    placeShip(x, y, size, direction, board) {
        //If id ask for player, I could set unique colors
        let i = 0;
        while (i < size) {
            if (direction == "v") {
                board[x + i][y].setShipHere();
                board[x + i][y].setColor("white");
            }
            else if (direction == "h") {
                board[x][y + i].setShipHere();
                board[x][y + i].setColor("white");
            }
            i++;
        }
    }

    shootShip() {
        // if player decideShipShoot is true, square.setSquareShot();
    }

    createPlayers(board) {
        const names = ["Mrello", "Andrello", "Simello"];
        this.players = names.map(name => {
            return new Player(name);
        });
 
        this.players.forEach((player) => {
            player.board = board.createSquareArray();
            this.populateNeighbors(player.board);
        });
        this.placeShip(2, 5, 3, "h", this.players[0].board);
    }

    fetchSquare(board, x, y) {
        if (board[x] && board[x][y])
            return board[x][y];
        else
            return null;
    }
  
    getSquareNeighbors(square, board) {
        // may be bugged inside, due to xy mixing up,
        // but it works as intended, will clarify later
        // maybe Ifs shouldnt be nested for complete And 
        // perfect modularity
        
        let squareNeighbors = [];
        let x = square.x;
        let y = square.y;
        if (x + 1 < board.length) {
            squareNeighbors.push(this.fetchSquare(board, x + 1, y));
            if (y + 1 <  board[0].length) {
                squareNeighbors.push(this.fetchSquare(board, x + 1, y + 1));               
            }
            if (y !== 0) {
                squareNeighbors.push(this.fetchSquare(board, x + 1, y - 1));               
            }
        }
        if (x !== 0) {
            squareNeighbors.push(this.fetchSquare(board, x - 1, y));
            if (y + 1 <  board[0].length) {
                squareNeighbors.push(this.fetchSquare(board, x - 1, y + 1));               
            }
            if (y !== 0) {
                squareNeighbors.push(this.fetchSquare(board, x - 1, y - 1));               
            }
        }
        if (y !== 0) {
            squareNeighbors.push(this.fetchSquare(board, x, y - 1));
        }
        if (y + 1 < board[0].length) {
            squareNeighbors.push(this.fetchSquare(board, x, y + 1));
        }
    return squareNeighbors;
    }

    populateNeighbors(board) {
        for (let row of board) {
            for (let square of row) {
                square.neighbors = this.getSquareNeighbors(square, board);
            }
        }
    }

    start () {
        let board = new Board(15, 15);
        let graphics = new Graphics(14, 14, 1);
        
        this.createPlayers(board);
        graphics.initGraphics(board.width, board.height, this.players.length);

        graphics.drawBoard(this.players[0].board, 0, 0);
        graphics.drawBoard(this.players[1].board, 250, 0);
        graphics.drawBoard(this.players[2].board, 500, 0);
    }
}

var game = new Game();
game.start();
