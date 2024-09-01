function lerp(A, B, p) {
    return (B-A)*p + A
}

function lerpPoint(p1, p2, t) {
    return new Point(lerp(p1.x, p2.x, t), lerp(p1.y, p2.y, t));
}

function randomColor(int=6) {
    //return ["red", "blue", "green", "pink", "white", "cyan"][Math.floor(Math.random()*int)]
    return ["red", "blue", "green", "pink", "white", "cyan", "grey"][Math.floor(randomizer.next()*int)]
}

function colorIndex(color) {
    if (!color) return -1;
    return ["red", "blue", "green", "pink", "white", "cyan", "grey"].indexOf(color);
}

function addAngle(p1, angle, distance) {
    return new Point(p1.x + Math.cos(angle)*distance, p1.y + Math.sin(angle)*distance);
}

function subtract(p1, p2) {
    return new Point(p1.x-p2.x, p1.y-p2.y);
}

function add(p1, p2) {
    return new Point(p1.x+p2.x, p1.y+p2.y);
}

function dot(p1, p2) {
    return p1.x*p2.x + p1.y*p2.y
}

function mult(p1, scalar) {
    return new Point(p1.x * scalar, p1.y *scalar)
}

function vecSameSign(p1, p2) {
    return  Math.sign(p1.x) == Math.sign(p2.x) && Math.sign(p1.y) == Math.sign(p2.y)
}

function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function getAngle(p) {
    return Math.atan2(p.y, p.x);
}

function intSegSeg(s1, s2) {
    let A, B, C, D;
    if(s2.p1.x != s2.p2.x) {
        A = s1.p1;
        B = s1.p2;
        C = s2.p1;
        D = s2.p2;
    } else {
        C = s1.p1;
        D = s1.p2;
        A = s2.p1;
        B = s2.p2;
    }

    const t1 = (A.x - C.x) / (D.x - C.x);
    const t2 = (B.x - C.x) / (D.x - C.x);

    // (D - C) * t1 + C
    const p1 = add(mult(subtract(D, C), t1), C)
    const p2 = add(mult(subtract(D, C), t2), C)

    const t = ((p1.x - A.x) - (p1.y - A.y)) / ((B.x-A.x-p2.x+p1.x) - (B.y-A.y-p2.y+p1.y))

    if (t < 0 || t > 1) return null;
    
    const point = add(mult(subtract(B, A), t), A);

    if(!vecSameSign(subtract(C, point), subtract(C, D)) || !vecSameSign(subtract(D, point), subtract(D, C))) return null;

    return [point, distance(p1, point)];

}

function intCircCirc(p1, r1, p2, r2) {
    return distance(p1, p2) < (r1 + r2)
}