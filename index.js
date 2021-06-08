const tus = require("tus-node-server");
const { config } = require("dotenv");
const EVENTS = require("tus-node-server").EVENTS;

const server = new tus.Server();
server.datastore = new tus.FileStore({
    path: '/files'
});

config()

const host = process.env.HOST;
const port = process.env.PORT;

server.listen({ host, port }, () => {
  console.log(
    `[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`
  );
});

server.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
  console.log(`Upload complete for file ${event.file.id}`);
});
