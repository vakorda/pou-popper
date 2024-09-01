
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.height = Math.min(window.innerHeight, window.innerWidth);
canvas.width = canvas.height;


const gridLength = 10

const filled = 6;


randomizer = new Randomizer(false);
/* 
const AI2 = new brain.NeuralNetwork().fromJSON(JSON.parse(localStorage.getItem("NN0")));
let world = new World(canvas.height, canvas.width, gridLength, gridLength, filled, AI2);


animate();

function animate(t) {
    
    world.update();
    
    canvas.height = canvas.height;

    world.draw(ctx);
 
    requestAnimationFrame(animate);
} */

const AI = new brain.NeuralNetwork().fromJSON(JSON.parse(localStorage.getItem("NN0")));
//const AI = new brain.NeuralNetwork().fromJSON(JSON.parse(localStorage.getItem("baseNN")));

const trainLength = 20;
const worlds = [];

randomizer = new Randomizer(false);
let world = new World(canvas.height, canvas.width, gridLength, gridLength, filled, AI);
worlds.push(world);

for(let i=0; i<trainLength; i++){
    let world = new World(canvas.height, canvas.width, gridLength, gridLength, filled, AI);
    world.grid = worlds[0].grid.copy();
    world.mutate(0.9);
    worlds.push(world);
}

//worlds[0].draw(ctx);
/* let randoms = new Array(30).map(v=>Math.random());
randomizer = new Randomizer(randoms);
while(worlds[0].shooter.shooted < 30 && !worlds[0].grid.checkRow(gridLength-1)) {
    
    worlds[0].update();
    canvas.height = canvas.height;
    worlds[0].draw(ctx);
    
} */


TrainWorlds(worlds, worlds.length, 2000, 3, 0.9);


function TrainWorlds(worldArray, instances, repetitions, keep, mutationRate) {
    for(let i=0; i<repetitions; i++) {
        console.log("repetition: ", i);
        let numProjectiles = 2; 
        let randoms = new Array(numProjectiles).map(v=>Math.random());
        for (let j=0; j<worldArray.length; j++) {
            randomizer = new Randomizer(randoms);
            /* console.log(worldArray[j].grid.grid[5].map(v=> v.color)); */
            while(worldArray[j].shooter.shooted < numProjectiles && !worldArray[j].grid.checkRow(gridLength-1)) {
                //worldArray[j].draw(ctx);
                worldArray[j].update();
                //console.log(worldArray[j].score)
            }
            if(worldArray[j].grid.checkRow(gridLength-1)) {
                worldArray[j].score = 0
            }

        }

        worldArray.sort(function(a, b) {return b.score - a.score;});
        console.log("max score:", worlds[0].score);
        /* console.log(worldArray.map(w=> w.score)); */


        randomizer = new Randomizer(false);
        worldArray[0].fillgrid(6)
        worldArray[0].score = 0;
        worldArray[0].shooter.shooted = 0;

        for(let i=1; i<keep; i++) {
            worldArray[i].grid = worldArray[0].grid.copy()
            worldArray[i].score = 0;
            worldArray[i].shooter.shooted = 0;
        }

        for (let j=keep; j<instances; j++) {
            let world = new World(canvas.height, canvas.width, gridLength, gridLength, filled, worldArray[j%3].shooter.controller.brain.network);
            world.grid = worldArray[0].grid.copy()
            world.mutate(mutationRate);
            worldArray[j] = world;
        }
        


    }
}


localStorage.setItem("NN0", JSON.stringify(worlds[0].shooter.controller.brain.toJSON()))


randomizer = new Randomizer(false);

world = worlds[0];

animate();

function animate(t) {
    
    world.update();
    
    canvas.height = canvas.height;

    world.draw(ctx);
 
    requestAnimationFrame(animate);
}