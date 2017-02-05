class Graphics {
    constructor(cellWidth, cellHeight, spcBetweenSquares) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.spcBetweenSquares = spcBetweenSquares;
    }

    initGraphics (width, height, playerNmb) {
        let singleGridWidth = (width * (this.cellWidth + this.spcBetweenSquares)
         + this.spcBetweenSquares);
        let singleGridLength = (height * (this.cellHeight + this.spcBetweenSquares)
         + this.spcBetweenSquares);

        let canvas = document.getElementById('canvas');
        this.context = canvas.getContext("2d");
        canvas.width = singleGridWidth * playerNmb + 0.5 * singleGridWidth;
        canvas.height = singleGridLength;
        this.context.fillStyle = "grey";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawBoard (board, paddingLeft, paddingTop) {
        board.forEach ((row, y) => {
            row.forEach ((square, x) => {
                if (!square.getColor()) {
                    this.context.fillStyle = "blue";                    
                }
                this.context.fillStyle = square.getColor();
                this.context.fillRect(x * (this.cellWidth + this.spcBetweenSquares) + paddingLeft + this.spcBetweenSquares, 
                y * (this.cellHeight + this.spcBetweenSquares) + paddingTop + this.spcBetweenSquares, this.cellWidth, this.cellHeight);
            });
        });
    }
}