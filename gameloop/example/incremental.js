eventDirty = false;
gameState = 0;
output = '';
frameDrop=0;

gameLoop=new GameLoop(initialize,process,draw);
gameLoop.fps=8;
gameLoop.startTime=gameLoop.state.creationTime+1000;

function initialize(){
  if(eventDirty){
    var fps=parseFloat(FPS.value);
    if(fps&&fps>0){gameLoop.fps=fps;}
    else{FPS.value='ERROR';}
    eventDirty=false;
    }
  }//end initialize

function process(frameCount,fps){
  var productionPerSecond = 10;
  var displayUnit = 'u';
  var displayState=0;

  output = '';
  gameState = gameState + (productionPerSecond / fps) * (frameCount);
  displayState=gameState;
  frameDrop+=frameCount-1;

  if (displayState < 10) {
      output+=' ';
      }
  if (displayState < 100) {
      output+=' ';
      }
  if (((displayState | 0).toString().length) > 3) {
      displayUnit = 'K';
      displayState = displayState / 1000;
      }
  if (((displayState | 0).toString().length) > 6) {
      displayUnit = 'M';
      displayState = displayState / 1000000;
      }
  if (((displayState | 0).toString().length) > 9) {
      displayUnit = 'G';
      displayState = displayState / 1000000000;
      }

  output+=displayState.toFixed(2);
  output+=displayUnit;
  }//end process

function draw() {
  DISP.innerText = output;
  LOG.innerText = frameDrop;
  }//end draw

