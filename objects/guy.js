class Guy {
    constructor(x, y, size, color) {
        this.pos = new Point(x, y);
        this.size = size;
        this.color = color;

        this.path = null;
        this.velocity = 10//2.5;
        this.i = 0
    }

    update() {
        if (this.path) {
            this.pos.set(...lerpPoint(this.path[0].p1, this.path[0].p2, 1/(Math.floor(this.path[0].length() / this.velocity)+1)*this.i));
            this.i++;
            if (this.i > this.path[0].length() / this.velocity) {
                this.i = 0;
                this.path.shift()
                if (this.path.length == 0) this.path = null;
            };
        }
    }

    direction(other) {
        return getAngle(subtract(other.pos, this.pos));
    }

    istouching(other, threshold) {
        return intCircCirc(this.pos, this.size*threshold, other.pos, other.size);
    }

    draw(ctx, stroke=false, pos=null) {
        if(!pos) {
            pos = this.pos;
        }

        pos.draw(ctx, {size:this.size, color:this.color, contour:stroke});
    }
}