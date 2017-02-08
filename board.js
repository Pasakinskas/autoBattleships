class Board {
    constructor (width, height) {
        this.width = width;
        this.height = height;
        this.data = this.createSquareArray();
        this.populateNeighbors();
    }

    fetchSquare(x, y) {
        if (this.data[x] && this.data[x][y])
            return this.data[x][y];
        else
            return null;
    }
  
    getSquareNeighbors(square) {
        // may be bugged inside, due to xy mixing up,
        // but it works as intended, will clarify later
        // maybe Ifs shouldnt be nested for complete And 
        // perfect modularity
        
        let squareNeighbors = [];
        let x = square.x;
        let y = square.y;
        if (x + 1 < this.data.length) {
            squareNeighbors.push(this.fetchSquare(x + 1, y));
            if (y + 1 <  this.data[0].length) {
                squareNeighbors.push(this.fetchSquare(x + 1, y + 1));               
            }
            if (y !== 0) {
                squareNeighbors.push(this.fetchSquare(x + 1, y - 1));               
            }
        }
        if (x !== 0) {
            squareNeighbors.push(this.fetchSquare(x - 1, y));
            if (y + 1 <  this.data[0].length) {
                squareNeighbors.push(this.fetchSquare(x - 1, y + 1));               
            }
            if (y !== 0) {
                squareNeighbors.push(this.fetchSquare(x - 1, y - 1));               
            }
        }
        if (y !== 0) {
            squareNeighbors.push(this.fetchSquare(x, y - 1));
        }
        if (y + 1 < this.data[0].length) {
            squareNeighbors.push(this.fetchSquare(x, y + 1));
        }
        return squareNeighbors;
    }

    populateNeighbors() {
        for (let row of this.data) {
            for (let square of row) {
                square.neighbors = this.getSquareNeighbors(square);
            }
        }
    }

    createSquareArray () {
        var board = [];
        while (board.length < this.height) {
            var row = [];
            while (row.length < this.width) {
                row.push(new Square(row.length, board.length));
            }
            board.push(row);
        }
        return board;
    }
}