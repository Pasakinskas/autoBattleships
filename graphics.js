class Graphics {
    constructor(cellWidth, cellHeight, spcBetweenSquares) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.spcBetweenSquares = spcBetweenSquares;
    }

    initGraphics (canvasWidth, canvasHeight) {
        let canvas = document.getElementById('canvas');
        this.context = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        this.context.fillStyle = "grey";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawBoard (board, paddingLeft, paddingTop) {
        board.forEach ((row, y) => {
            row.forEach ((square, x) => {
                this.context.fillStyle = square.getColor();
                this.context.fillRect(x * (this.cellWidth + this.spcBetweenSquares) + paddingLeft + this.spcBetweenSquares, 
                y * (this.cellHeight + this.spcBetweenSquares) + paddingTop + this.spcBetweenSquares, this.cellWidth, this.cellHeight);
            });
        });
    }
}