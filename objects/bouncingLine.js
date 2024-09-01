class BouncingLine {
    constructor(center, angle, sides, height, width) {
        this.center = center;
        this.angle = angle;
        this.sides = sides.map(s => new Segment(new Point(s, -100), new Point(s, height)));
        this.height = height;
        this.width = width;

        this.intersections = [];

        this.calculateSegments();
    }

    update() {
        this.calculateSegments();
    }

    getPath() {
        return this.segments.slice(0);
    }

    calculateSegments() {
        this.intersections = [];
        this.segments = [];
        let angle = this.angle;
        let pos = this.center;
        let a = 0
        while (a < 10 || pos.y > 0 || pos.y > this.height) {
            a++;
            let last = new Segment(pos, addAngle(pos, -angle, 100000));
            let int = intSegSeg(last, this.sides[1]);
            if (int) {
                this.intersections.push(addAngle(int[0], -angle+Math.PI, this.width/Math.cos(angle)));
                last.p2.set(...addAngle(int[0], -angle+Math.PI, this.width/Math.cos(angle)));
                angle = Math.PI - angle;
            } else {
                int = intSegSeg(last, this.sides[0]);
                if (int) {
                    this.intersections.push(addAngle(int[0], -angle+Math.PI, -this.width/Math.cos(angle)));
                    last.p2.set(...addAngle(int[0], -angle+Math.PI, -this.width/Math.cos(angle)));
                }
                angle = -Math.PI - angle;
            }
            pos = last.p2;
            this.segments.push(last);
        }
    }

    draw(ctx) {
        for(const s of this.segments) {
            s.draw(ctx, {lineWidth: this.width*2, color: "yellow"});
        }

        for(const i of this.intersections) {
            i.draw(ctx, {size: this.width, color: "yellow"});
        }
    }
}