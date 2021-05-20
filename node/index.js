const express = require("express");
const mysql = require("mysql");

const app = express();

const port = 8080;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

const table = "CREATE TABLE people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))"
const insert = `INSERT INTO people(name) values ('Pedro')`;
const select = `SELECT * FROM people`;

connection.query(table);
connection.query(insert);

app.get("/", function (req, res) {
  connection.query(select, (err, rows) => {
    const list = rows?.reduce(
      (acc, cur) => acc.concat(`<p>${cur?.name}</p>`),
      "<h1>Full Cycle</h1>"
    );
    res.send(list);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
