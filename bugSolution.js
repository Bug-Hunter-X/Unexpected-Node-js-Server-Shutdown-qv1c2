const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify({ message: 'Hello from Node.js!' }));
};

const server = http.createServer(requestListener);

// Handle uncaught exceptions to prevent the server from crashing unexpectedly.
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  // Gracefully shut down the server.
  server.close(() => {
    console.log('Server closed due to uncaught exception.');
    process.exit(1);
  });
});

//Handle unhandled promise rejections which would also lead to unexpected crashes.
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    //Perform any cleanup
    server.close(()=>{
        console.log('Server closed due to unhandled promise rejection');
        process.exit(1);
    });
})

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});