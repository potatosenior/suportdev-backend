const express = require("express");
const routes = require("./routes");
const { sequelize } = require("./database/models/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("Server on in: http://localhost:" + port);
    });
  })
  .catch(e => console.error("database error: ", e));

module.exports = app;
