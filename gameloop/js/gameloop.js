/*
license CC BY 4.0 GiLTheB,2017
*/

class GameLoop {

  constructor(draw,setup,initialize) {
    this.initialize=initialize||function(){return true;};
    this.setup=setup||function(){return true;};
    this.draw=draw||function(){return true;};
    this.performance=window.performance;
    this.fpsTarget=8;

    this.frameState=[];
    this.frameState['fps']=8;
    this.frameState['timeStamp']=-1;
    this.frameState['frameCount']=1;
    this.frameState['creationTime']=this.performance.now();

    this.frameTime=-1;

    this.timeValue=-1;
    this.timeDirty=true;
    }//end constructor

  get fps(){
    return this.frameState['fps'];
  }//end fps get
  get frameCount(){
    return this.frameState['frameCount'];
  }//end frameCount get
  get timeStamp(){
    return this.frameState['timeStamp'];
  }//end timeStamp get
  get creationTime(){
    return this.frameState['creationTime'];
  }//end creationTime get

  set fps(v){
    this.fpsTarget=v;
    }//end fps set

  get time(){
    this.timeValue=(this.timeDirty)?this.performance.now():this.timeValue;
    this.timeDirty=false;
    return this.timeValue;
  }//end time get

  get now(){
    return this.performance.now();;
  }//end time get

  set startTime(v){
    var that = this;
    var now=this.time;

    this.frameTime=(v>now)?v:now;

    this.frameState['fps']=this.fpsTarget;
    this.frameState['timeStamp']=this.frameTime;
    this.frameState['frameCount']=1;
    this.timeDirty=true;

    setTimeout(function(){that.run()},this.frameTime-now+1);
    }//end startTime set

  run(){
    var that=this;   
    var frame=0;
    var now=this.time;
    var fps=this.frameState['fps'];
    var timeStamp=this.frameState['timeStamp'];
    var frameCount=this.frameState['frameCount'];

    if(this.frameTime<now){//should always be true

      //initialize the gameloop for the next frame 
      this.initialize();

      while(this.frameTime<now){
        this.frameTime+=1000/this.fpsTarget;
        frame++;
        }
        
      //next frame state
      this.frameState['fps']=this.fpsTarget;
      this.frameState['frameCount']=frame;
      this.frameState['timeStamp']=this.frameTime;
      
      //pass the current gameloop states
      this.setup(fps,frameCount,timeStamp);
      
      //draw call
      requestAnimationFrame(function(){that.draw()});

      }
    else{
      //something wrong happened
      }

    this.timeDirty=true;
    setTimeout(function(){that.run()}, this.frameTime-now+1);
    }//end run
  }//end GameLoop