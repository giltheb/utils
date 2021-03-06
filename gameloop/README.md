
# Game Loop
Javascript Game Loop with configurable FPS.

That is the gameloop that most html game use, it should give a consistent 60fps but you don't have much control over it.
```javascript
function draw(){
requestAnimationFrame(draw);
}
```
That is the way this gameloop works.
```javascript
function loop(){
/*  static lastTime */
var now=now();
var frame=0;

   while(lastTime<now){
    lastTime+=1000/fps;
    frame++;
    }

    requestAnimationFrame(draw);
    
  setTimeout(loop, lastTime-now+1);
  }
```
As you can see it uses "requestAnimationFrame" to call draws, which is good.

It increments the next frame timing step by step, it is entirely isolate from the "setTimeout" or "requestAnimationFrame" behavior so you have a total control over it.



# Usage
```javascript
var gameLoop=new GameLoop(initialze,process,draw); //optional arguments, functions called by the gameloop
    gameLoop.fps=8;
    gameLoop.startTime=gameLoop.state.creationTime+1000;

function initialize() {
 }//end initialize   

function process(frameCount,fps) {
 }//end process

function draw() {
  }//end draw
```
the method start(time) starts the gameloop, easy enough. You can set it to -1 for an autostart.

The function initialize() is used to catch events that will affect the gameloop. As for now, only fps has been implemented.

The gameloop will call your process() method where you can retrieve the states that helped build the current frame: frameCount, fps.

The frameCount tells you how many frames at the current fps had occurred since last loop, you can use it to synchronize time dependent features of your game (idle mode, physic engine etc.), the ideal time from the last frame can be calculate in seconds as frameCount/fps.

A frameCount greater than 1 means you have been in idle mode (requestAnimationFrame pause itself when its window is hidden) or it means that you are losing frames, the fps asked is too high for your application.

# Demo
* [stopwatch](https://giltheb.github.io/utils/gameloop/example/stopwatch.html)
* [incremental](https://giltheb.github.io/utils/gameloop/example/incremental.html)

