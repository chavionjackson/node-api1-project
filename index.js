const server = require("./api/server");

const port = 5000;

// START YOUR SERVER HERE

server.listen(port, () => {
  console.log("Hi Chevy! We're listening on", port);
});
