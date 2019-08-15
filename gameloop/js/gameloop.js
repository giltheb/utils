/*
license CC BY 4.0 GiLTheB,2017
*/

GameLoop = function(initialize,process,draw) {
    this.initialize=initialize||function(){};
    this.process=process||function(){};
    this.draw=draw||function(){};
    this.fpsTarget=8;
    this.oldFps=8;
    this.creationTime=performance.now();
    this.lastTime=-1;
    this.timer=null;
    }//end constructor

GameLoop.prototype.run = function(){
    var that=this;   
    var frame=0;

    var now=performance.now();
    var resync=this.lastTime;
    var target=1000/this.fpsTarget;
 
      while(resync<now){resync+=target;frame++;}

      this.initialize();
      this.process(frame,this.oldFps);
      requestAnimationFrame(function(){that.draw()});
     
      this.oldFps=this.fpsTarget;
      this.lastTime=resync;

      this.timer=setTimeout(function(){that.run()},resync-now+1);
    }//end run

GameLoop.prototype.stop = function(){
    clearTimeout(this.timer);
    }//end stop

GameLoop.prototype.start=function(v){
        var that = this;
        var now=performance.now();
        this.lastTime=(v>now)?v:now;
        this.timer=setTimeout(function(){that.run()},this.lastTime-now+1);
        }//end start

Object.defineProperties(GameLoop.prototype, {
    fps:{configurable:!0, enumerable:!0,
      set:function(v){
        this.fpsTarget=v;
        }//end fps
      }
    }
  );