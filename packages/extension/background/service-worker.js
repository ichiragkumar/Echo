// packages/extension/background/service-worker.js

let ws = null;

function connect() {
  if (ws) {
    console.log("WebSocket already connected");
    return;
  }
  
  ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {
    console.log("WebSocket connection established");
    ws.send("Hello from extension!");
  };

  ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
    // Forward message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "FROM_BACKGROUND", payload: event.data });
      }
    });
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
    ws = null;
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    ws = null;
  };
}

function disconnect() {
  if (ws) {
    ws.close();
    ws = null;
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Echo Extension Installed");
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOGGLE_ECHO') {
    if (ws) {
      disconnect();
    } else {
      connect();
    }
  }
});

chrome.action.onClicked.addListener((tab) => {
  // Logic to start/stop the emotional subtitles
  console.log("Echo action clicked on tab:", tab.id);
    if (ws) {
      disconnect();
    } else {
      connect();
    }
});