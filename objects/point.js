class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, {size= 30, color= "white", contour=false} = {}) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, size, 0, Math.PI*2);
        if(contour) {
            ctx.strokeStyle = contour;
            ctx.lineWidth = 5;
            ctx.stroke();
        } else {
            ctx.fill();
        }
    }
}