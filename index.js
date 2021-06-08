const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const tus = require("tus-node-server");
const { config } = require("dotenv");
const EVENTS = require("tus-node-server").EVENTS;

const server = new tus.Server();
server.datastore = new tus.FileStore({
    path: '/files'
});



config()

const app = express();

const uploadApp = express();
uploadApp.all("*", server.handle.bind(server));
app.use("/uploads", uploadApp);

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello server.jsss");
});

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.listen(process.env.PORT);
console.log("Server is listerning");

const PORT = process.env.PORT || 1080;


if (!module.parent) {
  app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
}
module.exports = app;
