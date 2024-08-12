

document.addEventListener('DOMContentLoaded', async () => {


  let currentStream;
  const video = document.getElementById('video')


  const sourceID = await window.api.getSourceID();
  const FPS = await window.api.getFPS()
  setSource(sourceID,FPS);
  
  
  window.api.setFilter((event, [message,duration]) => {
    console.log(message+" : "+duration);
    notifFilter(message,duration);
    filterFunc(message,duration);
  })
  

//===================================================//


  const notifBox = document.getElementById('notifBox');
  const notifText = document.getElementById('notifText');

  let isNotif = false;
  let isAnimating = false;
  
  function notifFilter(filterName,duration){
    if(!isNotif && !isAnimating){
      isNotif = true;

      let secondDuration =  duration/1000;
      notifText.innerText = filterName+" ("+secondDuration+"s)";
      notifBox.classList.add('opa');
      
      notifBox.addEventListener('animationend', () => {
        isNotif = false;
        // Remove the animation class
        notifBox.classList.remove('opa');
        console.log("notif end")
      });
    }
  }




  function filterFunc(filter,duration){

    switch (filter) {
      case "shake":
        if (!isAnimating) {
          isAnimating = true;
          video.classList.add('shake');

          // Duration of the animation (same as CSS animation duration)
          setTimeout(() => {
            video.classList.remove('shake');
            isAnimating = false;
            console.log("filter end.")
          }, duration); // 2s animation duration
        }
        break;


      case "mirror":
        if (!isAnimating) {
          isAnimating = true;
          video.classList.add('mirror');

          // Duration of the animation (same as CSS animation duration)
          setTimeout(() => {
            video.classList.remove('mirror');
            video.classList.add('unmirror');

            video.addEventListener('animationend', () => {
              // Remove the animation class
              video.classList.remove('unmirror');
              isAnimating = false;
              console.log("filter end.")
            });

            
          }, duration); // 2s animation duration
        }
        break;

      case "blur":
        if (!isAnimating) {
          isAnimating = true;
          video.classList.add('blur');

          // Duration of the animation (same as CSS animation duration)
          setTimeout(() => {
            video.classList.remove('blur');
            video.classList.add('unblur');

            video.addEventListener('animationend', () => {
              // Remove the animation class
              video.classList.remove('unblur');
              isAnimating = false;
              console.log("filter end.")
            });

            
          }, duration); // 2s animation duration
        }
        break;

      case "grey":
        if (!isAnimating) {
          isAnimating = true;
          video.classList.add('grey');

          // Duration of the animation (same as CSS animation duration)
          setTimeout(() => {
            video.classList.remove('grey');
            isAnimating = false;
            console.log("filter end.")
          }, duration_grey); // 2s animation duration
        }
        break;

      case "invert":
        if (!isAnimating) {
          isAnimating = true;
          video.classList.add('invert');

          // Duration of the animation (same as CSS animation duration)
          setTimeout(() => {
            video.classList.remove('invert');
            isAnimating = false;
            console.log("filter end.")
          }, duration); // 2s animation duration
        }
        break;

        case "wave":
          if (!isAnimating) {
            isAnimating = true;
            video.classList.add('wave');
  
            // Duration of the animation (same as CSS animation duration)
            setTimeout(() => {
              video.classList.remove('wave');
              isAnimating = false;
              console.log("filter end.")
            }, duration); // 2s animation duration
          }
          break;


        case "zoomOut":
          if (!isAnimating) {
            isAnimating = true;
            video.classList.add('zoomOut');
  
            // Duration of the animation (same as CSS animation duration)
            setTimeout(() => {
              video.classList.remove('zoomOut');
              isAnimating = false;
              console.log("filter end.")
            }, duration); // 2s animation duration
          }
          break;

          
        case "pixelate":
          if (!isAnimating) {
            isAnimating = true;
            video.classList.add('pixelate');
  
            // Duration of the animation (same as CSS animation duration)
            setTimeout(() => {
              video.classList.remove('pixelate');
              isAnimating = false;
              console.log("filter end.")
            }, duration); // 2s animation duration
          }
          break;

        case "blink":
          if (!isAnimating) {
            isAnimating = true;
            video.classList.add('blink');
  
            // Duration of the animation (same as CSS animation duration)
            setTimeout(() => {
              video.classList.remove('blink');
              isAnimating = false;
              console.log("filter end.")
            }, duration); // 2s animation duration
          }
          break;

        case "movie":
          if (!isAnimating) {
            isAnimating = true;
            video.classList.add('movie');
  
            // Duration of the animation (same as CSS animation duration)
            setTimeout(() => {
              video.classList.remove('movie');
              video.classList.add('unmovie');
  
              video.addEventListener('animationend', () => {
                // Remove the animation class
                video.classList.remove('unmovie');
                isAnimating = false;
                console.log("filter end.")
              });
  
              
            }, duration); // 2s animation duration
          }
          break;

        case "lag":
          if (!isAnimating) {

            isAnimating = true;
            let lagduration = 500;
            let lagInterval = 1500;
            let lagEffect;

            if(!lagEffect){
              lagEffect = setInterval(()=>{
                simulateLag(lagduration)
            
              },lagInterval+lagduration)
            }

            // Duration of the animation (same as CSS animation duration)
            setTimeout(() => {
              clearInterval(lagEffect);
              lagEffect=null;
              isAnimating = false;
              console.log("filter end.")
 
            }, duration); // 2s animation duration
          }
          break;

      default:
        break;
    }

    
  }

//===================================================//




function simulateLag(lagDuration) {
  console.log("lag")
    if (!video.paused) {

      video.pause();
      console.log("pause")

      //re play video
      setTimeout(() => {
        console.log("unpause")
        video.play();
      }, lagDuration);

    }
}

  async function setSource(sourceID,FPS){


    if (currentStream) {
      
      currentStream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }
    

    const constraints = {
      audio: false,
      video: {
        mandatory: {
          minFrameRate: FPS,
          maxFrameRate: FPS,

          minWidth: 1920,
          maxWidth: 1920 ,
          minHeight: 1080,
          maxHeight: 1080 ,

          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceID
        }
    
      }
    };

    // Create a Stream
    currentStream = await navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {

        video.play();

      };
    });

  }


});

