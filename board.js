class Board {
    constructor (width, height) {
        this.width = width;
        this.height = height;
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