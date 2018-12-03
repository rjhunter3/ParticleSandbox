function Bob(x, y) {
  
	this.lastPos = new p5.Vector(x, y);
  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
	this.vel.mult(random(0.1));
  this.acc = new p5.Vector(0, 0);
  this.drag = random(0.98, 0.99);
	this.hue = (globalHue + random(-40, 40)) % 255;
	this.bright = random(255);
	
  this.move = function() {
		this.lastPos.x = this.pos.x;
		this.lastPos.y = this.pos.y;
		
		// Add some air drag so it can eventually settle.
		this.vel.mult(this.drag);

    // Push it away from the mouse.
    let mouseDist = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    let mouseThresh = 300;
    
		let mult = 0.001;
		if (mouseIsPressed && mouseButton == CENTER) {
			mult *= -1;
		}
		
    if (mouseDist < mouseThresh) {
      let push = new p5.Vector(this.pos.x, this.pos.y);
      push.sub(new p5.Vector(mouseX, mouseY));
      push.normalize();
      push.mult((mouseThresh - mouseDist) * mult);
      this.acc.add(push);
    }
		
		// Move it.
		this.vel.add(this.acc);
		this.vel.limit(6);
		this.pos.add(this.vel);
		this.acc.mult(0);
		
		// Keep in bounds.
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.lastPos.x = width;
		} else if (this.pos.x > width) {
			this.pos.x = 0;
			this.lastPos.x = 0;
		}
		
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.lastPos.y = height;
		} else if (this.pos.y > height) {
			this.pos.y = 0;
			this.lastPos.y = 0;
		}
	}
	
}