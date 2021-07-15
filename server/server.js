const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8099 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    setTimeout(() => {
      ws.send(JSON.stringify('server received:' + message));
    }, 500);
  });
  ws.send(JSON.stringify('Hello! Message From Server!!'));
  console.log('wss.clients.size', wss.clients.size);
});


let i = 1
setInterval(() => {
  i++;
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(i);
    }
  });
}, 1000);
