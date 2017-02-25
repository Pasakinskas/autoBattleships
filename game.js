class Game {
    constructor(boardWidth, boardHeight, graphics, gridSize) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        const self = this;
        this.loopRuns = true;
        document.addEventListener("keydown", () => {
            if (this.loopRuns === true) {
                this.loopRuns = false;
                return;
            }
            if (this.loopRuns === false) {
                this.loopRuns = true;
                return;
            }
        });
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

    checkShipPlace(x , y , size, direction, player) {
        let i = 0;
        let whiteList = [];
        while (i < size) {
            if (direction == "v" && y + size - 1 < player.board.data.length) {
                for (let neighbor of player.board.fetchSquare(x, y + i).neighbors) {
                    if (whiteList.indexOf(neighbor) == -1 && neighbor.shipHere == true) {
                        return false;
                    }
                }
                whiteList.push(player.board.fetchSquare(x, y + i));
            }
            else if (direction == "h" && x + size - 1 < player.board.data[0].length) {
                for (let neighbor of player.board.fetchSquare(x + i, y).neighbors) {
                    if (whiteList.indexOf(neighbor) == -1 && neighbor.shipHere == true) {
                        return false;
                    }
                }
                whiteList.push(player.board.fetchSquare(x + i, y));
            }
            else {
                return false;
            }
            i++;
        }
        return true;              
    }

    placeShipByCoords(x, y, size, direction, player) {
        if (this.checkShipPlace(x, y, size, direction, board) === false) {
            console.log("no ship, not enough space");
            return;
        }
        let i = 0;
        while (i < size) {
            if (direction == "h") {
                player.board.fetchSquare(x + i, y).setShipHere();
                player.board.fetchSquare(x + i, y).setColor("white");
                player.myShips.push(player.board.fetchSquare(x + i, y));
            }
            else if (direction == "v") {
                player.board.fetchSquare(x, y + i).setShipHere();
                player.board.fetchSquare(x, y + i).setColor("white");
                player.myShips.push(player.board.fetchSquare(x, y + i));
            }
            i++;
        }
    }

    placeShipBySquare(square, size, direction, player) {
        let x = square.x;
        let y = square.y;
        let i = 0;
        if (this.checkShipPlace(x, y, size, direction, player) === false) {
            console.log("no ship, not enough space");
            return;
        }        
        while (i < size) {
            if (direction == "h") {
                player.board.fetchSquare(x + i, y).setShipHere();
                player.board.fetchSquare(x + i, y).setColor("white");
                player.myShips.push(player.board.fetchSquare(x + i, y));
            }
            else if (direction == "v") {              
                player.board.fetchSquare(x, y + i).setShipHere();
                player.board.fetchSquare(x, y + i).setColor("white");
                player.myShips.push(player.board.fetchSquare(x, y + i));
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
        let a = 0;
        while (a < 5) {
                for (let player of this.players) {
                    const pickedSquare = player.pickRandSquare();
                    this.placeShipBySquare(pickedSquare, 2, Utilities.randDirection(), player);
                }
            a++;
        }
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

    getPlayerScores () {
        var output = document.getElementById("game-output");
        output.innerHTML = "";
        for (const player of this.players) {
            output.innerHTML += player.name + " " + " " + player.myShips.length + "\n"
        }
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
        if (this.loopRuns === true) {
            this.playerMove();
            this.drawPlayers();
            this.getPlayerScores();
        } 
    }
}

var game = new Game(10, 10);
game.start();
