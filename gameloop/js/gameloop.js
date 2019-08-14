/*
license CC BY 4.0 GiLTheB,2017
*/

class GameLoop {

  constructor(initialize,process,draw) {
    this.initialize=initialize||function(){};
    this.process=process||function(){};
    this.draw=draw||function(){};
    this.fpsTarget=8;
    this.state={
      fps:8,
      frameCount:1,
      creationTime:performance.now()
      };
    this.frameTime=-1;
    }//end constructor

  set fps(v){
    this.fpsTarget=v;
    }//end fps set

  set startTime(v){
    var that = this;
    var now=performance.now();
    this.frameTime=(v>now)?v:now;
    this.state.fps=this.fpsTarget;
    this.state.frameCount=1;
    //console.log('starting');
    setTimeout(function(){that.run()},this.frameTime-now+1);
    }//end startTime set

  run(){
    var that=this;   
    var frame=0;
    var now=performance.now();
    var fps=this.state.fps;
    var timeStamp=this.state.timeStamp;
    var frameCount=this.state.frameCount;

    if(this.frameTime<now){//should always be true
      
      //initialize the gameloop for the next frame 
      this.initialize();

      while(this.frameTime<now){
        this.frameTime+=1000/this.fpsTarget;
        frame++;
        }
        
      //next frame state
      this.state.fps=this.fpsTarget;
      this.state.frameCount=frame;
      
      //pass the current gameloop states
      this.process(frameCount,fps);
      
      //draw call
      requestAnimationFrame(function(){that.draw()});

      setTimeout(function(){that.run()},this.frameTime-now+1);
      }
    else{
      //something wrong happened
      console.log('wrong');
      }
    }//end run
  }//end GameLoop