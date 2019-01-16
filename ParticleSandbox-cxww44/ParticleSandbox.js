/*
    Contains class definition used in the Particle Sandbox sketch adapted from OpenProcessing
    
    Original Author:
    Jason Labbe (jasonlabbe3d.com)
    
    This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. 
    To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ 
    or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

    (See README.MD for full documentation)
*/
class particle {
    constructor (x,y) {
        // Some key properties are assigned giving the particle a position, velocity and hue
        this.lastPos = new p5.Vector(x, y);
        this.pos = new p5.Vector(x, y);
        this.vel = new p5.Vector(0, 0);
        this.vel.mult(random(0.1));
        this.acc = new p5.Vector(0, 0);
        this.drag = random(0.98, 0.99);
        this.hue = (globalHue + random(-40, 40)) % 255;
        this.bright = random(255);
        this.time = new Date();
        // Default values are provided for properties which can be further changed by the user
        this.mouseThresh = 300;
        this.mult = 0.001;
        this.limit = 6;
        this.hueInc = 3;
    }
    // Get and set methods here handle measuring the time between two actions
    get timediff() {
        let time2 = new Date();
        let timediff = time2 - this.time;
        return timediff;
    }
    set date(time1) {
        this.time = time1;
    }
    // Get and set methods for changeable properties:
    getMult() {
        return this.mult;
    }
    getThresh() {
        return this.mouseThresh;
    }
    getLimit() {
        return this.limit;
    }
    getHueInc() {
        return this.hueInc;
    }
    setMult(mult) {
        this.mult = mult || this.mult;
    }
    setThresh(thresh) {
        this.mouseThresh = thresh || this.mouseThresh;
    }
    setLimit(drag) {
        this.limit = drag || 0;
    }
    setHueInc(hue) {
        this.hueInc = hue || 0;
    }
    // Move method calculates the movement of each particle, on interaction with the mouse.
    move() {
        // Sets last position equal to current position
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;
        this.vel.mult(this.drag);
        // Calculates distance between particle and mouse cursor
        let mouseDist = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        // Tests to see if the particle is close enough to the cursor to be affected (uses this.mouseThresh)
        if (mouseDist < this.mouseThresh) {
            let push = new p5.Vector(this.pos.x, this.pos.y);
            push.sub(new p5.Vector(mouseX, mouseY));
            push.normalize();
            push.mult((this.mouseThresh - mouseDist) * this.mult);
            this.acc.add(push);
            // Increments the hue value (by this.hueInc)
            this.hue += this.hueInc;
        } 
        // Calculates the velocity and limits it to a set value (this.limit)
        this.vel.add(this.acc);
        this.vel.limit(this.limit);
        this.pos.add(this.vel);
        this.acc.mult(0);
        // Keeps the particle in bounds on the screen (if it goes off one side it appears on the other)
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.lastPos.x = width;
        } 
        else if (this.pos.x > width) {
            this.pos.x = 0;
            this.lastPos.x = 0;
        }    
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.lastPos.y = height;
        } 
        else if (this.pos.y > height) {
            this.pos.y = 0;
            this.lastPos.y = 0;
        }
    }
    // Draw method involves code to test mouse inputs and move individual particles
    draw(particleCount = 3000, particles, set = false) {
        background(10);
        // Tests for right click, which resets the screen
        if (mouseIsPressed && mouseButton == RIGHT) {
            this.reset(particleCount, particles);
            // This removes the context menu, providing a clearer view on right click
            document.oncontextmenu = function(){
                return false;
            };  
        }
        // Tests for centre click, which toggles attract/repel
        if (mouseIsPressed && mouseButton == CENTER) {
            // This provides a set time (1 sec) between clicks to ensure clean switching for all particles
            if (this.timediff > 1000){
                try{
                    mult *= -1;
                }
                catch(error){
                    this.mult *= -1;
                }
                this.date = new Date();
            }	
        }
        // For loop provides calculation for each of the particles
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            // Runs move method for each particle
            p.move();
            // Resets hue to zero to keep the colours changing
            if (p.hue > 255){
                p.hue = 0;
            }
            // This tests for changes in any live contols, running set methods if so
            if (set == true){
                p.setMult(mult || 0.001);
                p.setThresh(thresh || 300);
                p.setLimit(drag || 0);
                p.setHueInc(hue || 0);
            }
            stroke(p.hue, p.bright, 255);
            // Exaggerates vector from lastPos to pos.
            let newPos = p.pos.copy();
            newPos.sub(p.lastPos);
            newPos.mult(15);
            newPos.add(p.pos);
            line(newPos.x, newPos.y, p.pos.x, p.pos.y);
        }
        // Ensures that the set variable is correctly reset to false
        set = false;
    }
    // Reset method runs on setup or reset of the screen, involves setting up the particles
    reset(particleCount = 3000, particles = []) {
        // Determines the global hue at random
        globalHue = random(255);
        particles.splice(0, particles.length);
        // Distributes a defined number of particles at random on the screen
        for (let i = 0; i < particleCount; i++) {
            particles.push(new particle(random(width), random(height)));
        }
        // Makes sure that the mouse doesn't immediately affect particles
        mouseX = -9999;
        mouseY = -9999;
        background(10);
    }
}
