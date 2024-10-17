class UiLine {
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    color: number;

    constructor(x1: number, y1: number,x2: number, y2: number, color: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.color = color;
    }
    
    render() {
        img_buf.drawLine(this.x1, this.y1, this.x2, this.y2, this.color);
    }
}