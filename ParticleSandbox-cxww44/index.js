var particleCount = 3000;
var particles = [];
var globalHue;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);
    c = new particle(particleCount, particles, globalHue)
    c.reset(particleCount, particles);
}
function draw() {
    c.draw(particleCount, particles)
}