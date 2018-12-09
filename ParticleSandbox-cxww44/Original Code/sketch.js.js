/*
Particle sandbox

Controls:
	- Move the mouse around the interact with the particles.
	- Mouse click to reset the scene.
	- Hold middle mouse click to attract.

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/

var bobCount = 3000;
var bobs = [];
var globalHue;


function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 255);
	reset();
}


function draw() {
	background(10);
	for (let i = 0; i < bobs.length; i++) {
		let b = bobs[i];
		b.move();
		
		stroke(b.hue, b.bright, 255);
		
		// Exaggerate vector from lastPos to pos.
		let newPos = b.pos.copy();
		newPos.sub(b.lastPos);
		newPos.mult(15);
		newPos.add(b.pos);
		
		line(newPos.x, newPos.y, b.pos.x, b.pos.y);
	}
}


function mouseClicked() {
	reset();
}


function reset() {
	globalHue = random(255);
	
	bobs.splice(0, bobs.length);
	
	for (let i = 0; i < bobCount; i++) {
		bobs.push(new Bob(random(width), random(height)));
	}
	
	// Make sure mouse doesn't immediately effect particles.
	mouseX = -9999;
	mouseY = -9999;
	
	background(10);
}