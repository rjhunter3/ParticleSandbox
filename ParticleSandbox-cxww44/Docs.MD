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

### `setvals()`

This set method updates all changeable properties, `this.mult`, `this.mouseThresh`, `this.limit` and `this.hueinc` when a change is made by the user from the HTML page, by grouping all variables together in a single set method, space is saved. For two of these variables, zero is given as secondary inputs to prevent possible errors when primary inputs have been interpreted as 'falsey' by JS.

### `move()`

This method concerns the calculation of the movement of each particle, and involves interpreting the user's interaction with the mouse. Initially, the position of the particle is calibrated and the distance from the particle and the mouse cursor determined. Then, the changeable property `this.mouseThresh` is used to determine if the particle lies within the area within which it can be interacted with and moved. Also, if the particle does indeed lie within this area, this code increments the hue value of the particle through the changeable property `this.hueinc`. After this, the velocity is calculated and limited by the changeable proprty `this.limit`, and the particle is kept in the screen bounds, so that is it is kept on the screen.

### `draw()`

This method involves calculation for each particle and tests for some mouse inputs. Initially, a test for right click is performed, if a right click is detected the screen is reset. Then a test for centre mouse click is performed, if this return true, the effect of the mouse cursor on the particles is toggled between 'attract' and 'repel', in order to solve an issue deriving from multiple middle clicks in quick succession, the time difference get and set methods are used here to ensure that at least one second has passed between successive middle clicks (if this were not the case, it was possible for some particles to attract and some others to repel). Next, for each of the particles, the `move()` method is called and a test for changes in the controls is performed, linking to the `setvals()` method if a change is indeed detected.

### `reset()`

This method runs on setup or reset of the sketch, and involves setting up the screen. The global hue is determined at random, and multiple particles, the number of which determined by `particleCount`, are created and placed on the screen.

## Explanation - Example page

Note - See code comments for step-by-step explanation of the code

The example page constructed uses index.html and index.js to provide form controls and manage interaction of the sketch with the JS DOM. The page contains the Particle Sandbox sketch and an inobtrusive control panel containing 8 form controls:

### Number of Particles

This input is fairly self-explanatory, when this value is changed by the user, the sketch resets with the new amount of particles. The maximum amount of particles avaliable is 10000, however, for many users this can be slow due to hardware limitations. The default value is therefore 3000, the same as the original sketch, and for users with less powerful machines it is recommended to lower this value if excessive lag is experienced, in order to fully enjoy the sketch.

### Acceleration

This slider input changes how fast the particles react to the mouse input, and attain their maximum speed. 

### Speed Limit

This slider input alters the limit on the speed which the particles can achieve.

### Mouse Threshold

This slider input limits size of the area of particles affected by the presence of the mouse cursor.

### Hue Rate of Change

This slider input alters the rate at which the hue of the particles affected by the presence of the mouse changes. Note that this feature can be turned off altogether by dragging the slider to its leftmost value.

### Invert

Toggles between the attract/repel effects of the presence of the mouse. Note that the middle mouse click also performs this same function.

### Default

Resets all form controls to their default values, most of these default values are the same as in the original sketch, with the exception of the hue rate of change as this is a completely new feature.

### Clear Screen

Quite self-explanatory. This clears the screen, with the clear sketch retaining the slider values and particle count given.
