
class particle {
    constructor (x,y) {
        this.lastPos = new p5.Vector(x, y);
        this.pos = new p5.Vector(x, y);
        this.vel = new p5.Vector(0, 0);
        this.vel.mult(random(0.1));
        this.acc = new p5.Vector(0, 0);
        this.drag = random(0.98, 0.99);
        this.hue = (globalHue + random(-40, 40)) % 255;
        this.bright = random(255);
		this.mouseThresh = 300
		this.mult = 0.001
		this.time = new Date()
		
    }
	get timediff() {
		let time2 = new Date()
		let timediff = time2 - this.time
		return timediff
	}
	set date(time1) {
		this.time = time1
	}
	
    move() {
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;

        this.vel.mult(this.drag);
        
        let mouseDist = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        
        if (mouseIsPressed && mouseButton == LEFT) {
			//let time2 = new Date()
			//let timediff = time2 - this.time
			// This provides a set time between left clicks to ensure clean switching between attract/repel
            if (this.timediff > 1000){
				this.mult *= -1;
				this.date = new Date()
			}
		
			
        }
            
        if (mouseDist < this.mouseThresh) {
          let push = new p5.Vector(this.pos.x, this.pos.y);
          push.sub(new p5.Vector(mouseX, mouseY));
          push.normalize();
          push.mult((this.mouseThresh - mouseDist) * this.mult);
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
    draw(particleCount, particles) {
        background(10);
        if (mouseIsPressed && mouseButton == RIGHT) {
            this.reset(particleCount, particles)
			// This removes the context menu, providing a clearer view on right click
			document.oncontextmenu = function(){
				return false
			}
        }
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.move();
                
            stroke(p.hue, p.bright, 255);
                
            // Exaggerate vector from lastPos to pos.
            let newPos = p.pos.copy();
            newPos.sub(p.lastPos);
            newPos.mult(15);
            newPos.add(p.pos);
                
            line(newPos.x, newPos.y, p.pos.x, p.pos.y);
    } 
    
            
    }
    reset(particleCount, particles) {
        globalHue = random(255);
        
        particles.splice(0, particles.length);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new particle(random(width), random(height)));
        }
        
        // Make sure mouse doesn't immediately affect particles.
        mouseX = -9999;
        mouseY = -9999;
        
        background(10);
    }
    

}
