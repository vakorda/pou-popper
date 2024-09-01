const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.height = Math.min(window.innerHeight, window.innerWidth);
canvas.width = canvas.height;


const gridLength = 10

const filled = 4;

const world = new World(canvas.height, canvas.width, gridLength, gridLength, filled);

world.draw(ctx);


animate();

function animate(t) {
    
    world.update();
    
    canvas.height = canvas.height;

    world.draw(ctx);
 
    requestAnimationFrame(animate);
}