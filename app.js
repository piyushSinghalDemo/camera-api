const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const requestIp = require("request-ip");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const routes = require("./routes/router");
const config = require("./config/config");
const db = require("./config/db");
const logger = require("./config/logger");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.use(helmet());
//app.use(s3.upload());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(requestIp.mw());
//app.use(inputFilter);
//app.use(require("./routes/s3_uploader/routes"));
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/", routes);
app.get("/", (req, res) => res.send("Hello World"));
//  CONNECT TO DB AND SOCKET
db.on("connected", () => logger.info("successfully connected to db!"));
db.on("error", () => logger.error("error connecting db"));
let server = app.listen(config.server.port, config.server.hostname, () =>
  logger.info(`server is listening on http://127.0.0.1:${config.server.port}`)
);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});
// socketService(server)
module.exports = app;
