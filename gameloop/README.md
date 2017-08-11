# Game Loop
Game Loop with configurable FPS for HTML animation.

That is the gameloop that most html game use, it should give a consistent 60fps but you don't have much control over it.
```javascript
function draw(){
requestAnimationFrame(draw);
}
```
That is the way this gameloop works.
```javascript
function loop(){
var frameTime=Date.now();
var frame=0;

   while(expectedFrameTime<frameTime){
    expectedFrameTime+=1000/fps;
    frame++;
    }

    requestAnimationFrame(draw);

  setTimeout(loop, expectedFrameTime-frameTime+1);
  }
```
As you can see it uses "requestAnimationFrame" to call draws, which is good.

It increments the next frame timing step by step, it is entirely isolate from the "setTimeout" or "requestAnimationFrame" behavior so you have much more control over it.


# Usage
It is more a proof of concept than a proper implementation, you can still use it if you like.
```javascript
var gameLoop=new GameLoop(draw,setup,initialze); //optional arguments, functions called by the gameloop
    gameLoop.fps=8;
    gameLoop.startTime=gameLoop.creationTime+1000;

function initialize() {
 }//end initialize   

function setup(fps,frameCount,timeStamp) {
 }//end setup

function draw() {
  }//end draw
```
startTime starts the gameloop, easy enough. You can set it to -1 for an autostart.

The function initialize() is used to catch events that will affect the gameloop. As for now, only fps has been implemented.

The gameloop will call your setup() function where you can retrieve the states that helped build the current frame: fps, frameCount and timeStamp.

The frameCount tells you how many frames at the current fps had occurred since last call, you can use it to synchronize time dependent features of your game (idle mode, physic engine etc.), the ideal time from the last frame can be calculate in seconds as frameCount/fps.

A frameCount greater than 1 means you have been in idle mode (requestAnimationFrame pause itself when its window is hidden).
Or it means you are losing frames, the fps asked is too high for your application.

The timestamp can be used as a unique identifier for the current frame, you should not use it for your time dependent features as you can't really predict its stability, use the ideal time described above instead.

# Demo
* [clock](https://giltheb.github.io/utils/gameloop/example/clock.html)
* [incremental](https://giltheb.github.io/utils/gameloop/example/incremental.html)
* [matrix](https://giltheb.github.io/utils/gameloop/example/matrix.html)
