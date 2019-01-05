var particleCount = 3000;
var particles = [];
var globalHue;
var changemult = 0.001;
var changedrag = 6
var changethresh = 300;
var changehue = 1;

function setup() {

    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);
    c = new particle(particleCount, particles, globalHue)
    update()
    c.reset(particleCount, particles);


}
function draw() {
    c.draw(particleCount, particles)
}
function revert() {
    particleCount = document.getElementById("pCount").value
    particles = []
    c.reset(particleCount,particles)
    console.log(particleCount)
}
function defreset() {
    document.getElementById('pCount').value = 3000;
    document.getElementById('mult').value = 0.001;
    document.getElementById('drag').value = 6;
    document.getElementById('mouseThresh').value = 300;
    document.getElementById('hueChange').value = 1;
    update()

}
function invert() {
    changemult *= -1
}
function update() {
    changemult = document.getElementById("mult").value
    changedrag = document.getElementById("drag").value
    changethresh = document.getElementById("mouseThresh").value
    changehue = document.getElementById("hueChange").value
    console.log(changehue)
    //c.setmult(changemult)
    //c.setdrag(changedrag)
    //c.setthresh(changethresh)
}
//document.getElementById("mult").addEventListener("Change",Update);
//document.getElementById("drag").addEventListener("Change",Update);
//document.getElementById("mouseThresh").addEventListener("Change",Update);