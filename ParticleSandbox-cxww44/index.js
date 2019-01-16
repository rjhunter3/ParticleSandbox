/*
    Contains functions for interaction with the class defined in ParticleSandbox.js through the index.HTML

    (See README.MD for full documentation)
*/
// Assignment of some important variables
var particleCount = 3000;
var particles = [];
var globalHue;
var setmult = 0.001;
var setdrag = 6;
var setthresh = 300;
var sethue = 3;
var set = false;
// Setup function initialises the canvas and sets up a new particle object
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);
    c = new particle(particleCount, particles, globalHue);
    // Runs update function and the reset method of the particle to setup the particles
    update();
    c.reset(particleCount, particles);
}
// Draw function calls the draw method of the particle object
function draw() {
    c.draw(particleCount, particles, set);
}
// Revert function resets the screen and sets particleCount to the value defined by the user
function revert() {
    particleCount = document.getElementById('pCount').value;
    particles = [];
    c.reset(particleCount,particles);
}
// Defreset resets all changeable values on the example screen to their defaults in the original sketch
function defreset() {
    document.getElementById('pCount').value = 3000;
    document.getElementById('mult').value = 0.001;
    document.getElementById('drag').value = 6;
    document.getElementById('mouseThresh').value = 300;
    document.getElementById('hueChange').value = 3;
    update();
}
// Invert function toggles between attract/repel 
function invert() {
    setmult *= -1;
}
// Update function updates the variables with the user's values in the onscreen setting on the page
function update() {
    setmult = document.getElementById('mult').value;
    setdrag = document.getElementById('drag').value;
    setthresh = document.getElementById('mouseThresh').value;
    sethue = document.getElementById('hueChange').value;
    setdrag = parseInt(setdrag);
    sethue = parseInt(sethue);
    set = true;
}
