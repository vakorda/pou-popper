class Randomizer {
    constructor(seed = [0.1456137518479267 ,
                        0.43434565791640267 ,
                        0.4478047076663021 ,
                        0.5441000289186719 ,
                        0.5095425748531721 ,
                        0.9687487628286725 ,
                        0.8862281092767782 ,
                        0.22360749034120364 ,
                        0.863712210726896 ,
                        0.5004971359578345]) {
        this.seed = seed;
        this.int = 0
    }

    next() {
        if(this.seed) return this.seed[++this.int % this.seed.length]

        return Math.random();
    }
}