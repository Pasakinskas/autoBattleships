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

    placeShipByCoords(x, y, size, direction, board) {
        // If id ask for player, I could set unique colors
        // game will check if player followed the rules, 
        // while picking the ship coords, and will place it
        let i = 0;
        let whiteList = [];
        while (i < size) {
            if (direction == "v" && x + size - 1 < board.data.length) {
                for (let neighbor of board.fetchSquare(x, y + i).neighbors) {
                    if (whiteList.indexOf(neighbor) == -1 && neighbor.shipHere == true) {
                        return;
                    }
                }
                board.fetchSquare(x, y + i).setShipHere();
                board.fetchSquare(x, y + i).setColor("white");
                whiteList.push(board.fetchSquare(x, y + i));
            }
            else if (direction == "h" && y + size - 1 < board.data[0].length) {
                for (let neighbor of board.fetchSquare(x + i, y).neighbors) {
                    if (whiteList.indexOf(neighbor) == -1 && neighbor.shipHere == true) {
                        return;
                    }
                }
                board.fetchSquare(x + i, y).setShipHere();
                board.fetchSquare(x + i, y).setColor("white");
                whiteList.push(board.fetchSquare(x + i, y));
            }
            i++;
        }
    }

    placeShipBySquare(square, size, direction, board) {
        // checking for neighbors and accounting for it is 
        // complete. Now I must stop reverse the code, if while placing
        // a ship, another ship is met in the middle. 
        
        let x = square.x;
        let y = square.y;
        let i = 0;
        let whiteList = [];
        while (i < size) {
            if (direction == "v" && x + size - 1 < board.data.length) {
                for (let neighbor of board.fetchSquare(x + i, y).neighbors) {
                    if (whiteList.indexOf(neighbor) == -1 && neighbor.shipHere == true) {
                        return;
                    }
                }
                board.fetchSquare(x + i, y).setShipHere();
                board.fetchSquare(x + i, y).setColor("white");
                whiteList.push(board.fetchSquare(x + i, y));
            }
            else if (direction == "h" && y + size - 1 < board.data[0].length) {
                for (let neighbor of board.fetchSquare(x, y + i).neighbors) {
                    if (whiteList.indexOf(neighbor) == -1 && neighbor.shipHere == true) {
                        return;
                    }
                }                
                board.fetchSquare(x, y + i).setShipHere();
                board.fetchSquare(x, y + i).setColor("white");
                whiteList.push(board.fetchSquare(x + i, y));
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
        this.placeShipByCoords(5, 1, 2, "v", this.players[0].board); 
        this.placeShipByCoords(6, 6, 4, "h", this.players[0].board);  
        this.placeShipBySquare(coords, 2, "h", this.players[0].board);
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
