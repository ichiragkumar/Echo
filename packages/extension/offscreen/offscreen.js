// packages/extension/offscreen/offscreen.js

let recorder;
let data = [];

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.target === 'offscreen') {
    switch (message.type) {
      case 'start-recording':
        startRecording(message.data);
        break;
      case 'stop-recording':
        stopRecording();
        break;
      default:
        throw new Error('Unrecognized message:', message.type);
    }
  }
});

async function startRecording(streamId) {
  if (recorder?.state === 'recording') {
    throw new Error('Called startRecording while recording is in progress.');
  }

  const media = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId
      }
    },
    video: false
  });

  const output = new AudioContext();
  const source = output.createMediaStreamSource(media);
  source.connect(output.destination);

  recorder = new MediaRecorder(media, { mimeType: 'audio/webm' });

  recorder.ondataavailable = (event) => {
    data.push(event.data);
  };

  recorder.onstop = () => {
    const blob = new Blob(data, { type: 'audio/webm' });
    
    // Send the blob to the background script
    chrome.runtime.sendMessage({
      type: 'audio-chunk',
      target: 'background',
      data: blob
    });

    // Reset data
    data = [];
    recorder = undefined;
  };

  recorder.start();
  window.location.hash = 'recording';
}

function stopRecording() {
  recorder.stop();
  window.location.hash = '';
}
