function main() {
  // entry point
  const videoElement = document.getElementById('myVideo');

  if (
    videoElement['currentTime'] &&
    videoElement['videoWidth'] &&
    videoElement['videoHeight']
  ) {
    startVideoFile(videoElement);
    startCamera();
  } else {
    setTimeout(main, 100);
    videoElement['play']();
  }
}

function startVideoFile(videoElement) {
  start(JEEFACEFILTERAPI, 'jeeFaceFilterCanvas', videoElement, 'yellow');
}

function startCamera() {
  const JEEFACEFILTERAPI2 = JEEFACEFILTERAPIGEN();
  start(JEEFACEFILTERAPI2, 'jeeFaceFilterCanvas2', null, 'lime');
}

function start(jeeFaceFilterAPIInstance, canvasId, videoElement, borderColor) {
  let cvd = null; // return of Canvas2DDisplay

  jeeFaceFilterAPIInstance.init({
    canvasId: canvasId,
    videoSettings: {
      videoElement: videoElement
    },
    NNCpath: '../../../dist/', // root of NNC.json file
    callbackReady: function (errCode, spec) {
      if (errCode) {
        console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
        return;
      }

      console.log('INFO: JEEFACEFILTERAPI IS READY');
      cvd = JEEFACEFILTERAPI.Canvas2DDisplay(spec);
      cvd.ctx.strokeStyle = borderColor;
    },

    // called at each render iteration (drawing loop):
    callbackTrack: function (detectState) {
      if (detectState.detected > 0.6) {
        // draw a border around the face:
        const faceCoo = cvd.getCoordinates(detectState);
        cvd.ctx.clearRect(0, 0, cvd.canvas.width, cvd.canvas.height);
        cvd.ctx.strokeRect(faceCoo.x, faceCoo.y, faceCoo.w, faceCoo.h);
        cvd.update_canvasTexture();
      }
      cvd.draw();
    }
  });
}