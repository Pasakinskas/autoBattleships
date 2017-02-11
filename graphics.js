class Graphics {
    constructor(cellWidth, cellHeight, spcBetweenSquares) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.spcBetweenSquares = spcBetweenSquares;
    }

    getGridSize (width, height) {
        let singleGridWidth = (width * (this.cellWidth + this.spcBetweenSquares)
         + this.spcBetweenSquares);
        let singleGridHeight = (height * (this.cellHeight + this.spcBetweenSquares)
         + this.spcBetweenSquares); 
         return [singleGridWidth, singleGridHeight];
    }

    initGraphics (singleGridWidth, singleGridHeight, playerNmb) {
        let canvas = document.getElementById('canvas');
        canvas.width = singleGridWidth * playerNmb * 1.25 - 0.25 * singleGridWidth;
        canvas.height = singleGridHeight;
        this.context = canvas.getContext("2d");
        this.context.fillStyle = "grey";
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawBoard (data, paddingLeft, paddingTop) {
        data.forEach ((row, y) => {
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