class World {
    constructor(height = 5, width = 5, gridHeight, gridWidth, fill=0, AI=false) {
        this.level=0;
        this.score=0;
        this.height=height;
        this.width=width;
        this.gridHeight = gridHeight;
        this.gridWidth = gridWidth;

        this.grid = new Grid(gridHeight, gridWidth, height, width);
        this.shooter = new Shooter(
                            new Point(
                                this.width/2,
                                this.height - this.height/this.gridHeight/2-5
                            ),
                            this.height/this.gridHeight/2,
                            [0, width],
                            height,
                            AI
                        );

        this.fillgrid(fill);
    }

    mutate(percentage) {
        this.shooter.controller.brain.mutate(percentage);
    }

    fillgrid(fill) {
        this.grid.emptyGrid();
        for(let i=0; i<fill; i++) {
            for(let j=0; j<this.grid.width; j++) {
                const guy = new Guy(0, 0, this.height/this.gridHeight/2, randomColor());
                this.grid.set(j, i, guy)
            }
        }
    }

    update() {
        this.grid.update();
        this.shooter.update(this.grid.representation());

        if(this.shooter.prev){
            let pos;
            for(let i=this.gridHeight-1; i>=0; i--) {
                if(!this.shooter.prev) break;
                for(let j=0; j<this.gridWidth; j++) {
                    if(!this.shooter.prev) break;
                    const target = this.grid.get(j, i);

                    if (target && target.istouching(this.shooter.prev, 0.6)){
                        let dir = target.direction(this.shooter.prev);

                        if(Math.sign(dir) == -1) {
                            dir = Math.PI*2+dir// > Math.PI? Math.PI - dir: - dir;
                        }
                        
                        if (dir > Math.PI/4 && dir < Math.PI*3/4) {
                            pos = this.grid.moveDown(j, i);
                        } else if (dir > Math.PI*3/4 && dir < Math.PI*5/4) {
                            pos = this.grid.move1(j, i);
                        } else if (dir > Math.PI*5/4 && dir < Math.PI*7/4) {
                            //pos = this.grid.moveUp(j, i);
                            continue;
                        } else {
                            pos = this.grid.move2(j, i);
                        }                  
                        
                        this.shooter.prev.path = null;
                        this.grid.set(...pos, this.shooter.prev);
                        this.score += this.grid.tryMatch(...pos);
                        this.shooter.prev = undefined;
                    }
                }
            }

            if(this.shooter.prev && this.shooter.prev.pos.y < this.height/this.gridHeight/2) {
                pos = this.grid.getGridPos(...this.shooter.prev.pos);
                this.shooter.prev.path = null;
                this.grid.set(...pos, this.shooter.prev);
                this.score += this.grid.tryMatch(...pos);
                this.shooter.prev = undefined;
            }
        }
    }

    draw(ctx) {
        this.shooter.draw(ctx);
        this.grid.draw(ctx);
    }
}