fpsDirty = false;
active = false;
elapse = 0;
output = '';
frameDrop=0;

/////////////////////////////////////////////////
START.addEventListener("click", start, false);
STOP.addEventListener("click", stop, false);
FPS_CHANGE.addEventListener("click", change, false);

function start(e){if(!active){gameLoop.start(performance.now());active=true;elapse=0;frameDrop=0;}}

function stop(e){gameLoop.stop();active=false;}

function change(e){fpsDirty=true;}
/////////////////////////////////////////////////

gameLoop=new GameLoop(initialize,process,draw);
gameLoop.fps=16;

function initialize(){
  if(fpsDirty){
    var fps=parseFloat(FPS.value);
    if(fps&&fps>0){gameLoop.fps=fps;}
    else{FPS.value='ERROR';}
    fpsDirty=false;
    }
  }//end initialize

function process(frameCount,fps){
  var hour=0;
  var minute=0;
  var seconde=0;
  var centiseconde=0;

  output = '';
  elapse += frameCount/fps;

  hour=(elapse/3600)|0;
  minute=(elapse/60-hour*60)|0;
  seconde=(elapse-minute*60-hour*3600)|0;
  centiseconde=((elapse-(elapse|0))*100)|0;

  frameDrop+=frameCount-1;

  /////////hour//////////
  output+=' ';
  if (hour < 10) {
      output+='0';
      }
  if (hour > 0) {
    output+=hour;
    output+=':';
    }
  else{
    output+='0:';
  }          
  /////////minute//////////  
  if (minute < 10) {
    output+='0';
    }
  if (minute > 0) {
    output+=minute;
    output+=':';
    }
  else{
    output+='0:';
    }         
  /////////seconde////////// 
  if (seconde < 10) {
      output+='0';
      }
  if (seconde > 0) {
    output+=seconde;
    output+=':';
    }
  else{
    output+='0:';
    }
  /////////centiseconde////////// 
  if (centiseconde < 10) {
    output+='0';
    }
  output+=centiseconde;
  output+=' ';
  /////////////////////////////// 
  }//end setup

function draw() {
  DISP.innerText = output;
  LOG.innerText = frameDrop;
  }//end draw

