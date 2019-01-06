# Documentation - Particle Sandbox
## Introduction

The particle sandbox class is an adaptation of the sketch 'Particle Sandbox' by Jason Labbe from OpenProcessing.org ([source](https://www.openprocessing.org/sketch/605835)) 
into a reuseable component using a javascript class conforming to the 
COMP1101 Programming Summative Assessment specifications ([available here](https://github.com/stevenaeola/gitpitch/blob/master/prog/assessment_p5/README.md)).

## Licence

The licence used for this work is the Creative Commons Attribution ShareAlike 3.0 Unported (CC BY-SA 3.0) licence as seen below, as this is the
same licence used by the original author of the code and the licence requires that all further distributions of the material should be
distributed under the same licence.

This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

See LICENCE.MD to view a full offline copy of the licence.

Also included in code used from other licences is p5.js Licenced under LGPL 2.1.

## Files Included

Included with this documentation are the following files:

- Folder containing a copy of the original code and files created by Jason Labbe downloaded directly from [OpenProcessing](https://www.openprocessing.org/sketch/605835)
- LICENCE.MD containing a full offline copy of the licence of this distribution
- ParticleSandbox.js containing the class definition
- index.html and index.js containing HTML and javascript to set up the example page and provide form controls

## Controls and Features

- The example HTML page provides form controls to change values of variables
- Alike the original, right click resets the screen 
- Middle mouse button toggles between attract/repel, but there's no need to hold middle mouse button as in the original.
- Deviating from the original, moving particles now change hue, the speed of which can be determined by the user in the HTML form controls.

## Explanation - ParticleSandbox.js

Note - See code comments for step-by-step explanation of the code

### `constructor(x,y)`

This provides means to set up the particle class with parameters `x` and `y` denoting the x position and y position of the particle on the user's screen respectively. In additon to using these x and y parameters to setup vectors, to properties such as `this.pos` and `this.vel`, other properties are setup with their default values, including the properties which the user can go on to change with the form controls in the example, `this.mult`, `this.limit`, `this.mousethresh1` and `this.hueinc`.

### `get timediff()` and `set date(time1)`

Both of these get and set methods involve setting up a `timediff` variable in the get method which determines the time between two actions. Through the use of the seperate set method, which sets the property `this.time` to be updated with the past time when an action occurred, and the get method, which calculates the difference between this set time and the current time, such time differneces can be established. This was needed in this example, as using the centre mouse click to toggle the attract/repel feature in particles in quick succession proved problematic and this sets a 1 second window between changes.
