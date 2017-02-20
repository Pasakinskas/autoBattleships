class Game {
    constructor(boardWidth, boardHeight, graphics, gridSize) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
    }
    
    createPlayers() {
        const names = ["Mrello", "Andrello", "Simello"];
        this.players = names.map(name => {
            return new Player(name);
        });
 
        this.players.forEach((player) => {
            player.board = new Board(this.boardWidth, this.boardHeight);
            for (let enemy of this.players) {
                if (enemy != player) {
                    player.shootingHistory[enemy.name] = [];
                }
            }
        });
    }

    checkShipPlace(x , y , size, direction, board) {
        let i = 0;
        let whiteList = [];
        while (i < size) {
            if (direction == "v" && y + size - 1 < board.data.length) {
                for (let neighbor of board.fetchSquare(x, y + i).neighbors) {
                    if (whiteList.indexOf(neighbor) == -1 && neighbor.shipHere == true) {
                        return false;
                    }
                }
                whiteList.push(board.fetchSquare(x, y + i));
            }
            else if (direction == "h" && x + size - 1 < board.data[0].length) {
                for (let neighbor of board.fetchSquare(x + i, y).neighbors) {
                    if (whiteList.indexOf(neighbor) == -1 && neighbor.shipHere == true) {
                        return false;
                    }
                }
                whiteList.push(board.fetchSquare(x + i, y));
            }
            i++;
        }
        return true;              
    }

    placeShipByCoords(x, y, size, direction, board) {
        if (this.checkShipPlace(x, y, size, direction, board) === false) {
            console.log("no ship, not enough space");
            return;
        }
        let i = 0;
        while (i < size) {
            if (direction == "h" && x + size - 1 < board.data.length) {
                board.fetchSquare(x + i, y).setShipHere();
                board.fetchSquare(x + i, y).setColor("white");
            }
            else if (direction == "v" && y + size - 1 < board.data[0].length) {
                board.fetchSquare(x, y + i).setShipHere();
                board.fetchSquare(x, y + i).setColor("white");
            }
            i++;
        }
    }

    placeShipBySquare(square, size, direction, board) {
        let x = square.x;
        let y = square.y;
        let i = 0;
        if (this.checkShipPlace(x, y, size, direction, board) === false) {
            console.log("no ship, not enough space");
            return;
        }        
        while (i < size) {
            if (direction == "h" && x + size - 1 < board.data.length) {
                board.fetchSquare(x + i, y).setShipHere();
                board.fetchSquare(x + i, y).setColor("white");
            }
            else if (direction == "v" && y + size - 1 < board.data[0].length) {              
                board.fetchSquare(x, y + i).setShipHere();
                board.fetchSquare(x, y + i).setColor("white");
            }
            i++;
        }
    }

    shootShip(square) {
        // if player decideShipShoot is true, square.setSquareShot();
        // player function uses logic to decide the coords, this one
        // actually places it, if conditions are met.
        square.setSquareShot();
    }

    firstMove() {
        let coords = this.players[0].pickRandSquare();
        this.placeShipByCoords(5, 1, 2, "v", this.players[0].board); 
        this.placeShipByCoords(6, 6, 4, "h", this.players[0].board); 
        this.placeShipBySquare(coords, 2, "h", this.players[0].board);
        this.placeShipByCoords(4, 3, 4, "h", this.players[1].board); 
        this.placeShipByCoords(2, 6, 4, "h", this.players[1].board); 
        this.placeShipBySquare(coords, 2, "h", this.players[1].board);
    }

    playerMove() {
        for (let player of this.players) {
            let targetSquare = player.decideFireSpot(this.players);
            if (targetSquare) {
                this.shootShip(targetSquare);
            }
        }
    }

    drawPlayers() {
        const dataList = this.players.map(player => player.board.data);
        this.graphics.draw(dataList);
    }

    start () {
        this.createPlayers();
        this.graphics = new Graphics({
            cellWidth: 15,
            cellHeight: 15,
            spcBetweenSquares: 2,
            boardWidth: this.boardWidth,
            boardHeight: this.boardHeight,
            playerNumber: this.players.length
        });
        
        this.firstMove();
        this.drawPlayers();
        window.setInterval(this.update.bind(this), 1000);
    }

    update () {
        this.playerMove();
        this.drawPlayers(); 
    }
}

var game = new Game(10, 10);
game.start();
