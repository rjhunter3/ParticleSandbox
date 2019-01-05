var particleCount = 3000;
var particles = [];
var globalHue;
var setmult = 0.001;
var setdrag = 6;
var setthresh = 300;
var sethue = 1;
var set = false

function setup() {

    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);
    c = new particle(particleCount, particles, globalHue)
    update()
    c.reset(particleCount, particles);


}
function draw() {
    c.draw(particleCount, particles, set)
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
    setmult *= -1
}
function update() {
    setmult = document.getElementById("mult").value
    setdrag = document.getElementById("drag").value
    setthresh = document.getElementById("mouseThresh").value
    sethue = document.getElementById("hueChange").value
    setdrag = parseInt(setdrag)
    sethue = parseInt(sethue)
    console.log(setthresh)
    set = true
    //c.setmult(changemult)
    //c.setdrag(changedrag)
    //c.setthresh(changethresh)
}
//document.getElementById("mult").addEventListener("Change",Update);
//document.getElementById("drag").addEventListener("Change",Update);
//document.getElementById("mouseThresh").addEventListener("Change",Update);