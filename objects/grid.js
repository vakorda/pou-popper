class Grid {
    constructor(height, width, pxHeight, pxWidth, grid=null) {
        this.height = height;
        this.width = width;
        this.pxHeight = pxHeight;
        this.pxWidth = pxWidth;

        if(grid){
            this.grid = grid;
        } else {
            this.emptyGrid();
        }
    }

    checkRow(row) {
        for (let i =0; i<this.width; i++) {
            if (this.grid[row][i]) return true;
        }

        return false;
    }

    copy() {
        const result = [];

        for(let i=0; i<this.height; i++) {
            result.push([]);
            for(let j=0; j<this.width; j++) {
                result[i].push(this.grid[i][j]);
            }
        }

        return new Grid(this.height, this.width, this.pxHeight, this.pxWidth, result);
    }

    representation() {
        return this.grid.flat().map(v => colorIndex(v ? v.color : v) + 1);
    }

    emptyGrid() {
        this.grid = [];
            for(let i=0; i<this.height; i++) {
                this.grid.push([])
                for(let j=0; j<this.width; j++) {
                    this.grid[i].push(undefined);
                }
            }
    }

    tryMatch(w, h) {
        let same = this.searchSameColor(w, h);
        if(same.length > 2) {
            let count = same.length;
            this.removeMultiple(same);
            same = this.searchFalling();
            //count += this.onlyKeep(same);
            this.onlyKeep(same)
            return count;
        }
        return 0;
    }

    getGridPos(px, py) {
        return new Point(
                    Math.floor(px/this.pxWidth * this.width),
                    Math.floor(py/this.pxHeight * this.height)
        );
    }

    searchFalling() {
        let current;
        const stack = [];
        const checked = new Set();
        const result = [];
        let currentIndex;

        for (let i=0; i<this.width; i++) {
            stack.push([i, 0]);
        }

        while(stack.length > 0) {
            currentIndex = stack.shift();
            if(!checked.has(currentIndex.toString())) {
                checked.add(currentIndex.toString());
                current = this.get(...currentIndex);
                if(current) {

                    current.draw(ctx, {stroke:"yellow"});

                    stack.push(
                        ...this.getAdjacent(...currentIndex)
                    );

                    result.push(currentIndex);
                }

            }
        }

        return result
    }

    searchSameColor(w, h) {
        let current = this.get(w, h);
        if (!current) return [];

        const color = current.color;

        const stack = [[w, h]];
        const checked = new Set();
        const result = [];
        let currentIndex;

        while(stack.length > 0) {
            currentIndex = stack.shift();
            if (!checked.has(currentIndex.toString())) {
                checked.add(currentIndex.toString());
                current = this.get(...currentIndex);
                if (current && current.color == color){
                    stack.push(
                        ...this.getAdjacent(...currentIndex)
                    );
                    /* result.push([current, currentIndex]); */
                    result.push(currentIndex);
                }
            }
        }
        return result;
    }

    getAdjacent(w, h) {
        return [
            this.moveUp(w, h),
            this.moveDown(w,h),
            this.move1(w,h),
            this.move2(w,h)
        ]
    }

    moveUp(w, h) {
        return [w, h-1];
    }
    moveDown(w, h) {
        return [w, h+1];
    }
    move1(w, h) {
        return [w-1, h];
    }
    move2(w, h) {
        return [w+1, h];
    }

    get(w, h) {
        if(h < 0 || h >= this.height || w < 0 || w >= this.width) return undefined;
        return this.grid[h][w];
    }

    getMultiple(items) {
        return(items.map(i => this.get(...i)));
        
    }

    set(w, h, other) {
        other.pos.set(
            this.pxWidth/this.width*w + this.pxWidth/this.width/2,
            this.pxHeight/this.height*h + this.pxHeight/this.height/2
        )
        this.grid[h][w] = other;
    }

    removeMultiple(items) {
        for(const i of items) {
            this.remove(...i);
        }
    }

    pop(w, h) {
        const poped = this.grid[h][w];
        this.grid[h][w] = undefined;
        return poped;
    }

    remove(w, h) {
        if(this.get(w, h) != undefined){ 
            this.grid[h][w] = undefined;
            return 1;
        }
        return 0;
    }

    onlyKeep(items) {
        const remove = [];
        let count = 0;

        for(let i=0; i<this.height; i++) {
            remove.push([])
            for(let j=0; j<this.width; j++) {
                remove[i].push(true);
            }
        }

        for(const i of items) {
            remove[i[1]][i[0]] = false;
        }

        for(let i=0; i<this.height; i++) {
            for(let j=0; j<this.width; j++) {
                if(remove[i][j]) {
                    let removed = this.remove(j, i);
                    if (removed) count++;
                }
            }
        }
        return count;
    }

    drawGrid(ctx, {color="white", lineWidth=4} = {}) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        const halfLineWidth = Math.floor(lineWidth/2);
        for(let i=0; i<this.height; i++) {
            ctx.beginPath();
            ctx.moveTo(0-halfLineWidth, this.pxHeight/this.height * i -halfLineWidth);
            ctx.lineTo(this.pxWidth-halfLineWidth, this.pxHeight/this.height * i - halfLineWidth);
            ctx.stroke();
        }
        for(let i=0; i<this.width; i++) {
            ctx.beginPath();
            ctx.moveTo(this.pxWidth/this.width * i - halfLineWidth, 0-halfLineWidth);
            ctx.lineTo(this.pxWidth/this.width * i - halfLineWidth, this.pxHeight-halfLineWidth);
            ctx.stroke();
        }
    }

    update() {
            this.onlyKeep(this.searchFalling());
    }

    draw(ctx, {color="white", lineWidth=4, drawGrid=false} = {}) {
        if(drawGrid) this.drawGrid(ctx,{color:color, lineWidth:lineWidth});

        for(let i=0; i<this.height; i++) {
            for(let j=0; j<this.width; j++) {
                if(this.grid[i][j]) {
                    this.grid[i][j].draw(ctx);
                }
            }
        }
    }
}