class Controller {
    constructor(center, AI=false) {
        this.center = center;
        this.angle = 0;
        this.shoot = false;


        this.useAI = AI ? true: false;
        this.brain = new NeuralNetwork(AI);
        if(!AI) {
            this.addHandlers();
        }
    }

    addExample(ex) {
        this.brain.addExample({input: ex, output: [this.angle/Math.PI]});
    }

    update(flatGrid) {
        if(this.useAI) {
            this.angle = this.brain.run(flatGrid)[0];
            this.angle *= Math.PI;
            this.shoot=true;
        }
    }

    addHandlers() {
        document.addEventListener("mousemove", this.handleMouseMove.bind(this));
        document.addEventListener("mousedown", this.handleMouseDown.bind(this));
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }

    handleMouseMove(evt) {
        if(!this.useAI) this.angle = Math.PI + -getAngle(subtract(this.center, {x:evt.offsetX, y:evt.offsetY}));
    }

    handleMouseDown(evt) {
        this.useAI = false;
        this.shoot = true;
    }

    handleMouseUp(evt) {
        this.shoot = false;
    }
}