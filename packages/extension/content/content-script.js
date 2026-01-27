// packages/extension/content/content-script.js

console.log("Echo Content Script Loaded - V2");

let overlayHost;
let overlayRoot;

function createOverlay() {
  if (overlayHost) return;

  overlayHost = document.createElement('div');
  overlayHost.style.position = 'fixed';
  overlayHost.style.bottom = '20px';
  overlayHost.style.left = '20px';
  overlayHost.style.zIndex = '9999';
  
  document.body.appendChild(overlayHost);
  
  overlayRoot = overlayHost.attachShadow({ mode: 'open' });

  const overlayContent = document.createElement('div');
  overlayContent.id = 'echo-overlay';
  overlayContent.style.padding = '1rem';
  overlayContent.style.background = 'rgba(0, 0, 0, 0.7)';
  overlayContent.style.backdropFilter = 'blur(10px)';
  overlayContent.style.border = '1px solid rgba(255, 255, 255, 0.2)';
  overlayContent.style.borderRadius = '1rem';
  overlayContent.style.color = 'white';
  overlayContent.style.fontFamily = 'sans-serif';
  overlayContent.style.fontSize = '1.5rem';
  overlayContent.style.maxWidth = '400px';
  overlayContent.textContent = 'Echo is listening...';

  overlayRoot.appendChild(overlayContent);
}

function removeOverlay() {
    if (overlayHost) {
        overlayHost.remove();
        overlayHost = null;
        overlayRoot = null;
    }
}

function updateOverlay(text) {
  if (!overlayRoot) {
    createOverlay();
  }
  const overlayContent = overlayRoot.querySelector('#echo-overlay');
  if(overlayContent) {
      // A simple way to show tone, will be improved later
      if(text.toLowerCase().includes('sarcastic')) {
          overlayContent.style.color = '#A855F7'; // purple
          overlayContent.style.fontStyle = 'italic';
      } else {
          overlayContent.style.color = 'white';
          overlayContent.style.fontStyle = 'normal';
      }
      overlayContent.textContent = text;
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FROM_BACKGROUND') {
    updateOverlay(message.payload);
  } else if (message.type === 'TOGGLE_OVERLAY') {
      if (overlayHost) {
          removeOverlay();
      } else {
          createOverlay();
      }
  }
});

// Initial creation for development
createOverlay();