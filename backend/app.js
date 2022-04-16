const express = require("express");
const restful = require("node-restful");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();

// db
const mongoose = restful.mongoose;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://db/mydb");

// middleware
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

//DOM
const Client = restful.model("Client", {
  name: { type: String, required: true },
});

// rest api
Client.methods(["get", "post", "put", "delete"]);
Client.updateOptions({ new: true, runValidators: true });

// routes
Client.register(server, "/clients");

server.listen(3000);
