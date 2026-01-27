// packages/extension/ui/popup.js

document.getElementById('toggle').addEventListener('click', () => {
  // Send a message to the background script to toggle the subtitles
  chrome.runtime.sendMessage({ type: 'TOGGLE_ECHO' });
});
