var particleCount = 3000;
var particles = [];
var globalHue;

function setup() {

    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);
    c = new particle(particleCount, particles, globalHue)
    c.reset(particleCount, particles);

    var gui = new dat.GUI();
    gui.add(c, 'name');
    gui.add(c, 'switch');
}
function draw() {
    c.draw(particleCount, particles)
}