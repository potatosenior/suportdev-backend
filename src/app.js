const express = require("express");
const routes = require("./routes");
const { sequelize } = require("./database/models/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors()); // habilita cross site requests
app.use(routes); // inicializa as rotas

const port = process.env.PORT || 3000;

// inicializa a conexao com o banco de dados
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("Server on in: http://localhost:" + port);
    });
  })
  .catch(e => console.log("database error: ", e));

module.exports = app;
