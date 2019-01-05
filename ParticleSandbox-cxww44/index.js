var particleCount = 3000;
var particles = [];
var globalHue;
var changemult = 0.001;
var changedrag = 6
var changethresh = 300;

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
    var particleCount = ("input#pCount").val()
    c.reset(particleCount,particles)
}
function update() {
    changemult = document.getElementById("mult").value
    changedrag = document.getElementById("drag").value
    changethresh = document.getElementById("mouseThresh").value
    console.log(changedrag)
    //c.setmult(changemult)
    //c.setdrag(changedrag)
    //c.setthresh(changethresh)
}
//document.getElementById("mult").addEventListener("Change",Update);
//document.getElementById("drag").addEventListener("Change",Update);
//document.getElementById("mouseThresh").addEventListener("Change",Update);