import mysql from "serverless-mysql";



const pool = mysql({
  config: {
    host: "sql8.freemysqlhosting.net",
    user: "sql8604058",
    password: "qYK1L7wCNF",
    port: 3306,
    database: "sql8604058",
  },
});
// const pool = mysql({
//   config: {
//     host: "localhost",
//     user: "root",
//     password: "",
//     port: 3306,
//     database: "smoov_db",
//   },
// });

export { pool };
