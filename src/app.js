const express = require("express");
const path = require("path");
const routes = require("./routes");
const { sequelize } = require("./database/models/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  next();
});

app.use(routes);

const port = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("Server on in: http://localhost:" + port);
    });
  })
  .catch(e => console.log("database error: ", e));

module.exports = app;
