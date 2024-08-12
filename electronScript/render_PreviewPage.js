// renderer.js


document.addEventListener('DOMContentLoaded', async () => {
let currentStream;

//===================================================//
//when video page close 
window.api.onVideoWindowClosed(async () => {
  const sourceID = await window.api.getSourceID();
  setSource(sourceID);
});


//===================================================//
  //DROPDOWN

  //Get HTML element
  const dropdown = document.getElementById('dropdown');

  //Init dropdown
  let sources = await getWindows();
  sources.forEach(source => {
    const option = document.createElement('option');
    option.value = source.id;
    option.textContent = source.name;
    dropdown.appendChild(option);
  });

  //Default source value
  window.api.setSourceID(sources[0].id);
  setSource(sources[0].id);



  //Event
  dropdown.addEventListener("change", ()=>{
    console.log("change");
    const sourceID = dropdown.options[dropdown.selectedIndex].value;

    window.api.setSourceID(sourceID);

    setSource(sourceID);
  });

//===================================================//
  //Event on all page
  window.addEventListener("focus",async ()=>{
    
    //save current select value
    const currentValue = dropdown.value;

    //clean dropdown
    dropdown.innerHTML = '';
    
    //get all windows
    sources = await getWindows();

    //add all windows
    sources.forEach(source => {
      const option = document.createElement('option');
      option.value = source.id;
      option.textContent = source.name;
      dropdown.appendChild(option);
    });

    //set the previous value in select field
    dropdown.value = currentValue;
  })


//===================================================//
//Framerate
const inputFps = document.getElementById('inputFps');

inputFps.addEventListener("blur",()=>{
  if(inputFps.value>120){
    inputFps.value=120;
  }

  if(inputFps.value<0){
    inputFps.value=0;
  }
  
})

//===================================================//
//Server options
const inputAddress = document.getElementById('inputAddress');
const testButton = document.getElementById('buttonTest');
const imgStatus = document.getElementById('statusImg');


//Ping button
let isPinging=false;
testButton.addEventListener('click',async ()=>{
  if(!isPinging){
    isPinging=true;
    imgStatus.src="../assets/loader.gif"
    const result = await window.api.pingServer(inputAddress.value);

    if(result[0]){

      testButton.classList.add("successButton");
      imgStatus.src="../assets/valid_icon.png"

      testButton.addEventListener('animationend', () => {
        // Remove the animation class
        testButton.classList.remove('successButton');
      });
    }else{
      testButton.classList.add("failButton");
      imgStatus.src="../assets/fail_icon.png"

      testButton.addEventListener('animationend', () => {
        // Remove the animation class
        testButton.classList.remove('failButton');
      });
    }

  }
  isPinging=false;
 
})


//===================================================//
const startButton = document.getElementById('startButton');
const video = document.querySelector('video')


startButton.addEventListener('click',()=>{

  window.api.setServer(inputAddress.value);
  window.api.setFPS(inputFps.value);
  window.api.openVideoPage();
  if (currentStream) {
    
    currentStream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }
  
})




//===================================================//





async function setSource(sourceID){


  
  
  if (currentStream) {
    
    currentStream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }
  
 
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        width: 320 ,
        height: 240 ,
        maxFrameRate: 5,
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceID
      }
  
    }
  };

  // Create a Stream
  currentStream = await navigator.mediaDevices.getUserMedia(constraints);



  // Preview the source in a video element
  video.srcObject = currentStream;
  video.play();
  
}

//===================================================//
  //function to get all windows 
  async function getWindows(){
    let result = [];
    try {
      result = await window.api.getSources();
    } catch (error) {
      console.error('Failed to get sources:', error);
    }finally{
      return result;
    }

  }
});