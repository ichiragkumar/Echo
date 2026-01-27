// packages/extension/background/service-worker.js

let ws = null;
let recording = false;

// WebSocket connection management
function connect() {
  if (ws) return;
  ws = new WebSocket("ws://localhost:3000/api/ws");
  ws.onopen = () => console.log("WebSocket connected");
  ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "FROM_BACKGROUND", payload: event.data });
      }
    });
  };
  ws.onclose = () => { ws = null; console.log("WebSocket disconnected"); };
  ws.onerror = (error) => { ws = null; console.error("WebSocket error:", error); };
}

function disconnect() {
  if (ws) {
    ws.close();
  }
}

// Offscreen document management
async function hasOffscreenDocument(path) {
  const offscreenUrl = chrome.runtime.getURL(path);
  const matchedClients = await clients.matchAll();
  return matchedClients.some((c) => c.url === offscreenUrl);
}

async function startRecording() {
  if (recording) return;

  connect(); // Ensure WebSocket is connected

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const streamId = await chrome.tabCapture.getMediaStreamId({ targetTabId: tab.id });

  if (!await hasOffscreenDocument('offscreen/offscreen.html')) {
    await chrome.offscreen.createDocument({
      url: 'offscreen/offscreen.html',
      reasons: ['USER_MEDIA'],
      justification: 'Recording tab audio',
    });
  }

  chrome.runtime.sendMessage({
    type: 'start-recording',
    target: 'offscreen',
    data: streamId,
  });

  recording = true;
  chrome.action.setIcon({ path: 'assets/icon128-active.png' }); // Placeholder for active state icon
}

async function stopRecording() {
  if (!recording) return;

  chrome.runtime.sendMessage({
    type: 'stop-recording',
    target: 'offscreen',
  });

  recording = false;
  chrome.action.setIcon({ path: 'assets/icon128.png' });
  disconnect();
}

function toggleRecording() {
  if (recording) {
    stopRecording();
  } else {
    startRecording();
  }
}

// Listen for messages from popup or other scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOGGLE_ECHO') {
    toggleRecording();
  } else if (message.type === 'audio-chunk' && message.target === 'background') {
    if (ws && ws.readyState === WebSocket.OPEN) {
      // The data is a Blob, need to convert it to something sendable
      // For now, let's just log its size
      console.log('Received audio blob of size:', message.data.size);
      ws.send(message.data);
    }
  }
});

// Extension action
chrome.action.onClicked.addListener(toggleRecording);

chrome.runtime.onInstalled.addListener(() => {
  console.log("Echo Extension Installed");
});
