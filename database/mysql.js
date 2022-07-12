const mysql = require("mysql");

module.exports = {
  connection: mysql.createConnection({
    user: "root",
    password: 'whfhddl45',
    database: 'servicedb',
  }),
};