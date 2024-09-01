class NeuralNetwork {
    constructor(network) {

        if (network) {
            this.network = new brain.NeuralNetwork().fromJSON(network.toJSON());
        } else {

            this.network = new brain.NeuralNetwork({
                layers: [
                { type: 'dense', size: 50, activation: 'leaky-relu' },
                { type: 'dense', size: 20, activation: 'leaky-relu' },
                { type: 'dense', size: 20, activation: 'leaky-relu' },
                { type: 'dense', size: 10, activation: 'leaky-relu' },
                { type: 'output', size: 1, activation: 'sigmoid' } // Output layer with Softmax activation
                ]
            });
        }

        this.examples = [];
        //nn.train([{ input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } }]);
    }

    mutate(percentage) {
        for(let i=1; i<this.network.biases.length; i++) {
            for(let j=0; j<this.network.biases[i].length; j++) {
                let rval = Math.random();
                if(rval < percentage) {
                    this.network.biases[i][j] += (Math.random()*4 - 2) * rval
                }
            }
        }

        for(let i=1; i<this.network.weights.length; i++) {
            for(let j=0; j<this.network.weights[i].length; j++) {
                for(let k=0; k<this.network.weights[i][j].length; k++){
                    let rval = Math.random();
                    if(rval < percentage) {
                        this.network.weights[i][j][k] += (Math.random()*4 - 2) // * rval;
                    }
                }
            }
        }
    }

    getcopy() {
        this.fromJSON(this.toJSON());
    }

    fromJSON(json) {
        this.network.fromJSON(json);
    }

    toJSON() {
        return this.network.toJSON();
    }

    addExample(ex) {
        this.examples.push(ex);
    }

    train() {
        this.network.train(this.examples);
    }

    run(input) {
        return this.network.run(input);
    }
}