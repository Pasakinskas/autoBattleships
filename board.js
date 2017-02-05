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
                //pushed in reverse order to keep x,y coords, not y,x
                row.push(new Square(board.length, row.length));
            }
            board.push(row);
        }
        return board;
    }

}