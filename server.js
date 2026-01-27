const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { WebSocketServer } = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url, true);
    if (pathname === '/api/ws') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    }
  });
  
  wss.on('connection', (ws) => {
    console.log('WebSocket client connected to /api/ws');

    ws.on('message', (message) => {
      console.log('received audio chunk of size:', message.length);
      // Here is where you would process the audio with a model like Gemini.
      // For now, we'll just simulate a response.
      ws.send("Gemini is processing audio...");
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected from /api/ws');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
  
  server.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
