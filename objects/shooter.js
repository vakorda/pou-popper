class Shooter {
    constructor(position, guySize, sides, height, AI=false) {
        this.pos = position;
        this.guySize = guySize;
        this.shooted = 0;
        this.current = this.generateGuy();
        this.line = new BouncingLine(position, Math.PI/2 + 30, sides, height, guySize);
        this.controller = new Controller(this.pos, AI);
    }

    update(flatGrid) {
        this.controller.update(flatGrid.concat(colorIndex(this.current.color)));
        if(this.controller.shoot) this.controller.addExample(flatGrid.concat(colorIndex(this.current.color)));
        

        this.line.angle = Math.max(Math.min(this.controller.angle, 3), 0.1);
        this.line.update();
        this.current.update();
        if(this.prev) {
            this.prev.update();
        } else if (this.controller.shoot) {
            this.shoot();
            this.controller.shoot = false;
            this.prev = this.current; 
            this.current = this.generateGuy();
        }
    }

    shoot() {
        this.shooted++;
        const path = this.line.getPath();
        this.current.path = path;
    }

    generateGuy(int=6) {
        return new Guy(...this.pos, this.guySize, randomColor(int));
    }

    draw(ctx) {
        this.line.draw(ctx);
        this.current.draw(ctx);

        if(this.prev) {
            this.prev.draw(ctx);
        }
    }
}