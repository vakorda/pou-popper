class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    
    length() {
        return distance(this.p1, this.p2);
    }

    draw(ctx, {lineWidth=30, color="yellow"}={}) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(...this.p1);
        ctx.lineTo(...this.p2);
        ctx.stroke();
    }
}