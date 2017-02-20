class Board {
    constructor (width, height) {
        this.width = width;
        this.height = height;
        this.squareList = [];
        this.data = this.createSquareArray();
        this.populateNeighbors();
    }

    fetchSquare(x, y) {
        if (this.data[y] && this.data[y][x])
            return this.data[y][x];
        else
            return null;
    }
  
    getSquareNeighbors(square) {
        // may be bugged inside, due to xy mixing up,
        // but it works as intended, will clarify later
        // maybe Ifs shouldnt be nested for complete And 
        // perfect modularity
        // fetchSquare should only return if a square exist.
        // this function could be made just running fetchSquare
        // 6-8 times. Try later.

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
                const square = new Square(row.length, board.length);
                row.push(square);
                this.squareList.push(square);

            }
            board.push(row);
        }
        return board;
    }
}